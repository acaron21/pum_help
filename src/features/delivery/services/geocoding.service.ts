import { db } from "@/db/app-database";

import type { Delivery } from "@/features/delivery/types/delivery.types";

/**
 * Point d'entrée officiel du service de géocodage
 * de la Géoplateforme.
 */
const GEOCODING_API_URL = "https://data.geopf.fr/geocodage/search";

/**
 * Score minimal accepté automatiquement.
 *
 * Le score est compris entre 0 et 1.
 * Plus il se rapproche de 1, plus le résultat est pertinent.
 *
 * Cette valeur est volontairement assez permissive pour le PoC.
 * Elle pourra être ajustée après les premiers essais réels.
 */
const MINIMUM_ACCEPTED_SCORE = 0.4;

/**
 * Structure minimale attendue dans une réponse GeoJSON.
 *
 * Nous ne décrivons que les propriétés réellement utilisées
 * par notre application.
 */
interface GeocodingFeature {
  type: "Feature";

  geometry: {
    type: "Point";

    /**
     * En GeoJSON :
     * - index 0 = longitude ;
     * - index 1 = latitude.
     */
    coordinates: [number, number];
  };

  properties: {
    label?: string;
    name?: string;
    postcode?: string;
    city?: string;
    citycode?: string;
    score?: number;
    type?: string;
  };
}

/**
 * Réponse renvoyée par le service de géocodage.
 */
interface GeocodingApiResponse {
  type: "FeatureCollection";
  features: GeocodingFeature[];
}

/**
 * Résultat normalisé retourné au reste de l'application.
 */
export interface GeocodingResult {
  latitude: number;
  longitude: number;

  /**
   * Adresse normalisée retournée par le géocodeur.
   */
  label: string;

  /**
   * Score de confiance du résultat.
   */
  score: number;
}

/**
 * Résumé du géocodage d'une journée.
 *
 * Cet objet pourra être utilisé pour afficher un message
 * dans l'interface après le traitement.
 */
export interface GeocodingDayResult {
  total: number;
  successCount: number;
  failedCount: number;
}

/**
 * Construit la chaîne envoyée au géocodeur.
 *
 * Exemple :
 * "5 avenue Marcel Dassault 31500 Toulouse"
 */
function buildGeocodingQuery(delivery: Delivery): string {
  return [delivery.address, delivery.postalCode, delivery.city]
    .map((part) => part.trim())
    .filter(Boolean)
    .join(" ");
}

/**
 * Vérifie qu'une coordonnée est bien un nombre fini.
 */
function isValidCoordinate(value: unknown): value is number {
  return typeof value === "number" && Number.isFinite(value);
}

/**
 * Interroge le service Géoplateforme pour une adresse.
 *
 * La fonction ne modifie pas IndexedDB.
 * Elle cherche seulement un résultat et le retourne.
 */
export async function geocodeDeliveryAddress(
  delivery: Delivery,
): Promise<GeocodingResult | null> {
  const query = buildGeocodingQuery(delivery);

  /**
   * Une adresse vide ne doit pas déclencher d'appel réseau.
   */
  if (!query) {
    return null;
  }

  const parameters = new URLSearchParams({
    q: query,

    /**
     * On recherche uniquement dans l'index des adresses.
     *
     * Cela évite de récupérer prioritairement un point d'intérêt
     * ou une parcelle cadastrale.
     */
    index: "address",

    /**
     * Pour cette première version, seul le meilleur résultat
     * nous intéresse.
     */
    limit: "1",
  });

  /**
   * Le code postal permet de limiter les mauvaises correspondances
   * lorsque plusieurs rues portent le même nom.
   */
  if (delivery.postalCode) {
    parameters.set("postcode", delivery.postalCode);
  }

  const response = await fetch(
    `${GEOCODING_API_URL}?${parameters.toString()}`,
    {
      method: "GET",
      headers: {
        Accept: "application/json",
      },
    },
  );

  /**
   * Une erreur HTTP ne doit pas être interprétée
   * comme une adresse simplement introuvable.
   */
  if (!response.ok) {
    throw new Error(`Erreur de géocodage HTTP ${response.status}`);
  }

  const data = (await response.json()) as GeocodingApiResponse;

  const bestFeature = data.features?.[0];

  if (!bestFeature) {
    return null;
  }

  const [longitude, latitude] = bestFeature.geometry.coordinates;

  const score = bestFeature.properties.score ?? 0;

  /**
   * On refuse :
   * - les coordonnées invalides ;
   * - les résultats dont le score est trop faible.
   */
  if (
    !isValidCoordinate(latitude) ||
    !isValidCoordinate(longitude) ||
    score < MINIMUM_ACCEPTED_SCORE
  ) {
    return null;
  }

  return {
    latitude,
    longitude,
    label: bestFeature.properties.label ?? query,
    score,
  };
}

