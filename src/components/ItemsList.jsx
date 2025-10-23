// src/components/ItemsList.jsx
// Lista los items de un producto

import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";

export const ItemsList = () => {
  const [items, setItems] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);
  const [modalImage, setModalImage] = useState(null); // modal simple para imagen ampliada
  const navigate = useNavigate();

  const { productId, prodTitle } = useParams();
  const decodedTitle = decodeURIComponent(prodTitle || "");

  const fetchItems = async () => {
    setLoading(true);
    try {
      const res = await axios.get(`http://localhost:8000/item/product/${productId}`);
      if (Array.isArray(res.data)) {
        setItems(res.data);
      } else {
        setItems([]);
      }
      setError(null);
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

  const editItem = (itemId) => navigate(`/edit-item/${itemId}`);

  const deleteItem = async (itemId) => {
    if (window.confirm("¿Are you sure that you want delete this item?")) {
      try {
        await axios.delete(`http://localhost:8000/item/${itemId}`);
        fetchItems();
      } catch {
        alert("❌ Deleting item error");
      }
    }
  };

  // Drag & Drop handler 
  const onDragStart = (e, item) => {
    e.dataTransfer.setData("text/plain", item._id);
    if (item.image) e.dataTransfer.setData("image", item.image);
  };

  return (
    <div className="p-4">
      <h1 className="text-center text-xl font-bold mb-4">
        Items of <span className="text-2xl text-blue-600">{decodedTitle}</span>
      </h1>

      {error && <p className="text-red-500">{error}</p>}

      {loading ? (
        <div className="flex flex-col items-center justify-center py-10">
          <div className="w-12 h-12 border-4 border-blue-500 border-dashed rounded-full animate-spin" />
          <p className="mt-4 text-gray-500">Loading items...</p>
        </div>
      ) : (
        <div className="bg-white rounded shadow">
          {/* Tabla con layout fijo y anchos por columna */}
          <table className="min-w-full table-fixed text-left">
            <colgroup>
              <col className="w-28" />           {/* Image */}
              <col className="w-56" />           {/* Item Title */}
              <col className="w-[45%]" />        {/* Description (restringida) */}
              <col className="w-24" />           {/* Price */}
              <col className="w-[230px]" />      {/* Actions (suficiente para 2 botones) */}
            </colgroup>
            <thead className="bg-gray-200">
              <tr>
                <th className="px-4 py-2 border">Image</th>
                <th className="px-4 py-2 border align-middle">Item Title</th>
                <th className="px-4 py-2 border">Description</th>
                <th className="px-4 py-2 border">Price</th>
                <th className="px-4 py-2 border">Actions</th>
              </tr>
            </thead>
            <tbody>
              {items.length > 0 ? (
                items.map((item) => (
                  <tr key={item._id} className="hover:bg-gray-50">
                    {/* Imagen (click abre modal) */}
                    <td className="px-4 py-2 border align-top">
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
                    </td>

                    {/* Título */}
                    <td className="px-4 py-2 font-bold border align-middle">
                      {item.title}
                    </td>

                    {/* Description limitada a 2 líneas */}
                    <td className="px-4 py-2 border align-top">
                      <div className="overflow-hidden break-words [display:-webkit-box] [-webkit-line-clamp:3] [-webkit-box-orient:vertical]">
                        {item.description}
                      </div>
                    </td>

                    {/* Precio */}
                    <td className="px-4 py-2 border align-top">
                      {Number(item.price).toLocaleString("en-US", {
                        style: "currency",
                        currency: "USD",
                      })}
                    </td>

                    {/* Actions en fila, sin wrap */}
                    <td className="px-4 py9-2 border align-middle">
                      <div className="flex flex-nowrap items-center justify-center gap-2 whitespace-nowrap min-w-[220px]">
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
                      </div>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="5" className="px-4 py-6 text-center text-gray-500">
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

      {/* MODAL de imagen ampliada (click fuera para cerrar) */}
      {modalImage && (
        <div
          className="fixed inset-0 mt-16 bg-black/75 flex items-center justify-center z-50"
          onClick={() => setModalImage(null)}
        >
          <img
            src={modalImage}
            alt="Ampliada"
            className="max-h-[80vh] max-w-[90vw] rounded shadow-lg"
            onClick={(e) => e.stopPropagation()} // evita cerrar al hacer clic en la imagen
          />
        </div>
      )}
    </div>
  );
};
