import { useState } from "react";
import {
  ChevronLeft,
  ChevronRight,
  PackageCheck,
  PanelLeft,
  TriangleAlert,
} from "lucide-react";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { DeliveryTool } from "./tools/DeliveryTool";
import { StockAnomaliesTool } from "./tools/StockAnomaliesTool";

/**
 * Identifiants uniques des outils disponibles dans l'espace RM.
 *
 * Ajouter un nouvel outil nécessite d'ajouter son identifiant ici,
 * puis de l'ajouter dans le tableau rmTools.
 */
type RmToolId = "delivery" | "stock-anomalies";

/**
 * Structure commune utilisée pour afficher un outil dans la sidebar.
 */
interface RmTool {
  id: RmToolId;
  label: string;
  description: string;
  icon: typeof PackageCheck;
}

/**
 * Liste des outils disponibles dans l'espace RM.
 *
 * Ce tableau permet de générer automatiquement la navigation latérale.
 */
const rmTools: RmTool[] = [
  {
    id: "delivery",
    label: "Livraison",
    description: "Organisation des tournées",
    icon: PackageCheck,
  },
  {
    id: "stock-anomalies",
    label: "Anomalies de stock",
    description: "Suivi des écarts et erreurs",
    icon: TriangleAlert,
  },
];

export function RmWorkspace() {
  /**
   * Outil actuellement affiché dans la partie principale.
   */
  const [activeTool, setActiveTool] = useState<RmToolId>("delivery");

  /**
   * Permet de réduire ou de développer la sidebar.
   *
   * En mode réduit, seules les icônes restent visibles.
   */
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);

  return (
    <div className="flex min-h-[calc(100vh-4rem)] bg-background">
      {/* Sidebar de navigation des outils RM */}
      <aside
        className={cn(
          "relative flex shrink-0 flex-col border-r bg-card transition-[width] duration-300",
          isSidebarOpen ? "w-72" : "w-20",
        )}
      >
        {/* En-tête de la sidebar */}
        <div
          className={cn(
            "flex h-20 items-center gap-3",
            isSidebarOpen ? "px-6" : "justify-center px-3",
          )}
        >
          <div className="flex size-10 shrink-0 items-center justify-center rounded-lg bg-primary/10 text-primary">
            <PanelLeft className="size-5" />
          </div>

          {/* Le texte est masqué lorsque la sidebar est repliée */}
          {isSidebarOpen && (
            <div className="min-w-0">
              <p className="truncate text-sm font-semibold text-foreground">
                Outils RM
              </p>

              <p className="truncate text-xs text-muted-foreground">
                Pilotage de l’exploitation
              </p>
            </div>
          )}
        </div>

        <Separator />

        {/* Navigation principale */}
        <nav aria-label="Outils RM" className="flex flex-1 flex-col gap-1 p-3">
          {isSidebarOpen && (
            <p className="mb-2 px-3 text-xs font-medium uppercase tracking-wider text-muted-foreground">
              Outils
            </p>
          )}

          {rmTools.map((tool) => {
            const Icon = tool.icon;
            const isActive = activeTool === tool.id;

            return (
              <Button
                key={tool.id}
                type="button"
                variant="ghost"
                title={!isSidebarOpen ? tool.label : undefined}
                onClick={() => setActiveTool(tool.id)}
                className={cn(
                  "h-auto rounded-lg py-3",
                  isSidebarOpen
                    ? "w-full justify-start gap-3 px-3 text-left"
                    : "w-full justify-center px-2",
                  isActive
                    ? "bg-primary/10 text-primary hover:bg-primary/15 hover:text-primary"
                    : "text-muted-foreground hover:bg-muted hover:text-foreground",
                )}
              >
                {/* Icône de l'outil */}
                <div
                  className={cn(
                    "flex size-9 shrink-0 items-center justify-center rounded-md",
                    isActive
                      ? "bg-primary text-primary-foreground"
                      : "bg-muted text-muted-foreground",
                  )}
                >
                  <Icon className="size-4" />
                </div>

                {/* Informations textuelles visibles uniquement en mode ouvert */}
                {isSidebarOpen && (
                  <div className="min-w-0">
                    <p className="truncate text-sm font-medium">{tool.label}</p>

                    <p
                      className={cn(
                        "truncate text-xs font-normal",
                        isActive ? "text-primary/70" : "text-muted-foreground",
                      )}
                    >
                      {tool.description}
                    </p>
                  </div>
                )}
              </Button>
            );
          })}
        </nav>

        {/* Pied de sidebar */}
        {isSidebarOpen && (
          <div className="border-t px-6 py-4">
            <p className="text-xs text-muted-foreground">
              PUM · Organisation interne
            </p>
          </div>
        )}

        {/* Bouton permettant d'ouvrir ou de fermer la sidebar */}
        <Button
          type="button"
          variant="outline"
          size="icon"
          aria-label={
            isSidebarOpen
              ? "Réduire la barre latérale"
              : "Développer la barre latérale"
          }
          onClick={() => setIsSidebarOpen((current) => !current)}
          className="absolute -right-4 top-24 z-20 size-8 rounded-full bg-background shadow-sm"
        >
          {isSidebarOpen ? (
            <ChevronLeft className="size-4" />
          ) : (
            <ChevronRight className="size-4" />
          )}
        </Button>
      </aside>

      {/* Contenu de l'outil actuellement sélectionné */}
      <main className="min-w-0 flex-1 overflow-hidden">
        {activeTool === "delivery" && <DeliveryTool />}

        {activeTool === "stock-anomalies" && <StockAnomaliesTool />}
      </main>
    </div>
  );
}
