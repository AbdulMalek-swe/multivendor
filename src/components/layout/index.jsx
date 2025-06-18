import { useCart } from "@/hooks/cart/useCart";

export const LayoutPageWrapper = ({ children }) => {
  const { cart } = useCart();
  return (
    <section>
      <div>cart length {cart?.length}</div>
      <main className="flex-grow">{children}</main>
    </section>
  );
};
