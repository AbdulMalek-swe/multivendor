import React, { useState } from "react";
import { useAuth } from "@/context/AuthContext";
import { maskPhone } from "@/utils/utils";
import useAddress from "@/hooks/api/address/useAddress";
import Drawer from "react-modern-drawer";
import EditAddress from "@/components/address/EditAddress";
import useOrder from "@/hooks/api/order/useOrder";
import PageLayout from "@/components/ui/PageLayout";
import ManageAccountSkeleton from "@/components/loader/skeleton/AccountSkeleton/ManageAccountSkeleton";
const MyAccount = () => {
  const { user } = useAuth();
  const { data: addressData, loading } = useAddress();
  const defaultAddress = addressData?.find(
    (item) => item?.default_address == 1
  );
  // address edit area code
  const [openDrawer, setOpenDrawer] = useState(false);
  const [openType, setOpenType] = useState("");
  const handleOpenDrawer = () => {
    setOpenType("default");
    setOpenDrawer(!openDrawer);
  };
  // order find recently order
  const { data: order, loading: orderLoading } = useOrder();
  console.log(order, "----------->order complete");
  function flattenOrders(orderList) {
    const result = [];

    orderList?.forEach((order) => {
      const orderStatus = order?.order_status;
      const orderId = order?.id;
      const shippingCost = parseFloat(order?.shipping_cost || 0);
      const create = order?.created_at;
      order?.sub_orders?.forEach((subOrder) => {
        const vendor = subOrder?.vendor;
        const vendorName = vendor?.company_name;
        const subOrderId = subOrder?.id;
        subOrder?.items?.forEach((item) => {
          result.push({
            order_id: orderId,
            sub_order_id: subOrderId,
            order_status: orderStatus,
            vendor_name: vendorName,
            product_id: item?.product_id,
            product_name: item?.product?.product_name,
            product_description: item?.product?.short_description,
            quantity: item?.quantity,
            total: parseFloat(item?.total),
            price: parseFloat(item?.price),
            shipping_cost: shippingCost,
            image: `${process.env.NEXT_PUBLIC_API_SERVER}${item?.product?.thumbnail}`,
            product_images: item?.product?.product_image,
            created_at: create,
          });
        });
      });
    });

    return result;
  }
  const flatData = flattenOrders(order);
  console.log(flatData, "--=");
  // formate date
  function formatDate(isoDate) {
    const date = new Date(isoDate);
    const day = String(date.getDate()).padStart(2, "0");
    const month = String(date.getMonth() + 1).padStart(2, "0"); // getMonth is 0-indexed
    const year = date.getFullYear();
    return `${day}/${month}/${year}`;
  }

  return (
    <PageLayout>
      {" "}
      {loading ? (
        <ManageAccountSkeleton />
      ) : (
        <div className=" max-w-7xl mx-auto text-black">
          <Drawer
            open={openDrawer}
            onClose={handleOpenDrawer}
            direction="right"
            style={{
              width: "100%",
              maxWidth: "450px",
            }}
            className="w-full sm:w-[450px]"
          >
            {" "}
            {openType === "edit" && (
              <EditAddress
                refetch={() => {}}
                setOpenDrawer={setOpenDrawer}
                addressId={defaultAddress?.id}
              />
            )}
          </Drawer>

          <h2 className="text-2xl font-semibold mb-6">Manage My Account</h2>
          {/* Profile & Address Section */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-10">
            {/* Personal Profile */}
            <div className="bg-white shadow p-5 rounded border">
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-lg font-medium">Personal Profile</h3>
                {/* <button className="text-blue-600 text-sm">EDIT</button> */}
              </div>
              <p className="mb-1">{user?.name}</p>
              <p className="mb-3">{maskPhone(user?.phone)}</p>
              <span className="inline-block bg-blue-100 text-blue-700 text-xs font-medium px-2 py-1 rounded-full">
                Verified
              </span>
            </div>

            {/* Address Book */}
            <div className="bg-white shadow p-5 rounded border col-span-1 md:col-span-2">
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-lg font-medium">Address Book</h3>
                <button
                  className="text-blue-600 text-sm"
                  onClick={() => {
                    setOpenType("edit");
                    setOpenDrawer(true);
                  }}
                >
                  EDIT
                </button>
              </div>
              <div className="flex flex-col md:flex-row justify-between gap-6">
                {/* Shipping Address */}
                <div>
                  <h4 className="text-sm font-semibold text-gray-600 mb-1">
                    DEFAULT SHIPPING ADDRESS
                  </h4>

                  <p className="font-semibold">{defaultAddress?.name}</p>
                  <p className="font-semibold">{defaultAddress?.adress_lin1}</p>
                  <p>
                    {defaultAddress?.division?.name} -{" "}
                    {defaultAddress?.city?.name} - {defaultAddress?.area?.name}
                  </p>
                  <p>(+88) {defaultAddress?.phone}</p>
                </div>

                {/* Billing Address */}
                <div>
                  <h4 className="text-sm font-semibold text-gray-600 mb-1">
                    DEFAULT BILLING ADDRESS
                  </h4>

                  <p className="font-semibold">{defaultAddress?.name}</p>
                  <p className="font-semibold">{defaultAddress?.adress_lin1}</p>
                  <p>
                    {defaultAddress?.division?.name} -{" "}
                    {defaultAddress?.city?.name} - {defaultAddress?.area?.name}
                  </p>
                  <p>(+88) {defaultAddress?.phone}</p>
                </div>
              </div>
            </div>
          </div>

          {/* Recent Orders */}
          <div className="bg-white shadow p-5 rounded border">
            <h3 className="text-lg font-medium mb-4">Recent Orders</h3>
            <div className="overflow-auto">
              <table className="min-w-full text-left text-sm border-t">
                <thead>
                  <tr className="border-b bg-gray-100">
                    <th className="p-3 font-semibold">Order #</th>
                    <th className="p-3 font-semibold">Placed On</th>
                    <th className="p-3 font-semibold">Items</th>
                    <th className="p-3 font-semibold">Total</th>
                    {/* <th className="p-3 font-semibold">Action</th> */}
                  </tr>
                </thead>
                <tbody>
                  {flatData.map((orderItem) => (
                    <tr className="border-b hover:bg-gray-50">
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
            </div>
          </div>
        </div>
      )}
    </PageLayout>
  );
};

export default MyAccount;
