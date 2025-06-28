import { category } from "@/lib/api/category/category";
import { useState, useEffect } from "react";

function useCategories() {
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  useEffect(() => {
    async function fetchCategories() {
      setLoading(true);
      setError(null);
      try {
        // call category api 
        const response = await category();
        setCategories(response?.data?.data);
        setLoading(false);
      } catch (err) {
        setError(err.message || "Unknown error");
        setLoading(false);
      } finally {
        setLoading(false);
      }
    }
    fetchCategories();
  }, []);

  return { categories, loading, error };
}

export default useCategories;
