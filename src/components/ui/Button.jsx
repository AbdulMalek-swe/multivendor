import React, { useEffect, useRef, useState } from "react";
import clsx from "clsx";
import { FaCheck, FaSpinner } from "react-icons/fa";
const Button = ({
  children,
  type = "button",
  //   variant = "",
  disabled = false,
  isLoading = false,
  isSuccess = false,
  onClick = () => {},
  className = "",
}) => {
  const btnRef = useRef(null); 
  const [isShrinking, setIsShrinking] = useState(false); 
  const [showText, setShowText] = useState(true);
  const [showSuccessText, setShowSuccessText] = useState(false);
  const handleClick = (e) => {
    const button = btnRef.current;
    if (!button) return;
    const circle = document.createElement("span");
    const diameter = Math.max(button.clientWidth, button.clientHeight);
    const radius = diameter / 2;
    circle.style.width = circle.style.height = `${diameter}px`;
    circle.className = "absolute bg-black/30 rounded-full animate-ripple";
    circle.style.left = `${
      e.clientX - button.getBoundingClientRect().left - radius
    }px`;
    circle.style.top = `${
      e.clientY - button.getBoundingClientRect().top - radius
    }px`;
    button.appendChild(circle);
    // Steps 
    setTimeout(() => {
      circle.remove();
    }, 400);
  };
 useEffect(() => {
    if (isLoading) {
      setIsShrinking(true);
      setShowText(false);
      setShowSuccessText(false);
    } else if (isSuccess) {
      setIsShrinking(false);
      setShowSuccessText(true);
    } else {
      const resetTimeout = setTimeout(() => {
        setShowSuccessText(false);
        setShowText(true);
      }, 100); // Reset back to original text
      return () => clearTimeout(resetTimeout);
    }
  }, [isLoading, isSuccess]);
  //  button defualt class
  const baseStyles = `
  relative overflow-hidden flex items-center justify-center
  font-poppins text-2xl font-medium leading-5
  border rounded-full transition-all duration-500 ease-in-out
    text-primary   focus:outline-none
  hover:opacity-85 cursor-pointer  
  ${isShrinking ? ` ` : "w-96 h-12 px-6"}
`;

  return (
    <button
      ref={btnRef}
      type={type}
      onClick={(e) => {
        handleClick(e), onClick(e);
      }}
      disabled={isLoading || isSuccess || disabled}
      //   disabled={disabled || loading}
      className={clsx(
        className,
        baseStyles,
        // variants[variant],
        disabled && "opacity-50 cursor-not-allowed"
      )}
      style={
        isShrinking && btnRef.current
          ? {
              width: `${btnRef.current.clientHeight}px`,
              height: `${btnRef.current.clientHeight}px`,
            }
          : {}
      }
    >
      {isLoading ? (
        <FaSpinner className="animate-spin text-primary text-lg" />
      ) : isSuccess && showSuccessText ? (
        <span className="flex items-center gap-1 text-sm animate-fade-up">
          <FaCheck className="text-green-300" /> Success
        </span>
      ) : (
        showText && (
          <span className="transition-opacity duration-300 animate-fade-up flex items-center gap-2 font-poppins">
            {children}
          </span>
        )
      )}
    </button>
  );
};

export default Button;
