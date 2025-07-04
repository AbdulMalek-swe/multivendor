import { getCategoryById } from "@/lib/api/category/category";
import { useEffect, useState } from "react";

function useCategoryId(id,query={}) {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!id) return;

    const fetchCategory = async () => {
      setLoading(true);
      setError(null);

      try {
        const response = await getCategoryById(id,query);
        console.log(response);
        setData(response?.data?.data); // depends on your API structure
      } catch (err) {
        setError(err?.message || "Unknown error");
      } finally {
        setLoading(false);
      }
    };

    fetchCategory();
  }, [id,JSON.stringify(query)]);

  return { data, loading, error };
}

export default useCategoryId;
