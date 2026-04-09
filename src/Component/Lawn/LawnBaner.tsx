"use client";
import { HiOutlineLocationMarker } from "react-icons/hi";

export default function LawnBanner({ setSearch, cmsData }) {
  const handleSearchChange = (e) => {
    setSearch(e.target.value);
  };

  if (cmsData?.isVisible === false) return null;

  return (
    <div className="w-full bg-[#FFFFFF] container  mx-auto my-5 px-4 py-12 shadow-lg rounded-xl sm:px-6 lg:px-8">
      <div className="">
        {/* Main Heading */}
        <h1 className="text-3xl font-bold leading-tight text-gray-900 sm:text-3xl lg:text-4xl xl:text-5xl">
          {cmsData?.title ||
            "An Interior Isn't Just A Space; It's Where Comfort Meets Craftsmanship."}
        </h1>

        {/* Project Location Section */}
        <div className="mt-12 sm:mt-16">
          <label className="block text-sm font-medium text-gray-700 mb-3">
            Project Location
          </label>

          {/* Location Input Field */}
          <div className="relative">
            <input
              type="text"
              onChange={(e) => handleSearchChange(e)}
              className="w-full max-w-2xl rounded-lg border border-gray-300 bg-white px-4 py-3 pr-12 text-gray-900 focus:border-gray-400 focus:outline-none focus:ring-1 focus:ring-gray-400"
            />
            <div className="absolute inset-y-0 right-1 sm:right-4 md:right-[60px] lg:right-[300px] xl:right-[550px] 2xl:right-[800px] flex items-center pr-4">
              <HiOutlineLocationMarker className="h-5 w-5 text-gray-500" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
