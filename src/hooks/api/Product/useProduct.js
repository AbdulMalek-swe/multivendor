import { product } from "@/lib/api/product/product";
import { useState, useEffect } from "react";
function useProduct(query = {}) {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  useEffect(() => {
    // if (!query?.lat || !query?.lng) return;
    async function fetchShop() {
      setLoading(true);
      setError(null);
      try {
        // fetch shop api
        const response = await product(query);
        setData(response?.data?.data?.data);
        setLoading(false);
      } catch (err) {
        setError(err?.message || "Unknown error");
        setLoading(false);
      } finally {
        setLoading(false);
      }
    }
    fetchShop();
  }, [JSON.stringify(query)]);

  return { data, loading, error };
}
export default useProduct;
