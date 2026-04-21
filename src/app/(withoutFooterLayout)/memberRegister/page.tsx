'use client';

import { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import Link from 'next/link';
import PhoneInput from 'react-phone-input-2';
import 'react-phone-input-2/lib/style.css';
const VipMemberRegister = () => {
  const [phone, setPhone] = useState('');
  const [phoneError, setPhoneError] = useState('');

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  // Validate phone length for BD (+880) only
  useEffect(() => {
    if (phone.startsWith('880')) {
      const localNumber = phone.slice(3);
      if (localNumber.length !== 9) {
        setPhoneError('Bangladesh phone number must be exactly 9 digits');
      } else {
        setPhoneError('');
      }
    } else if (phone.length < 7) {
      setPhoneError('Phone number is required or invalid');
    } else {
      setPhoneError('');
    }
  }, [phone]);

  const onSubmit = data => {
    if (phoneError) {
      alert('Please fix phone number errors before submitting.');
      return;
    }
    data.phoneNumber = phone;
    // Your sign-up logic here
  };
  return (
    <>
      <nav
        className="flex items-center font-normal text-base leading-6  bg-white pl-3 md:pl-5 lg:pl-10 xl:pl-44 border-t border-gray-500 py-3"
        aria-label="breadcrumb"
      >
        <p className="text-black text-xl">Home</p>
        <svg
          className="mx-2 w-6 h-6 text-black"
          fill="none"
          stroke="currentColor"
          strokeWidth={2}
          strokeLinecap="round"
          strokeLinejoin="round"
          viewBox="0 0 24 24"
          aria-hidden="true"
        >
          <path d="M9 18l6-6-6-6" />
        </svg>
        <span className="text-black cursor-default text-xl">VIP Member</span>
      </nav>
      {/* Overlay */}
      <div className="flex items-center justify-center p-4 sm:p-8 md:p-12 lg:p-16">
        {/* Form Container */}
        <div className="bg-white bg-opacity-80 rounded-md shadow-md max-w-full p-6 sm:p-10 md:p-14 text-center">
          {/* Sign Up Form */}
          <form
            onSubmit={handleSubmit(onSubmit)}
            className="space-y-5 text-left"
          >
            <div className="flex gap-3">
              {/* First Name */}
              <div className="w-[50%]">
                <label>First Name</label>
                <input
                  type="text"
                  placeholder="First Name"
                  {...register('firstName', {
                    required: 'First Name is required',
                  })}
                  className="w-full p-3 rounded border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                {errors.firstName && (
                  <p className="text-red-600 text-sm mt-1">
                    {errors.firstName.message.toString()}
                  </p>
                )}
              </div>
              <div className="w-[50%]">
                <label>Last Name</label>
                {/* Last Name */}
                <input
                  type="text"
                  placeholder="Last Name"
                  {...register('lastName', {
                    required: 'Last Name is required',
                  })}
                  className="w-full p-3 rounded border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                {errors.lastName && (
                  <p className="text-red-600 text-sm mt-1">
                    {errors.lastName.message.toString()}
                  </p>
                )}
              </div>
            </div>

            <div>
              {/* Email */}
              <label className="mt-">Email</label>
              <input
                type="email"
                placeholder="username@gmail.com"
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
            </div>
            <div className="phone-wrapper w-full">
              <label htmlFor="">Phone Number</label>
              <PhoneInput
                country={'bd'}
                value={phone}
                onChange={setPhone}
                inputProps={{
                  name: 'phoneNumber',
                  required: true,
                  autoFocus: false,
                }}
                containerClass=""
                inputClass="p-3 rounded-r-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
                buttonClass="rounded-l-md border border-gray-300 custom-flag-button"
                dropdownClass="rounded-md"
                specialLabel={''}
              />
              {(phoneError || errors.phoneNumber) && (
                <p className="text-red-600 text-sm mt-1">
                  {phoneError || errors.phoneNumber.message.toString()}
                </p>
              )}
            </div>

            {/* Password with show/hide toggle */}
            <div className="">
              <label htmlFor="">Address</label>
              <input
                placeholder="St Helen road, Glen Flora, TX 77443"
                {...register('address', { required: 'Password is required' })}
                className="w-full p-3 rounded border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />

              {errors.address && (
                <p className="text-red-600 text-sm mt-1">
                  {errors.address.message.toString()}
                </p>
              )}
            </div>
            <div className="flex gap-3">
              {/* First Name */}
              <div>
                <label>City</label>
                <input
                  type="text"
                  placeholder="Glen Flora"
                  {...register('city', {
                    required: 'city is required',
                  })}
                  className="w-full p-3 rounded border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                {errors.city && (
                  <p className="text-red-600 text-sm mt-1">
                    {errors.city.message.toString()}
                  </p>
                )}
              </div>
              <div>
                <label>States</label>
                {/* Last Name */}
                <input
                  type="text"
                  placeholder="TX"
                  {...register('State', {
                    required: 'State is required',
                  })}
                  className="w-full p-3 rounded border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                {errors.State && (
                  <p className="text-red-600 text-sm mt-1">
                    {errors.State.message.toString()}
                  </p>
                )}
              </div>
              <div>
                <label>Zip</label>
                {/* Last Name */}
                <input
                  type="text"
                  placeholder="77443"
                  {...register('zip', {
                    required: 'zip is required',
                  })}
                  className="w-full p-3 rounded border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                {errors.zip && (
                  <p className="text-red-600 text-sm mt-1">
                    {errors.zip.message.toString()}
                  </p>
                )}
              </div>
            </div>

            <div className="flex gap-3">
              <div className="w-[50%]">
                {/* Back Up button */}
                <Link href={'/'}>
                  <button
                    type="submit"
                    className="w-full mt-4  text-blue-700 border border-blue-700 py-3 rounded  transition"
                  >
                    Back
                  </button>
                </Link>
              </div>
              {/* Continue button */}
              <div className="w-[50%]">
                <Link href={'/paymentMethod'}>
                  <button
                    type="submit"
                    className="w-full mt-4 bg-blue-600 text-white py-3 rounded hover:bg-blue-700 transition"
                  >
                    Continue
                  </button>
                </Link>
              </div>
            </div>
          </form>
        </div>
      </div>
    </>
  );
};

export default VipMemberRegister;
