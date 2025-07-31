import Papa from 'papaparse';
import type { ParseResult } from 'papaparse';


// === CONFIGURATION ===

// URL publique du CSV publié via Google Sheets
const SHEET_CSV_URL = 'https://docs.google.com/spreadsheets/d/e/2PACX-1vTLwxyxA2_kYDRoS1TvvHm5kPhjSvs-RjgmlIGNYS37fgv8kipacMHF_LX9OGJkAMigpg6IT5yGJh5p/pub?output=csv';

// Clé du cache localStorage
const CACHE_KEY = 'product_data_cache';

// Durée du cache : 30 jours (en ms)
const CACHE_DURATION = 30 * 24 * 60 * 60 * 1000;

// === TYPES ===

// Format final utilisé dans l'application
export type ProductEntry = {
  zone: string;
  ref: string;
  label: string;
};

type RawCSVRow = {
  [key: string]: string | undefined;
};

type CacheData = {
  timestamp: number;
  data: ProductEntry[];
};

// === GESTION DU CACHE ===

function getCache(): ProductEntry[] | null {
  const raw = localStorage.getItem(CACHE_KEY);
  if (!raw) return null;

  try {
    const parsed: CacheData = JSON.parse(raw);
    const now = Date.now();

    if (now - parsed.timestamp > CACHE_DURATION) {
      console.info('[SheetService] Cache expiré.');
      return null;
    }

    return parsed.data;
  } catch (err) {
    console.warn('[SheetService] Erreur de parsing du cache local.');
    return null;
  }
}

function setCache(data: ProductEntry[]) {
  const payload: CacheData = {
    timestamp: Date.now(),
    data,
  };

  localStorage.setItem(CACHE_KEY, JSON.stringify(payload));
}

// === FETCH & PARSING CSV ===

async function fetchSheetData(): Promise<ProductEntry[]> {
  const response = await fetch(SHEET_CSV_URL);
  const csvText = await response.text();

  return new Promise((resolve, reject) => {
    Papa.parse<RawCSVRow>(csvText, {
      header: true,
      delimiter: ',',
      skipEmptyLines: true,
      complete: (results: ParseResult<RawCSVRow>) => {
        const rows = results.data;

        const filtered: ProductEntry[] = rows
          .filter((row) => row['Statut article']?.trim().toUpperCase() === 'ACTIF')
          .map((row) => ({
            zone: row['Zone']?.trim() ?? '',
            ref: row['Ref article']?.trim() ?? '',
            label: row['Désignation article']?.trim() ?? '',
          }))
          .filter((entry) => entry.zone && entry.ref); // facultatif : on ignore les lignes incomplètes

        resolve(filtered);
      },
      error: (err: unknown) => {
        console.error('[SheetService] Erreur lors du parsing CSV', err);
        reject(err);
      },
    });
    console.log("data loaded!")
  });
}

// === API PUBLIQUE ===

/**
 * Récupère les données produits depuis le cache ou Google Sheets si cache vide/expiré.
 */
export async function getProductData(): Promise<ProductEntry[]> {
  const cached = getCache();
  if (cached) {
    console.info('[SheetService] Données chargées depuis le cache.');
    return cached;
  }

  console.info('[SheetService] Chargement des données depuis Google Sheets...');
  const data = await fetchSheetData();
  setCache(data);
  return data;
}

/**
 * Force le rafraîchissement des données depuis Google Sheets (ignore le cache).
 */
export async function refreshProductData(): Promise<ProductEntry[]> {
  console.info('[SheetService] Rafraîchissement manuel des données...');
  const data = await fetchSheetData();
  setCache(data);
  return data;
}
