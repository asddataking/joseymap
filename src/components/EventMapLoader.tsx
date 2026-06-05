"use client";

import dynamic from "next/dynamic";
import type { MapMarker } from "@/lib/types";

const EventMap = dynamic(() => import("./EventMap").then((m) => m.EventMap), {
  ssr: false,
  loading: () => (
    <div className="flex h-full min-h-[320px] animate-pulse items-center justify-center rounded-2xl border border-white/10 bg-map-surface lg:min-h-[500px]">
      <span className="text-sm text-text-muted">Loading map...</span>
    </div>
  ),
});

type EventMapLoaderProps = {
  center: { lat: number; lng: number; zoom: number };
  markers: MapMarker[];
  eventSlug: string;
};

export function EventMapLoader(props: EventMapLoaderProps) {
  return <EventMap {...props} />;
}
