import PriceFilterSkeleton from "../loader/skeleton/Porduct/Category/PriceFilterSkeleton";
import ProductStatusSkeleton from "../loader/skeleton/Porduct/Category/ProductStatusSkeleton";
import PriceFilter from "./PriceFilter";
import ProductBrands from "./ProductBrands";
import ProductCategory from "./ProductCategory";
import ProductStatus from "./Status"; 
export const FilterArea = ({
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
          {data?.categories?.length > 0 && (
            <ProductCategory
              category={data?.categories}
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
  );
};
