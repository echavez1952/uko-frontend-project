// src/components/ItemCreateForm.jsx
// Crear item que integra un  producto - enlace con product_id


import { useState, useRef } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";

export const ItemCreateForm = () => {
  const { productId, prodTitle } = useParams();
  const decodedTitle = decodeURIComponent(prodTitle);

  const [formData, setFormData] = useState({
    title: "",
    price: "",
    description: "",
  });

  const [file, setFile] = useState(null);
  const [preview, setPreview] = useState(null);
  const fileInputRef = useRef(null);
  const [message, setMessage] = useState("");
  const [dragOver, setDragOver] = useState(false);


  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];
    if (selectedFile) {
      setFile(selectedFile);
      setPreview(URL.createObjectURL(selectedFile));
    }
  };

  const handleDrop = (e) => {
    e.preventDefault();
    setDragOver(false);
    const droppedFile = e.dataTransfer.files[0];
    if (droppedFile) {
      setFile(droppedFile);
      setPreview(URL.createObjectURL(droppedFile));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const data = new FormData();
      data.append("title", formData.title);
      data.append("price", formData.price);
      data.append("description", formData.description);
      data.append("product_id", productId);
      if (file) {
        data.append("file", file);
      }

      const res = await axios.post(
        `http://localhost:8000/item/form/${productId}`, 
        data, 
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );

      setMessage("✅ Item created successfully");

      // Reset
      setFormData({
        title: "",
        price: "",
        description: "",
      });
      setFile(null);
      setPreview(null);
      if (fileInputRef.current) {
        fileInputRef.current.value = "";
      }

      console.log(res.data);
    } catch (err) {
      console.error(err);
      setMessage("❌ Error creating item");
    }
  };

  return (
    <div className="max-w-lg mx-auto bg-white p-6 rounded-lg shadow-md">

      <h1 className="text-center text-xl font-bold mb-4">Create Item for: <span style={{ color: 'blue' }}>{decodedTitle}</span>
      </h1>

      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          type="text"
          name="title"
          placeholder="Title"
          value={formData.title}
          onChange={handleChange}
          required
          className="w-full border border-gray-300 rounded p-2"
        />

        <input
          type="number"
          name="price"
          placeholder="Price"
          step="0.01"
          value={formData.price}
          onChange={handleChange}
          required
          className="w-full border border-gray-300 rounded p-2"
        />

        <textarea
          name="description"
          placeholder="Description"
          value={formData.description}
          onChange={handleChange}
          className="w-full border border-gray-300 rounded p-2"
        ></textarea>

        {/* Drag & Drop con vista previa */}
        <div
          onDragOver={(e) => {
            e.preventDefault();
            setDragOver(true);
          }}
          onDragLeave={() => setDragOver(false)}
          onDrop={handleDrop}
          className={`border-2 border-dashed rounded p-4 text-center cursor-pointer ${dragOver ? "border-blue-500 bg-blue-50" : "border-gray-300"
            }`}
          onClick={() => fileInputRef.current?.click()}
        >
          {preview ? (
            <div className="flex flex-col items-center space-y-2">
              <img
                src={preview}
                alt="Preview"
                className="max-h-40 object-contain rounded"
              />
              <p className="text-sm text-gray-700">{file?.name}</p>
            </div>
          ) : (
            <p className="text-gray-500">
              Drag & drop an image here or click to select
            </p>
          )}
          <input
            type="file"
            ref={fileInputRef}
            onChange={handleFileChange}
            className="hidden"
            accept="image/*"
          />
        </div>

        <div className="flex gap-4 space-x-4">
          <button
            type="button"
            className="flex-1 bg-gray-400 text-white py-2 rounded hover:bg-gray-500"
            onClick={() => navigate(-1)}
          >
            ← Back
          </button>
          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700"
          >
            Create Item
          </button>
        </div>
      </form >
      {message && <p className="m-4 text-l text-green-600">{message}</p>}
    </div>
  );
};
