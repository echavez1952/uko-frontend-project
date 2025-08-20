// src/componentes/MenuWithProducta.jsx

import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export const MenuWithProducts = () => {
  const [components, setComponents] = useState([]);
  const [productsMap, setProductsMap] = useState({});
  const [currentIndex, setCurrentIndex] = useState(0);
  const [loading, setLoading] = useState(true);
  const [loadingProducts, setLoadingProducts] = useState(false);

  const navigate = useNavigate();

  // Cargar todos los componentes y sus productos
  useEffect(() => {
    const fetchComponents = async () => {
      try {
        const compRes = await axios.get("http://localhost:8000/menu");
        setComponents(compRes.data);

        setLoadingProducts(true);
        const productsMapTemp = {};
        await Promise.all(
          compRes.data.map(async (comp) => {
            try {
              const prodRes = await axios.get(
                `http://localhost:8000/product/component/${comp._id}`
              );
              productsMapTemp[comp._id] = prodRes.data;
            } catch (error) {
              console.error(`Error al obtener productos del componente ${comp.name}:`, error);
              productsMapTemp[comp._id] = [];
            }
          })
        );
        setProductsMap(productsMapTemp);
      } catch (error) {
        console.error("Error al obtener componentes:", error);
      } finally {
        setLoading(false);
        setLoadingProducts(false);
      }
    };

    fetchComponents();
  }, []);

  // Filtrar solo componentes que tengan productos
  const filteredComponents = components.filter(
    (comp) => productsMap[comp._id]?.length > 0
  );

  if (loading || loadingProducts) {
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-t-4 border-blue-500"></div>
      </div>
    );
  }

  if (filteredComponents.length === 0) {
    return <p className="text-center text-gray-500 mt-8">No hay componentes con productos.</p>;
  }

  const currentComponent = filteredComponents[currentIndex];
  const currentProducts = productsMap[currentComponent._id] || [];

  const handleNext = () => {
    if (currentIndex === filteredComponents.length - 1) {
      // Último componente con productos -> regresar al menú principal
      navigate("/menu");
    } else {
      setCurrentIndex((prev) => prev + 1);
    }
  };

  const handlePrev = () => {
    if (currentIndex === 0) {
      // Primer componente -> regresar al menú principal
      navigate("/menu");
    } else {
      setCurrentIndex((prev) => prev - 1);
    }
  };

  return (
    <div className="p-6 max-w-4xl mx-auto">
      {/* Componente */}
      <h2 className="text-2xl font-bold text-blue-600 mb-4 text-center">
        {currentComponent.name}
      </h2>
      {currentComponent.description && (
        <p className="text-gray-600 mb-6 text-center">{currentComponent.description}</p>
      )}

      {/* Productos del componente */}
      {currentProducts.length === 0 ? (
        <p className="text-center text-gray-400">No hay productos para este componente.</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {currentProducts.map((prod) => (
            <div
              key={prod._id}
              className="border rounded-lg shadow p-4 flex flex-col items-center text-center"
            >
              {prod.image ? (
                <img
                  src={prod.image}
                  alt={prod.title}
                  className="h-32 w-32 object-cover rounded mb-2"
                />
              ) : (
                <div className="h-32 w-32 bg-gray-200 flex items-center justify-center text-gray-500 rounded mb-2">
                  Sin imagen
                </div>
              )}
              <h3 className="font-semibold text-lg">{prod.title}</h3>
              <p className="text-green-600 font-bold">${Number(prod.price).toFixed(2)}</p>
              {prod.description && (
                <p className="text-gray-500 text-sm mt-1">{prod.description}</p>
              )}
            </div>
          ))}
        </div>
      )}

      {/* Navegación */}
      <div className="flex justify-between mt-8">
        <button
          onClick={handlePrev}
          className="bg-gray-300 px-4 py-2 rounded hover:bg-gray-400"
        >
          ⬅ Anterior
        </button>
        <button
          onClick={handleNext}
          className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
        >
          Siguiente ➡
        </button>
      </div>
    </div>
  );
};
