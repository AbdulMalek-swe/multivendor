import React, { useState } from 'react';
import { useRouter } from 'next/router';
import PriceFilterSkeleton from '../loader/skeleton/Porduct/Category/PriceFilterSkeleton';
import ProductStatusSkeleton from '../loader/skeleton/Porduct/Category/ProductStatusSkeleton';
import PriceFilter from '../filter/PriceFilter';
import ProductCategory from '../filter/ProductCategory';
import ProductBrands from '../filter/ProductBrands';
import ProductStatus from '../filter/Status';
import SingleCart from '../card/SingleCart'; 
import useSingleShopId from '@/hooks/api/Shop/useSingleShop';
import ProductBanner from '../banner/ProductBanner';

const ShopProduct = () => {
  const { query } = useRouter();
  const [price, setPrice] = useState({});
  const [checked, setChecked] = useState([]);
  const [categoryId, setCategoryId] = useState([]);
  const [brandId, setBrandId] = useState([]);
  let params = {
    ...(checked.includes("In Stock") && { in_stock: true }),
    ...(checked.includes("On Sale") && { on_sale: true }),
    ...(categoryId?.length > 0 && { category_ids: categoryId }),
  };
  if (price?.maxPrice) {
    params = {
      ...params,
      max_price: price?.maxPrice,
      min_price: price?.minPrice,
    };
  }
  // declare category 
  const { data, loading,error } = useSingleShopId(query?.slug, params); 
  return (
    <div className="flex gap-4 md:gap-8 ">
      <div className="w-[259px]"> 
        {  loading ? (
          <>
            <PriceFilterSkeleton />
            <ProductStatusSkeleton />
          </>
        ) : (
          <div className='space-y-4'>
            {" "}
            <PriceFilter
              max={Math.round(data?.max_price) || 100}
              min={0}
              setPrice={setPrice}
            />
            <ProductCategory
              category={data?.categories}
              categoryId={categoryId}
              setCategoryId={setCategoryId}
            />
            <ProductBrands
              brand={data?.brands}
              brandId={brandId}
              setBrandId={setBrandId}
            />
            <ProductStatus checked={checked} setChecked={setChecked} />
          </div>
        )}
      </div>
      <div className="space-y-4 md:space-y-5 lg:space-y-6">
        {/* banner set for cateogory section  */}
           <ProductBanner
          title={
            <>
              Nearby Groceries Products
              <br />
              Tailored for you
            </>
          }
          subTitle={
            <>
              We have prepared special discounts for you on grocery
              <br />
              products...
            </>
          }
          img="/shop/1.png"
        />
        {/* show product here
         */}
        <div className="grid grid-cols-1 xs:grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3">
          {data?.products?.map((product, idx) => (
            <SingleCart product={product} key={idx} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default ShopProduct;