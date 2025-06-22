import SingleCart from "@/components/product/SingleCart";
import SingleShopCard from "@/components/shop/SingleShopCard";
import HomePageHeaderText from "@/components/ui/HomePageHeaderText";
import { productList } from "@/constants/product";
import { shopList } from "@/constants/shopList";
import Link from "next/link";

export default function Home() {
  return (
    <div className=" container mx-auto  space-y-3 ">
      <div className="flex justify-between">
        <HomePageHeaderText>
          Nearest <span className="text-primary ">Shop Profile</span>
        </HomePageHeaderText>
        <div className="flex items-center gap-2 text-sm md:text-base leading-[18px] text-[#222222]">
          <div className="flex items-center gap-2">
            <img src="/icons/homeLocation.svg" alt="location icon" />
            <span className="font-medium">Nearest Shops</span>
          </div>
          <span className="flex items-center pl-6">
            <span>View All</span>
            <img src="/icons/leftArrow.svg" alt="location icon" />
          </span>
        </div>
      </div>
      <div className="grid grid-cols-1 xs:grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-3 ">
        {shopList?.map((shop, idx) => (
          <SingleShopCard shop={shop} key={idx} />
        ))}
      </div>
      <HomePageHeaderText>
        Hot Product <span className="text-primary ">Nearby</span>
      </HomePageHeaderText>
      <div className="grid grid-cols-1 xs:grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 ">
        {productList?.map((product, idx) => (
          <SingleCart product={product} key={idx} />
        ))}
      </div>

      <Link href={"/service"}>service</Link>
    </div>
  );
}
