/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { selectCurrentUser } from "@/redux/features/auth/authSlice";
import {
  useGetAllreferClaimedQuery,
  useReferClaimMutation,
  useReferHistoryQuery,
  useSendReferalMutation,
} from "@/redux/features/refer/referApi";
import { addCredit, selectTotalCredit } from "@/redux/features/refer/referSlice";
import { useGetSpecefiqUserQuery } from "@/redux/features/user/userApi";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { message } from "antd";


import { useForm } from "react-hook-form";
import { HiMail } from "react-icons/hi";
// const referrals = [
//   { name: "Amy", status: "Referred", reward: "$10 credit", claimed: false },
//   { name: "Amy", status: "Referred", reward: "$10 credit", claimed: true },
//   { name: "Amy", status: "Referred", reward: "$10 credit", claimed: true },
//   { name: "Amy", status: "Referred", reward: "$10 credit", claimed: true },
// ];

export default function ReferalPage() {
  const [claim] = useReferClaimMutation();
  const dispatch = useAppDispatch();
  const { data: referHistory, refetch } = useReferHistoryQuery(undefined);
  const { data: allClaimed, refetch: allClaimedRefetch } =
    useGetAllreferClaimedQuery(undefined);

  const totalClaimedCredit =
    allClaimed?.data?.reduce(
      (sum: number, item: any) => sum + (item?.amountCents || 0),
      0
    ) || 0;


const totalCredits = totalClaimedCredit / 100;

const creditfromrdux=useAppSelector(selectTotalCredit)

  const refferedBy = referHistory?.data?.referredItem;

  const refferals = referHistory?.data?.referrerItems;


  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const [sendMail] = useSendReferalMutation();
  const user = useAppSelector(selectCurrentUser);
  const { data: specUser } = useGetSpecefiqUserQuery(user?.user?.userId);

  // const [copied, setCopied] = useState(false);
  // const referralLink = "Md Rayhan Shorker";

  const onSubmit = async (data) => {
    const modifyData = {
      email: data?.email,
      code: specUser?.data?.refercode,
    };
    try {
      const res = await sendMail(modifyData).unwrap();
      if (res?.success) {
        message.success(res?.message);
      } else {
        message.error(res?.message);
      }
    } catch (error) {
      message.error(error?.message);
    }
  };

  const handleClaimRefer = async (data) => {
    const modifiedData = {
      relatedUserId: data?.relatedUser,
      type: data?.type,
    };
    try {
      const res = await claim(modifiedData).unwrap();

      if (res?.success) {
        message.success(res?.message);
        refetch();
        allClaimedRefetch();
           if (data?.amount) {
  
           const amount = parseFloat(data?.amount?.replace(/[^0-9.-]+/g,""));
      dispatch(addCredit(amount));
      }
      } else {
        message.error(res?.message);
      }
    } catch (error) {
      message.error(error?.message);
    }
  };

  return (
    <div>
      <div className="w-full min-h-screen  py-3 max-w-7xl  mx-auto bg-card border border-border rounded-xl  px-4 lg:px-8">
        {/* Header */}
        <div className="flex justify-between items-center mb-4">
          <h1 className="text-2xl font-bold text-foreground">Referral</h1>
        </div>

        {/* Divider */}
        <div className="border-b border-border mb-8"></div>
        <div className=" ">
          <div className="  items-center">
            {/* Left Content */}
            <div className="order-2 lg:order-1">
              {/* Description */}
              <div className="mb-8">
                <p className="text-foreground text-lg mb-4 leading-relaxed">
                  At YourTradeSource (YTS), we believe great work is worth
                  sharing. Refer a friend, and you both earn rewards!
                </p>

                <p className="text-foreground text-lg mb-4 font-medium">
                  Here&apos;s how it works:
                </p>

                <ul className="space-y-3 text-foreground">
                  <li className="flex items-start">
                    <span className="inline-block w-2 h-2 bg-muted-foreground rounded-full mt-2 mr-3 flex-shrink-0"></span>
                    <span>
                      Your friend also gets $10 you can use this credit for  buy subscription
                    </span>
                  </li>
                  <li className="flex items-start">
                    <span className="inline-block w-2 h-2 bg-muted-foreground rounded-full mt-2 mr-3 flex-shrink-0"></span>
                    <span>
                      You also get a $10 credit which you can use this credit  for buy subscription
                    </span>
                  </li>
                </ul>
              </div>

              {/* Email Input Section */}
              <form onSubmit={handleSubmit(onSubmit)}>
                <div className="mb-6">
                  <div className="flex flex-col sm:flex-row gap-3">
                    <div className="flex-1 relative">
                      <HiMail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-5 h-5" />
                      <input
                        type="email"
                        placeholder="Enter email address"
                        {...register("email", {
                          required: "Email is required",
                          pattern: {
                            value: /^[^@]+@[^@]+\.[^@]+$/,
                            message: "Invalid email format",
                          },
                        })}
                        className="w-full pl-10 pr-4 py-3 border border-border rounded-lg focus:ring-2 focus:ring-primary focus:border-primary outline-none text-foreground bg-background placeholder:text-muted-foreground"
                      />
                    </div>
                    <button
                      type="submit"
                      className="px-6 py-3 bg-primary hover:bg-primary/90 text-primary-foreground font-medium rounded-lg transition-colors duration-200 whitespace-nowrap"
                    >
                      Send Invitation
                    </button>
                  </div>
                  {/* Error message */}
                  {errors.email && (
                    <p className="text-destructive text-xs">
                      {typeof errors.email.message === "string" &&
                        errors.email.message}
                    </p>
                  )}
                </div>
              </form>
            </div>
          </div>

          <div className=" w-full pt-3">
            <div className="flex gap-5 justify-end font-inter">
              <p className="text-md text-foreground">Your Total Earn Credits :</p>
              {/* <p>${creditfromrdux.toFixed(2)}</p> */}
              <p className="text-foreground">${totalCredits.toFixed(2)}</p>
            </div>
            <div className="flex gap-5 justify-end font-inter">
              <p className="text-md text-foreground">Credit Remains :</p>
              <p className="text-foreground">${creditfromrdux?.toFixed(2)}</p>
       
            </div>
            <h2 className="text-xl font-semibold text-foreground mb-4">
              Referral History
            </h2>
            <div className="space-y-4">
              {refferedBy && (
                <div className="flex items-center justify-between text-sm text-foreground">
                  {/* Green Check & Name */}
                  <div className="flex items-center gap-2 min-w-[100px]">
                    <span className="w-5 h-5 bg-primary rounded-full flex items-center justify-center text-primary-foreground text-xs">
                      ✓
                    </span>
                    <span className="font-semibold text-foreground">{refferedBy?.name}</span>
                  </div>

                  {/* Status */}
                  <span className="w-[80px]">{refferedBy?.type}</span>

                  {/* Reward */}
                  <span className="w-[100px]">{refferedBy?.amount}</span>

                  {/* Button */}
                  {refferedBy?.status === "claimed" ? (
                    <button className="bg-muted text-muted-foreground px-4 py-1 rounded-md cursor-not-allowed">
                      Claimed
                    </button>
                  ) : (
                    <button
                      className="bg-primary text-primary-foreground px-4 py-1 rounded-md hover:bg-primary/90"
                      onClick={() => handleClaimRefer(refferedBy)}
                    >
                      Claim
                    </button>
                  )}
                </div>
              )}
              {refferals?.map((ref, idx) => (
                <div
                  key={idx}
                  className="flex items-center justify-between text-sm text-foreground"
                >
                  {/* Green Check & Name */}
                  <div className="flex items-center gap-2 min-w-[100px]">
                    <span className="w-5 h-5 bg-primary rounded-full flex items-center justify-center text-primary-foreground text-xs">
                      ✓
                    </span>
                    <span className="font-semibold text-foreground">{ref.name}</span>
                  </div>

                  {/* Status */}
                  <span className="w-[80px]">{ref.type}</span>

                  {/* Reward */}
                  <span className="w-[100px]">{ref.amount}</span>

                  {/* Button */}
                  {ref.status === "claimed" ? (
                    <button className="bg-muted text-muted-foreground px-4 py-1 rounded-md cursor-not-allowed">
                      Claimed
                    </button>
                  ) : (
                    <button
                      className="bg-primary text-primary-foreground px-4 py-1 rounded-md hover:bg-primary/90"
                      onClick={() => handleClaimRefer(ref)}
                    >
                      Claim
                    </button>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
