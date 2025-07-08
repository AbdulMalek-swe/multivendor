import React, { useEffect, useRef, useState } from "react";
import { TextInput } from "../ui/Input";
import Link from "next/link";
import { ROUTES } from "@/constants/route";
import { FaHome, FiShoppingCart, MdOutlineDashboard, MdPerson } from "@/icons";
import { useRouter } from "next/router";
import Drawer from "react-modern-drawer";
import CartMenu from "../cart/CartMenu";
import BottomNav from "./BottomNav";
import { useCart } from "@/hooks/cart/useCart";
import { CiSearch, CiFaceSmile, CiShop, CiLogout } from "@/icons";
import Image from "next/image";
import LinkButton from "../ui/LinkButton";
import { useAuth } from "@/context/AuthContext";
import NavbarSkeleton from "../loader/skeleton/Navbar/NavbarSkeleton";
const Navbar = () => {
  const { items } = useCart();
  const { user: userProfile, logout, loading: authLoading } = useAuth();
  const [isFixed, setIsFixed] = useState(false);
  const [searchText, setSearchText] = useState("");
  const [profileMenu, setProfileMenu] = useState(false);
  const router = useRouter();
  // Scroll detector
  useEffect(() => {
    const handleScroll = () => {
      setIsFixed(window.scrollY > 0);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);
  const menuRef = useRef(null);
  // Click outside to close
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        setProfileMenu(false);
      }
    };
    window.addEventListener("click", handleClickOutside);
    return () => {
      window.removeEventListener("click", handleClickOutside);
    };
  }, []);
  if (authLoading) return <NavbarSkeleton />;
  return (
    <div className="mb-1">
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
          <div className="w-full relative">
            <TextInput
              placeholder="Search for products, categories or brands..."
              onChange={(e) => {
                setSearchText(e.target.value);
              }}
            />
            <span
              className="absolute text-3xl font-bold text-black right-0 top-0 h-full 
             flex items-center cursor-pointer bg-primary/5 rounded-r-md 
             px-2 transition-all duration-300 ease-in-out 
             hover:bg-primary/15 hover:scale-105 hover:shadow-md"
              onClick={() =>
                searchText &&
                router.push(`/search-product?search=${searchText}`)
              }
            >
              <CiSearch />
            </span>
          </div>
          {/* cart and profile icon  */}
          {userProfile ? (
            <div className="hidden md:flex  items-center flex-shrink-0 gap-2 ">
              <div className="relative" ref={menuRef}>
                <button onClick={() => setProfileMenu(!profileMenu)}>
                  {" "}
                  <Image
                    width={25}
                    height={25}
                    src="/icons/account.svg"
                    alt="loading"
                  />
                </button>
                {/* profile menu show here  */}
                <div
                  className={`absolute -right-20 mt-2 w-60 bg-white rounded-md shadow-lg origin-top-right z-50 overflow-hidden
        transform transition-all duration-300 ease-out border 
        ${
          profileMenu
            ? "translate-y-0 opacity-100 visible"
            : "translate-y-5 opacity-0 invisible"
        }`}
                  onMouseLeave={() => setProfileMenu(false)} // Hover outside => close
                >
                  {" "}
                  <div className="py-6 text-sm text-gray-700  ">
                    {/* indicator make  */}

                    <Link href={ROUTES?.ACCOUNT} className="px-4 py-2   cursor-pointer flex gap-1 items-center text-[15px] font-normal hover:text-primary/80 hover:underline">
                      <CiFaceSmile className="text-xl" />
                      <span className=""> Manage My Account</span>
                    </Link>
                    <Link href={ROUTES?.ORDERS} className="px-4 py-2   cursor-pointer flex gap-1 items-center text-[15px] font-normal hover:text-primary/80 hover:underline">
                      <CiShop className="text-xl" />
                      My Orders
                    </Link>
                    <span className="px-4 py-2   cursor-pointer flex gap-1 items-center text-[15px] font-normal hover:text-primary/80 hover:underline cursor-pointer">
                      <CiLogout className="text-xl" />
                      <span>Logout</span>
                    </span>
                  </div>
                </div>
              </div>
              <NavbarText text1="Deliver to" text2="all sylhet" />
              {/* cart route  */}
              <div className="relative  group py-2 ">
                <Link className="" href={ROUTES?.CART}>
                  <Image
                    width={25}
                    height={25}
                    src="/icons/cart.svg"
                    alt="loading"
                  />
                  {items?.length ? (
                    <span className="absolute top-1.5 -right-1 inline-flex items-center justify-center bg-primary text-white text-xs font-bold px-1 aspect-square rounded-full">
                      {items?.length}
                    </span>
                  ) : (
                    ""
                  )}
                </Link>
                {items?.length > 0 && (
                  <div className="absolute top-11 right-0  w-56 bg-white shadow-lg rounded-md opacity-0 scale-95 group-hover:opacity-100 group-hover:scale-100 transition-all duration-300 z-[9999] pointer-events-none group-hover:pointer-events-auto">
                    <CartMenu cartProduct={items} />
                  </div>
                )}
                {/* hover for full body overlay with background  */}
                {items?.length > 0 && (
                  <div
                    className="fixed inset-0 bg-black opacity-20 z-[9998] h-[calc(100vh-80px)] top-16 hidden group-hover:block 
  translate-y-[-100%] group-hover:translate-y-0 
  transition-all duration-500 ease-in-out 
  pointer-events-none group-hover:pointer-events-auto"
                  ></div>
                )}
              </div>
            </div>
          ) : (
            <div className="flex gap-2 md:gap-3 ">
              <LinkButton
                href={ROUTES?.LOGIN}
                className="text-nowrap uppercase text-sm  font-medium"
                bgColor=" "
                color="text-black"
              >
                <span className="relative  group">
                  login
                  <span className="absolute left-0 -bottom-1 h-[2px] w-full scale-x-0 bg-primary transition-transform duration-300 group-hover:scale-x-100 origin-left" />
                </span>
              </LinkButton>
              <LinkButton
                href={ROUTES?.REGISTER}
                className="text-nowrap uppercase text-sm  font-medium"
                bgColor="bg-r "
                color="text-[#030712]"
              >
                <span className="relative  group">
                  Sign Up
                  <span className="absolute left-0 -bottom-1 h-[2px] w-full scale-x-0 bg-primary transition-transform duration-300 group-hover:scale-x-100 origin-left" />
                </span>
              </LinkButton>
            </div>
          )}
        </div>
      </section>
      <div className="md:hidden  ">
        <BottomNav />
      </div>
      {/* <ResponsiveNavbars cart={cart} /> */}
    </div>
  );
};
export default Navbar;
const ResponsiveNavbars = ({ cart }) => {
  const { pathname } = useRouter();
  const [isOpen, setIsOpen] = useState(false);
  const toggleDrawer = () => setIsOpen((prev) => !prev);
  return (
    <div className="md:hidden fixed bottom-0 left-0 w-full bg-green-300 shadow-[0_-2px_10px_rgba(0,0,0,0.05)] border-t border-gray-200 px-4  text-sm text-gray-700 z-50">
      <div className="flex w-full justify-between items-center   py-5">
        <Link
          href={ROUTES?.HOME}
          className={`${
            pathname === ROUTES?.HOME
              ? "text-primary  p-3 -mt-12 bg-red-900 rounded-full   border shadow-2xl border-tranparent"
              : ""
          } flex flex-col justify-center items-center gap-1 font-medium`}
        >
          <FaHome />
          {/* {pathname !== ROUTES?.HOME &&  <span> Home</span>} */}
        </Link>
        <span
          className={`${
            isOpen ? "font-extrabold" : "font-medium"
          } flex flex-col justify-center items-center gap-1 cursor-pointer  `}
          onClick={toggleDrawer}
        >
          <MdOutlineDashboard />
          {/* <span>Category</span> */}
        </span>
        <Link
          href={ROUTES?.CART}
          className={`${
            pathname === ROUTES?.CART ? "text-primary" : ""
          } flex flex-col justify-center items-center gap-1 font-medium relative`}
        >
          <FiShoppingCart />
          {/* <span>Cart</span> */}
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
          {/* Account */}
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
