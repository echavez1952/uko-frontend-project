// src/pages/MenuSection.jsx

import { useEffect, useRef, useState } from "react";
import axios from "axios";

export const MenuSection = () => {
  const [components, setComponents] = useState([]);
  const [selectedComponent, setSelectedComponent] = useState(null);

  const [products, setProducts] = useState([]);
  const [selectedProduct, setSelectedProduct] = useState(null);

  const [items, setItems] = useState([]);
  const [itemsLoading, setItemsLoading] = useState(false);
  const [itemsError, setItemsError] = useState("");

  const [modalImage, setModalImage] = useState(null);

  // id incremental para ignorar respuestas "viejas"
  const itemsReqIdRef = useRef(0);

  // Cargar componentes (menú)
  useEffect(() => {
    (async () => {
      try {
        const res = await axios.get("http://localhost:8000/menu");
        setComponents(Array.isArray(res.data) ? res.data : []);
      } catch (err) {
        console.error("Error cargando componentes:", err);
        setComponents([]);
      }
    })();
  }, []);

  // Al seleccionar un componente, cargar productos
  const handleSelectComponent = async (component) => {
    setSelectedComponent(component);

    // limpiar selección y items
    setSelectedProduct(null);
    setItems([]);
    setItemsError("");
    setModalImage(null);

    try {
      const res = await axios.get(
        `http://localhost:8000/product/component/${component._id}`
      );
      const list = Array.isArray(res.data) ? res.data : [];
      setProducts(list);

      // Si quieres auto-seleccionar el primero:
      if (list.length > 0) {
        handleSelectProduct(list[0]);
      }
    } catch (err) {
      console.error("Error cargando productos:", err);
      setProducts([]);
    }
  };

  // Al seleccionar un producto, cargar items
  const handleSelectProduct = async (product) => {
    setSelectedProduct(product);

    // reset inmediato para que NO queden los del producto anterior
    setItems([]);
    setItemsError("");
    setModalImage(null);

    // marcar nueva petición y tomar su id
    const reqId = ++itemsReqIdRef.current;

    setItemsLoading(true);
    try {
      const res = await axios.get(
        `http://localhost:8000/item/product/${product._id}`
      );

      // ignorar si llegó tarde y ya hay otra selección activa
      if (itemsReqIdRef.current !== reqId) return;

      const raw = Array.isArray(res.data) ? res.data : [];
      // (opcional) ordenar: primero los que tienen imagen
      const sorted = raw.slice().sort((a, b) => {
        if (a.image && !b.image) return -1;
        if (!a.image && b.image) return 1;
        return 0;
      });

      setItems(sorted); // si está vacío, simplemente renderiza "No items"
    } catch (err) {
      if (itemsReqIdRef.current !== reqId) return;
      console.error("Error cargando items:", err);
      setItems([]);
      setItemsError("No se pudieron cargar los items");
    } finally {
      if (itemsReqIdRef.current === reqId) setItemsLoading(false);
    }
  };

  // DnD opcional (como ya usabas)
  const onDragStart = (e, item) => {
    e.dataTransfer.setData("text/plain", item._id);
    if (item.image) e.dataTransfer.setData("image", item.image);
  };

  return (
    <div className="p-6">
      {/* COMPONENTES */}
      <div className="flex flex-wrap gap-6 justify-center border-b pb-4 mb-6">
        {components.map((comp) => (
          <span
            key={comp._id}
            onClick={() => handleSelectComponent(comp)}
            className={`cursor-pointer font-semibold text-lg hover:text-green-700 transition ${selectedComponent?._id === comp._id
                ? "text-green-700 underline"
                : "text-gray-800"
              }`}
          >
            {comp.name}
          </span>
        ))}
      </div>

      {/* TÍTULO DEL COMPONENTE + PRODUCTOS */}
      {selectedComponent && (
        <div className="mb-8">
          <div className="bg-green-900 text-white text-center py-3 rounded-lg mb-4">
            <h2 className="text-3xl font-bold">{selectedComponent.name}</h2>
          </div>

          {/* PRODUCTOS (scroll horizontal si se desborda) */}
          <div className="flex gap-6 justify-center overflow-x-auto pb-3 mb-6 border-b">
            {products.map((prod) => (
              <span
                key={prod._id}
                onClick={() => handleSelectProduct(prod)}
                className={`cursor-pointer font-medium text-lg whitespace-nowrap transition ${selectedProduct?._id === prod._id
                    ? "text-green-700 underline"
                    : "text-gray-700 hover:text-green-600"
                  }`}
              >
                {prod.title}
              </span>
            ))}
          </div>
        </div>
      )}

      {/* ITEMS */}
      {selectedProduct && (
        <>
          {itemsLoading ? (
            <div className="flex flex-col items-center justify-center py-10">
              <div className="w-12 h-12 border-4 border-green-600 border-dashed rounded-full animate-spin" />
              <p className="mt-4 text-gray-500">Cargando items…</p>
            </div>
          ) : itemsError ? (
            <p className="text-center text-red-600">{itemsError}</p>
          ) : items.length === 0 ? (
            <p className="text-center text-gray-500">No items</p>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {items.map((item) => (
                <div
                  key={item._id}
                  className="flex border-b pb-4 items-start gap-4"
                >
                  {/* Imagen (click abre modal) */}
                  {item.image && (
                    <img
                      src={item.image}
                      alt={item.title}
                      draggable
                      onDragStart={(e) => onDragStart(e, item)}
                      onClick={() => setModalImage(item.image)}
                      className="w-20 h-20 object-cover rounded cursor-zoom-in"
                      title="Ampliar imagen"
                    />
                  )}

                  {/* Texto */}
                  <div className="flex-1 min-w-0">
                    <h4 className="font-bold text-lg truncate" title={item.title}>
                      {item.title}
                    </h4>
                    {item.description && (
                      <p className="font-semibold text-gray-600">
                        {item.description}
                      </p>
                    )}
                  </div>

                  {/* Precio */}
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
          )}
        </>
      )}

      {/* MODAL de imagen ampliada (click fuera para cerrar) */}
      {modalImage && (
        <div
          className="fixed inset-0 bg-black/70 flex items-center justify-center z-50"
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
