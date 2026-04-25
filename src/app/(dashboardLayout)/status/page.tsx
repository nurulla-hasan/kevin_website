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
    <div className="container min-h-screen mx-auto p-4 bg-background">
      {/* Tabs */}
      <div className="flex border-b py-3 border-border mb-4">
        {['Inprogress', 'Done'].map(tab => (
          <button
            key={tab}
            className={`mr-6 pb-2 text-xl font-dm font-medium capitalize ${
              activeTab === tab
                ? 'border-b-2 border-primary text-primary'
                : 'text-muted-foreground'
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
                className="bg-muted rounded-md p-4 mb-6 shadow-sm border border-border"
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
                    <h3 className="text-xl font-semibold text-foreground">
                      You&apos;ve Booked {booking.name}
                    </h3>
                    <p className="text-xs w-96 text-muted-foreground">
                      Giovanni C. is currently offline and will reach out once
                      available in the app. You will be notified as soon as they
                      respond.
                    </p>
                  </div>
                  <span className="ml-auto text-sm text-primary font-medium">
                    Inprogress
                  </span>
                </div>
                {/* Divider */}
                <div className="border-b border-border mb-8"></div>
                {/* Service Info */}
                <div className="mb-4">
                  <p className="text-xl font-dm font-medium mb-2 text-foreground">
                    {booking.service}
                  </p>
                  <div className="flex items-center text-sm text-muted-foreground mb-1">
                    <FaCalendarAlt className="mr-2" />
                    {booking.date}
                  </div>
                  <div className="flex items-center text-sm text-muted-foreground mb-1">
                    <FaMapMarkerAlt className="mr-2" />
                    {booking.location}
                  </div>
                  <div className="flex items-center text-sm text-muted-foreground">
                    <FaClock className="mr-2" />
                    {booking.time}
                  </div>
                </div>
                {/* Divider */}
                <div className="border-b border-border mb-8"></div>
                {/* Actions */}
                <div className="flex w-full gap-4">
                  <Link className="w-1/2" href={`/status/${booking.id}`}>
                    <button className="w-full  border border-border px-4 py-2 rounded-md text-foreground  text-sm">
                      Project Details
                    </button>
                  </Link>
                  <button className="w-1/2 bg-primary text-primary-foreground px-4 py-2 rounded-md hover:bg-primary/90 text-sm">
                    Mark as done
                  </button>
                </div>
              </div>
            )
          )
        )
      ) : (
        <p className="text-muted-foreground text-sm">No bookings in this tab.</p>
      )}
    </div>
  );
}
