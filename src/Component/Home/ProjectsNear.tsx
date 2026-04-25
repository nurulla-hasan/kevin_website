"use client";

import styles from "@/app/styles.module.css";
import Link from "next/link";
import { useGetAllServicesQuery } from "@/redux/features/contractor/contractorApi";
import { useState } from "react";
import ProjectCard from "../Card/ProjectCard";
import { Pagination } from "antd";

const ProjectsNear = ({
  debouncedSearchTerm,
  filter,
  cmsData,
}: {
  debouncedSearchTerm: string;
  filter: string;
  cmsData?: any;
}) => {
  const [page, setPage] = useState(1);
  const { data: services } = useGetAllServicesQuery({
    page,
    search: debouncedSearchTerm,
    categoryName: filter,
  });

  const meta = services?.data?.meta;
  const limit = meta?.limit;
  const totalItems = meta?.total;

  // Calculate current items to show based on page and limit

  const currentItems = services?.data?.result;

  const onPageChange = (page: number) => {
    setPage(page);
  };

  if (cmsData?.isVisible === false) return null;

  return (
    <div className="container mx-auto">
      <h1 className="text-4xl font-bold mb-5 text-foreground">
        {cmsData?.title || "Please set title in CMS"}
      </h1>
      <div className="px-3">
        {currentItems && currentItems.length > 0 ? (
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
            {currentItems.map((project: any, idx: number) => (
              <Link key={idx} href={"/location"}>
                <ProjectCard project={project} />
              </Link>
            ))}
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
      <div className="my-6">
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
    </div>
  );
};

export default ProjectsNear;
