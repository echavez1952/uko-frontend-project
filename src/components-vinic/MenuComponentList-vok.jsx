// src/components/MenuComponentList.jsx
// Este componente es el elemento "/""
// Muestra todos los componentes del menu con botones para  
// listar productos de un componente, crear productos, borrar el componente

import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

export const MenuComponentList = () => {
  const [components, setComponents] = useState([]);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const fetchComponents = async () => {
    try {
      const response = await axios.get("http://localhost:8000/menu");
      setComponents(response.data);
    } catch (err) {
      console.error(err);
      setError("❌ Components loading error.");
    }
  };

  useEffect(() => {
    fetchComponents();
  }, []);

  const listProducts = (id) => {
    navigate(`/list-products/${id}`);
  };

  const createProducts = (id) => {
    navigate(`/create-products/${id}`);
  };

  const deleteComponent = async (id) => {
    const confirmDelete = window.confirm(
      "⚠️ ¿Estás seguro de que quieres eliminar este componente y todos sus items asociados?"
    );
    if (!confirmDelete) return;

    try {
      await axios.delete(`http://localhost:8000/menu/${id}`);
      fetchComponents(); // recargar lista después de eliminar
    } catch (err) {
      console.error("Error eliminando componente:", err);
      alert("❌ Error al eliminar el componente");
    }
  };

  return (
    <div className="p-2">
      <h1 className="text-2xl font-bold mb-2 text-gray-800">List Components Page</h1>
      <p className="mb-6 text-gray-600">Here you can view and manage the menu components</p>

      <div className="overflow-x-auto bg-white rounded-lg shadow">
        <table className="min-w-full table-auto text-left">
          <thead className="bg-gray-100 text-gray-700">
            <tr>
              <th className="px-2 py-1 border">Menu Components</th>
              <th className="px-2 py-1 border">Description</th>
              <th className="px-2 py-1 border">Actions</th>
            </tr>
          </thead>

          <tbody>
            {components.map((comp) => (
              <tr key={comp._id} className="hover:bg-gray-50">
                <td className="px-2 py-1 border">{comp.name}</td>
                <td className="px-2 py-1 border">{comp.description}</td>
                <td className="px-2 py-1 border space-x-2">
                  <button
                    onClick={() => listProducts(comp._id)}
                    className="px-3 py-1 bg-blue-500 text-white rounded hover:bg-blue-600"
                  >
                    List Products
                  </button>

                  <button
                    onClick={() => createProducts(comp._id)}
                    className="px-3 py-1 bg-green-500 text-white rounded hover:bg-green-600"
                  >
                    Create Products
                  </button>

                  <button
                    onClick={() => deleteComponent(comp._id)}
                    className="px-3 py-1 bg-red-500 text-white rounded hover:bg-red-600"
                  >
                    Delete Component
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {error && <p className="mt-4 text-red-500">{error}</p>}
    </div>
  );
};






