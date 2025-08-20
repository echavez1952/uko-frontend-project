// src/components/ProductEdit.jsx

import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";

export const ProductEdit = () => {
  const { itemId } = useParams();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    price: "",
    note: "",
    image_url: "", // URL de la imagen actual
    component_id: "",
  });
  const [file, setFile] = useState(null);

  useEffect(() => {
    const fetchItem = async () => {
      try {
        console.log("ProductEdit - itemId:", itemId);
        const response = await axios.get(`http://localhost:8000/product/${itemId}`);
        const item = response.data;
        setFormData({
          title: item.title || "",
          description: item.description || "",
          price: item.price || "",
          note: item.note || "",
          image: item.image || "",  // usar "image" porque así lo guarda el backend
          component_id: item.component_id || "",
        });
      } catch (error) {
        console.error("Error al cargar el producto", error);
        alert("No se pudo cargar el producto");
      } finally {
        setLoading(false);
      }
    };

    fetchItem();
  }, [itemId]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const data = new FormData();
    data.append("title", formData.title);
    data.append("description", formData.description);
    data.append("price", formData.price);
    data.append("note", formData.note);
    data.append("component_id", formData.component_id);
    if (file) {
      data.append("file", file);
    }

    try {
      await axios.put(`http://localhost:8000/product/${itemId}`, data, {
        headers: { "Content-Type": "multipart/form-data" }
      });
      alert("Producto actualizado correctamente");
      navigate(-1); // Regresa a la página anterior
    } catch (error) {
      console.error("Error al actualizar el producto", error);
      alert("Hubo un error al actualizar el producto");
    }
  };

  return (
    <div className="p-6 max-w-xl mx-auto">
      <h1 className="text-2xl font-bold mb-4 text-gray-800">
        Edit Product: <span className="text-blue-600">{formData.title || "Cargando..."}</span>
      </h1>
      
      {formData.image && (
        <div className="mb-4">
          <p className="text-sm text-gray-500">Imagen actual:</p>
          <img src={formData.image} alt="Producto" className="max-h-40 rounded border" />
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          name="title"
          value={formData.title}
          onChange={handleChange}
          placeholder="Title"
          className="w-full p-2 border rounded"
        />
        <textarea
          name="description"
          value={formData.description}
          onChange={handleChange}
          placeholder="Description"
          className="w-full p-2 border rounded"
        />
        <input
          name="price"
          type="number"
          step="0.01"
          value={formData.price}
          onChange={handleChange}
          placeholder="Price"
          className="w-full p-2 border rounded"
        />
        <input
          name="note"
          value={formData.note}
          onChange={handleChange}
          placeholder="Note"
          className="w-full p-2 border rounded"
        />

        {/* Campo para nueva imagen */}
        <input
          type="file"
          onChange={handleFileChange}
          className="w-full p-2 border rounded"
        />

        <div className="flex gap-4">
          <button
            type="submit"
            className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
          >
            Save Changes
          </button>
          <button
            type="button"
            onClick={() => navigate(-1)}
            className="bg-gray-400 text-white px-4 py-2 rounded hover:bg-gray-500"
          >
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
};
