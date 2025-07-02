import React, { useState, useRef, useEffect } from "react";
import {
  AiOutlineHome,
  AiOutlineUser,
  AiOutlineMessage,
  AiOutlineCamera,
  AiOutlineSetting,
} from "react-icons/ai";

const icons = [
  { icon: <AiOutlineHome />, label: "home" },
  { icon: <AiOutlineUser />, label: "user" },
  { icon: <AiOutlineMessage />, label: "message" },
  { icon: <AiOutlineCamera />, label: "camera" },
  { icon: <AiOutlineSetting />, label: "settings" },
];

const BottomNav = () => {
  const [activeIndex, setActiveIndex] = useState(0);
  const containerRef = useRef(null);
  const [itemWidth, setItemWidth] = useState(0);

  useEffect(() => {
    if (containerRef.current) {
      const width = containerRef.current.offsetWidth;
      setItemWidth(width / icons.length); // dynamically calculate each icon's width
    }
  }, [containerRef.current?.offsetWidth]);

  return (
    <div
      className="fixed bottom-0 left-0 w-full h-[70px] bg-white z-50 flex items-center justify-center"
      style={{
        boxShadow: "0 -4px 12px rgba(0, 0, 0, 0.1)", // ⬆️ Top Shadow
      }}
    >
      <ul className="relative flex w-full h-full" ref={containerRef}>
        {/* Indicator */}
        <div
          className="absolute top-[0px] left-0 w-[60px] h-[50px] transition-transform duration-300 pointer-events-none  bg-transparent"
          style={{
            transform: `translateX(${
              activeIndex * itemWidth + itemWidth / 2 - 35
            }px)`,
          }}
        >
          <div className="relative w-full h-full bg-white rounded-b-full border-4 border-gray-100">
            <span className="absolute left-[1px] top-[-5px] w-[50px] h-[50px]    rounded-full  scale-90"></span>
          </div>
        </div>

        {icons.map((item, index) => (
          <li
            key={index}
            className="flex-1 h-full flex items-center justify-center z-10"
          >
            <button
              onClick={() => setActiveIndex(index)}
              className={`text-2xl transition-all duration-300 flex flex-col items-center  cursor-pointer ${
                activeIndex === index
                  ? "text-primary -translate-y-[12px] -translate-x-[5px]"
                  : "text-gray-600 opacity-70"
              }`}
            >
              {item.icon}
              {activeIndex !== index ? (
                <span className="text-xs sm:text-sm">{item?.label}</span>
              ) : (
                ""
              )}
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default BottomNav;
