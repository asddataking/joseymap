import Link from "next/link";
import { Badge } from "./ui/Badge";

type PageHeaderProps = {
  title: string;
  subtitle?: string;
  theme?: string | null;
  backHref?: string;
  backLabel?: string;
};

export function PageHeader({
  title,
  subtitle,
  theme,
  backHref,
  backLabel = "Back",
}: PageHeaderProps) {
  return (
    <header className="sticky top-0 z-20 border-b border-white/10 bg-map-dark/90 backdrop-blur-md">
      <div className="mx-auto max-w-lg px-4 py-4">
        {backHref && (
          <Link
            href={backHref}
            className="mb-3 inline-flex items-center gap-1 text-sm text-text-muted transition-colors hover:text-cannabis-green"
          >
            <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
            {backLabel}
          </Link>
        )}
        <div className="flex items-start justify-between gap-3">
          <div>
            <h1 className="font-display text-2xl font-bold text-gold-gradient">
              {title}
            </h1>
            {subtitle && (
              <p className="mt-1 text-sm text-text-muted">{subtitle}</p>
            )}
          </div>
          {theme && <Badge variant="gold">{theme}</Badge>}
        </div>
      </div>
    </header>
  );
}
