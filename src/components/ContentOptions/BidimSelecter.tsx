import { useMemo, useState } from "react";
import CopyLabel from "../utils/CopyLabel";
import ScannableBarcode from "../utils/ScannableBarcode";

type Bidim = {
  codePum: number;
  type: string;
  l: number;
  L: number;
  gram: number;
};

const bidims: Bidim[] = [
  { codePum: 62371, type: "GéoPum", L: 0.5, l: 100, gram: 85 },
  { codePum: 62372, type: "GéoPum", L: 1, l: 50, gram: 85 },
  { codePum: 62373, type: "GéoPum", L: 2, l: 25, gram: 85 },

  { codePum: 60274, type: "TS09F-2", L: 6, l: 250, gram: 95 },
  { codePum: 66587, type: "TS09L", L: 2, l: 250, gram: 70 },
  { codePum: 66588, type: "TS09L", L: 4, l: 250, gram: 70 },
  { codePum: 73200, type: "TS10", L: 2, l: 130, gram: 105 },
  { codePum: 73201, type: "TS10", L: 4, l: 130, gram: 105 },
  { codePum: 60565, type: "TS10F-3", L: 4, l: 250, gram: 105 },
  { codePum: 60278, type: "TS30F-4", L: 3, l: 230, gram: 155 },
  { codePum: 73202, type: "TS30F-4", L: 3, l: 130, gram: 155 },
  { codePum: 73203, type: "TS30F-4", L: 4, l: 230, gram: 155 },
  { codePum: 60279, type: "TS30F-4", L: 6, l: 230, gram: 155 },
  { codePum: 60281, type: "TS50F-5", L: 6, l: 180, gram: 200 },
  { codePum: 60283, type: "TS60F-6", L: 6, l: 140, gram: 250 },
  { codePum: 74391, type: "TS70F-7", L: 6, l: 120, gram: 305 },
];

type SortKey = "gram" | "L" | null;
type SortDirection = "asc" | "desc";

