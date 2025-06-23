import Banner from "@/components/banner/Banner";
import Category from "@/components/category/Category";
import SingleCart from "@/components/card/SingleCart";
import SingleShopCard from "@/components/card/SingleShopCard";
import HomePageHeaderText from "@/components/ui/HomePageHeaderText";
import { productList } from "@/constants/product";
import { shopList } from "@/constants/shopList";
import Image from "next/image";

export default function Home() {
  return (
    <div className=" container mx-auto  space-y-3 ">
      <div className="flex gap-2 md:gap-4">
        <section className="flex-shrink-0"> 
          <Category />
        </section>
        <section className="w-full overflow-hidden">
          <div>
            <Banner />
          </div>
          {/* header tex here  */}
          <section>
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
          </section>
          {/* offer image  */}
          <section className="flex gap-4">
            <div className="w-full aspect-auto">
              <Image
                src={"/offer/1.jpg"}
                width={1000}
                height={1000}
                alt="loading..."
                className="w-full rounded-md"
              />
            </div>
            <div className="w-full aspect-auto">
              <Image
                src={"/offer/2.jpg"}
                width={1000}
                height={1000}
                alt="loading..."
                className="w-full rounded-md"
              />
            </div>
          </section>
          {/* header text  */}
          <section>
            {" "}
            <div className="flex justify-between items-center">
              <HomePageHeaderText>
                Hot Product <span className="text-primary ">Nearby</span>
              </HomePageHeaderText>
              <div className="  text-sm md:text-base leading-[18px] text-[#222222]">
                <span>View All</span>
              </div>
            </div>
            <div className="grid grid-cols-1 xs:grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-3">
              {productList?.map((product, idx) => (
                <SingleCart product={product} key={idx} />
              ))}
            </div>
          </section>
        </section>
      </div>
    </div>
  );
}
