'use client'
import { useGetAllUserQuery } from '@/redux/features/user/userApi';
import { Pagination } from 'antd';
import Image from 'next/image';
import Link from 'next/link';
import { useState } from 'react';
import { FaCheckCircle, FaStar } from 'react-icons/fa';
import { PiQuestionFill } from 'react-icons/pi';



const ProConstractorPage = () => {
  const [page, setPage] = useState(1);
const role = 'vipContractor'
const {data:contractors}=useGetAllUserQuery({page,role})
  const meta = contractors?.data?.meta;
const limit = meta?.limit;
  const totalItems = meta?.total;

  // Calculate current items to show based on page and limit

  const currentItems = contractors?.data?.result

  const onPageChange = (page: number) => {
    setPage(page);
  };
  return (
    <div className="md:w-[100%] p-7 mx-auto my-8">
      <h1 className="text-xl font-bold text-foreground">Select A Pro</h1>
      <p className="text-lg my-3 text-muted-foreground">
        Choose the person you are looking for a guidance from!
      </p>

      <div className=" bg-card border border-border rounded-xl p-7 space-y-6">
        {currentItems?.map(contractor => (
          <div
            key={contractor.id}
            className="flex flex-col lg:flex-row bg-card border border-border rounded-lg overflow-hidden shadow-md"
          >
            {/* Left - Image & Name */}
            <div className="relative w-full lg:w-1/2">
              <Image
                src={contractor.image}
                alt={contractor.name}
                width={600}
                height={400}
                className="object-cover h-full w-full"
              />
              <div className="absolute bottom-4 left-4 text-background text-xl font-semibold">
                {contractor.name}
              </div>
              <Link href={`/profile/${contractor?._id}`}>

              <button className="absolute bottom-4 right-4 bg-primary hover:bg-primary/90 text-primary-foreground text-sm px-4 py-1 rounded">
                View Profile
              </button>
              </Link>
            </div>

            {/* Right - Info */}
            <div className="w-full lg:w-1/2 bg-muted p-6 flex flex-col justify-between">
              <div className="space-y-2">
                <div className="flex items-center gap-2 text-sm font-medium text-foreground">
                  <FaCheckCircle className="text-primary" />
                  Verified Contractor
                </div>

                <div className="flex items-center gap-2 text-sm text-foreground">
                  <PiQuestionFill className="text-primary text-lg" />
                  <span className="font-bold">
                    {contractor.completedTasks}
                  </span>{' '}
                  Completed Task
                </div>

                <div className="flex items-center gap-2 text-sm text-foreground">
                  <FaStar className="text-yellow-500" />
                  <span className="font-bold">{contractor.rating}</span> (
                  {contractor.reviews} reviews)
                </div>
              </div>

              <div className="flex justify-between items-center mt-4">
                <div className="text-foreground text-sm font-medium">
                  Expertise
                </div>
                <div className="text-xl font-bold text-foreground">
                  {contractor.rate}
                </div>
              </div>
              <Link href={'/inbox'}>
                <button className="w-full mt-4 bg-primary hover:bg-primary/90 text-primary-foreground py-2 rounded font-semibold">
                  Select & Continue
                </button>
              </Link>
            </div>
          </div>
        ))}
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

export default ProConstractorPage;
