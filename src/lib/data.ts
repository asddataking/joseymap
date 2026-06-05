import {
  mockGetActiveEvents,
  mockGetAdminAnalytics,
  mockGetEventBySlug,
  mockGetEventStops,
  mockGetStopById,
  mockRecordCheckin,
  mockRecordRedemption,
  mockRecordReviewClick,
} from "./mock-data";
import { isSupabaseConfigured } from "./supabase/is-configured";
import { createClient, createServiceClient } from "./supabase/server";
import type {
  AdminAnalytics,
  Dispensary,
  Event,
  EventStop,
} from "./types";

function mapDispensary(row: {
  id: string;
  name: string;
  address: string | null;
  city: string | null;
  state: string | null;
  google_review_url: string | null;
}): Dispensary {
  return {
    id: row.id,
    name: row.name,
    address: row.address,
    city: row.city,
    state: row.state,
    google_review_url: row.google_review_url,
  };
}

function mapEvent(row: {
  id: string;
  slug: string;
  name: string;
  city: string | null;
  theme: string | null;
  starts_at: string | null;
  ends_at: string | null;
  is_active: boolean | null;
}): Event {
  return {
    id: row.id,
    slug: row.slug,
    name: row.name,
    city: row.city,
    theme: row.theme,
    starts_at: row.starts_at,
    ends_at: row.ends_at,
    is_active: row.is_active ?? true,
  };
}

export async function getActiveEvents(): Promise<Event[]> {
  if (!isSupabaseConfigured()) {
    return mockGetActiveEvents();
  }

  const supabase = await createClient();
  const { data, error } = await supabase
    .from("events")
    .select("*")
    .eq("is_active", true)
    .order("starts_at", { ascending: true });

  if (error || !data) return mockGetActiveEvents();
  return data.map(mapEvent);
}

export async function getEventBySlug(slug: string): Promise<Event | null> {
  if (!isSupabaseConfigured()) {
    return mockGetEventBySlug(slug);
  }

  const supabase = await createClient();
  const { data, error } = await supabase
    .from("events")
    .select("*")
    .eq("slug", slug)
    .single();

  if (error || !data) return mockGetEventBySlug(slug);
  return mapEvent(data);
}

export async function getEventStops(slug: string): Promise<EventStop[]> {
  if (!isSupabaseConfigured()) {
    return mockGetEventStops(slug);
  }

  const event = await getEventBySlug(slug);
  if (!event) return [];

  const supabase = await createClient();
  const { data, error } = await supabase
    .from("event_stops")
    .select("*, dispensaries(*)")
    .eq("event_id", event.id)
    .order("stop_order", { ascending: true });

  if (error || !data) return mockGetEventStops(slug);

  return data.map((row) => ({
    id: row.id,
    event_id: row.event_id!,
    dispensary_id: row.dispensary_id!,
    offer_title: row.offer_title,
    offer_description: row.offer_description,
    stop_order: row.stop_order ?? 0,
    dispensary: mapDispensary(
      row.dispensaries as {
        id: string;
        name: string;
        address: string | null;
        city: string | null;
        state: string | null;
        google_review_url: string | null;
      }
    ),
  }));
}

export async function getStopById(
  slug: string,
  stopId: string
): Promise<(EventStop & { event: Event }) | null> {
  if (!isSupabaseConfigured()) {
    return mockGetStopById(slug, stopId);
  }

  const event = await getEventBySlug(slug);
  if (!event) return null;

  const supabase = await createClient();
  const { data, error } = await supabase
    .from("event_stops")
    .select("*, dispensaries(*)")
    .eq("id", stopId)
    .eq("event_id", event.id)
    .single();

  if (error || !data) return mockGetStopById(slug, stopId);

  return {
    id: data.id,
    event_id: data.event_id!,
    dispensary_id: data.dispensary_id!,
    offer_title: data.offer_title,
    offer_description: data.offer_description,
    stop_order: data.stop_order ?? 0,
    dispensary: mapDispensary(
      data.dispensaries as {
        id: string;
        name: string;
        address: string | null;
        city: string | null;
        state: string | null;
        google_review_url: string | null;
      }
    ),
    event,
  };
}

