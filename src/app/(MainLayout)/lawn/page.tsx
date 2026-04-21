'use client'
import LawnBanner from '@/Component/Lawn/LawnBaner';
import LawnNear from '@/Component/Lawn/LawnNear';
import { useGetCmsLawnGardenDataQuery } from '@/redux/features/cms/lawnGardenApi';
import { useEffect, useState } from 'react';

const LawnAndGardenPage = () => {
    const { data: cmsData } = useGetCmsLawnGardenDataQuery(undefined, {
      refetchOnMountOrArgChange: true,
    });
    const lawnCms = cmsData?.data?.sections;
    const [search, setSearch] = useState("");
    const [debouncedSearchTerm, setDebouncedSearchTerm] = useState(search);
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
        <LawnBanner setSearch={setSearch} cmsData={lawnCms?.banner}/>
      </div>

      <LawnNear debouncedSearchTerm={debouncedSearchTerm} cmsData={lawnCms?.projects}/>
    </div>
  );
};

export default LawnAndGardenPage;
