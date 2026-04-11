// ============================================
// Al-Nakhla Academy — Logo Mark
// Stylized palm tree + shield badge
// ============================================

export default function Logo({
  className = "",
  variant = "full",
}: {
  className?: string;
  variant?: "full" | "mark";
}) {
  if (variant === "mark") {
    return (
      <svg
        viewBox="0 0 48 48"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className={className}
      >
        <defs>
          <linearGradient id="goldGrad" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stopColor="#D4B26A" />
            <stop offset="100%" stopColor="#A07E34" />
          </linearGradient>
        </defs>
        {/* Shield */}
        <path
          d="M24 4 L40 10 L40 24 Q40 36 24 44 Q8 36 8 24 L8 10 Z"
          fill="#0F2C5C"
          stroke="url(#goldGrad)"
          strokeWidth="1"
        />
        {/* Palm leaves */}
        <g stroke="url(#goldGrad)" strokeWidth="1.5" strokeLinecap="round" fill="none">
          <path d="M24 32 L24 18" />
          <path d="M24 22 Q18 18 14 20" />
          <path d="M24 22 Q30 18 34 20" />
          <path d="M24 18 Q19 14 16 15" />
          <path d="M24 18 Q29 14 32 15" />
          <path d="M24 14 Q21 11 18 11" />
          <path d="M24 14 Q27 11 30 11" />
        </g>
        {/* Trunk base */}
        <circle cx="24" cy="33" r="1.5" fill="url(#goldGrad)" />
      </svg>
    );
  }

  return (
    <div className={`inline-flex items-center gap-3 ${className}`}>
      <svg
        viewBox="0 0 48 48"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="h-11 w-11 shrink-0"
      >
        <defs>
          <linearGradient id="goldGradFull" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stopColor="#D4B26A" />
            <stop offset="100%" stopColor="#A07E34" />
          </linearGradient>
        </defs>
        <path
          d="M24 4 L40 10 L40 24 Q40 36 24 44 Q8 36 8 24 L8 10 Z"
          fill="#0F2C5C"
          stroke="url(#goldGradFull)"
          strokeWidth="1"
        />
        <g stroke="url(#goldGradFull)" strokeWidth="1.5" strokeLinecap="round" fill="none">
          <path d="M24 32 L24 18" />
          <path d="M24 22 Q18 18 14 20" />
          <path d="M24 22 Q30 18 34 20" />
          <path d="M24 18 Q19 14 16 15" />
          <path d="M24 18 Q29 14 32 15" />
          <path d="M24 14 Q21 11 18 11" />
          <path d="M24 14 Q27 11 30 11" />
        </g>
        <circle cx="24" cy="33" r="1.5" fill="url(#goldGradFull)" />
      </svg>
      <div className="flex flex-col leading-none">
        <span className="font-serif text-lg font-bold text-[var(--color-navy)] tracking-tight">
          Al-Nakhla
        </span>
        <span className="text-[10px] font-medium tracking-[0.25em] uppercase text-[var(--color-gold)]">
          International Academy
        </span>
      </div>
    </div>
  );
}
