// src/pages/MenuSection.jsx
import { useEffect, useRef, useState } from "react";
import axios from "axios";

export const MenuSection = () => {
  const [components, setComponents] = useState([]);
  const [selectedComponent, setSelectedComponent] = useState(null);

  const [products, setProducts] = useState([]);
  const [selectedProduct, setSelectedProduct] = useState(null);

  const [items, setItems] = useState([]);
  const [modalImage, setModalImage] = useState(null);

  // para evitar “carreras”: solo la última petición de items puede setear estado
  const itemsReqId = useRef(0);

  // Cargar componentes
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

  // Selección de componente
  const handleSelectComponent = async (component) => {
    setSelectedComponent(component);

    // limpiar selección e items
    setSelectedProduct(null);
    setItems([]);
    setModalImage(null);

    try {
      const res = await axios.get(
        `http://localhost:8000/product/component/${component._id}`
      );
      const list = Array.isArray(res.data) ? res.data : [];
      setProducts(list);

      // auto-seleccionar primer producto (si existe)
      if (list.length > 0) handleSelectProduct(list[0]);
    } catch (err) {
      console.error("Error cargando productos:", err);
      setProducts([]);
    }
  };

  // Selección de producto
  const handleSelectProduct = async (product) => {
    setSelectedProduct(product);

    // reset inmediato para NO mostrar los items del producto anterior
    setItems([]);
    setModalImage(null);

    const myId = ++itemsReqId.current;

    try {
      const res = await axios.get(
        `http://localhost:8000/item/product/${product._id}`
      );

      // ignorar respuestas viejas
      if (itemsReqId.current !== myId) return;

      const raw = Array.isArray(res.data) ? res.data : [];
      // ordenar: primero los que tienen imagen
      const sorted = raw.slice().sort((a, b) => {
        if (a.image && !b.image) return -1;
        if (!a.image && b.image) return 1;
        return 0;
      });

      setItems(sorted); // si no hay items, se mantiene []
    } catch (err) {
      if (itemsReqId.current !== myId) return;
      console.error("Error cargando items:", err);
      setItems([]);
    }
  };

  return (
    <div className="p-6">
      {/* COMPONENTES */}
      <div className="flex flex-wrap gap-x-6 gap-y-3 justify-center border-b pb-4 mb-6">
        {components.map((comp) => (
          <button
            key={comp._id}
            type="button"
            onClick={() => handleSelectComponent(comp)}
            className={`font-semibold text-lg transition ${selectedComponent?._id === comp._id
                ? "text-green-700 underline"
                : "text-gray-800 hover:text-green-700"
              }`}
          >
            <span className="whitespace-normal break-words">{comp.name}</span>
          </button>
        ))}
      </div>

      {/* TÍTULO DEL COMPONENTE + PRODUCTOS */}
      {selectedComponent && (
        <div className="mb-8">
          <div className="bg-green-900 text-white text-center py-3 rounded-lg mb-4">
            <h2 className="text-3xl font-bold whitespace-normal break-words">
              {selectedComponent.name}
            </h2>
          </div>

          {/* PRODUCTOS (wrap; sin scroll horizontal) */}
          <div className="flex flex-wrap gap-x-6 gap-y-3 justify-center pb-3 mb-6 border-b">
            {products.map((prod) => (
              <button
                key={prod._id}
                type="button"
                onClick={() => handleSelectProduct(prod)}
                className={`text-left font-medium text-lg transition ${selectedProduct?._id === prod._id
                    ? "text-green-700 underline"
                    : "text-gray-700 hover:text-green-600"
                  }`}
              >
                <span className="whitespace-normal break-words">{prod.title}</span>
              </button>
            ))}
          </div>
        </div>
      )}

      {/* ITEMS */}
      {selectedProduct && (
        items.length === 0 ? (
          <p className="text-center text-gray-500">No items</p>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {items.map((item) => (
              <div key={item._id} className="flex border-b pb-4 items-start gap-4">
                {/* Imagen (click abre modal) */}
                {item.image && (
                  <img
                    src={item.image}
                    alt={item.title}
                    className="h-20 w-20 object-cover rounded cursor-zoom-in"
                    onClick={() => setModalImage(item.image)}
                  />
                )}

                {/* Texto */}
                <div className="flex-1 min-w-0">
                  <h4 className="font-semibold text-lg whitespace-normal break-words">
                    {item.title}
                  </h4>
                  {item.description && (
                    <p className="text-sm text-gray-600 whitespace-normal break-words">
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
        )
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
