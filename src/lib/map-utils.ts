import type { Event, EventStop, MapMarker } from "./types";

const CITY_CENTERS: Record<string, { lat: number; lng: number; zoom: number }> = {
  "Ann Arbor": { lat: 42.2808, lng: -83.743, zoom: 13 },
  Detroit: { lat: 42.3314, lng: -83.0458, zoom: 12 },
};

export function getEventMapCenter(event: Event): {
  lat: number;
  lng: number;
  zoom: number;
} {
  if (event.map_center_lat != null && event.map_center_lng != null) {
    return {
      lat: event.map_center_lat,
      lng: event.map_center_lng,
      zoom: event.map_zoom ?? 13,
    };
  }

  if (event.city && CITY_CENTERS[event.city]) {
    return CITY_CENTERS[event.city];
  }

  return { lat: 42.2808, lng: -83.743, zoom: 13 };
}

export function stopsToMarkers(stops: EventStop[]): MapMarker[] {
  return stops
    .filter(
      (s) => s.dispensary.lat != null && s.dispensary.lng != null
    )
    .map((s) => ({
      stopId: s.id,
      stopOrder: s.stop_order,
      name: s.dispensary.name,
      address: [s.dispensary.address, s.dispensary.city, s.dispensary.state]
        .filter(Boolean)
        .join(", "),
      lat: s.dispensary.lat!,
      lng: s.dispensary.lng!,
      offerTitle: s.offer_title,
    }));
}
