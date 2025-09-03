// src/components/LocationsForm.jsx

import { useEffect, useState } from "react";

const API = "http://localhost:8000/location";

export const LocationsForm = () => {
  const [items, setItems] = useState([]);
  const [name, setName] = useState("");
  const [address, setAddress] = useState("");
  const [file, setFile] = useState(null);
  const [loading, setLoading] = useState(false);
  const [err, setErr] = useState(null);

  async function load() {
    try {
      const res = await fetch(API);
      if (!res.ok) throw new Error("Error cargando localidades");
      const data = await res.json();
      setItems(Array.isArray(data) ? data : []);
    } catch (e) {
      setErr(e?.message || "Error cargando");
    }
  }

  useEffect(() => {
    load();
  }, []);

  async function onSubmit(e) {
    e.preventDefault();
    setLoading(true);
    setErr(null);
    try {
      const fd = new FormData();
      fd.append("name", name);
      fd.append("address", address);
      if (file) fd.append("image", file);

      const res = await fetch(API, { method: "POST", body: fd });
      if (!res.ok) {
        let j = {};
        try { j = await res.json(); } catch { }
        throw new Error(j.detail || "No se pudo crear la localidad");
      }

      setName("");
      setAddress("");
      setFile(null);
      await load();
    } catch (e) {
      setErr(e?.message || "Error al guardar");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="max-w-3xl mx-auto p-6 space-y-6">
      <h2 className="text-2xl font-semibold">UKÖ Bread Locations</h2>

      <form onSubmit={onSubmit} className="grid gap-4 p-4 rounded-2xl border">
        <input
          className="border rounded-lg p-2"
          placeholder="Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
        />
        <input
          className="border rounded-lg p-2"
          placeholder="Address"
          value={address}
          onChange={(e) => setAddress(e.target.value)}
          required
        />
        <input
          type="file"
          accept="image/*"
          className="border rounded-lg p-2"
          onChange={(e) => setFile(e.target.files?.[0] || null)}
        />
        <button
          disabled={loading}
          className="bg-black text-white rounded-xl px-4 py-2 disabled:opacity-50"
        >
          {loading ? "Saving…" : "Create location"}
        </button>
        {err && <p className="text-red-600">{err}</p>}
      </form>

      <ul className="grid gap-4">
        {items.map((loc) => (
          <li key={loc.id} className="border rounded-2xl p-4">
            <div className="flex gap-4">
              {loc.image && (
                <img
                  src={`http://localhost:8000${loc.image}`}
                  alt={loc.name}
                  className="w-24 h-24 object-cover rounded-lg"
                />
              )}
              <div>
                <div className="font-medium">{loc.name}</div>
                <div className="text-sm text-gray-600">{loc.address}</div>
              </div>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};
