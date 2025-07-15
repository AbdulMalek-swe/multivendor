import ResetPassword from "@/components/auth/ResetPassword";
import DashboardLayout from "@/components/layout/DashboardLayout/DashboardLayout"; 
import React from "react";

const ChangePassword = () => {
  return <ResetPassword />;
};
ChangePassword.getLayout = function getLayout(page) {
  return <DashboardLayout>{page}</DashboardLayout>;
};
export default ChangePassword;
