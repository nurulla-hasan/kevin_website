'use client';

import { useForm } from 'react-hook-form';
import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useAppDispatch, useAppSelector } from '@/redux/hooks';
import { selectTime, setTime } from '@/redux/features/project/projectSlice';
import { dateOptions, timeOptions } from '@/constants';

interface FormValues {
  preferredDate: string;
  preferredTime: string;
  projectDescription: string;
}

const TimePage = () => {
  const dispatch = useAppDispatch();
  const router = useRouter();
  const storedTime = useAppSelector(selectTime);

  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
    setValue,
  } = useForm<FormValues>({
    defaultValues: {
      preferredDate: storedTime.preferredDate || '',
      preferredTime: storedTime.preferredTime || '',
      projectDescription: storedTime.projectDescription || '',
    },
    mode: 'onChange',
  });

  const [isSubmitting, setIsSubmitting] = useState(false);

  // Set previous state on mount
  useEffect(() => {
    setValue('preferredDate', storedTime.preferredDate || '');
    setValue('preferredTime', storedTime.preferredTime || '');
    setValue('projectDescription', storedTime.projectDescription || '');
  }, [storedTime, setValue]);

  const onSubmit = async (data: FormValues) => {
    setIsSubmitting(true);

    // Save to Redux
    dispatch(setTime(data));

    setIsSubmitting(false);
    router.push('/selectConstructor');
  };

  const handlePrevious = () => {
    router.push('/chooseService');
  };

  return (
    <div className="max-w-4xl mx-auto p-4 sm:p-6 lg:p-8">
      <h1 className="text-2xl sm:text-3xl lg:text-4xl my-8 sm:my-12 font-bold text-foreground mb-6 leading-tight">
        When would you like the work to be completed?
      </h1>

      <div className="bg-card border border-border rounded-xl py-8 px-4 sm:px-6 lg:px-8 shadow-lg">
        <div className="max-w-4xl mx-auto">
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-8">
            {/* Header Section */}
            <div className="space-y-4">
              <h1 className="text-xl sm:text-2xl lg:text-3xl font-bold text-primary leading-tight">
                Pick Your Preferred Time
              </h1>
              <p className="text-muted-foreground text-base sm:text-lg leading-relaxed max-w-3xl">
                Select a convenient time slot for the contractor to visit or
                start the service.
              </p>
              <hr className="border-border" />
            </div>

            {/* Time Options */}
            <div className="space-y-6">
              <div className="space-y-3">
                <h2 className="text-xl sm:text-2xl font-semibold text-foreground">
                  Day
                </h2>

                <div className="bg-background rounded-2xl overflow-hidden border border-border">
                  {dateOptions.map((option, index) => (
                    <label
                      key={option.id}
                      className={`flex items-center space-x-4 px-6 py-4 cursor-pointer transition-colors duration-200
                      ${
                        index !== dateOptions.length - 1
                          ? 'border-b border-border'
                          : ''
                      }
                      hover:bg-muted`}
                    >
                      <input
                        type="radio"
                        value={option.value}
                        {...register('preferredDate', {
                          required: 'Please select a preferred time',
                        })}
                        className="w-5 h-5 text-primary border-2 border-border accent-primary"
                      />
                      <span className="text-foreground text-base sm:text-lg font-medium">
                        {option.value}
                      </span>
                    </label>
                  ))}

                  {errors.preferredDate && (
                    <p className="text-destructive text-sm mt-2">
                      {errors.preferredDate.message}
                    </p>
                  )}
                </div>
              </div>

              <div className="space-y-3">
                <h2 className="text-xl sm:text-2xl font-semibold text-foreground">
                  Time
                </h2>
                {timeOptions.map((option, index) => (
                  <label
                    key={index}
                    className={`flex items-center space-x-4 px-6 py-4 cursor-pointer transition-colors duration-200
                      ${
                        index !== timeOptions.length - 1
                          ? 'border-b border-border'
                          : ''
                      }
                      hover:bg-muted`}
                  >
                    <input
                      type="radio"
                      value={option}
                      {...register('preferredTime', {
                        required: 'Please select a preferred time',
                      })}
                      className="w-5 h-5 text-primary border-2 border-border accent-primary"
                    />
                    <span className="text-foreground text-base sm:text-lg font-medium">
                      {option}
                    </span>
                  </label>
                ))}

                {errors.preferredTime && (
                  <p className="text-destructive text-sm mt-2">
                    {errors.preferredTime.message}
                  </p>
                )}
              </div>
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
                {isSubmitting ? 'Processing...' : 'See Pros & Prices'}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default TimePage;
