// src/pages/MenuSection.jsx

import { useEffect, useState } from "react";
import axios from "axios";

export const MenuSection = () => {
  const [components, setComponents] = useState([]);
  const [selectedComponent, setSelectedComponent] = useState(null);
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);

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

  // Cargar productos cuando se seleccione un componente
  const handleSelectComponent = async (component) => {
    setSelectedComponent(component);
    setLoading(true);
    try {
      const res = await axios.get(
        `http://localhost:8000/product/component/${component._id}`
      );
      setProducts(res.data);
    } catch (err) {
      console.error("Error cargando productos:", err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-6">
      {/* Fila horizontal con los componentes */}
      <div className="flex gap-6 justify-center border-b pb-4 mb-6">
        {components.map((comp) => (
          <span
            key={comp._id}
            onClick={() => handleSelectComponent(comp)}
            className={`cursor-pointer font-semibold text-lg hover:text-blue-600 transition ${selectedComponent?._id === comp._id ? "text-blue-600 underline" : "text-gray-800"
              }`}
          >
            {comp.name}
          </span>
        ))}
      </div>

      {/* Mostrar productos del componente seleccionado */}
      {selectedComponent && (
        <div>
          <h2 className="text-2xl font-bold text-center mb-4">
            {selectedComponent.name}
          </h2>

          {loading ? (
            <p className="text-center text-gray-500">Cargando productos...</p>
          ) : products.length === 0 ? (
            <p className="text-center text-gray-400">
              No hay productos en esta categoría.
            </p>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
              {products.map((prod) => (
                <div
                  key={prod._id}
                  className="border rounded-lg shadow-md p-4 flex flex-col items-center"
                >
                  {prod.image ? (
                    <img
                      src={prod.image}
                      alt={prod.title}
                      className="h-32 w-32 object-cover rounded mb-3"
                    />
                  ) : (
                    <div className="h-32 w-32 bg-gray-200 flex items-center justify-center rounded mb-3 text-gray-500">
                      Sin imagen
                    </div>
                  )}
                  <h3 className="font-semibold text-lg">{prod.title}</h3>
                  <p className="text-green-600 font-bold">
                    {/* ${prod.price.toFixed(2)} */}
                    ${prod.price}
                  </p>
                  {prod.description && (
                    <p className="text-sm text-gray-600 mt-1">
                      {prod.description}
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
