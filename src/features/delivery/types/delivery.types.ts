/**
 * Codes des véhicules disponibles.
 *
 * G et D correspondent aux deux chauffeurs poids lourds.
 * VL correspond au véhicule léger.
 *
 * null indique qu'aucun véhicule n'a encore été affecté.
 */
export type VehicleCode = "G" | "D" | "VL" | null;

/**
 * État d'une journée de livraison.
 */
export type DeliveryDayStatus = "draft" | "planned" | "archived";

/**
 * État du géocodage d'une livraison.
 */
export type GeocodingStatus = "pending" | "success" | "failed" | "manual";

/**
 * Représente une journée de travail.
 *
 * Les livraisons ne sont pas directement imbriquées dans cet objet.
 * Elles sont enregistrées dans une table séparée et reliées par dayId.
 */
export interface DeliveryDay {
  id: string;
  date: string;
  label: string;
  status: DeliveryDayStatus;
  createdAt: string;
  updatedAt: string;
}

/**
 * Représente une livraison importée depuis l'ERP.
 */
export interface Delivery {
  id: string;

  /**
   * Référence vers la journée contenant la livraison.
   */
  dayId: string;

  /**
   * Références provenant du logiciel ERP.
   */
  documentReference: string | null;
  orderReference: string | null;
  customerCode: string | null;

  /**
   * Informations client.
   */
  customerName: string;

  /**
   * Adresse exactement telle qu'elle était dans le CSV.
   */
  rawDestination: string;

  /**
   * Adresse découpée et éventuellement corrigée.
   */
  address: string;
  postalCode: string;
  city: string;

  /**
   * Poids exprimé en kilogrammes.
   */
  weightKg: number | null;

  /**
   * Contraintes métier.
   */
  isPriority: boolean;

  /**
   * Coordonnées de la livraison.
   */
  latitude: number | null;
  longitude: number | null;
  geocodingStatus: GeocodingStatus;

  /**
   * Organisation de la tournée.
   *
   * Exemple :
   * vehicle = "G"
   * tourNumber = 2
   * stopOrder = 3
   *
   * La livraison est alors le troisième arrêt de la tournée G2.
   */
  vehicle: VehicleCode;
  tourNumber: number | null;
  stopOrder: number | null;

  /**
   * Informations complémentaires provenant du CSV.
   */
  timeSlot: string | null;
  importedVp: string | null;

  createdAt: string;
  updatedAt: string;
}
