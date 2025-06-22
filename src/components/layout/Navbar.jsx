import React, { useEffect, useState } from "react";
import { TextInput } from "../ui/Input";
import { useForm } from "react-hook-form";
import { useCart } from "@/hooks/cart/useCart";

const Navbar = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: {
      status: "welcom",
    },
  });
  const { cart } = useCart();
  const [isFixed, setIsFixed] = useState(false);

  // Scroll detector
  useEffect(() => {
    const handleScroll = () => {
      setIsFixed(window.scrollY > 0);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);
  return (
    <div className="mb-1">
      {/* navingation header  */}
      <section
        className={`bg-primary w-full z-40 transition-all duration-500 ease-in-out overflow-hidden ${
          isFixed
            ? "opacity-0 -translate-y-4 h-0"
            : "opacity-100 translate-y-0 h-8"
        }`}
      >
        <div className="container mx-auto flex justify-between items-center text-sm font-medium leading-[18px] h-8 ">
          <p>Welcome to Baajar!</p>
          <div className="flex items-center">
            <img src="icons/track_car.svg" />
            <span>Track Your Order</span>
          </div>
        </div>
      </section>
      {/* second header  */}
      <section
        className={`bg-white z-50 w-full transition-all duration-500 ease-in-out transform ${
          isFixed
            ? "fixed top-0 left-0  shadow-md translate-y-0 opacity-100 h-16 scale-[1]"
            : "relative opacity- -translate-y-0 h-20 scale-[0.98]"
        }`}
      >
        <div className="container mx-auto  h-full flex items-center justify-between gap-3">
          <div className="flex gap-3 items-center flex-shrink-0">
            <img src="icons/location.svg" />
            <NavbarText text1="Deliver to" text2="all sylhet" />
          </div>
          {/* search area  */}
          <div className="w-full">
            <TextInput
              //   label="Name"
              name="name"
              placeholder="Search for products, categories or brands..."
              register={register}
              required
              minLength={3}
              maxLength={20}
              errors={errors}
              onChange={(e) => {
                console.log(e.target.value);
              }}
              type="search"
            />
          </div>
          {/* cart and profile icon  */}
          <div className="flex items-center flex-shrink-0 gap-2">
            <img src="icons/account.svg" alt="" />
            <NavbarText text1="Deliver to" text2="all sylhet" />
            <div className="relative ">
              <img src="icons/cart.svg" alt="" />
              <span className="absolute top-0 right-0 inline-flex items-center justify-center bg-primary text-white text-xs font-bold px-1 aspect-square rounded-full">
                {cart?.length}
              </span>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Navbar;

const NavbarText = ({ text1, text2 }) => {
  return (
    <div className="flex flex-col text-[#030712] ">
      <span className="text-sm leading-4 font-normal opacity-75">{text1}</span>
      <span className="font-medium text-sm leading-4 "> {text2}</span>
    </div>
  );
};
