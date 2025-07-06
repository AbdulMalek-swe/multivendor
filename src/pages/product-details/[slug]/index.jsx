import Button from "@/components/ui/Button";
import useProductId from "@/hooks/api/Product/useSinglePorduct";
import Image from "next/image";
import { useRouter } from "next/router";
import React from "react";
import { AiOutlineShopping, MdOutlinePayment } from "@/icons";
import { offerPricePercent } from "@/utils/priceOfferPercent";
const ProductDetails = () => {
  const router = useRouter();
  const { data: productItem, loading } = useProductId(router?.query?.slug);
  const product = productItem?.product;
  console.log(productItem);
  if (loading) return <div>welcom</div>;
  return (
    <div>
      <div className="max-w-[1360px] mx-auto">
        <div className="bg-[#DC2626] text-white text-xs  flex items-center justify-center py-2 px-3 rounded-full w-14 mb-2 text-[10px] font-extrabold">
          {offerPricePercent(product?.reguler_price, product?.offer_price)}%
        </div>
        <div className="bg-green-100 text-green-600 text-xs text-[10px] font-extrabold flex   py-2 px-[6px] rounded-full w-24 ">
          <img src="/products/1.png" alt="" />
          ORGANIC
        </div>

        <div className="flex flex-col md:flex-row justify-between md:gap-10">
          <div className="flex justify-center w-full md:w-1/2 aspect-[247/187]">
            <Image
              src={`${process?.env.NEXT_PUBLIC_API_SERVER}${product?.thumbnail}`}
              alt="Organic Banana"
              className="w-full rounded-xl"
              width={1000}
              height={1000}
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
              <span className="text-primary text-2xl font-bold">BDT 100</span>
              <span className="text-[#111827] line-through text-xl font-medium">
                BDT 110
              </span>
            </div>
            <div className="flex gap-1 sm:gap-2 md:gap-3">
              <div className="flex items-center justify-between px-5 bg-[#FFFFFF] border border-[#D1D5DB] w-full  rounded-md  text-base sm:text-lg md:text-xl lg:text-2xl  text-[#020617]">
                <button className=" text-xl">−</button>
                <span className="text-lg font-semibold">1</span>
                <button className=" text-lg">+</button>
              </div>
              <Button
                className="text-white font-semibold px-5 py-2 rounded text-nowrap "
                bgColor="bg-[#16A34A]"
                rounded="rounded-md"
                textSize="text-sm"
              >
                <AiOutlineShopping />
                <span> Add to cart</span>
              </Button>
              <Button
                className="text-white font-semibold px-5 py-2 rounded text-nowrap "
                bgColor="bg-[#212529]"
                rounded="rounded-md"
                textSize="text-sm"
              >
                <AiOutlineShopping />
                <span>Buy Now</span>
              </Button>
            </div>
            <div className="text-sm text-gray-600">
              <p>
                <strong>Unit:</strong> Dozen
              </p>
              <p>
                <strong>Category:</strong> Groceries
              </p>
            </div>

            <div className="mt-2 px-3 py-2  rounded-md text-sm text-[#6B7280] flex items-center gap-2 md:gap-3 lg:gap-4 border border-[#E5E7EB]">
              <div>
                <MdOutlinePayment className="text-3xl" />
              </div>
              <div>
                <strong>Payment:</strong> Payment. Payment upon receipt of
                goods, Payment by card in the department, Bkash, Online card,
                -5% discount in case of payment
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetails;
