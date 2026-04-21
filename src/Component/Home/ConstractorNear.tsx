'use client';

import ConstractorCard from '../Card/ConstractorCard';
import styles from '@/app/styles.module.css';
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
    <div>
      <div className={`container mx-auto ${styles.fontDmSans}`}>
        <h1
          className={`text-4xl font-bold text-center mb-10   ${styles.fontDmSans}`}
        >
          {cmsData?.title || "Contractor Near You"}
        </h1>
        <div className="grid grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-6 mb-6 px-3">
          {currentItems?.map((contractor, idx) => {
            return <ConstractorCard key={idx} contractor={contractor} />;
          })}
        </div>

        {/* Pagination */}
        <div className="mb-3">
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
