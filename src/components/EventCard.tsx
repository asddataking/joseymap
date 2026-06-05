import Link from "next/link";
import type { Event } from "@/lib/types";
import { Badge } from "./ui/Badge";

type EventCardProps = {
  event: Event;
  isAuthenticated?: boolean;
};

function formatDateRange(starts: string | null, ends: string | null): string {
  if (!starts) return "Dates TBA";
  const start = new Date(starts);
  const end = ends ? new Date(ends) : null;
  const opts: Intl.DateTimeFormatOptions = {
    month: "short",
    day: "numeric",
    year: "numeric",
  };
  if (end && start.toDateString() !== end.toDateString()) {
    return `${start.toLocaleDateString("en-US", opts)} – ${end.toLocaleDateString("en-US", opts)}`;
  }
  return start.toLocaleDateString("en-US", {
    ...opts,
    hour: "numeric",
    minute: "2-digit",
  });
}

export function EventCard({ event, isAuthenticated = true }: EventCardProps) {
  const href = isAuthenticated
    ? `/events/${event.slug}`
    : `/signup?redirect=${encodeURIComponent(`/events/${event.slug}`)}`;

  return (
    <Link href={href} className="group block">
      <article
        className={`treasure-card relative p-5 transition-all duration-300 ${
          isAuthenticated
            ? "hover:border-treasure-gold/30 hover:shadow-treasure"
            : "opacity-90"
        }`}
      >
        {!isAuthenticated && (
          <div className="absolute inset-0 z-10 flex items-center justify-center rounded-2xl bg-map-dark/60 backdrop-blur-[2px]">
            <div className="flex items-center gap-2 rounded-full border border-treasure-gold/30 bg-map-surface/90 px-4 py-2 text-sm font-medium text-treasure-gold-light">
              <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
              </svg>
              Sign up to explore
            </div>
          </div>
        )}

        <div className="flex items-start justify-between gap-3">
          <div className="flex-1">
            {event.theme && <Badge variant="green">{event.theme}</Badge>}
            <h3 className="mt-2 font-display text-xl font-semibold text-text-primary transition-colors group-hover:text-treasure-gold-light">
              {event.name}
            </h3>
            {event.city && (
              <p className="mt-1 flex items-center gap-1.5 text-sm text-text-muted">
                <svg className="h-3.5 w-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
                {event.city}
              </p>
            )}
            <p className="mt-2 text-xs text-text-muted/80">
              {formatDateRange(event.starts_at, event.ends_at)}
            </p>
          </div>
          <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-treasure-gold/30 bg-treasure-gold/10 text-treasure-gold transition-transform group-hover:scale-110">
            <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 20l-5.447-2.724A1 1 0 013 16.382V5.618a1 1 0 011.447-.894L9 7m0 13l6-3m-6 3V7m6 10l4.553 2.276A1 1 0 0021 18.382V7.618a1 1 0 00-.553-.894L15 4m0 13V4m0 0L9 7" />
            </svg>
          </div>
        </div>
        <div className="mt-4 flex items-center gap-1 text-sm font-medium text-cannabis-green">
          {isAuthenticated ? "Explore stops" : "Create account to unlock"}
          <svg className="h-4 w-4 transition-transform group-hover:translate-x-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
          </svg>
        </div>
      </article>
    </Link>
  );
}
