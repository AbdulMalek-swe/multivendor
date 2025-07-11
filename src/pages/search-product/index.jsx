import React, { useRef, useState } from "react";
import { useRouter } from "next/router";
import useSearchProduct from "@/hooks/api/Product/useSearchProduct";
import SingleCart from "@/components/card/SingleCart";
import ProductCardSkeleton from "@/components/loader/skeleton/Porduct/Product/SingleProductSkeleton";
import Drawer from "react-modern-drawer";
import { CiFilter } from "@/icons";
import PageLayout from "@/components/ui/PageLayout";
import { FilterArea } from "@/components/filter/FilterArea";
import { useLoadingObserver } from "@/utils/loadingObserver";
import Spinner from "@/components/loader/Spinner";
const SearchProduct = () => {
  const { query } = useRouter();
  const [price, setPrice] = useState({});
  const [checked, setChecked] = useState([]);
  const [categoryId, setCategoryId] = useState([]);
  const [brandId, setBrandId] = useState([]);
  const [page, setPage] = useState(1);
  const loadingRef = useRef();
  let params = {
    search: query?.search,
    ...(checked.includes("In Stock") && { in_stock: true }),
    ...(checked.includes("On Sale") && { on_sale: true }),
    ...(categoryId?.length > 0 && { category_ids: categoryId }),
    ...(brandId?.length > 0 && { brand_ids: brandId }),
    page,
    per_page: 10,
  };
  if (price?.maxPrice) {
    params = {
      ...params,
      max_price: price?.maxPrice,
      min_price: price?.minPrice,
    };
  }
  // declare category
  console.log(price, "-------->");
  const { data, loading, error, infinityLoading, hasMoreData } =
    useSearchProduct(params);
  console.log(data, "------>problem");
  const [open, setOpen] = useState(false);
  const handleOpenDrawer = () => {
    setOpen(!open);
  };
  // infinity loading
  useLoadingObserver({
    setPage,
    observerRef: loadingRef,
    loading: infinityLoading,
    hasMoreData,
  });
  const newData = {
    ...data,
    brands: data?.related_brands,
    child_categories: data?.related_categories,
  };
  return (
    <PageLayout>
      <div className="flex gap-4 md:gap-3 ">
        <div className="md:w-[230px] lg:w-[259px] md:block hidden shrink-0">
          <FilterArea
            data={newData}
            loading={loading}
            setPrice={setPrice}
            price={price}
            categoryId={categoryId}
            setCategoryId={setCategoryId}
            brandId={brandId}
            setBrandId={setBrandId}
            checked={checked}
            setChecked={setChecked}
          />
        </div>

        <Drawer
          open={open}
          onClose={handleOpenDrawer}
          direction="left"
          style={{
            width: "100%",
            maxWidth: "280px",
          }}
          className="w-full sm:w-[350px]"
        >
          <div className="px-4 py-4">
            <FilterArea
              data={newData}
              loading={loading}
              setPrice={setPrice}
              price={price}
              categoryId={categoryId}
              setCategoryId={setCategoryId}
              brandId={brandId}
              setBrandId={setBrandId}
              checked={checked}
              setChecked={setChecked}
            />
          </div>
        </Drawer>

        <div className="space-y-4 md:space-y-5 lg:space-y-6 ">
          <button
            className="md:hidden text-black bg-gray-100 rounded-full px-2 py-1 flex items-center gap-1"
            onClick={handleOpenDrawer}
          >
            <CiFilter /> Filter
          </button>
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3">
            {loading
              ? [...Array(10)].map((_, idx) => (
                  <ProductCardSkeleton key={idx} />
                ))
              : data?.products?.data?.map((product, idx) => (
                  <SingleCart product={product} key={idx} />
                ))}
          </div>
          <div ref={loadingRef} className="flex justify-center">
            {infinityLoading && (
              <button className="text-primary border border-primary rounded-full w-96 h-16 font-medium text-lg md:text-xl lg:text-2xl hover:bg-primary/10 flex items-center justify-center gap-1">
                Load More <Spinner />
              </button>
            )}
          </div>
        </div>
      </div>
    </PageLayout>
  );
};

export default SearchProduct;
