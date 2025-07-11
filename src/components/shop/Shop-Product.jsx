import React, { useRef, useState } from "react";
import { useRouter } from "next/router";
import SingleCart from "../card/SingleCart";
import useSingleShopId from "@/hooks/api/Shop/useSingleShop";
import ProductBanner from "../banner/ProductBanner";
import Drawer from "react-modern-drawer";
import { CiFilter } from "@/icons";
import ProductCardSkeleton from "../loader/skeleton/Porduct/Product/SingleProductSkeleton";
import BannerSkeleton from "../loader/skeleton/Home/BannerSkeleton";
import { useLoadingObserver } from "@/utils/loadingObserver";
import Spinner from "../loader/Spinner";
import { FilterArea } from "../filter/FilterArea";
const ShopProduct = () => {
  const { query } = useRouter();
  const [price, setPrice] = useState({});
  const [checked, setChecked] = useState([]);
  const [categoryId, setCategoryId] = useState([]);
  const [brandId, setBrandId] = useState([]);
  const [page, setPage] = useState(1);
  const loadingRef = useRef();
  let params = {
    ...(checked.includes("In Stock") && { in_stock: true }),
    ...(checked.includes("On Sale") && { on_sale: true }),
    ...(categoryId?.length > 0 && { category_ids: categoryId }),
    page,
    per_page: 5,
  };
  if (price?.maxPrice) {
    params = {
      ...params,
      max_price: price?.maxPrice,
      min_price: price?.minPrice,
    };
  }
  // declare category
  const { data, loading, error, infinityLoading, hasMoreData } =
    useSingleShopId(query?.slug, params);
  const [open, setOpen] = useState(false);
  const handleOpenDrawer = () => {
    setOpen(!open);
  };
  useLoadingObserver({
    setPage,
    observerRef: loadingRef,
    loading: infinityLoading,
    hasMoreData,
  });
  return (
    <div className="flex gap-2 md:gap-3">
      <div className="md:w-[230px] lg:w-[259px] md:block hidden shrink-0">
        <FilterArea
          data={data}
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
        className="w-full sm:w-[280px]"
      >
        <div className="px-4 py-4">
          <FilterArea
            data={data}
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
      <div className=" w-full space-y-4 md:space-y-5 lg:space-y-6">
        <button
          className="md:hidden text-black bg-gray-100 rounded-full px-2 py-1 flex items-center gap-1"
          onClick={handleOpenDrawer}
        >
          <CiFilter /> Filter
        </button>
        {/* banner set for cateogory section  */}
        {!loading ? (
          <ProductBanner
            title={
              <span>
                Nearby Groceries Products
                <br />
                Tailored for you
              </span>
            }
            subTitle={
              <>
                We have prepared special discounts for you on grocery
                <br />
                products...
              </>
            }
            img="/products/1.png"
          />
        ) : (
          <BannerSkeleton />
        )}
        {/* show product here
         */}
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-2 lg:grid-cols-4 gap-3">
          {loading
            ? Array.from({ length: 10 }).map((_, index) => (
                <ProductCardSkeleton key={index} />
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
  );
};

export default ShopProduct;
