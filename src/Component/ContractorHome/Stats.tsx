import Image from 'next/image';
import statImg from '@/assests/stats.png';
import Link from 'next/link';
const Stats = () => {
  const stats = [
    { number: '5000+', label: 'Leads a day' },
    { number: '1000+', label: 'Services offered' },
    { number: '100%', label: 'Satisfaction' },
  ];

  return (
    <section className="bg-gray-50 py-12 md:py-20">
      <div className="container mx-auto px-4">
        <div className="max-w-7xl mx-auto">
          {/* Stats Section */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-8 mb-16 text-center">
            {stats.map((stat, index) => (
              <div key={index} className="space-y-2">
                <div className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-800">
                  {stat.number}
                </div>
                <div className="text-lg md:text-xl text-gray-600 font-medium">
                  {stat.label}
                </div>
              </div>
            ))}
          </div>

          {/* CTA Section */}
          <div className="grid lg:grid-cols-2 gap-8 lg:gap-16 items-center">
            {/* Left - Image */}
            <div className="">
              <div className=" ">
                <div className="relative">
                  <Image
                    src={statImg}
                    alt="Happy contractor celebrating success"
                    className="w-full h-auto object-cover"
                    width={500}
                    height={500}
                  />
                </div>
              </div>
            </div>

            {/* Right - Content */}
            <div className="order-1 lg:order-2 space-y-6">
              <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold text-gray-800 leading-tight">
                Become A Trusted Contractor With YourTradeSource
              </h2>

              <p className="text-gray-600 text-lg leading-relaxed">
                Whether you&apos;re looking to expand your business, gain more
                exposure, or connect with clients in need of your expertise, our
                platform offers the tools you need to succeed.
              </p>
              <Link href={'/serviceDetails'}>
                <button className="w-full my-5 sm:w-auto bg-blue-600 hover:bg-blue-700 text-white px-8 py-4 rounded-lg font-semibold text-lg transition-colors duration-200 shadow-lg hover:shadow-xl">
                  Become A Contractor
                </button>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Stats;
