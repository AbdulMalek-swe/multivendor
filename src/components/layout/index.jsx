import Footer from "./Footer";
import Navbar from "./Navbar";

export const LayoutPageWrapper = ({ children }) => {
  return (
    <section>
      <Navbar />
      <main className="flex-grow">{children}</main>
      <Footer />
    </section>
  );
};
