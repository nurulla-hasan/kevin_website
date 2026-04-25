'use client';

import { useState } from 'react';
import Image from 'next/image';
import { FaStar, FaStarHalfAlt } from 'react-icons/fa';
import { SlBadge } from 'react-icons/sl';
import { IoIosHammer } from 'react-icons/io';
import { Modal, Pagination } from 'antd';
import img from '@/assests/bannerImg.jpg';

const reviews = [
  {
    name: 'Emma',
    date: 'Feb 2024',
    rating: 4.5,
    review:
      "We were only sad not to stay longer. We hope to be back to explore Nantes some more and would love to stay at Golwen's place again, if they'll have us! :)",
  },
  {
    name: 'Liam',
    date: 'Mar 2024',
    rating: 5.0,
    review:
      'Amazing location and a very comfortable stay. Would highly recommend!',
  },
  {
    name: 'Sophia',
    date: 'Jan 2024',
    rating: 4.0,
    review:
      'The apartment was cozy and clean. Slightly noisy at night but overall a great experience.',
  },
  {
    name: 'Noah',
    date: 'Apr 2024',
    rating: 4.8,
    review:
      'Wonderful host and excellent communication. The place was just as described.',
  },
  {
    name: 'Olivia',
    date: 'May 2024',
    rating: 5.0,
    review:
      'Absolutely loved the décor and attention to detail. Would definitely come back!',
  },
  {
    name: 'James',
    date: 'Feb 2024',
    rating: 3.5,
    review:
      'Good value for money, but the kitchen could use some improvements.',
  },
  {
    name: 'Ava',
    date: 'Mar 2024',
    rating: 4.2,
    review:
      'Quiet neighborhood and easy access to public transport. Enjoyed our stay!',
  },
  {
    name: 'Benjamin',
    date: 'Jan 2024',
    rating: 4.6,
    review:
      'Clean, well-maintained, and the host was very helpful throughout our stay.',
  },
  {
    name: 'Mia',
    date: 'Dec 2023',
    rating: 4.9,
    review: 'Perfect for a weekend getaway. Everything was just perfect.',
  },
  {
    name: 'Lucas',
    date: 'Nov 2023',
    rating: 3.8,
    review:
      'Decent place overall. Could use better heating in the winter months.',
  },
  {
    name: 'Isabella',
    date: 'Oct 2023',
    rating: 5.0,
    review: 'An unforgettable experience. The host made us feel so welcome!',
  },
  {
    name: 'Henry',
    date: 'Sep 2023',
    rating: 4.3,
    review:
      'Nice and clean. Convenient location close to restaurants and shops.',
  },
  {
    name: 'Amelia',
    date: 'Aug 2023',
    rating: 4.7,
    review:
      'The place exceeded our expectations. Very stylish and comfortable.',
  },
  {
    name: 'William',
    date: 'Jul 2023',
    rating: 3.9,
    review:
      'The space was good but a bit smaller than expected. Still enjoyable.',
  },
  {
    name: 'Charlotte',
    date: 'Jun 2023',
    rating: 5.0,
    review:
      'Everything was amazing — from the location to the amenities. 10/10!',
  },
];

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

