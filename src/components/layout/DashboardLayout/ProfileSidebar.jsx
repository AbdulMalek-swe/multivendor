import {
  FaUser,
  FaBoxOpen,
  FaSignOutAlt,
  MdOutlineLocationOn,
  MdCancel,
  BiRefresh,
} from "@/icons";
import { useAuth } from "@/context/AuthContext"; 
import Link from "next/link";
import { ROUTES } from "@/constants/route";
export default function AccountSidebar() {
  const { user } = useAuth();
  return (
    <div className="shrink-0 p-4 border rounded-md shadow-sm bg-white">
      <div className="mb-4">
        <p className="text-gray-600 text-sm">Hello,</p>
        <p className="font-semibold text-gray-800"> {user?.name} </p>
        <span className="inline-block mt-1 text-xs text-green-600 bg-green-100 px-2 py-0.5 rounded-full">
          Verified Account
        </span>
      </div>

      <div className="space-y-3 text-sm">
        <div>
          <h1 className="text-gray-700 font-medium flex items-center gap-2">
            <FaUser className="text-gray-500" />
            Manage My Account
          </h1>
          <div className="ml-6 mt-1 space-y-2">
            <Link href={ROUTES?.ACCOUNT} className="text-pink-500 font-medium cursor-pointer">
              My Profile
            </Link>
            <Link href={ROUTES?.ADDRESS} className="text-gray-600 cursor-pointer flex items-center gap-1">
              <MdOutlineLocationOn />
              Addresses
            </Link>
          </div>
        </div>
        <div>
          <Link href={ROUTES?.ORDERS} className="text-gray-700 font-medium flex items-center gap-2">
            <FaBoxOpen className="text-gray-500" />
            My Orders
          </Link>
          <ul className="ml-6 mt-1 space-y-1">
            <li className="text-gray-600 cursor-pointer flex items-center gap-1">
              <BiRefresh />
              My Returns
            </li>
            <li className="text-gray-600 cursor-pointer flex items-center gap-1">
              <MdCancel />
              My Cancellation
            </li>
          </ul>
        </div>
        <div>
          <h1 className="text-gray-700 font-medium flex items-center gap-2 cursor-pointer">
            <FaSignOutAlt className="text-gray-500" />
            Logout
          </h1>
        </div>
      </div>
    </div>
  );
}
