// src/components/ProductCreateForm.jsx
// Crear un producto que forma parte de un componente del menu

import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useParams } from "react-router-dom";
import axios from "axios";


export const ProductCreateForm = () => {
  const [title, setTitle] = useState('')
  const [successMessage, setSuccessMessage] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  // component_id y compName (vienen como parámetros en la URL)
  const { component_id, compName } = useParams();
  console.log("useParams:", { component_id, compName });

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    // para enviar los datos como multipart/form-data
    // const data = new FormData();
    // data.append("title", title);
    // data.append("component_id", component_id);

    try {

      // Para enviar los datos como JASON
      // 

      const response = await axios.post(
        "http://localhost:8000/product/",
        { title, component_id },
        { headers: { "Content-Type": "application/json" } }
      );

      if (response.status === 200 || response.status === 201) {
        setSuccessMessage("✅ Product created successfully");
        setErrorMessage('');
      }
    } catch (err) {
      console.error("Error en creación:", err.response?.data || err.message);
      setErrorMessage('❌ Product error creation.');
    }
  };

  return (

    <div className="max-w-lg mx-auto bg-white p-6 rounded-lg shadow-md">
      <h2 className="text-center text-xl font-bold mb-4">Add new Product for: <span style={{ color: 'blue' }}>{compName}</span>
      </h2>

      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          type="text"
          placeholder="Product title"
          className="w-full border p-2 rounded"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
        />

        <div className="flex space-x-4">
          <button
            type="button"
            className="flex-1 bg-gray-400 text-white py-2 rounded hover:bg-gray-500"
            onClick={() => navigate('/component-list')}
          >
            ← Back
          </button>
          
          <button
            type="submit"
            className="flex-1 bg-blue-600 text-white py-2 rounded hover:bg-blue-700"
          >
            Add Product
          </button>
        </div>

      </form>
      {successMessage && <p className="text-green-600 mt-2">{successMessage}</p>}
      {errorMessage && <p className="text-red-600 mt-2">{errorMessage}</p>}
    </div>
  );
};
