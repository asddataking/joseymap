import { HowItWorks } from "@/components/landing/HowItWorks";
import { LandingCTA } from "@/components/landing/LandingCTA";
import { LandingEvents } from "@/components/landing/LandingEvents";
import { LandingFooter } from "@/components/landing/LandingFooter";
import { LandingHero } from "@/components/landing/LandingHero";
import { LandingStats } from "@/components/landing/LandingStats";
import { TreasureButton } from "@/components/TreasureButton";
import { MapBackground } from "@/components/ui/MapBackground";
import { getAuthState } from "@/lib/auth";
import { getActiveEvents, getEventStops } from "@/lib/data";
import { isSupabaseConfigured } from "@/lib/supabase/is-configured";

export default async function HomePage() {
  const events = await getActiveEvents();
  const firstEvent = events[0];
  const authEnabled = isSupabaseConfigured();
  const { isAuthenticated } = authEnabled
    ? await getAuthState()
    : { isAuthenticated: true };

  const huntHref = firstEvent ? `/events/${firstEvent.slug}` : "#events";
  const signupHref = firstEvent
    ? `/signup?redirect=${encodeURIComponent(huntHref)}`
    : "/signup";

  const stopCounts = await Promise.all(
    events.map((e) => getEventStops(e.slug))
  );
  const totalStops = stopCounts.reduce((sum, stops) => sum + stops.length, 0);

  return (
    <main className="relative">
      <MapBackground />

      <LandingHero
        isAuthenticated={isAuthenticated}
        authEnabled={authEnabled}
        huntHref={huntHref}
        signupHref={signupHref}
        firstEventName={firstEvent?.name}
      />

      <LandingStats eventCount={events.length} stopCount={totalStops} />

      <HowItWorks />

      <LandingEvents
        events={events}
        isAuthenticated={isAuthenticated}
        authEnabled={authEnabled}
        signupHref={signupHref}
      />

      <LandingCTA
        isAuthenticated={isAuthenticated}
        huntHref={huntHref}
        signupHref={signupHref}
      />

      <LandingFooter />

      {/* Mobile sticky CTA */}
      {firstEvent && (
        <div className="fixed bottom-0 left-0 right-0 z-40 border-t border-white/10 bg-map-dark/95 p-4 backdrop-blur-md sm:hidden">
          {isAuthenticated ? (
            <TreasureButton href={huntHref} size="lg" fullWidth>
              Start Treasure Hunt
            </TreasureButton>
          ) : (
            <TreasureButton href={signupHref} size="lg" fullWidth>
              Create Free Account
            </TreasureButton>
          )}
        </div>
      )}
    </main>
  );
}
