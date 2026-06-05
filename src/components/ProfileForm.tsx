"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { createClient } from "@/lib/supabase/client";
import type { Profile } from "@/lib/types";
import { TreasureButton } from "./TreasureButton";

type ProfileFormProps = {
  profile: Profile;
  email: string;
};

export function ProfileForm({ profile, email }: ProfileFormProps) {
  const router = useRouter();
  const [displayName, setDisplayName] = useState(profile.display_name ?? "");
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setMessage("");

    const supabase = createClient();
    const { error } = await supabase
      .from("profiles")
      .update({
        display_name: displayName,
        updated_at: new Date().toISOString(),
      })
      .eq("id", profile.id);

    if (error) {
      setMessage("Failed to update profile.");
    } else {
      setMessage("Profile updated!");
      router.refresh();
    }
    setLoading(false);
  };

  const handleSignOut = async () => {
    const supabase = createClient();
    await supabase.auth.signOut();
    router.push("/");
    router.refresh();
  };

  return (
    <div className="space-y-6">
      <form onSubmit={handleSave} className="treasure-card space-y-4 p-6">
        <div>
          <label className="mb-1.5 block text-sm text-text-muted">Email</label>
          <p className="text-text-primary">{email}</p>
        </div>
        <div>
          <label className="mb-1.5 block text-sm text-text-muted">
            Display name
          </label>
          <input
            type="text"
            value={displayName}
            onChange={(e) => setDisplayName(e.target.value)}
            className="w-full rounded-xl border border-white/10 bg-map-surface-light px-4 py-3 text-text-primary focus:border-cannabis-green/50 focus:outline-none focus:ring-1 focus:ring-cannabis-green/30"
          />
        </div>
        {message && (
          <p
            className={`text-sm ${message.includes("Failed") ? "text-red-400" : "text-cannabis-green"}`}
          >
            {message}
          </p>
        )}
        <TreasureButton type="submit" loading={loading}>
          Save Profile
        </TreasureButton>
      </form>

      <TreasureButton variant="ghost" onClick={handleSignOut} fullWidth>
        Sign Out
      </TreasureButton>
    </div>
  );
}
