import { MOCK_EVENTS, MOCK_STOPS } from "./mock-data";
import type { Dispensary, Event, EventStop } from "./types";

let mockDispensaries: Dispensary[] = [
  {
    id: "d1000000-0000-4000-8000-000000000001",
    name: "Green Genie",
    address: "2460 E Stadium Blvd",
    city: "Ann Arbor",
    state: "MI",
    lat: 42.2699,
    lng: -83.6987,
    google_review_url: "https://g.page/green-genie-ann-arbor/review",
  },
  {
    id: "d1000000-0000-4000-8000-000000000002",
    name: "Exclusive Cannabis",
    address: "3820 Varsity Dr",
    city: "Ann Arbor",
    state: "MI",
    lat: 42.2831,
    lng: -83.7436,
    google_review_url: "https://g.page/exclusive-cannabis/review",
  },
  {
    id: "d1000000-0000-4000-8000-000000000003",
    name: "Skymint",
    address: "1958 S Industrial Hwy",
    city: "Ann Arbor",
    state: "MI",
    lat: 42.2472,
    lng: -83.7356,
    google_review_url: "https://g.page/skymint-ann-arbor/review",
  },
  {
    id: "d1000000-0000-4000-8000-000000000004",
    name: "House of Dank",
    address: "4568 E 8 Mile Rd",
    city: "Detroit",
    state: "MI",
    lat: 42.4482,
    lng: -83.0998,
    google_review_url: "https://g.page/house-of-dank/review",
  },
  {
    id: "d1000000-0000-4000-8000-000000000005",
    name: "Lume Cannabis",
    address: "200 E Jefferson Ave",
    city: "Detroit",
    state: "MI",
    lat: 42.3314,
    lng: -83.042,
    google_review_url: "https://g.page/lume-cannabis/review",
  },
];

function genId(prefix: string): string {
  return `${prefix}-${crypto.randomUUID()}`;
}

export function mockGetDispensaries(): Dispensary[] {
  return [...mockDispensaries];
}

export function mockUpsertEvent(
  event: Partial<Event> & { name: string; slug: string }
): Event {
  const full: Event = {
    id: event.id ?? genId("e"),
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

  const idx = MOCK_EVENTS.findIndex((e) => e.id === full.id);
  if (idx >= 0) MOCK_EVENTS[idx] = full;
  else MOCK_EVENTS.push(full);
  return full;
}

export function mockDeleteEvent(id: string): void {
  const idx = MOCK_EVENTS.findIndex((e) => e.id === id);
  if (idx >= 0) MOCK_EVENTS.splice(idx, 1);
  for (let i = MOCK_STOPS.length - 1; i >= 0; i--) {
    if (MOCK_STOPS[i].event_id === id) MOCK_STOPS.splice(i, 1);
  }
}

export function mockUpsertDispensary(
  d: Partial<Dispensary> & { name: string }
): Dispensary {
  const full: Dispensary = {
    id: d.id ?? genId("d"),
    name: d.name,
    address: d.address ?? null,
    city: d.city ?? null,
    state: d.state ?? "MI",
    lat: d.lat ?? null,
    lng: d.lng ?? null,
    google_review_url: d.google_review_url ?? null,
  };
  const idx = mockDispensaries.findIndex((x) => x.id === full.id);
  if (idx >= 0) mockDispensaries[idx] = full;
  else mockDispensaries.push(full);

  for (const stop of MOCK_STOPS) {
    if (stop.dispensary_id === full.id) stop.dispensary = full;
  }
  return full;
}

export function mockDeleteDispensary(id: string): void {
  mockDispensaries = mockDispensaries.filter((d) => d.id !== id);
  for (let i = MOCK_STOPS.length - 1; i >= 0; i--) {
    if (MOCK_STOPS[i].dispensary_id === id) MOCK_STOPS.splice(i, 1);
  }
}

export function mockGetAllStops(): (EventStop & { event_name?: string })[] {
  return MOCK_STOPS.map((s) => ({
    ...s,
    event_name: MOCK_EVENTS.find((e) => e.id === s.event_id)?.name,
  }));
}

export function mockUpsertStop(
  stop: Partial<EventStop> & {
    event_id: string;
    dispensary_id: string;
    stop_order: number;
  }
): void {
  const dispensary = mockDispensaries.find((d) => d.id === stop.dispensary_id);
  if (!dispensary) throw new Error("Dispensary not found");

  const full: EventStop = {
    id: stop.id ?? genId("s"),
    event_id: stop.event_id,
    dispensary_id: stop.dispensary_id,
    offer_title: stop.offer_title ?? null,
    offer_description: stop.offer_description ?? null,
    stop_order: stop.stop_order,
    dispensary,
  };

  const idx = MOCK_STOPS.findIndex((s) => s.id === full.id);
  if (idx >= 0) MOCK_STOPS[idx] = full;
  else MOCK_STOPS.push(full);
}

export function mockDeleteStop(id: string): void {
  const idx = MOCK_STOPS.findIndex((s) => s.id === id);
  if (idx >= 0) MOCK_STOPS.splice(idx, 1);
}
