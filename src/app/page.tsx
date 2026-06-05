import { EventCard } from "@/components/EventCard";
import { TreasureButton } from "@/components/TreasureButton";
import { MapBackground } from "@/components/ui/MapBackground";
import { getActiveEvents } from "@/lib/data";

export default async function HomePage() {
  const events = await getActiveEvents();
  const firstEvent = events[0];

  return (
    <main className="relative min-h-dvh">
      <MapBackground />

      {/* Hero */}
      <section className="relative mx-auto max-w-lg px-4 pb-8 pt-16 text-center">
        <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-treasure-gold/20 bg-treasure-gold/5 px-4 py-1.5 text-xs font-medium text-treasure-gold-light">
          <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-cannabis-green" />
          Live treasure hunts
        </div>

        <h1 className="font-display text-5xl font-bold tracking-tight text-gold-gradient sm:text-6xl">
          JoseyMap
        </h1>
        <p className="mx-auto mt-4 max-w-sm text-balance text-lg text-text-muted">
          Your digital companion for cannabis treasure hunts
        </p>
        <p className="mx-auto mt-2 max-w-xs text-sm text-text-muted/70">
          Pick up your physical map in-store, then track stops, check in, and
          unlock exclusive offers.
        </p>

        <div className="mt-8 flex flex-col items-center gap-3">
          <TreasureButton
            href={firstEvent ? `/events/${firstEvent.slug}` : "#events"}
            size="lg"
          >
            Start Treasure Hunt
          </TreasureButton>
          {firstEvent && (
            <p className="text-xs text-text-muted">
              Next up: {firstEvent.name}
            </p>
          )}
        </div>
      </section>

      {/* Trail divider */}
      <div className="relative mx-auto max-w-lg px-4">
        <div className="flex items-center gap-3">
          <div className="h-px flex-1 bg-gradient-to-r from-transparent via-treasure-gold/30 to-transparent" />
          <svg className="h-5 w-5 text-treasure-gold/50" viewBox="0 0 24 24" fill="currentColor">
            <path d="M12 2L15 9L22 9L17 14L19 22L12 17L5 22L7 14L2 9L9 9Z" opacity="0.6" />
          </svg>
          <div className="h-px flex-1 bg-gradient-to-r from-transparent via-treasure-gold/30 to-transparent" />
        </div>
      </div>

      {/* Events */}
      <section id="events" className="relative mx-auto max-w-lg px-4 py-10">
        <h2 className="font-display text-2xl font-semibold text-text-primary">
          Active Events
        </h2>
        <p className="mt-1 text-sm text-text-muted">
          Choose your adventure and start exploring dispensary stops.
        </p>

        <div className="mt-6 space-y-4">
          {events.length > 0 ? (
            events.map((event) => <EventCard key={event.id} event={event} />)
          ) : (
            <div className="treasure-card p-8 text-center">
              <p className="text-text-muted">No active events right now.</p>
              <p className="mt-1 text-sm text-text-muted/70">
                Check back soon for the next treasure hunt!
              </p>
            </div>
          )}
        </div>
      </section>

      {/* Footer */}
      <footer className="relative border-t border-white/5 px-4 py-8 text-center">
        <p className="text-xs text-text-muted/60">
          JoseyMap &middot; Cannabis event companion
        </p>
      </footer>

      {/* Mobile sticky CTA */}
      {firstEvent && (
        <div className="fixed bottom-0 left-0 right-0 border-t border-white/10 bg-map-dark/95 p-4 backdrop-blur-md sm:hidden">
          <TreasureButton
            href={`/events/${firstEvent.slug}`}
            size="lg"
            fullWidth
          >
            Start Treasure Hunt
          </TreasureButton>
        </div>
      )}
    </main>
  );
}
