import React, { useEffect, useState } from "react";
import Image from "next/image";
import { useRouter } from "next/router";
import { FaShoppingCart, FaCheck } from "@/icons";
import { useCart } from "@/hooks/cart/useCart";
import { notifyError } from "@/utils/toast";
import { useDeleteModal } from "@/context/DeleteModalContext";
const Cart = () => {
  const { openModal } = useDeleteModal();
  const router = useRouter();
  const [selectedProduct, setSelectedProduct] = useState([]);
  const {
    items: productItem,
    updateItem,
    removeItem,
    loading: updateLoading,
    productLoading: loading,
  } = useCart();
  // checkout to go next order page
  const handleCheckout = () => {
    try {
      if (!selectedProduct?.length) {
        notifyError("Please select product then order ");
        return;
      }
      const orderItem = selectedProduct?.map((product) => {
        return {
          sell_price:
            product?.product_variant?.price || product?.product?.sell_price,
          product_id: product?.product?.product_id,
          weight:
            product?.product?.weight || product?.product_variant?.weight || 1,
          attribute_id: product?.product_variant?.attribute_id,
          attribute: product?.product_variant?.attribute?.name,
          color_id: product?.product_variant?.color_id,
          color: product?.product_variant?.color?.name,
          attribute_weight: product?.product_variant?.weight || null,
          attribute_price:
            product?.product_variant?.discount_price ||
            product?.product?.sell_price,
          qty: product?.qty || 0,
          image: product?.product?.thumbnail_image,
          category: product?.product?.category?.category_name,
          title: product?.product?.title,
          payment: "paid",
          product_variant_id: product?.product_variant?.product_variant_id || 0,
          attribute_discount_price:
            product?.product_variant?.sell_price ||
            product?.product?.sell_price ||
            0,
        };
      });
      localStorage.setItem("orderItems", JSON.stringify(orderItem));
      router.push("checkout?bestApplied=true");
    } catch (error) {
      notifyError(error?.message);
    }
  };
  // calculate subtotal and total
  const calculateSubtotal = () => {
    if (!productItem?.length) return;
    const total = productItem.reduce((sum, item) => {
      const price = item?.price ?? item?.product?.offer_price ?? 0;
      return sum + price * item?.quantity;
    }, 0);
    return total;
  };
  // sell price found

  // set selected product default added all
  useEffect(() => {
    setSelectedProduct(productItem);
  }, [productItem]);
  // check product exist or not
  const isChecked = (items) =>
    selectedProduct?.some((item) => item?.id === items?.id);
  // all selected function
  const handleAllSelect = () => {
    if (selectedProduct?.length !== productItem?.length) {
      setSelectedProduct(productItem);
    } else {
      setSelectedProduct([]);
    }
  };
  // single select product added
  const handleAddedProduct = (product) => {
    if (isChecked(product)) {
      setSelectedProduct(
        selectedProduct.filter((item) => item?.id !== product?.id)
      );
    } else {
      setSelectedProduct([...selectedProduct, product]);
    }
  };

  //   if (loading && !productItem?.length) return <CartSkeleton />;
  if (!productItem?.length)
    return (
      <div className="flex flex-col items-center justify-center text-center  ">
        <Image
          height={250}
          width={250}
          className="mx-auto "
          src="/empty_cart.png"
          alt="Logo"
        />
        <button
          className="mt-5 px-6 py-2 bg-primary text-white rounded-lg"
          onClick={() => (window.location.href = "/products")}
        >
          Continue Shopping
        </button>
      </div>
    );
  console.log(productItem, "----------");

  return (
    <div className="container-custom  ">
      {productItem?.length && updateLoading && (
        <div className="fixed inset-0 z-[9999] bg-black/80 flex items-center justify-center">
          {/* <Spinner /> */}
        </div>
      )}
      <h2 className="text-2xl font-normal mb-4 flex items-center gap-1 bg-gray-200/50 rounded-md px-2 py-1"> 
        {/* <FaShoppingCart /> Cart List */}
      </h2>
      {/* Select All */}
      <label className="flex items-center gap-2 border rounded px-4 py-3 mb-4">
        <input
          type="checkbox"
          onChange={() => handleAllSelect()}
          checked={selectedProduct?.length === productItem?.length}
          className="form-checkbox h-5 w-5 text-pink-500 hidden "
        />

        <div
          className={`border border-gray-200 w-5 h-5 p-0.5 flex items-center rounded-sm ${
            selectedProduct?.length === productItem?.length ? "bg-primary" : ""
          }`}
        >
          {selectedProduct?.length === productItem?.length && (
            <FaCheck className="text-white" />
          )}
        </div>
        <span className="text-lg text-black">Select all </span>
      </label>
      <div className="flex flex-col lg:flex-row gap-6">
        {/* Left Side - Product List */}
        <div className="flex-1 space-y-4">
          {/* Headers - hidden on mobile */}
          <div className="hidden md:grid grid-cols-12 text-gray-700 bg-yellow-50 px-4 py-3 font-semibold text-sm rounded">
            <div className="col-span-6">Product Details</div>
            <div className="col-span-2 text-center">Price</div>
            <div className="col-span-2 text-center">QTY</div>
            <div className="col-span-2 text-right">Total</div>
          </div>

          {/* Product Item */}
          {productItem.map((item, idx) => (
            <div
              key={idx}
              className="grid grid-cols-1 md:grid-cols-12 items-center border rounded-lg p-4 gap-y-4 md:gap-0"
            >
              <div className="md:col-span-6 flex items-start gap-4">
                <div
                  onClick={() => handleAddedProduct(item)}
                  className={`border border-gray-200 w-5 h-5 p-0.5 flex items-center rounded-sm ${
                    isChecked(item) ? "bg-primary" : ""
                  }`}
                >
                  {isChecked(item) && <FaCheck className="text-white" />}
                </div>
                <Image
                  src={`${process.env.NEXT_PUBLIC_API_SERVER}${item?.product?.thumbnail}`}
                  alt={item?.product?.product_name}
                  className="w-16 h-16 object-cover rounded"
                  width={100}
                  height={100}
                />
                <div>
                  <p className="font-medium">{item?.product?.product_name}</p>
                  {/* {item?.product_variant && (
                    <p className="text-sm text-gray-500">
                      Color: {item?.product_variant?.color?.name} | Size:{" "}
                      {item?.product_variant?.attribute?.name}
                    </p>
                  )} */}
                  <button
                    onClick={() => openModal(() => removeItem(item?.id))}
                    className="text-xs text-red-500 mt-1 cursor-pointer hover:bg-red-200/70 rounded-md p-0.5"
                  >
                    🗑 Remove
                  </button>
                </div>
              </div>

              <div className="md:col-span-2 text-center md:text-left">
                <p className="text-gray-800 font-semibold">
                  ৳ {Math.ceil(item?.price)}{" "}
                </p>
                {/* <p className="text-gray-400 line-through text-sm">৳ 550</p> */}
              </div>
              {/* cart item increament decrement system  */}
              <CartItem
                item={item}
                updateItem={updateItem}
                updateLoading={updateLoading}
                removeItem={removeItem}
              />

              <div className="md:col-span-2 text-right font-medium">
                ৳ {item?.price * item?.quantity}
              </div>
            </div>
          ))}
        </div>

        {/* Right Side - Order Summary */}
        <div className="w-full lg:w-1/3">
          <div className="border rounded-lg p-6 bg-white shadow-md">
            <h3 className="text-lg font-semibold mb-4">Order Summary:</h3>

            <div className="flex justify-between text-sm mb-2">
              <span>Product Price:</span>
              <span>৳ {calculateSubtotal()}</span>
            </div>
            <div className="flex justify-between text-sm mb-2">
              <span>Delivery Charge:</span>
              <span>Based on E-courier</span>
            </div>
            <hr className="my-3" />
            <div className="flex justify-between font-semibold text-lg mb-4">
              <span>Total Payment:</span>
              <span>৳ {calculateSubtotal()} </span>
            </div>

            <button
              onClick={handleCheckout}
              className="w-full bg-gradient-to-r from-blue-600 to-blue-400 text-white font-semibold py-2 rounded hover:opacity-90 transition"
              disabled={!selectedProduct?.length}
            >
              Checkout
            </button>

            {/* Payment Methods */}
            <div className="mt-4">
              <p className="text-sm mb-2">We Accept</p>
              <span className="flex bg-gray-200 text-black/40 px-1 rounded-lg">
                Cash On Delivery
              </span>
              {/* <span className="flex   text-black/80 text-xl  rounded-lg mt-2">
                Comming Soon
              </span>
              <div className="flex flex-wrap gap-2 items-center py-2">
                <img src="/images/visa.svg" alt="Visa" className="h-6" />
                <img src="/images/bkash.svg" alt="Bkash" className="h-6" />
                <img src="/images/nagad.svg" alt="Nagad" className="h-6" />
                <img src="/images/rocket.svg" alt="Rocket" className="h-6" />
              </div> */}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Cart;
const CartItem = ({ item, updateItem }) => {
  const handleQty = (type) => {
    if (type === "dec") {
      if (item?.quantity == 1) return;
      const newQty = Number(item?.quantity) - 1;
      updateItem({ id: item?.id, quantity: newQty });
    } else if (type === "inc") {
      const newQty = Number(item?.quantity) + 1;
      updateItem({ id: item?.id, quantity: newQty });
    }
  };
  return (
    <div className="md:col-span-2 flex justify-center md:justify-start items-center gap-2">
      <button
        onClick={() => handleQty("dec")}
        className="border px-2 rounded hover:bg-gray-100"
      >
        −
      </button>
      <span className="w-6 text-center">{item?.quantity}</span>
      <button
        onClick={() => handleQty("inc")}
        className="border px-2 rounded hover:bg-gray-100"
      >
        +
      </button>
    </div>
  );
};
