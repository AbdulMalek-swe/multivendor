import React from "react"; 
import Link from "next/link";
import clsx from "clsx";
const LinkButton = ({
  href = "/",
  children = "Click here",
  className = "",
  bgColor = "bg-primary",
  color = "text-white/80",
  rounded = "rounded-xl",
}) => {
  return (
    <Link
      href={href}
      className={clsx(
        "mt-5 flex items-center justify-center font-bold w-full text-base py-3 hover:opacity-85 transition-all duration-150",
        bgColor,
        color,
        rounded,
        className
      )}
    >
      {children}
    </Link>
  );
};

export default LinkButton;
