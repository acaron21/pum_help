import type { Delivery } from "@/features/delivery/types/delivery.types";
import type { PumCsvRow } from "@/features/delivery/types/pum-csv.types";

/**
 * Résultat du découpage de la colonne "Arrivée".
 */
interface ParsedDestination {
  postalCode: string;
  city: string;
  address: string;
}

/**
 * Nettoie une valeur provenant du CSV.
 */
function cleanValue(value: unknown): string {
  if (value === null || value === undefined) {
    return "";
  }

  return String(value).trim();
}

/**
 * Transforme le poids PUM en nombre JavaScript.
 *
 * Exemple :
 * "76,800000000" devient 76.8.
 *
 * Les espaces sont également supprimés pour accepter :
 * "1 250,500000000".
 */
function parseWeight(value: unknown): number | null {
  const cleanedValue = cleanValue(value).replace(/\s/g, "").replace(",", ".");

  if (!cleanedValue) {
    return null;
  }

  const parsedValue = Number(cleanedValue);

  return Number.isFinite(parsedValue) ? parsedValue : null;
}

/**
 * Découpe la colonne Arrivée.
 *
 * Format rencontré dans ton export :
 * 31500-TOULOUSE-5 avenue Marcel Dassault
 *
 * Le troisième groupe conserve tous les tirets éventuels
 * présents dans l'adresse.
 */
function parseDestination(value: unknown): ParsedDestination {
  const rawDestination = cleanValue(value);

  const match = rawDestination.match(/^(\d{5})-([^-]+)-(.*)$/);

  if (!match) {
    return {
      postalCode: "",
      city: "",
      address: rawDestination,
    };
  }

  return {
    postalCode: match[1].trim(),
    city: match[2].trim(),
    address: match[3].trim(),
  };
}

/**
 * Détermine si la ligne ressemble à une vraie livraison client.
 *
 * Ton CSV contient également des transferts entre agences, par exemple :
 * "TLSD - Toulouse Sud (Thibaud)".
 *
 * Pour la première version, une livraison client doit avoir :
 * - une destination commençant par un code postal ;
 * - une raison sociale.
 */
export function isCustomerDeliveryRow(row: PumCsvRow): boolean {
  const destination = cleanValue(row.Arrivée);
  const customerName = cleanValue(row["Raison sociale"]);

  const hasPostalDestination = /^\d{5}-/.test(destination);

  return hasPostalDestination && customerName.length > 0;
}

/**
 * Transforme une ligne du CSV PUM en livraison métier.
 */
export function mapPumRowToDelivery(row: PumCsvRow, dayId: string): Delivery {
  const now = new Date().toISOString();
  const rawDestination = cleanValue(row.Arrivée);
  const destination = parseDestination(rawDestination);

  return {
    id: crypto.randomUUID(),
    dayId,

    documentReference: cleanValue(row.Document) || null,

    orderReference: cleanValue(row.OdT) || null,

    customerCode: cleanValue(row.Client) || null,

    customerName: cleanValue(row["Raison sociale"]) || "Client non renseigné",

    rawDestination,
    address: destination.address,
    postalCode: destination.postalCode,
    city: destination.city,

    weightKg: parseWeight(row.Poids),

    /**
     * La priorité sera modifiable plus tard depuis l'interface.
     */
    isPriority: false,

    /**
     * Le géocodage sera lancé dans une prochaine étape.
     */
    latitude: null,
    longitude: null,
    geocodingStatus: "pending",

    /**
     * On conserve VP dans importedVp.
     *
     * On ne l'affecte pas directement à vehicle tant qu'on n'a pas
     * défini précisément toutes les valeurs possibles dans l'ERP.
     */
    importedVp: cleanValue(row.VP) || null,

    vehicle: null,
    tourNumber: null,
    stopOrder: null,

    timeSlot: cleanValue(row.Créneau) || null,

    createdAt: now,
    updatedAt: now,
  };
}
