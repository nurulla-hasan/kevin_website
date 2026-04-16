import Image from 'next/image';
import proj4 from '@/assests/project4.png';
import proj2 from '@/assests/project2.png';
import ar2 from '@/assests/ar2.png';
import fe1 from '@/assests/fe1.jpg';
import fe2 from '@/assests/fe2.jpg';
import male from '@/assests/male.png';
import Link from 'next/link';
import ImageWithFallback, { PLACEHOLDERS } from '@/Component/shared/ImageWithFallback';

const MembershipBanner = ({ cmsData }: { cmsData?: any }) => {
  if (cmsData?.isVisible === false) return null;

  return (
    <div className="relative overflow-hidden bg-gradient-to-br from-cyan-500 via-teal-500 to-blue-600 px-6 lg:px-12 py-12 lg:py-16 my-8 container mx-auto rounded-3xl shadow-2xl">
      {/* Decorative background elements */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-white/10 rounded-full -translate-y-1/2 translate-x-1/2 blur-3xl"></div>
      <div className="absolute bottom-0 left-0 w-72 h-72 bg-white/10 rounded-full translate-y-1/2 -translate-x-1/2 blur-3xl"></div>

      <div className="relative mx-auto max-w-7xl">
        <div className="grid grid-cols-1 gap-12 lg:grid-cols-2 lg:gap-16 items-center">
          {/* Left Content */}
          <div className="flex flex-col justify-center space-y-8">
            <div className="space-y-6">
              <h1 className="text-4xl font-bold text-white lg:text-5xl xl:text-6xl leading-tight">
                {cmsData?.title || (
                  <>
                    Member Get <span className="text-yellow-300 drop-shadow-lg">20% Off</span> On All
                    Services.
                  </>
                )}
              </h1>
              <p className="text-lg text-white/95 lg:text-xl leading-relaxed">
                {cmsData?.content || "Become a YTS Member and enjoy 20% off all services — trusted pros, exclusive savings."}
              </p>
            </div>
            <div>
              <Link href={'/pricing'}>
                <button className="group relative overflow-hidden rounded-full bg-white px-8 py-4 text-lg font-bold text-cyan-600 transition-all duration-300 hover:scale-105 hover:shadow-xl">
                  <span className="relative z-10">Become a Member</span>
                  <div className="absolute inset-0 bg-gradient-to-r from-yellow-300 to-orange-300 opacity-0 transition-opacity duration-300 group-hover:opacity-100"></div>
                </button>
              </Link>
            </div>
          </div>

          {/* Right Content - Profile Images Collage or Dynamic Image */}
          <div className="relative flex items-center justify-center lg:justify-end">
            {cmsData?.image ? (
              <div className="relative h-80 w-80 lg:h-96 lg:w-96 rounded-3xl overflow-hidden shadow-2xl ring-4 ring-white/30 hover:ring-4 hover:ring-white/50 transition-all duration-300 hover:scale-105">
                <Image
                  src={cmsData.image}
                  alt="Membership Banner"
                  fill
                  className="object-cover"
                />
              </div>
            ) : (
              <div className="relative h-80 w-80 lg:h-96 lg:w-96">
                {/* Large profile image - top right */}
                <div className="absolute right-8 top-44 h-32 w-32 overflow-hidden rounded-full border-4 border-white/80 shadow-xl lg:h-40 lg:w-40 hover:scale-110 transition-transform duration-300">
                  <Image
                    src={proj4}
                    alt="Professional service provider"
                    width={160}
                    height={160}
                    className="h-full w-full object-cover"
                  />
                </div>

                {/* Medium profile image - top left */}
                <div className="absolute left-44 top-20 h-24 w-24 overflow-hidden rounded-full border-4 border-white/80 shadow-xl lg:h-28 lg:w-28 hover:scale-110 transition-transform duration-300">
                  <Image
                    src={ar2}
                    alt="Professional service provider"
                    width={112}
                    height={112}
                    className="h-full w-full object-cover"
                  />
                </div>

                {/* Medium profile image - center left */}
                <div className="absolute left-0 top-20 h-28 w-28 overflow-hidden rounded-full border-4 border-white/80 shadow-xl lg:h-32 lg:w-32 hover:scale-110 transition-transform duration-300">
                  <Image
                    src={male}
                    alt="Professional service provider"
                    width={128}
                    height={128}
                    className="h-full w-full object-cover"
                  />
                </div>

                {/* Large profile image - center */}
                <div className="absolute left-16 top-32 h-36 w-36 overflow-hidden rounded-full border-4 border-white/80 shadow-xl lg:h-44 lg:w-44 hover:scale-110 transition-transform duration-300">
                  <Image
                    src={fe1}
                    alt="Professional service provider"
                    width={176}
                    height={176}
                    className="h-full w-full object-cover"
                  />
                </div>

                {/* Small profile image - bottom left */}
                <div className="absolute bottom-8 left-4 h-20 w-20 overflow-hidden rounded-full border-4 border-white/80 shadow-xl lg:h-24 lg:w-24 hover:scale-110 transition-transform duration-300">
                  <Image
                    src={proj2}
                    alt="Professional service provider"
                    width={96}
                    height={96}
                    className="h-full w-full object-cover"
                  />
                </div>

                {/* Small profile image - center bottom */}
                <div className="absolute bottom-0 left-1/2 h-20 w-20 -translate-x-1/2 overflow-hidden rounded-full border-4 border-white/80 shadow-xl lg:h-24 lg:w-24 hover:scale-110 transition-transform duration-300">
                  <Image
                    src={fe2}
                    alt="Professional service provider"
                    width={96}
                    height={96}
                    className="h-full w-full object-cover"
                  />
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default MembershipBanner;
