 
import { address } from "@/lib/api/address/address";
import { useState, useEffect } from "react";

function useAddress() {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  useEffect(() => {
    async function fetchAddress() {
      setLoading(true);
      setError(null);
      try {
        // call category api 
        const response = await address();
        setData(response?.data?.data);
        setLoading(false);
      } catch (err) {
        setError(err.message || "Unknown error");
        setLoading(false);
      } finally {
        setLoading(false);
      }
    }
    fetchAddress();
  }, []);

  return { data, loading, error };
}

export default useAddress;
