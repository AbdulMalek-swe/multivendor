import React from "react";
import Image from "next/image";
import { ROUTES } from "@/constants/route";
import LinkButton from "../ui/LinkButton";
// import LinkButton from "../ui/LinkButton";
const CartMenu = ({ cartProduct = [] }) => {
  return (
    <div className="bg-white fixed top-0 z-[99999999999] right-0.5 p-8 w-[380px] md:w-[425px] rounded-lg">
      <div className="overflow-y-auto max-h-[300px]">
        {cartProduct?.map((product, idx) => (
          <div className="flex gap-2 md:gap-4 items-center border-b-2 md:py-3 py-2">
            <div className="aspect-square w-[73px] h-[73px] flex items-center">
              <Image
                src={`${process?.env.NEXT_PUBLIC_API_SERVER}${product?.product?.thumbnail}`}
                alt="loading"
                width={1000}
                height={1000}
                className="w-full h-full rounded-lg"
              />
            </div>
            <div className="flex-shrink-0">
              <h3 className="text-[#0F172A] font-medium text-sm leading-3.5 pb-2 md:pb-3">
                {product?.product?.product_name}
              </h3>
              <div className="flex md:gap-4 gap-2">
                <p className="text-[#6B7280] font-bold text-xs leading-3.5">
                  {product?.group}
                </p>
                <p className="flex gap-2 font-medium text-xs text-[#AAAAAA]">
                  <span>Color : {product?.color?.name}</span>
                  <span>Size : {product?.attribute?.name}</span>
                </p>
              </div>
              <span className="text-primary font-bold md:text-base text-sm leading-3.5">
                BDT {Math.round(product?.price)}/-
              </span>
            </div>
          </div>
        ))}
      </div>
      <LinkButton href={ROUTES?.CHECKOUT}>Proceed To Checkout</LinkButton>
    </div>
  );
};

export default CartMenu;
