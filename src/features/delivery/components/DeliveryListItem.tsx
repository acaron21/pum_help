import { useState } from "react";
import { Check, Copy, Package } from "lucide-react";

import { cn } from "@/lib/utils";
import { Badge } from "@/components/ui/badge";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

import type { Delivery } from "@/features/delivery/types/delivery.types";

interface DeliveryListItemProps {
  delivery: Delivery;

  /**
   * Indique que la livraison est sélectionnée
   * depuis la liste ou la carte.
   */
  isSelected?: boolean;

  /**
   * Indique que la livraison est survolée
   * depuis la liste ou la carte.
   */
  isHovered?: boolean;

  onClick?: (delivery: Delivery) => void;

  /**
   * Événements permettant de synchroniser
   * le survol avec la carte.
   */
  onMouseEnter?: (delivery: Delivery) => void;
  onMouseLeave?: () => void;
}

/**
 * Retourne le libellé court de l'affectation.
 *
 * Exemples :
 * G + 1  => G1
 * D + 2  => D2
 * VL + 1 => VL1
 */
function getAssignmentLabel(delivery: Delivery): string {
  if (!delivery.vehicle) {
    return "—";
  }

  if (delivery.tourNumber === null) {
    return delivery.vehicle;
  }

  return `${delivery.vehicle}${delivery.tourNumber}`;
}

/**
 * Découpe le numéro de commande afin de rendre
 * les huit premiers caractères plus visibles.
 */
function splitOrderReference(reference: string | null) {
  const cleanedReference = (reference ?? "").replace(/\D/g, "").slice(0, 12);

  return {
    firstPart: cleanedReference.slice(0, 4),
    primaryPart: cleanedReference.slice(4, 8),
    secondaryPart: cleanedReference.slice(8, 12),
    fullReference: cleanedReference,
  };
}

