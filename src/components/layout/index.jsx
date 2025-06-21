 import Link from "next/link";
import Navbar from "../navbar/Navbar";

export const LayoutPageWrapper = ({ children }) => {
  
  return (
    <section>
      <Navbar/> 
      <main className="flex-grow">{children}</main>
    </section>
  );
};
