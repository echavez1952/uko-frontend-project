// src/pages/MenuSection.jsx
import { useEffect, useState, useRef } from "react";
import axios from "axios";

export const MenuSection = () => {
  const [components, setComponents] = useState([]);
  const [selectedComponent, setSelectedComponent] = useState(null);
  const [products, setProducts] = useState([]);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [items, setItems] = useState([]);
  const [modalImage, setModalImage] = useState(null);

  // UX: loading + anti-stale
  const [loadingItems, setLoadingItems] = useState(false);
  const reqIdRef = useRef(0);

  // 1) Cargar componentes (menú)
  useEffect(() => {
    const fetchComponents = async () => {
      try {
        const res = await axios.get("http://localhost:8000/menu");
        const list = Array.isArray(res.data) ? res.data : [];
        setComponents(list);
      } catch (err) {
        console.error("Error cargando componentes:", err);
      }
    };
    fetchComponents();
  }, []);

  // 2) Auto-seleccionar el PRIMER componente en cuanto cargan
  useEffect(() => {
    if (components.length > 0 && !selectedComponent) {
      handleSelectComponent(components[0]);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [components]);

  // Selección de componente → carga productos y auto-selecciona el primero
  const handleSelectComponent = async (component) => {
    setSelectedComponent(component);
    setSelectedProduct(null);
    setItems([]);
    try {
      const res = await axios.get(
        `http://localhost:8000/product/component/${component._id}`
      );
      const prods = Array.isArray(res.data) ? res.data : [];
      setProducts(prods);
      if (prods.length > 0) handleSelectProduct(prods[0]); // auto-primer producto
    } catch (err) {
      console.error("Error cargando productos:", err);
      setProducts([]);
    }
  };

  // Selección de producto → carga items (imágenes primero)
  const handleSelectProduct = async (product) => {
    setSelectedProduct(product);
    setItems([]);
    setLoadingItems(true);

    const myReqId = ++reqIdRef.current;
    try {
      const res = await axios.get(
        `http://localhost:8000/item/product/${product._id}`
      );
      if (myReqId !== reqIdRef.current) return;

      const data = Array.isArray(res.data) ? res.data : [];
      const sorted = data.sort((a, b) => {
        if (a.image && !b.image) return -1;
        if (!a.image && b.image) return 1;
        return 0;
      });
      setItems(sorted);
    } catch (err) {
      if (myReqId !== reqIdRef.current) return;
      console.error("Error cargando items:", err);
      setItems([]);
    } finally {
      if (myReqId === reqIdRef.current) setLoadingItems(false);
    }
  };

  const onDragStart = (e, item) => {
    e.dataTransfer.setData("text/plain", item._id);
    if (item.image) e.dataTransfer.setData("image", item.image);
  };

  // Estilos de botón reutilizables
  const btn =
    "inline-flex items-center rounded-full border px-3 py-1.5 text-lg font-semibold transition focus:outline-none focus:ring-2 focus:ring-offset-2";
  // const btnNeutral = `${btn} border-gray-300 text-gray-700 hover:bg-gray-50 focus:ring-green-600`;
  const btnNeutral = `${btn} bg-blue-400 text-gray-800 border-gray-600 hover:bg-gray-400 focus:ring-green-600`;
  const btnActive = `${btn} border-green-700 text-white bg-green-700 hover:bg-green-800 focus:ring-green-700`;

  return (
    <div className="p-6">
      {/* COMPONENTES como botones */}
      <div className="flex flex-wrap gap-3 justify-center border-b pb-4 mb-6">
        {components.map((comp) => {
          const active = selectedComponent?._id === comp._id;
          return (
            <button
              key={comp._id}
              type="button"
              onClick={() => handleSelectComponent(comp)}
              className={active ? btnActive : btnNeutral}
              aria-pressed={active}
            >
              {comp.name}
            </button>
          );
        })}
      </div>

      {/* Bloque del componente seleccionado */}
      {selectedComponent && (
        <div className="mb-6">
          <div className="bg-green-900 text-white text-center py-3 rounded-lg">
            <h2 className="text-2xl sm:text-3xl font-bold">
              {selectedComponent.name}
            </h2>
          </div>
        </div>
      )}

      {/* PRODUCTOS como botones (debajo del bloque del componente) */}
      {selectedComponent && products.length > 0 && (
        <div className="flex flex-wrap gap-3 justify-center border-b pb-4 mb-6">
          {products.map((prod) => {
            const active = selectedProduct?._id === prod._id;
            return (
              <button
                key={prod._id}
                onClick={() => handleSelectProduct(prod)}
                className={active ? btnActive : btnNeutral}
                aria-pressed={active}
                type="button"
              >
                {prod.title}
              </button>
            );
          })}
        </div>
      )}

      {/* ITEMS (debajo) */}
      {selectedProduct && (
        loadingItems ? (
          <div className="py-10 text-center text-gray-500">Cargando…</div>
        ) : items.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {items.map((item) => (
              <div key={item._id} className="flex border-b pb-4 items-start gap-4">
                {item.image && (
                  <img
                    src={item.image}
                    alt={item.title}
                    draggable
                    onDragStart={(e) => onDragStart(e, item)}
                    onClick={() => setModalImage(item.image)}
                    className="w-20 h-20 object-cover rounded cursor-zoom-in"
                  />
                )}
                <div className="flex-1">
                  <h4 className="font-bold text-lg">{item.title}</h4>
                  {item.description && (
                    <p className="font-semibold text-gray-600">
                      {item.description}
                    </p>
                  )}
                </div>
                {item.price && (
                  <p className="text-green-900 font-semibold whitespace-nowrap">
                    {Number(item.price).toLocaleString("en-US", {
                      style: "currency",
                      currency: "USD",
                    })}
                  </p>
                )}
              </div>
            ))}
          </div>
        ) : (
          <p className="text-center text-gray-500">
            No hay items para este producto.
          </p>
        )
      )}

      {/* MODAL imagen */}
      {modalImage && (
        <div
          className="fixed inset-0 mt-16 bg-black/75 flex items-center justify-center z-[999]"
          onClick={() => setModalImage(null)}
          role="dialog"
          aria-modal="true"
        >
          <img
            src={modalImage}
            alt="Ampliada"
            className="max-h-[80vh] max-w-[90vw] rounded shadow-lg"
            onClick={(e) => e.stopPropagation()}
          />
        </div>
      )}
    </div>
  );
};

