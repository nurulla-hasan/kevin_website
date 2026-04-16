"use client"
import { FiCheck } from "react-icons/fi";
import { HiSparkles } from "react-icons/hi2";
import Link from "next/link";
import { useGetAllFeesQuery } from "@/redux/features/others/otherApi";
export default function PricingSection() {
  const { data: allFees } = useGetAllFeesQuery(undefined);
  // console.log("all fees------->", allFees);
  const pricingTiers = [
    {
      id: "free",
      title: "20% Off Pre-Priced Projects",
      icon: "🏷️",
      iconBg: "bg-green-100",
      features: [
        "Access to contractor listings",
        "Post job requests",
        "Basic DIY tips",
      ],
      buttonText: "Start Free",
      buttonPath: "/",
      buttonStyle: "bg-blue-600 hover:bg-blue-700 text-white",
    },
    {
      id: "premium",
      title: "Premium",
      price: `$${allFees?.data[0]?.monthlyValue}/month or $${allFees?.data[0]?.yearlyValue}/year`,
      icon: "🏆",
      iconBg: "bg-green-100",
      features: [
        "Priority contractor matching",
        "Advanced tutorials & webinars",
        "Discounts on tools & products",
        "Dedicated support",
      ],
      buttonText: "Get Premium",
      buttonPath: "/paymentMethod",
      buttonStyle: "bg-blue-600 hover:bg-blue-700 text-white",
    },
    {
      id: "vip",
      title: "VIP",
      price: `$${allFees?.data[2]?.monthlyValue}/month or $${allFees?.data[2]?.yearlyValue}/year`,
      icon: "👑",
      iconBg: "bg-green-100",
      features: [
        "All Premium benefits",
        "Access to VIP-only contractors",
        "Free annual home consultation",
        "Early access + VIP event invites",
      ],
      buttonText: "Become a VIP Member",
      buttonPath: "/paymentMethod",
      buttonStyle: "bg-blue-600 hover:bg-blue-700 text-white",
    },
  ];

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
      <div className="min-h-screen bg-gray-50 py-12 px-4">
        <div className="container mx-auto">
          <h1 className="text-3xl md:text-4xl font-bold mb-5 md:mb-12">
            💼 Choose Your Membership. Power Up Your Projects.
          </h1>
          {/* Header Section */}
          <div className="bg-white px-3 py-8 mb-12">
            <h1 className="text-xl md:text-2xl text-gray-900 mb-6 leading-tight max-w-6xl mx-auto">
              Whether you&apos;re hiring a trusted tradesperson or getting hands-on
              with your own DIY repairs, YTS gives you the tools, knowledge, and
              professionals you need – all in one place.
            </h1>

            <div className="flex items-center max-w-6xl mx-auto mb-5 gap-2 text-xl md:text-2xl font-semibold text-gray-900">
              <HiSparkles className="text-yellow-500 w-6 h-6" />
              <span>Start Free, or upgrade for more:</span>
            </div>

            {/* Pricing Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
              {pricingTiers.map((tier) => (
                <div
                  key={tier.id}
                  className="bg-gray-100 rounded-2xl p-8 shadow-sm border border-gray-100 flex flex-col h-full relative"
                >
                  <div className="flex flex-col md:flex-row gap-3">
                    {/* Icon */}
                    <div
                      className={`w-16 h-16 ${tier.iconBg} rounded-2xl flex items-center justify-center mb-6 text-2xl`}
                    >
                      {tier.icon}
                    </div>

                    <div>
                      {/* Title and Price */}
                      <div className="mb-8">
                        <h3 className="text-2xl font-bold text-gray-900 mb-2">
                          {tier.title}
                        </h3>
                        {tier.price && (
                          <p className="text-lg text-gray-600">{tier.price}</p>
                        )}
                      </div>

                      {/* Features */}
                      <div className="flex-1 mb-8">
                        <ul className="space-y-4 md:mb-16 lg:mb-20 xl:mb-16">
                          {tier.features.map((feature, index) => (
                            <li key={index} className="flex items-start gap-3">
                              <FiCheck className="text-gray-600 w-5 h-5 mt-0.5 flex-shrink-0" />
                              <span className="text-gray-700 text-base leading-relaxed">
                                {feature}
                              </span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>
                  </div>

                  {/* CTA Button */}

                  <Link
                    href={{
                      pathname: tier.buttonPath,
                    query:
      tier.id === 'premium'
        ? {
          pricingId: allFees?.data[0]?._id,
            monthlyValue: allFees?.data[0]?.monthlyValue,
            yearlyValue: allFees?.data[0]?.yearlyValue,
          }
        : tier.id === 'vip'
        ? {
            pricingId: allFees?.data[2]?._id,
            monthlyValue: allFees?.data[2]?.monthlyValue,
            yearlyValue: allFees?.data[2]?.yearlyValue,
          }
        : {},
                    }}
                  >
                    <button
                      className={`w-full md:w-[65%] md:right-14 md:absolute md:mb-5 md:bottom-1 py-4 px-6 rounded-xl font-semibold text-base transition-colors duration-200 ${tier.buttonStyle}`}
                    >
                      {tier.buttonText}
                    </button>
                  </Link>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
