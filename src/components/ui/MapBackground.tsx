export function MapBackground() {
  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden" aria-hidden>
      <div className="absolute inset-0 map-grid map-noise" />
      <div className="absolute inset-0 bg-green-glow" />
      <svg
        className="absolute right-8 top-24 h-32 w-32 animate-float opacity-10"
        viewBox="0 0 100 100"
        fill="none"
      >
        <circle cx="50" cy="50" r="45" stroke="#d4af37" strokeWidth="1" />
        <circle cx="50" cy="50" r="35" stroke="#d4af37" strokeWidth="0.5" />
        <path d="M50 5 L52 40 L50 50 L48 40 Z" fill="#d4af37" opacity="0.6" />
        <path d="M50 95 L52 60 L50 50 L48 60 Z" fill="#d4af37" opacity="0.4" />
        <path d="M5 50 L40 52 L50 50 L40 48 Z" fill="#d4af37" opacity="0.4" />
        <path d="M95 50 L60 52 L50 50 L60 48 Z" fill="#d4af37" opacity="0.6" />
        <circle cx="50" cy="50" r="4" fill="#22c55e" />
      </svg>
      <svg
        className="absolute bottom-32 left-6 h-20 w-20 opacity-5"
        viewBox="0 0 60 60"
        fill="none"
      >
        <path
          d="M30 5 C15 20 10 35 30 55 C50 35 45 20 30 5Z"
          stroke="#22c55e"
          strokeWidth="1.5"
          strokeDasharray="4 4"
        />
        <text x="22" y="35" fill="#d4af37" fontSize="16" fontFamily="serif">
          X
        </text>
      </svg>
    </div>
  );
}
