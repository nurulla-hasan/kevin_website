'use client';
import { useForm } from 'react-hook-form';
import { TbCurrentLocation } from 'react-icons/tb';
import { FaLocationDot } from 'react-icons/fa6';
import { useAppDispatch } from '@/redux/hooks';
import { useRouter } from 'next/navigation';
import { updateContractorData } from '@/redux/features/contractor/contractorSlice';

const ServiceDetailsPage = () => {
  // Initialize react-hook-form
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const dispatch = useAppDispatch();
  const router = useRouter();

  // Handle form submission and log the data
  const onSubmit = data => {
    dispatch(updateContractorData(data));
    router.push('/yourDetails');
  };

  return (
    <div className="max-w-4xl mx-auto p-5">
      <h1 className="text-3xl sm:text-4xl lg:text-5xl my-12 font-bold text-gray-900 mb-6 leading-tight">
        Where would you like to see the leads from?
      </h1>
      <div className="bg-[#ffffff] p-8 space-y-3">
        <h1 className="text-[#1D69E1] text-2xl font-semibold">
          Serves customer within
        </h1>

        {/* Location Input Field */}
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="relative">
            <input
              {...register('location', { required: 'Location is required' })}
              className="w-full border border-gray-300 rounded-md p-3 pr-10 focus:outline-none focus:ring-2 focus:ring-blue-600"
              placeholder="location"
            />
            <TbCurrentLocation
              className="absolute right-3 top-[25px] transform -translate-y-1/2 text-black pointer-events-none"
              size={20}
            />
            {/* Show error message if location is not provided */}
            {errors.location && (
              <p className="text-red-500 text-sm">
                {errors.location.message.toString()}
              </p>
            )}
          </div>

          {/* Zip Input Field */}
          <div className="relative">
            <input
              {...register('zip', { required: 'Zip code is required' })}
              className="w-full bg-[#B9D1F6] border border-gray-300 rounded-md mt-1 p-3 pr-10 focus:outline-none focus:ring-2 focus:ring-blue-600"
              placeholder="77443"
            />
            <FaLocationDot
              className="absolute right-3 top-[25px] mt-1 transform -translate-y-1/2 text-black pointer-events-none"
              size={20}
            />
            {/* Show error message if zip code is not provided */}
            {errors.zip && (
              <p className="text-red-500 text-sm">
                {errors.zip.message.toString()}
              </p>
            )}
          </div>

          <button
            type="submit"
            className="bg-blue-600 w-full hover:bg-blue-700 text-white font-semibold px-8 py-3 rounded-lg text-lg transition-colors duration-200 shadow-lg my-8"
          >
            Continue
          </button>
        </form>
      </div>
    </div>
  );
};

export default ServiceDetailsPage;
