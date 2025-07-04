 
import { getSingleShopById } from "@/lib/api/shop/shop";
import { useEffect, useState } from "react";

function useSingleShopId(id,query={}) {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!id) return;

    const fetchSingleShop = async () => {
      setLoading(true);
      setError(null);

      try {
        const response = await getSingleShopById(id,query); 
        setData(response?.data?.data); // depends on your API structure
      } catch (err) {
        setError(err?.message || "Unknown error");
      } finally {
        setLoading(false);
      }
    };

    fetchSingleShop();
  }, [id,JSON.stringify(query)]);

  return { data, loading, error };
}

export default useSingleShopId;
