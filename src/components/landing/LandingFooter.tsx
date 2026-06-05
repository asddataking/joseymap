import Link from "next/link";

export function LandingFooter() {
  return (
    <footer className="border-t border-white/5 px-4 py-12">
      <div className="mx-auto max-w-5xl">
        <div className="flex flex-col items-center gap-6 sm:flex-row sm:justify-between">
          <div className="text-center sm:text-left">
            <p className="font-display text-xl font-bold text-gold-gradient">
              JoseyMap
            </p>
            <p className="mt-1 text-sm text-text-muted/70">
              Cannabis event companion · Michigan
            </p>
          </div>
          <nav className="flex flex-wrap items-center justify-center gap-6 text-sm text-text-muted">
            <Link href="#how-it-works" className="transition-colors hover:text-cannabis-green">
              How it works
            </Link>
            <Link href="#events" className="transition-colors hover:text-cannabis-green">
              Events
            </Link>
            <Link href="/login" className="transition-colors hover:text-cannabis-green">
              Log in
            </Link>
            <Link href="/signup" className="transition-colors hover:text-cannabis-green">
              Sign up
            </Link>
          </nav>
        </div>
        <p className="mt-8 text-center text-xs text-text-muted/40">
          &copy; {new Date().getFullYear()} JoseyMap. For entertainment and event
          participation purposes. Must be 21+.
        </p>
      </div>
    </footer>
  );
}
