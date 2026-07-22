import Dexie, { type EntityTable } from "dexie";

import type {
  Delivery,
  DeliveryDay,
} from "@/features/delivery/types/delivery.types";

/**
 * Base de données locale du module RM.
 *
 * IndexedDB sera créée automatiquement dans le navigateur
 * lors de la première opération.
 */
class AppDatabase extends Dexie {
  /**
   * Une table contient les journées.
   */
  deliveryDays!: EntityTable<DeliveryDay, "id">;

  /**
   * Une autre table contient toutes les livraisons.
   *
   * Chaque livraison référence sa journée avec dayId.
   */
  deliveries!: EntityTable<Delivery, "id">;

  constructor() {
    super("pum-rm-tools");

    /**
     * Version 1 du schéma.
     *
     * Seuls les champs utilisés pour rechercher ou trier doivent être
     * déclarés dans cette chaîne.
     *
     * Les autres propriétés sont tout de même enregistrées dans IndexedDB.
     */
    this.version(1).stores({
      deliveryDays: "id, date, status, createdAt, updatedAt",

      deliveries: [
        "id",
        "dayId",
        "documentReference",
        "orderReference",
        "customerCode",
        "vehicle",
        "tourNumber",
        "stopOrder",

        /**
         * Index composé permettant de rechercher directement
         * les livraisons d'une tournée.
         */
        "[dayId+vehicle+tourNumber]",
      ].join(", "),
    });
  }
}

/**
 * Instance unique utilisée dans toute l'application.
 */
export const db = new AppDatabase();
