'use client';

import FeaturedMedia from '@/Component/ContractorProfile/FeaturedMedia';




const ChangeContractorProfileMedia = () => {


  return (
    <div>
      <nav
        className="flex items-center font-normal text-base leading-6  bg-card pl-3 md:pl-5 lg:pl-10 xl:pl-44 border-t border-border py-3"
        aria-label="breadcrumb"
      >
        <p className="text-foreground text-xl">Dashboard</p>
        <svg
          className="mx-2 w-6 h-6 text-foreground"
          fill="none"
          stroke="currentColor"
          strokeWidth={2}
          strokeLinecap="round"
          strokeLinejoin="round"
          viewBox="0 0 24 24"
          aria-hidden="true"
        >
          <path d="M9 18l6-6-6-6" />
        </svg>
        <span className="text-foreground cursor-default text-xl">
          Public Profile
        </span>
      </nav>
      <div className="max-w-7xl mx-auto">
        <h1 className="text-2xl font-bold my-5 text-foreground">Edit Public Profile</h1>
        {/* Components */}
        <div className="bg-card border border-border p-8 rounded-xl">
          <FeaturedMedia />
          
   
      
        </div>
      </div>
    </div>
  );
};

export default ChangeContractorProfileMedia;
