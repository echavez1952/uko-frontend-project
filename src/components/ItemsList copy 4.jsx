// src/components/ItemsList.jsx
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";

export const ItemsList = () => {
  const [items, setItems] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);
  const [modalImage, setModalImage] = useState(null);
  const navigate = useNavigate();

  const { productId, prodTitle } = useParams();
  const decodedTitle = decodeURIComponent(prodTitle || "");

  const fetchItems = async () => {
    setLoading(true);
    try {
      const res = await axios.get(`http://localhost:8000/item/product/${productId}`);
      setItems(Array.isArray(res.data) ? res.data : []);
      setError(null);
    } catch {
      setError("❌ Error loading items");
      setItems([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchItems();
    // eslint-disable-next-line react-hooks/exhaustive-deps
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

  const onDragStart = (e, item) => {
    e.dataTransfer.setData("text/plain", item._id);
    e.dataTransfer.setData("image", item.image);
  };

  return (
    <div className="p-4 max-w-screen-xl mx-auto">
      <h1 className="text-center text-xl font-bold mb-4">
        Items of <span className="text-blue-600">{decodedTitle}</span>
      </h1>

      {error && <p className="text-red-500">{error}</p>}

      {loading ? (
        <div className="flex flex-col items-center justify-center py-10">
          <div className="w-12 h-12 border-4 border-blue-500 border-dashed rounded-full animate-spin" />
          <p className="mt-4 text-gray-500">Loading items...</p>
        </div>
      ) : (
        <div className="bg-white rounded shadow">
          {/* evita colapsar columnas en contenedores angostos */}
          <div className="overflow-x-auto">
            {/* table-auto para que el navegador calcule proporciones mejor */}
            <table className="w-full table-auto text-left min-w-[900px]">
              <colgroup>
                <col className="w-24" />          {/* Image fija */}
                <col />                            {/* Title flexible */}
                <col className="min-w-[320px]" />  {/* Description con ancho mínimo */}
                <col className="w-28" />           {/* Price fija */}
                <col className="w-[230px]" />      {/* Actions fija */}
              </colgroup>
              <thead className="bg-gray-100">
                <tr>
                  <th className="px-4 py-2 border">Image</th>
                  <th className="px-4 py-2 border align-middle text-center">Item Title</th>
                  <th className="px-4 py-2 border">Description</th>
                  <th className="px-4 py-2 border align-middle text-center">Price</th>
                  <th className="px-4 py-2 border align-middle text-center">Actions</th>
                </tr>
              </thead>
              <tbody>
                {items.length > 0 ? (
                  items.map((item) => (
                    <tr key={item._id} className="hover:bg-gray-50">
                      {/* Imagen (click abre modal) */}
                      <td className="px-4 py-2 border align-middle">
                        {item.image && (
                          <img
                            src={item.image}
                            alt={item.title}
                            draggable
                            onDragStart={(e) => onDragStart(e, item)}
                            onClick={() => setModalImage(item.image)}
                            className="w-16 h-16 object-cover rounded cursor-zoom-in"
                            title="Ampliar imagen"
                          />
                        )}
                      </td>

                      {/* Título: una sola línea, sin wrap; si no alcanza, elipsis */}
                      <td className="px-4 py-2 border align-middle">
                        <div
                          className="whitespace-nowrap truncate text-center"
                          title={item.title}
                        >
                          {item.title}
                        </div>
                      </td>

                      {/* Descripción: clamp 4 líneas (cambia a 3 si quieres) */}
                      <td className="px-4 py-2 border align-top">
                        <div className="overflow-hidden break-words [display:-webkit-box] [-webkit-line-clamp:4] [-webkit-box-orient:vertical]">
                          {item.description}
                        </div>
                      </td>

                      {/* Precio */}
                      <td className="px-4 py-2 border align-middle text-center">
                        {Number(item.price).toLocaleString("en-US", {
                          style: "currency",
                          currency: "USD",
                        })}
                      </td>

                      {/* Acciones: centradas vertical y horizontalmente */}
                      <td className="px-4 py-2 border align-middle">
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

      {/* Modal imagen (clic fuera para cerrar) */}
      {modalImage && (
        <div
          className="fixed inset-0 bg-black/70 flex items-center justify-center z-50"
          onClick={() => setModalImage(null)}
          role="dialog"
          aria-modal="true"
        >
          <img
            src={modalImage}
            alt="Ampliada"
            className="max-h-[80vh] max-w-[90vw] rounded shadow-lg"
            onClick={(e) => e.stopPropagation()}
          />
        </div>
      )}
    </div>
  );
};
