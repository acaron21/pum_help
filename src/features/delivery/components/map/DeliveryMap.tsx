import { CircleMarker, MapContainer, TileLayer, Tooltip } from "react-leaflet";

import type { Delivery } from "@/features/delivery/types/delivery.types";

interface DeliveryMapProps {
  /**
   * Livraisons de la journée active.
   *
   * Le composant filtrera lui-même celles qui ne possèdent
   * pas encore de coordonnées géographiques.
   */
  deliveries: Delivery[];

  /**
   * Ensemble des identifiants actuellement sélectionnés.
   *
   * Cette sélection existe uniquement en mémoire React.
   * Elle n'est jamais enregistrée dans IndexedDB.
   */
  selectedDeliveryIds: Set<string>;

  /**
   * Fonction appelée lorsqu'un point est cliqué.
   */
  onToggleDelivery: (deliveryId: string) => void;
}

/**
 * Centre utilisé lorsqu'aucune livraison géocodée n'est disponible.
 *
 * Remplace ces coordonnées par celles de ton agence si nécessaire.
 */
const DEFAULT_CENTER: [number, number] = [43.6047, 1.4442];

/**
 * Carte minimale des livraisons.
 *
 * Son seul rôle est :
 * - d'afficher les livraisons géocodées ;
 * - de montrer leur numéro de commande ;
 * - de permettre leur sélection ou désélection.
 */
export function DeliveryMap({
  deliveries,
  selectedDeliveryIds,
  onToggleDelivery,
}: DeliveryMapProps) {
  /**
   * Seules les livraisons possédant des coordonnées valides
   * peuvent être affichées sur la carte.
   */
  const mappedDeliveries = deliveries.filter(
    (
      delivery,
    ): delivery is Delivery & {
      latitude: number;
      longitude: number;
    } => delivery.latitude !== null && delivery.longitude !== null,
  );

  return (
    <MapContainer
      center={DEFAULT_CENTER}
      zoom={11}
      scrollWheelZoom
      className="h-full min-h-[28rem] w-full"
    >
      {/*
       * Fond cartographique OpenStreetMap.
       *
       * L'attribution doit rester affichée.
       */}
      <TileLayer
        attribution="&copy; OpenStreetMap contributors"
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />

      {mappedDeliveries.map((delivery) => {
        const isSelected = selectedDeliveryIds.has(delivery.id);

        /**
         * On privilégie ici le numéro Document, qui contient
         * normalement les douze chiffres de la commande.
         */
        const orderNumber =
          delivery.documentReference ??
          delivery.orderReference ??
          "Commande inconnue";

        return (
          <CircleMarker
            key={delivery.id}
            center={[delivery.latitude, delivery.longitude]}
            /**
             * Le point sélectionné est légèrement plus grand.
             */
            radius={isSelected ? 10 : 7}
            /**
             * Styles Leaflet directement appliqués au cercle.
             *
             * Tous les véhicules utilisent volontairement
             * la même couleur dans cette version.
             */
            pathOptions={{
              color: isSelected ? "#173961" : "#ffffff",
              weight: isSelected ? 4 : 2,
              fillColor: "#009ee3",
              fillOpacity: isSelected ? 1 : 0.8,
            }}
            /**
             * Un clic sélectionne ou désélectionne la livraison.
             */
            eventHandlers={{
              click: () => {
                onToggleDelivery(delivery.id);
              },
            }}
          >
            {/*
             * Le tooltip s'affiche automatiquement au survol du point.
             */}
            <Tooltip direction="top" offset={[0, -8]} opacity={1}>
              <div className="text-center">
                <p className="font-mono text-xs font-semibold">{orderNumber}</p>

                <p className="mt-0.5 max-w-48 truncate text-[11px]">
                  {delivery.customerName}
                </p>
              </div>
            </Tooltip>
          </CircleMarker>
        );
      })}
    </MapContainer>
  );
}
