"use client";
import { FiCheck } from "react-icons/fi";
import { HiSparkles } from "react-icons/hi2";
import Link from "next/link";
import { useGetAllFeesQuery } from "@/redux/features/others/otherApi";
import { useGetCmsVipContractorDataQuery } from "@/redux/features/cms/vipContractorApi";

// Helper to extract emoji from title - checks if first char is emoji
const extractEmoji = (title: string | undefined): string | null => {
  if (!title || title.length === 0) return null;

  // Check if first char is emoji by looking at char code
  const firstChar = title.charCodeAt(0);
  const secondChar = title.length > 1 ? title.charCodeAt(1) : 0;

  // High surrogate indicates emoji (common ranges)
  if (firstChar >= 0xd800 && firstChar <= 0xdbff) {
    // This is a surrogate pair (emoji)
    const high = firstChar;
    const low = secondChar;
    if (low >= 0xdc00 && low <= 0xdfff) {
      // Valid emoji - extract the emoji (2 chars for most emojis, or more)
      let emojiEnd = 2;
      // Check for additional variation selectors or skin tone modifiers
      while (
        emojiEnd < title.length &&
        (title.charCodeAt(emojiEnd) === 0xfe0f || // variation selector
          (title.charCodeAt(emojiEnd) >= 0x1f3fb &&
            title.charCodeAt(emojiEnd) <= 0x1f3ff) || // skin tones
          title.charCodeAt(emojiEnd) >= 0x200d) // zero width joiner
      ) {
        emojiEnd++;
        // If zero width joiner, include next char too (family emojis etc)
        if (
          title.charCodeAt(emojiEnd - 1) === 0x200d &&
          emojiEnd < title.length
        ) {
          emojiEnd++;
        }
      }
      return title.substring(0, emojiEnd);
    }
  }

  // Single char emojis (ASCII and some others)
  if (
    (firstChar >= 0x2600 && firstChar <= 0x26ff) || // misc symbols
    (firstChar >= 0x2700 && firstChar <= 0x27bf) || // dingbats
    firstChar === 0xa9 || // copyright
    firstChar === 0xae || // registered
    firstChar === 0x2122
  ) {
    // trademark
    return title.substring(0, 1);
  }

  return null;
};

// Helper to remove emoji from title
const removeEmoji = (title: string | undefined): string => {
  if (!title) return "";
  const emoji = extractEmoji(title);
  if (!emoji) return title.trim();
  return title.substring(emoji.length).trim();
};

export default function VipContractorPricing() {
  const { data: allFees } = useGetAllFeesQuery(undefined);
  const { data: cmsData } = useGetCmsVipContractorDataQuery(undefined);

  // CMS sections
  const heroSection = cmsData?.data?.sections?.hero;
  const upgradeText = cmsData?.data?.sections?.upgradeText;
  const cardFree = cmsData?.data?.sections?.cardFree;
  const cardPremium = cmsData?.data?.sections?.cardPremium;
  const cardVip = cmsData?.data?.sections?.cardVip;

  // Extract emojis from CMS titles or use defaults
  const freeEmoji = extractEmoji(cardFree?.title) || "🏷️";
  const premiumEmoji = extractEmoji(cardPremium?.title) || "🏆";
  const vipEmoji = extractEmoji(cardVip?.title) || "👑";

  const pricingTiers = [
    {
      id: "free",
      title: removeEmoji(cardFree?.title) || "20% Off Pre-Priced Projects",
      icon: freeEmoji,
      iconBg: "bg-primary/10",
      features: cardFree?.features || [],
      buttonText: "Start Free",
      buttonPath: "/homePage",
      buttonStyle: "bg-primary hover:bg-primary/90 text-primary-foreground",
      isVisible: cardFree?.isVisible !== false,
    },
    {
      id: "premium",
      title: removeEmoji(cardPremium?.title) || "Premium",
      price:
        cardPremium?.content ||
        `$${allFees?.data[1]?.monthlyValue}/month or $${allFees?.data[1]?.yearlyValue}/year`,
      icon: premiumEmoji,
      iconBg: "bg-primary/10",
      features: cardPremium?.features || [],
      buttonText: "Get Premium",
      buttonPath: "/contractorCheckout",
      buttonStyle: "bg-primary hover:bg-primary/90 text-primary-foreground",
      isVisible: cardPremium?.isVisible !== false,
    },
    {
      id: "vip",
      title: removeEmoji(cardVip?.title) || "VIP",
      price:
        cardVip?.content ||
        `$${allFees?.data[3]?.monthlyValue}/month or $${allFees?.data[3]?.yearlyValue}/year`,
      icon: vipEmoji,
      iconBg: "bg-primary/10",
      features: cardVip?.features || [],
      buttonText: "Become a VIP Member",
      buttonPath: "/contractorCheckout",
      buttonStyle: "bg-primary hover:bg-primary/90 text-primary-foreground",
      isVisible: cardVip?.isVisible !== false,
    },
  ];

  return (
    <>
      <nav
        className="flex items-center font-normal text-base leading-6  bg-card pl-3 md:pl-5 lg:pl-10 xl:pl-44 border-t border-border py-3"
        aria-label="breadcrumb"
      >
        <p className="text-foreground text-xl">Home</p>
        <svg
          className="mx-2 w-6 h-6 text-foreground"
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
        <span className="text-foreground cursor-default text-xl">VIP Contractor</span>
      </nav>
      <div className="min-h-screen bg-muted py-12 px-4">
        <div className="container mx-auto">
          {/* Hero Title from CMS */}
          {heroSection?.isVisible !== false && (
            <h1 className="text-3xl md:text-4xl font-bold mb-5 md:mb-12 text-foreground">
              {heroSection?.title || ""}
            </h1>
          )}

          {/* Header Section */}
          <div className="bg-card border border-border px-3 py-8 mb-12">
            {/* Hero Content from CMS */}
            {heroSection?.isVisible !== false && heroSection?.content && (
              <h1 className="text-xl md:text-2xl text-foreground mb-6 leading-tight max-w-6xl mx-auto">
                {heroSection.content}
              </h1>
            )}

            {/* Upgrade Text from CMS */}
            {upgradeText?.isVisible !== false && (
              <div className="flex items-center max-w-6xl mx-auto mb-5 gap-2 text-xl md:text-2xl font-semibold text-foreground">
                <span>{upgradeText?.title || ""}</span>
              </div>
            )}

            {/* Pricing Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
              {pricingTiers
                .filter((tier) => tier.isVisible)
                .map((tier) => (
                  <div
                    key={tier.id}
                    className="bg-card rounded-2xl p-8 shadow-sm border border-border flex flex-col h-full relative"
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
                          <h3 className="text-2xl font-bold text-foreground mb-2">
                            {tier.title}
                          </h3>
                          {tier.price && (
                            <p className="text-lg text-muted-foreground">
                              {tier.price}
                            </p>
                          )}
                        </div>

                        {/* Features */}
                        <div className="flex-1 mb-8">
                          <ul className="space-y-4 md:mb-16 lg:mb-20 xl:mb-16">
                            {tier.features.map((feature, index) => (
                              <li
                                key={index}
                                className="flex items-start gap-3"
                              >
                                <FiCheck className="text-primary w-5 h-5 mt-0.5 flex-shrink-0" />
                                <span className="text-foreground text-base leading-relaxed">
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
                          tier.id === "premium"
                            ? {
                                pricingId: allFees?.data[0]?._id,
                                monthlyValue: allFees?.data[0]?.monthlyValue,
                                yearlyValue: allFees?.data[0]?.yearlyValue,
                              }
                            : tier.id === "vip"
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
