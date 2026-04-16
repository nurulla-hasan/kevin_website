"use client";

import Hero from '@/Component/Article/Hero';
import RecentlyPosted from '@/Component/Article/RecentlyPosted';
import LoadingSpinner from '@/Component/Loading';
import { useGetCmsArticlesDataQuery } from '@/redux/features/cms/articlesApi';
import { useGetAllArticlesQuery } from '@/redux/features/others/otherApi';
import { useState } from 'react';

const ArticlePage = () => {
  const { data: cmsData } = useGetCmsArticlesDataQuery(undefined, {
    refetchOnMountOrArgChange: true,
  });
  const articleCms = cmsData?.data?.sections;
  const [page, setPage] = useState(1);
  const { data: allArticles, isLoading } = useGetAllArticlesQuery(page);

  console.log("page--------->", page);

  if (isLoading) return <LoadingSpinner />;

  return (
    <div>
      <Hero allArticles={allArticles} cmsData={articleCms} />
      <RecentlyPosted
        allArticles={allArticles}
        setPage={setPage}
        page={page}
        cmsData={articleCms?.recently}
      />
    </div>
  );
};

export default ArticlePage;
