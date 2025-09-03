// src/components/LocationsForm.jsx
import { useEffect, useRef, useState } from "react";

const API = "http://localhost:8000/location";

export const LocationsForm = () => {
  const [items, setItems] = useState([]);
  const [name, setName] = useState("");
  const [address, setAddress] = useState("");
  const [file, setFile] = useState(null);
  const [preview, setPreview] = useState(null);
  const [loading, setLoading] = useState(false);
  const [err, setErr] = useState(null);
  const [ok, setOk] = useState("");

  const fileRef = useRef(null);

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

  // Preview de imagen + cleanup
  useEffect(() => {
    if (!file) {
      if (preview) URL.revokeObjectURL(preview);
      setPreview(null);
      return;
    }
    const url = URL.createObjectURL(file);
    setPreview(url);
    return () => URL.revokeObjectURL(url);
  }, [file]); // eslint-disable-line

  // Autocerrar mensaje de OK a los 3s
  useEffect(() => {
    if (!ok) return;
    const t = setTimeout(() => setOk(""), 3000);
    return () => clearTimeout(t);
  }, [ok]);

  function resetForm() {
    setName("");
    setAddress("");
    setFile(null);
    if (fileRef.current) fileRef.current.value = "";
  }

  async function onSubmit(e) {
    e.preventDefault();
    setLoading(true);
    setErr(null);
    setOk("");
    try {
      const fd = new FormData();
      fd.append("name", name);
      fd.append("address", address);
      if (file) fd.append("image", file);

      const res = await fetch(API, { method: "POST", body: fd });
      if (!res.ok) {
        let j = {};
        try {
          j = await res.json();
        } catch { }
        throw new Error(j.detail || "No se pudo crear la localidad");
      }

      resetForm();
      setOk("✅ Localidad creada correctamente");
      await load();
    } catch (e) {
      setErr(e?.message || "Error al guardar");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="max-w-6xl mx-auto p-6 space-y-6">
      <h2 className="text-2xl font-semibold">UKÖ Bread Locations</h2>

      {/* Alertas */}
      {ok && (
        <div className="flex items-start justify-between gap-4 rounded-lg border border-green-300 bg-green-50 text-green-800 px-3 py-2">
          <span>{ok}</span>
          <button
            type="button"
            onClick={() => setOk("")}
            className="px-2 rounded hover:bg-green-100"
            title="Cerrar"
          >
            ×
          </button>
        </div>
      )}
      {err && (
        <div className="rounded-lg border border-red-300 bg-red-50 text-red-700 px-3 py-2">
          {err}
        </div>
      )}

      {/* Layout: formulario a la izquierda, lista a la derecha */}
      <div className="grid md:grid-cols-2 gap-6">
        {/* Formulario */}
        <form onSubmit={onSubmit} className="grid gap-4 p-4 rounded-2xl border bg-white">
          <label className="grid gap-1">
            <span className="text-sm text-gray-600">Name</span>
            <input
              className="border rounded-lg p-2"
              placeholder="Name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
          </label>

          <label className="grid gap-1">
            <span className="text-sm text-gray-600">Address</span>
            <input
              className="border rounded-lg p-2"
              placeholder="Address"
              value={address}
              onChange={(e) => setAddress(e.target.value)}
              required
            />
          </label>

          <label className="grid gap-1">
            <span className="text-sm text-gray-600">Image (optional)</span>
            <input
              ref={fileRef}
              type="file"
              accept="image/*"
              className="border rounded-lg p-2"
              onChange={(e) => setFile(e.target.files?.[0] || null)}
            />
          </label>

          {preview && (
            <div className="flex items-center gap-3">
              <img
                src={preview}
                alt="Preview"
                className="w-24 h-24 object-cover rounded-lg border"
              />
              <button
                type="button"
                onClick={() => {
                  setFile(null);
                  if (fileRef.current) fileRef.current.value = "";
                }}
                className="px-3 py-2 rounded border hover:bg-gray-50"
                title="Quitar imagen seleccionada"
              >
                Quitar imagen
              </button>
            </div>
          )}

          <div className="flex gap-3 pt-2">
            <button
              disabled={loading}
              className="bg-black text-white rounded-xl px-4 py-2 disabled:opacity-50"
            >
              {loading ? "Saving…" : "Create location"}
            </button>
            <button
              type="button"
              onClick={resetForm}
              className="rounded-xl border px-4 py-2 hover:bg-gray-50"
              title="Limpiar formulario"
            >
              Reset
            </button>
          </div>
        </form>

        {/* Lista de localidades */}
        <div>
          <h3 className="font-semibold mb-2">Localidades creadas</h3>

          <ul className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 max-h-[70vh] overflow-y-auto pr-2">
            {items.length === 0 && (
              <li className="text-gray-500">Sin localidades aún.</li>
            )}
            {items.map((loc) => (
              <li key={loc.id} className="border rounded-2xl p-4 bg-white">
                <div className="flex gap-4">
                  {loc.image && (
                    <img
                      src={`http://localhost:8000${loc.image}`}
                      alt={loc.name}
                      className="w-24 h-24 object-cover rounded-lg"
                    />
                  )}
                  <div className="min-w-0">
                    <div className="font-medium truncate" title={loc.name}>
                      {loc.name}
                    </div>
                    <div className="text-sm text-gray-600 break-words">
                      {loc.address}
                    </div>
                  </div>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};
