import { MOCK_EVENTS, mockGetEventStops } from "./mock-data";
import { isSupabaseConfigured } from "./supabase/is-configured";
import { createServiceClient } from "./supabase/server";
import type { Dispensary, Event, EventStop } from "./types";

// Re-export mutable mock dispensaries via getter
import { mockGetDispensaries } from "./mock-admin-store";

export async function adminGetEvents(): Promise<Event[]> {
  if (!isSupabaseConfigured() || !process.env.SUPABASE_SERVICE_ROLE_KEY) {
    return [...MOCK_EVENTS];
  }
  const supabase = createServiceClient();
  const { data, error } = await supabase
    .from("events")
    .select("*")
    .order("starts_at", { ascending: false });
  if (error || !data) return [...MOCK_EVENTS];
  return data.map((row) => ({
    id: row.id,
    slug: row.slug,
    name: row.name,
    city: row.city,
    theme: row.theme,
    description: row.description ?? null,
    meta_description: row.meta_description ?? null,
    map_center_lat: row.map_center_lat ?? null,
    map_center_lng: row.map_center_lng ?? null,
    map_zoom: row.map_zoom ?? null,
    starts_at: row.starts_at,
    ends_at: row.ends_at,
    is_active: row.is_active ?? true,
  }));
}

export async function adminUpsertEvent(
  event: Partial<Event> & { name: string; slug: string }
): Promise<Event> {
  if (!isSupabaseConfigured() || !process.env.SUPABASE_SERVICE_ROLE_KEY) {
    const { mockUpsertEvent } = await import("./mock-admin-store");
    return mockUpsertEvent(event);
  }
  const supabase = createServiceClient();
  const payload = {
    slug: event.slug,
    name: event.name,
    city: event.city ?? null,
    theme: event.theme ?? null,
    description: event.description ?? null,
    meta_description: event.meta_description ?? null,
    map_center_lat: event.map_center_lat ?? null,
    map_center_lng: event.map_center_lng ?? null,
    map_zoom: event.map_zoom ?? 13,
    starts_at: event.starts_at ?? null,
    ends_at: event.ends_at ?? null,
    is_active: event.is_active ?? true,
  };

  if (event.id) {
    const { data, error } = await supabase
      .from("events")
      .update(payload)
      .eq("id", event.id)
      .select()
      .single();
    if (error) throw error;
    return {
      id: data.id,
      slug: data.slug,
      name: data.name,
      city: data.city,
      theme: data.theme,
      description: data.description ?? null,
      meta_description: data.meta_description ?? null,
      map_center_lat: data.map_center_lat ?? null,
      map_center_lng: data.map_center_lng ?? null,
      map_zoom: data.map_zoom ?? null,
      starts_at: data.starts_at,
      ends_at: data.ends_at,
      is_active: data.is_active ?? true,
    };
  }

  const { data, error } = await supabase
    .from("events")
    .insert(payload)
    .select()
    .single();
  if (error) throw error;
  return {
    id: data.id,
    ...payload,
    is_active: data.is_active ?? true,
  } as Event;
}

export async function adminDeleteEvent(id: string): Promise<void> {
  if (!isSupabaseConfigured() || !process.env.SUPABASE_SERVICE_ROLE_KEY) {
    const { mockDeleteEvent } = await import("./mock-admin-store");
    return mockDeleteEvent(id);
  }
  const supabase = createServiceClient();
  const { error } = await supabase.from("events").delete().eq("id", id);
  if (error) throw error;
}

export async function adminGetDispensaries(): Promise<Dispensary[]> {
  if (!isSupabaseConfigured() || !process.env.SUPABASE_SERVICE_ROLE_KEY) {
    return mockGetDispensaries();
  }
  const supabase = createServiceClient();
  const { data, error } = await supabase
    .from("dispensaries")
    .select("*")
    .order("name");
  if (error || !data) return mockGetDispensaries();
  return data.map((row) => ({
    id: row.id,
    name: row.name,
    address: row.address,
    city: row.city,
    state: row.state,
    lat: row.lat ?? null,
    lng: row.lng ?? null,
    google_review_url: row.google_review_url,
  }));
}

