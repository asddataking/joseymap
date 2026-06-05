import { createClient } from "@/lib/supabase/server";
import { isSupabaseConfigured } from "@/lib/supabase/is-configured";
import type { Profile } from "@/lib/types";

export async function getUser() {
  if (!isSupabaseConfigured()) return null;

  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  return user;
}

export async function getProfile(): Promise<Profile | null> {
  if (!isSupabaseConfigured()) return null;

  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) return null;

  const { data: profile } = await supabase
    .from("profiles")
    .select("*")
    .eq("id", user.id)
    .single();

  if (profile) {
    return {
      id: profile.id,
      display_name: profile.display_name,
      avatar_url: profile.avatar_url,
      created_at: profile.created_at,
      updated_at: profile.updated_at,
    };
  }

  return {
    id: user.id,
    display_name:
      user.user_metadata?.display_name ??
      user.email?.split("@")[0] ??
      "Explorer",
    avatar_url: null,
    created_at: user.created_at,
    updated_at: null,
  };
}

export async function getAuthState() {
  const user = await getUser();
  const profile = user ? await getProfile() : null;
  return { user, profile, isAuthenticated: Boolean(user) };
}
