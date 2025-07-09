import React from "react";
import { useAuth } from "@/context/AuthContext";
import { maskPhone } from "@/utils/utils";

const MyAccount = () => {
  const { user } = useAuth();
  return (
    <div className="p-6 max-w-7xl mx-auto text-black">
      <h2 className="text-2xl font-semibold mb-6">Manage My Account</h2>
      {/* Profile & Address Section */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-10">
        {/* Personal Profile */}
        <div className="bg-white shadow p-5 rounded border">
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-lg font-medium">Personal Profile</h3>
            <button className="text-blue-600 text-sm">EDIT</button>
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
            <button className="text-blue-600 text-sm">EDIT</button>
          </div>
          <div className="flex flex-col md:flex-row justify-between gap-6">
            {/* Shipping Address */}
            <div>
              <h4 className="text-sm font-semibold text-gray-600 mb-1">
                DEFAULT SHIPPING ADDRESS
              </h4>
              <p className="font-semibold">sdf</p>
              <p>sfdasadfs</p>
              <p>Barishal - Barishal - Hizla - Barajalia Sadar</p>
              <p>(+880) 1988773434</p>
            </div>

            {/* Billing Address */}
            <div>
              <h4 className="text-sm font-semibold text-gray-600 mb-1">
                DEFAULT BILLING ADDRESS
              </h4>
              <p className="font-semibold">sdf</p>
              <p>sfdasadfs</p>
              <p>Barishal - Barishal - Hizla - Barajalia Sadar</p>
              <p>(+880) 1988773434</p>
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
                <th className="p-3 font-semibold">Action</th>
              </tr>
            </thead>
            <tbody>
              <tr className="border-b hover:bg-gray-50">
                <td className="p-3">644077182626198</td>
                <td className="p-3">19/07/2023</td>
                <td className="p-3">
                  <div className="flex gap-1">
                    {[1, 2, 3, 4].map((_, idx) => (
                      <img
                        key={idx}
                        src="/sample-product.jpg" // Replace with real images
                        alt="item"
                        className="w-8 h-8 object-cover rounded"
                      />
                    ))}
                  </div>
                </td>
                <td className="p-3">৳ 2,754</td>
                <td className="p-3 text-blue-600 font-medium cursor-pointer">
                  MANAGE
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default MyAccount;
