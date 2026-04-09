'use client'
import ExtNear from '@/Component/Exterior/ExtNear';
import ExteriorBanner from '@/Component/Exterior/ExtBaner';
import { useGetCmsExteriorDataQuery } from '@/redux/features/cms/exteriorApi';
import { useEffect, useState } from 'react';

const ExteriorPage = () => {
    const { data: cmsData } = useGetCmsExteriorDataQuery(undefined, {
      refetchOnMountOrArgChange: true,
    });
    const exteriorCms = cmsData?.data?.sections;
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
        <ExteriorBanner setSearch={setSearch} cmsData={exteriorCms?.banner}/>
      </div>

      <ExtNear debouncedSearchTerm={debouncedSearchTerm} cmsData={exteriorCms?.projects}/>
    </div>
  );
};

export default ExteriorPage;
