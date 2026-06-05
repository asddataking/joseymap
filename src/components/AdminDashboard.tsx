"use client";

import { useCallback, useEffect, useState } from "react";
import type { AdminAnalytics } from "@/lib/types";
import { StatCard } from "./StatCard";
import { TreasureButton } from "./TreasureButton";

export function AdminDashboard() {
  const [authenticated, setAuthenticated] = useState(false);
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [analytics, setAnalytics] = useState<AdminAnalytics | null>(null);

  const fetchAnalytics = useCallback(async () => {
    const res = await fetch("/api/admin/analytics");
    if (res.ok) {
      const data = await res.json();
      setAnalytics(data);
      setAuthenticated(true);
    }
  }, []);

  useEffect(() => {
    fetchAnalytics();
  }, [fetchAnalytics]);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    const res = await fetch("/api/admin/auth", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ password }),
    });

    if (res.ok) {
      await fetchAnalytics();
    } else {
      setError("Invalid password");
    }
    setLoading(false);
  };

  if (!authenticated) {
    return (
      <div className="mx-auto max-w-sm px-4 py-16">
        <div className="treasure-card p-6">
          <h1 className="font-display text-2xl font-bold text-gold-gradient">
            Admin Login
          </h1>
          <p className="mt-2 text-sm text-text-muted">
            Enter the admin password to view analytics.
          </p>
          <form onSubmit={handleLogin} className="mt-6 space-y-4">
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Password"
              className="w-full rounded-xl border border-white/10 bg-map-surface-light px-4 py-3 text-text-primary placeholder:text-text-muted/50 focus:border-cannabis-green/50 focus:outline-none focus:ring-1 focus:ring-cannabis-green/30"
            />
            {error && <p className="text-sm text-red-400">{error}</p>}
            <TreasureButton type="submit" fullWidth loading={loading}>
              Sign In
            </TreasureButton>
          </form>
        </div>
      </div>
    );
  }

  if (!analytics) {
    return (
      <div className="flex min-h-dvh items-center justify-center">
        <span className="h-8 w-8 animate-spin rounded-full border-2 border-cannabis-green border-t-transparent" />
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-2xl px-4 py-8">
      <h1 className="font-display text-3xl font-bold text-gold-gradient">
        Analytics Dashboard
      </h1>
      <p className="mt-1 text-sm text-text-muted">
        Treasure hunt performance across all stops.
      </p>

      <div className="mt-8 grid gap-4 sm:grid-cols-3">
        <StatCard
          label="Total Check-ins"
          value={analytics.totalCheckins}
          icon={
            <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          }
        />
        <StatCard
          label="Total Redemptions"
          value={analytics.totalRedemptions}
          icon={
            <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v13m0-13V6a2 2 0 112 2h-2zm0 0V5.5A2.5 2.5 0 109.5 8H12zm-7 4h14M5 12a2 2 0 110-4h14a2 2 0 110 4M5 12v7a2 2 0 002 2h10a2 2 0 002-2v-7" />
            </svg>
          }
        />
        <StatCard
          label="Review Clicks"
          value={analytics.totalReviewClicks}
          icon={
            <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z" />
            </svg>
          }
        />
      </div>

      <div className="mt-8">
        <h2 className="font-display text-lg font-semibold text-text-primary">
          Per Dispensary
        </h2>
        <div className="mt-4 overflow-hidden rounded-2xl border border-white/10">
          <table className="w-full text-left text-sm">
            <thead>
              <tr className="border-b border-white/10 bg-map-surface">
                <th className="px-4 py-3 font-medium text-text-muted">
                  Dispensary
                </th>
                <th className="px-4 py-3 font-medium text-text-muted">
                  Check-ins
                </th>
                <th className="px-4 py-3 font-medium text-text-muted">
                  Redemptions
                </th>
                <th className="px-4 py-3 font-medium text-text-muted">
                  Reviews
                </th>
              </tr>
            </thead>
            <tbody>
              {analytics.perDispensary.map((row) => (
                <tr
                  key={row.dispensaryId}
                  className="border-b border-white/5 bg-map-surface/50"
                >
                  <td className="px-4 py-3 text-text-primary">
                    {row.dispensaryName}
                  </td>
                  <td className="px-4 py-3 text-cannabis-green">
                    {row.checkins}
                  </td>
                  <td className="px-4 py-3 text-treasure-gold-light">
                    {row.redemptions}
                  </td>
                  <td className="px-4 py-3 text-text-muted">
                    {row.reviewClicks}
                  </td>
                </tr>
              ))}
              {analytics.perDispensary.length === 0 && (
                <tr>
                  <td colSpan={4} className="px-4 py-8 text-center text-text-muted">
                    No data yet.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
