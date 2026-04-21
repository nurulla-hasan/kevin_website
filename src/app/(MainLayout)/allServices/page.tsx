'use client'
import Service from '@/Component/Home/Service';
import { useEffect, useState } from 'react';
import { useGetAllServicesQuery } from '@/redux/features/contractor/contractorApi';
import AllServices from '@/Component/AllServices/AllServices';
import { Pagination } from 'antd';
import { useGetCmsSpecializedDataQuery } from '@/redux/features/cms/specializedApi';

const AllServicesPage = () => {
  const { data: cmsData } = useGetCmsSpecializedDataQuery(undefined, {
    refetchOnMountOrArgChange: true,
  });
  const specializedCms = cmsData?.data?.sections;
  const [search, setSearch] = useState("");
   const [filter, setFilter] = useState("");
  const [page, setPage] = useState(1);
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

  const { data: allService } = useGetAllServicesQuery({
    page,
    search: debouncedSearchTerm,
    categoryName: filter,
  });

  const meta = allService?.data?.meta;
  // Use the 'limit' from meta for dynamic items per page
  const limit = meta?.limit;
  const totalItems = meta?.total;

  // Calculate current items to show based on page and limit

  const currentItems = allService?.data?.result

  const onPageChange = (page: number) => {
    setPage(page);
  };

  return (
    <div>
      <div className="p-4">
        {/* <AllServicesBanner setSearch={setSearch} /> */}
      </div>
      <div className="container mx-auto">
        <Service setFilter={setFilter} />
      </div>
      {/* <IntNearServices />
      <ExtNearServices />
      <LawnGardenServices /> */}
      <AllServices allServices={currentItems} page={page} setPage={setPage} cmsData={specializedCms?.projects} />
      <div className="mb-3">
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

export default AllServicesPage;
