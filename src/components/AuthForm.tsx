"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { createClient } from "@/lib/supabase/client";
import { TreasureButton } from "./TreasureButton";

type AuthFormProps = {
  mode: "login" | "signup";
  redirect?: string;
};

export function AuthForm({ mode, redirect = "/" }: AuthFormProps) {
  const router = useRouter();
  const [displayName, setDisplayName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    const supabase = createClient();

    try {
      if (mode === "signup") {
        const { error: signUpError } = await supabase.auth.signUp({
          email,
          password,
          options: {
            data: { display_name: displayName || email.split("@")[0] },
            emailRedirectTo: `${window.location.origin}/auth/callback?redirect=${encodeURIComponent(redirect)}`,
          },
        });
        if (signUpError) throw signUpError;
      } else {
        const { error: signInError } = await supabase.auth.signInWithPassword({
          email,
          password,
        });
        if (signInError) throw signInError;
      }

      router.push(redirect);
      router.refresh();
    } catch (err) {
      setError(err instanceof Error ? err.message : "Authentication failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      {mode === "signup" && (
        <div>
          <label className="mb-1.5 block text-sm text-text-muted">
            Display name
          </label>
          <input
            type="text"
            value={displayName}
            onChange={(e) => setDisplayName(e.target.value)}
            placeholder="Treasure Hunter"
            className="w-full rounded-xl border border-white/10 bg-map-surface-light px-4 py-3 text-text-primary placeholder:text-text-muted/50 focus:border-cannabis-green/50 focus:outline-none focus:ring-1 focus:ring-cannabis-green/30"
          />
        </div>
      )}
      <div>
        <label className="mb-1.5 block text-sm text-text-muted">Email</label>
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          placeholder="you@example.com"
          className="w-full rounded-xl border border-white/10 bg-map-surface-light px-4 py-3 text-text-primary placeholder:text-text-muted/50 focus:border-cannabis-green/50 focus:outline-none focus:ring-1 focus:ring-cannabis-green/30"
        />
      </div>
      <div>
        <label className="mb-1.5 block text-sm text-text-muted">Password</label>
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
          minLength={6}
          placeholder="••••••••"
          className="w-full rounded-xl border border-white/10 bg-map-surface-light px-4 py-3 text-text-primary placeholder:text-text-muted/50 focus:border-cannabis-green/50 focus:outline-none focus:ring-1 focus:ring-cannabis-green/30"
        />
      </div>
      {error && <p className="text-sm text-red-400">{error}</p>}
      <TreasureButton type="submit" fullWidth loading={loading} size="lg">
        {mode === "signup" ? "Create Account" : "Log In"}
      </TreasureButton>
    </form>
  );
}