export function DeliveryListItem({
  delivery,
  isSelected = false,
  isHovered = false,
  onClick,
  onMouseEnter,
  onMouseLeave,
}: DeliveryListItemProps) {
  /**
   * Permet d'afficher brièvement "Copié" dans le tooltip
   * après la copie du numéro de commande.
   */
  const [isCopied, setIsCopied] = useState(false);

  const assignmentLabel = getAssignmentLabel(delivery);

  const { firstPart, primaryPart, secondaryPart, fullReference } =
    splitOrderReference(delivery.documentReference ?? delivery.orderReference);

  /**
   * Copie le numéro de commande sans déclencher
   * la sélection générale de la carte.
   */
  async function handleCopyOrderNumber(
    event: React.MouseEvent<HTMLButtonElement>,
  ) {
    event.stopPropagation();

    if (!fullReference) {
      return;
    }

    try {
      await navigator.clipboard.writeText(fullReference);

      setIsCopied(true);

      window.setTimeout(() => {
        setIsCopied(false);
      }, 1500);
    } catch (error) {
      console.error("Impossible de copier le numéro de commande.", error);
    }
  }

  return (
    <article
      role={onClick ? "button" : undefined}
      tabIndex={onClick ? 0 : undefined}
      onClick={() => onClick?.(delivery)}
      onMouseEnter={() => onMouseEnter?.(delivery)}
      onMouseLeave={onMouseLeave}
      onKeyDown={(event) => {
        if (onClick && (event.key === "Enter" || event.key === " ")) {
          event.preventDefault();
          onClick(delivery);
        }
      }}
      className={cn(
        "group rounded-lg border bg-background px-3 py-2 transition-all",

        /**
         * Style normal lorsque la carte est interactive.
         */
        onClick && "cursor-pointer",

        /**
         * Le survol est léger.
         *
         * Il peut être déclenché depuis la liste ou la carte.
         */
        isHovered && !isSelected && "border-primary/40 bg-primary/5 shadow-sm",

        /**
         * La sélection reste plus visible que le survol.
         */
        isSelected && "border-primary bg-primary/10 ring-1 ring-primary/30",

        /**
         * Style de survol local classique.
         */
        !isHovered &&
          !isSelected &&
          onClick &&
          "hover:border-primary/30 hover:bg-muted/40",
      )}
    >
      {/* Avant premiere ligne, geocode */}
      <div className="flex min-w-0 items-center gap-2">
        {/* État compact du géocodage */}
        <span
          title={
            delivery.geocodingStatus === "success"
              ? "Adresse localisée"
              : delivery.geocodingStatus === "failed"
                ? "Adresse introuvable"
                : "Adresse non traitée"
          }
          className={cn(
            "size-2 shrink-0 rounded-full",
            delivery.geocodingStatus === "success" && "bg-success",
            delivery.geocodingStatus === "failed" && "bg-destructive",
            delivery.geocodingStatus === "pending" && "bg-muted-foreground/40",
            delivery.geocodingStatus === "manual" && "bg-warning",
          )}
        />

        <p
          title={delivery.customerName}
          className="min-w-0 flex-1 truncate text-sm font-medium leading-5"
        >
          {delivery.customerName}
        </p>

        {/* Poids et affectation restent ici. */}
      </div>
      {/* Première ligne : client, poids et affectation */}
      <div className="flex min-w-0 items-center gap-2">
        <p
          title={delivery.customerName}
          className="min-w-0 flex-1 truncate text-sm font-medium leading-5"
        >
          {delivery.customerName}
        </p>

        {/* Poids compact, aligné à droite */}
        <span className="shrink-0 text-xs font-medium tabular-nums text-foreground">
          {delivery.weightKg !== null
            ? `${delivery.weightKg.toLocaleString("fr-FR", {
                maximumFractionDigits: 1,
              })} kg`
            : "— kg"}
        </span>

        {/* Affectation réduite à un badge très court */}
        <Badge
          variant={delivery.vehicle ? "secondary" : "outline"}
          className="h-5 min-w-7 shrink-0 justify-center px-1.5 text-[10px]"
        >
          {assignmentLabel}
        </Badge>
      </div>

      {/* Deuxième ligne : localisation et numéro de commande */}
      <div className="mt-1 flex min-w-0 items-center gap-2">
        <p
          title={`${delivery.postalCode} ${delivery.city}`}
          className="min-w-0 flex-1 truncate text-[11px] leading-4 text-muted-foreground"
        >
          {delivery.postalCode} {delivery.city}
        </p>

        {fullReference ? (
          <TooltipProvider>
            <Tooltip>
              {/*
               * asChild indique au Tooltip que notre bouton est lui-même
               * l'élément interactif. Cela évite d'imbriquer deux boutons.
               */}
              <TooltipTrigger>
                <button
                  type="button"
                  aria-label={`Copier la commande ${fullReference}`}
                  onClick={handleCopyOrderNumber}
                  className={cn(
                    /**
                     * Le groupe est limité au numéro de commande.
                     * L'icône de copie apparaît donc uniquement lorsque
                     * ce bouton précis est survolé.
                     */
                    "group/order flex shrink-0 items-center gap-1 rounded-md px-1.5 py-1",
                    "font-mono leading-none transition-colors",
                    "hover:bg-primary/10",
                    "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring",
                  )}
                >
                  {/*
                   * Les huit premiers caractères représentent
                   * la partie principale du numéro de commande.
                   */}
                  <span className="text-[13px] font-bold tracking-tight text-foreground">
                    {firstPart}
                  </span>

                  <span className="text-[13px] font-bold tracking-tight text-primary">
                    {primaryPart}
                  </span>

                  {secondaryPart && (
                    <span className="text-[12px] font-semibold tracking-tight text-muted-foreground">
                      {secondaryPart}
                    </span>
                  )}

                  {/*
                   * L'icône est invisible par défaut et apparaît seulement
                   * lorsque le numéro de commande est survolé.
                   */}
                  {isCopied ? (
                    <Check className="size-3.5 shrink-0 text-success" />
                  ) : (
                    <Copy className="size-3.5 shrink-0 opacity-0 transition-opacity group-hover/order:opacity-60" />
                  )}
                </button>
              </TooltipTrigger>

              <TooltipContent side="top">
                {isCopied ? "Numéro copié" : "Cliquer pour copier"}
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
        ) : (
          <span className="flex shrink-0 items-center gap-1 text-[11px] text-muted-foreground">
            <Package className="size-3" />
            Sans numéro
          </span>
        )}
      </div>
    </article>
  );
}
