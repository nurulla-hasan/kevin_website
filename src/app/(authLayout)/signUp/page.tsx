'use client';

import { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import Image from 'next/image';
import backgroundImg from '@/assests/bannerImg.jpg';
import logo from '@/assests/YL 2.png';
import { FcGoogle } from 'react-icons/fc';
import { FaApple } from 'react-icons/fa';
import { AiOutlineEyeInvisible } from 'react-icons/ai';
import { RiEyeCloseLine } from 'react-icons/ri';
import Link from 'next/link';
import PhoneInput from 'react-phone-input-2';
import 'react-phone-input-2/lib/style.css';
import { message } from 'antd';
import { useRouter } from 'next/navigation';
import { useSignUpMutation } from '@/redux/features/auth/authApi';

const SignUpPage = () => {
  const router = useRouter();
  const [showPassword, setShowPassword] = useState(false);
  const [phone, setPhone] = useState('');
  const [phoneError, setPhoneError] = useState('');
  const [signUp] = useSignUpMutation();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  // Validate phone length for BD (+880) only
  useEffect(() => {
    if (phone.startsWith('880')) {
      const localNumber = phone.slice(3);
      if (localNumber.length !== 10) {
        setPhoneError('Bangladesh phone number must be exactly 10 digits');
      } else {
        setPhoneError('');
      }
    } else if (phone.length < 7) {
      setPhoneError('Phone number is required or invalid');
    } else {
      setPhoneError('');
    }
  }, [phone]);

  const onSubmit = async data => {
    if (phoneError) {
      message.error('Please fix phone number errors before submitting.');
      return;
    }
    data.phone = phone;
    // Your sign-up logic here

    try {
      const response = await signUp(data).unwrap();
      message.success(response?.message);
      router.push('/signIn');
      console.error('Signup response:', response?.message);
      // Redirect user or show success message
    } catch (error) {
      console.error('Signup failed:', error);

      // Show error to user
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
        {/* Form Container */}
        <div className="bg-white bg-opacity-80 rounded-md shadow-md max-w-full p-6 sm:p-10 md:p-14 text-center">
          {/* Logo and Title */}
          <div className="flex items-center justify-center mb-6 space-x-3">
            <Link href={'/'}>
              <Image
                src={logo}
                alt="Logo"
                width={110}
                height={55}
                className="sm:w-28 sm:h-14 md:w-36 md:h-18"
              />
            </Link>
            <h1 className="text-blue-600 font-semibold text-lg sm:text-2xl md:text-3xl">
              Your Trade Source
            </h1>
          </div>

          {/* Sign Up Form */}
          <form
            onSubmit={handleSubmit(onSubmit)}
            className="space-y-5 text-left"
          >
            {/* First Name */}
            <input
              type="text"
              placeholder="First Name"
              {...register('firstName', { required: 'First Name is required' })}
              className="w-full p-3 rounded border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            {errors.firstName && (
              <p className="text-red-600 text-sm mt-1">
                {errors.firstName.message.toString()}
              </p>
            )}

            {/* Last Name */}
            <input
              type="text"
              placeholder="Last Name"
              {...register('lastName', { required: 'Last Name is required' })}
              className="w-full p-3 rounded border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            {errors.lastName && (
              <p className="text-red-600 text-sm mt-1">
                {errors.lastName.message.toString()}
              </p>
            )}

            {/* Address*/}
            <input
              type="text"
              placeholder="Type your address"
              {...register('address', { required: 'Address is required' })}
              className="w-full p-3 rounded border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            {errors.address && (
              <p className="text-red-600 text-sm mt-1">
                {errors.address.message.toString()}
              </p>
            )}

            {/* Email */}
            <input
              type="email"
              placeholder="Email Address"
              {...register('email', {
                required: 'Email is required',
                pattern: {
                  value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                  message: 'Invalid email format',
                },
              })}
              className="w-full p-3 rounded border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            {errors.email && (
              <p className="text-red-600 text-sm mt-1">
                {errors.email.message.toString()}
              </p>
            )}
            <div className="phone-wrapper w-full">
              <PhoneInput
                country={'bd'}
                value={phone}
                onChange={setPhone}
                inputProps={{
                  name: 'phone',
                  required: true,
                  autoFocus: false,
                }}
                containerClass=""
                inputClass="p-3 rounded-r-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
                buttonClass="rounded-l-md border border-gray-300 custom-flag-button"
                dropdownClass="rounded-md"
                specialLabel={''}
              />
              {(phoneError || errors.phone) && (
                <p className="text-red-600 text-sm mt-1">
                  {phone || errors.phone?.message.toString()}
                </p>
              )}
            </div>

            {/* Password with show/hide toggle */}
            <div className="relative">
              <input
                type={showPassword ? 'text' : 'password'}
                placeholder="Password"
                {...register('password', { required: 'Password is required' })}
                className="w-full p-3 rounded border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute top-1/2 right-4 -translate-y-1/2 text-gray-600"
                aria-label={showPassword ? 'Hide password' : 'Show password'}
              >
                {showPassword ? (
                  <AiOutlineEyeInvisible size={22} />
                ) : (
                  <RiEyeCloseLine size={22} />
                )}
              </button>
            </div>
            {errors.password && (
              <p className="text-red-600 text-sm mt-1">
                {errors.password.message.toString()}
              </p>
            )}

            {/* Terms and privacy note */}
            <p className="text-xs text-black mt-3">
              By clicking below and creating an account, I agree to
              YourTradeSource{' '}
              <Link href="/terms" className="text-blue-600 underline">
                Terms of Service
              </Link>{' '}
              and{' '}
              <Link href="/privacy" className="text-blue-600 underline">
                Privacy Policy
              </Link>
              .
            </p>

            {/* Sign Up button */}
            <button
              type="submit"
              className="w-full mt-4 bg-blue-600 text-white py-3 rounded hover:bg-blue-700 transition"
            >
              Sign Up
            </button>
          </form>

          {/* Already have account link */}
          <p className="mt-4 text-sm">
            Already have an account?{' '}
            <Link href="/signIn" className="font-semibold underline">
              Sign in
            </Link>
          </p>

          {/* Or separator */}
          <div className="my-6 text-gray-700 font-semibold">Or</div>

          {/* Social sign-up buttons */}
          <div className="flex flex-col sm:flex-row gap-4">
            <button className="flex-1 flex items-center justify-center gap-2 border py-2 drop-shadow bg-white rounded-xl hover:bg-gray-100 transition">
              <FcGoogle size={22} />
              Sign up with Google
            </button>
            <button className="flex-1 flex items-center justify-center gap-2 border py-2 drop-shadow bg-white rounded-xl hover:bg-gray-100 transition">
              <FaApple size={20} />
              Sign up with Apple
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SignUpPage;
