import React, { useEffect, useState } from "react";
import { TextInput } from "../ui/Input";
import { useCart } from "@/hooks/cart/useCart";
import Link from "next/link";
import { ROUTES } from "@/constants/route";
import { FaHome, FiShoppingCart, MdOutlineDashboard, MdPerson } from "@/icons";
import { useRouter } from "next/router";
import Drawer from "react-modern-drawer";
import CartMenu from "../cart/CartMenu";
const Navbar = () => {
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
    <div className="mb-1  ">
      {/* navingation header  */}
      <section
        className={` hidden md:block bg-primary w-full z-40 transition-all duration-500 ease-in-out overflow-hidden ${
          isFixed
            ? "opacity-0 -translate-y-4 h-0"
            : "opacity-100 translate-y-0 h-8"
        }`}
      >
        <div className="container mx-auto flex justify-between items-center text-sm font-medium leading-[18px] h-8 ">
          <Link href={ROUTES?.HOME} className="hover:underline">
            Welcome to Baajar!
          </Link>
          <Link
            href={ROUTES.TRACK}
            className="flex items-center gap-1 hover:underline"
          >
            <img src="/icons/track_car.svg" alt="loading" />
            <span>Track Your Order</span>
          </Link>
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
            <img src="/icons/location.svg" />
            <NavbarText text1="Deliver to" text2="all sylhet" />
          </div>
          {/* search area  */}
          <div className="w-full">
            <TextInput
              placeholder="Search for products, categories or brands..."
              onChange={(e) => {
                console.log(e.target.value);
              }}
            />
          </div>
          {/* cart and profile icon  */}
          <div className="hidden md:flex  items-center flex-shrink-0 gap-2">
            <Link href={ROUTES?.DASHBOARD}>
              {" "}
              <img src="/icons/account.svg" alt="loading" />
            </Link>
            <NavbarText text1="Deliver to" text2="all sylhet" />
            {/* cart route  */}
            <div className="relative  group py-2 ">
              <Link className="" href={ROUTES?.CART}>
                <img src="/icons/cart.svg" alt="loading" />
                {cart?.length ? (
                  <span className="absolute top-1.5 -right-1 inline-flex items-center justify-center bg-primary text-white text-xs font-bold px-1 aspect-square rounded-full">
                    {cart?.length}
                  </span>
                ) : (
                  ""
                )}
              </Link>
              <div className="absolute top-11 right-0  w-56 bg-white shadow-lg rounded-md opacity-0 scale-95 group-hover:opacity-100 group-hover:scale-100 transition-all duration-300 z-[9999] pointer-events-none group-hover:pointer-events-auto">
                <CartMenu />
              </div>
              {/* hover for full body overlay with background  */}
              <div
                className="fixed inset-0 bg-black opacity-20 z-[9998] h-screen top-16 hidden group-hover:block 
  translate-y-[-100%] group-hover:translate-y-0 
  transition-all duration-500 ease-in-out 
  pointer-events-none group-hover:pointer-events-auto"
              ></div>
            </div>
          </div>
        </div>
      </section>
      <ResponsiveNavbars cart={cart} />
    </div>
  );
};
export default Navbar;
const ResponsiveNavbars = ({ cart }) => {
  const { pathname } = useRouter();
  const [isOpen, setIsOpen] = useState(false);
  const toggleDrawer = () => setIsOpen((prev) => !prev);
  return (
    <div className="md:hidden fixed bottom-0 left-0 w-full bg-white shadow-[0_-2px_10px_rgba(0,0,0,0.05)] border-t border-gray-200 px-4 py-3 text-sm text-gray-700 z-50">
      <div className="flex w-full justify-between items-center">
        <Link
          href={ROUTES?.HOME}
          className={`${
            pathname === ROUTES?.HOME ? "text-primary" : ""
          } flex flex-col justify-center items-center gap-1 font-medium`}
        >
          <FaHome />
          <span> Home</span>
        </Link>
        <span
          className={`${
            isOpen ? "font-extrabold" : "font-medium"
          } flex flex-col justify-center items-center gap-1 cursor-pointer`}
          onClick={toggleDrawer}
        >
          <MdOutlineDashboard />
          <span>Category</span>
        </span>
        <Link
          href={ROUTES?.CART}
          className={`${
            pathname === ROUTES?.CART ? "text-primary" : ""
          } flex flex-col justify-center items-center gap-1 font-medium relative`}
        >
          <FiShoppingCart />
          <span>Cart</span>
          {cart?.length ? (
            <span className="absolute -top-2 -right-1 inline-flex items-center justify-center bg-primary text-white text-xs font-bold px-1 aspect-square rounded-full">
              {cart?.length}
            </span>
          ) : (
            ""
          )}
        </Link>
        <Link
          href={ROUTES?.DASHBOARD}
          className={`${
            pathname === ROUTES?.DASHBOARD ? "text-primary" : ""
          } flex flex-col justify-center items-center gap-1 font-medium`}
        >
          <MdPerson />
          Account
        </Link>
      </div>
      {/* drawer code for category show  */}
      <Drawer
        open={isOpen}
        onClose={toggleDrawer}
        direction="left"
        className="p-4 bg-white"
      >
        <p className="text-lg font-semibold">Sidebar Content</p>
      </Drawer>
    </div>
  );
};
const NavbarText = ({ text1, text2 }) => {
  return (
    <div className="flex flex-col text-[#030712] ">
      <span className="text-sm leading-4 font-normal opacity-75">{text1}</span>
      <span className="font-medium text-sm leading-4 "> {text2}</span>
    </div>
  );
};
