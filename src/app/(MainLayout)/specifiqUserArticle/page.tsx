"use client";

import Hero from "@/Component/Article/Hero";
import RecentlyPosted from "@/Component/Article/RecentlyPosted";
import LoadingSpinner from "@/Component/Loading";
import { useGetSingleUserArticleQuery } from "@/redux/features/others/otherApi";
import { useState } from "react";

const SpecifiqUserArticlePage = () => {
  const [page, setPage] = useState(1);
  const { data: allArticles, isLoading } = useGetSingleUserArticleQuery(page);

  if (isLoading) return <LoadingSpinner />;

  return (
    <div>
      <Hero allArticles={allArticles} />
      <RecentlyPosted allArticles={allArticles} setPage={setPage} page={page} />
    </div>
  );
};

export default SpecifiqUserArticlePage;
