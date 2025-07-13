import { getSingleShopById } from "@/lib/api/shop/shop";
import { useEffect, useState } from "react";

function useSingleShopId(id, query = {}) {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [infinityLoading, setInfinityLoading] = useState(false);
  const [hasMoreData, setHasMoreData] = useState(true);
  useEffect(() => {
    if (!id) return;
    const fetchSingleShop = async () => {
      setError(null);
      if (query.page === 1) {
        setLoading(true);
      } else {
        setInfinityLoading(true);
      }
      try {
        const response = await getSingleShopById(id, query);
        // depends on your API structure
        const products = response?.data?.data?.products?.data;
        if (products.length === 0) {
          setHasMoreData(false);
        }
        if (query?.page === 1) {
          setData(response?.data?.data);
        } else {
          const value = data?.products?.data;
          setData({
            brands: response?.data?.data?.brands,
            categories: response?.data?.data?.categories,
            max_price: response?.data?.data?.max_price,
            products: {
              ...data?.products,
              data: [...value, ...products],
            },
          });
        }
        setLoading(false);
      } catch (err) {
        setError(err?.message || "Unknown error");
      } finally {
        setLoading(false);
        setInfinityLoading(false);
      }
    };

    fetchSingleShop();
  }, [id, JSON.stringify(query)]);

  return { data, loading, error ,hasMoreData,infinityLoading};
}

export default useSingleShopId;
