'use client';

import { useState } from 'react';
import { FaCalendarAlt, FaMapMarkerAlt, FaClock } from 'react-icons/fa';
import userImg from '@/assests/cons1.png';
import Image from 'next/image';
import Link from 'next/link';

export default function ProjectStatus() {
  const [activeTab, setActiveTab] = useState('Inprogress');

  const bookings = {
    Inprogress: [
      {
        id: 1,
        name: 'Ellie Smith',
        service: 'Interior Cleaning',
        date: 'Apr 28, 12:00 PM',
        location: '123 Main Street, New York, NY 10001',
        time: 'Apr 28, 12:00 PM',
        image: userImg,
      },
      {
        id: 2,
        name: 'Ellie Smith',
        service: 'Handyman',
        date: 'Apr 28, 12:00 PM',
        location: '123 Main Street, New York, NY 10001',
        time: 'Apr 28, 12:00 PM',
        image: userImg,
      },
    ],
    Done: [],
  };

  return (
    <div className="container min-h-screen mx-auto p-4 bg-white">
      {/* Tabs */}
      <div className="flex border-b py-3 border-gray-300 mb-4">
        {['Inprogress', 'Done'].map(tab => (
          <button
            key={tab}
            className={`mr-6 pb-2 text-xl font-dm font-medium capitalize ${
              activeTab === tab
                ? 'border-b-2 border-blue-600 text-blue-600'
                : 'text-gray-500'
            }`}
            onClick={() => setActiveTab(tab)}
          >
            {tab}
          </button>
        ))}
      </div>

      {/* Cards */}
      {bookings[activeTab]?.length > 0 ? (
        bookings[activeTab]?.map(
          booking => (
            (
              <div
                key={booking.id}
                className="bg-[#F7F8F8] rounded-md p-4 mb-6 shadow-sm"
              >
                {/* Header */}
                <div className="flex items-center mb-4">
                  <Image
                    src={booking.image}
                    alt={booking.name}
                    className="w-20 h-20 rounded-full object-cover mr-4"
                    width={100}
                    height={100}
                  />
                  <div>
                    <h3 className="text-xl font-semibold">
                      You&apos;ve Booked {booking.name}
                    </h3>
                    <p className="text-xs w-96 text-gray-500">
                      Giovanni C. is currently offline and will reach out once
                      available in the app. You will be notified as soon as they
                      respond.
                    </p>
                  </div>
                  <span className="ml-auto text-sm text-green-500 font-medium">
                    Inprogress
                  </span>
                </div>
                {/* Divider */}
                <div className="border-b border-gray-200 mb-8"></div>
                {/* Service Info */}
                <div className="mb-4">
                  <p className="text-xl font-dm font-medium mb-2">
                    {booking.service}
                  </p>
                  <div className="flex items-center text-sm text-gray-600 mb-1">
                    <FaCalendarAlt className="mr-2" />
                    {booking.date}
                  </div>
                  <div className="flex items-center text-sm text-gray-600 mb-1">
                    <FaMapMarkerAlt className="mr-2" />
                    {booking.location}
                  </div>
                  <div className="flex items-center text-sm text-gray-600">
                    <FaClock className="mr-2" />
                    {booking.time}
                  </div>
                </div>
                {/* Divider */}
                <div className="border-b border-gray-200 mb-8"></div>
                {/* Actions */}
                <div className="flex w-full gap-4">
                  <Link className="w-1/2" href={`/status/${booking.id}`}>
                    <button className="w-full  border border-black px-4 py-2 rounded-md text-black  text-sm">
                      Project Details
                    </button>
                  </Link>
                  <button className="w-1/2 bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 text-sm">
                    Mark as done
                  </button>
                </div>
              </div>
            )
          )
        )
      ) : (
        <p className="text-gray-500 text-sm">No bookings in this tab.</p>
      )}
    </div>
  );
}
