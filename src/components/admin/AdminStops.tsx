"use client";

import { useCallback, useEffect, useState } from "react";
import type { Dispensary, Event, EventStop } from "@/lib/types";
import { TreasureButton } from "../TreasureButton";
import { AdminFormField, adminInputClass } from "./AdminFormField";

type StopRow = EventStop & { event_name?: string };

const empty = () => ({
  event_id: "",
  dispensary_id: "",
  offer_title: "",
  offer_description: "",
  stop_order: 1,
});

export function AdminStops() {
  const [stops, setStops] = useState<StopRow[]>([]);
  const [events, setEvents] = useState<Event[]>([]);
  const [dispensaries, setDispensaries] = useState<Dispensary[]>([]);
  const [form, setForm] = useState(empty());
  const [editingId, setEditingId] = useState<string | null>(null);

  const load = useCallback(async () => {
    const [sRes, eRes, dRes] = await Promise.all([
      fetch("/api/admin/event-stops"),
      fetch("/api/admin/events"),
      fetch("/api/admin/dispensaries"),
    ]);
    if (sRes.ok) setStops(await sRes.json());
    if (eRes.ok) setEvents(await eRes.json());
    if (dRes.ok) setDispensaries(await dRes.json());
  }, []);

  useEffect(() => {
    load();
  }, [load]);

  const save = async () => {
    await fetch("/api/admin/event-stops", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(editingId ? { ...form, id: editingId } : form),
    });
    setForm(empty());
    setEditingId(null);
    load();
  };

  const remove = async (id: string) => {
    if (!confirm("Delete this stop?")) return;
    await fetch(`/api/admin/event-stops?id=${id}`, { method: "DELETE" });
    load();
  };

  return (
    <div className="space-y-6">
      <div className="treasure-card space-y-3 p-5">
        <h3 className="font-display text-lg text-gold-gradient">
          {editingId ? "Edit Stop" : "Add Map Stop"}
        </h3>
        <div className="grid gap-3 sm:grid-cols-2">
          <AdminFormField label="Event">
            <select className={adminInputClass} value={form.event_id} onChange={(e) => setForm({ ...form, event_id: e.target.value })}>
              <option value="">Select event</option>
              {events.map((e) => (
                <option key={e.id} value={e.id}>{e.name}</option>
              ))}
            </select>
          </AdminFormField>
          <AdminFormField label="Dispensary">
            <select className={adminInputClass} value={form.dispensary_id} onChange={(e) => setForm({ ...form, dispensary_id: e.target.value })}>
              <option value="">Select dispensary</option>
              {dispensaries.map((d) => (
                <option key={d.id} value={d.id}>{d.name}</option>
              ))}
            </select>
          </AdminFormField>
          <AdminFormField label="Stop order">
            <input type="number" className={adminInputClass} value={form.stop_order} onChange={(e) => setForm({ ...form, stop_order: parseInt(e.target.value) })} />
          </AdminFormField>
          <AdminFormField label="Offer title">
            <input className={adminInputClass} value={form.offer_title} onChange={(e) => setForm({ ...form, offer_title: e.target.value })} />
          </AdminFormField>
        </div>
        <AdminFormField label="Offer description">
          <textarea className={adminInputClass} rows={2} value={form.offer_description} onChange={(e) => setForm({ ...form, offer_description: e.target.value })} />
        </AdminFormField>
        <div className="flex gap-2">
          <TreasureButton onClick={save}>Save Stop</TreasureButton>
          {editingId && (
            <TreasureButton variant="ghost" onClick={() => { setForm(empty()); setEditingId(null); }}>Cancel</TreasureButton>
          )}
        </div>
      </div>

      <div className="space-y-2">
        {stops.map((s) => (
          <div key={s.id} className="treasure-card flex items-center justify-between p-4">
            <div>
              <p className="font-medium">
                #{s.stop_order} {s.dispensary.name}
              </p>
              <p className="text-xs text-text-muted">{s.event_name} · {s.offer_title}</p>
            </div>
            <div className="flex gap-2">
              <button
                onClick={() => {
                  setForm({
                    event_id: s.event_id,
                    dispensary_id: s.dispensary_id,
                    offer_title: s.offer_title ?? "",
                    offer_description: s.offer_description ?? "",
                    stop_order: s.stop_order,
                  });
                  setEditingId(s.id);
                }}
                className="text-xs text-treasure-gold"
              >
                Edit
              </button>
              <button onClick={() => remove(s.id)} className="text-xs text-red-400">Delete</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
