// src/components/ProductsList.jsx

import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom"
import axios from "axios";
import { useParams } from "react-router-dom";

export const ProductsList = () => {
  const [products, setProducts] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  const { componentId } = useParams();

  const fetchProducts = async () => {
    setLoading(true); // empieza cargando
    try {
      const res = await axios.get(`http://localhost:8000/product/component/${componentId}`);
      console.log("Respuesta de backend:", res.data);

      if (Array.isArray(res.data)) {
        setProducts(res.data);
      } else {
        setProducts([]); // evita el error en el <div className="map">
      }
    } catch (err) {
      setError("❌ Error loading products");
      console.log(error);
      setProducts([]); // tambien evita el error
    } finally {
      setLoading(false);  // termina la carga
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  const editProduct = (productId) => {
    console.log("En ProductsList - parametro:", productId);
    navigate(`/edit-product/${productId}`);
  };

  const deleteProduct = async (productId) => {
    if (window.confirm("¿Are you sure that you want delete this product?")) {
      try {
        await axios.delete(`http://localhost:8000/product/${productId}`);
        fetchProducts();
      } catch (err) {
        console.error(err);
        alert("❌ Deleting product error");
      }
    }
  };

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">Products List</h1>
      {error && <p className="text-red-500">{error}</p>}

      {loading ? (
        <div className="flex flex-col items-center justify-center py-10">
          <div className="w-12 h-12 border-4 border-blue-500 border-dashed rounded-full animate-spin"></div>
          <p className="mt-4 text-gray-500">Loading products...</p>
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
              {products.length > 0 ? (
                products.map((p) => (
                  <tr key={p._id} className="hover:bg-gray-50">
                    <td className="px-4 py-2 border">
                      <img
                        src={p.image}
                        alt={p.title}
                        className="w-16 h-16 object-cover rounded"
                      />
                    </td>
                    <td className="px-4 py-2 border">{p.title}</td>
                    <td className="px-4 py-2 border">{p.description}</td>
                    {/* <td className="px-4 py-2 border">{Number(p.price).toFixed(2)}</td> */}
                    <td className="px-4 py-2 border">
                      {Number(p.price).toLocaleString("en-US", { style: "currency", currency: "USD" })}
                    </td>
                    
                    <td className="px-4 py-2 border space-x-2">
                      <button
                        onClick={() => editProduct(p._id)}
                        className="px-3 py-1 bg-blue-500 text-white rounded hover:bg-blue-600"
                      >
                        Edit
                      </button>
                      <button
                        onClick={() => deleteProduct(p._id)}
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
                    No products found
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