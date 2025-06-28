import Banner from "@/components/banner/Banner";
import Category from "@/components/category/Category";
import SingleCart from "@/components/card/SingleCart";
import SingleShopCard from "@/components/card/SingleShopCard";
import HomePageHeaderText from "@/components/ui/HomePageHeaderText";
import { productList } from "@/constants/product";
import { shopList } from "@/constants/shopList";
import Image from "next/image";
import Link from "next/link";
import { ROUTES } from "@/constants/route";
export default function Home() {
  return (
    <div className=" container mx-auto  space-y-3 ">
      {/* catgory section  */}
      <div className="flex gap-4">
        <div className="hidden md:block md:w-4/12 lg:w-3/12 ">
          <Category />
          <Image src="/homeImage/1.png" width={1000} height={1000} className="mb-2" />
          <Image src="/homeImage/2.png" width={1000} height={1000} />
        </div>
        <div className="w-full md:w-8/12 lg:w-9/12 ">
          <div>
            <Banner />
            <div className="pt-8 md:pt-10">
              <div className="flex justify-between pb-2 md:pb-4">
                <HomePageHeaderText>
                  Nearest <span className="text-primary ">Shop Profile</span>
                </HomePageHeaderText>
                <div className="flex items-center gap-2 text-sm md:text-base leading-[18px] text-[#222222]">
                  <div className="flex items-center gap-2">
                    <img src="/icons/homeLocation.svg" alt="location icon" />
                    <span className="font-medium">Nearest Shops</span>
                  </div>
                  <Link
                    href={ROUTES.HOME}
                    className="flex items-center pl-6 cursor-pointer"
                  >
                    <span>View All</span>
                    <img src="/icons/leftArrow.svg" alt="location icon" />
                  </Link>
                </div>
              </div>
              <div className="grid grid-cols-1 xs:grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 ">
                {shopList?.map((shop, idx) => (
                  <SingleShopCard shop={shop} key={idx} />
                ))}
              </div>
            </div>
            <div className="pt-4 md:pt-6">
              <div className="flex justify-between items-center pb-2 md:pb-4">
                <HomePageHeaderText>
                  Hot Product <span className="text-primary ">Nearby</span>
                </HomePageHeaderText>
                <Link
                  href={ROUTES.HOME}
                  className="flex items-center pl-6 cursor-pointer"
                >
                  <span>View All</span>
                  <img src="/icons/leftArrow.svg" alt="location icon" />
                </Link>
              </div>
              <div className="grid grid-cols-1 xs:grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3">
                {productList?.map((product, idx) => (
                  <SingleCart product={product} key={idx} />
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
      <section className=" ">
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
      </section>
      {/* 2nd product show field  */}
      <div className="flex gap-4 pb-8">
        <div className="hidden md:block md:w-4/12 lg:w-3/12 ">
          {/* <Category /> */}
          <Image src="/homeImage/3.png" width={1000} height={1000} />
        </div>
        <div className="w-full md:w-8/12 lg:w-9/12 ">
          <div className=" ">
            <div className="flex justify-between items-center pb-2 md:pb-4">
              <HomePageHeaderText>
                Hot Product <span className="text-primary ">Nearby</span>
              </HomePageHeaderText>
              <Link
                href={ROUTES.HOME}
                className="flex items-center pl-6 cursor-pointer"
              >
                <span>View All</span>
                <img src="/icons/leftArrow.svg" alt="location icon" />
              </Link>
            </div>
            <div className="grid grid-cols-1 xs:grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3">
              {productList?.map((product, idx) => (
                <SingleCart product={product} key={idx} />
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
