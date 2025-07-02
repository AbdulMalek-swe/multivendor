import Image from "next/image";
import React from "react";

const AuthLayout = ({ children, onsubmit, icon = false }) => {
  return (
    <div className="my-4 md:my-8 flex justify-center">
      <form
        onSubmit={onsubmit}
        className="bg-primary space-y-3 py-2 sm:py-4 md:py-6 px-4 sm:px-4 md:px-8 rounded-md w-full sm:w-3/4 md:w-1/3 flex justify-center flex-col"
      >
        {icon && (
          <div className="flex justify-center items-center py-2 md:py-4 lg:py-6 ">
            <Image
              alt="Authentication Icon"
              src="/icons/auth.svg"
              width={100}
              height={100}
              className="w-28 h-28 "
            />
          </div>
        )}
        {children}
      </form>
    </div>
  );
};

export default AuthLayout;
