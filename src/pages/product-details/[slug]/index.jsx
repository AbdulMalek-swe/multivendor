import React, { useEffect, useState } from "react";
import Button from "@/components/ui/Button";
import useProductId from "@/hooks/api/Product/useSinglePorduct";
import Image from "next/image";
import { useRouter } from "next/router";
import { AiOutlineShopping, MdOutlinePayment } from "@/icons";
import { offerPricePercent } from "@/utils/priceOfferPercent";
import SkeletonProductDetails from "@/components/loader/skeleton/Porduct/Product/SkeletonProductDetails";
import CustomError from "@/components/error/CustomError";
import { formatPrice } from "@/utils/formatPrice";
import { handlePurchaseProduct } from "@/utils/productPurchase";
import { useCart } from "@/hooks/cart/useCart";
import { notifyError } from "@/utils/toast";
import PageLayout from "@/components/ui/PageLayout";
import { publicRequest } from "@/lib/axios";
import { responseHandler } from "@/utils/helpers";
import SingleCart from "@/components/card/SingleCart";

const ProductDetails = () => {
  const { addItem, items } = useCart();
  const router = useRouter();
  const {
    data: productItem,
    loading,
    error,
  } = useProductId(router?.query?.slug);
  const product = productItem?.product;
  const [quantity, setQuantity] = useState(1);
  const [variantId, setVariantId] = useState({
    color_id: null,
    attribute_id: null,
  });
  // purchasae product handler 
  const handlePurchase = (vl) => {
    let color_id, attribute_id;
    if (!productItem?.colors?.length) {
      color_id = null;
    } else {
      color_id = variantId?.color_id
        ? variantId?.color_id
        : productItem?.colors[0]?.id;
    }
    if (!productItem?.attributes?.length) {
      attribute_id = null;
    } else {
      attribute_id = variantId?.attribute_id
        ? variantId?.attribute_id
        : productItem?.attributes[0]?.id;
    }
    if (vl === "add") {
      addItem(
        handlePurchaseProduct({ ...product, quantity, color_id, attribute_id })
      );
    } else {
      localStorage.setItem(
        "order_items",
        JSON.stringify([
          handlePurchaseProduct({
            ...product,
            quantity,
            color_id,
            attribute_id,
          }),
        ])
      );
      router?.push(`/checkout?buy_now=${product?.slug}`);
    }
  };
  // fetch releted product  
  const [reletedProduct,setReletedProduct] = useState([])
  useEffect(()=>{
    const fetchReletedProduct  = async()=>{
        try {
          console.log(productItem,"----");
          const response = await publicRequest.get(`/user/related-products?category_id=${productItem?.product?.category_id}&vendor_id=${productItem?.product?.vendor_id}`)
          console.log(response);
          if(responseHandler(response)){
             setReletedProduct(response?.data?.data)
          }
        } catch (error) {
          
        }
    }
    fetchReletedProduct()
    },[productItem])
    console.log(reletedProduct,"----------->>>>>>");
  if (loading) return <SkeletonProductDetails />;
  if (error) return <CustomError />;
  return (
    <PageLayout>
      <div className="bg-[#DC2626] text-white text-xs  flex items-center justify-center py-2 px-3 rounded-full w-14 mb-2 text-[10px] font-extrabold">
        {offerPricePercent(product?.reguler_price, product?.offer_price)}%
      </div>
      <div className=" bg-gradient-to-r from-[#D4FC79] to-[#96E6A1] text-[#166534] text-xs text-[10px] font-extrabold flex py-[5px] px-[6px] rounded-full w-20  gap-1 items-center mb-2">
        <Image
          src="/products/1.png"
          alt="loading"
          className="w-3.5 h-3.5  "
          width={14}
          height={14}
        />
        ORGANIC
      </div>
      {/* product details call here  */}
      <div className="flex flex-col md:flex-row justify-between md:gap-10">
        <div className="flex justify-center w-full md:w-1/2 aspect-[247/187]">
          <Image
            src={`${process?.env.NEXT_PUBLIC_API_SERVER}${product?.thumbnail}`}
            alt="Organic Banana"
            className="w-full rounded-xl"
            width={1000}
            height={1000}
            priority
          />
        </div>
        <div className="space-y-2 md:space-y-3 lg:space-y-5 w-full md:w-1/2">
          <h1 className="text-xl md:text-2xl lg:text-4xl font-bold text-[#030712]">
            Marketside Fresh Organic Bananas, Bunch
          </h1>
          <p className="text-sm border-b pb-2  flex gap-2 items-center">
            <span className="font-thin text-[#6B7280]">|</span>
            <strong className="text-[#6B7280] ">Vendor:</strong>
            <span className="text-[13px] font-medium text-[#030712] ">
              {product?.vendor?.company_name}
            </span>
            <span className="font-thin text-[#6B7280]">|</span>
            <strong className="text-[13px] font-medium text-[#6B7280]">
              SKU:
            </strong>
            <span className="text-[#030712]">{product?.sku}</span>
          </p>
          <p className="text-sm text-[#4B5563] leading-relaxed line-clamp-3 font-normal">
            {product?.short_description ||
              "Vivamus adipiscing nisl ut dolor dignissim semper. Nulla luctus malesuada tincidunt. Class aptent tacitisociosqu ad litora torquent Vivamus adipiscing nisl ut dolor dignissim semper."}
          </p>
          <div className="flex items-center gap-4">
            <span className="text-primary text-2xl font-bold">
              {formatPrice(product?.reguler_price, "BDT")}{" "}
            </span>
            <span className="text-[#111827] line-through text-xl font-medium">
              {formatPrice(product?.offer_price, "BDT")}
            </span>
          </div>
          <div className="flex gap-1 sm:gap-2 md:gap-3">
            <div className="flex items-center justify-between px-5 bg-[#FFFFFF] border border-[#D1D5DB] w-full  rounded-md  text-base sm:text-lg md:text-xl lg:text-2xl  text-[#020617]">
              <button
                className="rounded-full shadow-md border border-gray-300 w-8 h-8 flex items-center justify-center text-lg font-semibold text-gray-700 hover:bg-gray-100 transition"
                onClick={() =>
                  setQuantity((prev) => {
                    return prev === 1 ? 1 : prev - 1;
                  })
                }
              >
                -
              </button>
              <span className="text-lg font-semibold px-3">{quantity}</span>
              <button
                className="rounded-full shadow-md border border-gray-300 w-8 h-8 flex items-center justify-center text-lg font-semibold text-gray-700 hover:bg-gray-100 transition"
                onClick={() => {
                  if (product?.stock <= quantity) {
                    return notifyError("Quantity is over the stock");
                  }
                  setQuantity(quantity + 1);
                }}
              >
                +
              </button>
            </div>
            <Button
              className="text-white font-semibold px-5 py-2 rounded text-nowrap "
              bgColor="bg-[#16A34A]"
              rounded="rounded-md"
              textSize="text-sm"
              onClick={() => handlePurchase("add")}
            >
              <AiOutlineShopping />
              <span> Add to cart</span>
            </Button>
            <Button
              className="text-white font-semibold px-5 py-2 rounded text-nowrap "
              bgColor="bg-[#212529]"
              rounded="rounded-md"
              textSize="text-sm"
              onClick={() => handlePurchase("buy")}
            >
              <AiOutlineShopping />
              <span>Buy Now</span>
            </Button>
          </div>
          <div className="text-sm text-gray-600 space-y-2 ">
            <div className="flex gap-1">
              <strong>Unit:</strong>{" "}
              <div className="flex">
                {productItem?.attributes?.map((att, idx) => (
                  <span
                    className="w-full border rounded-md px-2 border-[#D1D5DB] cursor-pointer"
                    key={idx}
                    onClick={() =>
                      setVariantId({ ...variantId, attribute_id: att?.id })
                    }
                  >
                    {att?.name}
                  </span>
                ))}
              </div>
            </div>
            <div className="flex gap-1">
              <strong>Color:</strong>{" "}
              <div className="flex gap-1 ">
                {productItem?.colors?.map((clr, idx) => (
                  <span
                    className="w-full cursor-pointer border rounded-md px-2 border-[#D1D5DB] shrink-0 text-center"
                    key={idx}
                    style={{
                      background: clr?.hex_code ?? clr?.name,
                    }}
                    onClick={() =>
                      setVariantId({ ...variantId, color_id: clr?.id })
                    }
                  >
                    {clr?.name}
                  </span>
                ))}
              </div>
            </div>
            <p>
              <strong>Category:</strong> {product?.category?.category_name}
            </p>
          </div>

          <div className="mt-2 px-3 py-2  rounded-md text-sm text-[#6B7280] flex items-center gap-2 md:gap-3 lg:gap-4 border border-[#E5E7EB]">
            <div>
              <MdOutlinePayment className="text-3xl" />
            </div>
            <div>
              <strong>Payment:</strong> Payment. Payment upon receipt of goods,
              Payment by card in the department, Bkash, Online card, -5%
              discount in case of payment
            </div>
          </div>
        </div>
      </div>
      {/* product  description */}
      <div className="space-y-3 py-5 text-[#030712]">
        <div className="border-b border-[#E5E7EB]  ">
          <span className="inline-block border-b-2 border-[#030712] pb-2 leading-7 font-bold">
            Description
          </span>
        </div>
        <div dangerouslySetInnerHTML={{ __html: product?.description }}></div>
      </div>
      {/* realeted product code here  */}
       <span className="inline-block pb-2 leading-7 font-bold text-lg">
           Related products
          </span>
       <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-3">
            {
              reletedProduct?.map((product,idx)=><SingleCart product={product}/>)
            }
       </div>
    </PageLayout>
  );
};

export default ProductDetails;
