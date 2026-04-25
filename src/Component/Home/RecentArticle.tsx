'use client';

import ArticleCard from '../Card/ArticleCard';
import Link from 'next/link';
import { useGetAllArticlesQuery } from '@/redux/features/others/otherApi';

const RecentArticle = ({ cmsData }: { cmsData?: any }) => {
  const { data: articles } = useGetAllArticlesQuery(undefined);

  if (cmsData?.isVisible === false) return null;

  const title = cmsData?.title || "Please set title in CMS";
  const titleParts = title.split(" ");
  const firstWord = titleParts[0];
  const restOfTitle = titleParts.slice(1).join(" ");

  return (
    <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8 md:py-12">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-8 md:mb-12">
        <div>
          <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-foreground">
            <span className="bg-primary text-primary-foreground px-3 py-1 rounded">{firstWord}</span>
            <span className="ml-2">{restOfTitle}</span>
          </h1>
        </div>
        <div>
          <Link href={'/article'}>
            <p className="underline text-sm sm:text-base md:text-lg text-primary hover:text-primary/80 transition-colors">See All Articles</p>
          </Link>
        </div>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 md:gap-6 mb-8">
        {articles?.data?.result
          ?.map((cardData, idx) => {
            return <ArticleCard key={idx} cardData={cardData} />;
          })
          .slice(0, 4)}
      </div>
    </div>
  );
};

export default RecentArticle;
