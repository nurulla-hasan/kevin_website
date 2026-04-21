/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable no-unused-vars */
"use client";

import Image from "next/image";
import { SlBadge } from "react-icons/sl";
import { useRouter } from "next/navigation";
import { FaCalendarAlt, FaMapMarkerAlt, FaBuilding } from "react-icons/fa";
import {
  selectLocation,
  selectService,
  selectTime,
} from "@/redux/features/project/projectSlice";
import { useAppSelector } from "@/redux/hooks";
import Link from "next/link";
import {
  useGetSingleServiceQuery,
  useMakePaymentMutation,
} from "@/redux/features/contractor/contractorApi";
import { message } from "antd";
import { selectCurrentUser } from "@/redux/features/auth/authSlice";

export default function PaymentBookingInterface() {
  const storedService = useAppSelector(selectService);
  const storedTime = useAppSelector(selectTime);
  const storedLocation = useAppSelector(selectLocation);
  const { data: service } = useGetSingleServiceQuery(storedService?.serviceId);
  const user = useAppSelector(selectCurrentUser);

  const [makePayment] = useMakePaymentMutation();
  const router = useRouter();

  const finalHour = calculateHour(storedTime?.preferredTime);

  const handleConfirm = async () => {
    router.push("/done")
    // const id =storedService?.serviceId
    // const data = {
      
    //     customerEmail: user?.email,
    //     item: {
    //       serviceId: storedService?.serviceId,
    //       hour: finalHour,
    //     },
       
      
    // }
    // try {
    //   const res = await makePayment({
    //    data,id
    //   }).unwrap();

    //   if (res.success) {
    //     message.success(`${res.message}. Pay now...`);
    //     router.push(res?.data?.url);
    //   }
    // } catch (error) {
    //   message.error(error?.data?.message || "Something went wrong");
    //   console.error("Error:", error);
    // }
  };

  function calculateHour(timeSlot: string): number {
    let hours = 0;

    if (timeSlot === "Morning (8 AM - 12 PM)") {
      hours = 4; // 8 to 12 = 4 hours
    } else if (timeSlot === "Afternoon (12 PM - 5 PM)") {
      hours = 5; // 12 to 5 = 5 hours
    } else if (timeSlot === "Evening (5 PM - 9 PM)") {
      hours = 4; // 5 to 9 = 4 hours
    }

    return hours;
  }

  function calculatePrice(timeSlot: string, priceStr: string): number {
    const price = Number(priceStr);
    let hours = 0;

    if (timeSlot === "Morning (8 AM - 12 PM)") {
      hours = 4; // 8 to 12 = 4 hours
    } else if (timeSlot === "Afternoon (12 PM - 5 PM)") {
      hours = 5; // 12 to 5 = 5 hours
    } else if (timeSlot === "Evening (5 PM - 9 PM)") {
      hours = 4; // 5 to 9 = 4 hours
    }

    return hours * price + 10;
  }

  const finalPrice = calculatePrice(
    storedTime.preferredTime,
    storedService.hourlyRate
  );

  return (
    <div className="min-h-screen bg-gray-50 p-4">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Left Side - Payment Method */}
          <div className="bg-white rounded-lg p-6 h-fit">
            <h2 className="text-3xl font-bold text-black mb-6">Payment</h2>

            {/* Price Details */}
            <div className="mt-8 pt-6 border-t border-gray-200">
              <h3 className="text-xl font-bold text-gray-900 mb-4">
                Price Details
              </h3>

              <div className="space-y-3">
                <div className="flex justify-between">
                  <span className="text-gray-700">Hourly Rate</span>
                  <span className="font-medium">
                    ${storedService.hourlyRate}/hr
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-700">Trust & Support fee</span>
                  <span className="font-medium">$10/hr</span>
                </div>
                <div className="border-t border-gray-200 pt-3">
                  <div className="flex justify-between">
                    <span className="text-xl font-bold text-gray-900">
                      Total Rate
                    </span>
                    <span className="text-xl font-bold text-gray-900">
                      ${finalPrice}
                    </span>
                  </div>
                </div>
              </div>

              <div className="mt-4 text-sm text-gray-600 leading-relaxed">
                You may see a temporary hold on your payment method in the
                amount of your Tasker&apos;s hourly rate of $65.00. You can cancel at
                any time. Tasks cancelled less than 24 hours before the
                scheduled start time may be subject to a cancellation fee equal
                to one hour of work. Tasks require a minimum booking of two
                hours.
              </div>
            </div>
          </div>

          {/* Right Side - Task Details */}
          <div className="bg-white rounded-lg p-6 h-fit">
            {/* Contractor Profile */}
            <div className=" mb-6">
              <div className="flex flex-col justify-center items-center">
                <div className="">
                  <Image
                    src={storedService.contractorImage}
                    alt={storedService.contractorName}
                    width={80}
                    height={80}
                    className="rounded-full w-44 h-44 object-cover"
                  />
                </div>
                <h3 className="font-semibold text-gray-900 flex gap-3  border-b border-gray-500 py-3">
                  <span className="bg-blue-600 text-white rounded-full w-5 h-5 flex items-center justify-center text-xs">
                    <SlBadge />
                  </span>
                  <span>{storedService.contractorName}</span>
                </h3>
              </div>
            </div>

            {/* Task Info */}
            <div className="space-y-4 mb-6">
              <div className="flex items-center justify-between">
                <h2 className="text-2xl font-bold text-gray-900">
                  {storedService.serviceType}
                </h2>
                <Link
                  href="/location"
                  className="px-4 py-2 border border-black rounded-lg text-black hover:bg-gray-50 transition"
                >
                  Edit Task
                </Link>
              </div>

              <div className="space-y-3">
                <div className="flex items-center space-x-3 text-gray-700">
                  <FaCalendarAlt className="w-5 h-5" />
                  <span>
                    {storedTime.preferredDate}, {storedTime.preferredTime}
                  </span>
                </div>

                <div className="flex items-center space-x-3 text-gray-700">
                  <FaMapMarkerAlt className="w-5 h-5" />
                  <span>{storedLocation.address}</span>
                </div>

                <div className="flex items-center space-x-3 text-gray-700">
                  <FaBuilding className="w-5 h-5" />
                  <span>{storedLocation.apt}</span>
                </div>
              </div>
            </div>

            {/* Task Details */}
            <div className="mb-6">
              <h3 className="text-xl font-bold text-gray-900 mb-4">
                Task Details
              </h3>
              <div className="bg-gray-50 p-4 rounded-lg">
        
                <p className="text-gray-700 mb-2">Services include:</p>
                <ul className="text-gray-700">
                  {service?.data?.contractorId?.servicesYouProvide?.map(
                    (service, index) => (
                      <li key={index} className="flex items-center">
                        <span className="w-2 h-2 bg-gray-400 rounded-full mr-3"></span>
                        {service}
                      </li>
                    )
                  )}
                </ul>
              </div>
            </div>

            {/* Confirm Button */}
            <button
              onClick={() => handleConfirm()}
              className="w-full bg-blue-600 text-white py-4 rounded-lg font-semibold text-lg hover:bg-blue-700 transition"
            >
              Confirm and Chat
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
