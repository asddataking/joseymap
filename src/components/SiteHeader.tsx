import Link from "next/link";
import { getAuthState } from "@/lib/auth";
import { isSupabaseConfigured } from "@/lib/supabase/is-configured";

export async function SiteHeader() {
  const { profile, isAuthenticated } = await getAuthState();
  const authEnabled = isSupabaseConfigured();

  return (
    <header className="sticky top-0 z-30 border-b border-white/5 bg-map-dark/70 backdrop-blur-xl">
      <div className="mx-auto flex max-w-5xl items-center justify-between px-4 py-3">
        <Link
          href="/"
          className="font-display text-lg font-bold text-gold-gradient"
        >
          JoseyMap
        </Link>

        {authEnabled && (
          <nav className="flex items-center gap-3">
            {isAuthenticated && profile ? (
              <Link
                href="/profile"
                className="flex items-center gap-2 rounded-full border border-white/10 bg-map-surface px-3 py-1.5 text-sm text-text-primary transition-colors hover:border-cannabis-green/30"
              >
                <span className="flex h-6 w-6 items-center justify-center rounded-full bg-cannabis-green/20 text-xs font-bold text-cannabis-green">
                  {(profile.display_name ?? "E")[0].toUpperCase()}
                </span>
                <span className="max-w-[100px] truncate">
                  {profile.display_name}
                </span>
              </Link>
            ) : (
              <>
                <Link
                  href="/login"
                  className="text-sm text-text-muted transition-colors hover:text-cannabis-green"
                >
                  Log in
                </Link>
                <Link
                  href="/signup"
                  className="rounded-lg border border-cannabis-green/40 bg-cannabis-green/10 px-3 py-1.5 text-sm font-medium text-cannabis-green transition-colors hover:bg-cannabis-green/20"
                >
                  Sign up
                </Link>
              </>
            )}
          </nav>
        )}
      </div>
    </header>
  );
}
