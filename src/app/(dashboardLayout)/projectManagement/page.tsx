/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { useState, useMemo } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { FiMapPin, FiClock } from "react-icons/fi";
import { IoCallSharp } from "react-icons/io5";
import { MdOutlineMessage } from "react-icons/md";
import {

  useAllReviewQuery,
  useBookedOrderforContractorQuery,
  useMyQuotesQuery,
  useUpdateAcceptOrRejectMutation,
  useUpdateQuoteStatusMutation,
} from "@/redux/features/contractor/contractorApi";
import { message, Modal,Empty, Spin } from "antd";

// Fallback avatar
import userImg from "@/assests/user.png";
import { Star} from "lucide-react";

// ------- Types you may adjust based on your API -------
type TReviewer =
  | {
      _id?: string;
      firstName?: string;
      lastName?: string;
      image?: string;
      email?: string;
    }
  | string
  | undefined;

type TReviewItem = {
  reviewBy?: TReviewer;
  rating: number;
  comment?: string;
  createdAt?: string | Date;
};

type TUser = {
  _id?: string;
  firstName?: string;
  lastName?: string;
  image?: string;
  review?: TReviewItem[];
};

type TOrderItem = {
  _id: string;
  user?: TUser;
  firstName?: string; // some of your rows used project.firstName
  serviceType?: string;
  time?: string;
  location?: string;
  date?: string;
  serviceId?: { price?: number };
};

// -------------------------------------------------------

const projectData = [
  {
    id: 1,
    client: "Ellie Smith",
    avatar: userImg,
    service: "Cleaning",
    time: "Apr 28, 12:00 PM",
    address: "123 Main Street, New York, NY 10001",
    propertyType: "Apartment",
    price: "$120",
    date: "2/5/25",
    status: "Pending",
  },
  {
    id: 2,
    client: "Ellie Smith",
    avatar: userImg,
    service: "Cleaning",
    time: "Apr 28, 12:00 PM",
    address: "123 Main Street, New York, NY 10001",
    propertyType: "Apartment",
    price: "$120",
    date: "29/4/25",
    status: "Accepted",
  },
  {
    id: 3,
    client: "Ellie Smith",
    avatar: userImg,
    service: "Cleaning",
    time: "Apr 28, 12:00 PM",
    address: "123 Main Street, New York, NY 10001",
    propertyType: "Apartment",
    price: "$120",
    date: "23/4/25",
    status: "Declined",
  },
  {
    id: 4,
    client: "Ellie Smith",
    avatar: userImg,
    service: "Cleaning",
    time: "Apr 28, 12:00 PM",
    address: "123 Main Street, New York, NY 10001",
    propertyType: "Apartment",
    price: "$120",
    date: "2/4/25",
    status: "Accepted",
  },
];

