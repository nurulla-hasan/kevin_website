import { Search } from 'lucide-react';
import Image from 'next/image';
import house from '@/assests/house.png';

const WelBan = ({ setSearch, cmsData }: { setSearch: any; cmsData?: any }) => {
  const handleSearchChange = (e) => {
    setSearch(e.target.value)
  }

  if (cmsData?.isVisible === false) return null;

  return (
    <div className=" bg-slate-700 flex items-center py-8 ">
      <div className="container mx-auto px-4">
        <div className="grid lg:grid-cols-2 gap-8 items-center">
          {/* Left Content */}
          <div className="space-y-8">
            <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white leading-tight">
              {cmsData?.title || "Welcome back to Your Trade Source (YTS)"}
            </h1>
            <h1 className="text-xl  text-white leading-tight">
              {cmsData?.content || "— The ultimate hub for tradespeople and clients alike! Whether you're a plumber, electrician, engineer, or a homeowner looking for professional services or DIY solutions, YTS brings you the best of both worlds."}
            </h1>

            {/* Search Bar */}
            <div className="relative  max-w-lg">
              <input
                type="text"
                placeholder="What are you looking for?"
                onChange={(e) => handleSearchChange(e)}
                className="w-full px-6 py-3 md:py-4 pr-12 rounded-full text-gray-700 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50 shadow-lg"
              />
              <button className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-gray-700 transition-colors">
                <Search className="w-5 h-5" />
              </button>
            </div>
          </div>

          {/* Right Image */}
          <div className="relative">
            <div className="rounded-2xl overflow-hidden shadow-2xl">
              <Image
                src={cmsData?.image || house}
                alt="Beautiful American house front porch decorated with patriotic bunting, wreaths, and flowers"
                width={800}
                height={500}
                className="w-full h-auto object-cover"
                priority
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default WelBan;