export default function BidimSelecter() {
  const [selectedCode, setSelectedCode] = useState<number | null>(null);
  const [sortKey, setSortKey] = useState<SortKey>(null);
  const [sortDirection, setSortDirection] = useState<SortDirection>("asc");

  const handleSort = (key: Exclude<SortKey, null>) => {
    if (sortKey === key) {
      setSortDirection((prev) => (prev === "asc" ? "desc" : "asc"));
      return;
    }

    setSortKey(key);
    setSortDirection("asc");
  };

  const resetFilters = () => {
    setSortKey(null);
    setSortDirection("asc");
    setSelectedCode(null);
  };

  const sortedBidims = useMemo(() => {
    const data = [...bidims];

    if (!sortKey) return data;

    data.sort((a, b) => {
      const aValue = a[sortKey];
      const bValue = b[sortKey];

      if (sortDirection === "asc") {
        return aValue - bValue;
      }

      return bValue - aValue;
    });

    return data;
  }, [sortKey, sortDirection]);

  const getSortIndicator = (key: Exclude<SortKey, null>) => {
    if (sortKey !== key) return "↕";
    return sortDirection === "asc" ? "↑" : "↓";
  };

  function getGramStyle(gram: number) {
    if (gram <= 90) {
        return "bg-green-50 text-green-700";
    }
    if (gram <= 150) {
        return "bg-yellow-50 text-yellow-700";
    }
    if (gram <= 220) {
        return "bg-orange-50 text-orange-700";
    }
    return "bg-red-50 text-red-700";
    }

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between gap-3">
        <div className="flex flex-wrap gap-2">
          <button
            type="button"
            onClick={() => handleSort("L")}
            className="inline-flex items-center gap-2 rounded-full border border-[var(--color-blue-semi-light)] bg-white px-4 py-2 text-sm font-medium text-[var(--color-blue-dark)] transition hover:bg-[var(--color-blue-light)]"
          >
            Trier par largeur
            <span className="text-xs">{getSortIndicator("L")}</span>
          </button>

          <button
            type="button"
            onClick={() => handleSort("gram")}
            className="inline-flex items-center gap-2 rounded-full border border-[var(--color-blue-semi-light)] bg-white px-4 py-2 text-sm font-medium text-[var(--color-blue-dark)] transition hover:bg-[var(--color-blue-light)]"
          >
            Trier par grammage
            <span className="text-xs">{getSortIndicator("gram")}</span>
          </button>
        </div>

        <button
          type="button"
          onClick={resetFilters}
          className="inline-flex items-center rounded-full bg-[var(--color-red-primary)] px-4 py-2 text-sm font-semibold text-white transition hover:opacity-90"
        >
          Reset
        </button>
      </div>

      <div className="max-h-[400px] overflow-y-auto rounded-2xl border border-gray-200 bg-white shadow-sm">
        <table className="w-full border-collapse">
          <thead className="sticky top-0 z-10 bg-[var(--color-blue-light)] text-sm uppercase tracking-wide text-[var(--color-blue-dark)]">
            <tr>
              <th className="px-4 py-3 text-left">Code</th>
              <th className="px-4 py-3 text-left">Type</th>
              <th className="px-4 py-3 text-left">
                <button
                  type="button"
                  onClick={() => handleSort("L")}
                  className="inline-flex items-center gap-2 font-inherit"
                >
                  Dimensions
                  <span className="text-xs">{getSortIndicator("L")}</span>
                </button>
              </th>
              <th className="px-4 py-3 text-left">Surface</th>
              <th className="px-4 py-3 text-left">
                <button
                  type="button"
                  onClick={() => handleSort("gram")}
                  className="inline-flex items-center gap-2 font-inherit"
                >
                  Grammage
                  <span className="text-xs">{getSortIndicator("gram")}</span>
                </button>
              </th>
              <th className="w-[240px] px-4 py-3 text-left">Code-barres</th>
            </tr>
          </thead>

          <tbody className="text-sm text-gray-700">
            {sortedBidims.map((b) => {
              const isSelected = selectedCode === b.codePum;

              return (
                <tr
                  key={b.codePum}
                  onClick={() =>
                    setSelectedCode((prev) =>
                      prev === b.codePum ? null : b.codePum
                    )
                  }
                  className={`
                    cursor-pointer border-b transition last:border-none
                    ${isSelected ? "bg-[var(--color-blue-primary)]/10 ring-1 ring-inset ring-[var(--color-blue-primary)]" : ""}
                    ${!isSelected ? "even:bg-gray-50 hover:bg-[var(--color-blue-light)]" : ""}
                  `}
                >
                  <td className="px-4 py-3 font-medium text-[var(--color-blue-dark)]">
                    <CopyLabel text={b.codePum.toString()} />
                  </td>

                  <td className="px-4 py-3">{b.type}</td>

                  <td className="px-4 py-3">
                    <span className="text-lg font-bold text-[var(--color-blue-dark)]">
                      {b.L}
                    </span>
                    <span className="mx-2 text-gray-400">×</span>
                    <span className="text-lg font-bold text-[var(--color-blue-dark)]">
                      {b.l}
                    </span>
                  </td>

                  <td className="px-4 py-3 font-medium">{b.l * b.L}</td>

                  <td className="px-4 py-3">
                        <span
                            className={`px-3 py-1 rounded-full text-sm font-semibold ${getGramStyle(
                            b.gram
                            )}`}
                        >
                            {b.gram} g
                        </span>
                    </td>

                  <td className="px-4 py-3">
                        <div className="h-[51px] flex items-center">
                            {isSelected ? (
                            <ScannableBarcode value={b.codePum.toString()} />
                            ) : (
                            <span className="text-xs text-gray-400">
                                Cliquer pour afficher
                            </span>
                            )}
                        </div>
                    </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
}