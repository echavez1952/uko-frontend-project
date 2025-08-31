// src/components/ComponentEdit.jsx
// Editar un componente

import { useState } from 'react';
import { useNavigate, useParams } from "react-router-dom";
import axios from 'axios';

export const ComponentEdit = () => {
  const navigate = useNavigate();
  const { compId, compName } = useParams();

  const [name, setName] = useState(compName || '');
  const [description, setDescription] = useState('');
  const [successMessage, setSuccessMessage] = useState('');
  const [errorMessage, setErrorMessage] = useState('');


  console.log(name);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.put(`http://localhost:8000/menu/${compId}`, {
        name
        // description
      });

      if (response.status === 200) {
        setSuccessMessage('✅ Component updated successfully.');
        setErrorMessage('');
      } else {
        setErrorMessage('❌ Component update error.');
        setSuccessMessage('');
      }
    } catch (err) {
      setErrorMessage('❌ Component update error.');
      setSuccessMessage('');
      console.error('Update error:', err);
    }
  };

  return (
    <div className="max-w-md mx-auto p-4 bg-white shadow rounded">
      <h2 className="text-xl text-center font-semibold mb-4">
        {/* Edit Component: <span className="text-blue-600">{compName}</span> */}
        Edit Component
      </h2>

      {/* Preview dinámico */}
      <div className="mb-4 p-3 bg-gray-100 rounded text-center">
        <p className="text-sm text-gray-600">Preview:</p>
        <h3 className="text-lg font-bold text-blue-700">{name || 'Component name will appear here'}</h3>
      </div>

      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          type="text"
          placeholder="Component name"
          className="w-full border p-2 rounded"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
        />
        
        <button
          type="submit"
          className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
        >
          Update
        </button>
      </form>

      {successMessage && <p className="text-green-600 mt-2">{successMessage}</p>}
      {errorMessage && <p className="text-red-600 mt-2">{errorMessage}</p>}

      {/* Botones de back y next */}
      <div className="px-3 py-3 flex justify-between items-center">
        <button
          type="button"
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
          onClick={() => navigate('/component-base')}
        >
          ← Back
        </button>

        <button
          type="button"
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
          onClick={() => navigate('/component-list')}
        >
          Next →
        </button>
      </div>
    </div>
  );
};
