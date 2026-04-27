/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable no-unused-vars */
'use client';

import Image from 'next/image';
import {
  FaCalendarAlt,
  FaMapMarkerAlt,
} from 'react-icons/fa';

import { useAppSelector } from '@/redux/hooks';
import { selectLocation, selectService, selectTime } from '@/redux/features/project/projectSlice';
import { useSendMessageMutation, useCancelServiceMutation } from '@/redux/features/others/otherApi';
import { useRouter } from 'next/navigation';
import { useUpdateProjectStatusMutation, useGetSingleServiceQuery } from '@/redux/features/contractor/contractorApi';
import { selectCurrentUser } from '@/redux/features/auth/authSlice';
import { message as antdMessage } from 'antd';
import Link from 'next/link';

export default function BookingConfirmation() {
  const router = useRouter();
  const [cancelBooking] = useCancelServiceMutation();
  const [sendMessage, { isLoading: isSending }] = useSendMessageMutation();
  const [donebooking] = useUpdateProjectStatusMutation();
    const storedService = useAppSelector(selectService);
      const storedLocation = useAppSelector(selectLocation);
  const storedTime = useAppSelector(selectTime);
  const user = useAppSelector(selectCurrentUser);

  const { data: serviceData } = useGetSingleServiceQuery(storedService?.serviceId, {
    skip: !storedService?.serviceId,
  });

  const loginUserRole = (user as any)?.user?.role;
  const contractorRole = serviceData?.data?.contractorId?.role;

  // Chat permission logic:
  const isChatRestricted = loginUserRole === 'user' && contractorRole === 'vipContractor';

  const handleCancleBooking = async (id: string) => {
    try {
      const res = await cancelBooking(id).unwrap();
      if (res?.success) {
        antdMessage.success(res?.message);
      }
    } catch (error: any) {
      antdMessage.error(error.message);
    }
  };

  const handleChatWithContractor = async () => {
    const contractorId = storedService?.contractorId;
    if (!contractorId) {
      antdMessage.warning('Contractor information missing');
      return;
    }

    const formData = new FormData();
    formData.append(
      'data',
      JSON.stringify({ text: `Hello, I just booked your service: ${storedService?.serviceType}!` })
    );

    try {
      await sendMessage({
        receiverId: contractorId,
        data: formData,
      }).unwrap();
      router.push('/inbox');
    } catch (error: any) {
      console.error('Failed to send initial message:', error);
      // Still navigate to inbox even if auto-message fails
      router.push('/inbox');
    }
  };
  const handleDoneBooking = async (id: string) => {
    const status = "booked";
    try {
      const res = await donebooking({ id, status }).unwrap();
      if (res?.success) {
        antdMessage.success(res?.message);
      }
    } catch (error: any) {
      antdMessage.error(error.message);
    }
  };
  return (
    <div className="max-w-7xl mx-auto bg-muted p-6 rounded-lg my-5 ">
      {/* Header Section */}
      <div className="flex flex-col md:flex-row gap-4 w-full">
        {/* Image + View Profile */}
        <div className="flex flex-col items-center md:w-[15%] w-full">
          <Image
            src={storedService?.contractorImage}
            alt="Ellie Smith"
            width={100}
            height={100}
            className="rounded-full object-cover w-20 h-20 border-2 border-border"
          />
          <Link href={`/profile/${storedService?.contractorId}`}>
          <button className="px-3 mt-3 py-1 border border-border rounded-lg text-foreground hover:bg-muted transition text-sm">
            View Profile
          </button>
          </Link>
        </div>

        {/* Text + Chat Button */}
        <div className="flex flex-col md:flex-row justify-between items-start w-full gap-4">
          {/* Text */}
          <div className="w-full md:w-[70%]">
            <h1 className="text-xl md:text-2xl font-bold text-foreground">
              You&apos;ve Booked {storedService?.contractorName}
            </h1>
          </div>

          {/* Chat Button */}
          <div className="w-full md:w-auto">
            {isChatRestricted ? (
              <div className="flex flex-col items-end">
                <button
                  disabled
                  className="w-full md:w-auto px-4 py-2 bg-muted text-muted-foreground rounded cursor-not-allowed text-sm"
                >
                  Chat Contractor
                </button>
                <p className="text-[10px] text-destructive mt-1 text-right">
                  Only VIP Members can chat with Expert Pros
                </p>
              </div>
            ) : (
              <button
                onClick={handleChatWithContractor}
                disabled={isSending}
                className="w-full md:w-auto px-4 py-2 bg-primary text-primary-foreground rounded hover:bg-primary/90 transition text-sm disabled:opacity-50"
              >
                {isSending ? 'Connecting...' : 'Chat Contractor'}
              </button>
            )}
          </div>
        </div>
      </div>

      <hr className="border-border my-6" />

      {/* Cleaning Details */}
      <div className="mb-6">
        <h2 className="text-xl font-bold text-foreground mb-4">Cleaning</h2>
        <div className="space-y-3">
          <div className="flex items-center gap-3 text-foreground">
            <FaCalendarAlt className="text-muted-foreground" />
            <span>{storedTime?.preferredDate}, {storedTime?.preferredTime}</span>
          </div>
          <div className="flex items-center gap-3 text-foreground">
            <FaMapMarkerAlt className="text-muted-foreground" />
            <span>{storedLocation?.address},zip-{storedLocation?.apt}</span>
          </div>
        
        </div>
      </div>

      <hr className="border-border my-6" />

      {/* Price Details */}
      <div className="mb-6">
        <h2 className="text-xl font-bold text-foreground mb-4">Price Details</h2>
        <div className="space-y-3">
          <div className="flex justify-between">
            <span className="text-foreground">Hourly Rate</span>
            <span className="font-medium">${storedService?.hourlyRate}/hr</span>
          </div>
        </div>
      </div>

      <hr className="border-border my-6" />

    </div>
  );
}
