import React, { useState } from "react";
import PriceFilter from "../filter/PriceFilter";
import useCategoryId from "@/hooks/api/Category/useSingleCategory";
import { useRouter } from "next/router";
import PriceFilterSkeleton from "../loader/skeleton/Porduct/Category/PriceFilterSkeleton";
import ProductStatus from "../filter/Status";
import SingleCart from "../card/SingleCart";
import ProductStatusSkeleton from "../loader/skeleton/Porduct/Category/ProductStatusSkeleton";

const CategoryProduct = () => {
  const { query } = useRouter();
  const [price, setPrice] = useState({});
  const [checked, setChecked] = useState([]);
  let params = {
    ...(checked.includes("In Stock") && { in_stock: true }),
    ...(checked.includes("On Sale") && { on_sale: true }),
  };
  if (price?.maxPrice) {
    params = {
      ...params,
      max_price: price?.maxPrice,
      min_price: price?.minPrice,
    };
  }
  const { data, loading } = useCategoryId(query?.slug, params);

  console.log(price);
  return (
    <div className="flex gap-4 md:gap-8 ">
      <div className="w-[259px]">
        {loading ? (
          <>
            <PriceFilterSkeleton />
            <ProductStatusSkeleton />
          </>
        ) : (
          <>
            {" "}
            <PriceFilter
              max={Math.round(data?.max_price) ?? 100}
              min={0}
              setPrice={setPrice}
            />
            <ProductStatus checked={checked} setChecked={setChecked} />
          </>
        )}
      </div>
      <div className=" ">
        {/* banner set for cateogory section  */}
        {/* show product here
         */}
        <div className="grid grid-cols-1 xs:grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3">
          {data?.products?.data?.map((product, idx) => (
            <SingleCart product={product} key={idx} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default CategoryProduct;
