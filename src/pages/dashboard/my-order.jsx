import OrderSkeleton from "@/components/loader/skeleton/AccountSkeleton/OrderSkeleton";
import PageLayout from "@/components/ui/PageLayout";
import useOrder from "@/hooks/api/order/useOrder"; 
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";

const MyOrder = () => {
  const tabs = ["All", "To Pay", "To Ship", "To Receive", "To Review"];
  const router = useRouter();
  const { tab } = router.query;
  const [activeTab, setActiveTab] = useState("All");
  //  order fetch
  const { data: order, loading } = useOrder();
  // Set tab from query on mount
  useEffect(() => {
    if (tab && tabs.includes(tab)) {
      setActiveTab(tab);
    }
  }, [tab]);

  // Update URL query on tab change
  const handleTabChange = (tabName) => {
    setActiveTab(tabName);
    router.push(
      {
        pathname: router.pathname,
        query: { ...router.query, tab: tabName },
      },
      undefined,
      { shallow: true }
    );
  };

  //   order fetch code here

  const orderItemStructure = order?.map((order) => {
    return {};
  });
  return (
    <PageLayout>
      {loading ? (
        <OrderSkeleton />
      ) : (
        <div className="bg-[#f3f4f6] min-h-screen p-5 rounded-2xl text-[#030712] border-[#E5E7EB]">
          <div className="border-b text-[#030712] border-[#E5E7EB] mb-4">
            <h2 className="text-xl font-semibold   mb-2">
              My Orders
            </h2>
            <ul className="flex space-x-4 text-sm font-medium  ">
              {tabs.map((tab) => (
                <li
                  key={tab}
                  onClick={() => handleTabChange(tab)}
                  className={`pb-2 cursor-pointer ${
                    activeTab === tab
                      ? "border-b-2   text-[#030712] border-[#E5E7EB]"
                      : "hover:text-blue-600"
                  }`}
                >
                  {tab}
                </li>
              ))}
            </ul>
          </div>
          {/* <div className="mb-4">
          <input
            type="text"
            placeholder="Search by seller name, order ID or product name"
            className="w-full px-4 py-2 bg-gray-100 rounded-md border border-gray-300 text-sm focus:outline-none focus:ring-1 focus:ring-blue-500"
          />
        </div> */}
          {order?.map((item, idx) =>
            item?.sub_orders?.map((newItem) =>
              newItem?.items?.map((newOrder, id) => (
                <div
                  className="bg-white rounded-md border border-[#E5E7EB] p-4 shadow-sm mt-2"
                  key={id}
                >
                  <div className="flex justify-between items-center mb-2">
                    <div className="text-sm font-medium text-gray-800 uppercase">
                      {newItem?.vendor?.company_name} 
                    </div>
                    <span className="px-3 py-1 text-xs rounded-full bg-blue-100 text-blue-600 font-semibold">
                      {item?.order_status}
                    </span>
                  </div>

                  <div className="flex justify-between items-start space-x-4 border-t border-[#E5E7EB] pt-4">
                    <div className="flex gap-1">
                      {" "}
                      <img
                        src={`${process?.env.NEXT_PUBLIC_API_SERVER}${newOrder?.product?.thumbnail}`}
                        alt="product"
                        className="w-20 h-20 object-cover rounded"
                      />
                      <div className="flex-1 text-sm text-gray-700">
                        <div className="font-medium mb-1 line-clamp-2">
                          {newOrder?.product?.product_name}
                        </div>
                        <div className="text-xs text-gray-500 line-clamp-1">
                          {newOrder?.product?.short_description}
                        </div>
                      </div>
                    </div>
                    <div className="text-right text-sm text-gray-800 shrink-0">
                      <div>৳ {Math.ceil(newOrder?.total)}</div>
                    </div>
                    <div className="text-right text-sm text-gray-800 shrink-0">
                      <div className="text-xs text-gray-600   ">
                        Qty: {Math.ceil(newOrder?.quantity)}
                      </div>
                    </div>
                  </div>
                </div>
              ))
            )
          )}
        </div>
      )}
    </PageLayout>
  );
};

export default MyOrder;
