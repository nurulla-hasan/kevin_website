"use client";
import Banner from "@/Component/Home/Banner";
import ConstractorNear from "@/Component/Home/ConstractorNear";
import ProjectsNear from "@/Component/Home/ProjectsNear";
import RecentArticle from "@/Component/Home/RecentArticle";
import { useGetCmsHomeDataQuery } from "@/redux/features/cms/homeApi";
import { useEffect, useState } from "react";

const LandingPage = () => {
  const { data: cmsData } = useGetCmsHomeDataQuery(undefined, {
    refetchOnMountOrArgChange: true,
  });
  const landingCms = cmsData?.data?.landingPage;

  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState("");
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
      <Banner
        setSearch={setSearch}
        setFilter={setFilter}
        cmsData={landingCms?.banner}
      />
      <ProjectsNear
        debouncedSearchTerm={debouncedSearchTerm}
        filter={filter}
        cmsData={landingCms?.projectsNear}
      />

      {/* <HomeProject /> */}
      <div className="mt-12">
        <ConstractorNear cmsData={landingCms?.contractorNear} />
        <RecentArticle cmsData={landingCms?.recentArticle} />
      </div>
    </div>
  );
};

export default LandingPage;
