/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unused-vars */
'use client';

import { useState } from 'react';
import { useForm, Controller } from 'react-hook-form';
import { FiPlus } from 'react-icons/fi';
import { MdClose } from 'react-icons/md';
import Select from 'react-select';
import { useGetAllCategoryQuery } from '@/redux/features/others/otherApi';
import { useCreateServicesMutation } from '@/redux/features/contractor/contractorApi';
import { message } from 'antd';
import { selectCurrentUser } from '@/redux/features/auth/authSlice';
import { useAppSelector } from '@/redux/hooks';
import Image from 'next/image';
import { useGetSpecefiqUserQuery } from '@/redux/features/user/userApi';

export default function CreateServiceForm() {
  const [selectedImage, setSelectedImage] = useState(null);
  const [selectedCategories, setSelectedCategories] = useState([]); // Store selected categories
  const [selectedSubcategories, setSelectedSubcategories] = useState({}); // Store subcategories per category
  const [createServices] = useCreateServicesMutation();
  const {
    register,
    handleSubmit,
    control,
    reset,
    formState: { errors },
  } = useForm({
    defaultValues: {
      title: '',
      details: '',
      category: '',
      price: '',
      image: null,
        type: '',
     
    },
  });
  const { data: allCategory } = useGetAllCategoryQuery(undefined);


  const user = useAppSelector(selectCurrentUser);
  const { data: specUser } = useGetSpecefiqUserQuery(user?.user?.userId);
  const removeService = category => {
    setSelectedCategories(
      selectedCategories.filter(cat => cat.value !== category.value)
    );
    const updatedSubcategories = { ...selectedSubcategories };
    delete updatedSubcategories[category.value];
    setSelectedSubcategories(updatedSubcategories);
  };

  // Define the type for category options
  type CategoryOption = {
    label: string;
    value: string;
    subCategories?: {
      label: string;
      value: string;
      parent: string;
    }[];
  };

  // Prepare options for react-select from categories and subcategories
  const categoryOptions: CategoryOption[] | undefined = allCategory?.data?.result?.map(
    service => ({
      label: service?.category,
      value: service?.category,
      subCategories: service?.subCategory?.map(sub => ({
        label: sub,
        value: `${service?.category}-${sub}`, // Combining category and subcategory for uniqueness
        parent: service?.category, // Storing parent category to know which category the sub belongs to
      })),
    })
  );

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

  // Log all form data, including selected categories and subcategories
  const onSubmit = async data => {
    const categoryName = selectedCategories.map(category => category.value);
    // const subServices = Object.values(selectedSubcategories).flat().map((sub) => sub.value);
    // Creating a new FormData object to handle the form submission
    const formData = new FormData();

    // Appending fields to the FormData object
    formData.append(
      'data',
      JSON.stringify({
        contractorId: specUser?.data?._id,
        title: data?.title,
        details: data?.details,
        categoryName,
        price: data?.price,
        type:data?.type,
        location:specUser?.data?.location
      })
    );

    // Appending the image file
    if (data?.image) {
      formData.append('image', data.image); // assuming 'data.image' is the file object
    }
    // Log the FormData contents
    formData.forEach((value, key) => {
    });

    try {
      const res = await createServices(formData);
      if (res.data) {
        message.success(res?.data?.message);
        reset()
      } else {
        // Check if error is FetchBaseQueryError and has data
        const errorMessage =
          res.error && 'data' in res.error && (res.error as any).data?.message
            ? (res.error as any).data.message
            : res.error && 'message' in res.error
            ? (res.error as { message?: string }).message
            : 'An error occurred';
        message.error(errorMessage);
      }
    } catch (error) {
      message.error(error);
    }
  };

  return (
    <div className="max-w-7xl mx-auto 2">
      <div className="bg-white rounded-lg p-6 sm:p-8">
        {/* Form Title */}
        <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-gray-900 mb-8">
          Create Your Service
        </h1>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          {/* Upload Section */}
          <div>
            <label className="block text-sm font-medium text-gray-900 mb-3">
              Upload cover of your service
            </label>
    

            <Controller
              name="image"
              control={control}
              // eslint-disable-next-line no-unused-vars
              render={({ field: { onChange, value, ...field } }) => (
                <div className="border-2 border-dashed border-gray-300 rounded-lg p-5 text-center hover:border-gray-400 transition-colors cursor-pointer">
                  <input
                    {...field}
                    type="file"
                    accept="image/*"
                    onChange={e => {
                      const file = e.target.files[0];
                      if (file) {
                        const reader = new FileReader();
                        reader.onloadend = () => {
                          setSelectedImage(reader.result); // Update the image preview
                        };
                        reader.readAsDataURL(file); // Convert file to base64 string
                        onChange(file); // Pass the file to react-hook-form
                      }
                    }}
                    className="hidden"
                    id="file-upload"
                  />
                  <label htmlFor="file-upload" className="cursor-pointer">
                    <div className="flex flex-col items-center">
                      <FiPlus className="w-8 h-8 text-gray-400 mb-3" />
                      <span className="text-lg font-medium text-gray-600">
                        {selectedImage ? 'Image Selected' : 'Upload'}
                      </span>
                      {/* If an image is selected, display the image preview */}
                      {selectedImage && (
                        <div className="mt-4">
                          <Image
                            src={selectedImage}
                            alt="Selected Image"
                            width={500}
                            height={500}
                            className="w-24 h-24 object-cover rounded"
                          />
                        </div>
                      )}
                    </div>
                  </label>
                </div>
              )}
            />
          </div>

          {/* Title Input */}
          <div>
            <label
              htmlFor="title"
              className="block text-sm font-medium text-gray-900 mb-3"
            >
              Title of your service
            </label>
            <input
              {...register('title', { required: 'Title is required' })}
              type="text"
              id="title"
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all"
              placeholder=""
            />
            {errors.title && (
              <p className="mt-1 text-sm text-red-600">
                {errors.title.message}
              </p>
            )}
          </div>

          {/* Service Details */}
          <div>
            <label
              htmlFor="details"
              className="block text-sm font-medium text-gray-900 mb-3"
            >
              Service Details
            </label>
            <textarea
              {...register('details', {
                required: 'Service details are required',
              })}
              id="details"
              rows={2}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all resize-none"
              placeholder=""
            />
          </div>
          <Controller
            name="category"
            control={control}
            render={() => (
              <Select
                isMulti
                options={categoryOptions}
                value={selectedCategories}
                onChange={handleCategoryChange}
                getOptionLabel={(e: CategoryOption) => e.label}
                getOptionValue={(e: CategoryOption) => e.value}
                placeholder="Select Categories"
                className="w-full mb-4"
              />
            )}
          />

          {/* Selected category tags */}
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
          {/* service type dropdown */}
 <div className="mt-4">
        <label htmlFor="type" className="block">Service Type</label>
        <select
          id="type"
          name="type"
          {...register("type" ,{ required: 'Type is required' })}
          className="border rounded p-2 w-full"
        >
          <option value="">Select Type</option>
          <option value="indoor">Indoor</option>
          <option value="outdoor">Outdoor</option>
          <option value="garden">Garden</option>
        </select>
        {errors.type && <p className="text-red-500 text-sm">{errors.type.message}</p>}
      </div>
          {/* Price Input */}
          <div>
            <label
              htmlFor="price"
              className="block text-sm font-medium text-gray-900 mb-3"
            >
              Item Price
            </label>
            <input
              {...register('price', { required: 'Price is required' })}
              type="text"
              id="price"
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all"
              placeholder="Price starts from"
            />
            {errors.price && (
              <p className="mt-1 text-sm text-red-600">
                {errors.price.message}
              </p>
            )}
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-4 px-6 rounded-lg transition-colors duration-200 text-lg"
          >
            Create Service
          </button>
        </form>
      </div>
    </div>
  );
}
