// LabelPdfButton.tsx
import React from "react";
import { jsPDF } from "jspdf";
import JsBarcode from "jsbarcode";


type Item = {id: number, code: string, name: string};
type Props = { items: Item[]; filename?: string };

export default function LabelPdfButton({ items, filename = "etiquettes.pdf" }: Props) {
  const generatePdf = async () => {
    // ---- Page & grille ----
    const pageW = 210; // A4 (mm)
    const pageH = 297;
    const marginX = 10;
    const marginY = 10;
    const cols = 3;
    const rows = 7;

    // Espacement entre étiquettes (padding externe entre cases)
    const cellSpacingX = 2; // mm
    const cellSpacingY = 2; // mm

    // Zone utile (hors marges + espaces inter-cellules)
    const innerW = pageW - marginX * 2 - cellSpacingX * (cols - 1);
    const innerH = pageH - marginY * 2 - cellSpacingY * (rows - 1);

    const cellW = innerW / cols;
    const cellH = innerH / rows;

    const doc = new jsPDF({ unit: "mm", format: "a4", compress: true });

    // ---------- rendu d’une étiquette ----------
    const drawLabel = async (a: Item, x: number, y: number, w: number, h: number) => {
      const pad = 3;                         // padding interne
      const centerX = x + w / 2;
      const contentW = w - pad * 2;

      // Réglages typographiques / espacements
      const titleFontSize = 10;
      const titleLineHeight = 4;             // mm par ligne de désignation
      const titleTopOffset = 2;              // mm sous le bord haut
      const gapTitleToBarcode = 2;           // espace Titre → Code-barres
      const gapBarcodeToCode = 2;            // espace Code-barres → Code article
      const codeBottomReserve = 5;           // réserve basse pour le code article
      const minBarcodeHeight = 10;           // hauteur mini lisible du code-barres (mm)
      const maxTitleLines = 3;               // on limite 2–3 lignes max

      // 1) Titre (wrap multi-lignes centré, avec limite de lignes)
      doc.setFont("helvetica", "bold");
      doc.setFontSize(titleFontSize);

      const titleYStart = y + pad + titleTopOffset;
      let titleLines = wrapTextWithMaxLines(doc, a.name, contentW, maxTitleLines);
      let titleBlockHeight = titleLines.length * titleLineHeight;

      // 2) Calcul de l’espace dispo pour le code-barres (sans jamais toucher à la zone du code article)
      let barcodeTopY = titleYStart + titleBlockHeight + gapTitleToBarcode;
      const bottomLimitY = y + h - pad - codeBottomReserve - gapBarcodeToCode;
      let barcodeHeight = bottomLimitY - barcodeTopY;

      // Si pas assez d’espace, réduire le titre à 2 lignes puis, en dernier recours, réduire le code-barres
      if (barcodeHeight < minBarcodeHeight) {
        if (titleLines.length > 2) {
          const tighterLines = wrapTextWithMaxLines(doc, a.name, contentW, 2);
          const tighterBlockHeight = tighterLines.length * titleLineHeight;
          const tighterBarcodeTopY = titleYStart + tighterBlockHeight + gapTitleToBarcode;
          const tighterHeight = bottomLimitY - tighterBarcodeTopY;

          if (tighterHeight >= minBarcodeHeight) {
            titleLines = tighterLines;
            titleBlockHeight = tighterBlockHeight;
            barcodeTopY = tighterBarcodeTopY;
            barcodeHeight = tighterHeight;
          } else {
            barcodeHeight = Math.max(4, tighterHeight); // dernier recours
          }
        } else {
          barcodeHeight = Math.max(4, barcodeHeight);   // dernier recours
        }
      }

      // 3) Rendu du titre centré
      let currentY = titleYStart;
      for (const line of titleLines) {
        doc.text(line, centerX, currentY, { align: "center" });
        currentY += titleLineHeight;
      }

      // 4) Rendu du code-barres dans l’espace calculé
      const barcodeWidthMM = contentW;
      const dataUrl = await renderCode128AsDataURL(a.code, {
        widthPx: mmToPx(barcodeWidthMM, 300),
        heightPx: mmToPx(barcodeHeight, 300),
      });

      doc.addImage(
        dataUrl,
        "PNG",
        x + pad,
        barcodeTopY,
        barcodeWidthMM,
        barcodeHeight,
        undefined,
        "FAST"
      );

      // 5) Code article (réservé en bas, jamais chevauché)
      doc.setFont("helvetica", "normal");
      doc.setFontSize(9);
      const codeTextY = y + h - pad - 2;
      doc.text(a.code, centerX, codeTextY, { align: "center" });

      // (option découpe) :
      // doc.setDrawColor(200);
      // doc.setLineWidth(0.1);
      // doc.rect(x, y, w, h);
    };

    // ---------- pagination & placement grille ----------
    for (let i = 0; i < items.length; i++) {
      if (i > 0 && i % (cols * rows) === 0) doc.addPage();

      const indexInPage = i % (cols * rows);
      const row = Math.floor(indexInPage / cols);
      const col = indexInPage % cols;

      const x = marginX + col * (cellW + cellSpacingX);
      const y = marginY + row * (cellH + cellSpacingY);

      await drawLabel(items[i], x, y, cellW, cellH);
    }

    doc.save(filename);
  };

  return (
    <button  onClick={generatePdf} className="flex items-center gap-1 bg-white px-3 py-1 text-blue-dark font-semibold text-xl rounded-md hover:bg-blue-light cursor-pointer hover:shadow-xl transition">
        <svg className="fill-blue-dark" xmlns="http://www.w3.org/2000/svg" width="25" height="25" viewBox="0 0 24 24"><path d="m12 16l-5-5l1.4-1.45l2.6 2.6V4h2v8.15l2.6-2.6L17 11zm-6 4q-.825 0-1.412-.587T4 18v-3h2v3h12v-3h2v3q0 .825-.587 1.413T18 20z"/></svg>
        <p>Valider</p>
    </button>
  );
}

