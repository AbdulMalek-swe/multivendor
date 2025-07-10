 
import { order } from "@/lib/api/order/order";
import { useState, useEffect } from "react";

function useOrder() {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  useEffect(() => {
    async function fetchOrder() {
      setLoading(true);
      setError(null);
      try {
        // call category api 
        const response = await order(); 
        setData(response?.data?.data);
        setLoading(false);
      } catch (err) {
        setError(err.message || "Unknown error");
        setLoading(false);
      } finally {
        setLoading(false);
      }
    }
    fetchOrder();
  }, []);

  return { data, loading, error };
}

export default useOrder;
