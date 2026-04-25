"use client";

import { useContractorSubPurchaseMutation} from "@/redux/features/user/userApi";
import { useRouter, useSearchParams } from "next/navigation";
import { useState } from "react";
import { SiTicktick } from "react-icons/si";
import { message } from "antd";



const ContractorCheckoutPage = () => {
  const [subPurchase] = useContractorSubPurchaseMutation();


  
  
  const searchParams = useSearchParams();
const router=useRouter()
  const pricingId = searchParams.get("pricingId");
  const monthlyValue = parseFloat(searchParams.get("monthlyValue")) || 0;
  const yearlyValue = parseFloat(searchParams.get("yearlyValue")) || 0;

  const [selectedPlan, setSelectedPlan] = useState("monthly");

  const handlePurchase = async () => {
//     const price = selectedPlan === "monthly" ? monthlyValue : yearlyValue;
//      // apply credits before purchase
//   if (totalCredits > 0) {
//     const appliedCredit = Math.min(price,totalCredits);
//     // subscription fee theke subtract
//     const finalPrice = price-appliedCredit;
//     // redux theke credit redeem kore felbo
//     dispatch(redeemCredit(appliedCredit));

    
   
//     const payload = {
//       item: {
//         pricingId,
//         price: finalPrice,
//         plan: selectedPlan,

//       },
//     };
//   }




    const payload = {
      item: {
        pricingId,
        price: selectedPlan === "monthly" ? monthlyValue : yearlyValue,
        plan: selectedPlan,
      },
    };

    try {
      const res = await subPurchase(payload).unwrap();

      if (res.success) {
        message.success(`${res.message}. Pay now...`);
        router.push(res?.data?.url);
      }
    } catch (error) {
      message.error(error?.data?.message || "Something went wrong");
      console.error("Error:", error);
    }
  };

  return (
    <div className="min-h-screen bg-muted flex items-center justify-center px-4">
      <div className="bg-card border border-border w-full max-w-3xl rounded-2xl shadow-lg p-8">
        {/* Header */}
        <h2 className="text-3xl font-extrabold text-foreground text-center mb-8">
          Choose Your Plan
        </h2>
   

        {/* Plan Selection */}
        <div className="flex justify-center gap-6 mb-10">
          <button
            onClick={() => setSelectedPlan("monthly")}
            className={`px-6 py-3 rounded-lg font-semibold transition-all ${
              selectedPlan === "monthly"
                ? "bg-primary text-primary-foreground shadow-md"
                : "bg-muted text-foreground hover:bg-muted-foreground/10"
            }`}
          >
            Monthly – ${monthlyValue}
          </button>
          <button
            onClick={() => setSelectedPlan("yearly")}
            className={`px-6 py-3 rounded-lg font-semibold transition-all ${
              selectedPlan === "yearly"
                ? "bg-primary text-primary-foreground shadow-md"
                : "bg-muted text-foreground hover:bg-muted-foreground/10"
            }`}
          >
            Yearly – ${yearlyValue}
          </button>
        </div>

        {/* Plan Summary Section */}
        <div className="bg-muted p-6 rounded-xl mb-10">
          <h3 className="text-xl font-semibold text-foreground mb-4">
            Plan Summary
          </h3>
          <div className="flex justify-between items-center mb-2">
            <span className="text-muted-foreground">Selected Plan</span>
            <span className="font-medium capitalize text-foreground">{selectedPlan}</span>
          </div>
          <div className="flex justify-between items-center">
            <span className="text-muted-foreground">Price</span>
            <span className="text-lg font-bold text-foreground">
              $
              {selectedPlan === "monthly"
                ? monthlyValue.toFixed(2)
                : yearlyValue.toFixed(2)}
            </span>
          </div>
          <p className="text-sm text-muted-foreground mt-3">
            All payments are processed securely through{" "}
            <span className="font-medium text-primary">Stripe</span>.
          </p>
        </div>

        {/* Terms */}
        <div className="flex items-start gap-3 mb-6">
          <SiTicktick className="text-green-500 mt-1" size={22} />
          <p className="text-muted-foreground text-sm leading-relaxed">
            By purchasing, you agree to automatic renewal of your membership and
            accept all{" "}
            <span className="text-primary underline cursor-pointer">
              terms & conditions
            </span>
            .
          </p>
        </div>

        {/* Purchase Button */}
        <button
          onClick={handlePurchase}
          className="w-full bg-primary hover:bg-primary/90 text-primary-foreground font-bold py-4 rounded-xl transition-all shadow-md"
        >
          Purchase Membership
        </button>
      </div>
    </div>
  );
};

export default ContractorCheckoutPage
