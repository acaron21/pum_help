import Papa from "papaparse";

import { db } from "@/db/app-database";

import type { Delivery } from "@/features/delivery/types/delivery.types";
import type { PumCsvRow } from "@/features/delivery/types/pum-csv.types";

import {
  isCustomerDeliveryRow,
  mapPumRowToDelivery,
} from "@/features/delivery/utils/pum-csv-parser";

/**
 * Résultat retourné à l'interface après un import.
 */
export interface DeliveryImportResult {
  importedDeliveries: Delivery[];
  ignoredRowsCount: number;
  parsingErrors: string[];
}

/**
 * Analyse le fichier CSV.
 *
 * La promesse permet d'utiliser Papa Parse avec async/await.
 */
function parseCsvFile(file: File): Promise<{
  rows: PumCsvRow[];
  errors: string[];
}> {
  return new Promise((resolve, reject) => {
    Papa.parse<PumCsvRow>(file, {
      /**
       * La première ligne du CSV contient les noms des colonnes.
       */
      header: true,

      /**
       * Ignore les lignes totalement vides.
       */
      skipEmptyLines: true,

      /**
       * On laisse les valeurs sous forme de chaînes.
       *
       * Le poids utilise la virgule décimale française.
       * Il est donc converti manuellement par notre parseur.
       */
      dynamicTyping: false,

      complete: (result) => {
        resolve({
          rows: result.data,
          errors: result.errors.map(
            (error) => `Ligne ${error.row ?? "inconnue"} : ${error.message}`,
          ),
        });
      },

      error: (error) => {
        reject(error);
      },
    });
  });
}

/**
 * Importe un fichier CSV dans une journée.
 */
export async function importDeliveriesFromCsv(
  file: File,
  dayId: string,
): Promise<DeliveryImportResult> {
  const { rows, errors } = await parseCsvFile(file);

  /**
   * Les mouvements internes entre agences sont ignorés.
   */
  const customerRows = rows.filter(isCustomerDeliveryRow);

  const ignoredRowsCount = rows.length - customerRows.length;

  const deliveries = customerRows.map((row) => mapPumRowToDelivery(row, dayId));

  /**
   * On enregistre les livraisons et la mise à jour de la journée
   * dans une seule transaction.
   */
  await db.transaction("rw", db.deliveryDays, db.deliveries, async () => {
    await db.deliveries.bulkAdd(deliveries);

    await db.deliveryDays.update(dayId, {
      updatedAt: new Date().toISOString(),
    });
  });

  return {
    importedDeliveries: deliveries,
    ignoredRowsCount,
    parsingErrors: errors,
  };
}