/**
 * Petite pause entre deux requêtes.
 *
 * Avec seulement 10 à 20 livraisons, un traitement séquentiel
 * est suffisamment rapide et beaucoup plus simple à surveiller.
 *
 * 100 ms correspond à environ 10 requêtes par seconde,
 * donc largement sous la limite publique du service.
 */
function wait(durationMs: number): Promise<void> {
  return new Promise((resolve) => {
    window.setTimeout(resolve, durationMs);
  });
}

/**
 * Géocode toutes les livraisons qui ne possèdent pas encore
 * de coordonnées dans une journée donnée.
 */
export async function geocodeDeliveryDay(
  dayId: string,
  onProgress?: (completed: number, total: number) => void,
): Promise<GeocodingDayResult> {
  /**
   * On ne récupère que les livraisons de la journée active.
   */
  const deliveries = await db.deliveries.where("dayId").equals(dayId).toArray();

  /**
   * Les livraisons déjà géocodées ne sont pas retraitées.
   *
   * Cela évite :
   * - les appels réseau inutiles ;
   * - d'écraser une future correction manuelle.
   */
  const deliveriesToGeocode = deliveries.filter(
    (delivery) => delivery.latitude === null || delivery.longitude === null,
  );

  let successCount = 0;
  let failedCount = 0;

  for (let index = 0; index < deliveriesToGeocode.length; index += 1) {
    const delivery = deliveriesToGeocode[index];

    try {
      const result = await geocodeDeliveryAddress(delivery);

      if (!result) {
        /**
         * Aucun résultat suffisamment fiable.
         */
        failedCount += 1;

        await db.deliveries.update(delivery.id, {
          geocodingStatus: "failed",
          updatedAt: new Date().toISOString(),
        });
      } else {
        /**
         * Le résultat est immédiatement enregistré.
         *
         * useLiveQuery détectera cette modification et le point
         * apparaîtra automatiquement sur la carte.
         */
        successCount += 1;

        await db.deliveries.update(delivery.id, {
          latitude: result.latitude,
          longitude: result.longitude,
          geocodingStatus: "success",
          updatedAt: new Date().toISOString(),
        });
      }
    } catch (error) {
      /**
       * Une panne réseau ou une erreur HTTP n'arrête pas
       * tout le traitement de la journée.
       */
      console.error(`Échec du géocodage pour ${delivery.customerName}`, error);

      failedCount += 1;

      await db.deliveries.update(delivery.id, {
        geocodingStatus: "failed",
        updatedAt: new Date().toISOString(),
      });
    }

    onProgress?.(index + 1, deliveriesToGeocode.length);

    /**
     * La pause n'est pas nécessaire après la dernière livraison.
     */
    if (index < deliveriesToGeocode.length - 1) {
      await wait(100);
    }
  }

  /**
   * La journée est marquée comme modifiée.
   */
  await db.deliveryDays.update(dayId, {
    updatedAt: new Date().toISOString(),
  });

  return {
    total: deliveriesToGeocode.length,
    successCount,
    failedCount,
  };
}
