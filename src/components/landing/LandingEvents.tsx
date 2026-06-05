import Link from "next/link";
import { EventCard } from "@/components/EventCard";
import { TreasureButton } from "@/components/TreasureButton";
import type { Event } from "@/lib/types";

type LandingEventsProps = {
  events: Event[];
  isAuthenticated: boolean;
  authEnabled: boolean;
  signupHref: string;
};

function formatFeaturedDate(starts: string | null): string {
  if (!starts) return "";
  return new Date(starts).toLocaleDateString("en-US", {
    weekday: "long",
    month: "long",
    day: "numeric",
  });
}

export function LandingEvents({
  events,
  isAuthenticated,
  authEnabled,
  signupHref,
}: LandingEventsProps) {
  const featured = events[0];
  const rest = events.slice(1);

  const featuredHref = featured
    ? isAuthenticated
      ? `/events/${featured.slug}`
      : `/signup?redirect=${encodeURIComponent(`/events/${featured.slug}`)}`
    : "#";

  return (
    <section id="events" className="relative px-4 py-20 pb-28 sm:pb-20">
      <div className="mx-auto max-w-5xl">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-treasure-gold-light">
              Active hunts
            </p>
            <h2 className="mt-3 font-display text-3xl font-bold text-text-primary sm:text-4xl">
              Choose your{" "}
              <span className="text-gold-gradient">adventure</span>
            </h2>
            <p className="mt-2 max-w-md text-text-muted">
              {isAuthenticated
                ? "Pick an event and start hitting dispensary stops."
                : "Register to unlock full maps and exclusive in-store offers."}
            </p>
          </div>
          {!isAuthenticated && authEnabled && events.length > 0 && (
            <TreasureButton href={signupHref} size="md" className="shrink-0">
              Unlock all events
            </TreasureButton>
          )}
        </div>

        {events.length === 0 ? (
          <div className="treasure-card mt-10 p-12 text-center">
            <p className="font-display text-xl text-text-muted">No active events</p>
            <p className="mt-2 text-sm text-text-muted/70">
              The next treasure hunt is being charted. Check back soon.
            </p>
          </div>
        ) : (
          <div className="mt-10 space-y-6">
            {featured && (
              <Link href={featuredHref} className="group block">
                <div className="relative overflow-hidden rounded-3xl border border-treasure-gold/25 bg-gradient-to-br from-map-surface via-map-surface to-cannabis-green/5 p-8 shadow-treasure transition-all duration-300 hover:border-treasure-gold/40 sm:p-10">
                  <div className="pointer-events-none absolute -right-8 -top-8 h-40 w-40 rounded-full bg-treasure-gold/10 blur-3xl" />
                  <div className="pointer-events-none absolute -bottom-8 -left-8 h-32 w-32 rounded-full bg-cannabis-green/10 blur-3xl" />
                  <div className="pointer-events-none absolute right-8 top-8 opacity-10 transition-opacity group-hover:opacity-20">
                    <svg className="h-24 w-24 text-treasure-gold" viewBox="0 0 100 100" fill="currentColor">
                      <path d="M50 5 L55 40 L95 45 L65 70 L75 95 L50 80 L25 95 L35 70 L5 45 L45 40 Z" />
                    </svg>
                  </div>

                  <div className="relative">
                    <span className="inline-block rounded-full border border-cannabis-green/30 bg-cannabis-green/10 px-3 py-1 text-xs font-semibold uppercase tracking-wider text-cannabis-green">
                      Featured · {featured.theme ?? "Event"}
                    </span>
                    <h3 className="mt-4 font-display text-3xl font-bold text-text-primary transition-colors group-hover:text-treasure-gold-light sm:text-4xl">
                      {featured.name}
                    </h3>
                    <div className="mt-3 flex flex-wrap items-center gap-4 text-sm text-text-muted">
                      {featured.city && (
                        <span className="flex items-center gap-1.5">
                          <svg className="h-4 w-4 text-treasure-gold" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                          </svg>
                          {featured.city}
                        </span>
                      )}
                      {featured.starts_at && (
                        <span>{formatFeaturedDate(featured.starts_at)}</span>
                      )}
                    </div>
                    <p className="mt-6 inline-flex items-center gap-2 text-sm font-semibold text-cannabis-green">
                      {isAuthenticated ? "Explore this hunt" : "Sign up to unlock"}
                      <svg className="h-4 w-4 transition-transform group-hover:translate-x-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                      </svg>
                    </p>
                  </div>
                </div>
              </Link>
            )}

            {rest.length > 0 && (
              <div className="grid gap-4 sm:grid-cols-2">
                {rest.map((event) => (
                  <EventCard
                    key={event.id}
                    event={event}
                    isAuthenticated={isAuthenticated}
                  />
                ))}
              </div>
            )}
          </div>
        )}
      </div>
    </section>
  );
}
