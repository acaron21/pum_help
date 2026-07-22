import { db } from "@/db/app-database";

import type {
  Delivery,
  DeliveryDay,
} from "@/features/delivery/types/delivery.types";

/**
 * Crée une journée vide.
 */
export async function createDeliveryDay(date: string): Promise<DeliveryDay> {
  const now = new Date().toISOString();

  /**
   * Intl.DateTimeFormat permet de produire un libellé lisible
   * tout en conservant la date métier au format YYYY-MM-DD.
   */
  const formattedDate = new Intl.DateTimeFormat("fr-FR", {
    weekday: "long",
    day: "numeric",
    month: "long",
    year: "numeric",
  }).format(new Date(`${date}T12:00:00`));

  const day: DeliveryDay = {
    id: crypto.randomUUID(),
    date,
    label: formattedDate.charAt(0).toUpperCase() + formattedDate.slice(1),
    status: "draft",
    createdAt: now,
    updatedAt: now,
  };

  await db.deliveryDays.add(day);

  return day;
}

/**
 * Récupère les journées de la plus récente à la plus ancienne.
 */
export async function getDeliveryDays(): Promise<DeliveryDay[]> {
  return db.deliveryDays.orderBy("date").reverse().toArray();
}

/**
 * Récupère les livraisons d'une journée.
 */
export async function getDeliveriesByDay(dayId: string): Promise<Delivery[]> {
  return db.deliveries.where("dayId").equals(dayId).toArray();
}

/**
 * Supprime une journée ainsi que toutes ses livraisons.
 *
 * La transaction garantit que les deux suppressions sont réalisées
 * ensemble. En cas d'erreur, l'opération complète est annulée.
 */
export async function deleteDeliveryDay(dayId: string): Promise<void> {
  await db.transaction("rw", db.deliveryDays, db.deliveries, async () => {
    await db.deliveries.where("dayId").equals(dayId).delete();

    await db.deliveryDays.delete(dayId);
  });
}
