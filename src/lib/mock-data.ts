import type { AdminAnalytics, Event, EventStop, EventWithStops } from "./types";

const MOCK_DISPENSARIES = {
  greenGenie: {
    id: "d1000000-0000-4000-8000-000000000001",
    name: "Green Genie",
    address: "2460 E Stadium Blvd",
    city: "Ann Arbor",
    state: "MI",
    lat: 42.2699,
    lng: -83.6987,
    google_review_url: "https://g.page/green-genie-ann-arbor/review",
  },
  exclusive: {
    id: "d1000000-0000-4000-8000-000000000002",
    name: "Exclusive Cannabis",
    address: "3820 Varsity Dr",
    city: "Ann Arbor",
    state: "MI",
    lat: 42.2831,
    lng: -83.7436,
    google_review_url: "https://g.page/exclusive-cannabis/review",
  },
  skymint: {
    id: "d1000000-0000-4000-8000-000000000003",
    name: "Skymint",
    address: "1958 S Industrial Hwy",
    city: "Ann Arbor",
    state: "MI",
    lat: 42.2472,
    lng: -83.7356,
    google_review_url: "https://g.page/skymint-ann-arbor/review",
  },
  houseOfDank: {
    id: "d1000000-0000-4000-8000-000000000004",
    name: "House of Dank",
    address: "4568 E 8 Mile Rd",
    city: "Detroit",
    state: "MI",
    lat: 42.4482,
    lng: -83.0998,
    google_review_url: "https://g.page/house-of-dank/review",
  },
  lume: {
    id: "d1000000-0000-4000-8000-000000000005",
    name: "Lume Cannabis",
    address: "200 E Jefferson Ave",
    city: "Detroit",
    state: "MI",
    lat: 42.3314,
    lng: -83.042,
    google_review_url: "https://g.page/lume-cannabis/review",
  },
};

export const MOCK_EVENTS: Event[] = [
  {
    id: "e1000000-0000-4000-8000-000000000001",
    slug: "hash-bash-2026",
    name: "Hash Bash 2026",
    city: "Ann Arbor",
    theme: "Hash Bash",
    description:
      "Join the ultimate Ann Arbor cannabis treasure hunt during Hash Bash weekend. Visit participating dispensaries, check in with JoseyMap, and unlock exclusive deals.",
    meta_description:
      "Hash Bash 2026 treasure map — explore Ann Arbor dispensary stops, check in, and redeem exclusive cannabis offers with JoseyMap.",
    map_center_lat: 42.2808,
    map_center_lng: -83.743,
    map_zoom: 13,
    starts_at: "2026-04-04T10:00:00",
    ends_at: "2026-04-04T22:00:00",
    is_active: true,
  },
  {
    id: "e1000000-0000-4000-8000-000000000002",
    slug: "halloween-hunt-2026",
    name: "Halloween Hunt 2026",
    city: "Detroit",
    theme: "Halloween",
    description:
      "A spooky cannabis treasure hunt across Detroit dispensaries. Collect stops on your Halloween Hunt map and claim limited-time bundle deals.",
    meta_description:
      "Halloween Hunt 2026 — Detroit dispensary treasure map with exclusive offers. Check in and redeem deals with JoseyMap.",
    map_center_lat: 42.3314,
    map_center_lng: -83.0458,
    map_zoom: 12,
    starts_at: "2026-10-31T12:00:00",
    ends_at: "2026-10-31T23:00:00",
    is_active: true,
  },
];

export const MOCK_STOPS: EventStop[] = [
  {
    id: "s1000000-0000-4000-8000-000000000001",
    event_id: MOCK_EVENTS[0].id,
    dispensary_id: MOCK_DISPENSARIES.greenGenie.id,
    offer_title: "20% Off Edibles",
    offer_description:
      "Show your treasure map at checkout for 20% off all edibles. Valid during Hash Bash weekend.",
    stop_order: 1,
    dispensary: MOCK_DISPENSARIES.greenGenie,
  },
  {
    id: "s1000000-0000-4000-8000-000000000002",
    event_id: MOCK_EVENTS[0].id,
    dispensary_id: MOCK_DISPENSARIES.exclusive.id,
    offer_title: "Free Pre-Roll",
    offer_description:
      "Check in at the counter and receive a free pre-roll with any purchase over $25.",
    stop_order: 2,
    dispensary: MOCK_DISPENSARIES.exclusive,
  },
  {
    id: "s1000000-0000-4000-8000-000000000003",
    event_id: MOCK_EVENTS[0].id,
    dispensary_id: MOCK_DISPENSARIES.skymint.id,
    offer_title: "BOGO Concentrates",
    offer_description:
      "Buy one concentrate, get one 50% off. Limited to one per visitor.",
    stop_order: 3,
    dispensary: MOCK_DISPENSARIES.skymint,
  },
  {
    id: "s1000000-0000-4000-8000-000000000004",
    event_id: MOCK_EVENTS[1].id,
    dispensary_id: MOCK_DISPENSARIES.houseOfDank.id,
    offer_title: "Spooky Bundle Deal",
    offer_description:
      "Halloween bundle: 1/8 + edible for $35. While supplies last.",
    stop_order: 1,
    dispensary: MOCK_DISPENSARIES.houseOfDank,
  },
  {
    id: "s1000000-0000-4000-8000-000000000005",
    event_id: MOCK_EVENTS[1].id,
    dispensary_id: MOCK_DISPENSARIES.lume.id,
    offer_title: "Trick-or-Treat Discount",
    offer_description:
      "15% off your entire order when you show your Halloween Hunt map.",
    stop_order: 2,
    dispensary: MOCK_DISPENSARIES.lume,
  },
];

