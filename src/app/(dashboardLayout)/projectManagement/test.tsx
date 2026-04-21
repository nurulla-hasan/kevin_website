"use client";
import { useState } from "react";
import { FiMapPin, FiClock } from "react-icons/fi";

import Image from "next/image";
import userImg from "@/assests/user.png";
import { IoCallSharp } from "react-icons/io5";
import { MdOutlineMessage } from "react-icons/md";
import { useRouter } from "next/navigation";
import {
  useBookedOrderforContractorQuery,
  useMyQuotesQuery,
  useUpdateAcceptOrRejectMutation,
  useUpdateQuoteStatusMutation,
} from "@/redux/features/contractor/contractorApi";
import { message } from "antd";

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
]

export default function ProjectManagement() {
  const [updateQuoteStatus] = useUpdateQuoteStatusMutation();
  const [updateAcceptOrReject]=useUpdateAcceptOrRejectMutation()

  const { data: myQuotes, refetch } = useMyQuotesQuery(undefined);
  const { data: myOrder, refetch:refetchMyOrder } = useBookedOrderforContractorQuery(undefined);
  
  const [activeTab, setActiveTab] = useState("Project Requests");
  const tabs = ["Project Requests", "Quote Management"];
  const router = useRouter();
  const handleViewDetails = (id) => {
    router.push(`/projectManagement/${id}`);
  };
  const handleReject = async (id) => {
    const data = {
      status: "rejected",
    };
    try {
      const res = await updateQuoteStatus({ id, data }).unwrap();
      if (res.success) {
        message.success(res?.message);
        refetch();
      } else {
        message.error(res?.message);
      }
    } catch (error) {
      message.error(error?.data?.message);
    }
  };
  const handleAccept = async (id) => {
    const data = {
      status: "accepted",
    };
    try {
      const res = await updateQuoteStatus({ id, data }).unwrap();
      if (res.success) {
        message.success(res?.message);
        refetch();
      } else {
        message.error(res?.message);
      }
    } catch (error) {
      message.error(error);
    }
  };
  const handleProjectAccept = async (id) => {

     const status= "accepted"

    try {
      const res = await updateAcceptOrReject({ id, status }).unwrap();
      if (res.success) {
        message.success(res?.message);
        refetchMyOrder();
      } else {
        message.error(res?.message);
      }
    } catch (error) {
      message.error(error);
    }
  };
  const handleProjectReject = async (id) => {

     const status= "rejected"

    try {
      const res = await updateAcceptOrReject({ id, status }).unwrap();
      if (res.success) {
        message.success(res?.message);
        refetchMyOrder();
      } else {
        message.error(res?.message);
      }
    } catch (error) {
      message.error(error);
    }
  };


  return (
    <div className="max-w-7xl mx-auto p-4 bg-white min-h-screen">
      <h1 className="text-3xl font-bold mb-6">Project Management</h1>

      {/* Tabs */}
      <div className="flex gap-2 mb-6">
        {tabs.map((tab) => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={`px-6 py-2 rounded-md font-semibold ${
              activeTab === tab
                ? "bg-blue-600 text-white"
                : "bg-gray-100 text-gray-700 border hover:bg-gray-200"
            }`}
          >
            {tab}
          </button>
        ))}
      </div>

      {/* Content based on tab */}
      {activeTab === "Project Requests" && (
        <div className="overflow-x-auto">
          <table className="w-full table-auto">
            <thead>
              <tr className="bg-green-200">
                <th className="px-6 py-3 text-left">Project Info</th>
                <th className="px-6 py-3 text-left">Price</th>
                <th className="px-6 py-3 text-left">Date</th>
                <th className="px-6 py-3 text-left">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y">
              {myOrder?.data?.map((project) => (
                <tr key={project.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4">
                    <div className="flex items-start gap-2">
                      <div className="w-[25%] flex flex-col justify-center items-center">
                        <Image
                          src={project?.user?.image}
                          alt={project?.firstName}
                          width={500}
                          height={500}
                          className="w-12 h-12 rounded-full"
                        />
                        <div className="font-semibold mt-1 text-gray-900">
                          {project.firstName}
                        </div>
                      </div>
                      <div>
                        <div className="text-sm">{project.serviceType}</div>
                     
                        <div className="flex gap-2 items-center text-sm text-gray-500">
                          <FiClock className="text-gray-400" />
                          {project.time}
                        </div>
                        <div className="flex gap-2 items-center text-sm text-gray-500">
                          <FiMapPin className="text-gray-400" />
                          {project.location}
                        </div>
                        <div onClick={()=>{}} className="flex gap-2 items-center text-sm text-gray-500">
                          <FiMapPin className="text-gray-400" />
                        All Review
                        </div>
                    
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 text-sm font-inter">
                    ${project.serviceId?.price}
                  </td>
                  <td className="px-6 py-4 text-sm">{project.date}</td>
                  <td className="px-6 py-4 space-y-2">
                    <button
                      onClick={() => handleViewDetails(project._id)}
                      className="w-full border px-4 py-2 rounded-md text-sm hover:bg-gray-100"
                    >
                      View Job Details
                    </button>
                    <div className="flex gap-2">
                      <button
                        onClick={() => handleProjectReject(project._id)}
                        className="flex-1 bg-red-500 text-white px-4 py-2 rounded-md text-sm"
                      >
                        Reject
                      </button>
                      <button
                        onClick={() => handleProjectAccept(project._id)}
                        className="flex-1 bg-blue-600 text-white px-4 py-2 rounded-md text-sm"
                      >
                        Accept
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {activeTab === "Quote Management" && (
        <div className="overflow-x-auto">
          <table className="w-full table-auto">
            <thead>
              <tr className="bg-green-200">
                <th className="px-6 py-3 text-left">Project Info</th>
                <th className="px-6 py-3 text-left">Status</th>
                <th className="px-6 py-3 text-left">Date</th>
                <th className="px-6 py-3 text-left">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y">
              {myQuotes?.data?.map((project) => (
                <tr key={project.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 flex items-start gap-2">
                    <div className="w-[50%] flex flex-col justify-center items-center">
                      <Image
                        src={project?.user?.image}
                        alt={""}
                        className="w-12 h-12 rounded-full"
                        height={500}
                        width={500}
                      />
                    </div>

                    <div>
                      <div className="font-semibold text-gray-900">
                        {project?.user?.firstName +
                          " " +
                          project?.user?.lastName}
                      </div>
                      <div className="text-sm">{project.service}</div>
                      <div className="text-sm text-gray-500">
                        {project?.projectLocation}
                      </div>
                      {/* <div className="text-sm text-gray-500">
                        {project.propertyType}
                      </div> */}
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <span
                      className={`text-sm font-semibold ${
                        project.status === "pending"
                          ? "text-blue-500"
                          : project.status === "accepted"
                          ? "text-green-500"
                          : "text-red-500"
                      }`}
                    >
                      {project.status}
                    </span>
                  </td>
                  <td className="px- py-4 text-sm">
                    {project.date.split("T")[0]}
                  </td>
                  <td className="px-6 py-4 space-y-2">
                    <button
                      onClick={() => handleViewDetails(project?._id)}
                      className="w-full border px-4 py-2 rounded-md text-sm hover:bg-gray-100"
                    >
                      View Job Details
                    </button>
                    {project.status === "pending" && (
                      <div className="flex gap-2">
                        <button
                          onClick={() => handleReject(project?._id)}
                          className="flex-1 bg-red-500 text-white px-4 py-2 rounded-md text-sm"
                        >
                          Reject
                        </button>
                        <button
                          onClick={() => handleAccept(project?._id)}
                          className="flex-1 bg-blue-600 text-white px-4 py-2 rounded-md text-sm"
                        >
                          Accept
                        </button>
                      </div>
                    )}
                    {project.status === "accepted" && (
                      <button
                        onClick={() => handleMessageClient(project.id)}
                        className="w-full bg-blue-600 text-white px-4 py-2 rounded-md text-sm"
                      >
                        Message Client
                      </button>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {activeTab === "Project Status" && (
        <div className="overflow-x-auto">
          <table className="w-full table-auto">
            <thead>
              <tr className="bg-green-200">
                <th className="px-6 py-3 text-left">Clients</th>
                <th className="px-6 py-3 text-left">Service</th>
                <th className="px-6 py-3 text-left">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y">
              {projectData.map((project) => (
                <tr key={project.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-4">
                      <Image
                        src={project.avatar}
                        alt={project.client}
                        className="w-10 h-10 rounded-full"
                      />
                      <div>
                        <div className="font-semibold text-gray-900">
                          {project.client}
                        </div>
                        <div className="text-sm text-gray-500">Omaha, NE</div>
                      </div>
                      {/* You can replace icons here as per your actual use */}
                      <div className="flex gap-2 text-blue-500 ">
                        <IoCallSharp className="w-6 h-6 text-white  bg-blue-600 rounded-full p-1" />
                        <MdOutlineMessage className="w-6 h-6 text-white  bg-blue-600 rounded-full p-1" />
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4">{project.service}</td>
                  <td className="px-6 py-4">
                    <span
                      className={`font-semibold ${
                        project.status === "Accepted"
                          ? "text-green-500"
                          : project.status === "Declined"
                          ? "text-red-500"
                          : project.status === "Pending"
                          ? "text-yellow-500"
                          : "text-gray-500"
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
      
    </div>
  );
}
