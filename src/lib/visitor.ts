import { createClient } from "@/lib/supabase/client";

const VISITOR_KEY = "joseymap_visitor_code";

function generateVisitorCode(): string {
  if (typeof crypto !== "undefined" && crypto.randomUUID) {
    return crypto.randomUUID();
  }
  return `visitor-${Date.now()}-${Math.random().toString(36).slice(2, 9)}`;
}

export async function getVisitorCode(): Promise<string> {
  if (typeof window === "undefined") return "";

  try {
    const supabase = createClient();
    const {
      data: { user },
    } = await supabase.auth.getUser();
    if (user) return user.id;
  } catch {
    // Fall through to localStorage
  }

  const existing = localStorage.getItem(VISITOR_KEY);
  if (existing) return existing;

  const code = generateVisitorCode();
  localStorage.setItem(VISITOR_KEY, code);
  return code;
}
