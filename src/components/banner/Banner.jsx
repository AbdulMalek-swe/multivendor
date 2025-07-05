import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination } from "swiper/modules";
import Image from "next/image";
import useBanner from "@/hooks/api/banner/useBanner";
const Banner = () => {
  const { data: bannerList, loading } = useBanner();
  const pagination = {
    clickable: true,
    renderBullet: function (index, className) {
      return `<span class="dot ${className}"></span>`;
    },
  };
  return (
    <div className="w-full  h-full max-h-[320px] overflow-hidden  ">
      <Swiper
        modules={[Pagination, Autoplay]}
        slidesPerView={1}
        loop
        autoplay={{ delay: 3000 }}
        pagination={pagination}
        className="custom-swiper"
      >
        {bannerList.map((banner, idx) => (
          <SwiperSlide key={idx} className="aspect-auto w-full h-full ">
            <Image
              src={`${process?.env.NEXT_PUBLIC_API_SERVER}${banner?.banner_image}`}
              alt="Loading..."
              className="w-full object-cover rounded-lg max-h-[320px]"
              width={1000}
              height={1000}
              priority
            />
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

export default Banner;
