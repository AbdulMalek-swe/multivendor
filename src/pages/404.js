import React from "react";
import Image from "next/image";
import Link from "next/link";
import { ROUTES } from "@/constants/route";

const PageNotFound = () => {
  return (
    <Link href={ROUTES?.HOME} className="relative">
      <div className="w-full aspect-auto">
        {" "}
        <Image
          src={"/404.gif"}
          width={1000}
          height={1000}
          className="w-full h-full"
        />
      </div>
    </Link>
  );
};

export default PageNotFound;
