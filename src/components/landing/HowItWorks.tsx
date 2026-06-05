const STEPS = [
  {
    step: "01",
    title: "Grab your map",
    description:
      "Pick up a physical treasure map at any participating dispensary during the event.",
    icon: (
      <svg className="h-7 w-7" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 20l-5.447-2.724A1 1 0 013 16.382V5.618a1 1 0 011.447-.894L9 7m0 13l6-3m-6 3V7m6 10l4.553 2.276A1 1 0 0021 18.382V7.618a1 1 0 00-.553-.894L15 4m0 13V4m0 0L9 7" />
      </svg>
    ),
    accent: "gold" as const,
  },
  {
    step: "02",
    title: "Check in at stops",
    description:
      "Visit each dispensary on your route. Tap check-in in the app to mark your progress.",
    icon: (
      <svg className="h-7 w-7" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
      </svg>
    ),
    accent: "green" as const,
  },
  {
    step: "03",
    title: "Unlock rewards",
    description:
      "Redeem exclusive event offers and leave Google reviews to support local shops.",
    icon: (
      <svg className="h-7 w-7" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 8v13m0-13V6a2 2 0 112 2h-2zm0 0V5.5A2.5 2.5 0 109.5 8H12zm-7 4h14M5 12a2 2 0 110-4h14a2 2 0 110 4M5 12v7a2 2 0 002 2h10a2 2 0 002-2v-7" />
      </svg>
    ),
    accent: "gold" as const,
  },
];

const accentStyles = {
  gold: "border-treasure-gold/30 bg-treasure-gold/10 text-treasure-gold-light",
  green: "border-cannabis-green/30 bg-cannabis-green/10 text-cannabis-green",
};

export function HowItWorks() {
  return (
    <section id="how-it-works" className="relative px-4 py-20">
      <div className="mx-auto max-w-5xl">
        <div className="text-center">
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-cannabis-green">
            How it works
          </p>
          <h2 className="mt-3 font-display text-3xl font-bold text-text-primary sm:text-4xl">
            Three steps to{" "}
            <span className="text-gold-gradient">treasure</span>
          </h2>
          <p className="mx-auto mt-3 max-w-md text-text-muted">
            Your physical map and JoseyMap work together — one adventure, two
            experiences.
          </p>
        </div>

        <div className="relative mt-14 grid gap-6 sm:grid-cols-3 sm:gap-8">
          {/* Connecting trail line (desktop) */}
          <div className="pointer-events-none absolute left-[16.67%] right-[16.67%] top-12 hidden h-px border-t border-dashed border-treasure-gold/20 sm:block" />

          {STEPS.map((item, i) => (
            <div
              key={item.step}
              className="group relative treasure-card p-6 transition-all duration-300 hover:border-treasure-gold/25 hover:shadow-treasure"
              style={{ animationDelay: `${i * 150}ms` }}
            >
              <div className="flex items-center gap-3">
                <div
                  className={`flex h-12 w-12 items-center justify-center rounded-xl border ${accentStyles[item.accent]}`}
                >
                  {item.icon}
                </div>
                <span className="font-display text-3xl font-bold text-white/5 transition-colors group-hover:text-treasure-gold/20">
                  {item.step}
                </span>
              </div>
              <h3 className="mt-5 font-display text-lg font-semibold text-text-primary">
                {item.title}
              </h3>
              <p className="mt-2 text-sm leading-relaxed text-text-muted">
                {item.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
