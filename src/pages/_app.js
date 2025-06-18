import { LayoutPageWrapper } from "@/components/layout";
import { CartProvider } from "@/context/CartContext";
import { ProductProvider } from "@/context/ProductContext";
import { useCart } from "@/hooks/cart/useCart";
import "@/styles/globals.css";
import { Poppins, Roboto } from "next/font/google";

const roboto = Roboto({
  subsets: ["latin"],
  weight: ["400", "700"],
  variable: "--font-roboto",
});

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-poppins",
});
export default function App({ Component, pageProps }) {
  return (
    <ProductProvider>
      <CartProvider>
        {" "}
        <main className={`  ${roboto.variable} ${poppins.variable}  `}>
          <LayoutPageWrapper>
            <Component {...pageProps} />
          </LayoutPageWrapper>
        </main>
      </CartProvider>{" "}
    </ProductProvider>
  );
}
