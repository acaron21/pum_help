import { TriangleAlert } from "lucide-react";

export function StockAnomaliesTool() {
  return (
    <section className="min-h-full p-6 lg:p-8">
      <div className="mx-auto flex max-w-7xl flex-col gap-6">
        <header className="flex items-start gap-4">
          <div className="flex size-11 shrink-0 items-center justify-center rounded-xl bg-warning-light text-warning">
            <TriangleAlert className="size-5" />
          </div>

          <div>
            <h1 className="text-2xl font-semibold tracking-tight">
              Anomalies de stock
            </h1>

            <p className="mt-1 text-sm text-muted-foreground">
              Identifiez, documentez et suivez les écarts de stock constatés.
            </p>
          </div>
        </header>

        <div className="app-panel flex min-h-96 items-center justify-center p-8">
          <div className="max-w-md text-center">
            <TriangleAlert className="mx-auto size-10 text-muted-foreground/50" />

            <h2 className="mt-4 text-base font-medium">
              Suivi des anomalies de stock
            </h2>

            <p className="mt-2 text-sm leading-6 text-muted-foreground">
              Cette zone accueillera prochainement la déclaration, le suivi et
              l’historique des écarts de stock.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
