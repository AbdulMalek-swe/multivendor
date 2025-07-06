import AuthLayout from "@/components/auth/AuthLayout";
import Button from "@/components/ui/Button";
import { PasswordInput, TextInput } from "@/components/ui/Input";
import React from "react";
import { useForm } from "react-hook-form";
import { CiLock, FiPhone } from "@/icons";
import { validateEmailPhone, validatePassword } from "@/utils/validation";
import { login } from "@/lib/api/auth/auth";
import { networkErrorHandeller, responseHandler } from "@/utils/helpers";
import { useRouter } from "next/router";
import { notifySuccess } from "@/utils/toast";
import { useAuth } from "@/context/AuthContext";

const Login = () => {
  const router = useRouter();
  const { login: userLogin } = useAuth();

  // hook form use
  const {
    register,
    handleSubmit,
    formState: { errors },
    trigger,
  } = useForm();
  const onSubmit = async (data) => {
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
    <AuthLayout onsubmit={handleSubmit(onSubmit)} icon>
      <TextInput
        register={register}
        name="email"
        label={
          <p className="px-3 flex items-center text-white gap-2 font-semibold text-sm ">
            {" "}
            <FiPhone /> Phone Number or E-mail{" "}
          </p>
        }
        rules={validateEmailPhone}
        errors={errors}
        trigger={trigger}
      />
      <PasswordInput
        register={register}
        name="password"
        label={
          <p className="px-3 flex items-center text-white gap-2 font-semibold text-sm ">
            {" "}
            <CiLock /> Password{" "}
          </p>
        }
        rules={validatePassword}
        errors={errors}
        trigger={trigger}
      />

      <Button className="bg-white w-full rounded-lg  " type="submit">
        Submit
      </Button>
    </AuthLayout>
  );
};

export default Login;
