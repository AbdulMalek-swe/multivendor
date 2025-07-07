import AuthLayout from "@/components/auth/AuthLayout";
import Button from "@/components/ui/Button";
import { PasswordInput, TextInput } from "@/components/ui/Input";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { CiLock, FiPhone } from "@/icons";
import { validateEmailPhone, validatePassword } from "@/utils/validation";
import { login } from "@/lib/api/auth/auth";
import { networkErrorHandeller, responseHandler } from "@/utils/helpers";
import { useRouter } from "next/router";
import { notifySuccess } from "@/utils/toast";
import { useAuth } from "@/context/AuthContext";
import Link from "next/link";
import { ROUTES } from "@/constants/route";

const VerifyOtp = () => {
  const router = useRouter();
  const { login: userLogin } = useAuth();
  const [success, setSuccess] = useState({
    loading: false,
    success: false,
  });
  // hook form use
  const {
    register,
    handleSubmit,
    formState: { errors },
    trigger,
  } = useForm();
  const onSubmit = async (data) => {
    setSuccess({
      ...success,
      loading: true,
    });
    const isEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(data.email);
    let loginData = { password: data?.password };
    if (isEmail) {
      loginData = { ...loginData, email: data.email };
    } else {
      loginData = { ...loginData, phone: data.email };
    }
    // login api integrate here
    try {
      const response = await login(loginData);
      if (responseHandler(response)) {
        setSuccess({
          loading: false,
          success: true,
        });
        notifySuccess(response?.data?.message);
        userLogin(response?.data?.data?.token);
        router?.push(
          router?.query?.redirectTo ? router?.query?.redirectTo : "/"
        );
      }
    } catch (error) {
      networkErrorHandeller(error);
    }
  };

  return (
    <AuthLayout
      onsubmit={handleSubmit(onSubmit)}
      link={
        <div className="flex flex-col items-center font-normal text-sm md:text-[15px]">
          <p>Didn&apos;t get the OTP</p>  
          <Link href={ROUTES?.REGISTER} className="hover:underline">
            {" "}
           Resend Now
          </Link>
        </div>
      } 
      text="Verify your phone number"
    >
      <div className=" flex justify-center">
        <Button
          className="rounded-lg mt-8  font-bold !w-[188px]  !h-[48px]"
          type="submit"
          textSize="text-xs lg:text-sm"
          bgColor="bg-white"
          color="text-primary"
          isLoading={success?.loading}
          isSuccess={success?.success}
        >
          Verify
        </Button>
      </div>
    </AuthLayout>
  );
};

export default VerifyOtp;
