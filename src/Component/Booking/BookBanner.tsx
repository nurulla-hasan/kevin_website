import Image from 'next/image';
import { Download, Settings, Calendar, Hammer, Handshake } from 'lucide-react';
import hero from '@/assests/bookBanner.jpg';
import baseMap from '@/assests/Basemap image.png';
import { PiMapPinAreaBold } from 'react-icons/pi';
import Link from 'next/link';

const BookBanner = () => {
  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <div className="relative min-h-screen flex items-center justify-center">
        {/* Background Image */}
        <div className="absolute inset-0 z-0">
          <Image
            src={hero}
            alt="Handyman workshop background"
            fill
            className="object-cover"
            priority
            style={{ transform: 'scaleX(-1)' }}
          />
          <div className="absolute inset-0 bg-black/30"></div>
        </div>

        {/* Hero Content */}
        <div className="relative z-10 w-full max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-8 leading-tight md:py-20">
            Find The Best Handyman Near You
          </h1>

          {/* Search Input */}
          <div className="mb-8">
            <input
              type="text"
              placeholder="Enter your location or zip code"
              className="w-full max-w-2xl px-6 py-4 text-lg rounded-lg border-0 focus:ring-4 focus:ring-blue-500/50 focus:outline-none"
            />
          </div>

          {/* Map Widget */}
          <div className=" rounded-xl p-4 mb-6  flex items-center justify-center relative">
            <Image alt="Map" src={baseMap} width={500} height={500} />
            <PiMapPinAreaBold className="md:w-12 md:h-12 w-8 h-8 text-[#1D69E1]  rounded-full absolute   md:top-44" />
          </div>

          {/* Start Matching Button */}
          <Link href={'/location'}>
            <button className="bg-blue-600 w-[273px] sm:w-[500px] hover:bg-blue-700 text-white font-semibold px-8 py-4 rounded-lg text-lg transition-colors duration-200 shadow-lg my-8">
              Start Matching
            </button>
          </Link>
        </div>
      </div>

      {/* Process Steps Section */}
      <div className="bg-muted/50 py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto">
          {/* Desktop Layout */}
          <div className="hidden lg:block">
            <div className="flex items-center justify-between relative">
              {/* Connecting Lines */}
              <div className="absolute top-1/2 left-9 right-1 h-0.5 bg-primary transform -translate-y-1/2 z-0"></div>

              {/* Step 1 */}
              <div className="flex flex-col items-center relative z-10">
                <div className="w-16 h-16 bg-primary rounded-full flex items-center justify-center mb-4 shadow-lg relative top-10">
                  <PiMapPinAreaBold className="w-8 h-8 text-primary-foreground" />
                </div>
                <p className="text-primary font-semibold mt-8 text-center max-w-32">
                  Enter your location
                </p>
              </div>

              {/* Step 2 */}
              <div className="flex flex-col items-center relative z-10">
                <div className="w-16 h-16 bg-primary rounded-full flex items-center justify-center mb-4 shadow-lg relative top-10">
                  <Settings className="w-8 h-8 text-primary-foreground" />
                </div>
                <p className="text-primary font-semibold text-center max-w-32 mt-8">
                  Choose your service
                </p>
              </div>

              {/* Step 3 */}
              <div className="flex flex-col items-center relative z-10">
                <div className="w-16 h-16 bg-primary rounded-full flex items-center justify-center mb-4 shadow-lg relative top-7">
                  <Calendar className="w-8 h-8 text-primary-foreground" />
                </div>
                <p className="text-primary font-semibold text-center max-w-32 mt-8">
                  Pick a time
                </p>
              </div>

              {/* Step 4 */}
              <div className="flex flex-col items-center relative z-10">
                <div className="w-16 h-16 bg-primary rounded-full flex items-center justify-center mb-4 shadow-lg relative top-10">
                  <Hammer className="w-8 h-8 text-primary-foreground" />
                </div>
                <p className="text-primary font-semibold text-center max-w-32 mt-8">
                  Select a contractor
                </p>
              </div>

              {/* Step 5 */}
              <div className="flex flex-col items-center relative z-10">
                <div className="w-16 h-16 bg-primary rounded-full flex items-center justify-center mb-4 shadow-lg relative top-7">
                  <Handshake className="w-8 h-8 text-primary-foreground" />
                </div>
                <p className="text-primary font-semibold text-center max-w-32 mt-8">
                  Confirm
                </p>
              </div>
            </div>
          </div>

          {/* Mobile/Tablet Layout */}
          <div className="lg:hidden">
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-8">
              {/* Step 1 */}
              <div className="flex flex-col items-center">
                <div className="w-14 h-14 bg-primary rounded-full flex items-center justify-center mb-3 shadow-lg">
                  <Download className="w-7 h-7 text-primary-foreground" />
                </div>
                <p className="text-primary font-semibold text-center text-sm">
                  Enter your location
                </p>
              </div>

              {/* Step 2 */}
              <div className="flex flex-col items-center">
                <div className="w-14 h-14 bg-primary rounded-full flex items-center justify-center mb-3 shadow-lg">
                  <Settings className="w-7 h-7 text-primary-foreground" />
                </div>
                <p className="text-primary font-semibold text-center text-sm">
                  Choose your service
                </p>
              </div>

              {/* Step 3 */}
              <div className="flex flex-col items-center">
                <div className="w-14 h-14 bg-primary rounded-full flex items-center justify-center mb-3 shadow-lg">
                  <Calendar className="w-7 h-7 text-primary-foreground" />
                </div>
                <p className="text-primary font-semibold text-center text-sm">
                  Pick a time
                </p>
              </div>

              {/* Step 4 */}
              <div className="flex flex-col items-center sm:col-start-2">
                <div className="w-14 h-14 bg-primary rounded-full flex items-center justify-center mb-3 shadow-lg">
                  <Hammer className="w-7 h-7 text-primary-foreground" />
                </div>
                <p className="text-primary font-semibold text-center text-sm">
                  Select a contractor
                </p>
              </div>

              {/* Step 5 */}
              <div className="flex flex-col items-center col-span-2 sm:col-span-1">
                <div className="w-14 h-14 bg-primary rounded-full flex items-center justify-center mb-3 shadow-lg">
                  <Handshake className="w-7 h-7 text-primary-foreground" />
                </div>
                <p className="text-primary font-semibold text-center text-sm">
                  Confirm
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BookBanner;
