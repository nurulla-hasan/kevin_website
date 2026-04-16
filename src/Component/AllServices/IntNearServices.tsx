import IntCard from '../Interior/IntCard';
import styles from '@/app/styles.module.css';
import Link from 'next/link';


const IntNearServices = () => {
    const Projects2 =[]
  return (
    <div
      className={`container mx-auto bg-[#ffffff] my-8 p-6 pt-8 rounded-xl ${styles.fontDmSans}`}
    >
      <div className="flex justify-between items-center mb-3">
        <h1 className={`text-4xl font-bold mb-5   ${styles.fontDmSans}`}>
          Interior Project Near You
        </h1>
        <div className="underline text-blue-700 text-sm sm:text-2xl">
          {' '}
          View All{' '}
        </div>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 px-6">
        {Projects2?.map((project, idx) => (
          <Link key={idx} href={'/location'}>
            <IntCard project={project} />
          </Link>
        ))}
      </div>
    </div>
  );
};

export default IntNearServices;
