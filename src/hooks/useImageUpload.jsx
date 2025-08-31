// src/hooks/useImageUpload.js
import { useState, useEffect } from "react";

export const useImageUpload = () => {
  const [file, setFile] = useState(null);
  const [preview, setPreview] = useState(null);

  useEffect(() => {
    if (!file) {
      setPreview(null);
      return;
    }
    const objectUrl = URL.createObjectURL(file);
    setPreview(objectUrl);

    return () => URL.revokeObjectURL(objectUrl); // limpiar memoria
  }, [file]);

  return { file, setFile, preview };
};
