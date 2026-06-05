import Link from "next/link";
import { AuthForm } from "@/components/AuthForm";
import { MapBackground } from "@/components/ui/MapBackground";

type Props = {
  searchParams: { redirect?: string; error?: string };
};

export const metadata = {
  title: "Log In — JoseyMap",
};

export default function LoginPage({ searchParams }: Props) {
  const redirect = searchParams.redirect ?? "/";

  return (
    <main className="relative min-h-dvh">
      <MapBackground />
      <div className="relative mx-auto max-w-sm px-4 py-16">
        <div className="treasure-card p-6">
          <h1 className="font-display text-2xl font-bold text-gold-gradient">
            Welcome back
          </h1>
          <p className="mt-2 text-sm text-text-muted">
            Log in to continue your treasure hunt.
          </p>
          {searchParams.error && (
            <p className="mt-3 text-sm text-red-400">
              Authentication failed. Please try again.
            </p>
          )}
          <div className="mt-6">
            <AuthForm mode="login" redirect={redirect} />
          </div>
          <p className="mt-6 text-center text-sm text-text-muted">
            No account?{" "}
            <Link
              href={`/signup?redirect=${encodeURIComponent(redirect)}`}
              className="text-cannabis-green hover:underline"
            >
              Create one free
            </Link>
          </p>
        </div>
      </div>
    </main>
  );
}
