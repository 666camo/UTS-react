import { useEffect, useState } from "react";

export function useLocalStorage(key, fallback, validate = () => true) {
  const [initial] = useState(() => {
    try {
      const raw = localStorage.getItem(key);
      if (raw === null) return { value: fallback, error: "" };
      const value = JSON.parse(raw);
      if (!validate(value)) throw new Error("Invalid stored data");
      return { value, error: "" };
    } catch {
      return {
        value: fallback,
        error:
          "Data lokal tidak dapat dibaca. Data yang bermasalah dipulihkan ke nilai awal.",
      };
    }
  });
  const [value, setValue] = useState(initial.value);
  const [error, setError] = useState(initial.error);
  useEffect(() => {
    try {
      localStorage.setItem(key, JSON.stringify(value));
    } catch {
      setError(
        "Penyimpanan browser tidak tersedia atau penuh. Perubahan hanya tersimpan selama halaman terbuka.",
      );
    }
  }, [key, value]);
  return [value, setValue, error];
}
