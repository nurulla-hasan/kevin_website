"use client";
import WelBan from "@/Component/Homepage/WelBan";
import ExpertConstructor from "@/Component/Homepage/ExpertConstructor";
import MembershipBanner from "@/Component/Homepage/MembershipBanner";
import Service from "@/Component/Home/Service";
import RecentArticle from "@/Component/Home/RecentArticle";
import { useGetCmsHomeDataQuery } from "@/redux/features/cms/homeApi";
import { useEffect, useState } from "react";

const HomePage = () => {
  const { data: cmsData } = useGetCmsHomeDataQuery(undefined);
  const loggedInCms = cmsData?.data?.loggedInPage;

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
      <WelBan setSearch={setSearch} cmsData={loggedInCms?.welcomeBanner} />
      <div className="my-8 container mx-auto">
        <Service setFilter={setFilter} />
      </div>
      <ExpertConstructor
        debouncedSearchTerm={debouncedSearchTerm}
        filter={filter}
        cmsData={loggedInCms?.expertContractor}
      />
      <MembershipBanner cmsData={loggedInCms?.membershipBanner} />
      <RecentArticle cmsData={loggedInCms?.recentArticle} />
    </div>
  );
};

export default HomePage;
