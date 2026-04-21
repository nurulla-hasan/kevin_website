'use client';

import { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import Image from 'next/image';
import { Input, Button } from 'antd';
import userImg from '@/assests/user.png';
import PhoneInput from 'react-phone-input-2';
import 'react-phone-input-2/lib/style.css';

import { IoCameraOutline } from 'react-icons/io5';
export default function ContractorProfile() {
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
      if (localNumber.length !== 10) {
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
  };

  return (
    <div className="w-full   min-h-screen bg-white">
      {/* Header */}
      <div className="flex justify-between items-center mb-4 border-b p-3 border-black">
        <h1 className="text-2xl font-bold text-gray-800">Edit Profile</h1>
      </div>

      <form
        onSubmit={handleSubmit(onSubmit)}
        className=" md:flex-row gap-8 p-8 md:mt-16  flex flex-col justify-center items-center"
      >
        {/* Profile Image */}
        <div className="flex flex-col items-center gap-2">
          <div className="relative w-44 h-44 rounded-full overflow-hidden">
            <Image
              src={userImg}
              alt="Profile"
              fill
              className="object-cover rounded-full"
            />
            <div className="bg-black opacity-80 w-full p-1 shadow-md cursor-pointer relative top-36 py-4">
              <IoCameraOutline
                size={24}
                className="text-white absolute bottom-1 left-20"
              />
            </div>
          </div>
        </div>

        {/* Form Fields */}
        <div className="flex-1 space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium mb-1">
                First Name
              </label>
              <Input
                {...register('firstName', {
                  required: 'First name is required',
                })}
                placeholder="Bessie"
              />
              {errors.firstName && (
                <p className="text-red-500 text-sm">
                  {errors.firstName.message.toString()}
                </p>
              )}
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">
                Last Name
              </label>
              <Input
                {...register('lastName', { required: 'Last name is required' })}
                placeholder="Cooper"
              />
              {errors.lastName && (
                <p className="text-red-500 text-sm">
                  {errors.lastName.message.toString()}
                </p>
              )}
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">Email</label>
            <Input
              {...register('email', {
                required: 'Email is required',
                pattern: {
                  value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                  message: 'Invalid email format',
                },
              })}
              placeholder="abc@gmail.com"
            />
            {errors.email && (
              <p className="text-red-500 text-sm">
                {errors.email.message.toString()}
              </p>
            )}
          </div>

          <div className="phone-wrapper w-full">
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

          <div>
            <label className="block text-sm font-medium mb-1">
              Date Of Birth
            </label>
            <Input type="date" defaultValue="1998-10-10" />
          </div>

          {/* Buttons */}
          <div className="flex w-full justify-end gap-3 pt-4">
            <Button className="w-1/2">Cancel</Button>
            <Button
              type="primary"
              htmlType="submit"
              className="bg-blue-600 w-1/2"
            >
              Update
            </Button>
          </div>
        </div>
      </form>
    </div>
  );
}
