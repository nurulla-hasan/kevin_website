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
    <div className="max-w-7xl mx-auto bg-muted p-6 rounded-lg border border-border">
      {/* Header Section */}
      <div className="flex flex-col md:flex-row gap-4 w-full">
        <div className="flex flex-col items-center md:w-[15%] w-full">
          <Image
            src={cons1}
            alt="Ellie Smith"
            width={100}
            height={100}
            className="rounded-full object-cover w-20 h-20 border-2 border-border"
          />
          <button className="px-3 mt-3 py-1 border border-border  rounded-lg text-foreground hover:bg-muted-foreground/10 transition text-sm">
            View Profile
          </button>
        </div>

        <div className="flex flex-col md:flex-row justify-between items-start w-full gap-4">
          <div className="w-full md:w-[70%]">
            <h1 className="text-xl md:text-2xl font-bold text-foreground">
              You&apos;ve Booked Ellie Smith
            </h1>
            <p className="text-muted-foreground mt-2 text-sm md:text-base">
              Giovanni C. is currently offline and will reach out once available
              in the app. You will be notified as soon as they respond.
            </p>
          </div>

          <div className="w-full md:w-auto">
            <button className="w-full md:w-auto px-4 py-2 bg-primary text-primary-foreground rounded hover:bg-primary/90 transition text-sm">
              Chat Contractor
            </button>
          </div>
        </div>
      </div>

      <hr className="border-border my-6" />

      {/* Cleaning Details */}
      <div className="mb-6">
        <h2 className="text-xl font-bold text-foreground mb-4">Cleaning</h2>
        <div className="space-y-3">
          <div className="flex items-center gap-3 text-foreground">
            <FaCalendarAlt className="text-muted-foreground" />
            <span>Apr 28, 12:00 PM</span>
          </div>
          <div className="flex items-center gap-3 text-foreground">
            <FaMapMarkerAlt className="text-muted-foreground" />
            <span>123 Main Street, New York, NY 10001</span>
          </div>
          <div className="flex items-center gap-3 text-foreground">
            <FaClock className="text-muted-foreground" />
            <span>Apr 28, 12:00 PM</span>
          </div>
        </div>
      </div>

      <hr className="border-border my-6" />

      {/* Price Details */}
      <div className="mb-6">
        <h2 className="text-xl font-bold text-foreground mb-4">Price Details</h2>
        <div className="space-y-3">
          <div className="flex justify-between">
            <span className="text-foreground">Hourly Rate</span>
            <span className="font-medium text-foreground">$65/hr</span>
          </div>
          <div className="flex justify-between">
            <span className="text-foreground">Trust & Support fee</span>
            <span className="font-medium text-foreground">$10/hr</span>
          </div>
          <div className="flex justify-between pt-2 border-border">
            <span className="text-lg font-bold text-foreground">Total Rate</span>
            <span className="text-lg font-bold text-foreground">$75/Hr</span>
          </div>
        </div>
      </div>

      <hr className="border-border my-6" />

      {/* Project Details */}
      <div className="mb-6">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-bold text-foreground">Project Details</h2>
          <button className="text-primary hover:underline text-sm">
            Edit
          </button>
        </div>
        <div>
          <p className="font-medium text-foreground mb-2">
            To-Do List for Cleaner
          </p>
          <ul className="space-y-2 text-foreground">
            {[
              'Clean kitchen (wipe surfaces, clean sink, stovetop, and appliances)',
              'Clean bathroom(s) (toilet, sink, shower/bath, mirrors)',
              'Vacuum and mop all floors',
              'Dust all surfaces and furniture',
              'Empty trash bins',
              'Disinfect high-touch areas (doorknobs, switches, remotes, etc.)',
            ].map((task, i) => (
              <li className="flex items-start" key={i}>
                <span className="text-muted-foreground mr-2">•</span>
                <span>{task}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>

      {/* Add Note Section */}
      <button
        onClick={showModal}
        className="w-full border border-border rounded py-3 px-4 text-muted-foreground flex items-center justify-center gap-2 hover:bg-muted transition mb-6"
      >
        <FaPlus className="text-foreground" size={14} />
        <span className="text-foreground">
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
        <div className="max-w-xl mx-auto mt-2 p-4 bg-card border border-border rounded-lg shadow">
          <h2 className="text-lg font-semibold text-foreground mb-4">Add a Note</h2>

          <div className="mb-4">
            <label
              htmlFor="note"
              className="block text-sm font-medium text-foreground mb-1"
            >
              Note
            </label>
            <input
              type="text"
              id="note"
              placeholder="I Would Like you to clean the window more carefully"
              className="w-full border border-border rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary bg-background text-foreground placeholder:text-muted-foreground"
            />
          </div>

          <div className="mb-4">
            <label
              htmlFor="coverImage"
              className="block text-sm font-medium text-foreground mb-1"
            >
              Upload Cover Image
            </label>
            <div className="flex items-center gap-2">
              <input
                type="file"
                id="coverImage"
                accept="image/jpeg, image/png"
                className="block text-sm text-muted-foreground file:mr-4 file:py-2 file:px-4 file:rounded file:border-0 file:text-sm file:font-semibold file:bg-muted file:text-foreground hover:file:bg-muted-foreground/10"
              />
              <span className="text-xs text-muted-foreground">
                Accepted formats: JPG, PNG
              </span>
            </div>
          </div>

          <div className="mb-6">
            <label
              htmlFor="details"
              className="block text-sm font-medium text-foreground mb-1"
            >
              Details
            </label>
            <textarea
              id="details"
              rows={4}
              className="w-full border border-border rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary bg-background text-foreground"
            ></textarea>
          </div>

          <div className="flex justify-between">
            <button
              type="button"
              className="px-4 py-2 border border-border text-foreground rounded-md hover:bg-muted"
              onClick={handleCancel}
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-6 py-2 bg-primary text-primary-foreground text-sm font-medium rounded-md hover:bg-primary/90"
            >
              Add Note
            </button>
          </div>
        </div>
      </Modal>

      {/* Progress Section */}
      <div className="mb-8">
        <h2 className="text-xl font-bold text-foreground mb-6">Progress</h2>
        <div className="relative">
          <div className="h-1 bg-muted-foreground/20 absolute top-4 left-2 right-0 z-0">
            <div className="h-full bg-primary w-[35%]"></div>
          </div>

          <div className="flex justify-between relative z-10">
            {['Booked', 'On the way', 'Started', 'Done'].map((label, index) => (
              <div className="flex flex-col items-center" key={label}>
                <div
                  className={`w-8 h-8 rounded-full flex items-center justify-center mb-2 ${
                    index === 0
                      ? 'bg-primary/10 border-2 border-primary'
                      : 'bg-background border-2 border-border'
                  }`}
                >
                  {index === 0 ? (
                    <FaCheck className="text-primary" />
                  ) : (
                    <div className="w-2 h-2 rounded-full bg-muted-foreground"></div>
                  )}
                </div>
                <span className="text-sm text-foreground">{label}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Action Buttons */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <button
          onClick={() => setCancelModalVisible(true)}
          className="w-full py-3 bg-destructive text-destructive-foreground rounded hover:bg-destructive/90 transition"
        >
          Cancel Project
        </button>
        <button className="w-full py-3 bg-primary text-primary-foreground rounded hover:bg-primary/90 transition">
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
          <h2 className="text-xl font-bold text-center mb-6 text-foreground">
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
                className={`w-full border border-border rounded-md px-4 py-2 text-sm text-left ${
                  selectedReason === reason
                    ? 'bg-primary/10 border-primary text-primary'
                    : 'hover:bg-muted text-foreground'
                }`}
              >
                {reason}
              </button>
            ))}
          </div>

          <div className="mt-6 flex justify-between gap-4">
            <button
              onClick={() => setCancelModalVisible(false)}
              className="flex-1 border border-border text-foreground py-2 rounded hover:bg-muted"
            >
              I don’t want to Cancel
            </button>
            <button
              disabled={!selectedReason}
              onClick={() => {
                setCancelModalVisible(false);
              }}
              className="flex-1 bg-destructive text-destructive-foreground py-2 rounded hover:bg-destructive/90 disabled:opacity-50"
            >
              Confirm Cancellation
            </button>
          </div>
        </div>
      </Modal>
    </div>
  );
}
