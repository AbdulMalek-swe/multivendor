import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination } from "swiper/modules";
import Image from "next/image";
import { bannerList } from "@/constants/banner";
const Banner = () => {
  const pagination = {
    clickable: true,
    renderBullet: function (index, className) {
      return `<span class="dot ${className}"></span>`;
    },
  };
  return (
    <div className="w-full  h-full  ">
      <Swiper
        modules={[Pagination, Autoplay]}
        slidesPerView={1}
        loop
        autoplay={{ delay: 3000 }}
        pagination={pagination}
        className="custom-swiper"
      >
        {bannerList.map((banner, idx) => (
          <SwiperSlide key={idx} className="aspect-auto w-full  ">
            <Image
              src={banner}
              alt="Loading..."
              className="w-full object-cover rounded-lg"
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
