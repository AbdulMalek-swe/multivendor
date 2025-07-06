import { LayoutPageWrapper } from "@/components/layout";
import { AuthProvider } from "@/context/AuthContext";
import { CartProvider } from "@/context/CartContext";
import { DeleteModalProvider } from "@/context/DeleteModalContext";
import "@/styles/globals.css";
import { Poppins, Roboto } from "next/font/google";
import { Toaster } from "sonner";

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
    <AuthProvider>
    <DeleteModalProvider>
      <CartProvider> 
        <main className={`  ${roboto.variable} ${poppins.variable}  `}>
          <LayoutPageWrapper>
            <Component {...pageProps} />
            <Toaster
              position="top-right"
              richColors
              closeButton
              visibleToasts={9}
              toastOptions={{
                style: {
                  borderRadius: "10px",
                  padding: "14px",
                },
              }}
            />
          </LayoutPageWrapper>
        </main>
      </CartProvider>
    </DeleteModalProvider>
    </AuthProvider>
  );
}
