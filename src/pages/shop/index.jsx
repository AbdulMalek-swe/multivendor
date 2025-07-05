import SingleShopCard from "@/components/card/SingleShopCard";
import useShop from "@/hooks/api/Shop/useShop";
import useGeolocation from "@/hooks/Location/useGeoLocation";
import React from "react";

const Shop = () => {
  const { latLng } = useGeolocation();
  // shop list
  const { data: shopList } = useShop(latLng);
  return (
    <div>
      <div className="grid grid-cols-1 xs:grid-cols-1 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-3 ">
        {shopList?.map((shop, idx) => (
          <SingleShopCard shop={shop} key={idx} />
        ))}
      </div>
    </div>
  );
};

export default Shop;
