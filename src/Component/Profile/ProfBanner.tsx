'use client';

import { useState } from 'react';
import Image from 'next/image';

export default function VideoSlider({profileData}) {
 const [activeIndex, setActiveIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const slides = profileData?.profileVedio|| []
  

 

  const currentSlide = slides[activeIndex];


  const handleDotClick = index => {
    setActiveIndex(index);
    setIsPlaying(false);
  };

  const handlePlayClick = () => {
    setIsPlaying(true);
  };

  const handleVideoEnd = () => {
    setIsPlaying(false);
  };

  return (
    <div className="container mx-auto">
      <div className="rounded-xl  relative w-full h-64 md:h-[500px] overflow-hidden bg-white shadow-2xl ">
        {!isPlaying && (
          <>
            <Image
              src={currentSlide?.thumbImageUrl}
              alt={currentSlide?.title}
              className="w-full h-full object-cover brightness-75"
              fill
              priority
            />
            <div className="absolute inset-0 bg-black bg-opacity-40"></div>

            {/* Text and dots container - positioned at bottom */}
            <div className="absolute bottom-6 left-6 md:left-12 right-6 md:right-12 text-white z-10">
              <h2 className="text-xl md:text-3xl font-bold mb-4">
                {currentSlide?.title}
              </h2>

              {/* Dots */}
              <div className="flex space-x-2">
                {slides?.map((_, i) => (
                  <button
                    key={i}
                    onClick={() => handleDotClick(i)}
                    className={`w-3 h-3 rounded-full ${
                      i === activeIndex
                        ? 'bg-white opacity-80'
                        : 'bg-white opacity-40'
                    }`}
                    aria-label={`Go to slide ${i + 1}`}
                  />
                ))}
              </div>
            </div>

            {/* Play Button */}
            <button
              aria-label="Play Video"
              onClick={handlePlayClick}
              className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 bg-blue-600 bg-opacity-90 hover:bg-opacity-100 rounded-full p-5 shadow-lg z-20"
            >
              <svg
                className="w-8 h-8 text-white"
                fill="currentColor"
                viewBox="0 0 24 24"
              >
                <path d="M8 5v14l11-7z" />
              </svg>
            </button>
          </>
        )}

        {isPlaying && (
          <video
            className="absolute top-0 left-0 w-full h-full object-cover"
            src={currentSlide?.videoUrl}
            controls
            autoPlay
            onEnded={handleVideoEnd}
          />
        )}
      </div>
    </div>
  );
}
