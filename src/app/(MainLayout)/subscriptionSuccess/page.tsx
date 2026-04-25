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
    <div className="min-h-screen flex items-center justify-center bg-muted px-4">
      <div className="bg-card border border-border max-w-lg w-full rounded-2xl shadow-xl p-8 text-center">
        {/* Success Icon */}
        <div className="flex justify-center mb-6">
          <FaCheckCircle className="text-green-500 w-20 h-20 animate-bounce" />
        </div>

        {/* Heading */}
        <h1 className="text-3xl font-extrabold text-foreground mb-3">
          Payment Successful!
        </h1>
        <p className="text-muted-foreground text-lg mb-8">
          Thank you for subscribing. Your membership is now active, and you can
          enjoy all premium features.
        </p>

        {/* Plan Summary (Optional – you can pass props if needed) */}
        <div className="bg-muted rounded-lg p-4 mb-8">
          <p className="text-foreground">
            <span className="font-semibold">Plan:</span> Premium Membership
          </p>
          <p className="text-foreground">
            <span className="font-semibold">Access:</span>You will get all Access
          </p>
        </div>

        {/* CTA Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link href="/allServices">
            <button className="w-full sm:w-auto px-6 py-3 bg-primary text-primary-foreground font-bold rounded-lg shadow-md hover:bg-primary/90 transition">
              All Services
            </button>
          </Link>
          <Link href="/">
            <button className="w-full sm:w-auto px-6 py-3 border border-border text-foreground font-semibold rounded-lg hover:bg-muted transition">
              Back to Home
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default SubscriptionSuccessPage;