export async function adminUpsertDispensary(
  d: Partial<Dispensary> & { name: string }
): Promise<Dispensary> {
  if (!isSupabaseConfigured() || !process.env.SUPABASE_SERVICE_ROLE_KEY) {
    const { mockUpsertDispensary } = await import("./mock-admin-store");
    return mockUpsertDispensary(d);
  }
  const supabase = createServiceClient();
  const payload = {
    name: d.name,
    address: d.address ?? null,
    city: d.city ?? null,
    state: d.state ?? "MI",
    lat: d.lat ?? null,
    lng: d.lng ?? null,
    google_review_url: d.google_review_url ?? null,
  };

  if (d.id) {
    const { data, error } = await supabase
      .from("dispensaries")
      .update(payload)
      .eq("id", d.id)
      .select()
      .single();
    if (error) throw error;
    return { id: data.id, ...payload };
  }

  const { data, error } = await supabase
    .from("dispensaries")
    .insert(payload)
    .select()
    .single();
  if (error) throw error;
  return { id: data.id, ...payload };
}

export async function adminDeleteDispensary(id: string): Promise<void> {
  if (!isSupabaseConfigured() || !process.env.SUPABASE_SERVICE_ROLE_KEY) {
    const { mockDeleteDispensary } = await import("./mock-admin-store");
    return mockDeleteDispensary(id);
  }
  const supabase = createServiceClient();
  const { error } = await supabase.from("dispensaries").delete().eq("id", id);
  if (error) throw error;
}

export async function adminGetStops(): Promise<
  (EventStop & { event_name?: string })[]
> {
  if (!isSupabaseConfigured() || !process.env.SUPABASE_SERVICE_ROLE_KEY) {
    const { mockGetAllStops } = await import("./mock-admin-store");
    return mockGetAllStops();
  }
  const supabase = createServiceClient();
  const { data, error } = await supabase
    .from("event_stops")
    .select("*, dispensaries(*), events(name)")
    .order("stop_order");
  if (error || !data) {
    const { mockGetAllStops } = await import("./mock-admin-store");
    return mockGetAllStops();
  }
  return data.map((row) => ({
    id: row.id,
    event_id: row.event_id!,
    dispensary_id: row.dispensary_id!,
    offer_title: row.offer_title,
    offer_description: row.offer_description,
    stop_order: row.stop_order ?? 0,
    event_name: (row.events as { name: string } | null)?.name,
    dispensary: {
      id: (row.dispensaries as Dispensary).id,
      name: (row.dispensaries as Dispensary).name,
      address: (row.dispensaries as Dispensary).address,
      city: (row.dispensaries as Dispensary).city,
      state: (row.dispensaries as Dispensary).state,
      lat: (row.dispensaries as Dispensary).lat ?? null,
      lng: (row.dispensaries as Dispensary).lng ?? null,
      google_review_url: (row.dispensaries as Dispensary).google_review_url,
    },
  }));
}

export async function adminUpsertStop(
  stop: Partial<EventStop> & {
    event_id: string;
    dispensary_id: string;
    stop_order: number;
  }
): Promise<void> {
  if (!isSupabaseConfigured() || !process.env.SUPABASE_SERVICE_ROLE_KEY) {
    const { mockUpsertStop } = await import("./mock-admin-store");
    return mockUpsertStop(stop);
  }
  const supabase = createServiceClient();
  const payload = {
    event_id: stop.event_id,
    dispensary_id: stop.dispensary_id,
    offer_title: stop.offer_title ?? null,
    offer_description: stop.offer_description ?? null,
    stop_order: stop.stop_order,
  };

  if (stop.id) {
    const { error } = await supabase
      .from("event_stops")
      .update(payload)
      .eq("id", stop.id);
    if (error) throw error;
    return;
  }

  const { error } = await supabase.from("event_stops").insert(payload);
  if (error) throw error;
}

export async function adminDeleteStop(id: string): Promise<void> {
  if (!isSupabaseConfigured() || !process.env.SUPABASE_SERVICE_ROLE_KEY) {
    const { mockDeleteStop } = await import("./mock-admin-store");
    return mockDeleteStop(id);
  }
  const supabase = createServiceClient();
  const { error } = await supabase.from("event_stops").delete().eq("id", id);
  if (error) throw error;
}

export { mockGetEventStops };
