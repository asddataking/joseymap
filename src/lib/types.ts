export type Profile = {
  id: string;
  display_name: string | null;
  avatar_url: string | null;
  created_at: string | null;
  updated_at: string | null;
};

export type Event = {
  id: string;
  slug: string;
  name: string;
  city: string | null;
  theme: string | null;
  description: string | null;
  meta_description: string | null;
  map_center_lat: number | null;
  map_center_lng: number | null;
  map_zoom: number | null;
  starts_at: string | null;
  ends_at: string | null;
  is_active: boolean;
};

export type Dispensary = {
  id: string;
  name: string;
  address: string | null;
  city: string | null;
  state: string | null;
  lat: number | null;
  lng: number | null;
  google_review_url: string | null;
};

export type EventStop = {
  id: string;
  event_id: string;
  dispensary_id: string;
  offer_title: string | null;
  offer_description: string | null;
  stop_order: number;
  dispensary: Dispensary;
};

export type EventWithStops = Event & {
  stops: EventStop[];
};

export type MapMarker = {
  stopId: string;
  stopOrder: number;
  name: string;
  address: string;
  lat: number;
  lng: number;
  offerTitle: string | null;
};

export type DispensaryAnalytics = {
  dispensaryId: string;
  dispensaryName: string;
  checkins: number;
  redemptions: number;
  reviewClicks: number;
};

export type AdminAnalytics = {
  totalCheckins: number;
  totalRedemptions: number;
  totalReviewClicks: number;
  perDispensary: DispensaryAnalytics[];
};
