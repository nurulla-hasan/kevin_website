'use client';

import ConstractorCard from '../Card/ConstractorCard';
import { useState } from 'react';
import { useGetAllUserQuery } from '@/redux/features/user/userApi';
import { Pagination } from 'antd';

const ConstractorNear = ({ cmsData }: { cmsData?: any }) => {
  const [page, setPage] = useState(1);
  const role = 'contractor'
  const { data: contractors } = useGetAllUserQuery({
    page,
    role
  });

  const meta = contractors?.data?.meta;
  const limit = meta?.limit;
  const totalItems = meta?.total;

  // Calculate current items to show based on page and limit

  const currentItems = contractors?.data?.result

  const onPageChange = (page: number) => {
    setPage(page);
  };

  if (cmsData?.isVisible === false) return null;

  return (
    <div className="py-8 md:py-12">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-center mb-8 md:mb-10 text-foreground">
          {cmsData?.title || "Please set title in CMS"}
        </h1>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 md:gap-6 mb-6">
          {currentItems?.map((contractor, idx) => {
            return <ConstractorCard key={idx} contractor={contractor} />;
          })}
        </div>

        {/* Pagination */}
        <div className="mt-6 md:mt-8">
        <Pagination
          current={page}
          pageSize={limit} 
          total={totalItems} 
          onChange={onPageChange}
          showSizeChanger={false}
          className="flex justify-center"

          pageSizeOptions={[limit?.toString()]}

        />
      </div>
      </div>
    </div>
  );
};

export default ConstractorNear;
