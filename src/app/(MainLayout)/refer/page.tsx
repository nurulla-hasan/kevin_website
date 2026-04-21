"use client";

import Image from "next/image";
import refer from "@/assests/Referral.png";
import { useAppSelector } from "@/redux/hooks";
import { selectCurrentUser } from "@/redux/features/auth/authSlice";
import { useForm } from "react-hook-form";
import { useGetRewardMutation} from "@/redux/features/refer/referApi";
import { useGetCmsReferDataQuery } from "@/redux/features/cms/referApi";
import { message } from "antd";

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
    const userInfo = { email: user?.email };
    const code = data?.code;
    try {
      const res = await getReward({ userInfo, code }).unwrap();
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
    <div>
      {/* Main Heading - from CMS */}
      {heroSection?.isVisible !== false && (
        <h1 className="text-3xl sm:text-4xl lg:text-5xl container mx-auto my-12 font-bold text-gray-900 mb-6 leading-tight">
          {heroSection?.title || "Help Your Friends & Get $10"}
        </h1>
      )}
      <div className="w-full container mx-auto mb-8 bg-[#ffffff] rounded-xl py-12 px-4 sm:py-16 sm:px-6 lg:py-20 lg:px-8">
        <div className="max-w-7xl">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-center">
            {/* Left Content */}
            <div className="order-2 lg:order-1">
              {/* Description - from CMS */}
              <div className="mb-8">
                {heroSection?.isVisible !== false && heroSection?.content && (
                  <p className="text-gray-700 text-lg mb-4 leading-relaxed">
                    {heroSection.content}
                  </p>
                )}

                {howItWorksSection?.isVisible !== false && (
                  <>
                    <p className="text-gray-700 text-lg mb-4 font-medium">
                      {howItWorksSection?.title || "Here's how it works:"}
                    </p>

                    <ul className="space-y-3 text-gray-700">
                      {howItWorksSection?.content?.split('\n').map((line: string, index: number) => (
                        line.trim() && (
                          <li key={index} className="flex items-start">
                            <span className="inline-block w-2 h-2 bg-gray-400 rounded-full mt-2 mr-3 flex-shrink-0"></span>
                            <span>{line.trim()}</span>
                          </li>
                        )
                      )) || (
                        <>
                          <li className="flex items-start">
                            <span className="inline-block w-2 h-2 bg-gray-400 rounded-full mt-2 mr-3 flex-shrink-0"></span>
                            <span>Your friend gets $10 off their first completed service.</span>
                          </li>
                          <li className="flex items-start">
                            <span className="inline-block w-2 h-2 bg-gray-400 rounded-full mt-2 mr-3 flex-shrink-0"></span>
                            <span>You get a $10 credit toward your next service once they complete their first task.</span>
                          </li>
                          <li className="flex items-start">
                            <span className="inline-block w-2 h-2 bg-gray-400 rounded-full mt-2 mr-3 flex-shrink-0"></span>
                            <span>Simply enter a referral code to claim your reward.</span>
                          </li>
                        </>
                      )}
                    </ul>
                  </>
                )}
              </div>

              {/* Referral Code Input Section */}
              <form onSubmit={handleSubmit(onSubmit)}>
                <div className="mb-6">
                  <div className="flex flex-col sm:flex-row gap-3">
                    <div className="flex-1 relative">
                      <input
                        type="text"
                        placeholder="Type Refer Code "
                        {...register("code", {
                          required: "Refer Code is required",
                        })}
                        className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none text-gray-700"
                      />
                    </div>
                    <button
                      type="submit"
                      className="px-6 py-3 bg-gray-400 hover:bg-gray-500 text-white font-medium rounded-lg transition-colors duration-200 whitespace-nowrap"
                    >
                      Get Reward
                    </button>
                  </div>
                  {/* Error message */}
                  {errors.code && (
                    <p className="text-red-500 text-xs">
                      {typeof errors.code.message === "string" &&
                        errors.code.message}
                    </p>
                  )}
                </div>
              </form>
            </div>

            {/* Right Illustration - from CMS */}
            {heroSection?.isVisible !== false && (
              <div className="order-1 lg:order-2 flex justify-center lg:justify-end">
                <Image
                  src={heroImage}
                  alt="Referral Image"
                  width={500}
                  height={500}
                  className="w-96"
                />
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
