import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";
import DashboardLayout from "@/components/layout/DashboardLayout/DashboardLayout";
import OrderSkeleton from "@/components/loader/skeleton/AccountSkeleton/OrderSkeleton";
import PageLayout from "@/components/ui/PageLayout";
import useOrder from "@/hooks/api/order/useOrder";
import { flattenOrders } from "@/utils/flattenOrder";
import { formatDate } from "@/utils/utils";
import Pagination from "@/components/ui/Pagination";

const MyOrder = () => {
  const tabs = [
    "All",
    "Pending",
    "Processing",
    "Shipped",
    "Delivered",
    "Cancelled",
  ];
  const router = useRouter();
  const { tab } = router.query;
  const [activeTab, setActiveTab] = useState("All");
  const [page, setPage] = useState(1);
  //  order fetch
  const { data: order, loading } = useOrder({
    per_page: 12,
    page: page,
  });
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
  const flatData = flattenOrders(order?.data);
  return (
    <>
      {loading ? (
        <>
          {Array.from({ length: 9 }).map((_, idx) => (
            <OrderSkeleton key={idx} />
          ))}
        </>
      ) : (
        <div className="bg-[#f3f4f6] min-h-screen p-5 rounded-2xl text-[#030712] border-[#E5E7EB]">
          <div className="border-b text-[#030712] border-[#E5E7EB] mb-4">
            <h2 className="text-xl font-semibold   mb-2">My Orders</h2>
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
          <div className="bg-white shadow p-5 rounded border border-[#E5E7EB]">
            <h3 className="text-lg font-medium mb-4">Recent Orders</h3>
            <div className="overflow-auto">
              <table className="min-w-full text-left text-sm border-t border-[#E5E7EB] overflow-scroll">
                <thead>
                  <tr className="border-b border-[#E5E7EB] bg-gray-100">
                    <th className="p-3 font-semibold">Order #</th>
                    <th className="p-3 font-semibold">Placed On</th>
                    <th className="p-3 font-semibold">Items</th>
                    <th className="p-3 font-semibold">Total</th>
                    {/* <th className="p-3 font-semibold">Action</th> */}
                  </tr>
                </thead>
                <tbody>
                  {flatData.map((orderItem, idx) => (
                    <tr
                      className="border-b border-[#E5E7EB] hover:bg-gray-50"
                      key={idx}
                    >
                      <td className="p-3">#{orderItem?.order_id}</td>
                      <td className="p-3">
                        {" "}
                        {formatDate(orderItem?.created_at)}
                      </td>
                      <td className="p-3">
                        <div className="flex gap-1">
                          {orderItem?.product_images?.map((itm, idx) => (
                            <img
                              key={idx}
                              src={`${process.env.NEXT_PUBLIC_API_SERVER}${itm}`}
                              alt="loading"
                              className="w-8 h-8 object-cover rounded"
                            />
                          ))}
                        </div>
                      </td>
                      <td className="p-3">৳ {orderItem?.total}</td>
                      {/* <td className="p-3 text-blue-600 font-medium cursor-pointer">
                      MANAGE
                    </td> */}
                    </tr>
                  ))}
                </tbody>
              </table>
              <Pagination
                totalPage={order?.last_page}
                page={page}
                setPage={setPage}
              />
            </div>
          </div>
        </div>
      )}
    </>
  );
};
MyOrder.getLayout = function getLayout(page) {
  return <DashboardLayout>{page}</DashboardLayout>;
};
export default MyOrder;
