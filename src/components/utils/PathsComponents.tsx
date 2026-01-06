import React from "react";
import type { Path, PathProduct } from "../../pages/Poc/path";

type Props = {
  paths: Path[];
  pathIndex: number;
  setPathIndex: (index: number) => void;
};

export default function MontageResult({
  paths,
  pathIndex,
  setPathIndex,
}: Props) {
  if (!paths || paths.length === 0) return null;

  const currentPath: PathProduct[] = paths[pathIndex]?.paths ?? [];

  return (
    <div className="flex flex-col gap-10 p-8 overflow-x-auto">

      {/* NAVIGATION */}
      <div className="flex items-center justify-center gap-6 select-none">
        <NavArrow
          direction="up"
          disabled={pathIndex === 0}
          onClick={() => setPathIndex(pathIndex - 1)}
        />

        <div className="text-lg font-medium">
          {pathIndex + 1} / {paths.length}
        </div>

        <NavArrow
          direction="down"
          disabled={pathIndex === paths.length - 1}
          onClick={() => setPathIndex(pathIndex + 1)}
        />
      </div>

      {/* MONTAGE – SCROLL VERTICAL */}
      <div
        className="
        flex gap-6 min-w-max
        "
      >
        {currentPath.map((path, index) => (
          <React.Fragment key={index}>
            <ArticleNode path={path} />

            {/* Flèche vers le bas */}
            {index < currentPath.length - 1 && <FlowArrow />}
          </React.Fragment>
        ))}
      </div>
    </div>
  );
}

/* ========================= */
/* ===== ARTICLE NODE ====== */
/* ========================= */

type ArticleNodeProps = {
  path: PathProduct;
};

function ArticleNode({ path }: ArticleNodeProps) {
  return (
    <div className="relative flex flex-col items-center">

      <div
        className="
          relative bg-white rounded-2xl
          shadow-md hover:shadow-xl transition
          px-6 py-5 min-w-[260px]
          border border-blue-primary/20
          overflow-visible
        "
      >
        {/* Connexion IN – haut gauche */}
        {path.in.material !== "start" && (
          <div className="absolute -top-3 -left-3 z-20">
            <ConnexionChip data={path.in} variant="in" />
          </div>
        )}

        {/* Connexion OUT – bas droite */}
        <div className="absolute -bottom-3 -right-3 z-20">
          <ConnexionChip data={path.out} variant="out" />
        </div>

        <p className="text-xs text-gray-400 uppercase tracking-wide">
          Article
        </p>

        <p className="text-xl font-bold text-blue-dark">
          {path.id}
        </p>

        <p className="text-sm text-gray-600 mt-1">
          {path.label}
        </p>
      </div>
    </div>
  );
}

/* ========================= */
/* ===== FLOW ARROW ======== */
/* ========================= */

function FlowArrow() {
  return (
    <div className="flex items-center justify-center">
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="28"
        height="28"
        viewBox="0 0 20 20"
        className="fill-blue-primary opacity-60 rotate-90"
      >
        <path d="M7 1L5.6 2.5L13 10l-7.4 7.5L7 19l9-9z" />
      </svg>
    </div>
  );
}

/* ========================= */
/* ===== CONNEXION CHIP ==== */
/* ========================= */

type ConnexionData = PathProduct["in"];

type ConnexionChipProps = {
  data: ConnexionData;
  variant: "in" | "out";
};

function ConnexionChip({ data, variant }: ConnexionChipProps) {
  return (
    <div
      className={`
        px-3 py-1 rounded-full text-xs font-medium
        shadow-md whitespace-nowrap
        ${
          variant === "in"
            ? "bg-blue-primary text-white"
            : "bg-blue-dark text-white"
        }
      `}
    >
      {data.material} · {data.type} · Ø{data.diam} · {data.sexe}
    </div>
  );
}

/* ========================= */
/* ===== NAV ARROW ========= */
/* ========================= */

type NavArrowProps = {
  direction: "up" | "down";
  onClick: () => void;
  disabled: boolean;
};

function NavArrow({ direction, onClick, disabled }: NavArrowProps) {
  return (
    <button
      onClick={onClick}
      disabled={disabled}
      className={`
        w-12 h-12 rounded-full flex items-center justify-center
        transition
        ${
          disabled
            ? "bg-gray-200 cursor-not-allowed"
            : "bg-blue-light hover:bg-blue-primary/30"
        }
      `}
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="28"
        height="28"
        viewBox="0 0 20 20"
        className={`
          fill-current transition
          ${disabled ? "text-gray-400" : "text-blue-dark"}
          ${direction === "up" ? "-rotate-90" : "rotate-90"}
        `}
      >
        <path d="M7 1L5.6 2.5L13 10l-7.4 7.5L7 19l9-9z" />
      </svg>
    </button>
  );
}
