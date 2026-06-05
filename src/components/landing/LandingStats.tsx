type LandingStatsProps = {
  eventCount: number;
  stopCount: number;
};

export function LandingStats({ eventCount, stopCount }: LandingStatsProps) {
  const stats = [
    { value: String(eventCount), label: "Live events" },
    { value: `${stopCount}+`, label: "Dispensary stops" },
    { value: "100%", label: "Free to use" },
    { value: "MI", label: "Built for Michigan" },
  ];

  return (
    <section className="border-y border-white/5 bg-map-surface/40 px-4 py-10 backdrop-blur-sm">
      <div className="mx-auto grid max-w-5xl grid-cols-2 gap-6 sm:grid-cols-4">
        {stats.map((stat) => (
          <div key={stat.label} className="text-center">
            <p className="font-display text-3xl font-bold text-gold-gradient sm:text-4xl">
              {stat.value}
            </p>
            <p className="mt-1 text-xs font-medium uppercase tracking-wider text-text-muted">
              {stat.label}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
}
