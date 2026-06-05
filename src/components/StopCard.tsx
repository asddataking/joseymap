import Link from "next/link";
import type { EventStop } from "@/lib/types";
import { StopActions } from "./StopActions";

type StopCardProps = {
  stop: EventStop;
  eventSlug: string;
};

export function StopCard({ stop, eventSlug }: StopCardProps) {
  const address = [stop.dispensary.address, stop.dispensary.city, stop.dispensary.state]
    .filter(Boolean)
    .join(", ");

  return (
    <article className="treasure-card p-5">
      <div className="flex items-start gap-4">
        <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full border-2 border-treasure-gold/50 bg-treasure-gold/10 font-display text-lg font-bold text-treasure-gold">
          {stop.stop_order}
        </div>
        <div className="min-w-0 flex-1">
          <Link
            href={`/events/${eventSlug}/stops/${stop.id}`}
            className="group"
          >
            <h3 className="font-display text-lg font-semibold text-text-primary transition-colors group-hover:text-treasure-gold-light">
              {stop.dispensary.name}
            </h3>
          </Link>
          {address && (
            <p className="mt-1 text-sm text-text-muted">{address}</p>
          )}
          {stop.offer_title && (
            <p className="mt-3 rounded-lg border border-cannabis-green/20 bg-cannabis-green/5 px-3 py-2 text-sm text-cannabis-green">
              {stop.offer_title}
            </p>
          )}
        </div>
      </div>
      <div className="mt-4">
        <StopActions
          stopId={stop.id}
          eventSlug={eventSlug}
          googleReviewUrl={stop.dispensary.google_review_url}
          compact
        />
      </div>
    </article>
  );
}
