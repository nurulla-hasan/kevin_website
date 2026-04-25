"use client";

import ConstractorCard from "../Card/ConstractorCard";
import { useState } from "react";
import { useGetAllUserQuery } from "@/redux/features/user/userApi";
import { Pagination } from "antd";

const ExpertConstructor = ({
  debouncedSearchTerm,
  filter,
  cmsData,
}: {
  debouncedSearchTerm: string;
  filter: string;
  cmsData?: any;
}) => {
  const [page, setPage] = useState(1);
  const role = "contractor";
  const { data: contractors } = useGetAllUserQuery({
    page,
    role,
    search: debouncedSearchTerm,
    categotyName: filter,
  });
  const meta = contractors?.data?.meta;
  // Use the 'limit' from meta for dynamic items per page
  const limit = meta?.limit;
  const totalItems = meta?.total;

  // Calculate current items to show based on page and limit

  const currentItems = contractors?.data?.result;

  const onPageChange = (page: number) => {
    setPage(page);
  };

  if (cmsData?.isVisible === false) return null;

  return (
    <div className="py-8 md:py-12">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-8 md:mb-10 text-foreground">
          {cmsData?.title || "Please set title in CMS"}
        </h1>

        <div className="mb-6">
          {currentItems && currentItems.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 md:gap-6">
              {currentItems?.map((contractor, idx) => {
                return <ConstractorCard key={idx} contractor={contractor} />;
              })}
            </div>
          ) : (
            <div className="flex flex-col items-center justify-center py-12 text-center bg-muted rounded-lg shadow-inner">
              <div className="flex items-center justify-center w-12 h-12 rounded-full border border-border mb-4">
                <svg
                  className="w-6 h-6 text-muted-foreground"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={3}
                    d="M12 4v16m8-8H4"
                  />
                </svg>
              </div>
              <h2 className="text-lg font-semibold text-foreground">
                No items found
              </h2>
              <p className="text-sm text-muted-foreground mt-1">
                Try adjusting your search or check back later.
              </p>
            </div>
          )}
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

export default ExpertConstructor;
