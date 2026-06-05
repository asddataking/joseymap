"use client";

import { useCallback, useEffect, useState } from "react";
import type { AdminAnalytics } from "@/lib/types";
import { AdminDispensaries } from "./admin/AdminDispensaries";
import { AdminEvents } from "./admin/AdminEvents";
import { AdminStops } from "./admin/AdminStops";
import { StatCard } from "./StatCard";
import { TreasureButton } from "./TreasureButton";

type Tab = "analytics" | "events" | "dispensaries" | "stops";

const TABS: { id: Tab; label: string }[] = [
  { id: "analytics", label: "Analytics" },
  { id: "events", label: "Events" },
  { id: "dispensaries", label: "Dispensaries" },
  { id: "stops", label: "Map Stops" },
];

export function AdminDashboard() {
  const [authenticated, setAuthenticated] = useState(false);
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [analytics, setAnalytics] = useState<AdminAnalytics | null>(null);
  const [tab, setTab] = useState<Tab>("analytics");

  const checkAuth = useCallback(async () => {
    const res = await fetch("/api/admin/events");
    if (res.ok) {
      setAuthenticated(true);
      const aRes = await fetch("/api/admin/analytics");
      if (aRes.ok) setAnalytics(await aRes.json());
    }
  }, []);

  useEffect(() => {
    checkAuth();
  }, [checkAuth]);

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
      await checkAuth();
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
            Manage events, dispensaries, map stops, and view analytics.
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

  return (
    <div className="mx-auto max-w-4xl px-4 py-8">
      <h1 className="font-display text-3xl font-bold text-gold-gradient">
        Admin Panel
      </h1>
      <p className="mt-1 text-sm text-text-muted">
        Manage treasure hunt content and view performance.
      </p>

      <nav className="mt-6 flex flex-wrap gap-2 border-b border-white/10 pb-3">
        {TABS.map((t) => (
          <button
            key={t.id}
            onClick={() => setTab(t.id)}
            className={`rounded-lg px-4 py-2 text-sm font-medium transition-colors ${
              tab === t.id
                ? "bg-cannabis-green/20 text-cannabis-green"
                : "text-text-muted hover:text-text-primary"
            }`}
          >
            {t.label}
          </button>
        ))}
      </nav>

      <div className="mt-6">
        {tab === "analytics" && analytics && (
          <>
            <div className="grid gap-4 sm:grid-cols-3">
              <StatCard label="Total Check-ins" value={analytics.totalCheckins} />
              <StatCard label="Total Redemptions" value={analytics.totalRedemptions} />
              <StatCard label="Review Clicks" value={analytics.totalReviewClicks} />
            </div>
            <div className="mt-8 overflow-hidden rounded-2xl border border-white/10">
              <table className="w-full text-left text-sm">
                <thead>
                  <tr className="border-b border-white/10 bg-map-surface">
                    <th className="px-4 py-3 text-text-muted">Dispensary</th>
                    <th className="px-4 py-3 text-text-muted">Check-ins</th>
                    <th className="px-4 py-3 text-text-muted">Redemptions</th>
                    <th className="px-4 py-3 text-text-muted">Reviews</th>
                  </tr>
                </thead>
                <tbody>
                  {analytics.perDispensary.map((row) => (
                    <tr key={row.dispensaryId} className="border-b border-white/5">
                      <td className="px-4 py-3">{row.dispensaryName}</td>
                      <td className="px-4 py-3 text-cannabis-green">{row.checkins}</td>
                      <td className="px-4 py-3 text-treasure-gold-light">{row.redemptions}</td>
                      <td className="px-4 py-3 text-text-muted">{row.reviewClicks}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </>
        )}
        {tab === "events" && <AdminEvents />}
        {tab === "dispensaries" && <AdminDispensaries />}
        {tab === "stops" && <AdminStops />}
      </div>
    </div>
  );
}
