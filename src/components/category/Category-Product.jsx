import React, { useEffect, useMemo, useRef, useState } from "react";
import PriceFilter from "../filter/PriceFilter";
import useCategoryId from "@/hooks/api/Category/useSingleCategory";
import { useRouter } from "next/router";
import PriceFilterSkeleton from "../loader/skeleton/Porduct/Category/PriceFilterSkeleton";
import ProductStatus from "../filter/Status";
import SingleCart from "../card/SingleCart";
import ProductStatusSkeleton from "../loader/skeleton/Porduct/Category/ProductStatusSkeleton";
import ProductCategory from "../filter/ProductCategory";
import ProductBrands from "../filter/ProductBrands";
import ProductBanner from "../banner/ProductBanner";
import { useLoadingObserver } from "@/utils/loadingObserver";
import ProductCardSkeleton from "../loader/skeleton/Porduct/Product/SingleProductSkeleton";

const CategoryProduct = () => {
  const { query } = useRouter();
  const [price, setPrice] = useState({});
  const [checked, setChecked] = useState([]);
  const [categoryId, setCategoryId] = useState([]);
  const [brandId, setBrandId] = useState([]);
  const [page, setPage] = useState(1);
  const loadingRef = useRef();
  const queryParams = useMemo(() => {
    let params = {
      ...(checked.includes("In Stock") && { in_stock: true }),
      ...(checked.includes("On Sale") && { on_sale: true }),
      ...(categoryId.length > 0 && { category_ids: categoryId }),
      per_page: 10,
      page,
    };
    if (price?.maxPrice) {
      params.max_price = price.maxPrice;
      params.min_price = price.minPrice;
    }
    return params;
  }, [checked, categoryId, price, page]);
  const { data, loading, infinityLoading, hasMoreData } = useCategoryId(
    query?.slug,
    queryParams
  );
  useLoadingObserver({
    setPage,
    observerRef: loadingRef,
    loading: infinityLoading,
    hasMoreData,
  });
  console.log(data);
  return (
    <div className="flex gap-4 md:gap-8 ">
      <div className="w-[259px] shrink-0">
        {loading ? (
          <>
            <PriceFilterSkeleton />
            <ProductStatusSkeleton />
          </>
        ) : (
          <div className="space-y-4   ">
            {" "}
            <PriceFilter
              max={Math.round(data?.max_price) || 100}
              min={0}
              setPrice={setPrice}
            />
            {data?.child_categories?.length > 0 && (
              <ProductCategory
                category={data?.child_categories}
                categoryId={categoryId}
                setCategoryId={setCategoryId}
              />
            )}
            {data?.brands?.length > 0 && (
              <ProductBrands
                brand={data?.brands}
                brandId={brandId}
                setBrandId={setBrandId}
              />
            )}
            <ProductStatus checked={checked} setChecked={setChecked} />
          </div>
        )}
      </div>
      <div className="flex-1 space-y-4 md:space-y-5 lg:space-y-6 ">
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

        {loading ? (
          <div className="grid grid-cols-1 xs:grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3">
            {Array.from({ length: 10 }).map((_, index) => (
              <ProductCardSkeleton key={index} />
            ))}
          </div>
        ) : (
          <div className="grid grid-cols-1 xs:grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3">
            {data?.products?.data?.map((product, idx) => (
              <SingleCart product={product} key={idx} />
            ))}
          </div>
        )}

        <div ref={loadingRef} className="  mt-4 flex justify-center">
          {!loading && infinityLoading && (
            <div className="grid grid-cols-1 xs:grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 w-full">
              {Array.from({ length: 10 }).map((_, index) => (
                <ProductCardSkeleton key={index} />
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default CategoryProduct;
