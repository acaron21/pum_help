import {
  CalendarDays,
  Check,
  Clock3,
  History,
  LoaderCircle,
  MapPinCheck,
  PackageCheck,
  Plus,
  Trash2,
} from "lucide-react";

import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Separator } from "@/components/ui/separator";

import { useEffect, useState } from "react";
import { useLiveQuery } from "dexie-react-hooks";

import { db } from "@/db/app-database";

import { CsvDropZone } from "@/features/delivery/components/CsvDropZone";

import {
  createDeliveryDay,
  deleteDeliveryDay,
} from "@/features/delivery/services/delivery-day.service";

import { importDeliveriesFromCsv } from "@/features/delivery/services/delivery-import.service";

import { DeliveryListItem } from "@/features/delivery/components/DeliveryListItem";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { cn } from "@/lib/utils";

import { DeliveryMap } from "@/features/delivery/components/map/DeliveryMap";
import { geocodeDeliveryDay } from "@/features/delivery/services/geocoding.service";

export function DeliveryTool() {
  /**
   * Identifiants des livraisons sélectionnées sur la carte.
   *
   * Set est pratique ici car il permet de vérifier rapidement
   * si une livraison est sélectionnée.
   *
   * Cet état est purement temporaire :
   * - pas d'écriture IndexedDB ;
   * - pas de localStorage ;
   * - perdu au rechargement de la page.
   */
  const [selectedDeliveryIds, setSelectedDeliveryIds] = useState<Set<string>>(
    () => new Set(),
  );

  /**
   * Ajoute une livraison à la sélection si elle n'y est pas,
   * ou la retire si elle est déjà sélectionnée.
   */
  // function toggleDeliverySelection(deliveryId: string) {
  //   setSelectedDeliveryIds((currentSelection) => {
  //     /**
  //      * On crée un nouveau Set.
  //      *
  //      * Il ne faut pas modifier directement le Set existant,
  //      * sinon React peut ne pas détecter correctement le changement.
  //      */
  //     const nextSelection = new Set(currentSelection);

  //     if (nextSelection.has(deliveryId)) {
  //       nextSelection.delete(deliveryId);
  //     } else {
  //       nextSelection.add(deliveryId);
  //     }

  //     return nextSelection;
  //   });
  // }

  /**
   * Identifiant de la journée actuellement ouverte.
   */
  /**
   * La journée active est initialisée depuis localStorage.
   *
   * IndexedDB contient les données métier.
   * localStorage contient uniquement l'identifiant de la dernière
   * journée consultée afin de la rouvrir après actualisation.
   */
  const [activeDayId, setActiveDayId] = useState<string | null>(() => {
    return localStorage.getItem("pum-active-delivery-day");
  });

  /**
   * Sélectionne une journée et mémorise son identifiant.
   */
  function selectDeliveryDay(dayId: string) {
    setActiveDayId(dayId);
    localStorage.setItem("pum-active-delivery-day", dayId);
    setIsHistoryOpen(false);
  }

  /**
   * Contrôle l'ouverture du panneau d'historique.
   */
  const [isHistoryOpen, setIsHistoryOpen] = useState(false);

  /**
   * Charge les journées avec le nombre de livraisons associées.
   *
   * useLiveQuery réexécute cette fonction lorsqu'une journée ou une
   * livraison est ajoutée, modifiée ou supprimée.
   */
  const dayHistory = useLiveQuery(
    async () => {
      const days = await db.deliveryDays.orderBy("date").reverse().toArray();

      return Promise.all(
        days.map(async (day) => {
          const deliveryCount = await db.deliveries
            .where("dayId")
            .equals(day.id)
            .count();

          return {
            ...day,
            deliveryCount,
          };
        }),
      );
    },
    [],
    [],
  );

  /**
   * Charge la journée active.
   */
  const activeDay = useLiveQuery(async () => {
    if (!activeDayId) {
      return undefined;
    }

    return db.deliveryDays.get(activeDayId);
  }, [activeDayId]);

  /**
   * Charge les livraisons de la journée active.
   */
  const deliveries = useLiveQuery(
    async () => {
      if (!activeDayId) {
        return [];
      }

      return db.deliveries.where("dayId").equals(activeDayId).toArray();
    },
    [activeDayId],
    [],
  );

  /**
   * Crée une journée pour aujourd'hui.
   *
   * Plus tard, on ouvrira un Dialog permettant de choisir la date.
   */
  async function handleCreateDay() {
    const today = new Date().toISOString().slice(0, 10);

    const createdDay = await createDeliveryDay(today);

    selectDeliveryDay(createdDay.id);
  }

  /**
   * Importe le CSV dans la journée active.
   */
  async function handleCsvSelected(file: File) {
    if (!activeDayId) {
      return;
    }

    try {
      const result = await importDeliveriesFromCsv(file, activeDayId);

      window.alert(
        [
          `${result.importedDeliveries.length} livraison(s) importée(s).`,
          `${result.ignoredRowsCount} ligne(s) ignorée(s).`,
          `${result.parsingErrors.length} avertissement(s) CSV.`,
        ].join("\n"),
      );
    } catch (error) {
      console.error(error);

      window.alert("Une erreur est survenue pendant l’import du CSV.");
    }
  }

  /**
   * Supprime une journée et toutes ses livraisons.
   *
   * Si la journée supprimée était ouverte, on oublie son identifiant.
   * useLiveQuery mettra automatiquement l'historique à jour.
   */
  async function handleDeleteDay(dayId: string) {
    try {
      await deleteDeliveryDay(dayId);

      if (activeDayId === dayId) {
        setActiveDayId(null);

        localStorage.removeItem("pum-active-delivery-day");
      }
    } catch (error) {
      console.error("Impossible de supprimer la journée.", error);
    }
  }

  //#region  Survole highlight
  /**
   * Livraison actuellement sélectionnée.
   *
   * Cette sélection est seulement visuelle.
   * Elle n'est pas enregistrée dans IndexedDB.
   */
  const [selectedDeliveryId, setSelectedDeliveryId] = useState<string | null>(
    null,
  );

  /**
   * Livraison actuellement survolée.
   *
   * Le survol peut venir :
   * - d'une carte dans la liste ;
   * - d'une pastille sur la carte.
   */
  const [hoveredDeliveryId, setHoveredDeliveryId] = useState<string | null>(
    null,
  );

  /**
   * Sélectionne une livraison.
   *
   * Si elle est déjà sélectionnée, le second clic
   * la désélectionne.
   */
  function toggleDeliverySelection(deliveryId: string) {
    setSelectedDeliveryId((currentId) =>
      currentId === deliveryId ? null : deliveryId,
    );
  }
  //#endregion
  //#region GEOCODE
  /**
   * Indique qu'un géocodage est actuellement en cours.
   *
   * Cela empêche de lancer deux traitements simultanément.
   */
  const [isGeocoding, setIsGeocoding] = useState(false);

  /**
   * Permet d'afficher une progression comme :
   * "7 / 15".
   */
  const [geocodingProgress, setGeocodingProgress] = useState({
    completed: 0,
    total: 0,
  });

  /**
   * Lance le géocodage des livraisons
   * de la journée actuellement ouverte.
   */
  async function handleGeocodeDay() {
    if (!activeDayId || isGeocoding) {
      return;
    }

    try {
      setIsGeocoding(true);

      setGeocodingProgress({
        completed: 0,
        total: 0,
      });

      const result = await geocodeDeliveryDay(
        activeDayId,
        (completed, total) => {
          setGeocodingProgress({
            completed,
            total,
          });
        },
      );

      console.info("Géocodage terminé", result);
    } catch (error) {
      console.error("Impossible de géocoder la journée.", error);
    } finally {
      setIsGeocoding(false);
    }
  }
  //#endregion

  //#region USEEFFECT

  /**
   * Une sélection appartient uniquement à la journée actuellement ouverte.
   *
   * Lorsqu'on change de journée, on repart donc avec
   * une sélection complètement vide.
   */
  useEffect(() => {
    setSelectedDeliveryIds(new Set());
    setSelectedDeliveryId(null);
    setHoveredDeliveryId(null);
  }, [activeDayId]);
  /**
   * Vérifie que la journée mémorisée existe encore.
   *
   * Si elle n'existe plus, la journée la plus récente est ouverte.
   */
  useEffect(() => {
    if (!dayHistory.length) {
      return;
    }

    const activeDayStillExists = dayHistory.some(
      (day) => day.id === activeDayId,
    );

    if (!activeDayStillExists) {
      selectDeliveryDay(dayHistory[0].id);
    }
  }, [dayHistory, activeDayId]);

  useEffect(() => {}, [activeDayId]);
  //#endregion

  return (
    /**
     * La page entière occupe la hauteur disponible.
     *
     * overflow-hidden évite que la carte et le panneau latéral
     * fassent défiler toute l'application.
     */
    <section className="flex h-[calc(100vh-4rem)] min-h-0 flex-col bg-background">
      {/* Barre supérieure de gestion des journées */}
      <header className="shrink-0 border-b bg-card">
        <div className="flex min-h-20 items-center justify-between gap-4 px-6">
          {/* Titre de l'outil */}
          <div className="flex min-w-0 items-center gap-4">
            <div className="flex size-11 shrink-0 items-center justify-center rounded-xl bg-primary/10 text-primary">
              <PackageCheck className="size-5" />
            </div>

            <div className="min-w-0">
              <div className="flex items-center gap-2">
                <h1 className="truncate text-xl font-semibold tracking-tight">
                  Gestion des livraisons
                </h1>

                {/* Indique qu'aucune journée n'est encore sélectionnée */}
                <Badge variant="secondary">
                  {activeDay ? activeDay.label : "Aucune journée active"}
                </Badge>
              </div>
            </div>
          </div>

          {/* Actions principales liées aux journées */}
          <div className="flex shrink-0 items-center gap-2">
            <Sheet open={isHistoryOpen} onOpenChange={setIsHistoryOpen}>
              {/* Le bouton ouvre le panneau d'historique. */}
              <SheetTrigger>
                <Button type="button" variant="outline">
                  <History className="size-4" />
                  Historique
                </Button>
              </SheetTrigger>

              {/* Le panneau s'ouvre depuis la droite. */}
              <SheetContent className="flex w-full flex-col sm:max-w-md">
                <SheetHeader>
                  <SheetTitle>Historique des journées</SheetTitle>

                  <SheetDescription>
                    Retrouvez et ouvrez une journée précédemment enregistrée.
                  </SheetDescription>
                </SheetHeader>

                {/* Liste des journées présentes dans IndexedDB. */}
                <div className="min-h-0 flex-1 overflow-y-auto px-4 pb-4">
                  {dayHistory.length === 0 ? (
                    <div className="flex min-h-56 flex-col items-center justify-center rounded-xl border border-dashed bg-muted/20 p-6 text-center">
                      <CalendarDays className="size-8 text-muted-foreground/40" />

                      <p className="mt-4 text-sm font-medium">
                        Aucune journée enregistrée
                      </p>

                      <p className="mt-2 text-xs leading-5 text-muted-foreground">
                        Les journées créées apparaîtront dans cet historique.
                      </p>
                    </div>
                  ) : (
                    <div className="space-y-2">
                      {dayHistory.map((day) => {
                        const isActive = day.id === activeDayId;

                        return (
                          <div
                            key={day.id}
                            className={cn(
                              "group flex items-center gap-2 rounded-xl border p-2 transition-colors",
                              isActive
                                ? "border-primary bg-primary/5"
                                : "bg-background hover:bg-muted/50",
                            )}
                          >
                            {/* Bouton principal permettant d'ouvrir la journée */}
                            <button
                              type="button"
                              onClick={() => selectDeliveryDay(day.id)}
                              className="flex min-w-0 flex-1 items-center gap-3 rounded-lg p-2 text-left"
                            >
                              <div
                                className={cn(
                                  "flex size-9 shrink-0 items-center justify-center rounded-lg",
                                  isActive
                                    ? "bg-primary text-primary-foreground"
                                    : "bg-muted text-muted-foreground",
                                )}
                              >
                                <CalendarDays className="size-4" />
                              </div>

                              <div className="min-w-0 flex-1">
                                <p className="truncate text-sm font-medium">
                                  {day.label}
                                </p>

                                <p className="mt-0.5 text-xs text-muted-foreground">
                                  {day.deliveryCount} livraison
                                  {day.deliveryCount !== 1 ? "s" : ""}
                                </p>
                              </div>

                              {isActive && (
                                <Check className="size-4 shrink-0 text-primary" />
                              )}
                            </button>

                            {/* Suppression directe de la journée */}
                            <TooltipProvider>
                              <Tooltip>
                                <TooltipTrigger>
                                  <Button
                                    type="button"
                                    variant="ghost"
                                    size="icon"
                                    aria-label={`Supprimer la journée ${day.label}`}
                                    onClick={(event) => {
                                      /**
                                       * Le clic ne doit pas sélectionner la journée.
                                       */
                                      event.stopPropagation();

                                      /**
                                       * La journée et ses livraisons sont supprimées immédiatement.
                                       */
                                      void handleDeleteDay(day.id);
                                    }}
                                    className="size-8 shrink-0 text-muted-foreground opacity-0 transition-opacity hover:bg-destructive/10 hover:text-destructive group-hover:opacity-100"
                                  >
                                    <Trash2 className="size-4" />
                                  </Button>
                                </TooltipTrigger>

                                <TooltipContent side="left">
                                  Supprimer la journée
                                </TooltipContent>
                              </Tooltip>
                            </TooltipProvider>
                          </div>
                        );
                      })}
                    </div>
                  )}
                </div>
              </SheetContent>
            </Sheet>

            <Button type="button" onClick={handleCreateDay}>
              <Plus className="size-4" />
              Nouvelle journée
            </Button>
          </div>
        </div>

        {/*
         * Cette seconde ligne pourra afficher les informations
         * de la journée active lorsque la logique sera développée.
         */}
        <div className="flex min-h-11 items-center gap-6 border-t bg-muted/25 px-6 text-sm">
          <div className="flex items-center gap-2 text-muted-foreground">
            <CalendarDays className="size-4" />

            <span>{activeDay ? activeDay.label : "Date non définie"}</span>
          </div>

          <Separator orientation="vertical" className="h-4" />

          <div className="flex items-center gap-2 text-muted-foreground">
            <Clock3 className="size-4" />
            <span>Dernière sauvegarde : aucune</span>
          </div>
        </div>
      </header>

      {/*
       * Corps principal de l'outil.
       *
       * La grille comprend :
       * - une colonne principale flexible pour l'import et la carte ;
       * - une colonne fixe à droite pour les livraisons.
       */}
      <div className="grid min-h-0 flex-1 grid-cols-[minmax(0,1fr)_22rem]">
        {/* Zone centrale */}
        <div className="flex min-h-0 min-w-0 flex-col gap-4 p-4">
          {/* Zone de glisser-déposer du fichier CSV */}
          <CsvDropZone
            disabled={!activeDayId}
            onFileSelected={handleCsvSelected}
          />

          {/* Zone réservée à la future carte Leaflet */}
          <Card className="relative min-h-0 flex-1 overflow-hidden p-0">
            <DeliveryMap
              deliveries={deliveries}
              selectedDeliveryIds={selectedDeliveryIds}
              onToggleDelivery={toggleDeliverySelection}
            />

            {/*
             * Compteur purement informatif.
             *
             * Il reflète la sélection React temporaire.
             */}
            {selectedDeliveryIds.size > 0 && (
              <div className="pointer-events-none absolute left-4 top-4 z-[500]">
                <Badge className="shadow-sm">
                  {selectedDeliveryIds.size} sélectionnée
                  {selectedDeliveryIds.size > 1 ? "s" : ""}
                </Badge>
              </div>
            )}
          </Card>
        </div>

        {/* Panneau latéral droit pour les points de livraison */}
        <aside className="flex min-h-0 flex-col border-l bg-card">
          {/* En-tête du panneau */}
          <div className="shrink-0 border-b px-5 py-4">
            <div className="flex items-center justify-between gap-3">
              <div>
                <h2 className="text-sm font-semibold">Points de livraison</h2>

                <p className="mt-1 text-xs text-muted-foreground">
                  Affectation, tournée et ordre de passage
                </p>
              </div>

              {/* Nombre provisoire de livraisons */}
              <Badge variant="secondary">{deliveries.length}</Badge>
            </div>
          </div>

          {/* Zone de filtres à compléter ultérieurement */}
          <div className="shrink-0 border-b p-4 flex gap-1">
            <Button
              type="button"
              variant="outline"
              disabled={selectedDeliveryIds.size === 0}
              onClick={() => {
                /**
                 * La sélection est simplement remise à zéro.
                 */
                setSelectedDeliveryIds(new Set());
              }}
            >
              Tout désélectionner
            </Button>

            <Button
              type="button"
              variant="outline"
              disabled={!activeDayId || deliveries.length === 0 || isGeocoding}
              onClick={() => {
                void handleGeocodeDay();
              }}
            >
              {isGeocoding ? (
                <LoaderCircle className="size-4 animate-spin" />
              ) : (
                <MapPinCheck className="size-4" />
              )}

              {isGeocoding
                ? geocodingProgress.total > 0
                  ? `${geocodingProgress.completed}/${geocodingProgress.total}`
                  : "Préparation…"
                : "Géocoder"}
            </Button>
          </div>

          {/*
           * Liste scrollable des points de livraison.
           *
           * Chaque livraison deviendra ensuite une carte déplaçable
           * ou un élément réordonnable.
           */}
          <ScrollArea className="min-h-0 flex-1">
            {deliveries.length === 0 ? (
              <div className="flex min-h-64 flex-col items-center justify-center rounded-xl border border-dashed bg-muted/20 p-6 text-center">
                <PackageCheck className="size-8 text-muted-foreground/40" />

                <p className="mt-4 text-sm font-medium">
                  Aucune livraison importée
                </p>

                <p className="mt-2 text-xs leading-5 text-muted-foreground">
                  Les livraisons issues du fichier CSV apparaîtront ici.
                </p>
              </div>
            ) : (
              <div className="space-y-1.5 p-3">
                {deliveries.map((delivery) => (
                  <DeliveryListItem
                    key={delivery.id}
                    delivery={delivery}
                    /**
                     * La sélection peut provenir d'un clic
                     * dans la liste ou sur la carte.
                     */
                    isSelected={selectedDeliveryId === delivery.id}
                    /**
                     * Le survol peut également provenir
                     * des deux zones.
                     */
                    isHovered={hoveredDeliveryId === delivery.id}
                    onClick={(selectedDelivery) => {
                      toggleDeliverySelection(selectedDelivery.id);
                    }}
                    onMouseEnter={(hoveredDelivery) => {
                      setHoveredDeliveryId(hoveredDelivery.id);
                    }}
                    onMouseLeave={() => {
                      setHoveredDeliveryId(null);
                    }}
                  />
                ))}
              </div>
            )}
          </ScrollArea>

          {/* Barre d'état du panneau de livraison */}
          <div className="shrink-0 border-t px-5 py-3">
            <div className="flex items-center justify-between text-xs text-muted-foreground">
              <span>0 livraison affectée</span>
              <span>0 non affectée</span>
            </div>
          </div>
        </aside>
      </div>
    </section>
  );
}
