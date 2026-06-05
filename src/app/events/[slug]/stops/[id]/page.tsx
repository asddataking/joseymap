import { notFound } from "next/navigation";
import { PageHeader } from "@/components/PageHeader";
import { StopActions } from "@/components/StopActions";
import { Badge } from "@/components/ui/Badge";
import { getStopById } from "@/lib/data";

type Props = {
  params: { slug: string; id: string };
};

export default async function StopDetailPage({ params }: Props) {
  const stop = await getStopById(params.slug, params.id);

  if (!stop) {
    notFound();
  }

  const address = [
    stop.dispensary.address,
    stop.dispensary.city,
    stop.dispensary.state,
  ]
    .filter(Boolean)
    .join(", ");

  return (
    <main className="min-h-dvh bg-map-dark pb-8">
      <PageHeader
        title={stop.dispensary.name}
        subtitle={`Stop ${stop.stop_order} · ${stop.event.name}`}
        theme={stop.event.theme}
        backHref={`/events/${params.slug}`}
        backLabel="Back to map"
      />

      <div className="mx-auto max-w-lg px-4 py-6">
        <div className="treasure-card p-6">
          <div className="flex items-center gap-3">
            <div className="flex h-12 w-12 items-center justify-center rounded-full border-2 border-treasure-gold bg-treasure-gold/10 font-display text-xl font-bold text-treasure-gold">
              {stop.stop_order}
            </div>
            <div>
              <Badge variant="green">Dispensary Stop</Badge>
              {address && (
                <p className="mt-2 text-sm text-text-muted">{address}</p>
              )}
            </div>
          </div>

          {stop.offer_title && (
            <div className="mt-6">
              <h2 className="font-display text-lg font-semibold text-treasure-gold-light">
                {stop.offer_title}
              </h2>
              {stop.offer_description && (
                <p className="mt-2 leading-relaxed text-text-muted">
                  {stop.offer_description}
                </p>
              )}
            </div>
          )}
        </div>

        <div className="mt-6">
          <h3 className="mb-3 font-display text-sm font-semibold uppercase tracking-wider text-text-muted">
            Your actions
          </h3>
          <StopActions
            stopId={stop.id}
            eventSlug={params.slug}
            googleReviewUrl={stop.dispensary.google_review_url}
          />
        </div>
      </div>
    </main>
  );
}
