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
    <div className="max-w-6xl mx-auto p-6 bg-card border border-border rounded-xl">
      {/* Header */}
      <div className="flex items-center justify-between mb-8 border-b border-border pb-3">
        <h1 className="text-2xl font-semibold text-foreground">Send A Quote</h1>
        <div className="flex items-center space-x-3">
          <Image
            src={userImg}
            alt="Ellie Smith"
            className="w-10 h-10 rounded-full object-cover"
          />
          <div>
            <div className="font-medium text-foreground">Ellie Smith</div>
            <div className="text-sm text-muted-foreground">Omaha, NE</div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
        {/* Project Requirement */}
        <div>
          <h2 className="text-xl font-semibold text-foreground mb-6">
            Project Requirement
          </h2>

          <div className="mb-6">
            <h3 className="text-lg font-medium text-foreground mb-4">Cleaning</h3>
            <div className="space-y-3">
              <div className="flex items-center space-x-3 text-muted-foreground">
                <Calendar className="w-5 h-5" />
                <span className="text-foreground">Apr 28, 12:00 PM</span>
              </div>
              <div className="flex items-center space-x-3 text-muted-foreground">
                <MapPin className="w-5 h-5" />
                <span className="text-foreground">123 Main Street, New York, NY 10001</span>
              </div>
              <div className="flex items-center space-x-3 text-muted-foreground">
                <Building className="w-5 h-5" />
                <span className="text-foreground">Apartment</span>
              </div>
            </div>
          </div>
        </div>

        {/* Price Details */}
        <div>
          <h3 className="text-lg font-semibold text-foreground mb-4">
            Price Details
          </h3>
          <div className="space-y-3">
            <div className="flex justify-between items-center">
              <span className="text-muted-foreground">Price Client offered</span>
              <span className="font-medium text-foreground">$65/hr</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-muted-foreground">Trust & Support fee</span>
              <span className="font-medium text-foreground">$5/hr</span>
            </div>
            <div className="flex justify-between items-center font-semibold">
              <span className="text-foreground">Total Rate</span>
              <span className="text-foreground">$60/hr</span>
            </div>
          </div>
        </div>
      </div>

      <hr className="border-border mb-8" />

      {/* Update Date */}
      <div className="mb-8">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-medium text-foreground">Update Date</h3>
          <button
            onClick={() => setShowCalendar(!showCalendar)}
            className="flex items-center space-x-2 text-muted-foreground hover:text-foreground"
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
            className="p-4 border-2 border-border rounded-lg bg-background"
          />
        )}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
          {dateOptions.map(option => (
            <button
              key={option.id}
              onClick={() => setSelectedDate(option.value)}
              className={`px-6 py-2 rounded-full border transition-colors ${
                selectedDate === option.value
                  ? 'border-primary bg-primary/10 text-primary'
                  : 'border-border text-foreground hover:border-border'
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
          <h3 className="text-lg font-medium text-foreground">Update Time</h3>
          <button
            onClick={openTimePicker} // Open the time picker modal
            className="flex items-center space-x-2 text-muted-foreground hover:text-foreground"
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
                  ? 'border-primary bg-primary/10 text-primary'
                  : 'border-border text-foreground hover:border-border'
              }`}
            >
              {option}
            </button>
          ))}
        </div>
      </div>

      {/* Update Pricing */}
      <div className="mb-8">
        <h3 className="text-lg font-medium text-foreground mb-4">
          Update Pricing
        </h3>
        <div className="mb-4">
          <div className="flex justify-end mb-2">
            <span className="text-lg font-semibold text-foreground">${priceValue}</span>
          </div>
          <div className="relative">
            <input
              type="range"
              min={minPrice}
              max={maxPrice}
              value={priceValue}
              onChange={e => setPriceValue(Number.parseInt(e.target.value))}
              className="w-full h-2 bg-muted rounded-lg appearance-none cursor-pointer accent-primary"
              style={{
                background: `linear-gradient(to right, hsl(var(--primary)) 0%, hsl(var(--primary)) ${
                  ((priceValue - minPrice) / (maxPrice - minPrice)) * 100
                }%, hsl(var(--muted)) ${
                  ((priceValue - minPrice) / (maxPrice - minPrice)) * 100
                }%, hsl(var(--muted)) 100%)`,
              }}
            />
          </div>
        </div>
        <div className="flex justify-between items-center">
          <div>
            <label className="block text-sm text-muted-foreground mb-1">Minimum</label>
            <input
              type="number"
              value={minPrice}
              onChange={e => setMinPrice(Number.parseInt(e.target.value))}
              className="w-20 px-3 py-2 border border-border rounded-md text-sm bg-background text-foreground"
            />
          </div>
          <div>
            <label className="block text-sm text-muted-foreground mb-1">Maximum</label>
            <input
              type="number"
              value={maxPrice}
              onChange={e => setMaxPrice(Number.parseInt(e.target.value))}
              className="w-20 px-3 py-2 border border-border rounded-md text-sm bg-background text-foreground"
            />
          </div>
        </div>
      </div>

      {/* Upload Quote */}
      <div className="mb-8">
        <h3 className="text-lg font-medium text-foreground mb-4">
          Upload a detailed Quote
        </h3>
        <div
          onDragOver={handleDragOver}
          onDrop={handleDrop}
          onClick={handleFileUpload}
          className="border-2 border-dashed border-border rounded-lg p-12 text-center cursor-pointer hover:border-border transition-colors bg-muted/30"
        >
          <div className="flex flex-col items-center">
            <div className="w-12 h-12 bg-primary rounded-full flex items-center justify-center mb-4">
              <Plus className="w-6 h-6 text-primary-foreground" />
            </div>
            <p className="text-muted-foreground">Drop photos here or click to upload</p>
          </div>
        </div>
      </div>

      {/* Action Buttons */}
      <div className="flex space-x-4">
        <button className="flex-1 border border-border text-foreground py-3 px-6 rounded-md font-medium hover:bg-muted transition-colors">
          Send an updated Offer
        </button>
        <button className="flex-1 bg-primary hover:bg-primary/90 text-primary-foreground py-3 px-6 rounded-md font-medium transition-colors">
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
          className="border-2 border-border rounded-lg p-3 bg-background"
        />
      </Modal>
    </div>
  );
}
