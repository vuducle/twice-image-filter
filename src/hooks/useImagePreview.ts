import { useState, useEffect } from "react";
import TWICE from "../assets/twice_one.jpg";

export default function useImagePreview(image: File | null) {
  const [preview, setPreview] = useState(TWICE); // Set initial preview to TWICE image

  useEffect(() => {
    if (!image) return;

    const reader = new FileReader();

    reader.onloadend = () => {
      setPreview(reader.result as string);
    };

    reader.readAsDataURL(image);

    return () => {
      reader.abort();
    };
  }, [image]);

  return preview;
}
