import React, { useEffect, useRef, useState } from "react";
import { Checkbox } from "../ui/Input";
import { FaPlus, FaMinus } from "@/icons";
const ProductBrands = ({ brand = [], brandId, setBrandId }) => {
  const handleChange = (item) => {
    setBrandId((prev) => {
      if (brandId.includes(item?.brand_id)) {
        const filter = brandId.filter((items) => items != item?.brand_id);
        return filter;
      } else {
        return [...prev, item?.brand_id];
      }
    });
  };
  return (
    <div className="shadow-sm space-y-2 md:space-y-3  pb-4 px-2 rounded-md   overflow-hidden   w-full">
      <h1 className="font-semibold text-sm text-[#030712] py-4">
        Filter by Brands
      </h1>
      <div>
        {/* brand render component  */}
        {brand.map((item, idx) => (
          <div className="  space-y-2">
            <div className="flex justify-between items-center space-y-2 md:space-y-3  ">
              <Checkbox
                checked={brandId?.includes(brand.brand_id)}
                onChange={() => handleChange(brand)}
                label={brand.brand_name}
                key={idx}
              />
              <span className="text-black text-xs">{"(1)"}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ProductBrands;