/* ===================== Utils ===================== */

/** Convertit des mm en px à la résolution donnée (ex : 300 DPI pour impression nette). */
function mmToPx(mm: number, dpi = 300) {
  const inch = mm / 25.4;
  return Math.max(1, Math.floor(inch * dpi));
}

/** Rend un Code128 dans un canvas offscreen puis renvoie un DataURL PNG. */
async function renderCode128AsDataURL(
  value: string,
  opts: { widthPx: number; heightPx: number }
): Promise<string> {
  const canvas = document.createElement("canvas");
  canvas.width = opts.widthPx;
  canvas.height = opts.heightPx;

  JsBarcode(canvas, value, {
    format: "CODE128",
    displayValue: false,
    margin: 0,
    width: 2,                // épaisseur de barre en px (mise à l’échelle par widthPx)
    height: opts.heightPx,
    background: "#ffffff",
    lineColor: "#000000",
  });

  return canvas.toDataURL("image/png");
}

/**
 * Wrappe un texte en plusieurs lignes centrées sans dépasser `maxWidthMM`,
 * en limitant le nombre total de lignes à `maxLines`.
 * Utilise la police/taille courante de `doc`.
 */
function wrapTextWithMaxLines(
  doc: jsPDF,
  text: string,
  maxWidthMM: number,
  maxLines: number
): string[] {
  const words = text.trim().split(/\s+/);
  const lines: string[] = [];
  let current = "";

  const fits = (t: string) => doc.getTextWidth(t) <= maxWidthMM;

  // Pousse une ligne, et si c'est la dernière, tronque proprement si nécessaire
  const pushOrTrimLast = (line: string) => {
    if (fits(line)) return lines.push(line);
    // Tronque par mots
    let cut = line;
    while (!fits(cut) && cut.includes(" ")) {
      cut = cut.replace(/\s+\S+$/, "");
    }
    // Si un mot unique dépasse, tronque caractère par caractère
    while (!fits(cut) && cut.length > 0) {
      cut = cut.slice(0, -1);
    }
    lines.push(cut);
  };

  for (const word of words) {
    const test = current ? `${current} ${word}` : word;
    if (fits(test)) {
      current = test;
    } else {
      if (lines.length + 1 >= maxLines) {
        // Dernière ligne : on pousse tronquée et on arrête
        pushOrTrimLast(test);
        return lines;
      } else {
        if (current) {
          lines.push(current);
          current = word;
        } else {
          // Le mot seul ne tient pas -> on le tronque brutalement en dernière ligne
          if (lines.length + 1 >= maxLines) {
            pushOrTrimLast(word);
            return lines;
          } else {
            lines.push(word);
            current = "";
          }
        }
      }
    }
  }
  if (current) {
    if (lines.length + 1 > maxLines) {
      pushOrTrimLast(current);
    } else {
      lines.push(current);
    }
  }
  return lines;
}
