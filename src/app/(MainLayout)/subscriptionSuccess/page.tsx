'use client'
import React, { useEffect } from "react";
import { FaCheckCircle } from "react-icons/fa";
import Link from "next/link";
import { useUpdateSubStatusMutation } from "@/redux/features/others/otherApi";
import { useRouter, useSearchParams } from "next/navigation";
import { message } from "antd";

const SubscriptionSuccessPage = () => {
const router = useRouter()
  const [updateSubStatus]= useUpdateSubStatusMutation()
    const searchParams = useSearchParams();
    const sessionId = searchParams.get("session_id");
    useEffect(()=>{
      if(!sessionId){
        return
      }
      const status = 'active'
    updateSubStatus({status})
      .unwrap()
      .then((response) => {
        message.success(response?.message);
        
        router.push("/");
      })
      .catch((err) => {
 
        message.error(err?.data?.error || "Failed to create order");
      });
    },[sessionId])
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4">
      <div className="bg-white max-w-lg w-full rounded-2xl shadow-xl p-8 text-center">
        {/* Success Icon */}
        <div className="flex justify-center mb-6">
          <FaCheckCircle className="text-green-500 w-20 h-20 animate-bounce" />
        </div>

        {/* Heading */}
        <h1 className="text-3xl font-extrabold text-gray-900 mb-3">
          Payment Successful!
        </h1>
        <p className="text-gray-600 text-lg mb-8">
          Thank you for subscribing. Your membership is now active, and you can
          enjoy all premium features.
        </p>

        {/* Plan Summary (Optional – you can pass props if needed) */}
        <div className="bg-gray-50 rounded-lg p-4 mb-8">
          <p className="text-gray-700">
            <span className="font-semibold">Plan:</span> Premium Membership
          </p>
          <p className="text-gray-700">
            <span className="font-semibold">Access:</span>You will get all Access
          </p>
        </div>

        {/* CTA Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link href="/allServices">
            <button className="w-full sm:w-auto px-6 py-3 bg-blue-600 text-white font-bold rounded-lg shadow-md hover:bg-blue-700 transition">
              All Services
            </button>
          </Link>
          <Link href="/">
            <button className="w-full sm:w-auto px-6 py-3 border border-gray-300 text-gray-700 font-semibold rounded-lg hover:bg-gray-100 transition">
              Back to Home
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default SubscriptionSuccessPage;
