// src/components/ItemsList.jsx
// Lista los items de un producto

import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom"
import axios from "axios";
import { useParams } from "react-router-dom";

export const ItemsList = () => {
  const [items, setItems] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  const { productId, prodTitle } = useParams();
  const decodedTitle = decodeURIComponent(prodTitle);

  
  const fetchItems = async () => {
    setLoading(true); // empieza cargando
    try {
      const res = await axios.get(`http://localhost:8000/item/product/${productId}`);
      console.log("Respuesta de backend:", res.data);

      if (Array.isArray(res.data)) {
        setItems(res.data);
      } else {
        setItems([]); // evita el error en el <div className="map">
      }
    } catch (err) {
      setError("❌ Error loading items");
      console.log(error);
      setItems([]); // tambien evita el error
    } finally {
      setLoading(false);  // termina la carga
    }
  };

  useEffect(() => {
    fetchItems();
  }, []);

  const editItem = (itemId) => {
    console.log("ItemsList parameter:", itemId);
    navigate(`/edit-item/${itemId}`);
  };

  const deleteItem = async (itemId) => {
    if (window.confirm("¿Are you sure that you want delete this item?")) {
      try {
        await axios.delete(`http://localhost:8000/item/${itemId}`);
        fetchItems();
      } catch (err) {
        console.error(err);
        alert("❌ Deleting item error");
      }
    }
  };

  return (
    <div className="p-4">
      <h1 className="text-center text-xl font-bold mb-4">Items of <span style={{ color: 'blue' }}>{decodedTitle}</span>
      </h1>
      {error && <p className="text-red-500">{error}</p>}

      {loading ? (
        <div className="flex flex-col items-center justify-center py-10">
          <div className="w-12 h-12 border-4 border-blue-500 border-dashed rounded-full animate-spin"></div>
          <p className="mt-4 text-gray-500">Loading items...</p>
        </div>
      ) : (
        <div className="overflow-x-auto bg-white rounded shadow">
          <table className="min-w-full table-auto text-left">
            <thead className="bg-gray-100">
              <tr>
                <th className="px-4 py-2 border">Image</th>
                <th className="px-4 py-2 border">Title</th>
                <th className="px-4 py-2 border">Description</th>
                <th className="px-4 py-2 border">Price</th>
                <th className="px-4 py-2 border">Actions</th>
              </tr>
            </thead>
            <tbody>
              {items.length > 0 ? (
                items.map((item) => (
                  <tr key={item._id} className="hover:bg-gray-50">
                    <td className="px-4 py-2 border">
                      {/* Imagen */}
                      {item.image && (
                        <img
                          src={item.image}
                          alt={item.title}
                          className="w-16 h-16 object-cover rounded"
                        />
                      )}
                    </td>
                    <td className="px-4 py-2 border">{item.title}</td>
                    <td className="px-4 py-2 border">{item.description}</td>
                    {/* <td className="px-4 py-2 border">{Number(p.price).toFixed(2)}</td> */}
                    <td className="px-4 py-2 border">
                      {Number(item.price).toLocaleString("en-US", { style: "currency", currency: "USD" })}
                    </td>
                    
                    <td className="px-4 py-2 border space-x-2">
                      <button
                        onClick={() => editItem(item._id)}
                        className="px-3 py-1 bg-blue-500 text-white rounded hover:bg-blue-600"
                      >
                        Edit
                      </button>
                      <button
                        onClick={() => deleteItem(item._id)}
                        className="px-3 py-1 bg-red-500 text-white rounded hover:bg-red-600"
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="4" className="px-4 py-2 text-center text-gray-500">
                    No items found
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}