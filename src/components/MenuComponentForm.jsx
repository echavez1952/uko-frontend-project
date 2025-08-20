// src/components/MenuComponentForm.jsx
// Crea un componente del menu

import { useState } from 'react';
import axios from 'axios';

export const MenuComponentForm = () => {
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [successMessage, setSuccessMessage] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post('http://localhost:8000/menu', {
        name,
        description
      });

      if (response.status === 200 || response.status === 201) {
        setSuccessMessage('Component created successfully.');
        setErrorMessage('');
        setName('');
        setDescription('');
      } else {
        setErrorMessage('Component error creation.');
        setSuccessMessage('');
      }
    } catch (err) {
      setErrorMessage('Component error creation.');
      setSuccessMessage('');
      console.error('Error:', err);
    }
  };

  return (
    <div className="max-w-md mx-auto p-4 bg-white shadow rounded">
      <h2 className="text-xl font-semibold mb-4">Menu Component Creation</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          type="text"
          placeholder="Component name"
          className="w-full border p-2 rounded"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
        />
        <textarea
          placeholder="Description (optional)"
          className="w-full border p-2 rounded"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />
        <button
          type="submit"
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
        >
          Create
        </button>
      </form>
      {successMessage && <p className="text-green-600 mt-2">{successMessage}</p>}
      {errorMessage && <p className="text-red-600 mt-2">{errorMessage}</p>}
    </div>
  );
};
