import { useState, useRef, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";

export const ProductCreateForm = () => {
  const { componentId } = useParams();
  const [componentName, setComponentName] = useState("");
  const [loadingComponent, setLoadingComponent] = useState(true);

  const [formData, setFormData] = useState({
    title: "",
    price: "",
    description: "",
    note: "",
  });
  const [file, setFile] = useState(null);
  const [preview, setPreview] = useState(null);
  const fileInputRef = useRef(null);
  const [message, setMessage] = useState("");
  const [dragOver, setDragOver] = useState(false);

  // Obtener nombre del componente padre
  useEffect(() => {
    const fetchComponentName = async () => {
      try {
        const res = await axios.get(`http://localhost:8000/menu/${componentId}`);
        setComponentName(res.data.name);
      } catch (err) {
        console.error("Error fetching component name:", err);
        setComponentName("(Componente desconocido)");
      } finally {
        setLoadingComponent(false);
      }
    };
    fetchComponentName();
  }, [componentId]);

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
      data.append("note", formData.note);
      data.append("component_id", componentId);
      if (file) {
        data.append("file", file);
      }

      const res = await axios.post("http://localhost:8000/product/", data, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      setMessage("✅ Product created successfully");

      // Reset
      setFormData({
        title: "",
        price: "",
        description: "",
        note: "",
      });
      setFile(null);
      setPreview(null);
      if (fileInputRef.current) {
        fileInputRef.current.value = "";
      }

      console.log(res.data);
    } catch (err) {
      console.error(err);
      setMessage("❌ Error creating product");
    }
  };

  return (
    <div className="max-w-lg mx-auto bg-white p-6 rounded-lg shadow-md">
      <h2 className="text-l mb-4 flex items-center gap-2">
        Create Product for:
        {loadingComponent ? (
          <span className="animate-spin rounded-full h-5 w-5 border-t-2 border-blue-600"></span>
        ) : (
          <span className="text-blue-600 text-2xl font-bold ">{componentName}</span>
        )}
      </h2>

      {message && <p className="mb-4 text-sm text-green-600">{message}</p>}

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

        <textarea
          name="note"
          placeholder="Note"
          value={formData.note}
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

        <button
          type="submit"
          className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700"
        >
          Create Product
        </button>
      </form>
    </div>
  );
};
