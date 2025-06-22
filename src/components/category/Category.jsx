"use client";
import { categoryList } from "@/constants/category";
import React, { useEffect, useRef, useState } from "react";

const Category = () => {
  const [open, setOpen] = useState(true);
  return (
    <div className=" ">
      <button
        className="w-full py-3 text-base font-semibold text-[#030712]  rounded-t-lg  border  border-[#E5E7EB] border-b-0 cursor-pointer"
        onClick={() => setOpen(!open)}
      >
        All Categories
      </button>
      <div
        className={` transition-all duration-500 ease-in-out ${
          open ? "h-screen" : "h-0 overflow-hidden"
        }`}
      >
        <nav className="flex justify-center items-center">
          <ul className="flex flex-col list-none relative bg-white  max-h-screen  border rounded-b-lg border-t-0">
            {categoryList.map((menu, index) => {
              const depthLevel = 0;
              return (
                <MenuItems items={menu} key={index} depthLevel={depthLevel} />
              );
            })}
          </ul>
        </nav>{" "}
      </div>
    </div>
  );
};

export default Category;

const MenuItems = ({ items, depthLevel }) => {
  const [dropdown, setDropdown] = useState(false);
  const ref = useRef();

  useEffect(() => {
    const handler = (event) => {
      if (dropdown && ref.current && !ref.current.contains(event.target)) {
        setDropdown(false);
      }
    };
    document.addEventListener("mousedown", handler);
    document.addEventListener("touchstart", handler);
    return () => {
      document.removeEventListener("mousedown", handler);
      document.removeEventListener("touchstart", handler);
    };
  }, [dropdown]);

  const onMouseEnter = () => {
    if (window.innerWidth > 960) setDropdown(true);
  };

  const onMouseLeave = () => {
    if (window.innerWidth > 960) setDropdown(false);
  };

  return (
    <li
      className="text-[#030712] bg-white font-medium text-sm leading-5 border-t border-t-[#E5E7EB]"
      ref={ref}
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
    >
      {items.children ? (
        <>
          <button
            type="button"
            aria-haspopup="menu"
            aria-expanded={dropdown ? "true" : "false"}
            onClick={() => setDropdown((prev) => !prev)}
            className="w-48 flex justify-between items-center px-4 py-2  00 focus:outline-none"
          >
            {items.title}
            <span className="ml-2">&raquo;</span>
          </button>

          <Dropdown
            childrens={items.children}
            dropdown={dropdown}
            depthLevel={depthLevel}
          />
        </>
      ) : (
        <a href="/#" className="block w-48 px-4 py-2  ">
          {items.title}
        </a>
      )}
    </li>
  );
};

const Dropdown = ({ childrens, dropdown, depthLevel }) => {
  depthLevel = depthLevel + 1;

  // সাবমেনু যদি nested হয়, তাহলে parent এর ডানপাশে দেখাব
  const childrenPosition = "left-full top-0 h-full bg-white";

  return (
    <ul
      className={`absolute z-50 min-w-[10rem]  shadow-md rounded  ${
        dropdown ? "block" : "hidden"
      } ${childrenPosition}`}
    >
      {childrens.map((children, index) => (
        <MenuItems items={children} key={index} depthLevel={depthLevel} />
      ))}
    </ul>
  );
};
