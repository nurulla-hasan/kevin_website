"use client"
import InteriorBanner from "@/Component/Interior/IntBaner";
import IntNear from "@/Component/Interior/IntNear";
import { useGetCmsInteriorDataQuery } from "@/redux/features/cms/interiorApi";
import { useEffect, useState } from "react";
const InteriorPage = () => {
  const { data: cmsData } = useGetCmsInteriorDataQuery(undefined, {
    refetchOnMountOrArgChange: true,
  });
  const interiorCms = cmsData?.data?.sections;
  const [search, setSearch] = useState("");
  const [debouncedSearchTerm, setDebouncedSearchTerm] = useState(search);
  // console.log("search---->",search);
  // Handle the debounce for search term input
  useEffect(() => {
    const timeoutId = setTimeout(() => {
      setDebouncedSearchTerm(search);
    }, 500);

    return () => {
      clearTimeout(timeoutId);
    };
  }, [search]);

  return (
    <div>
      <div className="p-4">
        <InteriorBanner setSearch={setSearch} cmsData={interiorCms?.banner} />
      </div>

      <IntNear debouncedSearchTerm={debouncedSearchTerm} cmsData={interiorCms?.projects} />
    </div>
  );
};

export default InteriorPage;
