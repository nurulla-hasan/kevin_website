/* eslint-disable @typescript-eslint/no-explicit-any */
'use client';

import { useState } from 'react';
import { MdClose } from 'react-icons/md';
import { useAppSelector } from '@/redux/hooks';
import { selectCurrentContractor } from '@/redux/features/contractor/contractorSlice';
import { useGetAllCategoryQuery } from '@/redux/features/others/otherApi';
import { useForm, Controller } from 'react-hook-form';
import Select from 'react-select';
import { useCreateContractorMutation } from '@/redux/features/contractor/contractorApi';
import { message } from 'antd';
import { useRouter } from 'next/navigation';

export default function MaxLead() {
  const { control } = useForm();
  const [selectedCategories, setSelectedCategories] = useState([]); // Store selected categories
  const [selectedSubcategories, setSelectedSubcategories] = useState({}); // Store subcategories per category
  const contractorData = useAppSelector(selectCurrentContractor);
  const router = useRouter();
  const [createContractor] = useCreateContractorMutation();
  const { data: allCategory } = useGetAllCategoryQuery(undefined);

  type SubCategoryOption = { label: string; value: string; parent: string };

  const removeService = category => {
    setSelectedCategories(
      selectedCategories.filter(cat => cat.value !== category.value)
    );
    const updatedSubcategories = { ...selectedSubcategories };
    delete updatedSubcategories[category.value];
    setSelectedSubcategories(updatedSubcategories);
  };

  // Prepare options for react-select from categories and subcategories
  const categoryOptions = allCategory?.data?.result?.map(service => ({
    label: service?.category,
    value: service?.category,
    subCategories: service?.subCategory?.map(sub => ({
      label: sub,
      value: `${service?.category}-${sub}`, // Combining category and subcategory for uniqueness
      parent: service?.category, // Storing parent category to know which category the sub belongs to
    })),
  }));

  // Handle category selection change
  const handleCategoryChange = selectedOptions => {
    setSelectedCategories(selectedOptions);

    // Initialize selected subcategories for each selected category
    const newSubcategories = {};
    selectedOptions.forEach(category => {
      newSubcategories[category.value] = []; // Empty array for each selected category
    });
    setSelectedSubcategories(newSubcategories);
  };

  // Handle subcategory selection change
  const handleSubcategoryChange = (categoryValue, selectedSubOptions) => {
    setSelectedSubcategories({
      ...selectedSubcategories,
      [categoryValue]: selectedSubOptions, // Update subcategories for the selected category
    });
  };

  // Get subcategory options based on selected categories
  const subCategoryOptions = selectedCategories?.map(category => {
    interface Category {
      category: string;
      subCategory: string[];
    }

    const subCategories: string[] | undefined = (
      allCategory?.data?.result as Category[]
    )?.find(
      (service: Category) => service.category === category.value
    )?.subCategory;
    return {
      category: category.value,
      subCategories: subCategories?.map(sub => ({
        label: sub,
        value: `${category.value}-${sub}`,
        parent: category.value,
      })),
    };
  });
  // Prepare data to send to DB

  const prepareDataToSend = async () => {
    const servicesYouProvide = selectedCategories.map(
      category => category.value
    );
    const subServices = Object.values(selectedSubcategories)
      .flat()
      .map((sub: SubCategoryOption) => sub.value);

    const data = {
      servicesYouProvide,
      subServices,
    };

    const modifiedData = {
      ...data,
      email: contractorData?.email,
      noOfEmployee: contractorData?.noOfEmployee,
      location: contractorData?.location,
      zip: contractorData?.zip,
      companyName: contractorData?.companyName,
    };

    try {
      const response = await createContractor(modifiedData);
      if (response.data) {
        message.success(response?.data?.message);
        router.push('/dashboard');
      } else {
        message.error(
          (response?.error as any)?.data?.message ||
            (response?.error as any)?.message ||
            'An error occurred'
        );
      }
      // Redirect user or show success message
    } catch (error) {
      // console.error("response failed:", error);
      message.error(error);
      // Show error to user
    }
  };
  return (
    <div>
      <h1 className="text-2xl font-bold max-w-4xl mx-auto my-12">
        Maximise your leads
      </h1>
      <div className="max-w-4xl mx-auto p-6 bg-white">
        {/* Service you provide section */}
        <div className="mb-8">
          <h2 className="text-lg font-semibold text-gray-900 mb-4">
            Service you provide
          </h2>

          {/* Multi-select dropdown for categories */}
          <Controller
            name="categories"
            control={control}
            render={({ field }) => (
              <Select
                {...field}
                isMulti
                options={categoryOptions}
                onChange={handleCategoryChange}
                getOptionLabel={e => e.label}
                getOptionValue={e => e.value}
                placeholder="Select Categories"
                className="w-full mb-4"
              />
            )}
          />

          {/* Subcategory dropdown for each selected category */}
          {subCategoryOptions?.map(categoryOption => (
            <div key={categoryOption.category}>
              <h3 className="text-lg font-semibold mb-4">
                {categoryOption.category}
              </h3>
              <Controller
                name={`subcategories-${categoryOption.category}`}
                control={control}
                render={({ field }) => (
                  <Select
                    {...field}
                    isMulti
                    options={categoryOption.subCategories}
                    onChange={selectedSubOptions =>
                      handleSubcategoryChange(
                        categoryOption.category,
                        selectedSubOptions
                      )
                    }
                    getOptionLabel={e => e.label}
                    getOptionValue={e => e.value}
                    placeholder="Select Subcategories"
                    className="w-full mb-4"
                  />
                )}
              />
            </div>
          ))}
        </div>

        {/* Selected service tags */}
        <div className="flex flex-wrap gap-2 mb-4">
          {selectedCategories.map((category, index) => (
            <div
              key={index}
              className="inline-flex items-center gap-2 bg-slate-700 text-white px-4 py-2 rounded-full text-sm font-medium"
            >
              <span>{category.label}</span>
              <button
                onClick={() => removeService(category)}
                className="hover:bg-slate-600 rounded-full p-0.5 transition-colors"
                aria-label={`Remove ${category.label}`}
              >
                <MdClose className="w-4 h-4" />
              </button>
            </div>
          ))}
        </div>

        {/* Current available leads section */}
        <div className="bg-blue-100 rounded-lg p-6 flex flex-col sm:flex-row sm:items-center sm:justify-center gap-4">
          <div>
            {/* <div className="text-2xl font-bold text-gray-900 mb-1">14</div>
            <div className="text-sm font-medium text-gray-700">
              Current available leads
            </div> */}
          </div>
          <button
            onClick={prepareDataToSend}
            className="bg-blue-600 hover:bg-blue-700 text-white font-semibold px-6 py-3 rounded-lg transition-colors focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 outline-none"
          >
            See Leads
          </button>
        </div>
      </div>
    </div>
  );
}
