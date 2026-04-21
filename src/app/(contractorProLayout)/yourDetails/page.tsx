'use client';

import { useForm, Controller } from 'react-hook-form';
import { Input } from 'antd';
import 'react-phone-input-2/lib/style.css';
import { useAppDispatch, useAppSelector } from '@/redux/hooks';
import {
  selectCurrentContractor,
  updateContractorData,
} from '@/redux/features/contractor/contractorSlice';
import { selectCurrentUser } from '@/redux/features/auth/authSlice';
import { useState } from 'react';
import { useRouter } from 'next/navigation';

const YourDetailsPage = () => {
  const  user  = useAppSelector(selectCurrentUser);

  const contractorData = useAppSelector(selectCurrentContractor);
  const dispatch = useAppDispatch();
  const router = useRouter();

  const {
    register,
    control,
    handleSubmit,
    formState: { errors },
    setValue,
  } = useForm();

  const [noOfEmployee, setNoOfEmployee] = useState(''); // state for handling employee size

  // Handle form submission
  const onSubmit = data => {
    data.email = user?.email;
    dispatch(updateContractorData(data));

    router.push('/maxLead');
  };

  // Handling company size selection
  const handleCompanySize = size => {
    setNoOfEmployee(size);
    setValue('noOfEmployee', size); // Set the value in the form
  };

  return (
    <>
      {/* Header */}
      <div className=" max-w-4xl mx-auto flex justify-between items-center mb-4">
        <h1 className="text-3xl font-bold text-gray-800 mt-5">
          Basic Details About You
        </h1>
      </div>
      <div className="w-full max-w-4xl mx-auto my-8 rounded-md bg-white p-6">
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="flex flex-col md:flex-row gap-8 py-8"
        >
          {/* Form Fields */}
          <div className="flex-1 space-y-4">
            <div>
              <label className="block text-sm font-bold mb-3 mt-5">
                Company Name
              </label>
              <Controller
                name="companyName"
                control={control}
                rules={{ required: 'Company name is required' }}
                render={({ field }) => (
                  <Input {...field} placeholder="type your company name" />
                )}
              />
              {errors.companyName && (
                <p className="text-red-500 text-sm">
                  {errors.companyName.message.toString()}
                </p>
              )}
            </div>

            <div>
              <label className="block text-sm font-bold mb-3 mt-5">
                Email Address
              </label>
              <Input
                {...register('email')}
                defaultValue={user?.email}
                readOnly
              />
            </div>

            <div>
              <label className="block text-sm font-bold mb-3 mt-5">
                Company size, employees
              </label>
              <div className="flex gap-8 max-w-3xl mx-auto">
                <button
                  type="button"
                  className={`text-sm border border-black px-3 py-1 rounded-2xl ${
                    noOfEmployee === 'Self-employed'
                      ? 'bg-blue-600 text-white'
                      : ''
                  }`}
                  onClick={() => handleCompanySize('Self-employed')}
                >
                  Self-employed, Sole propitor
                </button>
                <button
                  type="button"
                  className={`text-sm border border-black px-3 py-1 rounded-2xl ${
                    noOfEmployee === '2-10' ? 'bg-blue-600 text-white' : ''
                  }`}
                  onClick={() => handleCompanySize('2-10')}
                >
                  2-10 Person
                </button>
                <button
                  type="button"
                  className={`text-sm border border-black px-3 py-1 rounded-2xl ${
                    noOfEmployee === '11-50' ? 'bg-blue-600 text-white' : ''
                  }`}
                  onClick={() => handleCompanySize('11-50')}
                >
                  11-50 Person
                </button>
                <button
                  type="button"
                  className={`text-sm border border-black px-3 py-1 rounded-2xl ${
                    noOfEmployee === '51-200' ? 'bg-blue-600 text-white' : ''
                  }`}
                  onClick={() => handleCompanySize('51-200')}
                >
                  51-200 Person
                </button>
                <button
                  type="button"
                  className={`text-sm border border-black px-3 py-1 rounded-2xl ${
                    noOfEmployee === '200+' ? 'bg-blue-600 text-white' : ''
                  }`}
                  onClick={() => handleCompanySize('200+')}
                >
                  200+
                </button>
              </div>
              <input
                type="hidden"
                {...register('noOfEmployee', {
                  required: 'Company size is required',
                })}
                value={noOfEmployee}
              />
              {errors.noOfEmployee && (
                <p className="text-red-500 text-sm">
                  {errors.noOfEmployee.message.toString()}
                </p>
              )}
            </div>

            <div>
              <button
                type="submit"
                className="bg-blue-600 py-2 text-white w-full rounded-xl"
              >
                Continue
              </button>
            </div>
          </div>
        </form>
      </div>
    </>
  );
};

export default YourDetailsPage;
