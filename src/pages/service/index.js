// import { useProduct } from '@/hooks/product/useProduct';
import React from "react";
import SingleCart from "@/components/card/SingleCart";
import { useCart } from "@/hooks/cart/useCart";
import { useProduct } from "@/hooks/product/useProduct";
import Link from "next/link";

const Product = () => {
  const { cart, removeFromCart } = useCart();
  return (
    <div>
      <Link
        href={"/"}
        className="text-green-400 hover:underline bg-red-900  block py-4 my-5"
      >
        home
      </Link>
      <div className="flex gap-2 justify-between">
        <div className="flex gap-4 flex-wrap">
          {cart.map((item, idx) => (
            <div className="relative">
              <SingleCart product={item} />
              <button
                className=" rounded-full px-2 border cursor-pointer bg-red-900 absolute bottom-2.5 w-full py-2"
                onClick={() => removeFromCart(item?.id)}
              >
                remove item
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Product;
