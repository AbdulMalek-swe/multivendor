import SingleShopCard from "@/components/card/SingleShopCard";
import PageLayout from "@/components/ui/PageLayout";
import useShop from "@/hooks/api/Shop/useShop";
import React from "react";

const Shop = () => { 
  // shop list
  const { data: shopList } = useShop({isFetch:true});
  return (
    <PageLayout>
      <div className="grid grid-cols-1 xs:grid-cols-1 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-3 ">
        {shopList?.map((shop, idx) => (
          <SingleShopCard shop={shop} key={idx} />
        ))}
      </div>
    </PageLayout>
  );
};

export default Shop;
