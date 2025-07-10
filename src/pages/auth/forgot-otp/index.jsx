import AuthLayout from "@/components/auth/AuthLayout";
import Button from "@/components/ui/Button";
import React, { useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { login } from "@/lib/api/auth/auth";
import { networkErrorHandeller, responseHandler } from "@/utils/helpers";
import { useRouter } from "next/router";
import { notifySuccess } from "@/utils/toast";
import { useAuth } from "@/context/AuthContext";
import Link from "next/link";
import { ROUTES } from "@/constants/route";
import OtpInput from "react-otp-input";
const VerifyOtp = () => {
  const router = useRouter(); 
  const [success, setSuccess] = useState({
    loading: false,
    success: false,
  });
  // hook form use
  const { 
    handleSubmit,
    formState: { errors }, 
    control,
  } = useForm({
    defaultValues: {
      otp: "XXXX",
    },
  });
  const onSubmit = async (data) => { 
    // setSuccess({
    //   ...success,
    //   loading: true,
    // });

    // login api integrate here
    // try {
    //   const response = await login(loginData);
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
    // } catch (error) {
    //   networkErrorHandeller(error);
    //    setSuccess({
    //       loading: false,
    //       success: false,
    //     });
    // }
  };
  const [otp, setOtp] = useState("");
  //   console.log(otp, "---");
  return (
    <AuthLayout
      onsubmit={handleSubmit(onSubmit)}
      link={
        <div className="flex flex-col items-center font-normal text-sm md:text-[15px]">
          <p>Didn&apos;t get the OTP</p>
          <Link href={ROUTES?.REGISTER} aria-label="bajar.net" className="hover:underline">
            {" "}
            Resend Now
          </Link>
        </div>
      }
      text="Verify your phone number"
    >
      <div className=" flex flex-col items-center justify-center">
        <p className="text-center pt-8 pb-5 font-normal">
          We have sent an OTP to your phone number <br />
          <span className="font-semibold text-white text-[15px]">
            +8801811017801
          </span>
        </p>
        <p className="text-center text-white font-semibold text-[15px]">
          Enter OTP number*
        </p>
        <Controller
          name="otp"
          control={control}
          render={({ field, fieldState }) => (
            <OtpInput
              value={field.value}
              onChange={field.onChange}
              numInputs={4}
              renderSeparator={<span></span>}
              renderInput={(props) => (
                <input
                  defaultValue="X"
                  {...props}
                  
                  style={{
                    width: "4rem",
                    height: "4rem",
                    margin: "0.25rem",
                    borderRadius: "0.5rem",
                    outline: "none",
                    backgroundColor: "#fff",
                    textAlign: "center",
                    fontSize: "2rem",
                    border: "1px solid #ccc",
                  }}
                />
              )}
            />
          )}
        />

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
