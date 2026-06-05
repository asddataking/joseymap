import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { EventMapLoader } from "@/components/EventMapLoader";
import { PageHeader } from "@/components/PageHeader";
import { StopCard } from "@/components/StopCard";
import { TreasureButton } from "@/components/TreasureButton";
import { getAuthState } from "@/lib/auth";
import { getEventBySlug, getEventStops, getAllEventSlugs } from "@/lib/data";
import { getEventMapCenter, stopsToMarkers } from "@/lib/map-utils";
import { isSupabaseConfigured } from "@/lib/supabase/is-configured";

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

export async function generateStaticParams() {
  const slugs = await getAllEventSlugs();
  return slugs.map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const event = await getEventBySlug(params.slug);
  if (!event) return { title: "Event Not Found" };

  const title = `${event.name} | JoseyMap Treasure Hunt`;
  const description =
    event.meta_description ??
    event.description ??
    `Explore the ${event.name} cannabis treasure map. Check in at dispensary stops and redeem exclusive offers.`;

  return {
    title,
    description,
    openGraph: {
      title,
      description,
      type: "website",
      url: `/events/${event.slug}`,
    },
    alternates: {
      canonical: `/events/${event.slug}`,
    },
  };
}

export default async function EventPage({ params }: Props) {
  const event = await getEventBySlug(params.slug);

  if (!event || !event.is_active) {
    notFound();
  }

  const stops = await getEventStops(params.slug);
  const mapCenter = getEventMapCenter(event);
  const markers = stopsToMarkers(stops);
  const authEnabled = isSupabaseConfigured();
  const { isAuthenticated } = authEnabled
    ? await getAuthState()
    : { isAuthenticated: true };

  const signupHref = `/signup?redirect=${encodeURIComponent(`/events/${params.slug}`)}`;

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Event",
    name: event.name,
    description: event.description,
    startDate: event.starts_at,
    endDate: event.ends_at,
    eventAttendanceMode: "https://schema.org/OfflineEventAttendanceMode",
    location: {
      "@type": "Place",
      name: event.city ?? "Michigan",
      address: event.city ?? "Michigan",
    },
  };

  return (
    <main className="min-h-dvh bg-map-dark pb-8">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      <PageHeader
        title={event.name}
        subtitle={event.city ?? undefined}
        theme={event.theme}
        backHref="/"
        backLabel="All events"
      />

      <div className="mx-auto max-w-6xl px-4 py-6">
        {/* SEO hero content */}
        <div className="treasure-card p-6 sm:p-8">
          {event.starts_at && (
            <p className="text-sm text-treasure-gold-light">
              {formatDate(event.starts_at)}
              {event.ends_at && event.ends_at !== event.starts_at && (
                <> &mdash; {formatDate(event.ends_at)}</>
              )}
            </p>
          )}
          {event.description && (
            <p className="mt-4 text-base leading-relaxed text-text-primary">
              {event.description}
            </p>
          )}
          <p className="mt-3 text-sm leading-relaxed text-text-muted">
            Visit each stop to check in and unlock exclusive offers. Leave a
            Google review to support participating dispensaries.
          </p>
          {!isAuthenticated && authEnabled && (
            <div className="mt-5">
              <TreasureButton href={signupHref} size="md">
                Sign up to check in & redeem offers
              </TreasureButton>
            </div>
          )}
        </div>

        {/* Map + stops split layout */}
        <div className="mt-8 grid gap-8 lg:grid-cols-2 lg:items-start">
          <div className="order-2 lg:order-1">
            <div className="mb-4 flex items-center gap-2 text-sm text-cannabis-green">
              <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 20l-5.447-2.724A1 1 0 013 16.382V5.618a1 1 0 011.447-.894L9 7m0 13l6-3m-6 3V7m6 10l4.553 2.276A1 1 0 0021 18.382V7.618a1 1 0 00-.553-.894L15 4m0 13V4m0 0L9 7" />
              </svg>
              {stops.length} stop{stops.length !== 1 ? "s" : ""} on this map
            </div>
            <div className="space-y-4">
              {stops.map((stop) => (
                <StopCard key={stop.id} stop={stop} eventSlug={params.slug} />
              ))}
            </div>
          </div>

          <div className="order-1 lg:order-2">
            <p className="mb-3 font-display text-sm font-semibold uppercase tracking-wider text-text-muted">
              Treasure Map
            </p>
            <EventMapLoader
              center={mapCenter}
              markers={markers}
              eventSlug={params.slug}
            />
          </div>
        </div>
      </div>
    </main>
  );
}
