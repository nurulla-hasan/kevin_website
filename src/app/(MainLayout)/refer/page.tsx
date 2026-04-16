"use client";

import Image from "next/image";
import refer from "@/assests/Referral.png";
import { useAppSelector } from "@/redux/hooks";
import { selectCurrentUser } from "@/redux/features/auth/authSlice";
import { useForm } from "react-hook-form";
import { useGetRewardMutation} from "@/redux/features/refer/referApi";
import { useGetCmsReferDataQuery } from "@/redux/features/cms/referApi";
import { message } from "antd";
import { FaGift, FaUserPlus, FaDollarSign, FaArrowRight } from "react-icons/fa6";

export default function ReferPage() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const [getReward] = useGetRewardMutation();
  const user = useAppSelector(selectCurrentUser);
  
  // Fetch CMS data
  const { data: cmsData } = useGetCmsReferDataQuery(undefined);
  const heroSection = cmsData?.data?.sections?.hero;
  const howItWorksSection = cmsData?.data?.sections?.howItWorks;

  const onSubmit = async (data) => {
    console.log("email-->", user?.email);
    console.log("data-->", data);
    const userInfo = { email: user?.email };
    const code = data?.code;
    try {
      const res = await getReward({ userInfo, code }).unwrap();
      console.log("response--->", res);
      if (res?.success) {
        message.success(res?.message);
      }
    } catch (error) {
      message.error(error?.message);
    }
  };

  // Use CMS image or fallback to local image
  const heroImage = heroSection?.image || refer;

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-green-50">
      {/* Hero Section */}
      <div className="relative overflow-hidden">
        <div className="absolute top-0 left-0 w-48 h-48 bg-blue-200 rounded-full mix-blend-multiply filter blur-xl opacity-30 animate-blob"></div>
        <div className="absolute top-0 right-0 w-48 h-48 bg-green-200 rounded-full mix-blend-multiply filter blur-xl opacity-30 animate-blob animation-delay-2000"></div>
        
        {heroSection?.isVisible !== false && (
          <div className="container mx-auto pt-10 pb-6 px-4 text-center relative z-10">
            <div className="inline-flex items-center gap-1.5 bg-green-100 text-green-700 px-3 py-1.5 rounded-full text-xs font-medium mb-4">
              <FaGift className="w-3 h-3" />
              <span>Limited Time Offer</span>
            </div>
            <h1 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-2 leading-tight">
              {heroSection?.title || "Help Your Friends & Get $10"}
            </h1>
            <p className="text-base text-gray-600 max-w-xl mx-auto">
              {heroSection?.content || "At YourTradeSource (YTS), we believe great work is worth sharing."}
            </p>
          </div>
        )}
      </div>

      {/* Main Content Card */}
      <div className="container mx-auto px-4 pb-10">
        <div className="max-w-4xl mx-auto">
          <div className="bg-white rounded-2xl shadow-xl shadow-blue-100/50 overflow-hidden">
            <div className="grid grid-cols-1 lg:grid-cols-2">
              {/* Left Content */}
              <div className="p-6 sm:p-8 order-2 lg:order-1">
                {/* How it Works */}
                {howItWorksSection?.isVisible !== false && (
                  <div className="mb-6">
                    <h2 className="text-lg font-bold text-gray-900 mb-4">
                      {howItWorksSection?.title || "How it works:"}
                    </h2>
                    <div className="space-y-3">
                      <div className="flex items-center gap-3 p-3 rounded-lg bg-blue-50">
                        <div className="w-10 h-10 rounded-full bg-blue-600 text-white flex items-center justify-center flex-shrink-0">
                          <FaUserPlus className="w-4 h-4" />
                        </div>
                        <div className="flex-1">
                          <h3 className="font-semibold text-sm text-gray-900">Invite Friend</h3>
                          <p className="text-gray-600 text-xs">
                            {howItWorksSection?.content?.split('\n')[0] || "Friend gets $10 off"}
                          </p>
                        </div>
                      </div>
                      <div className="flex items-center gap-3 p-3 rounded-lg bg-green-50">
                        <div className="w-10 h-10 rounded-full bg-green-600 text-white flex items-center justify-center flex-shrink-0">
                          <FaDollarSign className="w-4 h-4" />
                        </div>
                        <div className="flex-1">
                          <h3 className="font-semibold text-sm text-gray-900">They Complete</h3>
                          <p className="text-gray-600 text-xs">
                            {howItWorksSection?.content?.split('\n')[1] || "You get $10 credit"}
                          </p>
                        </div>
                      </div>
                      <div className="flex items-center gap-3 p-3 rounded-lg bg-purple-50">
                        <div className="w-10 h-10 rounded-full bg-purple-600 text-white flex items-center justify-center flex-shrink-0">
                          <FaGift className="w-4 h-4" />
                        </div>
                        <div className="flex-1">
                          <h3 className="font-semibold text-sm text-gray-900">Claim Reward</h3>
                          <p className="text-gray-600 text-xs">
                            {howItWorksSection?.content?.split('\n')[2] || "Enter code to claim"}
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                )}

                {/* Referral Code Input */}
                <div className="bg-gray-50 rounded-xl p-4 border border-gray-200">
                  <h3 className="text-sm font-semibold text-gray-900 mb-3">Enter Referral Code</h3>
                  <form onSubmit={handleSubmit(onSubmit)}>
                    <div className="flex flex-col sm:flex-row gap-2">
                      <div className="flex-1 relative">
                        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                          <FaGift className="h-4 w-4 text-gray-400" />
                        </div>
                        <input
                          type="text"
                          placeholder="Enter code"
                          {...register("code", {
                            required: "Code required",
                          })}
                          className="w-full pl-9 pr-3 py-2.5 bg-white border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none text-sm text-gray-700"
                        />
                      </div>
                      <button
                        type="submit"
                        className="px-6 py-2.5 bg-blue-600 hover:bg-blue-700 text-white text-sm font-semibold rounded-lg transition-colors"
                      >
                        Claim
                      </button>
                    </div>
                    {errors.code && (
                      <p className="text-red-500 text-xs mt-1.5">
                        {typeof errors.code.message === "string" && errors.code.message}
                      </p>
                    )}
                  </form>
                </div>
              </div>

              {/* Right Image */}
              {heroSection?.isVisible !== false && (
                <div className="relative bg-gradient-to-br from-blue-600 to-blue-800 order-1 lg:order-2 flex items-center justify-center p-6 min-h-[300px] lg:min-h-0">
                  <div className="relative w-48 h-48 lg:w-56 lg:h-56">
                    <Image
                      src={heroImage}
                      alt="Referral"
                      fill
                      className="object-contain"
                    />
                  </div>
                  <div className="absolute bottom-4 left-4 right-4 bg-white/10 backdrop-blur-sm rounded-lg p-3 text-center">
                    <p className="text-white text-sm font-semibold">Earn $10 per friend!</p>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
