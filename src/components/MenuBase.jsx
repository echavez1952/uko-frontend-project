// src/components/MenuBase.jsx
// Este componente es el elemento "/" del administrador
// Muestra todos los componentes del menu con botones de acciones para  
// Editar, remover y crear un componente principal del menu
// Si no ejecuta ninguna acción, va a la siguiente página MenuComponentList.jsx

import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

export const MenuBase = () => {
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

  const editComponent = (compId, compName) => {
    console.log("compId:", compId);
    console.log("compName:", compName);
    navigate(`/component-edit/${compId}/${compName}`);
  };

  const createComponent = (id) => {
    navigate("/component-create");
  };
    
  const deleteComponent = async (id) => {
    const confirmDelete = window.confirm(
      "⚠️ CUIDADO ¿Estás seguro de que quieres eliminar este componente y todos sus Productos e Items asociados?"
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
      <h1 className="text-center text-2xl font-bold mb-2 text-gray-800">MENU</h1>
      <p className="text-center mb-6 text-gray-600">Here you can view and manage the base menu components</p>

      <div className="overflow-x-auto bg-white rounded-lg shadow">
        <table className="min-w-full table-auto text-left">

          <thead className="bg-gray-200 text-gray-700">
            <tr>
              <th className="px-2 py-1 border">Menu Components</th>
              <th className="text-center px-2 py-1 border">Actions</th>
            </tr>
          </thead>

          <tbody>
            {components.map((comp) => (
              <tr key={comp._id} className="hover:bg-gray-50">
                <td className="px-2 py-1 text-xl font-semibold border" >{comp.name}</td>
                {/* <td className="px-2 py-1 border">{comp.description}</td> */}
                <td className="px-2 py-1 border space-x-2">
                  <button
                    onClick={() => editComponent(comp._id, comp.name)}
                    className="px-2 py-1 bg-green-700 text-white rounded hover:bg-green-900"

                  >
                    Edit Component
                  </button>

                  <button
                    onClick={() => deleteComponent(comp._id)}
                    className="px-2 py-1 bg-red-500 text-white rounded hover:bg-red-600"
                  >
                    Delete Component
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        
        <div className="px-3 py-3 flex justify-between items-center">
          <button
            type="button"
            // className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600"
            className="bg-blue-500 text-white hover:underline font-semibold hover:bg-blue-600"
            onClick={() => createComponent()}
          >
            Create new Component
          </button>

          <button
            type="button"
            className="bg-blue-500 text-blue-600 hover:underline font-semibold"
            onClick={() => navigate('/component-list')}
          >
            Next →
          </button>
        </div>


        {error && <p className="mt-4 text-red-500">{error}</p>}
      
      </div>

     
    </div>
  );
};