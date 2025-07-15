import ResetPassword from '@/components/auth/ResetPassword';
import DashboardLayout from '@/components/layout/DashboardLayout/DashboardLayout';
import PageLayout from '@/components/ui/PageLayout';
import React from 'react';

const ChangePassword = () => {
    return (
        <PageLayout>
               <ResetPassword/>
        </PageLayout>
    );
};
ChangePassword.getLayout = function getLayout(page) {
  return <DashboardLayout>{page}</DashboardLayout>;
};
export default ChangePassword;