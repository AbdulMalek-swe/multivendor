import Banner from "@/components/banner/Banner";
import Category from "@/components/category/Category";
import SingleCart from "@/components/card/SingleCart";
import SingleShopCard from "@/components/card/SingleShopCard";
import HomePageHeaderText from "@/components/ui/HomePageHeaderText";
import Image from "next/image";
import Link from "next/link";
import { ROUTES } from "@/constants/route";
import { spcialOffer } from "@/constants/serviceSpecialOffer";
import useShop from "@/hooks/api/Shop/useShop"; 
import useGeolocation from "@/hooks/Location/useGeoLocation";
import useProduct from "@/hooks/api/Product/useProduct";
export default function Home() {
  const { latLng } = useGeolocation();
  // shop list
  const { data: shopList } = useShop(latLng);
  // product list
  const { data: productList } = useProduct();
  return (
    <div className=" container mx-auto space-y-2 sm:space-y-4 md:space-y-6 lg:space-y-8 pb-4  ">
      {/* catgory and banner section  */}
      <section className="flex gap-4">
        <div className="hidden md:block md:w-4/12 lg:w-3/12 ">
          <Category />
          <Image
            src="/homeImage/1.png"
            width={1000}
            height={1000}
            className="mb-2"
          />
          <Image src="/homeImage/2.png" width={1000} height={1000} />
        </div>
        {/* product and banner section  */}
        <div className="w-full md:w-8/12 lg:w-9/12 ">
          <div>
            <Banner />
            <div className="pt-4 sm:pt-8 md:pt-10">
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
            <div className="lg:pt-3">
              <div className="grid grid-cols-1 xs:grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3">
                {productList?.map((product, idx) => (
                  <SingleCart product={product} key={idx} />
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>
      {/* offer image  */}
      <section className="  ">
        {/* offer image  */}
        <div className="flex gap-4">
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
        </div>
      </section>
      {/* 2nd product and shop show field  */}
      <section className="flex gap-4   ">
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
      </section>
      {/* special service section  */}
      <section className="  gap-4 hidden md:gap-3 lg:gap-5   grid-cols-1 md:grid lg:grid-cols-4  md:grid-cols-2   ">
        {spcialOffer.map((item) => (
          <div
            key={item?.logo}
            className="flex gap-4 items-center rounded-xl justify-center py-5 shadow-custom"
          >
            <Image height={40} width={40} src={item?.logo} alt="authentic" />
            <div>
              <p className="text-base font-bold text-[#030712]">
                {item?.title}
              </p>
              <p className="text-xs text-[#6B7280] ">{item?.comment}</p>
            </div>
          </div>
        ))}
      </section>
    </div>
  );
}
