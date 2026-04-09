'use client'
import IntCard from '../Interior/IntCard';
import styles from '@/app/styles.module.css';
import Link from 'next/link';
import { useGetAllServicesQuery } from '../../redux/features/contractor/contractorApi';
import { useState } from 'react';
import NoItems from '../../utils/NoItems';
import { Pagination } from 'antd';

const ExtNear = ({ debouncedSearchTerm, cmsData }) => {
  const [page, setPage] = useState(1);
  const type = "outdoor";
  const { data: allService } = useGetAllServicesQuery({
    page,
    search: debouncedSearchTerm,
    type,
  });

  const meta = allService?.data?.meta;
  // Use the 'limit' from meta for dynamic items per page
  const limit = meta?.limit;
  const totalItems = meta?.total;

  // Calculate current items to show based on page and limit

  const currentItems = allService?.data?.result;

  const onPageChange = (page: number) => {
    setPage(page);
  };

  if (cmsData?.isVisible === false) return null;

  return (
    <div
      className={`container mx-auto bg-[#ffffff] my-8 p-4 pt-8 ${styles.fontDmSans}`}
    >
      <div>
        <h1 className={`text-4xl font-bold mb-5   ${styles.fontDmSans}`}>
          {cmsData?.title || "Exterior Project Near You"}
        </h1>
      </div>

        <div className="px-3">
        {currentItems?.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-3">
            {currentItems.map((project, idx) => (
              <Link key={idx} href="/location">
                <IntCard project={project} />
              </Link>
            ))}
          </div>
        ) : (
          <NoItems />
        )}
      </div>
       <Pagination
          current={page}
          pageSize={limit} // Use dynamic page size based on 'limit'
          total={totalItems} // Total number of items
          onChange={onPageChange}
          showSizeChanger={false}
          className="flex justify-center"
          // Show the total number of pages (meta.totalPage)
          pageSizeOptions={[limit?.toString()]}
          // showTotal={(total) => `Total ${total} items`}
        />
    </div>
  );
};

export default ExtNear;
