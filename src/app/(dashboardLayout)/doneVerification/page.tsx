'use client'
import Image from 'next/image';
import suspense from '@/assests/Suspension.png';
import { useMyDocQuery } from '@/redux/features/contractor/contractorApi';

const DoneVerification = () => {
  const {data:mydoc}=useMyDocQuery(undefined)
  const status = mydoc?.data?.[0]?.licenseStatus
  // status can be ------->approved,pending,rejected
  let statusMessage = '';
  let statusDescription = '';


// Based on the status, update the message and description
  if (status === 'approved') {
    statusMessage = 'License Approved';
    statusDescription = 'Congratulations! Your license has been successfully approved. You can now start working as a certified contractor with YTS.';

  } else if (status === 'pending') {
    statusMessage = 'License Pending';
    statusDescription = 'Your license is still under review. We are processing your verification, please check back later.';

  } else if (status === 'rejected') {
    statusMessage = 'License Rejected';
    statusDescription = 'Unfortunately, your license verification was not approved. Please contact support for more information or to correct any issues.';
 
  } else {
    // Default message in case of an unexpected status or no status
    statusMessage = 'Verification Status Unknown';
    statusDescription = 'There was an issue fetching your verification status. Please try again later.';
  }


  return (
    <div className="bg-background min-h-screen">
      <div className="mb-8 border-b border-border p-5">
        <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-foreground mb-4">
          Verify Your License
        </h1>
      </div>
      <div className="flex flex-col justify-center items-center">
        <Image
          className="w-44"
          src={suspense}
          alt=""
          width={500}
          height={500}
        />
        <h1 className="text-xl font-bold text-foreground">{statusMessage}</h1>
        <p className="text-sm my-3 text-muted-foreground">
          {statusDescription}
       
        </p>
      </div>
    </div>
  );
};

export default DoneVerification;
