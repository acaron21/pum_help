
type CircularLoaderProps = {
  /** Taille en px */
  size?: number;
  /** Épaisseur du trait */
  strokeWidth?: number;
  /** Durée d'un tour complet (en secondes) */
  speed?: number;
  /** Libellé accessibilité */
  label?: string;
  /** Optionnel: classe pour styler (ex: Tailwind) */
  className?: string;
};

export default function CircularLoader({
  size = 44,
  strokeWidth = 4,
  speed = 1.1,
  label = "Chargement…",
  className,
}: CircularLoaderProps) {
  const r = (size - strokeWidth) / 2;
  const c = 2 * Math.PI * r;

  // Un “segment” visible + un reste transparent
  const dash = c * 0.28;
  const gap = c - dash;

  return (
    <span
      role="status"
      aria-label={label}
      className={className}
      style={{
        display: "inline-flex",
        alignItems: "center",
        justifyContent: "center",
        width: size,
        height: size,
      }}
    >
      <svg
        width={size}
        height={size}
        viewBox={`0 0 ${size} ${size}`}
        style={{
          transformOrigin: "50% 50%",
          animation: `cl-spin ${speed}s linear infinite`,
        }}
      >
        {/* Anneau “soft” en fond */}
        <circle
          cx={size / 2}
          cy={size / 2}
          r={r}
          fill="none"
          stroke="currentColor"
          strokeOpacity={0.15}
          strokeWidth={strokeWidth}
        />

        {/* Segment animé */}
        <circle
          cx={size / 2}
          cy={size / 2}
          r={r}
          fill="none"
          stroke="currentColor"
          strokeWidth={strokeWidth}
          strokeLinecap="round"
          strokeDasharray={`${dash} ${gap}`}
          style={{
            transformOrigin: "50% 50%",
            animation: `cl-dash ${speed * 0.9}s ease-in-out infinite`,
          }}
        />
      </svg>

      {/* Styles scoped simples (ok en TSX) */}
      <style>{`
        @keyframes cl-spin {
          to { transform: rotate(360deg); }
        }
        @keyframes cl-dash {
          0%   { stroke-dasharray: ${c * 0.12} ${c}; transform: rotate(0deg); opacity: .9; }
          50%  { stroke-dasharray: ${c * 0.35} ${c}; transform: rotate(90deg); opacity: 1; }
          100% { stroke-dasharray: ${c * 0.12} ${c}; transform: rotate(360deg); opacity: .9; }
        }
      `}</style>
    </span>
  );
}
