import Image from "next/image";
import React from "react";
import Button from "../ui/Button";
import { FiShoppingCart } from "@/icons";
import { offerPricePercent } from "@/utils/priceOfferPercent";
import { formatPrice } from "@/utils/formatPrice";
import { useCart } from "@/hooks/cart/useCart";
const SingleCart = ({ product }) => {
    const {addToCart} = useCart();
    const handleAddedToCart = (productItem)=>{
      addToCart(productItem)
    }
  return (
    <div className="rounded-2xl bg-white    relative shadow-xs">
      <Image
        src={product?.image}
        width={1000}
        height={1000}
        className="overflow-hidden w-full h-[187px] rounded-t-2xl"
      />
      <div className="border border-t-0 rounded-b-2xl md:px-3 px-2 space-y-2 py-2">
        <h3 className="text-[#222222] font-poppins font-semibold text-base leading-5  ">
          {product?.title}
        </h3>
        <hr className="border" />
        <p className="text-[#9CA3AF] font-poppins font-normal text-xs">
          {product?.group}
        </p>
        <div className="flex items-center gap-12">
          <h3 className="text-2xl font-poppins font-bold text-primary">
            {formatPrice(product?.discount_price)}
          </h3>
          <span className="line-through font-poppins font-normal text-[#222222] text-base  ">
            {formatPrice(product?.price)} 
          </span>
        </div>
        <Button className="!w-full  !h-8 !text-xs !font-poppins !font-light" onClick={()=>handleAddedToCart(product)}>
          <FiShoppingCart />
          Add To Cart
        </Button>
        <p className="bg-primary absolute top-0 right-0 rounded-tr-2xl w-14 h-12 rounded-bl-xl text-sm flex items-center p-1 font-poppins font-semibold text-wrap text-center leading-4">
          {offerPricePercent(product?.price, product?.discount_price)}% OFF
        </p>
      </div>
    </div>
  );
};

export default SingleCart;
