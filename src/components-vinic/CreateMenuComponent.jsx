import { useState } from "react";
import axios from "axios";

export const CreateMenuComponent = () => {
  const [form, setForm] = useState({ name: "", description: "" });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post("http://localhost:8000/menu/components", form);
      setForm({ name: "", description: "" });
      // onCreated(); // refresh the list
    } catch (err) {
      console.error("Error creating component:", err);
    }
  };

  return (
    <form onSubmit={(e)=>handleSubmit(e)} className="bg-white shadow-md p-4 rounded mb-4">
      <h2 className="text-xl font-bold mb-2">Crear Componente del Menú</h2>
      <input
        type="text"
        placeholder="Nombre"
        value={form.name}
        onChange={(e) => setForm({ ...form, name: e.target.value })}
        className="border p-2 mb-2 w-full rounded"
        required
      />
      <textarea
        placeholder="Descripción"
        value={form.description}
        onChange={(e) => setForm({ ...form, description: e.target.value })}
        className="border p-2 mb-2 w-full rounded"
      />
      <button className="bg-blue-600 text-white px-4 py-2 rounded">Crear</button>
    </form>
  );
}

