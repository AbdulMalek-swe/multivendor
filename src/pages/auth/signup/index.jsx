import AuthLayout from "@/components/auth/AuthLayout";
import { TextInput } from "@/components/ui/Input";
import { ROUTES } from "@/constants/route";
import Link from "next/link";
import React, { useState } from "react";
import { useForm } from "react-hook-form"; 
import { validateEmailPhone, validateName } from "@/utils/validation";
import Button from "@/components/ui/Button";
import {  signup } from "@/lib/api/auth/auth";
import { networkErrorHandeller } from "@/utils/helpers";
const SignUp = () => {
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
    let signupData = { password: data?.password };
    if (isEmail) {
      signupData = { ...signupData, email: data.email };
    } else {
      signupData = { ...signupData, phone: data.email };
    }
    // login api integrate here
    try {
      const response = await signup(signupData);
      console.log(response,"------------------->");
    //   if (responseHandler(response)) {
    //     setSuccess({
    //       loading: false,
    //       success: true,
    //     });
    //     notifySuccess(response?.data?.message);
    //     userLogin(response?.data?.data?.token);
    //     router?.push(
    //       router?.query?.redirectTo ? router?.query?.redirectTo : "/"
    //     );
    //   }
    } catch (error) {
      networkErrorHandeller(error);
          setSuccess({
          loading: false,
          success: false,
        });
    }
  };

  return (
    <AuthLayout
      onsubmit={handleSubmit(onSubmit)} 
      text="Create your Baajar Account"
      link={
        <div className="flex items-center font-normal text-sm md:text-[15px]">
          {" "}
          Already have an account ?{" "}
          <Link href={ROUTES?.LOGIN} className="hover:underline">
            {" "}
            Sign In Now
          </Link>
        </div>
      }
      //   footer="Fogot Password?"
    >
      <TextInput
        register={register}
        name="name"
        label={
          <p className="px-3 flex items-center text-white gap-2 font-semibold text-sm ">
            {" "}
            Full Name{" "}
          </p>
        }
        rules={validateName}
        errors={errors}
        trigger={trigger}
        required={true}
      />
      <TextInput
        register={register}
        name="email"
        label={
          <p className="px-3 flex items-center text-white gap-2 font-semibold text-sm ">
            {" "}
            Phone Number or E-mail{" "}
          </p>
        }
        rules={validateEmailPhone}
        errors={errors}
        trigger={trigger}
      />
      <div className="font-normal text-sm lg:text-[15px] my-8">
        By clicking <span className="font-semibold">"SIGN UP"</span> I agree to <Link href={ROUTES?.TERMS_CONDITION} className="font-semibold hover:underline cursor-pointer">Terms of Use</Link> and <Link href={ROUTES?.PRIVACY_POLICY} className="font-semibold hover:underline cursor-pointer">Privacy Policy</Link>
      </div>
      <div className=" flex justify-center">
        <Button
          className="rounded-lg    font-bold !w-[188px]  !h-[48px]"
          type="submit"
          textSize="text-xs lg:text-sm"
          bgColor="bg-white"
          color="text-primary"
          isLoading={success?.loading}
          isSuccess={success?.success}
        >
          SIGN UP
        </Button>
      </div>
    </AuthLayout>
  );
};

export default SignUp;
