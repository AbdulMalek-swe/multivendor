import Footer from "./Footer";
import Navbar from "./Navbar";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
export const LayoutPageWrapper = ({ children }) => {
  return (
    <section>
      <Navbar />
      <main className="flex-grow">{children}</main>
      <Footer />
    </section>
  );
};
