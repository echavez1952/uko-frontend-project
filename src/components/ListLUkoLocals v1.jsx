// ListUkoLocals.jsx
import { useEffect, useMemo, useState } from "react";

/**
 * Componente de catálogo de localidades UKÖ Bread.
 * - Fetch a GET {baseUrl}/locations
 * - Muestra cards con imagen (si hay), nombre y dirección
 * - Búsqueda por nombre/dirección
 * - Ordenamiento por Nombre A→Z / Z→A
 * - Estados de carga, error y vacío
 *
 * Requisitos:
 *  - TailwindCSS configurado
 *  - Backend sirviendo imágenes en /uploads (o ajusta baseUrl)
 *
 * Props:
 *  - baseUrl: string (default "http://localhost:8000")
 */
export const ListUkoLocals = ({ baseUrl = "http://localhost:8000" }) => {
  const API = `${baseUrl}/locations`;

  const [items, setItems] = useState([]);
  const [q, setQ] = useState("");
  const [sort, setSort] = useState("name-asc");
  const [loading, setLoading] = useState(true);
  const [err, setErr] = useState(null);

  async function load(signal) {
    setLoading(true);
    setErr(null);
    try {
      const res = await fetch(API, { signal });
      if (!res.ok) throw new Error("No se pudo obtener las localidades");
      const data = await res.json();
      setItems(Array.isArray(data) ? data : []);
    } catch (e) {
      if (e.name !== "AbortError") setErr(e?.message || "Error al cargar");
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    const ctrl = new AbortController();
    load(ctrl.signal);
    return () => ctrl.abort();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [API]);

  const filtered = useMemo(() => {
    const term = q.trim().toLowerCase();
    let list = items;
    if (term) {
      list = items.filter(
        (x) =>
          x?.name?.toLowerCase().includes(term) ||
          x?.address?.toLowerCase().includes(term)
      );
    }
    if (sort === "name-asc") {
      list = [...list].sort((a, b) =>
        (a.name || "").localeCompare(b.name || "", "es", { sensitivity: "base" })
      );
    } else if (sort === "name-desc") {
      list = [...list].sort((a, b) =>
        (b.name || "").localeCompare(a.name || "", "es", { sensitivity: "base" })
      );
    }
    return list;
  }, [items, q, sort]);

  function imageUrl(path) {
    if (!path) return null;
    // el backend retorna algo tipo "/uploads/2025/08/uuid.jpg"
    if (path.startsWith("http")) return path;
    return `${baseUrl}${path}`;
  }

  function initials(name) {
    if (!name) return "U";
    const parts = name.trim().split(/\s+/);
    const i1 = parts[0]?.[0] || "";
    const i2 = parts[1]?.[0] || "";
    return (i1 + i2).toUpperCase();
  }

  return (
    <section className="mx-auto max-w-6xl px-4 py-8">
      <header className="mb-6 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-2xl font-semibold tracking-tight">Localidades UKÖ Bread</h1>
          <p className="text-sm text-gray-500">
            Catálogo de panaderías y puntos de venta.
          </p>
        </div>

        <div className="flex flex-col gap-2 sm:flex-row sm:items-center">
          <div className="relative">
            <input
              value={q}
              onChange={(e) => setQ(e.target.value)}
              placeholder="Buscar por nombre o dirección…"
              className="w-full sm:w-72 rounded-xl border border-gray-200 bg-white px-4 py-2 pr-9 shadow-sm outline-none
                         focus:ring-2 focus:ring-black/10"
            />
            <span className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-gray-400">
              🔎
            </span>
          </div>
          <select
            value={sort}
            onChange={(e) => setSort(e.target.value)}
            className="rounded-xl border border-gray-200 bg-white px-3 py-2 shadow-sm outline-none
                       focus:ring-2 focus:ring-black/10"
          >
            <option value="name-asc">Nombre A→Z</option>
            <option value="name-desc">Nombre Z→A</option>
          </select>
          <button
            onClick={() => load()}
            className="rounded-xl bg-black px-4 py-2 text-white shadow-sm transition hover:opacity-90"
          >
            Recargar
          </button>
        </div>
      </header>

      {/* Estados */}
      {loading && (
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {Array.from({ length: 6 }).map((_, i) => (
            <div
              key={i}
              className="animate-pulse rounded-2xl border border-gray-200 bg-white p-4 shadow-sm"
            >
              <div className="mb-4 h-40 w-full rounded-xl bg-gray-200" />
              <div className="mb-2 h-4 w-1/2 rounded bg-gray-200" />
              <div className="h-3 w-2/3 rounded bg-gray-200" />
            </div>
          ))}
        </div>
      )}

      {!loading && err && (
        <div className="rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-red-700">
          {err}
        </div>
      )}

      {!loading && !err && filtered.length === 0 && (
        <div className="rounded-xl border border-gray-200 bg-white px-4 py-6 text-center text-gray-600">
          No hay localidades para mostrar.
        </div>
      )}

      {!loading && !err && filtered.length > 0 && (
        <ul className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {filtered.map((loc) => {
            const src = imageUrl(loc.image);
            return (
              <li
                key={loc.id}
                className="group overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-sm transition
                           hover:-translate-y-0.5 hover:shadow-md"
              >
                <div className="relative h-44 w-full bg-gray-50">
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

                  {/* badge opcional */}
                  <div className="absolute left-3 top-3 rounded-full bg-white/85 px-2 py-0.5 text-xs text-gray-700 shadow">
                    UKÖ
                  </div>
                </div>

                <div className="p-4">
                  <h3 className="mb-1 line-clamp-1 text-base font-medium">
                    {loc.name || "Sin nombre"}
                  </h3>
                  <p className="line-clamp-2 text-sm text-gray-600">
                    {loc.address || "Sin dirección"}
                  </p>
                </div>
              </li>
            );
          })}
        </ul>
      )}
    </section>
  );
}
