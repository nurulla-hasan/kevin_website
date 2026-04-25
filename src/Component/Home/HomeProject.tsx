/* eslint-disable @typescript-eslint/no-explicit-any */
'use client';

import ProjectCard from '../Card/ProjectCard';
import Link from 'next/link';
import { useState } from 'react';
import { useGetAllServicesQuery } from '@/redux/features/contractor/contractorApi';

const HomeProject = () => {
  const [page, setPage] = useState<number>(1);

  const { data: services } = useGetAllServicesQuery({
    page,
    limit: 8,
  });

  const totalPage: number = services?.data?.meta?.totalPage || 1;

  const filtered = services?.data?.result?.filter((service: any) => {
    if (!service?.review?.length) return false;

    const avg =
      service.review.reduce(
        (sum: number, review: { star: number }) => sum + review.star,
        0
      ) / service.review.length;

    return avg > 0;
  });

  return (
    <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8 md:py-12">
      <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-6 md:mb-8 text-foreground">
        Please set title in CMS
      </h1>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 md:gap-6">
        {filtered && filtered.length > 0 ? (
          filtered.map((project: any, idx: number) => (
            <Link key={project._id || idx} href="/location">
              <ProjectCard project={project} />
            </Link>
          ))
        ) : (
          <p className="col-span-full text-center text-muted-foreground py-8">
            No popular projects found
          </p>
        )}
      </div>

      {/* Pagination */}
      <div className="flex justify-center items-center gap-3 mt-8 md:mt-10">
        <button
          onClick={() => setPage(p => Math.max(1, p - 1))}
          disabled={page === 1}
          className="px-4 py-2 border border-border rounded-lg bg-card text-card-foreground hover:bg-muted disabled:opacity-50 transition-colors"
        >
          Prev
        </button>
        <span className="text-foreground font-medium">
          Page {page} of {totalPage}
        </span>
        <button
          onClick={() => setPage(p => Math.min(totalPage, p + 1))}
          disabled={page === totalPage}
          className="px-4 py-2 border border-border rounded-lg bg-card text-card-foreground hover:bg-muted disabled:opacity-50 transition-colors"
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default HomeProject;
