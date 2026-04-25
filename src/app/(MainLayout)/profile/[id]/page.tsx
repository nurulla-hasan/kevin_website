'use client'
import Link from 'next/link';
import ProfBanner from '@/Component/Profile/ProfBanner';
import ProfDet from '@/Component/Profile/ProfDet';
import Tabs from '@/Component/Profile/Tab';
import { useGetSpecefiqUserQuery } from '@/redux/features/user/userApi';

const ProfilePage = ({ params }: { params: { id: string } }) => {
  const contractorId = params.id;
const {data:singleProfile}=useGetSpecefiqUserQuery(contractorId)
const profileData = singleProfile?.data
  return (
    <div className="">
      <nav
        className="flex items-center font-normal text-base leading-6  bg-card pl-3 md:pl-5 lg:pl-10 xl:pl-44 border-t border-border py-3"
        aria-label="breadcrumb"
      >
        <Link href="/" className="text-foreground text-xl">
          Home
        </Link>
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
          Contractor Profile
        </span>
      </nav>
      <div className="p-3">
        <h1 className="text-2xl md:text-3xl font-semibold flex items-center gap-2 my-5 container mx-auto text-foreground">
          Preview Public Profile
        </h1>

        <div className="container mx-auto bg-card border border-border shadow-2xl p-5 rounded-xl my-10">
          <ProfBanner  profileData={profileData} />
          <ProfDet contractorId={contractorId}  profileData={profileData}/>
          <Tabs />
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;
