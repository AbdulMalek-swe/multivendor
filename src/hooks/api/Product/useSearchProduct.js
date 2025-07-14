import { searchProduct } from "@/lib/api/product/product";
import { useState, useEffect } from "react";
function useSearchProduct(query = {}) {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [infinityLoading, setInfinityLoading] = useState(false);
  const [hasMoreData, setHasMoreData] = useState(true);
  useEffect(() => {
    async function fetchSearchProduct() {
      setError(null);
      if (!query?.search) return;
      if (query.page === 1) {
        setLoading(true);
      } else {
        setInfinityLoading(true);
      }
      console.log(query,"----->is back");
      try {
        const response = await searchProduct(query);
       const products = response?.data?.data?.products?.data;
       
        if (products.length === 0) {
          setHasMoreData(false);
        }
        if (query?.page === 1) {
          console.log( response?.data?.data,"weheer not come");
          setData(response?.data?.data);
        } else {
          const value = data?.products?.data;
          setData({
           related_brands: response?.data?.data?.related_brands,
            related_categories: response?.data?.data?.related_categories,
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
        setLoading(false);
      } finally {
        setLoading(false);
         setInfinityLoading(false);
      }
    }
    fetchSearchProduct();
  }, [JSON.stringify(query)]);

  return { data, loading, error,infinityLoading,hasMoreData };
}
export default useSearchProduct;
