/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { useState } from 'react';
import { FieldValues, SubmitHandler, useForm } from 'react-hook-form';
import Image from 'next/image';
import backgroundImg from '@/assests/bannerImg.jpg';
import logo from '@/assests/YL 2.png';
import { FcGoogle } from 'react-icons/fc';
import { FaApple } from 'react-icons/fa';
import { AiOutlineEyeInvisible } from 'react-icons/ai';
import { RiEyeCloseLine } from 'react-icons/ri';
import Link from 'next/link';
import { message } from 'antd';
import { useLoginMutation } from '@/redux/features/auth/authApi';
import { useAppDispatch } from '@/redux/hooks';
import { useRouter, useSearchParams } from 'next/navigation';
import { setCookie } from 'nookies';
import { setUser } from '@/redux/features/auth/authSlice';
import { verifyToken } from '@/utils/verifyToken';

const SigninPage = () => {
  const [showPassword, setShowPassword] = useState(false);

  const [login] = useLoginMutation();
  // eslint-disable-next-line no-unused-vars
  const [loading, setLoading] = useState(false);
  const dispatch = useAppDispatch();
  const router = useRouter();
  interface UserInfo {
    [key: string]: any;
  }

  const setUserCookie = (userInfo: UserInfo): void => {
    setCookie(null, "user", JSON.stringify(userInfo), {
      maxAge: 60 * 60 * 24 * 7, // 7 days
      path: "/",
    });
  };
  const searchParams = useSearchParams();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const handleSignin: SubmitHandler<FieldValues> = async (data) => {
    const redirect = searchParams.get("redirectPath");
    try {
      const res = await login(data).unwrap();
      setLoading(true);
      const user = verifyToken(res.data.accessToken);
      const modifiedUser = { email: data?.email, user: user };
      dispatch(setUser({ user: modifiedUser, token: res.data.accessToken }));
      setUserCookie(res.data.accessToken);
      setLoading(false);

      message.success(res.message);

      if (redirect) {
        router.push(redirect);
      } else {
        router.push("/homepage");
      }
    } catch (error) {
      message.error(error?.data?.message || "Something went wrong");
      console.error("Error:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="relative h-screen w-full">
      {/* Background Image */}
      <Image
        src={backgroundImg}
        alt="Background"
        layout="fill"
        objectFit="cover"
        objectPosition="center"
        priority
      />

      {/* Overlay */}
      <div className="absolute inset-0 flex items-center justify-center p-4 sm:p-8 md:p-12 lg:p-16">
        {/* Login Box */}
        <div className="bg-white bg-opacity-70 px-8 py-6 sm:px-16 sm:py-10 md:px-24 md:py-12 rounded-md shadow-md  max-w-full text-center">
          {/* Logo and Title */}
          <div className="flex items-center justify-center mb-6 space-x-2">
            <Image
              src={logo}
              alt="Logo"
              width={120}
              height={60}
              className="sm:w-32 sm:h-16 md:w-44 md:h-22"
            />
            <div className="text-blue-600 font-semibold text-lg sm:text-2xl md:text-3xl lg:text-4xl">
              Your Trade Source
            </div>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit(handleSignin)} className="space-y-5">
            <div>
              <input
                type="email"
                placeholder="Email"
                {...register("email", {
                  required: "Email is required",
                  pattern: {
                    value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                    message: "Invalid email format",
                  },
                })}
                className="w-full p-2.5 rounded border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              {errors.email && (
                <p className="text-red-600 text-sm mt-1">
                  {errors.email.message.toString()}
                </p>
              )}
            </div>

            <div className="relative">
              <input
                type={showPassword ? "text" : "password"}
                placeholder="Password"
                {...register("password", { required: "Password is required" })}
                className="w-full p-2.5 rounded border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute top-1/2 right-3 -translate-y-1/2 text-gray-600"
                aria-label={showPassword ? "Hide password" : "Show password"}
              >
                {showPassword ? (
                  <AiOutlineEyeInvisible size={22} />
                ) : (
                  <RiEyeCloseLine size={22} />
                )}
              </button>
              {errors.password && (
                <p className="text-red-600 text-sm mt-1">
                  {errors.password.message.toString()}
                </p>
              )}
            </div>

            {/* Remember and Forgot */}
            <div className="flex items-center justify-between text-sm text-left">
              <label className="flex items-center space-x-2 select-none">
                <input
                  type="checkbox"
                  {...register("remember")}
                  className="w-4 h-4"
                />
                <span>Remember password</span>
              </label>
              <Link
                href="/forgotPass"
                className="text-blue-600 hover:underline"
              >
                Forgot password?
              </Link>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              className="w-full bg-blue-600 text-white py-3 rounded hover:bg-blue-700 transition"
            >
              Sign In
            </button>
          </form>

          {/* Alternative Sign-ins */}
          <div className="my-6 text-gray-700 font-semibold">Or</div>

          <div className="flex flex-col gap-3 sm:flex-row sm:gap-4">
            <button className="flex-1 flex items-center justify-center gap-2 border py-2 drop-shadow bg-white rounded-xl hover:bg-gray-100 transition">
              <FcGoogle size={22} />
              Sign in with Google
            </button>
            <button className="flex-1 flex items-center justify-center gap-2 border py-2 drop-shadow bg-white rounded-xl hover:bg-gray-100 transition">
              <FaApple size={20} />
              Sign in with Apple
            </button>
          </div>

          {/* Terms */}
          <p className="text-xs text-black mt-6 px-2 sm:px-4">
            By signing in you agree to our Terms of Use and Privacy Policy
          </p>
        </div>
      </div>
    </div>
  );
};

export default SigninPage;
