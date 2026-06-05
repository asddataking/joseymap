export function MapBackground() {
  return (
    <div className="pointer-events-none fixed inset-0 overflow-hidden" aria-hidden>
      <div className="absolute inset-0 map-grid map-noise" />
      <div className="absolute inset-0 bg-gradient-to-b from-cannabis-green/5 via-transparent to-map-dark" />
      <div className="absolute left-1/2 top-0 h-[600px] w-[800px] -translate-x-1/2 bg-green-glow opacity-60" />

      {/* Compass — top right */}
      <svg
        className="absolute right-4 top-28 h-28 w-28 animate-float opacity-[0.08] sm:right-12 sm:h-40 sm:w-40"
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

      {/* X marks */}
      <svg className="absolute bottom-48 left-8 h-16 w-16 opacity-[0.06]" viewBox="0 0 60 60" fill="none">
        <path d="M30 5 C15 20 10 35 30 55 C50 35 45 20 30 5Z" stroke="#22c55e" strokeWidth="1.5" strokeDasharray="4 4" />
        <text x="22" y="35" fill="#d4af37" fontSize="16" fontFamily="serif">X</text>
      </svg>
      <svg className="absolute bottom-64 right-12 h-12 w-12 opacity-[0.05]" viewBox="0 0 60 60" fill="none">
        <path d="M30 5 C15 20 10 35 30 55 C50 35 45 20 30 5Z" stroke="#d4af37" strokeWidth="1.5" strokeDasharray="4 4" />
        <text x="22" y="35" fill="#d4af37" fontSize="14" fontFamily="serif">X</text>
      </svg>

      {/* Vignette */}
      <div className="absolute inset-0 bg-gradient-to-t from-map-dark via-transparent to-map-dark/50" />
    </div>
  );
}
