import Link from "next/link";
import { AuthForm } from "@/components/AuthForm";
import { MapBackground } from "@/components/ui/MapBackground";

type Props = {
  searchParams: { redirect?: string };
};

export const metadata = {
  title: "Sign Up — JoseyMap",
};

export default function SignupPage({ searchParams }: Props) {
  const redirect = searchParams.redirect ?? "/";

  return (
    <main className="relative min-h-dvh">
      <MapBackground />
      <div className="relative mx-auto max-w-sm px-4 py-16">
        <div className="treasure-card p-6">
          <h1 className="font-display text-2xl font-bold text-gold-gradient">
            Join the hunt
          </h1>
          <p className="mt-2 text-sm text-text-muted">
            Create a free account to check in at stops, redeem offers, and
            track your progress.
          </p>
          <div className="mt-6">
            <AuthForm mode="signup" redirect={redirect} />
          </div>
          <p className="mt-6 text-center text-sm text-text-muted">
            Already have an account?{" "}
            <Link
              href={`/login?redirect=${encodeURIComponent(redirect)}`}
              className="text-cannabis-green hover:underline"
            >
              Log in
            </Link>
          </p>
        </div>
      </div>
    </main>
  );
}
