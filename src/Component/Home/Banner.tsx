/* eslint-disable @typescript-eslint/no-explicit-any */
import { Search } from 'lucide-react';
import Image from 'next/image';
import hamer from '@/assests/hammer.png';
import banerImg from '@/assests/bannerImg.jpg';
import styles from '@/app/styles.module.css';
import Service from './Service';

export default function Banner({
  setSearch,
  setFilter,
  cmsData,
}: {
  setSearch: any;
  setFilter: any;
  cmsData?: any;
}) {
  const handleSearchChange = (e) => {
    setSearch(e.target.value);
  };


  if (cmsData?.isVisible === false) return null;

  return (
    <>
      <div className="relative w-full mb-8">
        <div className="relative overflow-hidden">
          {/* Background Image */}
          <div className="absolute inset-0">
            <Image
              src={cmsData?.image || banerImg}
              alt="Professional contractor"
              fill
              className="object-cover"
              priority
            />
          </div>

          {/* Content */}
          <div className="relative px-8 py-16 2xl:px-64 lg:py-64 text-center rounded-lg">
            <div className="bg-black/50 px-8 py-4 sm:px-12 sm:py-4 md:py-12 backdrop-blur-sm">
              {/* Heading with icon */}
              <div className="flex items-center justify-center gap-3 mb-6">
                <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white">
                  {cmsData?.title || "Please set title in CMS"}
                </h1>
              </div>
              {/* CMS title not provided - no secondary heading shown */}

              {/* Description */}
              <p className="text-white/90 text-lg md:text-xl max-w-4xl mx-auto mb-12 leading-relaxed">
                {cmsData?.content || "Please set content in CMS"}
              </p>

              {/* Search Bar */}
              <div className="max-w-2xl mx-auto">
                <div className="relative">
                  <input
                    type="text"
                     onChange={(e) =>handleSearchChange(e)}
                    placeholder="What are you looking for?"
                    className="w-full px-6 py-4 pr-14 text-foreground bg-background rounded-full shadow-lg focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 focus:ring-offset-transparent text-lg placeholder:text-muted-foreground"
                  />
                  <button className="absolute right-2 top-1/2 transform -translate-y-1/2 p-3 text-muted-foreground hover:text-primary transition-colors">
                    <Search className="w-5 h-5" />
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Service component full width at the bottom of the banner */}
      <div className="w-full -top-8 sm:-top-8 md:-top-2 lg:-top-3 2xl:-top-3 relative">
        <Service setFilter={setFilter} />
      </div>
    </>
  );
}
