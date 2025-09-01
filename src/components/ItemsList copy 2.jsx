// src/components/ItemsList.jsx
// Lista los items de un producto

import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";

export const ItemsList = () => {
  const [items, setItems] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  const { productId, prodTitle } = useParams();
  const decodedTitle = decodeURIComponent(prodTitle);

  const fetchItems = async () => {
    setLoading(true);
    try {
      const res = await axios.get(`http://localhost:8000/item/product/${productId}`);
      if (Array.isArray(res.data)) {
        setItems(res.data);
      } else {
        setItems([]);
      }
    } catch (err) {
      setError("❌ Error loading items");
      setItems([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchItems();
  }, []);

  const editItem = (itemId) => {
    navigate(`/edit-item/${itemId}`);
  };

  const deleteItem = async (itemId) => {
    if (window.confirm("¿Are you sure that you want delete this item?")) {
      try {
        await axios.delete(`http://localhost:8000/item/${itemId}`);
        fetchItems();
      } catch (err) {
        alert("❌ Deleting item error");
      }
    }
  };

  // Drag & Drop handler
  const onDragStart = (e, item) => {
    e.dataTransfer.setData("text/plain", item._id); // puedes pasar el id o la URL
    e.dataTransfer.setData("image", item.image); // opcional
  };

  return (
    <div className="p-4 max-h-screen overflow-y-auto sticky top-0">
      <h1 className="text-center text-xl font-bold mb-4">
        Items of <span className="text-blue-600">{decodedTitle}</span>
      </h1>
      {error && <p className="text-red-500">{error}</p>}

      {loading ? (
        <div className="flex flex-col items-center justify-center py-10">
          <div className="w-12 h-12 border-4 border-blue-500 border-dashed rounded-full animate-spin"></div>
          <p className="mt-4 text-gray-500">Loading items...</p>
        </div>
      ) : (
        <div className="bg-white rounded shadow">
          <table className="min-w-full table-auto text-left">
            <thead className="bg-gray-100">
              <tr>
                <th className="px-4 py-2 border">Image</th>
                <th className="px-4 py-2 border">Item Title</th>
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
                      {item.image && (
                        <img
                          src={item.image}
                          alt={item.title}
                          draggable
                          onDragStart={(e) => onDragStart(e, item)}
                          className="w-16 h-16 object-cover rounded cursor-move"
                        />
                      )}
                    </td>
                    <td className="px-4 py-2 border">{item.title}</td>
                    <td className="px-4 py-2 border">{item.description}</td>
                    <td className="px-4 py-2 border">
                      {Number(item.price).toLocaleString("en-US", {
                        style: "currency",
                        currency: "USD",
                      })}
                    </td>
                    <td className="px-4 py-2 border space-x-2">
                      <button
                        onClick={() => editItem(item._id)}
                        className="px-3 py-1 bg-green-600 text-white rounded hover:bg-green-800"
                      >
                        Edit Item
                      </button>
                      <button
                        onClick={() => deleteItem(item._id)}
                        className="px-3 py-1 bg-red-500 text-white rounded hover:bg-red-600"
                      >
                        Delete Item
                      </button>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td
                    colSpan="5"
                    className="px-4 py-2 text-center text-gray-500"
                  >
                    No items found
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      )}

      <div className="px-3 py-3 flex justify-between items-center">
        <button
          type="button"
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
          onClick={() => navigate(-1)}
        >
          ← Back
        </button>
      </div>
    </div>
  );
};
