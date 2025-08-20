// src/pages/MenuSection.jsx

import { useEffect, useState } from "react";
import axios from "axios";

export const MenuSection = () => {
  const [components, setComponents] = useState([]);
  const [selectedComponent, setSelectedComponent] = useState(null);
  const [products, setProducts] = useState([]);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [items, setItems] = useState([]);
  const [loadingProducts, setLoadingProducts] = useState(false);
  const [loadingItems, setLoadingItems] = useState(false);

  // Cargar los componentes al inicio
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

  // Al seleccionar un componente, cargar sus productos
  const handleSelectComponent = async (component) => {
    setSelectedComponent(component);
    setSelectedProduct(null);
    setItems([]);
    setLoadingProducts(true);
    try {
      const res = await axios.get(
        `http://localhost:8000/product/component/${component._id}`
      );
      setProducts(res.data);
    } catch (err) {
      console.error("Error cargando productos:", err);
    } finally {
      setLoadingProducts(false);
    }
  };

  // Al seleccionar un producto, cargar sus items
  const handleSelectProduct = async (product) => {
    setSelectedProduct(product);
    setLoadingItems(true);
    try {
      const res = await axios.get(
          `http://localhost:8000/item/product/${product._id}`
      );
      setItems(res.data);
    } catch (err) {
      console.error("Error cargando items:", err);
    } finally {
      setLoadingItems(false);
    }
  };

  return (
    <div className="p-6">
      {/* Nivel 1: Componentes */}
      <div className="flex flex-wrap gap-6 justify-center border-b pb-4 mb-6">
        {components.map((comp) => (
          <span
            key={comp._id}
            onClick={() => handleSelectComponent(comp)}
            className={`cursor-pointer font-semibold text-lg hover:text-blue-600 transition ${selectedComponent?._id === comp._id
                ? "text-blue-600 underline"
                : "text-gray-800"
              }`}
          >
            {comp.name}
          </span>
        ))}
      </div>

      {/* Nivel 2: Productos */}
      {selectedComponent && (
        <div className="mb-8">
          <h2 className="text-2xl font-bold text-center mb-4">
            {selectedComponent.name}
          </h2>

          {loadingProducts ? (
            <p className="text-center text-gray-500">Cargando productos...</p>
          ) : products.length === 0 ? (
            <p className="text-center text-gray-400">
              No hay productos en esta categoría.
            </p>
          ) : (
            <div className="flex flex-wrap gap-6 justify-center border-b pb-4 mb-6">
              {products.map((prod) => (
                <span
                  key={prod._id}
                  onClick={() => handleSelectProduct(prod)}
                  className={`cursor-pointer font-medium text-lg whitespace-nowrap hover:text-green-600 transition ${selectedProduct?._id === prod._id
                      ? "text-green-600 underline"
                      : "text-gray-800"
                    }`}
                >
                  {prod.title}
                </span>
              ))}
            </div>
          )}
        </div>
      )}

      {/* Nivel 3: Items */}
      {selectedProduct && (
        <div>
          <h3 className="text-xl font-bold text-center mb-4">
            {selectedProduct.title}
          </h3>

          {loadingItems ? (
            <p className="text-center text-gray-500">Cargando items...</p>
          ) : items.length === 0 ? (
            <p className="text-center text-gray-400">
              No hay items para este producto.
            </p>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
              {items.map((item) => (
                <div
                  key={item._id}
                  className="border rounded-lg shadow-md p-4 flex flex-col items-center"
                >
                  {item.image ? (
                    <img
                      src={item.image}
                      alt={item.name}
                      className="h-32 w-32 object-cover rounded mb-3"
                    />
                  ) : (
                    <div className="h-32 w-32 bg-gray-200 flex items-center justify-center rounded mb-3 text-gray-500">
                      Sin imagen
                    </div>
                  )}
                  <h4 className="font-semibold text-lg">{item.title}</h4>
                  {item.price && (
                    <p className="text-green-600 font-bold">${item.price}</p>
                  )}
                  {item.description && (
                    <p className="text-sm text-gray-600 mt-1">
                      {item.description}
                    </p>
                  )}
                </div>
              ))}
            </div>
          )}
        </div>
      )}
    </div>
  );
};