export async function recordCheckin(
  stopId: string,
  visitorCode: string
): Promise<{ success: boolean }> {
  if (!isSupabaseConfigured()) {
    mockRecordCheckin(stopId);
    return { success: true };
  }

  const supabase = await createClient();
  const { error } = await supabase.from("checkins").insert({
    event_stop_id: stopId,
    visitor_code: visitorCode,
  });

  if (error) {
    mockRecordCheckin(stopId);
  }

  return { success: !error };
}

export async function recordRedemption(
  stopId: string,
  visitorCode: string
): Promise<{ success: boolean }> {
  if (!isSupabaseConfigured()) {
    mockRecordRedemption(stopId);
    return { success: true };
  }

  const supabase = await createClient();
  const { error } = await supabase.from("redemptions").insert({
    event_stop_id: stopId,
    visitor_code: visitorCode,
  });

  if (error) {
    mockRecordRedemption(stopId);
  }

  return { success: !error };
}

export async function recordReviewClick(
  stopId: string,
  visitorCode: string
): Promise<{ success: boolean }> {
  if (!isSupabaseConfigured()) {
    mockRecordReviewClick(stopId);
    return { success: true };
  }

  const supabase = await createClient();
  const { error } = await supabase.from("review_clicks").insert({
    event_stop_id: stopId,
    visitor_code: visitorCode,
  });

  if (error) {
    mockRecordReviewClick(stopId);
  }

  return { success: !error };
}

export async function getAdminAnalytics(): Promise<AdminAnalytics> {
  if (!isSupabaseConfigured() || !process.env.SUPABASE_SERVICE_ROLE_KEY) {
    return mockGetAdminAnalytics();
  }

  const supabase = createServiceClient();

  const [checkinsRes, redemptionsRes, reviewClicksRes, stopsRes] =
    await Promise.all([
      supabase.from("checkins").select("event_stop_id"),
      supabase.from("redemptions").select("event_stop_id"),
      supabase.from("review_clicks").select("event_stop_id"),
      supabase
        .from("event_stops")
        .select("id, dispensary_id, dispensaries(name)"),
    ]);

  if (
    checkinsRes.error ||
    redemptionsRes.error ||
    reviewClicksRes.error ||
    stopsRes.error
  ) {
    return mockGetAdminAnalytics();
  }

  const stopMap = new Map<
    string,
    { dispensaryId: string; dispensaryName: string }
  >();

  for (const stop of stopsRes.data ?? []) {
    const dispensary = stop.dispensaries as { name: string } | null;
    stopMap.set(stop.id, {
      dispensaryId: stop.dispensary_id!,
      dispensaryName: dispensary?.name ?? "Unknown",
    });
  }

  const aggregated = new Map<
    string,
    {
      dispensaryId: string;
      dispensaryName: string;
      checkins: number;
      redemptions: number;
      reviewClicks: number;
    }
  >();

  function bump(
    stopId: string | null,
    field: "checkins" | "redemptions" | "reviewClicks"
  ) {
    if (!stopId) return;
    const stop = stopMap.get(stopId);
    if (!stop) return;

    const existing = aggregated.get(stop.dispensaryId) ?? {
      dispensaryId: stop.dispensaryId,
      dispensaryName: stop.dispensaryName,
      checkins: 0,
      redemptions: 0,
      reviewClicks: 0,
    };
    existing[field] += 1;
    aggregated.set(stop.dispensaryId, existing);
  }

  for (const row of checkinsRes.data ?? []) bump(row.event_stop_id, "checkins");
  for (const row of redemptionsRes.data ?? [])
    bump(row.event_stop_id, "redemptions");
  for (const row of reviewClicksRes.data ?? [])
    bump(row.event_stop_id, "reviewClicks");

  const perDispensary = Array.from(aggregated.values());

  return {
    totalCheckins: (checkinsRes.data ?? []).length,
    totalRedemptions: (redemptionsRes.data ?? []).length,
    totalReviewClicks: (reviewClicksRes.data ?? []).length,
    perDispensary,
  };
}
