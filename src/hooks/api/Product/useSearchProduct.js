import { searchProduct } from "@/lib/api/product/product";
import { useState, useEffect } from "react";
function useSearchProduct(query = {}) {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  useEffect(() => {
    async function fetchSearchProduct() {
      setLoading(true);
      setError(null);
      try {
        const response = await searchProduct(query);
        setData(response?.data?.data?.data);
        setLoading(false);
      } catch (err) {
        setError(err?.message || "Unknown error");
        setLoading(false);
      } finally {
        setLoading(false);
      }
    }
    fetchSearchProduct();
  }, [JSON.stringify(query)]);

  return { data, loading, error };
}
export default useSearchProduct;
