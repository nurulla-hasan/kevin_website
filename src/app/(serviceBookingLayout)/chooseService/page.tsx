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
    <div className="max-w-4xl mx-auto p-4 sm:p-6 lg:p-8">
      <h1 className="text-2xl sm:text-3xl lg:text-4xl my-8 sm:my-12 font-bold text-foreground mb-6 leading-tight">
        Choose the service that most closely matches your project
      </h1>

      <div className="bg-card border border-border rounded-xl py-8 px-4 sm:px-6 lg:px-8 shadow-lg">
        <div className="max-w-4xl mx-auto">
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-8">
            {/* Header Section */}
            <div className="space-y-4">
              <h1 className="text-xl sm:text-2xl lg:text-3xl font-bold text-primary leading-tight">
                Choose More Specific Service
              </h1>
              <p className="text-muted-foreground text-base sm:text-lg leading-relaxed max-w-3xl">
                Select the specific service you need from a wide range of
                professional offerings like plumbing, electrical work, or home
                renovations.
              </p>
              <hr className="border-border" />
            </div>

            {/* Project Options Section */}
            <div className="space-y-6">
              <h2 className="text-xl sm:text-2xl font-semibold text-foreground">
                Project options
              </h2>

              <div className="bg-background rounded-2xl overflow-hidden border border-border">
                {categoryOptions?.map((option, index) => (
                  <label
                    key={index}
                    className={`flex items-center space-x-4 px-6 py-4 cursor-pointer transition-colors duration-200
                      ${
                        index !== categoryOptions.length - 1
                          ? 'border-b border-border'
                          : ''
                      }
                      hover:bg-muted`}
                  >
                    <input
                      type="radio"
                      value={option.value}
                      {...register('serviceType', {
                        required: 'Please select a service type',
                      })}
                      className="w-5 h-5 text-primary border-2 border-border accent-primary"
                    />
                    <span className="text-foreground text-base sm:text-lg font-medium">
                      {option.label}
                    </span>
                  </label>
                ))}
              </div>

              {errors.serviceType && (
                <p className="text-destructive text-sm mt-2">
                  {errors.serviceType.message}
                </p>
              )}
            </div>
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
                className="w-full px-4 py-4 text-base border border-border rounded-xl bg-background placeholder:text-muted-foreground text-foreground focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent resize-none"
              />
              {errors.projectDescription && (
                <p className="text-destructive text-sm">
                  {errors.projectDescription.message}
                </p>
              )}
            </div>

            {/* Action Buttons */}
            <div className="flex justify-between gap-4 pt-4">
              <button
                type="button"
                onClick={handlePrevious}
                className="w-1/2 px-6 py-4 text-base font-semibold text-foreground bg-card border-2 border-border rounded-xl hover:bg-muted hover:border-border focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 transition-colors duration-200"
              >
                Previous
              </button>
              <button
                type="submit"
                disabled={!isValid || isSubmitting}
                className="w-1/2 px-6 py-4 text-base font-semibold text-primary-foreground bg-primary rounded-xl hover:bg-primary/90 focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed transition-colors duration-200"
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
