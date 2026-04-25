'use client';

import { useRef, useState } from 'react';
import { useForm } from 'react-hook-form';
import { FaPlus, FaTimes } from 'react-icons/fa';
import Image from 'next/image';

const AddProject = () => {
  const { register, handleSubmit, } = useForm({
    defaultValues: {
      title: '',
      projectName: '',
      projectAddress: '',
      projectPrices: '',
      projectDetails: '',
      searchServices: '',
      projectType: 'outdoor', // Default type set to outdoor
      projectLocation: 'usa', // Default location set to usa
    },
  });

  const [uploadedPhoto, setUploadedPhoto] = useState(null);
  const [isDragOver, setIsDragOver] = useState(false);
  const fileInputRef = useRef(null);

  const handleDragOver = e => {
    e.preventDefault();
    setIsDragOver(true);
  };

  const handleDragLeave = e => {
    e.preventDefault();
    setIsDragOver(false);
  };

  const handleDrop = e => {
    e.preventDefault();
    setIsDragOver(false);
    const files = Array.from(e.dataTransfer.files);
    handleFiles(files);
  };

  const handleFiles = files => {
    const imageFiles = files.filter(file => file.type.startsWith('image/'));
    if (imageFiles.length > 0) {
      const file = imageFiles[0];
      const reader = new FileReader();
      reader.onload = e => {
        const newPhoto = {
          id: Date.now() + Math.random(),
          file: file,
          preview: e.target.result,
          name: file.name,
        };
        setUploadedPhoto(newPhoto);
      };
      reader.readAsDataURL(file);
    }
  };

  const removePhoto = () => {
    setUploadedPhoto(null);
  };

  const handleUploadClick = () => {
    fileInputRef.current?.click();
  };

  const onSubmit = data => {
    const formattedData = {
      contractorId: "689dc0db9c34d0e36b8923cf",  // Static contractor ID
      title: data.title,
      details: data.projectDetails,
      categoryName: [data.searchServices],  // Assuming the service is the category
      price: parseFloat(data.projectPrices),  // Price should be a number
      type: data.projectType,  // Project type (indoor/outdoor)
      location: data.projectLocation,  // Location (static or dynamic)
    };


    // Handle form submission, e.g., sending data to an API
  };

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
      <h1 className="text-3xl font-bold max-w-7xl mx-auto my-5 text-foreground">
        Upload Project Content
      </h1>
      <div className="bg-card border border-border max-w-7xl mx-auto p-5">
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          <div>
            <input
              type="text"
              {...register('title')}
              className="w-full px-4 py-3 border border-border rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent outline-none transition-all duration-200 bg-background text-foreground placeholder:text-muted-foreground"
              placeholder="Enter project title..."
            />
          </div>

          {/* Project Details */}
          <div>
            <label className="block text-sm font-medium text-foreground mb-2">
              Project Details
            </label>
            <textarea
              {...register('projectDetails')}
              rows={6}
              className="w-full px-4 py-3 border border-border rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent outline-none transition-all duration-200 resize-none bg-background text-foreground placeholder:text-muted-foreground"
              placeholder="Describe your project details..."
            />
          </div>

          {/* Category Name (Service) */}
          <div>
            <label className="block text-sm font-medium text-foreground mb-2">
              Category Name (Service)
            </label>
            <input
              type="text"
              {...register('searchServices')}
              className="w-full px-4 py-3 border border-border rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent outline-none transition-all duration-200 bg-background text-foreground placeholder:text-muted-foreground"
              placeholder="Enter category (e.g., Cleaning)"
            />
          </div>

          {/* Price */}
          <div>
            <label className="block text-sm font-medium text-foreground mb-2">
              Price
            </label>
            <input
              type="number"
              {...register('projectPrices')}
              className="w-full px-4 py-3 border border-border rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent outline-none transition-all duration-200 bg-background text-foreground placeholder:text-muted-foreground"
              placeholder="Enter project price"
            />
          </div>

          {/* Type (Indoor/Outdoor) */}
          <div>
            <label className="block text-sm font-medium text-foreground mb-2">
              Project Type
            </label>
            <select
              {...register('projectType')}
              className="w-full px-4 py-3 border border-border rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent outline-none transition-all duration-200 bg-background text-foreground"
            >
              <option value="outdoor">Outdoor</option>
              <option value="indoor">Indoor</option>
            </select>
          </div>

          {/* Location */}
          <div>
            <label className="block text-sm font-medium text-foreground mb-2">
              Location
            </label>
            <select
              {...register('projectLocation')}
              className="w-full px-4 py-3 border border-border rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent outline-none transition-all duration-200 bg-background text-foreground"
            >
              <option value="usa">USA</option>
              <option value="india">India</option>
              <option value="uk">UK</option>
              {/* Add other location options as needed */}
            </select>
          </div>

          {/* Upload Project Photo */}
          <div>
            <label className="block text-sm font-medium text-foreground mb-3">
              Upload Project Photo
            </label>

            {uploadedPhoto && (
              <div className="relative group mb-4">
                <Image
                  src={uploadedPhoto.preview || '/placeholder.svg'}
                  alt={uploadedPhoto.name}
                  width={300}
                  height={96}
                  className="w-full h-24 object-cover rounded-lg border border-border"
                />
                <button
                  type="button"
                  onClick={removePhoto}
                  className="absolute -top-2 -right-2 w-6 h-6 bg-destructive text-destructive-foreground rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-200"
                >
                  <FaTimes className="w-3 h-3" />
                </button>
              </div>
            )}

            <div
              onDragOver={handleDragOver}
              onDragLeave={handleDragLeave}
              onDrop={handleDrop}
              onClick={handleUploadClick}
              className={`border-2 border-dashed rounded-lg p-12 text-center cursor-pointer transition-all duration-200 ${
                isDragOver
                  ? 'border-primary bg-primary/10'
                  : 'border-border bg-card hover:border-border hover:bg-muted'
              }`}
            >
              <div className="flex flex-col items-center">
                <div className="w-12 h-12 bg-primary rounded-full flex items-center justify-center mb-4">
                  <FaPlus className="text-primary-foreground text-xl" />
                </div>
                <p className="text-muted-foreground text-base">
                  Drop photo here or click to upload
                </p>
              </div>
            </div>

            <input
              ref={fileInputRef}
              type="file"
              accept="image/*"
              className="hidden"
            />
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            className="w-full bg-primary hover:bg-primary/90 text-primary-foreground font-medium py-4 px-6 rounded-lg transition-colors duration-200 text-lg"
          >
            Upload Project
          </button>
        </form>
      </div>
    </div>
  );
};

export default AddProject;
