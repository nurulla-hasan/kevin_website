/* eslint-disable @typescript-eslint/no-unused-vars */
import Link from "next/link";
import IntCard from "../Interior/IntCard";

// eslint-disable-next-line no-unused-vars
const AllServices = ({ allServices, setPage, page, cmsData }) => {
  if (cmsData?.isVisible === false) return null;

  return (
    <div className={`container mx-auto bg-[#ffffff] my-8 p-4 pt-8  font-dm`}>
      <div className="flex justify-between items-center mb-3">
        <div>
          <h1 className={`text-4xl font-bold mb-5 font-dm`}>
            {cmsData?.title || "All Projects"}
          </h1>
        </div>
      </div>
      <div className="grid  grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-3 px-3">
        {allServices?.map((project, idx) => (
          <Link key={idx} href={'/location'}>
            <IntCard project={project} />
          </Link>
        ))}
      </div>
    </div>
    );
};

export default AllServices;
