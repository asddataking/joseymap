import { TreasureButton } from "@/components/TreasureButton";

type LandingCTAProps = {
  isAuthenticated: boolean;
  huntHref: string;
  signupHref: string;
};

export function LandingCTA({
  isAuthenticated,
  huntHref,
  signupHref,
}: LandingCTAProps) {
  return (
    <section className="px-4 py-16">
      <div className="relative mx-auto max-w-4xl overflow-hidden rounded-3xl border border-treasure-gold/25 bg-gradient-to-br from-treasure-gold/10 via-map-surface to-cannabis-green/10 px-8 py-14 text-center shadow-treasure sm:px-16">
        <div className="pointer-events-none absolute inset-0 map-grid opacity-30" />
        <div className="relative">
          <h2 className="font-display text-3xl font-bold text-text-primary sm:text-4xl">
            Ready to hunt?
          </h2>
          <p className="mx-auto mt-4 max-w-md text-text-muted">
            {isAuthenticated
              ? "Your map is waiting. Head to the nearest stop and start checking in."
              : "Join thousands of treasure hunters exploring Michigan's best dispensary events."}
          </p>
          <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row">
            {isAuthenticated ? (
              <TreasureButton href={huntHref} size="lg">
                Open Event Map
              </TreasureButton>
            ) : (
              <>
                <TreasureButton href={signupHref} size="lg">
                  Get Started — It&apos;s Free
                </TreasureButton>
                <TreasureButton href="/login" variant="ghost" size="lg">
                  I have an account
                </TreasureButton>
              </>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
