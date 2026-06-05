"use client";

import { MapContainer, TileLayer, Marker, Popup, useMap } from "react-leaflet";
import L from "leaflet";
import Link from "next/link";
import type { MapMarker } from "@/lib/types";
import "leaflet/dist/leaflet.css";

type EventMapProps = {
  center: { lat: number; lng: number; zoom: number };
  markers: MapMarker[];
  eventSlug: string;
};

function createStopIcon(order: number) {
  return L.divIcon({
    className: "joseymap-marker",
    html: `<div style="
      width:32px;height:32px;border-radius:50%;
      background:linear-gradient(135deg,#22c55e,#16a34a);
      border:2px solid #d4af37;
      color:#070b07;font-weight:700;font-size:14px;
      display:flex;align-items:center;justify-content:center;
      box-shadow:0 2px 12px rgba(0,0,0,0.5);
      font-family:serif;
    ">${order}</div>`,
    iconSize: [32, 32],
    iconAnchor: [16, 16],
    popupAnchor: [0, -18],
  });
}

function FitBounds({ markers }: { markers: MapMarker[] }) {
  const map = useMap();

  if (markers.length > 1) {
    const bounds = L.latLngBounds(markers.map((m) => [m.lat, m.lng]));
    map.fitBounds(bounds, { padding: [40, 40], maxZoom: 14 });
  }

  return null;
}

export function EventMap({ center, markers, eventSlug }: EventMapProps) {
  if (markers.length === 0) {
    return (
      <div className="flex h-full min-h-[320px] items-center justify-center rounded-2xl border border-white/10 bg-map-surface text-sm text-text-muted">
        No map coordinates for stops yet.
      </div>
    );
  }

  return (
    <div className="h-full min-h-[320px] overflow-hidden rounded-2xl border border-treasure-gold/20 shadow-treasure lg:min-h-[500px] lg:sticky lg:top-20">
      <MapContainer
        center={[center.lat, center.lng]}
        zoom={center.zoom}
        className="h-full min-h-[320px] w-full lg:min-h-[500px]"
        scrollWheelZoom={false}
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OSM</a>'
          url="https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png"
        />
        <FitBounds markers={markers} />
        {markers.map((marker) => (
          <Marker
            key={marker.stopId}
            position={[marker.lat, marker.lng]}
            icon={createStopIcon(marker.stopOrder)}
          >
            <Popup>
              <div className="text-sm">
                <p className="font-bold text-map-dark">{marker.name}</p>
                <p className="text-gray-600">{marker.address}</p>
                {marker.offerTitle && (
                  <p className="mt-1 text-green-700">{marker.offerTitle}</p>
                )}
                <Link
                  href={`/events/${eventSlug}/stops/${marker.stopId}`}
                  className="mt-2 inline-block text-green-600 underline"
                >
                  View stop
                </Link>
              </div>
            </Popup>
          </Marker>
        ))}
      </MapContainer>
    </div>
  );
}
