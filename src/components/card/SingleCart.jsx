import React from "react";
import Image from "next/image";
import Button from "../ui/Button";
import { FiShoppingCart } from "@/icons";
import { offerPricePercent } from "@/utils/priceOfferPercent";
import { formatPrice } from "@/utils/formatPrice";
import { useCart } from "@/hooks/cart/useCart";
import Link from "next/link";
import { ROUTES } from "@/constants/route";
import { handlePurchaseProduct } from "@/utils/productPurchase";
const SingleCart = ({ product }) => {
  const { addItem } = useCart();
  const handleAdded = () => {
    const newProduct = {
      ...product,
      color_id: product?.colors[0] ?? null,
      attribute_id: product?.attributes[0] ?? null,
    };
    addItem(handlePurchaseProduct(newProduct));
  };
  return (
    <Link
      href={ROUTES?.PRODUCT_DETAILS(product?.id)}
      className="rounded-2xl bg-white   relative shadow-xs overflow-hidden"
      aria-label="bajar.net"
    >
      <div className="w-full aspect-auto overflow-hidden">
        <Image
          src={`${process?.env.NEXT_PUBLIC_API_SERVER}${product?.thumbnail}`}
          width={1000}
          height={1000}
          className="overflow-hidden w-full h-[187px] rounded-t-2xl  transition-transform duration-300 ease-in-out hover:scale-110"
          alt={product?.product_name}
          priority
        />
      </div>
      <div className="border border-t-0 rounded-b-2xl md:px-3 px-2 space-y-2 py-2">
        <h3
          className="text-[#222222] font-poppins font-semibold text-base leading-5 line-clamp-1"
          title={product?.product_name}
        >
          {product?.product_name}
        </h3>
        <hr className="border" />
        <p className="text-[#4D5860] font-poppins font-normal text-xs">
          {product?.vendor?.company_name}
        </p>
        <div className="flex items-center gap-4 md:gap-6 lg:gap-8 xl:gap-12">
          <h3 className="text-2xl font-poppins font-bold text-primary ">
            {formatPrice(product?.offer_price)}
          </h3>
          <span className="line-through font-poppins font-normal text-[#222222] text-base  ">
            {formatPrice(product?.reguler_price)}
          </span>
        </div>
        {/* <Button
          className="!w-full   !h-8 !text-xs !font-poppins !font-light text-nowrap  "
          onClick={(e) => {
            if (e && e.stopPropagation) {
              e.stopPropagation();
            } else {
              console.log("Event object missing:", e);
            }
            handleAdded(product)
          }}
        >
          <FiShoppingCart />
          Add To Cart
        </Button> */}
        <p className="bg-[#AB1C1C] absolute top-0 right-0 rounded-tr-2xl w-14 h-12 rounded-bl-xl text-sm flex items-center p-1 font-poppins font-semibold text-wrap text-center leading-4">
          {offerPricePercent(product?.reguler_price, product?.offer_price)}% OFF
        </p>
      </div>
    </Link>
  );
};

export default SingleCart;
