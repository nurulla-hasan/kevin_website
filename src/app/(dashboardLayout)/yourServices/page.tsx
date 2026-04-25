"use client";
import Link from "next/link";

import Image from "next/image";
import { FaStar } from "react-icons/fa";
import { useGetSingleUserServiceQuery } from "@/redux/features/contractor/contractorApi";
import { useAppSelector } from "@/redux/hooks";
import { selectCurrentUser } from "@/redux/features/auth/authSlice";

const YourServicePage = () => {
  const { data: myServices } = useGetSingleUserServiceQuery(undefined);
  const services = myServices?.data;
const user = useAppSelector(selectCurrentUser)

  return (
    <div className="bg-background p-5">
      <div className="max-w-7xl border border-border rounded-xl  mx-auto px-4 sm:px-6 lg:px-8 py-8 lg:py-12">
        {/* Section Title */}
        <div className="flex justify-between items-center ">
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-foreground mb-8 lg:mb-12">
            Your Services
          </h2>
          <Link href={`/profile/${user?.user?.userId}`}>
          <button className="bg-primary  text-primary-foreground p-2 rounded-xl">
            All Services
          </button>
          </Link>
        </div>
        {/* Services Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 lg:gap-8">
          {services
            ?.map((service) => (
              <div
                key={service?._id}
                className="bg-card border border-border rounded-2xl overflow-hidden shadow-sm hover:shadow-lg transition-shadow duration-300"
              >
                {/* Service Image */}
                <div className="relative h-48 sm:h-56 lg:h-64 overflow-hidden">
                  <Image
                    src={service?.image || "/placeholder.svg"}
                    alt={service?.title}
                    fill
                    className="object-cover hover:scale-105 transition-transform duration-300"
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 50vw"
                  />
                </div>

                {/* Service Content */}
                <div className="p-6">
                  {/* Service Title */}
                  <h3 className="text-xl sm:text-2xl font-bold text-foreground mb-3">
                    {service?.title}
                  </h3>

                  {/* Service Description */}
                  <p className="text-muted-foreground text-sm sm:text-base mb-6 leading-relaxed">
                    {service?.details}
                  </p>

                  {/* Rating and Price Row */}
                  <div className="flex items-center justify-between">
                    {/* Rating Section */}

                    {service?.review?.map((r, i) => (
                      <div className="flex items-center gap-2" key={i}>
                        <div className="flex items-center gap-1">
                          <FaStar className="w-4 h-4 text-primary fill-current" />
                          <span className="font-semibold text-foreground text-sm sm:text-base">
                            {r?.rating}
                          </span>
                        </div>
                      </div>
                    ))}

                    {/* Price Section */}
                    <div className="text-right">
                      <span className="text-muted-foreground text-sm">from </span>
                      <span className="font-semibold text-foreground text-base">
                        ${service?.price}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            ))
            .slice(0, 4)}
        </div>
      </div>
      <div className="mt-3">
        <Link href={"/createService"}>
          <button className="bg-primary  text-primary-foreground w-full py-3 rounded-xl">
            + Create More Service
          </button>
        </Link>
      </div>
    </div>
  );
};

export default YourServicePage;
