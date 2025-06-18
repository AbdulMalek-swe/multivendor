import { publicRequest } from "@/lib/axios";
import { createContext, useState, useEffect } from "react";
export const ProductContext = createContext();
export const ProductProvider = ({children}) => {
  const [allProducts, setAllProducts] = useState([]);
  const [singleProduct, setSingleProduct] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");  
  const [searchTerm, setSearchTerm] = useState("");
  const [category, setCategory] = useState("");
  const [page, setPage] = useState(1);
  const [limit] = useState(5);  
  const [totalPages, setTotalPages] = useState(1);
  const fetchAllProducts = async () => {
    try {
      setLoading(true);
      let url = `todos `;
      if (searchTerm) url += `&search=${searchTerm}`;
      if (category) url += `&category=${category}`; 
      const res = await publicRequest(url);
      console.log(res,"malek");  
      setAllProducts(res?.data );
    //   setTotalPages(res);  
    } catch (err) {
      setError("All products fetch failed");
    } finally {
      setLoading(false);
    }
  };

  // Single Product
  const fetchProductById = async (id) => {
    try {
      setLoading(true);
      const res = await fetch(`/api/products/${id}`);
      const data = await res.json();
      setSingleProduct(data);
    } catch (err) {
      setError("Single product fetch failed");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAllProducts();
  }, [ ]);

  const value = {
    allProducts,
    singleProduct,
    loading,
    error,
    fetchAllProducts,
    fetchProductById,
    setSearchTerm,
    setCategory,
    setPage,
    page,
    totalPages,
  }; 
  return (
    <ProductContext.Provider value={value}>{children}</ProductContext.Provider>
  );
};
 
