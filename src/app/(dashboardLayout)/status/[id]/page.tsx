'use client';

import { useState } from 'react';
import Image from 'next/image';
import {
  FaCalendarAlt,
  FaMapMarkerAlt,
  FaClock,
  FaPlus,
  FaCheck,
} from 'react-icons/fa';
import { Modal } from 'antd';
import cons1 from '@/assests/cons1.png';

export default function ProjectDetails() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [cancelModalVisible, setCancelModalVisible] = useState(false);
  const [selectedReason, setSelectedReason] = useState(null);

  const showModal = () => setIsModalOpen(true);
  const handleCancel = () => setIsModalOpen(false);
  const handleOk = () => {
    setIsModalOpen(false);
  };

  return (
    <div className="max-w-7xl mx-auto bg-gray-50 p-6 rounded-lg">
      {/* Header Section */}
      <div className="flex flex-col md:flex-row gap-4 w-full">
        <div className="flex flex-col items-center md:w-[15%] w-full">
          <Image
            src={cons1}
            alt="Ellie Smith"
            width={100}
            height={100}
            className="rounded-full object-cover w-20 h-20 border-2 border-black"
          />
          <button className="px-3 mt-3 py-1 border border-black  rounded-lg text-black hover:bg-gray-100 transition text-sm">
            View Profile
          </button>
        </div>

        <div className="flex flex-col md:flex-row justify-between items-start w-full gap-4">
          <div className="w-full md:w-[70%]">
            <h1 className="text-xl md:text-2xl font-bold text-gray-900">
              You&apos;ve Booked Ellie Smith
            </h1>
            <p className="text-gray-600 mt-2 text-sm md:text-base">
              Giovanni C. is currently offline and will reach out once available
              in the app. You will be notified as soon as they respond.
            </p>
          </div>

          <div className="w-full md:w-auto">
            <button className="w-full md:w-auto px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition text-sm">
              Chat Contractor
            </button>
          </div>
        </div>
      </div>

      <hr className="border-gray-200 my-6" />

      {/* Cleaning Details */}
      <div className="mb-6">
        <h2 className="text-xl font-bold text-gray-900 mb-4">Cleaning</h2>
        <div className="space-y-3">
          <div className="flex items-center gap-3 text-gray-700">
            <FaCalendarAlt className="text-gray-500" />
            <span>Apr 28, 12:00 PM</span>
          </div>
          <div className="flex items-center gap-3 text-gray-700">
            <FaMapMarkerAlt className="text-gray-500" />
            <span>123 Main Street, New York, NY 10001</span>
          </div>
          <div className="flex items-center gap-3 text-gray-700">
            <FaClock className="text-gray-500" />
            <span>Apr 28, 12:00 PM</span>
          </div>
        </div>
      </div>

      <hr className="border-gray-200 my-6" />

      {/* Price Details */}
      <div className="mb-6">
        <h2 className="text-xl font-bold text-gray-900 mb-4">Price Details</h2>
        <div className="space-y-3">
          <div className="flex justify-between">
            <span className="text-gray-700">Hourly Rate</span>
            <span className="font-medium">$65/hr</span>
          </div>
          <div className="flex justify-between">
            <span className="text-gray-700">Trust & Support fee</span>
            <span className="font-medium">$10/hr</span>
          </div>
          <div className="flex justify-between pt-2 border-gray-200">
            <span className="text-lg font-bold text-gray-900">Total Rate</span>
            <span className="text-lg font-bold text-gray-900">$75/Hr</span>
          </div>
        </div>
      </div>

      <hr className="border-gray-200 my-6" />

      {/* Project Details */}
      <div className="mb-6">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-bold text-gray-900">Project Details</h2>
          <button className="text-blue-600 hover:underline text-sm">
            Edit
          </button>
        </div>
        <div>
          <p className="font-medium text-gray-800 mb-2">
            To-Do List for Cleaner
          </p>
          <ul className="space-y-2 text-gray-700">
            {[
              'Clean kitchen (wipe surfaces, clean sink, stovetop, and appliances)',
              'Clean bathroom(s) (toilet, sink, shower/bath, mirrors)',
              'Vacuum and mop all floors',
              'Dust all surfaces and furniture',
              'Empty trash bins',
              'Disinfect high-touch areas (doorknobs, switches, remotes, etc.)',
            ].map((task, i) => (
              <li className="flex items-start" key={i}>
                <span className="text-gray-400 mr-2">•</span>
                <span>{task}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>

      {/* Add Note Section */}
      <button
        onClick={showModal}
        className="w-full border border-gray-300 rounded py-3 px-4 text-gray-600 flex items-center justify-center gap-2 hover:bg-gray-100 transition mb-6"
      >
        <FaPlus className="text-black" size={14} />
        <span className="text-black">
          Add Note or Photos for the Contractor
        </span>
      </button>

      {/* Note Modal */}
      <Modal
        open={isModalOpen}
        onOk={handleOk}
        onCancel={handleCancel}
        footer={null}
      >
        <div className="max-w-xl mx-auto mt-2 p-4 bg-white rounded-lg shadow">
          <h2 className="text-lg font-semibold mb-4">Add a Note</h2>

          <div className="mb-4">
            <label
              htmlFor="note"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              Note
            </label>
            <input
              type="text"
              id="note"
              placeholder="I Would Like you to clean the window more carefully"
              className="w-full border border-gray-300 rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div className="mb-4">
            <label
              htmlFor="coverImage"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              Upload Cover Image
            </label>
            <div className="flex items-center gap-2">
              <input
                type="file"
                id="coverImage"
                accept="image/jpeg, image/png"
                className="block text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded file:border-0 file:text-sm file:font-semibold file:bg-gray-100 file:text-gray-700 hover:file:bg-gray-200"
              />
              <span className="text-xs text-gray-400">
                Accepted formats: JPG, PNG
              </span>
            </div>
          </div>

          <div className="mb-6">
            <label
              htmlFor="details"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              Details
            </label>
            <textarea
              id="details"
              rows={4}
              className="w-full border border-gray-300 rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            ></textarea>
          </div>

          <div className="flex justify-between">
            <button
              type="button"
              className="px-4 py-2 border border-gray-300 text-gray-700 rounded-md hover:bg-gray-100"
              onClick={handleCancel}
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-6 py-2 bg-blue-600 text-white text-sm font-medium rounded-md hover:bg-blue-700"
            >
              Add Note
            </button>
          </div>
        </div>
      </Modal>

      {/* Progress Section */}
      <div className="mb-8">
        <h2 className="text-xl font-bold text-black mb-6">Progress</h2>
        <div className="relative">
          <div className="h-1 bg-gray-200 absolute top-4 left-2 right-0 z-0">
            <div className="h-full bg-blue-600 w-[35%]"></div>
          </div>

          <div className="flex justify-between relative z-10">
            {['Booked', 'On the way', 'Started', 'Done'].map((label, index) => (
              <div className="flex flex-col items-center" key={label}>
                <div
                  className={`w-8 h-8 rounded-full flex items-center justify-center mb-2 ${
                    index === 0
                      ? 'bg-green-100 border-2 border-green-500'
                      : 'bg-white border-2 border-gray-300'
                  }`}
                >
                  {index === 0 ? (
                    <FaCheck className="text-green-500" />
                  ) : (
                    <div className="w-2 h-2 rounded-full bg-white"></div>
                  )}
                </div>
                <span className="text-sm text-black">{label}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Action Buttons */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <button
          onClick={() => setCancelModalVisible(true)}
          className="w-full py-3 bg-red-500 text-white rounded hover:bg-red-600 transition"
        >
          Cancel Project
        </button>
        <button className="w-full py-3 bg-blue-600 text-white rounded hover:bg-blue-700 transition">
          Mark as done
        </button>
      </div>

      {/* Cancel Modal */}
      <Modal
        open={cancelModalVisible}
        footer={null}
        onCancel={() => setCancelModalVisible(false)}
      >
        <div className="p-4">
          <h2 className="text-xl font-bold text-center mb-6 text-black">
            Why Are You Canceling This Project?
          </h2>

          <div className="space-y-2">
            {[
              'No longer need the service',
              'Contractor is not doing the task as I asked',
              'The cleaning needs are more than we originally discussed.',
              'The cost is currently outside my budget.',
              'There are some safety concerns I need to address first.',
              'I can’t provide access to the property as planned.',
            ].map((reason, index) => (
              <button
                key={index}
                onClick={() => setSelectedReason(reason)}
                className={`w-full border rounded-md px-4 py-2 text-sm text-left ${
                  selectedReason === reason
                    ? 'bg-blue-100 border-blue-500 text-blue-700'
                    : 'hover:bg-gray-100'
                }`}
              >
                {reason}
              </button>
            ))}
          </div>

          <div className="mt-6 flex justify-between gap-4">
            <button
              onClick={() => setCancelModalVisible(false)}
              className="flex-1 border border-black text-black py-2 rounded hover:bg-blue-50"
            >
              I don&apos;t want to Cancel
            </button>
            <button
              disabled={!selectedReason}
              onClick={() => {
                setCancelModalVisible(false);
              }}
              className="flex-1 bg-[#F44848] text-white py-2 rounded hover:bg-red-600 disabled:opacity-50"
            >
              Confirm Cancellation
            </button>
          </div>
        </div>
      </Modal>
    </div>
  );
}
