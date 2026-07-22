/**
 * Représentation brute d'une ligne du CSV PUM.
 *
 * Toutes les propriétés restent des chaînes car le CSV utilise notamment
 * la virgule comme séparateur décimal pour le poids.
 */
export interface PumCsvRow {
  "Sél."?: string;
  VP?: string;
  Date?: string;
  Créneau?: string;
  Départ?: string;
  Arrivée?: string;
  "Raison sociale"?: string;
  "Com."?: string;
  Options?: string;
  Poids?: string;
  Statut?: string;
  Info?: string;
  Document?: string;
  Type?: string;
  Client?: string;
  "Liv. D"?: string;
  Création?: string;
  GL?: string;
  GP?: string;
  GT?: string;
  FdR?: string;
  OdT?: string;
  Val?: string;
}
