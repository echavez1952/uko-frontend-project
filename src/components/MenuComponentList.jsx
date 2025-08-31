// src/components/MenuComponentList.jsx
// Lista los componentes del menu  
// Botones: listar los productos y crear productos nuevos de un componente específico

import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

export const MenuComponentList = () => {
  const [components, setComponents] = useState([]);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const fetchMenuComponents = async () => {
    try {
      const response = await axios.get("http://localhost:8000/menu");
      setComponents(response.data);
    } catch (err) {
      console.error(err);
      setError("❌ Components loading error.");
    }
  };

  useEffect(() => {
    fetchMenuComponents();
  }, []);

  return (
    <div className="p-2">
      <h1 className="text-center text-2xl font-bold mb-2 text-gray-800">MENU COMPONENTS</h1>
      <p className="text-center not-even:mb-6 text-gray-600">Here you can list and add the products of one specific component</p>

      <div className="overflow-x-auto bg-white rounded-lg shadow">
        <table className="min-w-full table-auto text-left">
          <thead className="bg-gray-100 text-gray-700">
            <tr>
              <th className="text-center px-2 py-1 border">Menu Components</th>
              <th className="text-center px-2 py-1 border">Actions</th>
            </tr>
          </thead>

          <tbody>
            {components.map((comp) => (
              <tr key={comp._id} className="hover:bg-gray-50">
                <td className="px-2 py-1 text-xl border">{comp.name}</td>
                <td className="px-2 py-1 border space-x-2">
                  <button
                    onClick={() => navigate(`/products-list/${comp._id}/${comp.name}`)}
                    // className="px-3 py-1 bg-blue-500 text-white rounded hover:bg-blue-600"
                    className="px-2 py-1 bg-green-700 text-white rounded hover:bg-green-900"
                  >
                    List Products
                  </button>

                  <button
                    onClick={() => navigate(`/product-create/${comp._id}/${comp.name}`)}
                    className="px-3 py-1 bg-cyan-500 text-white rounded hover:bg-cyan-700"
                  >
                    Add Products
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        {error && <p className="mt-4 text-red-500">{error}</p>}

        <div className="px-3 py-3 flex justify-between items-center">
          <button
            type="button"
            className="bg-blue-500 text-blue-600 hover:underline font-semibold"
            onClick={() => navigate('/component-base')}
          >
            ← Back
          </button>
        </div>

      </div>
      
    </div>
  );
};






