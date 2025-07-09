import { product } from "@/lib/api/product/product";
import { useState, useEffect } from "react";

function useProduct(query = {}) {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [infinityLoading, setInfinityLoading] = useState(false);
  const [hasMoreData, setHasMoreData] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!query?.lat || !query?.lng || !query?.page) return; 
    async function fetchProduct() {
      if (query.page === 1) {
        setLoading(true);
      } else {
        setInfinityLoading(true);
      } 
      setError(null);
      try {
        const response = await product(query);
        const result = response?.data?.data?.data || []; 
        if (Array.isArray(result)) {
          if(result?.length===0){
            setHasMoreData(false);
          }
          setData((prev) => (query.page === 1 ? result : [...prev, ...result]));
        }
      } catch (err) {
        setError(err?.message || "Unknown error");
        setHasMoreData(false);
      } finally {
        setLoading(false);
        setInfinityLoading(false);
        // setHasMoreData(false);
      }
    }

    fetchProduct();
  }, [JSON?.stringify(query)]);

  return { data, loading, error, hasMoreData, infinityLoading };
}

export default useProduct;
