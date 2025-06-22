import React from "react";
import Image from "next/image";
import { offerPricePercent } from "@/utils/priceOfferPercent";
import { formatPrice } from "@/utils/formatPrice";
import { useCart } from "@/hooks/cart/useCart";
const SingleShopCard = ({ shop }) => {
  const { addToCart } = useCart();

  return (
    <div className="rounded-2xl bg-white    relative shadow-xs">
      <Image
        src={shop?.image}
        width={1000}
        height={1000}
        className="overflow-hidden w-full h-[187px] rounded-t-2xl"
      />
      <div className="border border-t-0 rounded-b-2xl md:px-3 px-2 space-y-2 pt-2 pb-6">
        <h3 className="text-[#222222] font-poppins font-semibold text-base leading-5  ">
          {shop?.title}
        </h3>
        <hr className="border" />
        <p className="text-[#9CA3AF] font-poppins font-normal text-xs">
          {shop?.group}
        </p>

        <p className="text-[#9CA3AF] font-poppins font-normal text-xs">
          {shop?.location}
        </p>
      </div>
    </div>
  );
};

export default SingleShopCard;
