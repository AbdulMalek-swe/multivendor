import React from "react";
import AccountSidebar from "./ProfileSidebar";
import PageLayout from "@/components/ui/PageLayout";

const DashboardLayout = ({ children }) => {
  return (
    <PageLayout>
      <section className="flex gap-2 lg:gap-3">
        {" "}
        <AccountSidebar />
      <div className="w-full">
          {children}
      </div>
      </section>
    </PageLayout>
  );
};

export default DashboardLayout;
