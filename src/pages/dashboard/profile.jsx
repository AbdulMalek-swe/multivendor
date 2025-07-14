import React, { useState } from "react";
import { useAuth } from "@/context/AuthContext";
import { maskPhone } from "@/utils/utils";
import useAddress from "@/hooks/api/address/useAddress";
import Drawer from "react-modern-drawer";
import EditAddress from "@/components/address/EditAddress";
import useOrder from "@/hooks/api/order/useOrder";
import ManageAccountSkeleton from "@/components/loader/skeleton/AccountSkeleton/ManageAccountSkeleton";
import { flattenOrders } from "@/utils/flattenAddress";
import DashboardLayout from "@/components/layout/DashboardLayout/DashboardLayout";
import Modal from "@/components/ui/modal";
import Profile from "@/components/auth/Profile";
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
  const flatData = flattenOrders(order);
  // formate date
  function formatDate(isoDate) {
    const date = new Date(isoDate);
    const day = String(date.getDate()).padStart(2, "0");
    const month = String(date.getMonth() + 1).padStart(2, "0"); // getMonth is 0-indexed
    const year = date.getFullYear();
    return `${day}/${month}/${year}`;
  }
  const [isOpen,setIsOpen] = useState(false)
  return (
    <>
      <Modal isOpen={isOpen} onClose={()=>setIsOpen(false)}>
        <Profile />
      </Modal>
      {loading ? (
        <ManageAccountSkeleton />
      ) : (
        <div className="   mx-auto text-[#030712] border-[#E5E7EB]">
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
            <div className="bg-white shadow p-5 rounded border border-[#E5E7EB]">
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-lg font-medium">Personal Profile</h3>
                <button className="text-blue-600 text-sm" onClick={()=>setIsOpen(!isOpen)}>EDIT</button>
              </div>
              <p className="mb-1">{user?.name}</p>
              <p className="mb-3">{maskPhone(user?.phone)}</p>
              <span className="inline-block bg-blue-100 text-blue-700 text-xs font-medium px-2 py-1 rounded-full">
                Verified
              </span>
            </div>

            {/* Address Book */}
            <div className="bg-white shadow p-5 rounded border border-[#E5E7EB] col-span-1 md:col-span-2">
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
                  {flatData.map((orderItem) => (
                    <tr className="border-b border-[#E5E7EB] hover:bg-gray-50">
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
    </>
  );
};
MyAccount.getLayout = function getLayout(page) {
  return <DashboardLayout>{page}</DashboardLayout>;
};

export default MyAccount;
