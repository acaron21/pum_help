import { type ChangeEvent, type DragEvent, useRef, useState } from "react";

import { FileSpreadsheet, LoaderCircle, UploadCloud } from "lucide-react";

import { cn } from "@/lib/utils";
import { Card } from "@/components/ui/card";

interface CsvDropZoneProps {
  /**
   * Fonction appelée lorsqu'un fichier CSV valide est sélectionné.
   */
  onFileSelected: (file: File) => Promise<void>;

  /**
   * L'import n'est possible que lorsqu'une journée existe.
   */
  disabled?: boolean;
}

export function CsvDropZone({
  onFileSelected,
  disabled = false,
}: CsvDropZoneProps) {
  const inputRef = useRef<HTMLInputElement>(null);

  const [isDragging, setIsDragging] = useState(false);
  const [isImporting, setIsImporting] = useState(false);

  /**
   * Vérifie le fichier puis lance l'import.
   */
  async function processFile(file: File | undefined) {
    if (!file || disabled || isImporting) {
      return;
    }

    const isCsv =
      file.type === "text/csv" || file.name.toLowerCase().endsWith(".csv");

    if (!isCsv) {
      window.alert("Veuillez sélectionner un fichier CSV.");
      return;
    }

    try {
      setIsImporting(true);
      await onFileSelected(file);
    } finally {
      setIsImporting(false);

      /**
       * Permet de sélectionner à nouveau le même fichier.
       */
      if (inputRef.current) {
        inputRef.current.value = "";
      }
    }
  }

  function handleInputChange(event: ChangeEvent<HTMLInputElement>) {
    void processFile(event.target.files?.[0]);
  }

  function handleDrop(event: DragEvent<HTMLDivElement>) {
    event.preventDefault();
    setIsDragging(false);

    void processFile(event.dataTransfer.files?.[0]);
  }

  return (
    <Card
      className={cn(
        "shrink-0 border-dashed p-0 shadow-none transition-colors",
        isDragging && !disabled ? "border-primary bg-primary/5" : "bg-card",
        disabled && "opacity-60",
      )}
      onDragEnter={(event) => {
        event.preventDefault();

        if (!disabled) {
          setIsDragging(true);
        }
      }}
      onDragOver={(event) => {
        event.preventDefault();
      }}
      onDragLeave={() => {
        setIsDragging(false);
      }}
      onDrop={handleDrop}
    >
      {/* Champ fichier invisible déclenché par le bouton */}
      <input
        ref={inputRef}
        type="file"
        accept=".csv,text/csv"
        disabled={disabled || isImporting}
        onChange={handleInputChange}
        className="hidden"
      />

      <button
        type="button"
        disabled={disabled || isImporting}
        onClick={() => inputRef.current?.click()}
        className="flex w-full items-center gap-4 rounded-xl p-5 text-left transition-colors hover:bg-muted/40 disabled:cursor-not-allowed"
      >
        <div className="flex size-12 shrink-0 items-center justify-center rounded-xl bg-primary/10 text-primary">
          {isImporting ? (
            <LoaderCircle className="size-5 animate-spin" />
          ) : (
            <UploadCloud className="size-5" />
          )}
        </div>

        <div className="min-w-0 flex-1">
          <p className="text-sm font-medium">
            {isImporting
              ? "Import en cours…"
              : "Importer les livraisons du jour"}
          </p>

          <p className="mt-1 text-sm text-muted-foreground">
            {disabled
              ? "Créez ou sélectionnez d’abord une journée."
              : "Glissez-déposez le fichier CSV PUM ou cliquez pour le sélectionner."}
          </p>
        </div>

        <div className="hidden items-center gap-2 text-xs text-muted-foreground md:flex">
          <FileSpreadsheet className="size-4" />
          Format CSV
        </div>
      </button>
    </Card>
  );
}
