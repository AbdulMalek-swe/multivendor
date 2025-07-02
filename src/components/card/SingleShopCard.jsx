import React from "react";
import Image from "next/image"; 
import Link from "next/link";
const SingleShopCard = ({ shop }) => { 
  return (
    <Link href="/vendor hsop" className="rounded-2xl bg-white    relative shadow-xs overflow-hidden">
      <div className="w-full h-[187px] overflow-hidden rounded-t-2xl">
        <Image
          src={`${process?.env.NEXT_PUBLIC_API_SERVER}${shop?.logo}`}
          width={1000}
          height={1000}
          alt="shop logo"
          className="w-full h-full object-cover transition-transform duration-300 ease-in-out hover:scale-110"
        />
      </div>
      <div className="border border-t-0 rounded-b-2xl md:px-3 px-2 space-y-2 pt-2 pb-6">
        <h3
          className="text-[#222222] font-poppins font-semibold text-base leading-5 text-nowrap "
          title={shop?.company_name}
        >
          {shop?.company_name}
        </h3>
        <hr className="border" />
        <p
          className="text-[#9CA3AF] font-poppins font-normal text-xs text-nowrap"
          title={shop?.shoptype}
        >
          {shop?.shoptype}
        </p>

        <p
          className="text-[#9CA3AF] font-poppins font-normal text-xs text-nowrap"
          title={shop?.company_location}
        >
          {shop?.company_location}
        </p>
      </div>
    </Link>
  );
};

export default SingleShopCard;
