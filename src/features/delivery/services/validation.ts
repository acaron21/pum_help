import type { Delivery, VehicleCode } from "../types/delivery.types";

export const VEHICLE_CAPACITIES_KG = {
  G: 6000,
  D: 6000,
  VL: 600,
} as const;

/**
 * Retourne le libellé d'une tournée.
 *
 * Exemples :
 * G + 1  => G1
 * D + 2  => D2
 * VL + 1 => VL1
 */
export function getTourLabel(
  vehicle: VehicleCode,
  tourNumber: number | null,
): string {
  if (!vehicle || tourNumber === null) {
    return "Non affectée";
  }

  return `${vehicle}${tourNumber}`;
}

/**
 * Calcule le poids total d'un ensemble de livraisons.
 *
 * Les poids absents sont considérés comme égaux à zéro pour le calcul.
 * Ils devront néanmoins être signalés séparément dans l'interface.
 */
export function calculateTotalWeight(deliveries: Delivery[]): number {
  return deliveries.reduce(
    (total, delivery) => total + (delivery.weightKg ?? 0),
    0,
  );
}

/**
 * Vérifie si une tournée dépasse la capacité du véhicule.
 */
export function getTourCapacityStatus(
  vehicle: Exclude<VehicleCode, null>,
  deliveries: Delivery[],
) {
  const totalWeightKg = calculateTotalWeight(deliveries);
  const capacityKg = VEHICLE_CAPACITIES_KG[vehicle];

  return {
    totalWeightKg,
    capacityKg,
    remainingKg: capacityKg - totalWeightKg,
    isOverCapacity: totalWeightKg > capacityKg,
  };
}
