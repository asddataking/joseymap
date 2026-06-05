import { notFound } from "next/navigation";
import { PageHeader } from "@/components/PageHeader";
import { StopCard } from "@/components/StopCard";
import { getEventBySlug, getEventStops } from "@/lib/data";

type Props = {
  params: { slug: string };
};

function formatDate(date: string | null): string {
  if (!date) return "";
  return new Date(date).toLocaleDateString("en-US", {
    weekday: "long",
    month: "long",
    day: "numeric",
    year: "numeric",
  });
}

export default async function EventPage({ params }: Props) {
  const event = await getEventBySlug(params.slug);

  if (!event || !event.is_active) {
    notFound();
  }

  const stops = await getEventStops(params.slug);

  return (
    <main className="min-h-dvh bg-map-dark pb-8">
      <PageHeader
        title={event.name}
        subtitle={event.city ?? undefined}
        theme={event.theme}
        backHref="/"
        backLabel="All events"
      />

      <div className="mx-auto max-w-lg px-4 py-6">
        <div className="treasure-card p-5">
          {event.starts_at && (
            <p className="text-sm text-text-muted">
              {formatDate(event.starts_at)}
              {event.ends_at && event.ends_at !== event.starts_at && (
                <> &mdash; {formatDate(event.ends_at)}</>
              )}
            </p>
          )}
          <p className="mt-3 text-sm leading-relaxed text-text-muted">
            Visit each stop to check in and unlock exclusive offers. Leave a
            Google review to support participating dispensaries.
          </p>
        </div>

        <div className="mt-6 flex items-center gap-2 text-sm text-cannabis-green">
          <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 20l-5.447-2.724A1 1 0 013 16.382V5.618a1 1 0 011.447-.894L9 7m0 13l6-3m-6 3V7m6 10l4.553 2.276A1 1 0 0021 18.382V7.618a1 1 0 00-.553-.894L15 4m0 13V4m0 0L9 7" />
          </svg>
          {stops.length} stop{stops.length !== 1 ? "s" : ""} on this map
        </div>

        <div className="mt-4 space-y-4">
          {stops.map((stop) => (
            <StopCard key={stop.id} stop={stop} eventSlug={params.slug} />
          ))}
        </div>
      </div>
    </main>
  );
}
