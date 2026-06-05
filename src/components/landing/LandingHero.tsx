import { TreasureButton } from "@/components/TreasureButton";

type LandingHeroProps = {
  isAuthenticated: boolean;
  authEnabled: boolean;
  huntHref: string;
  signupHref: string;
  firstEventName?: string;
};

export function LandingHero({
  isAuthenticated,
  authEnabled,
  huntHref,
  signupHref,
  firstEventName,
}: LandingHeroProps) {
  return (
    <section className="relative flex min-h-[88dvh] flex-col items-center justify-center overflow-hidden px-4 pb-16 pt-8">
      {/* Ambient orbs */}
      <div className="pointer-events-none absolute left-1/4 top-20 h-64 w-64 rounded-full bg-cannabis-green/10 blur-[100px] animate-pulse-glow" />
      <div className="pointer-events-none absolute bottom-20 right-1/4 h-48 w-48 rounded-full bg-treasure-gold/10 blur-[80px] animate-pulse-glow animation-delay-1000" />

      {/* Decorative map frame */}
      <div className="pointer-events-none absolute inset-x-0 top-1/2 -translate-y-1/2 opacity-[0.07]">
        <svg viewBox="0 0 400 300" className="mx-auto h-auto w-full max-w-2xl" fill="none">
          <rect x="20" y="20" width="360" height="260" rx="8" stroke="#d4af37" strokeWidth="2" strokeDasharray="8 6" />
          <path d="M80 220 Q120 80 200 140 T320 60" stroke="#22c55e" strokeWidth="2" strokeDasharray="6 8" />
          <circle cx="80" cy="220" r="8" fill="#d4af37" />
          <circle cx="200" cy="140" r="8" fill="#22c55e" />
          <circle cx="320" cy="60" r="10" fill="#d4af37" />
          <text x="315" y="55" fill="#070b07" fontSize="10" fontWeight="bold">X</text>
        </svg>
      </div>

      <div className="relative z-10 mx-auto w-full max-w-2xl text-center">
        <div className="animate-fade-in-up mb-6 inline-flex items-center gap-2 rounded-full border border-treasure-gold/30 bg-treasure-gold/10 px-5 py-2 text-xs font-semibold uppercase tracking-widest text-treasure-gold-light shadow-treasure">
          <span className="relative flex h-2 w-2">
            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-cannabis-green opacity-75" />
            <span className="relative inline-flex h-2 w-2 rounded-full bg-cannabis-green" />
          </span>
          Live treasure hunts across Michigan
        </div>

        <h1 className="animate-fade-in-up animation-delay-100 font-display text-6xl font-bold leading-[0.95] tracking-tight text-gold-gradient sm:text-7xl md:text-8xl">
          JoseyMap
        </h1>

        <p className="animate-fade-in-up animation-delay-200 mx-auto mt-6 max-w-md text-balance text-xl font-light leading-relaxed text-text-primary sm:text-2xl">
          The digital key to your{" "}
          <span className="font-medium text-cannabis-green">cannabis treasure hunt</span>
        </p>

        <p className="animate-fade-in-up animation-delay-300 mx-auto mt-4 max-w-sm text-balance text-sm leading-relaxed text-text-muted/80 sm:text-base">
          Grab a physical map at participating dispensaries. Use JoseyMap to
          navigate stops, check in, redeem exclusive offers, and leave reviews.
        </p>

        {!isAuthenticated && authEnabled && (
          <div className="animate-fade-in-up animation-delay-400 mx-auto mt-6 max-w-md rounded-2xl border border-cannabis-green/25 bg-gradient-to-br from-cannabis-green/10 to-transparent px-5 py-4 text-sm text-cannabis-green backdrop-blur-sm">
            <span className="font-semibold">Free to join.</span> Create an account
            to unlock event maps, check-ins, and dispensary deals.
          </div>
        )}

        <div className="animate-fade-in-up animation-delay-500 mt-10 flex flex-col items-center gap-4 sm:flex-row sm:justify-center">
          {isAuthenticated ? (
            <>
              <TreasureButton href={huntHref} size="lg" className="min-w-[220px] shadow-treasure">
                Start Treasure Hunt
              </TreasureButton>
              {firstEventName && (
                <p className="text-sm text-text-muted">
                  Next up: <span className="text-treasure-gold-light">{firstEventName}</span>
                </p>
              )}
            </>
          ) : (
            <>
              <TreasureButton href={signupHref} size="lg" className="min-w-[220px] shadow-treasure">
                Create Free Account
              </TreasureButton>
              <TreasureButton href="/login" variant="secondary" size="lg" className="min-w-[180px]">
                Log In
              </TreasureButton>
            </>
          )}
        </div>

        {!isAuthenticated && firstEventName && (
          <p className="animate-fade-in-up animation-delay-600 mt-4 text-xs text-text-muted">
            Sign up to unlock <span className="text-treasure-gold-light">{firstEventName}</span>
          </p>
        )}
      </div>

      {/* Scroll cue */}
      <a
        href="#how-it-works"
        className="absolute bottom-8 left-1/2 z-10 -translate-x-1/2 flex flex-col items-center gap-2 text-text-muted/50 transition-colors hover:text-treasure-gold"
      >
        <span className="text-[10px] uppercase tracking-widest">Explore</span>
        <svg className="h-5 w-5 animate-bounce" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
        </svg>
      </a>
    </section>
  );
}
