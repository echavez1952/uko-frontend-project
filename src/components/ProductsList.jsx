// src/components/ProductsList.jsx
// Listar los productos que integran un componente  
// Botones: listar y crear items de un producto específico

import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { useParams } from "react-router-dom";

export const ProductsList = () => {
  const [products, setProducts] = useState([]);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  // component_id y compName (vienen como parámetros en la URL)
  const { component_id, compName } = useParams();
  console.log("useParams:", { component_id, compName });
  

  const fetchProducts = async () => {
    try {
      const response = await axios.get(`http://localhost:8000/product/component/${component_id}`);
      setProducts(response.data);
    } catch (err) {
      console.error(err);
      setError("❌ Products loading error.");
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  const listItems = (id, name) => {
    navigate(`/list-items/${id}/${encodeURIComponent(name)}`);
  };

  const createItems = (id, name) => {
    navigate(`/create-item/${id}/${encodeURIComponent(name)}`);
  };


  return (
    <div className="p-2">
      <h1 className="text-center text-2xl font-bold mb-2 text-gray-800">Products of <span style={{ color: 'blue' }}>{compName}</span>
      </h1>
      <p className="text-center not-even:mb-6 text-gray-600">Here you can list and add Items of one specific product </p>

      <div className="overflow-x-auto bg-white rounded-lg shadow">
        <table className="min-w-full table-auto text-left">
          <thead className="bg-gray-100 text-gray-700">
            <tr>
              <th className="text-center px-2 py-1 border">Products</th>
              <th className="text-center px-2 py-1 border">Actions</th>
            </tr>
          </thead>

          <tbody>
            {products.map((prod) => (
              <tr key={prod._id} className="hover:bg-gray-50">
                <td className="px-2 py-1 text-xl font-bold border">{prod.title}</td>
                <td className="px-2 py-1 border space-x-2">
                  <button
                    onClick={() => listItems(prod._id, prod.title)}
                    className="px-2 py-1 bg-green-700 text-white rounded hover:bg-green-900"
                  >
                    List Items
                  </button>

                  <button
                    onClick={() => createItems(prod._id, prod.title)}
                    className="px-2 py-1 bg-cyan-500 text-white rounded hover:bg-cyan-700"
                  >
                    Add Items
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {error && <p className="mt-4 text-red-500">{error}</p>}
    
      <div className="px-3 py-3 flex justify-between items-center">
        <button
          type="button"
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
          onClick={() => navigate('/component-list')}
        >
          ← Back
        </button>
      </div>
    
    </div>
  );
};