const SelectConstractorCard = ({ contractor, selected, onSelect }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const pageSize = 3;

  const paginatedReviews = reviews.slice(
    (currentPage - 1) * pageSize,
    currentPage * pageSize
  );

  return (
    <>
      <div
        className={`bg-card border-2 border-border rounded-xl overflow-hidden shadow-sm cursor-pointer transition ${
          selected ? 'border-primary ring-2 ring-primary/20' : 'hover:border-border'
        }`}
        onClick={onSelect}
      >
        {/* Profile Image */}
        <div className="relative h-48">
          <Image
            src={contractor.image}
            alt={contractor.name || 'Contractor Image'}
            className="w-full h-full object-cover"
            fill
            style={{ objectFit: 'cover' }}
          />
          <div className="absolute bottom-4 left-4">
            <h3 className="text-white text-xl font-bold drop-shadow-lg">
              {contractor.name}
            </h3>
          </div>
          <button
            onClick={e => {
              e.stopPropagation();
              setIsModalOpen(true);
            }}
            className="absolute top-4 right-4 bg-primary text-primary-foreground px-3 py-1 rounded-lg text-sm font-medium hover:bg-primary/90"
          >
            View Profile
          </button>
        </div>

        {/* Info Section */}
        <div className="bg-muted/50 p-4">
          <div className="flex items-center justify-between mb-3">
            <div className="space-y-1">
              <div className="flex items-center gap-2">
                <div className="w-5 h-5 bg-primary rounded-full flex items-center justify-center">
                  <SlBadge className="text-primary-foreground w-3 h-3" />
                </div>
                <span className="text-sm font-medium text-foreground">
                  Verified Contractor
                </span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-5 h-5 bg-primary rounded-full flex items-center justify-center">
                  <IoIosHammer className="text-primary-foreground w-3 h-3" />
                </div>
                <span className="text-sm text-muted-foreground">
                  {contractor.completedTasks || 0} Completed Task
                </span>
              </div>
              <div className="flex items-center gap-2">
                <StarRating rating={contractor.rating} />
                <span className="text-sm font-medium text-foreground">
                  ({contractor.reviews || 10} reviews)
                </span>
              </div>
            </div>
            <div className="text-right">
              <div className="text-2xl font-bold text-foreground">
                ${contractor.price}/Hr
              </div>
            </div>
          </div>

          <div className="mb-4">
            <h4 className="font-semibold text-foreground mb-1">Expertise</h4>
            <p className="text-sm text-muted-foreground">{contractor.expertise}</p>
          </div>

          {/* <Link href={'/confirm'}> */}
          <button className="w-full bg-primary text-primary-foreground py-3 rounded-lg font-medium hover:bg-primary/90 transition-colors">
            Book and Continue
          </button>
          {/* </Link> */}
        </div>
      </div>

      {/* Modal */}
      <Modal
        open={isModalOpen}
        onCancel={() => setIsModalOpen(false)}
        footer={null}
        centered
        width="90%"
        style={{ maxWidth: 800 }}
      >
        <div className="flex flex-col lg:flex-row">
          {/* Left Side */}
          <div className="p-6 border-r border-border flex flex-col items-center text-center">
            <Image
              src={contractor.image}
              alt={contractor.name}
              width={150}
              height={150}
              className="rounded-full w-44 h-44 object-cover mb-4"
            />
            <h2 className="text-2xl font-bold mb-1 text-foreground">{contractor.name}</h2>
            <p className="text-sm text-primary mb-4">
              {contractor.minimumHours || 2} Hour minimum
            </p>
            <p className="text-3xl font-bold text-foreground mb-4">
              ${contractor.hourlyRate}/Hr
            </p>

            <div className="w-full space-y-3 mb-6">
              <div className="flex items-center gap-2">
                <SlBadge className="text-primary-foreground w-5 h-5 bg-primary rounded-full p-1" />
                <span className="text-sm text-foreground">Verified Contractor</span>
              </div>
              <div className="flex items-center gap-2">
                <IoIosHammer className="text-primary-foreground w-5 h-5 bg-primary rounded-full p-1" />
                <span className="text-sm text-foreground">
                  {contractor.completedTasks} Completed Task
                </span>
              </div>
              <div className="flex items-center gap-2">
                <StarRating rating={contractor.rating} />
                <span className="text-sm text-foreground">({contractor.reviews} reviews)</span>
              </div>
            </div>

            {/* <Link href={'/confirm'}> */}
            <button className="w-full bg-primary text-primary-foreground py-3 rounded-lg hover:bg-primary/90 transition font-medium">
              Select & Continue
            </button>
            {/* </Link> */}
          </div>

          {/* Right Side - Details & Reviews */}
          <div className="lg:w-2/3 p-6 space-y-6">
            <div>
              <h3 className="text-xl font-semibold mb-4 pb-2 border-b border-border text-foreground">
                How I Can Help You
              </h3>
              <p className="text-foreground mb-4 leading-relaxed">
                {contractor.description}
              </p>
              <div className="mb-4 border-2 p-3 rounded-xl border-border bg-muted/30">
                <p className="text-foreground">
                  2-hour minimum per booking. I have 5+ years of experience and
                  come fully equipped with my own tools.
                </p>
                <p className="font-medium mb-2 text-foreground">Services include:</p>
                <ul className="space-y-1">
                  {contractor?.services?.map((service, index) => (
                    <li key={index} className="flex items-center text-foreground">
                      <span className="w-2 h-2 bg-primary rounded-full mr-3"></span>
                      {service}
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            <div className="space-y-4">
              {paginatedReviews.map((review, idx) => (
                <div
                  key={idx}
                  className="border-b border-border py-4 flex gap-4 items-start"
                >
                  <Image
                    src={img}
                    alt="Profile"
                    width={40}
                    height={40}
                    className="rounded-full object-cover"
                  />
                  <div className="flex-1">
                    <div className="flex justify-between items-center mb-0.5">
                      <p className="font-bold text-sm text-foreground">{review.name}</p>
                      <StarRating rating={review.rating} />
                    </div>
                    <p className="text-xs text-muted-foreground mb-1">{review.date}</p>
                    <p className="text-foreground text-sm">{review.review}</p>
                  </div>
                </div>
              ))}
              <div className="pt-4 flex justify-center">
                <Pagination
                  current={currentPage}
                  pageSize={pageSize}
                  total={reviews.length}
                  onChange={page => setCurrentPage(page)}
                />
              </div>
            </div>
          </div>
        </div>
      </Modal>
    </>
  );
};

export default SelectConstractorCard;
