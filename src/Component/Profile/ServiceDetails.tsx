'use client';
import Image from 'next/image';
import { useState } from 'react';
import { FaStar, FaStarHalfAlt } from 'react-icons/fa';

import styles from '@/app/styles.module.css';
import { Modal, Pagination } from 'antd';
import { useGetAllReferQuery } from '@/redux/features/others/otherApi';


const StarRating = ({ rating }) => {
  const fullStars = Math.floor(rating);
  const halfStar = rating % 1 >= 0.5;
  const stars = [];

  for (let i = 0; i < fullStars; i++) {
    stars.push(<FaStar key={'full' + i} className="text-yellow-400 w-4 h-4" />);
  }
  if (halfStar) {
    stars.push(
      <FaStarHalfAlt key="half" className="text-yellow-400 w-4 h-4" />
    );
  }
  while (stars.length < 5) {
    stars.push(
      <FaStar
        key={'empty' + stars.length}
        className="text-yellow-200 w-4 h-4"
      />
    );
  }
  return <div className="flex space-x-1">{stars}</div>;
};

const ServiceDetails = ({contractorProfileData}) => {
  const [page,setPage]=useState(1)
  const {data:allReviews}=useGetAllReferQuery(undefined)
  const [isModalOpen, setIsModalOpen] = useState(false);


  const handleOpenModal = () => setIsModalOpen(true);
  const handleCloseModal = () => setIsModalOpen(false);

 

  const meta = allReviews?.data?.meta;
  // Use the 'limit' from meta for dynamic items per page
  const limit = meta?.limit;
  const totalItems = meta?.total;

  // Calculate current items to show based on page and limit

  const currentItems = allReviews?.data?.reviews

  const onPageChange = (page: number) => {
    setPage(page);
  };









  return (
    <div className="w-full container mx-auto px-6 py-10 bg-white text-gray-900 flex flex-col md:flex-row md:gap-20 rounded-md">
      {/* Left Side - Service Details */}
      <div className="md:flex-[0.45] pb-8 md:pb-0 pr-0 md:pr-10 ">
        <h1 className="text-xl md:text-2xl font-semibold flex items-center gap-2">
          Service Details
        </h1>
        <div className="mb-10 flex gap-8 justify-between items-center border-b py-3 border-gray-200">
          <div>
            <h2 className="font-bold text-xl mb-1">Company Name</h2>
            <p className="text-gray-900 mb-1">{contractorProfileData?.companyName}</p>
          </div>
          <div className="w-[165px]">
            <h2 className="font-bold text-xl mb-1">Address</h2>
            <p className="text-gray-600 text-sm">
             {contractorProfileData?.address}
            </p>
          </div>
        </div>
        <div className="mb-10 flex gap-8 justify-between items-center">
          <div>
            <h2 className="font-bold text-xl mb-1">Phone Number</h2>
            <p className="text-gray-900 mb-1">{contractorProfileData?.phone}</p>
          </div>
    
        </div>
      </div>

      {/* Right Side - Reviews */}
      <div className="md:flex-[0.55] pt-6 md:pt-0">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-xl md:text-2xl font-semibold flex items-center gap-2">
            Review
          </h1>
          <button
            onClick={handleOpenModal}
            className="text-sm md:text-base text-blue-600 hover:underline"
          >
            View all
          </button>
        </div>
        <h1 className="text-lg md:text-xl font-semibold flex items-center gap-2">
       All Reviews : {meta?.total}
        </h1>
        {currentItems?.slice(0, 2).map((item, index) => (
          <div
            key={index}
            className="border-b border-gray-200 py-4 flex gap-4 items-start"
          >
            <Image
              src={item?.user?.image}
              alt="Profile"
              className="rounded-full w-10 h-10 object-cover"
              width={100}
              height={100}
            />
            <div className="flex-1">
              <div className="flex justify-between items-center mb-0.5">
                <p className="font-bold text-sm">{(item?.user?.firstName) + ' ' + (item?.user?.lastName
)}</p>
                <StarRating rating={item?.rating} />
              </div>
              <p className="text-xs text-gray-600 mb-1">{item?.createdAt.split('T')[0]}</p>
              <p className="text-gray-800 text-sm">{item?.comment}</p>
            </div>
          </div>
        ))}
      </div>

      {/* Modal */}
      <Modal
        open={isModalOpen}
        onCancel={handleCloseModal}
        footer={null}
        // title="All Reviews"
        width={700}
      >
        <div className={`space-y-4 ${styles.fontDMSans}`}>
          <div className="py-3 border-b-2 border-black ">
            <h1 className={` ${styles.fontDMSans} text-3xl font-bold`}>
         All Reviews : {meta?.total}
            </h1>
      
          </div>
          {currentItems?.map((item, index) => (
                 <div
            key={index}
            className="border-b border-gray-200 py-4 flex gap-4 items-start"
          >
            <Image
              src={item?.user?.image}
              alt="Profile"
              className="rounded-full w-10 h-10 object-cover"
              width={100}
              height={100}
            />
            <div className="flex-1">
              <div className="flex justify-between items-center mb-0.5">
                <p className="font-bold text-sm">{(item?.user?.firstName) + ' ' + (item?.user?.lastName
)}</p>
                <StarRating rating={item?.rating} />
              </div>
              <p className="text-xs text-gray-600 mb-1">{item?.createdAt.split('T')[0]}</p>
              <p className="text-gray-800 text-sm">{item?.comment}</p>
            </div>
          </div>
          ))}
        </div>
        <div className="pt-4 flex justify-end">
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
      </Modal>
    </div>
  );
};

export default ServiceDetails;
