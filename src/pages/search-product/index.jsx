import React, { useState } from "react";
import { useRouter } from "next/router";
import useSearchProduct from "@/hooks/api/Product/useSearchProduct";
import PriceFilterSkeleton from "@/components/loader/skeleton/Porduct/Category/PriceFilterSkeleton";
import ProductStatusSkeleton from "@/components/loader/skeleton/Porduct/Category/ProductStatusSkeleton";
import PriceFilter from "@/components/filter/PriceFilter";
import ProductCategory from "@/components/filter/ProductCategory";
import ProductBrands from "@/components/filter/ProductBrands";
import ProductStatus from "@/components/filter/Status";
import SingleCart from "@/components/card/SingleCart";
import ProductCardSkeleton from "@/components/loader/skeleton/Porduct/Product/SingleProductSkeleton";
import Drawer from "react-modern-drawer";
import { CiFilter } from "@/icons";
import PageLayout from "@/components/ui/PageLayout";
const SearchProduct = () => {
  const { query } = useRouter();
  const [price, setPrice] = useState({});
  const [checked, setChecked] = useState([]);
  const [categoryId, setCategoryId] = useState([]);
  const [brandId, setBrandId] = useState([]);
  let params = {
    search: query?.search,
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
  console.log(price, "-------->");
  const { data, loading, error } = useSearchProduct(params);
  const [open, setOpen] = useState(false);
  const handleOpenDrawer = () => {
    setOpen(!open);
  };
  return (
    <PageLayout>
      <div className="flex gap-4 md:gap-3 ">
        <div className="w-[259px] md:block hidden shrink-0">
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
            maxWidth: "450px",
          }}
          className="w-full sm:w-[350px]"
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
        </div>
      </div>
    </PageLayout>
  );
};

export default SearchProduct;

const FilterArea = ({
  loading,
  data,
  setPrice,
  price,
  categoryId,
  setCategoryId,
  brandId,
  setBrandId,
  checked,
  setChecked,
}) => {
  return (
    <div>
      {loading ? (
        <>
          <PriceFilterSkeleton />
          <ProductStatusSkeleton />
          <ProductStatusSkeleton />
        </>
      ) : (
        <div className="space-y-4">
          {" "}
          <PriceFilter
            max={Math.round(data?.max_price) || 100}
            min={0}
            setPrice={setPrice}
            price={price}
          />
          {data?.categories && (
            <ProductCategory
              category={data?.categories}
              categoryId={categoryId}
              setCategoryId={setCategoryId}
            />
          )}
          {data?.brands && (
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
  );
};
