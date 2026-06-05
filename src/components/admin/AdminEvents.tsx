"use client";

import { useCallback, useEffect, useState } from "react";
import type { Event } from "@/lib/types";
import { TreasureButton } from "../TreasureButton";
import { AdminFormField, adminInputClass } from "./AdminFormField";

const emptyEvent = (): Partial<Event> => ({
  slug: "",
  name: "",
  city: "",
  theme: "",
  description: "",
  meta_description: "",
  map_center_lat: 42.2808,
  map_center_lng: -83.743,
  map_zoom: 13,
  starts_at: "",
  ends_at: "",
  is_active: true,
});

export function AdminEvents() {
  const [events, setEvents] = useState<Event[]>([]);
  const [form, setForm] = useState<Partial<Event>>(emptyEvent());
  const [editingId, setEditingId] = useState<string | null>(null);
  const [message, setMessage] = useState("");

  const load = useCallback(async () => {
    const res = await fetch("/api/admin/events");
    if (res.ok) setEvents(await res.json());
  }, []);

  useEffect(() => {
    load();
  }, [load]);

  const save = async () => {
    const res = await fetch("/api/admin/events", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(form),
    });
    if (res.ok) {
      setMessage("Event saved!");
      setForm(emptyEvent());
      setEditingId(null);
      load();
    } else {
      setMessage("Failed to save event.");
    }
  };

  const remove = async (id: string) => {
    if (!confirm("Delete this event and all its stops?")) return;
    await fetch(`/api/admin/events?id=${id}`, { method: "DELETE" });
    load();
  };

  const edit = (event: Event) => {
    setForm({ ...event });
    setEditingId(event.id);
  };

  return (
    <div className="space-y-6">
      <div className="treasure-card space-y-3 p-5">
        <h3 className="font-display text-lg text-gold-gradient">
          {editingId ? "Edit Event" : "Add Event"}
        </h3>
        <div className="grid gap-3 sm:grid-cols-2">
          <AdminFormField label="Name">
            <input className={adminInputClass} value={form.name ?? ""} onChange={(e) => setForm({ ...form, name: e.target.value })} />
          </AdminFormField>
          <AdminFormField label="Slug (URL)">
            <input className={adminInputClass} value={form.slug ?? ""} onChange={(e) => setForm({ ...form, slug: e.target.value })} placeholder="hash-bash-2026" />
          </AdminFormField>
          <AdminFormField label="City">
            <input className={adminInputClass} value={form.city ?? ""} onChange={(e) => setForm({ ...form, city: e.target.value })} />
          </AdminFormField>
          <AdminFormField label="Theme">
            <input className={adminInputClass} value={form.theme ?? ""} onChange={(e) => setForm({ ...form, theme: e.target.value })} />
          </AdminFormField>
          <AdminFormField label="Map center lat">
            <input type="number" step="any" className={adminInputClass} value={form.map_center_lat ?? ""} onChange={(e) => setForm({ ...form, map_center_lat: parseFloat(e.target.value) })} />
          </AdminFormField>
          <AdminFormField label="Map center lng">
            <input type="number" step="any" className={adminInputClass} value={form.map_center_lng ?? ""} onChange={(e) => setForm({ ...form, map_center_lng: parseFloat(e.target.value) })} />
          </AdminFormField>
          <AdminFormField label="Starts at">
            <input type="datetime-local" className={adminInputClass} value={form.starts_at?.slice(0, 16) ?? ""} onChange={(e) => setForm({ ...form, starts_at: e.target.value })} />
          </AdminFormField>
          <AdminFormField label="Ends at">
            <input type="datetime-local" className={adminInputClass} value={form.ends_at?.slice(0, 16) ?? ""} onChange={(e) => setForm({ ...form, ends_at: e.target.value })} />
          </AdminFormField>
        </div>
        <AdminFormField label="Description (SEO page content)">
          <textarea className={adminInputClass} rows={3} value={form.description ?? ""} onChange={(e) => setForm({ ...form, description: e.target.value })} />
        </AdminFormField>
        <AdminFormField label="Meta description">
          <textarea className={adminInputClass} rows={2} value={form.meta_description ?? ""} onChange={(e) => setForm({ ...form, meta_description: e.target.value })} />
        </AdminFormField>
        <label className="flex items-center gap-2 text-sm text-text-muted">
          <input type="checkbox" checked={form.is_active ?? true} onChange={(e) => setForm({ ...form, is_active: e.target.checked })} />
          Active
        </label>
        <div className="flex gap-2">
          <TreasureButton onClick={save}>Save Event</TreasureButton>
          {editingId && (
            <TreasureButton variant="ghost" onClick={() => { setForm(emptyEvent()); setEditingId(null); }}>
              Cancel
            </TreasureButton>
          )}
        </div>
        {message && <p className="text-sm text-cannabis-green">{message}</p>}
      </div>

      <div className="space-y-2">
        {events.map((event) => (
          <div key={event.id} className="treasure-card flex items-center justify-between gap-3 p-4">
            <div>
              <p className="font-medium text-text-primary">{event.name}</p>
              <p className="text-xs text-text-muted">/events/{event.slug}</p>
            </div>
            <div className="flex gap-2">
              <a href={`/events/${event.slug}`} target="_blank" className="text-xs text-cannabis-green hover:underline">View</a>
              <button onClick={() => edit(event)} className="text-xs text-treasure-gold hover:underline">Edit</button>
              <button onClick={() => remove(event.id)} className="text-xs text-red-400 hover:underline">Delete</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
