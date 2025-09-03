// src/pages/MenuSection.jsx

import { useEffect, useState } from "react";
import axios from "axios";

export const MenuSection = () => {
  const [components, setComponents] = useState([]);
  const [selectedComponent, setSelectedComponent] = useState(null);
  const [products, setProducts] = useState([]);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [items, setItems] = useState([]);
  const [modalImage, setModalImage] = useState(null);

  // Cargar componentes (menú)
  useEffect(() => {
    const fetchComponents = async () => {
      try {
        const res = await axios.get("http://localhost:8000/menu");
        setComponents(res.data);
      } catch (err) {
        console.error("Error cargando componentes:", err);
      }
    };
    fetchComponents();
  }, []);

  // Selección de componente → carga productos y auto-selecciona el primero
  const handleSelectComponent = async (component) => {
    setSelectedComponent(component);
    setSelectedProduct(null);
    setItems([]);
    try {
      const res = await axios.get(
        `http://localhost:8000/product/component/${component._id}`
      );
      setProducts(res.data);
      if (res.data.length > 0) handleSelectProduct(res.data[0]);
    } catch (err) {
      console.error("Error cargando productos:", err);
    }
  };

  // Selección de producto → carga items (con imágenes primero)
  const handleSelectProduct = async (product) => {
    setSelectedProduct(product);
    try {
      const res = await axios.get(
        `http://localhost:8000/item/product/${product._id}`
      );
      const sorted = res.data.sort((a, b) => {
        if (a.image && !b.image) return -1;
        if (!a.image && b.image) return 1;
        return 0;
      });
      setItems(sorted);
    } catch (err) {
      console.error("Error cargando items:", err);
    }
  };

  // DnD opcional (como ya lo usas en imágenes)
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

          {/* PRODUCTOS del componente (wrap horizontal si se desborda) */}
          <div className="flex flex-wrap gap-6 justify-center border-b pb-3 mb-6 ">
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
              <div className="flex-1">
                <h4 className="font-bold text-lg">{item.title}</h4>
                {item.description && (
                  <p className="font-semibold text-gray-600">
                    {item.description}
                  </p>
                )}
              </div>

              {/* Precio */}
              {item.price && (
                <p className="text-green-900 font-semibold whitespace-nowrap text-left">
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
