'use client';
import userImg from '@/assests/user.png';
import { useState } from 'react';
import {
  Calendar,
  MapPin,
  Building,
  CalendarDays,
  Clock,
  Plus,
} from 'lucide-react';
import Image from 'next/image';
import DatePicker from 'react-datepicker';
import TimePicker from 'react-time-picker';
import { Modal } from 'antd';
import 'react-datepicker/dist/react-datepicker.css';
import { dateOptions, timeOptions } from '@/constants';

export default function SendQuote() {
  const [selectedDate, setSelectedDate] = useState('Within a week');
  const [selectedTime, setSelectedTime] = useState('Evening (5 PM - 9 PM)');
  const [priceValue, setPriceValue] = useState(150);
  const [minPrice, setMinPrice] = useState(10);
  const [maxPrice, setMaxPrice] = useState(1000);
  const [showCalendar, setShowCalendar] = useState(false);
  const [showTimePicker, setShowTimePicker] = useState(false); // For showing time picker modal
  const [time, setTime] = useState('10:00'); // Default time value
  const [date, setDate] = useState(new Date());

  const handleDragOver = e => {
    e.preventDefault();
  };

  const handleDrop = e => {
    e.preventDefault();
  };

  const handleFileUpload = () => {
  };

  const handleDateChange = date => {
    setDate(date);
    setShowCalendar(false); // Hide the calendar after date selection
  };

  const handleTimeChange = newTime => {
    setTime(newTime);
    setShowTimePicker(false); // Hide the time picker after selection
  };

  const openTimePicker = () => {
    setShowTimePicker(true); // Show the modal for time picker
  };

  const closeTimePicker = () => {
    setShowTimePicker(false); // Close the modal
  };

  return (
    <div className="max-w-6xl mx-auto p-6 bg-white">
      {/* Header */}
      <div className="flex items-center justify-between mb-8 border-b pb-3">
        <h1 className="text-2xl font-semibold text-gray-900">Send A Quote</h1>
        <div className="flex items-center space-x-3">
          <Image
            src={userImg}
            alt="Ellie Smith"
            className="w-10 h-10 rounded-full object-cover"
          />
          <div>
            <div className="font-medium text-gray-900">Ellie Smith</div>
            <div className="text-sm text-gray-500">Omaha, NE</div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
        {/* Project Requirement */}
        <div>
          <h2 className="text-xl font-semibold text-gray-900 mb-6">
            Project Requirement
          </h2>

          <div className="mb-6">
            <h3 className="text-lg font-medium text-gray-900 mb-4">Cleaning</h3>
            <div className="space-y-3">
              <div className="flex items-center space-x-3 text-gray-700">
                <Calendar className="w-5 h-5" />
                <span>Apr 28, 12:00 PM</span>
              </div>
              <div className="flex items-center space-x-3 text-gray-700">
                <MapPin className="w-5 h-5" />
                <span>123 Main Street, New York, NY 10001</span>
              </div>
              <div className="flex items-center space-x-3 text-gray-700">
                <Building className="w-5 h-5" />
                <span>Apartment</span>
              </div>
            </div>
          </div>
        </div>

        {/* Price Details */}
        <div>
          <h3 className="text-lg font-semibold text-gray-900 mb-4">
            Price Details
          </h3>
          <div className="space-y-3">
            <div className="flex justify-between items-center">
              <span className="text-gray-700">Price Client offered</span>
              <span className="font-medium">$65/hr</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-gray-700">Trust & Support fee</span>
              <span className="font-medium">$5/hr</span>
            </div>
            <div className="flex justify-between items-center font-semibold">
              <span className="text-gray-900">Total Rate</span>
              <span>$60/hr</span>
            </div>
          </div>
        </div>
      </div>

      <hr className="border-gray-200 mb-8" />

      {/* Update Date */}
      <div className="mb-8">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-medium text-gray-900">Update Date</h3>
          <button
            onClick={() => setShowCalendar(!showCalendar)}
            className="flex items-center space-x-2 text-gray-600 hover:text-gray-800"
          >
            <CalendarDays className="w-4 h-4" />
            <span>Choose a date</span>
          </button>
        </div>
        {showCalendar && (
          <DatePicker
            selected={date}
            onChange={handleDateChange}
            inline
            className="p-4 border-2 border-gray-200 rounded-lg"
          />
        )}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
          {dateOptions.map(option => (
            <button
              key={option.id}
              onClick={() => setSelectedDate(option.value)}
              className={`px-6 py-2 rounded-full border transition-colors ${
                selectedDate === option.value
                  ? 'border-blue-500 bg-blue-50 text-blue-700'
                  : 'border-gray-300 text-gray-700 hover:border-gray-400'
              }`}
            >
              {option.value}
            </button>
          ))}
        </div>
      </div>

      {/* Update Time */}
      <div className="mb-8">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-medium text-gray-900">Update Time</h3>
          <button
            onClick={openTimePicker} // Open the time picker modal
            className="flex items-center space-x-2 text-gray-600 hover:text-gray-800"
          >
            <Clock className="w-4 h-4" />
            <span>Pick a time</span>
          </button>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
          {timeOptions.map(option => (
            <button
              key={option}
              onClick={() => setSelectedTime(option)}
              className={`px-6 py-2 rounded-full border transition-colors ${
                selectedTime === option
                  ? 'border-blue-500 bg-blue-50 text-blue-700'
                  : 'border-gray-300 text-gray-700 hover:border-gray-400'
              }`}
            >
              {option}
            </button>
          ))}
        </div>
      </div>

      {/* Update Pricing */}
      <div className="mb-8">
        <h3 className="text-lg font-medium text-gray-900 mb-4">
          Update Pricing
        </h3>
        <div className="mb-4">
          <div className="flex justify-end mb-2">
            <span className="text-lg font-semibold">${priceValue}</span>
          </div>
          <div className="relative">
            <input
              type="range"
              min={minPrice}
              max={maxPrice}
              value={priceValue}
              onChange={e => setPriceValue(Number.parseInt(e.target.value))}
              className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"
              style={{
                background: `linear-gradient(to right, #3b82f6 0%, #3b82f6 ${
                  ((priceValue - minPrice) / (maxPrice - minPrice)) * 100
                }%, #e5e7eb ${
                  ((priceValue - minPrice) / (maxPrice - minPrice)) * 100
                }%, #e5e7eb 100%)`,
              }}
            />
          </div>
        </div>
        <div className="flex justify-between items-center">
          <div>
            <label className="block text-sm text-gray-600 mb-1">Minimum</label>
            <input
              type="number"
              value={minPrice}
              onChange={e => setMinPrice(Number.parseInt(e.target.value))}
              className="w-20 px-3 py-2 border border-gray-300 rounded-md text-sm"
            />
          </div>
          <div>
            <label className="block text-sm text-gray-600 mb-1">Maximum</label>
            <input
              type="number"
              value={maxPrice}
              onChange={e => setMaxPrice(Number.parseInt(e.target.value))}
              className="w-20 px-3 py-2 border border-gray-300 rounded-md text-sm"
            />
          </div>
        </div>
      </div>

      {/* Upload Quote */}
      <div className="mb-8">
        <h3 className="text-lg font-medium text-gray-900 mb-4">
          Upload a detailed Quote
        </h3>
        <div
          onDragOver={handleDragOver}
          onDrop={handleDrop}
          onClick={handleFileUpload}
          className="border-2 border-dashed border-gray-300 rounded-lg p-12 text-center cursor-pointer hover:border-gray-400 transition-colors bg-gray-50"
        >
          <div className="flex flex-col items-center">
            <div className="w-12 h-12 bg-blue-600 rounded-full flex items-center justify-center mb-4">
              <Plus className="w-6 h-6 text-white" />
            </div>
            <p className="text-gray-600">Drop photos here or click to upload</p>
          </div>
        </div>
      </div>

      {/* Action Buttons */}
      <div className="flex space-x-4">
        <button className="flex-1 border border-gray-300 text-gray-700 py-3 px-6 rounded-md font-medium hover:bg-gray-50 transition-colors">
          Send an updated Offer
        </button>
        <button className="flex-1 bg-blue-600 hover:bg-blue-700 text-white py-3 px-6 rounded-md font-medium transition-colors">
          Approve
        </button>
      </div>

      {/* Ant Design Modal for Time Picker */}
      <Modal
        title="Select Time"
        visible={showTimePicker}
        onCancel={closeTimePicker} // Close modal on cancel
        footer={null}
      >
        <TimePicker
          onChange={handleTimeChange}
          value={time}
          className="border-2 border-gray-200 rounded-lg p-3"
        />
      </Modal>
    </div>
  );
}
