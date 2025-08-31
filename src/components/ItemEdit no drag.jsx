// src/components/ItemEdit.jsx
// Editar un item

import { useEffect, useState, useCallback } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import { useDropzone } from "react-dropzone";

export const ItemEdit = () => {
  const { itemId } = useParams();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    title: "",
    description: "",
    price: "",
    image_url: "",
    product_id: "",
  });
  const [file, setFile] = useState(null);

  // Cargar datos del item
  useEffect(() => {
    const fetchItem = async () => {
      try {
        const response = await axios.get(`http://localhost:8000/item/${itemId}`);
        const item = response.data;

        setFormData({
          title: item.title || "",
          description: item.description || "",
          price: item.price !== undefined ? item.price.toFixed(2) : "",
          image_url: item.image || "",
          product_id: item.product_id || "",
        });
      } catch (error) {
        console.error("Loading item error", error);
        alert("Can't load the item");
      }
    };

    fetchItem();
  }, [itemId]);

  // Dropzone para nueva imagen
  const onDrop = useCallback((acceptedFiles) => {
    if (acceptedFiles.length > 0) {
      setFile(acceptedFiles[0]);
      setFormData((prev) => ({ ...prev, image_url: "" })); // limpiamos la url para mostrar la nueva
    }
  }, []);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: { "image/*": [] },
  });

  // Cambio en los inputs
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  // Guardar cambios
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const data = new FormData();
      data.append("title", formData.title);
      data.append("description", formData.description);
      data.append("price", parseFloat(formData.price));
      data.append("product_id", formData.product_id);

      if (file) {
        data.append("file", file);
      }

      await axios.put(`http://localhost:8000/item/form/${itemId}`, data, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      alert("Item updated successfully");
      navigate(-1);
    } catch (error) {
      console.error("Item updating error", error);
      alert("Item updating error");
    }
  };

  return (
    <div className="p-6 max-w-xl mx-auto">
      <h1 className="text-xl font-bold mb-4 text-gray-800">
        Edit Item: <span className="text-blue-600">{formData.title || "Loading..."}</span>
      </h1>

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
        
        {/* Dropzone para imagen */}
        <div {...getRootProps()} className="border-2 border-dashed p-4 rounded text-center cursor-pointer">
          <input {...getInputProps()} />
          {isDragActive ? (
            <p>Drop an image here...</p>
          ) : file ? (
            <p>{file.name}</p>
          ) : formData.image_url ? (
            <img src={formData.image_url} alt="Item" className="max-h-40 mx-auto" />
          ) : (
            <p>Drag & drop an image here, or click to select</p>
          )}
        </div>

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
            ← Back
          </button>
        </div>
      </form>
    </div>
  );
};
