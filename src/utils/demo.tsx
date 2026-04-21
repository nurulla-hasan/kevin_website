'use client';

import { useRef, useState } from 'react';
import { useForm } from 'react-hook-form';
import { FaPlus, FaTimes } from 'react-icons/fa';
import Image from 'next/image';
const AddProject = () => {
  const { register, handleSubmit, setValue, watch } = useForm({
    defaultValues: {
      title: '',
      projectName: '',
      projectAddress: '',
      projectPrices: '',
      projectDetails: '',
      searchServices: '',
    },
  });

  const searchServices = watch('searchServices');

  const [serviceTypes, setServiceTypes] = useState([
    { id: 1, name: 'Handyman' },
    { id: 2, name: 'Painter' },
  ]);

  const [uploadedPhotos, setUploadedPhotos] = useState([]);
  const [isDragOver, setIsDragOver] = useState(false);
  const fileInputRef = useRef(null);

  const addServiceType = serviceName => {
    if (
      serviceName.trim() &&
      !serviceTypes.find(
        s => s.name.toLowerCase() === serviceName.toLowerCase()
      )
    ) {
      const newService = {
        id: Date.now(),
        name: serviceName.trim(),
      };
      setServiceTypes(prev => [...prev, newService]);
      setValue('searchServices', '');
    }
  };

  const removeServiceType = id => {
    setServiceTypes(prev => prev.filter(service => service.id !== id));
  };

  const handleServiceSearch = e => {
    if (e.key === 'Enter') {
      e.preventDefault();
      addServiceType(searchServices);
    }
  };

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

  const handleFileSelect = e => {
    const files = Array.from(e.target.files);
    handleFiles(files);
  };

  const handleFiles = files => {
    const imageFiles = files.filter(file => file.type.startsWith('image/'));
    imageFiles.forEach(file => {
      const reader = new FileReader();
      reader.onload = e => {
        const newPhoto = {
          id: Date.now() + Math.random(),
          file: file,
          preview: e.target.result,
          name: file.name,
        };
        setUploadedPhotos(prev => [...prev, newPhoto]);
      };
      reader.readAsDataURL(file);
    });
  };

  const removePhoto = id => {
    setUploadedPhotos(prev => prev.filter(photo => photo.id !== id));
  };

  const handleUploadClick = () => {
    fileInputRef.current?.click();
  };

  const onSubmit = data => {
    // Handle form submission
  };
  return (
    <div>
      <nav
        className="flex items-center font-normal text-base leading-6  bg-white pl-3 md:pl-5 lg:pl-10 xl:pl-44 border-t border-gray-500 py-3"
        aria-label="breadcrumb"
      >
        <p className="text-black text-xl">Dashboard</p>
        <svg
          className="mx-2 w-6 h-6 text-black"
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
        <span className="text-black cursor-default text-xl">
          Public Profile
        </span>
      </nav>
      <h1 className="text-3xl font-bold max-w-7xl mx-auto my-5">
        Upload Project Content
      </h1>
      <div className="bg-white max-w-7xl mx-auto p-5">
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          <div>
            <input
              type="text"
              {...register('title')}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all duration-200"
              placeholder="Enter project title..."
            />
          </div>

          {/* Project Name */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Project Name
            </label>
            <input
              type="text"
              {...register('projectName')}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all duration-200"
              placeholder="Enter project name"
            />
          </div>

          {/* Project Address and Prices */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Project Address
              </label>
              <input
                type="text"
                {...register('projectAddress')}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all duration-200"
                placeholder="Enter project address"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Project Prices
              </label>
              <input
                type="text"
                {...register('projectPrices')}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all duration-200"
                placeholder="Enter project prices"
              />
            </div>
          </div>

          {/* Service Types */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-3">
              Service type
            </label>
            <div className="flex flex-wrap gap-2 mb-3">
              {serviceTypes.map(service => (
                <span
                  key={service.id}
                  className="inline-flex items-center gap-2 px-3 py-2 bg-gray-700 text-white text-sm rounded-full"
                >
                  {service.name}
                  <button
                    type="button"
                    onClick={() => removeServiceType(service.id)}
                    className="hover:bg-gray-600 rounded-full p-1 transition-colors duration-200"
                  >
                    <FaTimes className="w-3 h-3" />
                  </button>
                </span>
              ))}
            </div>

            <input
              type="text"
              {...register('searchServices')}
              onKeyPress={handleServiceSearch}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all duration-200"
              placeholder="Search for more services..."
            />
          </div>

          {/* Project Details */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Project Details
            </label>
            <textarea
              {...register('projectDetails')}
              rows={6}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all duration-200 resize-none"
              placeholder="Describe your project details..."
            />
          </div>

          {/* Upload Project Photo */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-3">
              Upload Project Photo
            </label>

            {uploadedPhotos.length > 0 && (
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4 mb-4">
                {uploadedPhotos.map(photo => (
                  <div key={photo.id} className="relative group">
                    <Image
                      src={photo.preview || '/placeholder.svg'}
                      alt={photo.name}
                      width={300}
                      height={96}
                      className="w-full h-24 object-cover rounded-lg border border-gray-300"
                    />

                    <button
                      type="button"
                      onClick={() => removePhoto(photo.id)}
                      className="absolute -top-2 -right-2 w-6 h-6 bg-red-500 text-white rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-200"
                    >
                      <FaTimes className="w-3 h-3" />
                    </button>
                  </div>
                ))}
              </div>
            )}

            <div
              onDragOver={handleDragOver}
              onDragLeave={handleDragLeave}
              onDrop={handleDrop}
              onClick={handleUploadClick}
              className={`border-2 border-dashed rounded-lg p-12 text-center cursor-pointer transition-all duration-200 ${
                isDragOver
                  ? 'border-blue-500 bg-blue-50'
                  : 'border-gray-300 bg-white hover:border-gray-400 hover:bg-gray-50'
              }`}
            >
              <div className="flex flex-col items-center">
                <div className="w-12 h-12 bg-blue-600 rounded-full flex items-center justify-center mb-4">
                  <FaPlus className="text-white text-xl" />
                </div>
                <p className="text-gray-600 text-base">
                  Drop photos here or click to upload
                </p>
              </div>
            </div>

            <input
              ref={fileInputRef}
              type="file"
              accept="image/*"
              multiple
              onChange={handleFileSelect}
              className="hidden"
            />
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            className="w-full bg-blue-600 hover:bg-blue-700 text-white font-medium py-4 px-6 rounded-lg transition-colors duration-200 text-lg"
          >
            Upload Project
          </button>
        </form>
      </div>
    </div>
  );
};

export default AddProject;