export default function ProjectManagement() {
  const router = useRouter();

  // RTK Query hooks
  const { data: myQuotes, refetch: refetchQuotes, isLoading: isLoadingQuotes } =
    useMyQuotesQuery(undefined);
  const {
    data: myOrder,
    refetch: refetchMyOrder,
    isLoading: isLoadingOrders,
  } = useBookedOrderforContractorQuery(undefined);

  const [updateQuoteStatus] = useUpdateQuoteStatusMutation();
  const [updateAcceptOrReject] = useUpdateAcceptOrRejectMutation();

  const [activeTab, setActiveTab] = useState<"Project Requests" | "Quote Management" | "Project Status">("Project Requests");
  const tabs: Array<typeof activeTab> = ["Project Requests", "Quote Management"];

  // ===== Utilities =====
  // const getUserFullName = useCallback((user?: TUser) => {
  //   if (!user) return "";
  //   const f = user.firstName || "";
  //   const l = user.lastName || "";
  //   return (f + (l ? ` ${l}` : "")).trim();
  // }, []);



  const formatDate = (d?: string | Date) => {
    if (!d) return "";
    try {
      const dt = new Date(d);
      if (isNaN(dt.getTime())) return "";
      return dt.toLocaleDateString();
    } catch {
      return "";
    }
  };

  const gotoDetails = (id: string) => {
    router.push(`/projectManagement/${id}`);
  };

  // ===== Accept/Reject handlers (quotes) =====
  const handleReject = async (id: string) => {
    const data = { status: "rejected" as const };
    try {
      const res = await updateQuoteStatus({ id, data }).unwrap();
      if (res?.success) {
        message.success(res?.message || "Rejected");
        refetchQuotes();
      } else {
        message.error(res?.message || "Failed to update");
      }
    } catch (error: any) {
      message.error(error?.data?.message || "Update failed");
    }
  };

  const handleAccept = async (id: string) => {
    const data = { status: "accepted" as const };
    try {
      const res = await updateQuoteStatus({ id, data }).unwrap();
      if (res?.success) {
        message.success(res?.message || "Accepted");
        refetchQuotes();
      } else {
        message.error(res?.message || "Failed to update");
      }
    } catch (error: any) {
      message.error(error?.data?.message || "Update failed");
    }
  };

  // ===== Accept/Reject handlers (project requests/orders) =====
  const handleProjectAccept = async (id: string) => {
    try {
      const res = await updateAcceptOrReject({ id, status: "accepted" }).unwrap();
      if (res?.success) {
        message.success(res?.message || "Accepted");
        refetchMyOrder();
      } else {
        message.error(res?.message || "Failed to update");
      }
    } catch (error: any) {
      message.error(error?.data?.message || "Update failed");
    }
  };

  const handleProjectReject = async (id: string) => {
    try {
      const res = await updateAcceptOrReject({ id, status: "rejected" }).unwrap();
      if (res?.success) {
        message.success(res?.message || "Rejected");
        refetchMyOrder();
      } else {
        message.error(res?.message || "Failed to update");
      }
    } catch (error: any) {
      message.error(error?.data?.message || "Update failed");
    }
  };

  // ===== All Review modal state =====
  const [isAllReviewOpen, setIsAllReviewOpen] = useState(false);
  const [userId, setUserId] = useState("");
const {data:allReview}=useAllReviewQuery(userId)
const selectedReviews=allReview?.data?.reviews
// const {data:allReview}=useAllReviewQuery()
  const openAllReviewModal = (data) => {

 setUserId(data?.user?._id)
    setIsAllReviewOpen(true);
  };

  const closeAllReviewModal = () => {
    setIsAllReviewOpen(false);
 
  };
const StarRating = ({ value = 0 }: { value?: number }) => {
  const stars = Array.from({ length: 5 }, (_, i) => {
    const diff = value - i;
    if (diff >= 1) return "full";
    if (diff > 0 && diff < 1) return "half";
    return "empty";
  });

  return (
    <div className="flex items-center gap-0.5">
      {stars.map((t, i) => (
        <div key={i} className="relative w-4 h-4">
          {/* full */}
          {t === "full" && (
            <Star
              size={16}
              className="text-yellow-400 fill-yellow-400"
            />
          )}

          {/* half */}
          {t === "half" && (
            <div className="relative w-4 h-4">
              <Star
                size={16}
                className="text-yellow-400 fill-yellow-400 absolute top-0 left-0 w-2 overflow-hidden"
                style={{ clipPath: "inset(0 50% 0 0)" }}
              />
              <Star
                size={16}
                className="text-gray-300 absolute top-0 left-0"
              />
            </div>
          )}

          {/* empty */}
          {t === "empty" && <Star size={16} className="text-gray-300" />}
        </div>
      ))}
    </div>
  );
};
  // ===== Derived =====
  const orders: TOrderItem[] = useMemo(() => myOrder?.data || [], [myOrder?.data]);
  const quotes: any[] = useMemo(() => myQuotes?.data || [], [myQuotes?.data]);

  const isLoading = isLoadingOrders || isLoadingQuotes;

  return (
    <div className="max-w-7xl mx-auto p-4 bg-card border border-border min-h-screen">
      <h1 className="text-3xl font-bold text-foreground mb-6">Project Management</h1>

      {/* Tabs */}
      <div className="flex gap-2 mb-6">
        {tabs.map((tab) => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={`px-6 py-2 rounded-md font-semibold ${
              activeTab === tab
                ? "bg-primary text-primary-foreground"
                : "bg-muted text-foreground border border-border hover:bg-muted-foreground/10"
            }`}
          >
            {tab}
          </button>
        ))}
      </div>

      {isLoading && (
        <div className="py-10 flex items-center justify-center">
          <Spin />
        </div>
      )}

      {/* ===== Project Requests ===== */}
      {!isLoading && activeTab === "Project Requests" && (
        <div className="overflow-x-auto">
          <table className="w-full table-auto">
            <thead>
              <tr className="bg-muted">
                <th className="px-6 py-3 text-left text-foreground">Project Info</th>
                <th className="px-6 py-3 text-left text-foreground">Price</th>
                <th className="px-6 py-3 text-left text-foreground">Date</th>
                <th className="px-6 py-3 text-left text-foreground">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border">
              {orders?.map((project) => {
                // const reviews: TReviewItem[] = project?.user?.review || [];
                // const userFullName = getUserFullName(project?.user);

                return (
                  <tr key={project._id} className="hover:bg-muted">
                    <td className="px-6 py-4">
                      <div className="flex items-start gap-2">
                        <div className="w-[25%] flex flex-col justify-center items-center">
                          <Image
                            src={project?.user?.image || userImg}
                            alt={project?.user?.firstName || "User"}
                            width={48}
                            height={48}
                            className="w-12 h-12 rounded-full object-cover"
                          />
                          <div className="font-semibold mt-1 text-foreground">
                            {project?.firstName || project?.user?.firstName}
                          </div>
                        </div>

                        <div>
                          <div className="text-sm text-foreground">{project?.serviceType}</div>

                          <div className="flex gap-2 items-center text-sm text-muted-foreground">
                            <FiClock className="text-muted-foreground" />
                            {project?.time}
                          </div>
                          <div className="flex gap-2 items-center text-sm text-muted-foreground">
                            <FiMapPin className="text-muted-foreground" />
                            {project?.location}
                          </div>

                          {/* All Review link */}
                          <button
                            type="button"
                            onClick={() => openAllReviewModal(project)}
                            className="flex gap-2 items-center text-sm text-primary hover:underline mt-2"
                          >
                            <Star size={14} className="text-primary " />
                            All Review
                          </button>
                        </div>
                      </div>
                    </td>

                    <td className="px-6 py-4 text-sm font-inter text-foreground">
                      ${project?.serviceId?.price}
                    </td>
                    <td className="px-6 py-4 text-sm text-foreground">{project?.date}</td>
                    <td className="px-6 py-4 space-y-2">
                      <button
                        onClick={() => gotoDetails(project._id)}
                        className="w-full border border-border px-4 py-2 rounded-md text-sm hover:bg-muted text-foreground"
                      >
                        View Job Details
                      </button>
                      <div className="flex gap-2">
                        <button
                          onClick={() => handleProjectReject(project._id)}
                          className="flex-1 bg-destructive text-destructive-foreground px-4 py-2 rounded-md text-sm"
                        >
                          Reject
                        </button>
                        <button
                          onClick={() => handleProjectAccept(project._id)}
                          className="flex-1 bg-primary text-primary-foreground px-4 py-2 rounded-md text-sm"
                        >
                          Accept
                        </button>
                      </div>
                    </td>
                  </tr>
                );
              })}

              {!orders?.length && (
                <tr>
                  <td colSpan={4} className="px-6 py-8">
                    <div className="flex justify-center">
                      <Empty description="No project requests" />
                    </div>
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      )}

      {/* ===== Quote Management ===== */}
      {!isLoading && activeTab === "Quote Management" && (
        <div className="overflow-x-auto">
          <table className="w-full table-auto">
            <thead>
              <tr className="bg-muted">
                <th className="px-6 py-3 text-left text-foreground">Project Info</th>
                <th className="px-6 py-3 text-left text-foreground">Status</th>
                <th className="px-6 py-3 text-left text-foreground">Date</th>
                <th className="px-6 py-3 text-left text-foreground">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border">
              {quotes?.map((project: any) => (
                <tr key={project._id} className="hover:bg-muted">
                  <td className="px-6 py-4 flex items-start gap-2">
                    <div className="w-[50%] flex flex-col justify-center items-center">
                      <Image
                        src={project?.user?.image || userImg}
                        alt={project?.user?.firstName || "User"}
                        className="w-12 h-12 rounded-full object-cover"
                        height={48}
                        width={48}
                      />
                    </div>

                    <div>
                      <div className="font-semibold text-foreground">
                        {(project?.user?.firstName || "") +
                          (project?.user?.lastName ? ` ${project?.user?.lastName}` : "")}
                      </div>
                      <div className="text-sm text-foreground">{project?.service}</div>
                      <div className="text-sm text-muted-foreground">{project?.projectLocation}</div>
                       {/* All Review link */}
                          <button
                            type="button"
                            onClick={() => openAllReviewModal(project)}
                            className="flex gap-2 items-center text-sm text-primary hover:underline mt-2"
                          >
                            <Star size={14} className="text-primary " />
                            All Review
                          </button>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <span
                      className={`text-sm font-semibold ${
                        project?.status === "pending"
                          ? "text-primary"
                          : project?.status === "accepted"
                          ? "text-green-500"
                          : "text-destructive"
                      }`}
                    >
                      {project?.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-sm text-foreground">
                    {(project?.date || "").split("T")[0]}
                  </td>
                  <td className="px-6 py-4 space-y-2">
                    <button
                      onClick={() => gotoDetails(project?._id)}
                      className="w-full border border-border px-4 py-2 rounded-md text-sm hover:bg-muted text-foreground"
                    >
                      View Job Details
                    </button>

                    {project?.status === "pending" && (
                      <div className="flex gap-2">
                        <button
                          onClick={() => handleReject(project?._id)}
                          className="flex-1 bg-destructive text-destructive-foreground px-4 py-2 rounded-md text-sm"
                        >
                          Reject
                        </button>
                        <button
                          onClick={() => handleAccept(project?._id)}
                          className="flex-1 bg-primary text-primary-foreground px-4 py-2 rounded-md text-sm"
                        >
                          Accept
                        </button>
                      </div>
                    )}

                    {project?.status === "accepted" && (
                      <button
                        className="w-full bg-primary text-primary-foreground px-4 py-2 rounded-md text-sm"
                      >
                        Message Client
                      </button>
                    )}
                  </td>
                </tr>
              ))}

              {!quotes?.length && (
                <tr>
                  <td colSpan={4} className="px-6 py-8">
                    <div className="flex justify-center">
                      <Empty description="No quotes found" />
                    </div>
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      )}

      {/* ===== Demo Project Status (unchanged) ===== */}
      {!isLoading && activeTab === "Project Status" && (
        <div className="overflow-x-auto">
          <table className="w-full table-auto">
            <thead>
              <tr className="bg-muted">
                <th className="px-6 py-3 text-left text-foreground">Clients</th>
                <th className="px-6 py-3 text-left text-foreground">Service</th>
                <th className="px-6 py-3 text-left text-foreground">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border">
              {projectData.map((project) => (
                <tr key={project.id} className="hover:bg-muted">
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-4">
                      <Image
                        src={project.avatar}
                        alt={project.client}
                        className="w-10 h-10 rounded-full"
                      />
                      <div>
                        <div className="font-semibold text-foreground">{project.client}</div>
                        <div className="text-sm text-muted-foreground">Omaha, NE</div>
                      </div>
                      <div className="flex gap-2 text-primary ">
                        <IoCallSharp className="w-6 h-6 text-primary-foreground  bg-primary rounded-full p-1" />
                        <MdOutlineMessage className="w-6 h-6 text-primary-foreground  bg-primary rounded-full p-1" />
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 text-foreground">{project.service}</td>
                  <td className="px-6 py-4">
                    <span
                      className={`font-semibold ${
                        project.status === "Accepted"
                          ? "text-green-500"
                          : project.status === "Declined"
                          ? "text-destructive"
                          : project.status === "Pending"
                          ? "text-yellow-500"
                          : "text-muted-foreground"
                      }`}
                    >
                      {project.status === "Accepted"
                        ? "Scheduled"
                        : project.status === "Declined"
                        ? "Declined"
                        : project.status === "Pending"
                        ? "Contacted"
                        : project.status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {/* ===== All Review Modal ===== */}
<Modal
  open={isAllReviewOpen}
  onCancel={closeAllReviewModal}
  footer={null}
  destroyOnClose
>
  {!selectedReviews?.length ? (
    <div className="py-10 text-center">
      <div className="mx-auto mb-3 h-12 w-12 rounded-full bg-muted flex items-center justify-center">
        <svg viewBox="0 0 24 24" className="h-6 w-6 text-muted-foreground">
          <path
            fill="currentColor"
            d="M12 12c2.7 0 5-2.3 5-5s-2.3-5-5-5-5 2.3-5 5 2.3 5 5 5Zm0 2c-4 0-8 2-8 6v1h16v-1c0-4-4-6-8-6Z"
          />
        </svg>
      </div>
      <p className="text-sm text-muted-foreground">No reviews yet</p>
    </div>
  ) : (
    <div className="max-h-[70vh] overflow-y-auto space-y-4">
      {selectedReviews.map((item: any, i: number) => {
        const name = item?.reviewBy?.firstName || "Anonymous";
  

        return (
          <div
            key={i}
            className="rounded-lg border border-border bg-card p-4 shadow-sm hover:shadow-md transition-shadow"
          >
            <div className="flex items-start gap-3">
              {/* Avatar */}
              <Image
                src={item?.reviewBy?.image}
                alt={name}
                width={40}
                height={40}
                className="h-10 w-10 rounded-full object-cover border border-border"
              />

              {/* Header: name + rating + date */}
              <div className="flex-1">
                <div className="flex flex-wrap items-center gap-2">
                  <span className="font-medium text-foreground">{name}</span>
                  <StarRating value={parseFloat(item?.rating) || 0} />
                  <span className="text-xs text-muted-foreground">
                    {formatDate(item?.createdAt)}
                  </span>
                </div>

                {/* Comment */}
                {item?.comment ? (
                  <p className="mt-2 whitespace-pre-wrap text-foreground">
                    {item.comment}
                  </p>
                ) : (
                  <p className="mt-2 text-muted-foreground italic">
                    No comment provided.
                  </p>
                )}
              </div>
            </div>
          </div>
        );
      })}
    </div>
  )}
</Modal>

    </div>
  );
}
