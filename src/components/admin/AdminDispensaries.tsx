"use client";

import { useCallback, useEffect, useState } from "react";
import type { Dispensary } from "@/lib/types";
import { TreasureButton } from "../TreasureButton";
import { AdminFormField, adminInputClass } from "./AdminFormField";

const empty = (): Partial<Dispensary> => ({
  name: "",
  address: "",
  city: "",
  state: "MI",
  lat: null,
  lng: null,
  google_review_url: "",
});

export function AdminDispensaries() {
  const [items, setItems] = useState<Dispensary[]>([]);
  const [form, setForm] = useState<Partial<Dispensary>>(empty());
  const [editingId, setEditingId] = useState<string | null>(null);

  const load = useCallback(async () => {
    const res = await fetch("/api/admin/dispensaries");
    if (res.ok) setItems(await res.json());
  }, []);

  useEffect(() => {
    load();
  }, [load]);

  const save = async () => {
    await fetch("/api/admin/dispensaries", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(form),
    });
    setForm(empty());
    setEditingId(null);
    load();
  };

  const remove = async (id: string) => {
    if (!confirm("Delete this dispensary?")) return;
    await fetch(`/api/admin/dispensaries?id=${id}`, { method: "DELETE" });
    load();
  };

  return (
    <div className="space-y-6">
      <div className="treasure-card space-y-3 p-5">
        <h3 className="font-display text-lg text-gold-gradient">
          {editingId ? "Edit Dispensary" : "Add Dispensary"}
        </h3>
        <div className="grid gap-3 sm:grid-cols-2">
          <AdminFormField label="Name">
            <input className={adminInputClass} value={form.name ?? ""} onChange={(e) => setForm({ ...form, name: e.target.value })} />
          </AdminFormField>
          <AdminFormField label="Address">
            <input className={adminInputClass} value={form.address ?? ""} onChange={(e) => setForm({ ...form, address: e.target.value })} />
          </AdminFormField>
          <AdminFormField label="City">
            <input className={adminInputClass} value={form.city ?? ""} onChange={(e) => setForm({ ...form, city: e.target.value })} />
          </AdminFormField>
          <AdminFormField label="State">
            <input className={adminInputClass} value={form.state ?? "MI"} onChange={(e) => setForm({ ...form, state: e.target.value })} />
          </AdminFormField>
          <AdminFormField label="Latitude">
            <input type="number" step="any" className={adminInputClass} value={form.lat ?? ""} onChange={(e) => setForm({ ...form, lat: parseFloat(e.target.value) || null })} />
          </AdminFormField>
          <AdminFormField label="Longitude">
            <input type="number" step="any" className={adminInputClass} value={form.lng ?? ""} onChange={(e) => setForm({ ...form, lng: parseFloat(e.target.value) || null })} />
          </AdminFormField>
        </div>
        <AdminFormField label="Google Review URL">
          <input className={adminInputClass} value={form.google_review_url ?? ""} onChange={(e) => setForm({ ...form, google_review_url: e.target.value })} />
        </AdminFormField>
        <div className="flex gap-2">
          <TreasureButton onClick={save}>Save Dispensary</TreasureButton>
          {editingId && (
            <TreasureButton variant="ghost" onClick={() => { setForm(empty()); setEditingId(null); }}>Cancel</TreasureButton>
          )}
        </div>
      </div>

      <div className="space-y-2">
        {items.map((d) => (
          <div key={d.id} className="treasure-card flex items-center justify-between p-4">
            <div>
              <p className="font-medium">{d.name}</p>
              <p className="text-xs text-text-muted">{d.address}, {d.city}</p>
              {d.lat && d.lng && (
                <p className="text-xs text-cannabis-green">{d.lat}, {d.lng}</p>
              )}
            </div>
            <div className="flex gap-2">
              <button onClick={() => { setForm(d); setEditingId(d.id); }} className="text-xs text-treasure-gold">Edit</button>
              <button onClick={() => remove(d.id)} className="text-xs text-red-400">Delete</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
