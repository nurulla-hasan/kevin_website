'use client';

import { useState } from 'react';
import { message, Modal } from 'antd';
import Calendar from 'react-calendar';
import { FiCalendar, FiClock, FiChevronDown } from 'react-icons/fi';
import SelectContractorCard from '@/Component/Card/SelectConstractorCard';
import 'react-calendar/dist/Calendar.css';
import { useAppDispatch, useAppSelector } from '@/redux/hooks';
import {
  selectLocation,
  selectService,
  selectTime,
  setService,
  setTime,
} from '@/redux/features/project/projectSlice';
import dayjs from 'dayjs';
import { useGetAllServicesQuery } from '@/redux/features/contractor/contractorApi';
import { useRouter } from 'next/navigation';
import { dateOptions, timeOptions } from '@/constants';
import { useBookServiceMutation } from '@/redux/features/others/otherApi';
// import { selectCurrentUser } from '@/redux/features/auth/authSlice';

export default function ContractorSearch() {
  const sortOptions = [
    'Price (Lowest to Highest)',
    'Price (Highest to Lowest)',
  ];
  const storedLocation = useAppSelector(selectLocation);
  const storedService = useAppSelector(selectService);
  const storedTime = useAppSelector(selectTime);
  // const [priceRange, setPriceRange] = useState(150);
  const [sortBy, setSortBy] = useState('Recommended');
  const [showSortDropdown, setShowSortDropdown] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [tempDate, setTempDate] = useState<Date | null>(null);
  // const user = useAppSelector(selectCurrentUser);
  const [page, setPage] = useState(1);
  const dispatch = useAppDispatch();
  const router = useRouter();
  const [bookService] = useBookServiceMutation();


const categoryName= storedService?.serviceType
const firstWord = categoryName.split(' ')[0];
  const { data: services } = useGetAllServicesQuery({
    categoryName:firstWord,
    page,
  });

  const totalPage = services?.data?.meta?.totalPage || 1;

  const isDateOption = (value: string) =>
    dateOptions.some(option => option.value === value);

  // Inside ContractorSearch, before return:
  const sortedServices = [...(services?.data?.result || [])];

  if (sortBy === 'Price (Lowest to Highest)') {
    sortedServices.sort((a, b) => a.price - b.price);
  } else if (sortBy === 'Price (Highest to Lowest)') {
    sortedServices.sort((a, b) => b.price - a.price);
  }

  const handleSelect = async service => {
    if (!storedLocation.address)
      return message.warning('Please input an address');
    if (!storedLocation.apt)
      return message.warning('Please input an apartment');
    // if (!storedService.serviceId)
    //   return message.warning('Please select a service');
    if (!storedService.serviceType)
      return message.warning('Please select a service type');
    if (!storedService.projectDescription)
      return message.warning('Please input a project description');
    if (!storedTime.preferredDate)
      return message.warning('Please select a date');
    if (!storedTime.preferredTime)
      return message.warning('Please select a time');
    if (!storedTime.projectDescription)
      return message.warning('Please input a project description');

    dispatch(
      setService({
        serviceId: service._id,
        contractorId: service.contractorId._id,
        contractorName: `${service.contractorId.firstName} ${service.contractorId.lastName}`,
        contractorImage: service.contractorId.image,
        hourlyRate: service.price,
      })
    );

    try {
      const data = {
        serviceId: storedService?.serviceId,
        serviceType: storedService.serviceType,
        location: storedLocation.address,
        zip: storedLocation.apt,
        projectDescription: storedTime.projectDescription,
        date: storedTime.preferredDate,
        time: storedTime.preferredTime,
        todoList: [
          storedService.projectDescription,
          storedTime.projectDescription,
        ],
      };
      const res = await bookService(data).unwrap();

      if (res.success) {
        message.success(res.message);
        router.push('/confirm');
      }
    } catch (error) {
      message.error(error?.data?.message || 'Something went wrong');
    }
  };

  // const handleContinue = async () => {
  //   if (!storedLocation.address)
  //     return message.warning('Please input an address');
  //   if (!storedLocation.apt)
  //     return message.warning('Please input an apartment');
  //   if (!storedService.serviceId)
  //     return message.warning('Please select a service');
  //   if (!storedService.serviceType)
  //     return message.warning('Please select a service type');
  //   if (!storedService.projectDescription)
  //     return message.warning('Please input a project description');
  //   if (!storedTime.preferredDate)
  //     return message.warning('Please select a date');
  //   if (!storedTime.preferredTime)
  //     return message.warning('Please select a time');
  //   if (!storedTime.projectDescription)
  //     return message.warning('Please input a project description');

  //   router.push('/confirm');
  // };

  return (
    <div className="min-h-screen bg-gray-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Sidebar Filters */}
          <div className="w-full lg:w-80 space-y-8">
            {/* Date Filter */}
            <div className="bg-white rounded-lg p-6 shadow-sm">
              <div className="flex items-center gap-2 mb-4">
                <FiCalendar className="w-5 h-5 text-gray-600" />
                <h3 className="font-semibold text-gray-900">Date</h3>
                <button
                  onClick={() => setIsModalOpen(true)}
                  className="ml-auto text-blue-600 text-sm font-medium"
                >
                  Choose a date
                </button>
              </div>
              <div className="space-y-3">
                {dateOptions.map(option => (
                  <div
                    key={option.id}
                    className={`w-full text-left px-4 py-3 rounded-full border transition-colors ${
                      storedTime.preferredDate === option.value
                        ? 'border-blue-500 bg-blue-50 text-blue-700'
                        : 'border-gray-300 hover:border-gray-400'
                    }`}
                  >
                    {option.value}
                  </div>
                ))}
              </div>
            </div>

            {/* Time Filter */}
            <div className="bg-white rounded-lg p-6 shadow-sm">
              <div className="flex items-center gap-2 mb-4">
                <FiClock className="w-5 h-5 text-gray-600" />
                <h3 className="font-semibold text-gray-900">Time</h3>
              </div>
              <div className="space-y-3">
                {timeOptions.map(option => (
                  <button
                    key={option}
                    className={`w-full text-left px-4 py-3 rounded-full border transition-colors ${
                      storedTime.preferredTime === option
                        ? 'border-blue-500 bg-blue-50 text-blue-700'
                        : 'border-gray-300 hover:border-gray-400'
                    }`}
                  >
                    {option}
                  </button>
                ))}
              </div>
            </div>
            {/* Price Filter */}
            {/* <div className="bg-white rounded-lg p-6 shadow-sm">
              <h3 className="font-semibold text-gray-900 mb-4">Price</h3>
              <div className="space-y-4">
                <div className="text-right text-sm font-medium text-gray-600">
                  ${priceRange}
                </div>
                <input
                  type="range"
                  min="10"
                  max="1000"
                  value={priceRange}
                  onChange={e => setPriceRange(Number(e.target.value))}
                  className="w-full h-2 bg-gray-200 rounded-lg cursor-pointer accent-blue-600"
                />
                <div className="flex justify-between text-sm text-gray-500">
                  <div>
                    <div className="text-xs">Minimum</div>
                    <input
                      type="text"
                      value="$10"
                      readOnly
                      className="w-16 px-2 py-1 border border-gray-300 rounded text-center text-sm"
                    />
                  </div>
                  <div>
                    <div className="text-xs">Maximum</div>
                    <input
                      type="text"
                      value="$1000"
                      readOnly
                      className="w-20 px-2 py-1 border border-gray-300 rounded text-center text-sm"
                    />
                  </div>
                </div>
              </div>
            </div> */}
          </div>

          {/* Right Side Content */}
          <div className="flex-1">
            {/* Sort */}
            <div className="flex justify-end mb-6">
              <div className="relative">
                <div className="flex items-center gap-2 text-sm text-gray-600">
                  <span>Sort by</span>
                  <button
                    onClick={() => setShowSortDropdown(!showSortDropdown)}
                    className="flex items-center gap-1 px-3 py-2 border border-gray-300 rounded-md bg-white hover:bg-gray-50"
                  >
                    {sortBy}
                    <FiChevronDown className="w-4 h-4" />
                  </button>
                </div>

                {showSortDropdown && (
                  <div className="absolute right-0 top-full mt-1 w-56 bg-white border border-gray-200 rounded-md shadow-lg z-10">
                    {sortOptions.map(option => (
                      <button
                        key={option}
                        onClick={() => {
                          setSortBy(option);
                          setShowSortDropdown(false);
                        }}
                        className="w-full text-left px-3 py-2 text-sm text-gray-700 hover:bg-gray-50"
                      >
                        {option}
                      </button>
                    ))}
                  </div>
                )}
              </div>
            </div>

            {/* Services Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {sortedServices?.map(service => (
                <SelectContractorCard
                  key={service._id}
                  contractor={service}
                  selected={storedService?.serviceId === service._id}
                  onSelect={() => handleSelect(service)}
                />
              ))}
            </div>

            {/* Pagination */}
            <div className="flex justify-center items-center gap-3 mt-8">
              <button
                onClick={() => setPage(p => Math.max(1, p - 1))}
                disabled={page === 1}
                className="px-4 py-2 border rounded-lg bg-white disabled:opacity-50"
              >
                Prev
              </button>
              <span className="text-gray-700">
                Page {page} of {totalPage}
              </span>
              <button
                onClick={() => setPage(p => Math.min(totalPage, p + 1))}
                disabled={page === totalPage}
                className="px-4 py-2 border rounded-lg bg-white disabled:opacity-50"
              >
                Next
              </button>
            </div>

            {/* <button
              onClick={handleContinue}
              className="mt-6 w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 rounded-lg"
            >
              Continue
            </button> */}
          </div>
        </div>
      </div>

      {/* Calendar Modal */}
      <Modal
        open={isModalOpen}
        onCancel={() => setIsModalOpen(false)}
        footer={null}
        centered
        width={500}
        closable={false}
      >
        <div className="flex flex-col justify-center items-center py-5">
          <p className="text-center text-3xl font-bold pb-5">
            Choose Date & Time
          </p>
          <Calendar
            defaultValue={
              storedTime.preferredDate &&
              !isDateOption(storedTime.preferredDate)
                ? new Date(storedTime.preferredDate)
                : undefined
            }
            onChange={date => {
              if (date instanceof Date) {
                setTempDate(date);
                dispatch(
                  setTime({ preferredDate: dayjs(date).format('YYYY-MM-DD') })
                );
              } else if (Array.isArray(date) && date[0] instanceof Date) {
                setTempDate(date[0]);
                dispatch(
                  setTime({
                    preferredDate: dayjs(date[0]).format('YYYY-MM-DD'),
                  })
                );
              }
              setIsModalOpen(false);
            }}
            value={
              tempDate ||
              (storedTime.preferredDate &&
              !isDateOption(storedTime.preferredDate)
                ? new Date(storedTime.preferredDate)
                : null)
            }
            className="w-full"
          />
        </div>
      </Modal>
    </div>
  );
}
