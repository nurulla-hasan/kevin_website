'use client';

import { useState } from 'react';
import ServiceDetails from '@/Component/Profile/ServiceDetails';
import ProjCard from '@/Component/Profile/ProjCard';

import ProjectCard from '@/Component/Card/ProjectCard';
import LicenseCard from '@/Component/Card/LicenseCard';
import ProfDet from '@/Component/Profile/ProfDet';
import FeaturedMedia from '@/Component/ContractorProfile/FeaturedMedia';
import { FaPlus } from 'react-icons/fa';
import Link from 'next/link';
import { licenses } from '@/constants';
import { useGetSingleUserServiceQuery } from '@/redux/features/contractor/contractorApi';

const ContractorProfilePage = () => {
  const tabs = ['Projects', 'Services', 'Licenses & Insurance'];
  const [activeTab, setActiveTab] = useState('Projects');
    const { data: myServices } = useGetSingleUserServiceQuery(undefined);
  const project = myServices?.data
  const contractorProfileData = myServices?.data[0]?.contractorId
const Projects=[]
  const tabContent = {
    Projects: (
      <div>
        <div className={`container mx-auto font-dm`}>
          <div className="flex justify-between items-center ">
            <div>
              <h1 className={`text-4xl  mb-5   font-dm`}>
                Project
                <span className="font-semibold">{project?.length}</span>
              </h1>
            </div>
            <div>
              <h1 className="text-sm underline text-blue-700">View All</h1>
            </div>
          </div>
          <div className="grid  grid-cols-2 md:grid-cols-3 2xl:grid-cols-3 gap-3 px-3">
            {/* Add New Media Button */}
            <div className="">
              <Link href={'/addProject'}>
                <button className="w-full h-full border-2 border-dashed border-gray-300 hover:border-blue-500 rounded-xl flex items-center justify-center bg-gray-50 hover:bg-blue-50 transition-all duration-200 hover:scale-105">
                  <div className="text-center">
                    <div className="w-8 h-8 bg-blue-600 hover:bg-blue-700 rounded-full flex items-center justify-center mx-auto mb-3 transition-colors duration-200 shadow-lg">
                      <FaPlus className="text-white text-xl" />
                    </div>
                    <p className="text-gray-600 text-base font-medium">
                      Add More Project
                    </p>
                  </div>
                </button>
              </Link>
            </div>
            {project?.map((cardData, idx) => {
              return <ProjCard key={idx} cardData={cardData} />;
            })}
          </div>
        </div>
        <ServiceDetails contractorProfileData={contractorProfileData}/>
      </div>
    ),
    Services: (
      <div>
        <div className={`container mx-auto font-dm`}>
          <div className=" ">
            <div>
              <h1 className={`text-4xl  mb-5 `}>
                Service{' '}
                <span className="font-semibold">{Projects?.length}</span>
              </h1>
            </div>
          </div>
          <div className="grid  grid-cols-2 md:grid-cols-3 2xl:grid-cols-4 gap-3 px-3">
            {Projects?.map((project, idx) => {
              return <ProjectCard key={idx} project={project} />;
            })}
          </div>
        </div>
      </div>
    ),
    'Licenses & Insurance': (
      <div>
        <div className={`container mx-auto `}>
          <div className=" ">
            <div>
              <h1 className={`text-4xl  mb-5  `}>
                Licenses & Insurance{' '}
                <span className="font-semibold">{Projects?.length}</span>
              </h1>
            </div>
          </div>
          <div className="grid  grid-cols-2 md:grid-cols-3 2xl:grid-cols-4 gap-3 px-3">
            {licenses?.map((license, idx) => {
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
const contractorId = 1
const profileData = {}
  return (
    <div>
      <nav
        className="flex items-center font-normal text-base leading-6  bg-white pl-3 md:pl-5 lg:pl-10 xl:pl-44 border-t border-gray-500 py-3"
        aria-label="breadcrumb"
      >
        <p className="text-black text-xl">Dashboard</p>
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
        <span className="text-black cursor-default text-xl">
          Public Profile
        </span>
      </nav>
      <div className="max-w-7xl mx-auto">
        <h1 className="text-2xl font-bold my-5">Edit Public Profile</h1>
        {/* Components */}
        <div className="bg-white p-8 rounded-xl">
          <FeaturedMedia />
          
          <ProfDet contractorId={contractorId}  profileData={profileData}/>
          {/* tab */}
          <div className="container mx-auto my-8">
            <div className="flex border-b border-gray-300">
              {tabs.map(tab => (
                <button
                  key={tab}
                  onClick={() => setActiveTab(tab)}
                  className={`pb-3 px-4 text-sm font-medium focus:outline-none ${
                    activeTab === tab
                      ? 'text-blue-600 border-b-2 border-blue-600'
                      : 'text-gray-500 hover:text-gray-700'
                  }`}
                >
                  {tab}
                </button>
              ))}
            </div>

            {/* Content area */}
            <div className="mt-6">{tabContent[activeTab]}</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContractorProfilePage;
