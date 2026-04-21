"use client";
import { useState } from "react";

import ServiceDetails from "./ServiceDetails";
import styles from "@/app/styles.module.css";


import ProjectCard from "../Card/ProjectCard";
import LicenseCard from "../Card/LicenseCard";
import { useGetSingleUserServiceQuery } from "@/redux/features/contractor/contractorApi";
import { useGetLicenseQuery } from "@/redux/features/user/userApi";



// "Services",
const tabs = ["Projects",  "Licenses & Insurance"];

// eslint-disable-next-line no-unused-vars
// const cardDatas = [
//   {
//     title: "Pink Dyer",
//     location: "Huston TX",
//     rating: 5,
//     budget: 350,
//     tags: ["Featured", "Edit", "Remove"],
//     image: project1,
//   },
//   {
//     title: "Blue Sky",
//     location: "Austin TX",
//     rating: 4,
//     budget: 420,
//     tags: ["Featured", "Edit"],
//     image: project2,
//   },
//   {
//     title: "Green Haven",
//     location: "Dallas TX",
//     rating: 3,
//     budget: 280,
//     tags: ["Edit"],
//     image: project3,
//   },
//   {
//     title: "Green Haven",
//     location: "Dallas TX",
//     rating: 3,
//     budget: 280,
//     tags: ["Edit"],
//     image: project3,
//   },
// ];

// const licenses = [
//   {
//     title: "Licensed",
//     number: "90180938",
//     date: "May 25, 2025",
//     state: "State of California",
//     status: "Verified",
//   },
//   {
//     title: "Licensed",
//     number: "12345678",
//     date: "June 15, 2024",
//     state: "State of New York",
//     status: "Verified",
//   },
// ];








export default function Tabs() {

  const { data: myServices } = useGetSingleUserServiceQuery(undefined);
  const { data: myLicense } = useGetLicenseQuery(undefined);
  const contractorProfileData = myServices?.data[0]?.contractorId
  const [activeTab, setActiveTab] = useState("Projects");









const tabContent = {
  Projects: (
    <div>
      <div className={`container mx-auto ${styles.fontDmSans}`}>
        <div className="flex justify-between items-center ">
          <div>
            <h1 className={`text-4xl  mb-5   ${styles.fontDmSans}`}>
              Project <span className="font-semibold">{myServices?.data?.length}</span>
            </h1>
          </div>
          {/* <div>
            <h1 className="text-sm underline text-blue-700">View All</h1>
          </div> */}
        </div>
        {/* <div className="grid  grid-cols-2 md:grid-cols-3 2xl:grid-cols-4 gap-3 px-3">
          {myServices?.data?.map((cardData, idx) => {
            return <ProjCard key={idx} cardData={cardData} />;
          })}
        </div> */}
        <div className="grid  grid-cols-2 md:grid-cols-3 2xl:grid-cols-4 gap-3 px-3">
          {myServices?.data?.map((project, idx) => {
            return <ProjectCard key={idx} project={project} />;
          })}
        </div>
      </div>
    <ServiceDetails contractorProfileData={contractorProfileData} />
    </div>
  ),
  Services: (
    <div>
      <div className={`container mx-auto ${styles.fontDmSans}`}>
        <div className=" ">
          <div>
            <h1 className={`text-4xl  mb-5   ${styles.fontDmSans}`}>
              Service <span className="font-semibold">{myServices?.data?.length}</span>
            </h1>
          </div>
        </div>
        <div className="grid  grid-cols-2 md:grid-cols-3 2xl:grid-cols-4 gap-3 px-3">
          {myServices?.data?.map((project, idx) => {
            return <ProjectCard key={idx} project={project} />;
          })}
        </div>
      </div>
    </div>
  ),
  "Licenses & Insurance": (
    <div>
      <div className={`container mx-auto ${styles.fontDmSans}`}>
        <div className=" ">
          <div>
            <h1 className={`text-4xl  mb-5   ${styles.fontDmSans}`}>
              Licenses & Insurance{" "}
              <span className="font-semibold">{myLicense?.length}</span>
            </h1>
          </div>
        </div>
        <div className="grid  grid-cols-2 md:grid-cols-3 2xl:grid-cols-4 gap-3 px-3">
          {myLicense?.data?.map((license, idx) => {
            return <LicenseCard key={idx} license={license} />;
          })}
        </div>
      </div>
    </div>
  ),
  // Reviews: (
  //   <div>
  //     <h2 className="text-lg font-semibold mb-2">Reviews</h2>
  //     <p>Ei khane apnar customer reviews thakbe.</p>
  //   </div>
  // ),
};









  return (
    <div className="container mx-auto my-8">
      <div className="flex border-b border-gray-300">
        {tabs.map((tab) => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={`pb-3 px-4 text-sm font-medium focus:outline-none ${
              activeTab === tab
                ? "text-blue-600 border-b-2 border-blue-600"
                : "text-gray-500 hover:text-gray-700"
            }`}
          >
            {tab}
          </button>
        ))}
      </div>

      {/* Content area */}
      <div className="mt-6">{tabContent[activeTab]}</div>
    </div>
  );
}
