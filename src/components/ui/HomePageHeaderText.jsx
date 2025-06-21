import React from "react";

const HomePageHeaderText = ({ children }) => {
  return (
    <div className="inline-block relative text-[#666666]">
      <div className="text-2xl font-normal leading-8 inline-block relative after:block after:h-[3px] after:bg-primary after:mt-1 after:w-[calc(100%+100px)]">
        {children}
      </div>
    </div>
  );
};

export default HomePageHeaderText;
