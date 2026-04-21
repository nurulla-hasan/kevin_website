'use client';

import { useForm } from 'react-hook-form';
import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useAppDispatch, useAppSelector } from '@/redux/hooks';
import {
  selectService,
  setService,
} from '@/redux/features/project/projectSlice';
import { useGetAllCategoryQuery } from '@/redux/features/others/otherApi';

interface FormValues {
  serviceType: string;
  projectDescription: string;
}

const ChooseServicePage = () => {
  const dispatch = useAppDispatch();
  const router = useRouter();

  const storedService = useAppSelector(selectService);

  const { data: allCategory } = useGetAllCategoryQuery(undefined);
  const categoryOptions = allCategory?.data?.result?.map(service => ({
    label: service?.category,
    value: service?.category,
  }));

  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
    setValue,
  } = useForm<FormValues>({
    defaultValues: {
      serviceType: storedService.serviceType || 'general',
      projectDescription: storedService.projectDescription || '',
    },
    mode: 'onChange',
  });

  const [isSubmitting, setIsSubmitting] = useState(false);

  // Set default values from stored service
  useEffect(() => {
    setValue('serviceType', storedService.serviceType || 'general');
    setValue('projectDescription', storedService.projectDescription || '');
  }, [storedService, setValue]);

  const onSubmit = async (data: FormValues) => {
    setIsSubmitting(true);

    // Save to Redux
    dispatch(setService(data));

    setIsSubmitting(false);
    router.push('/time');
  };

  const handlePrevious = () => {
    router.push('/location');
  };

  return (
    <div className="max-w-4xl mx-auto p-5">
      <h1 className="text-3xl sm:text-4xl lg:text-5xl my-12 font-bold text-gray-900 mb-6 leading-tight">
        Choose the service that most closely matches your project
      </h1>

      <div className="bg-white py-8 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto">
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-8">
            {/* Header Section */}
            <div className="space-y-4">
              <h1 className="text-2xl lg:text-3xl font-bold text-blue-600 leading-tight">
                Choose More Specific Service
              </h1>
              <p className="text-gray-600 text-base sm:text-lg leading-relaxed max-w-3xl">
                Select the specific service you need from a wide range of
                professional offerings like plumbing, electrical work, or home
                renovations.
              </p>
              <hr className="border-gray-300" />
            </div>

            {/* Project Options Section */}
            <div className="space-y-6">
              <h2 className="text-xl sm:text-2xl font-semibold text-gray-900">
                Project options
              </h2>

              <div className="bg-white rounded-2xl overflow-hidden border border-gray-200">
                {categoryOptions?.map((option, index) => (
                  <label
                    key={index}
                    className={`flex items-center space-x-4 px-6 py-4 cursor-pointer transition-colors duration-200
                      ${
                        index !== categoryOptions.length - 1
                          ? 'border-b border-gray-200'
                          : ''
                      }
                      hover:bg-gray-50`}
                  >
                    <input
                      type="radio"
                      value={option.value}
                      {...register('serviceType', {
                        required: 'Please select a service type',
                      })}
                      className="w-5 h-5 text-blue-600 border-2 border-gray-400"
                    />
                    <span className="text-gray-800 text-base sm:text-lg font-medium">
                      {option.label}
                    </span>
                  </label>
                ))}
              </div>

              {errors.serviceType && (
                <p className="text-red-500 text-sm mt-2">
                  {errors.serviceType.message}
                </p>
              )}
            </div>
<h1 className='text-xl font-bold my-3'>Todo List</h1>
            {/* Project Description */}
            <div className="space-y-4">
              <textarea
                {...register('projectDescription', {
                  required: 'Please tell us more about your project',
                  minLength: {
                    value: 10,
                    message: 'Please provide at least 10 characters',
                  },
                })}
                placeholder="Tell us more about your project"
                rows={3}
                className="w-full px-4 py-4 text-base border border-gray-300 rounded-xl bg-gray-50 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none"
              />
              {errors.projectDescription && (
                <p className="text-red-500 text-sm">
                  {errors.projectDescription.message}
                </p>
              )}
            </div>

            {/* Action Buttons */}
            <div className="flex justify-between gap-4 pt-4">
              <button
                type="button"
                onClick={handlePrevious}
                className="w-1/2 px-6 py-4 text-base font-semibold text-gray-700 bg-white border-2 border-gray-300 rounded-xl hover:bg-gray-50 hover:border-gray-400 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2 transition-colors duration-200"
              >
                Previous
              </button>
              <button
                type="submit"
                disabled={!isValid || isSubmitting}
                className="w-1/2 px-6 py-4 text-base font-semibold text-white bg-blue-600 rounded-xl hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed transition-colors duration-200"
              >
                {isSubmitting ? 'Processing...' : 'Continue'}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default ChooseServicePage;
