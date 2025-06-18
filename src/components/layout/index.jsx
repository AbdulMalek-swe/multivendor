import { useCart } from "@/hooks/cart/useCart";
import Link from "next/link";

export const LayoutPageWrapper = ({ children }) => {
  const { cart } = useCart();
  return (
    <section>
      <Link href={"/service"} className="my-3 flex justify-end bg-red-600 text-white p-5  text-xl font-black font-poppins hover:underline">cart length {cart?.length}</Link>
      <main className="flex-grow">{children}</main>
    </section>
  );
};