type MockCounters = {
  checkins: Record<string, number>;
  redemptions: Record<string, number>;
  reviewClicks: Record<string, number>;
};

const globalForMock = globalThis as typeof globalThis & {
  __joseymapMockCounters?: MockCounters;
};

function getMockCounters(): MockCounters {
  if (!globalForMock.__joseymapMockCounters) {
    globalForMock.__joseymapMockCounters = {
      checkins: {
        [MOCK_STOPS[0].id]: 42,
        [MOCK_STOPS[1].id]: 28,
        [MOCK_STOPS[2].id]: 19,
        [MOCK_STOPS[3].id]: 15,
        [MOCK_STOPS[4].id]: 11,
      },
      redemptions: {
        [MOCK_STOPS[0].id]: 31,
        [MOCK_STOPS[1].id]: 22,
        [MOCK_STOPS[2].id]: 14,
        [MOCK_STOPS[3].id]: 9,
        [MOCK_STOPS[4].id]: 7,
      },
      reviewClicks: {
        [MOCK_STOPS[0].id]: 18,
        [MOCK_STOPS[1].id]: 12,
        [MOCK_STOPS[2].id]: 8,
        [MOCK_STOPS[3].id]: 6,
        [MOCK_STOPS[4].id]: 4,
      },
    };
  }
  return globalForMock.__joseymapMockCounters;
}

export function mockGetActiveEvents(): Event[] {
  return MOCK_EVENTS.filter((e) => e.is_active);
}

export function mockGetEventBySlug(slug: string): Event | null {
  return MOCK_EVENTS.find((e) => e.slug === slug) ?? null;
}

export function mockGetEventStops(slug: string): EventStop[] {
  const event = mockGetEventBySlug(slug);
  if (!event) return [];
  return MOCK_STOPS.filter((s) => s.event_id === event.id).sort(
    (a, b) => a.stop_order - b.stop_order
  );
}

export function mockGetStopById(
  slug: string,
  stopId: string
): (EventStop & { event: Event }) | null {
  const event = mockGetEventBySlug(slug);
  if (!event) return null;
  const stop = MOCK_STOPS.find((s) => s.id === stopId && s.event_id === event.id);
  if (!stop) return null;
  return { ...stop, event };
}

export function mockRecordCheckin(stopId: string): void {
  const counters = getMockCounters();
  counters.checkins[stopId] = (counters.checkins[stopId] ?? 0) + 1;
}

export function mockRecordRedemption(stopId: string): void {
  const counters = getMockCounters();
  counters.redemptions[stopId] = (counters.redemptions[stopId] ?? 0) + 1;
}

export function mockRecordReviewClick(stopId: string): void {
  const counters = getMockCounters();
  counters.reviewClicks[stopId] = (counters.reviewClicks[stopId] ?? 0) + 1;
}

export function mockGetAdminAnalytics(): AdminAnalytics {
  const counters = getMockCounters();

  const perDispensary = MOCK_STOPS.map((stop) => ({
    dispensaryId: stop.dispensary_id,
    dispensaryName: stop.dispensary.name,
    checkins: counters.checkins[stop.id] ?? 0,
    redemptions: counters.redemptions[stop.id] ?? 0,
    reviewClicks: counters.reviewClicks[stop.id] ?? 0,
  }));

  const aggregated = new Map<string, (typeof perDispensary)[0]>();
  for (const row of perDispensary) {
    const existing = aggregated.get(row.dispensaryId);
    if (existing) {
      existing.checkins += row.checkins;
      existing.redemptions += row.redemptions;
      existing.reviewClicks += row.reviewClicks;
    } else {
      aggregated.set(row.dispensaryId, { ...row });
    }
  }

  const dispensaryRows = Array.from(aggregated.values());

  return {
    totalCheckins: dispensaryRows.reduce((sum, r) => sum + r.checkins, 0),
    totalRedemptions: dispensaryRows.reduce((sum, r) => sum + r.redemptions, 0),
    totalReviewClicks: dispensaryRows.reduce(
      (sum, r) => sum + r.reviewClicks,
      0
    ),
    perDispensary: dispensaryRows,
  };
}

export function mockGetEventWithStops(slug: string): EventWithStops | null {
  const event = mockGetEventBySlug(slug);
  if (!event) return null;
  return { ...event, stops: mockGetEventStops(slug) };
}
