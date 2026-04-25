'use client';

import { useState } from 'react';
import { FieldValues, SubmitHandler, useForm } from 'react-hook-form';
import Image from 'next/image';
import { Button, message } from 'antd';
import { AiOutlineEyeInvisible } from 'react-icons/ai';
import { RiEyeCloseLine } from 'react-icons/ri';
import { useAppSelector } from '@/redux/hooks';
import { selectCurrentUser } from '@/redux/features/auth/authSlice';
import { useGetSpecefiqUserQuery } from '@/redux/features/user/userApi';
import { useChangePasswordMutation } from '@/redux/features/auth/authApi';
import { useRouter } from 'next/navigation';

export default function PasswordPage() {
  const router = useRouter();
  const user = useAppSelector(selectCurrentUser);
  const { data: specUser } = useGetSpecefiqUserQuery(user?.user?.userId);
  const [changePassword] = useChangePasswordMutation();
  const [showPassword, setShowPassword] = useState(false);

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm();

  const handleChangePassword: SubmitHandler<FieldValues> = async data => {
    try {
      const res = await changePassword(data).unwrap();
      if (res.success) {
        message.success(res.message);
        router.push('/myProfile');
      }
    } catch (error) {
      message.error(error?.data?.message || 'Something went wrong');
      console.error('Error:', error);
    }
  };

  const newPassword = watch('newPassword');

  return (
    <div className="w-full  min-h-screen bg-background p-6 font-dm">
      {/* Header */}
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-2xl font-bold text-foreground">Password</h1>
      </div>

      {/* Divider */}
      <div className="border-b border-border mb-8"></div>

      {/* Profile Content */}
      <div className="flex xl:mt-48 flex-col md:flex-row items-center md:items-start gap-12">
        {/* Profile Photo */}
        <div className="w-64 h-64 flex-shrink-0">
          <Image
            src={
              specUser?.data?.image ||
              'https://tse3.mm.bing.net/th/id/OIP.kUFzwD5-mfBV0PfqgI5GrAHaHa?cb=thfvnext&rs=1&pid=ImgDetMain&o=7&rm=3'
            }
            alt="Profile"
            width={256}
            height={256}
            className="rounded-full object-cover border-4 border-border"
          />
        </div>

        <form
          onSubmit={handleSubmit(handleChangePassword)}
          className="flex flex-col md:flex-row gap-8 w-full"
        >
          <div className="flex-1 w-full space-y-4">
            {/* Current Password */}
            <div className="relative">
              <label className="block text-sm font-medium mb-1 text-foreground">
                Current Password
              </label>
              <input
                type={showPassword ? 'text' : 'password'}
                placeholder="Current Password"
                {...register('oldPassword', {
                  required: 'Password is required',
                })}
                className="w-full p-3 rounded border border-border focus:outline-none focus:ring-2 focus:ring-primary bg-background text-foreground placeholder:text-muted-foreground"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute inset-y-16  top-1/2 right-4 -translate-y-1/2 text-muted-foreground hover:text-foreground"
                aria-label={showPassword ? 'Hide password' : 'Show password'}
              >
                {showPassword ? (
                  <AiOutlineEyeInvisible size={22} />
                ) : (
                  <RiEyeCloseLine size={22} />
                )}
              </button>
            </div>
            {errors.oldPassword && (
              <p className="text-destructive text-sm mt-1">
                {errors.oldPassword.message.toString()}
              </p>
            )}

            {/* New Password */}
            <div className="relative">
              <label className="block text-sm font-medium mb-1 text-foreground">
                New Password
              </label>
              <input
                type={showPassword ? 'text' : 'password'}
                placeholder="New Password"
                {...register('newPassword', {
                  required: 'Password is required',
                })}
                className="w-full p-3 rounded border border-border focus:outline-none focus:ring-2 focus:ring-primary bg-background text-foreground placeholder:text-muted-foreground"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute inset-y-16  top-1/2 right-4 -translate-y-1/2 text-muted-foreground hover:text-foreground"
                aria-label={showPassword ? 'Hide password' : 'Show password'}
              >
                {showPassword ? (
                  <AiOutlineEyeInvisible size={22} />
                ) : (
                  <RiEyeCloseLine size={22} />
                )}
              </button>
            </div>
            {errors.newPassword && (
              <p className="text-destructive text-sm mt-1">
                {errors.newPassword.message.toString()}
              </p>
            )}

            {/* Confirm Password */}
            <div className="relative">
              <label className="block text-sm font-medium mb-1 text-foreground">
                Confirm Password
              </label>
              <input
                type={showPassword ? 'text' : 'password'}
                placeholder="Confirm Password"
                {...register('confirmPassword', {
                  required: 'Password is required',
                  validate: value =>
                    value === newPassword || 'Passwords do not match',
                })}
                className="w-full p-3 rounded border border-border focus:outline-none focus:ring-2 focus:ring-primary bg-background text-foreground placeholder:text-muted-foreground"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute inset-y-16  top-1/2 right-4 -translate-y-1/2 text-muted-foreground hover:text-foreground"
                aria-label={showPassword ? 'Hide password' : 'Show password'}
              >
                {showPassword ? (
                  <AiOutlineEyeInvisible size={22} />
                ) : (
                  <RiEyeCloseLine size={22} />
                )}
              </button>
            </div>
            {errors.confirmPassword && (
              <p className="text-destructive text-sm mt-1">
                {errors.confirmPassword.message.toString()}
              </p>
            )}

            {/* Buttons */}
            <div className="flex w-full justify-end gap-3 pt-4">
              <Button
                className="w-1/2"
                onClick={() => {
                  router.push('/myProfile');
                }}
              >
                Cancel
              </Button>
              <Button
                type="primary"
                htmlType="submit"
                className="bg-primary hover:bg-primary/90 w-1/2"
              >
                Update
              </Button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}
