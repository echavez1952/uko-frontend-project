// ListUkoLocals.jsx
import { useEffect, useState } from "react";

export const ListUkoLocals = ({ baseUrl = "http://localhost:8000" }) => {
  const API = `${baseUrl}/location`;
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [err, setErr] = useState(null);
  const [preview, setPreview] = useState(null); // URL de la imagen ampliada

  useEffect(() => {
    let abort = false;
    (async () => {
      try {
        const res = await fetch(API);
        if (!res.ok) throw new Error("No se pudo obtener las localidades");
        const data = await res.json();
        if (!abort) setItems(Array.isArray(data) ? data : []);
      } catch (e) {
        if (!abort) setErr(e?.message || "Error al cargar");
      } finally {
        if (!abort) setLoading(false);
      }
    })();
    return () => { abort = true; };
  }, [API]);

  // Cerrar con ESC
  useEffect(() => {
    function onKey(e) { if (e.key === "Escape") setPreview(null); }
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  function imageUrl(path) {
    if (!path) return null;
    if (path.startsWith("http")) return path;
    return `${baseUrl}${path}`; // backend sirve /uploads/...
  }

  function initials(name) {
    if (!name) return "U";
    const parts = name.trim().split(/\s+/);
    return (parts[0]?.[0] || "U").toUpperCase();
  }

  return (
    <section className="mx-auto max-w-5xl px-4 py-8">
      <h1 className="mb-6 text-2xl text-center font-semibold">Localidades UKÖ Bread</h1>

      {/* Estados básicos */}
      {loading && <p className="text-gray-600">Cargando…</p>}
      {!loading && err && (
        <p className="rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-red-700">{err}</p>
      )}
      {!loading && !err && items.length === 0 && (
        <p className="text-gray-600">No hay localidades para mostrar.</p>
      )}

      {!loading && !err && items.length > 0 && (
        <ul className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {items.map((loc) => {
            const src = imageUrl(loc.image);
            return (
              <li key={loc.id} className="overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-sm">
                <button
                  // type="button"
                  // className="relative block h-48 w-full"
                  // onClick={() => src && setPreview(src)}
                  // title="Ver imagen"
                  type="button"
                  onClick={() => src && setPreview(src)}
                  title="Ver imagen"
                  className="relative block h-48 w-full rounded-xl
                    focus:outline-none
                    focus-visible:ring-1 focus-visible:ring-gray-400"  // ← fino y gris
                >
                                  {src ? (
                    <img
                      src={src}
                      alt={loc.name || "Localidad"}
                      loading="lazy"
                      className="h-full w-full object-cover"
                    />
                  ) : (
                    <div className="flex h-full w-full items-center justify-center bg-gradient-to-br from-gray-100 to-gray-200">
                      <span className="text-3xl font-semibold text-gray-500">
                        {initials(loc.name)}
                      </span>
                    </div>
                  )}
                </button>

                <div className="p-4">
                  <h3 className="mb-1 text-base font-medium">{loc.name || "Sin nombre"}</h3>
                  <p className="text-sm text-gray-600">{loc.address || "Sin dirección"}</p>
                </div>
              </li>
            );
          })}
        </ul>
      )}

      {/* Visor sencillo a pantalla completa */}
      {preview && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 p-4"
          onClick={() => setPreview(null)}
        >
          <img
            src={preview}
            alt="Vista ampliada"
            className="max-h-[90vh] max-w-[90vw] rounded-lg shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          />
          <button
            onClick={() => setPreview(null)}
            className="absolute right-4 top-4 rounded-full bg-white/90 px-3 py-1 text-sm font-medium shadow hover:bg-white"
            title="Cerrar (ESC)"
          >
            Cerrar ✕
          </button>
        </div>
      )}
    </section>
  );
}
