// import { useProduct } from '@/hooks/product/useProduct';
import { useCart } from "@/hooks/cart/useCart";
import { useProduct } from "@/hooks/product/useProduct";
import Link from "next/link";
import React from "react";

const Product = () => {
  const { allProducts } = useProduct();
  const { addToCart, cart,removeFromCart } = useCart();
  console.log(cart);
  return (
    <div>
      <span className="px-5 py-5 bg-red-900 flex justify-center items-center">
        {cart?.length}
      </span>
      <Link href={"/"}>home</Link>
      <div className="flex gap-2 justify-between">
        <div>
          {cart.map((item, idx) => (
            <div>
              {item?.title}{" "}
              <button
                className="px-2 border py-1 bg-red-900"
                onClick={() => removeFromCart(item?.id)}
              >
                remove item
              </button>
            </div>
          ))}
        </div>
        <div>
            {allProducts.map((item, id) => (
          <div key={id}>
            {item?.title}
            <button
              className="px-2 border py-1 bg-red-900"
              onClick={() => addToCart(item)}
            >
              add to cart
            </button>
          </div>
        ))}
        </div>
      </div>
    </div>
  );
};

export default Product;
