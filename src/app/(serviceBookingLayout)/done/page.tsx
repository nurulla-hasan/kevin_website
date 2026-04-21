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
    <div className="max-w-7xl mx-auto bg-gray-50 p-6 rounded-lg my-5 ">
      {/* Header Section */}
      <div className="flex flex-col md:flex-row gap-4 w-full">
        {/* Image + View Profile */}
        <div className="flex flex-col items-center md:w-[15%] w-full">
          <Image
            src={storedService?.contractorImage}
            alt="Ellie Smith"
            width={100}
            height={100}
            className="rounded-full object-cover w-20 h-20 border-2 border-black"
          />
          <Link href={`/profile/${storedService?.contractorId}`}>
          <button className="px-3 mt-3 py-1 border border-black  rounded-lg text-black hover:bg-gray-100 transition text-sm">
            View Profile
          </button>
          </Link>
        </div>

        {/* Text + Chat Button */}
        <div className="flex flex-col md:flex-row justify-between items-start w-full gap-4">
          {/* Text */}
          <div className="w-full md:w-[70%]">
            <h1 className="text-xl md:text-2xl font-bold text-gray-900">
              You&apos;ve Booked {storedService?.contractorName}
            </h1>
            {/* <p className="text-gray-600 mt-2 text-sm md:text-base">
              Giovanni C. is currently offline and will reach out once available
              in the app. You will be notified as soon as they respond.
            </p> */}
          </div>

          {/* Chat Button */}
          <div className="w-full md:w-auto">
            {isChatRestricted ? (
              <div className="flex flex-col items-end">
                <button
                  disabled
                  className="w-full md:w-auto px-4 py-2 bg-gray-400 text-white rounded cursor-not-allowed text-sm"
                >
                  Chat Contractor
                </button>
                <p className="text-[10px] text-red-500 mt-1 text-right">
                  Only VIP Members can chat with Expert Pros
                </p>
              </div>
            ) : (
              <button
                onClick={handleChatWithContractor}
                disabled={isSending}
                className="w-full md:w-auto px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition text-sm disabled:opacity-50"
              >
                {isSending ? 'Connecting...' : 'Chat Contractor'}
              </button>
            )}
          </div>
        </div>
      </div>

      <hr className="border-gray-200 my-6" />

      {/* Cleaning Details */}
      <div className="mb-6">
        <h2 className="text-xl font-bold text-gray-900 mb-4">Cleaning</h2>
        <div className="space-y-3">
          <div className="flex items-center gap-3 text-gray-700">
            <FaCalendarAlt className="text-gray-500" />
            <span>{storedTime?.preferredDate}, {storedTime?.preferredTime}</span>
          </div>
          <div className="flex items-center gap-3 text-gray-700">
            <FaMapMarkerAlt className="text-gray-500" />
            <span>{storedLocation?.address},zip-{storedLocation?.apt}</span>
          </div>
        
        </div>
      </div>

      <hr className="border-gray-200 my-6" />

      {/* Price Details */}
      <div className="mb-6">
        <h2 className="text-xl font-bold text-gray-900 mb-4">Price Details</h2>
        <div className="space-y-3">
          <div className="flex justify-between">
            <span className="text-gray-700">Hourly Rate</span>
            <span className="font-medium">${storedService?.hourlyRate}/hr</span>
          </div>
          {/* <div className="flex justify-between">
            <span className="text-gray-700">Trust & Support fee</span>
            <span className="font-medium">$10/hr</span>
          </div> */}
          {/* <div className="flex justify-between pt-2  border-gray-200">
            <span className="text-lg font-bold text-gray-900">Total Rate</span>
            <span className="text-lg font-bold text-gray-900">$75/Hr</span>
          </div> */}
        </div>
      </div>

      <hr className="border-gray-200 my-6" />

      {/* Project Details */}
      {/* <div className="mb-6">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-bold text-gray-900">Project Details</h2>
          <button className="text-blue-600 hover:underline text-sm">
            Edit
          </button>
        </div>
        <div>
          <p className="font-medium text-gray-800 mb-2">
            To-Do List for Cleaner
          </p>
          <ul className="space-y-2 text-gray-700">
            <li className="flex items-start">
              <span className="text-gray-400 mr-2">•</span>
              <span>
                Clean kitchen (wipe surfaces, clean sink, stovetop, and
                appliances)
              </span>
            </li>
            <li className="flex items-start">
              <span className="text-gray-400 mr-2">•</span>
              <span>
                Clean bathroom(s) (toilet, sink, shower/bath, mirrors)
              </span>
            </li>
            <li className="flex items-start">
              <span className="text-gray-400 mr-2">•</span>
              <span>Vacuum and mop all floors</span>
            </li>
            <li className="flex items-start">
              <span className="text-gray-400 mr-2">•</span>
              <span>Dust all surfaces and furniture</span>
            </li>
            <li className="flex items-start">
              <span className="text-gray-400 mr-2">•</span>
              <span>Empty trash bins</span>
            </li>
            <li className="flex items-start">
              <span className="text-gray-400 mr-2">•</span>
              <span>
                Disinfect high-touch areas (doorknobs, switches, remotes, etc.)
              </span>
            </li>
          </ul>
        </div>
      </div> */}

      {/* Add Note Section */}
      {/* <button className="w-full border border-gray-300 rounded py-3 px-4 text-gray-600 flex items-center justify-center gap-2 hover:bg-gray-100 transition mb-6">
        <FaPlus className="text-black" size={14} />
        <span className="text-black">
          Add Note or Photos for the Contractor
        </span>
      </button> */}

      {/* Progress Section */}
      {/* <div className="mb-8">
        <h2 className="text-xl font-bold text-black mb-6">Progress</h2>
        <div className="relative">

          <div className="h-1 bg-gray-200 absolute top-4 left-2 right-0 z-0">
            <div className="h-full bg-blue-600 w-[35%]"></div>
          </div>

     
          <div className="flex justify-between relative z-10">
            <div className="flex flex-col items-center">
              <div className="w-8 h-8 rounded-full bg-green-100 border-2 border-green-500 flex items-center justify-center mb-2">
                <FaCheck className="text-green-500" />
              </div>
              <span className="text-sm text-black">Booked</span>
            </div>

            <div className="flex flex-col items-center">
              <div className="w-8 h-8 rounded-full bg-white border-2 border-gray-300 flex items-center justify-center mb-2">
                <div className="w-2 h-2 rounded-full bg-white"></div>
              </div>
              <span className="text-sm text-black">On the way</span>
            </div>

            <div className="flex flex-col items-center">
              <div className="w-8 h-8 rounded-full bg-white border-2 border-gray-300 flex items-center justify-center mb-2">
                <div className="w-2 h-2 rounded-full bg-white"></div>
              </div>
              <span className="text-sm text-black">Started</span>
            </div>

            <div className="flex flex-col items-center">
              <div className="w-8 h-8 rounded-full bg-white border-2 border-gray-300 flex items-center justify-center mb-2">
                <div className="w-2 h-2 rounded-full bg-white"></div>
              </div>
              <span className="text-sm text-black">Done</span>
            </div>
          </div>
        </div>
      </div> */}

      {/* Action Buttons */}
      {/* <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <button className="w-full py-3 bg-red-500 text-white rounded hover:bg-red-600 transition" onClick={()=>handleCancleBooking(storedService?.serviceId)}>
          Cancel Project
        </button>
        <button className="w-full py-3 bg-blue-600 text-white rounded hover:bg-blue-700 transition" onClick={()=>handleDoneBooking(storedService?.serviceId)}>
          Mark as done
        </button>
      </div> */}
    </div>
  );
}
