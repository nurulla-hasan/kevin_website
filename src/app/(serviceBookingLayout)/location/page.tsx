'use client';

import { useState } from 'react';
import Link from 'next/link';
import { TbCurrentLocation } from 'react-icons/tb';
import { useAppDispatch, useAppSelector } from '@/redux/hooks';
import {
  selectLocation,
  setLocation,
} from '@/redux/features/project/projectSlice';

const LocationPage = () => {
  const dispatch = useAppDispatch();
  const storedLocation = useAppSelector(selectLocation);

  const [address, setAddress] = useState(storedLocation.address);
  const [apt, setApt] = useState(storedLocation.apt);

  const handleContinue = () => {
    dispatch(setLocation({ address, apt }));
  };

  return (
    <div className="max-w-4xl mx-auto p-4 sm:p-6 lg:p-8">
      <h1 className="text-2xl sm:text-3xl lg:text-4xl my-8 sm:my-12 font-bold text-foreground mb-6 leading-tight">
        Compare quotes from top-rated Handymen
      </h1>

      <div className="bg-card border border-border rounded-xl p-6 sm:p-8 space-y-3 shadow-lg">
        <h1 className="text-primary text-xl sm:text-2xl font-semibold">
          Enter Your Location
        </h1>
        <p className="text-sm border-b-2 border-primary pb-3 text-muted-foreground">
          Provide your address or location so we can match you with contractors
          in your area
        </p>

        {/* Address Input */}
        <div className="relative">
          <label className="font-semibold mb-1 block text-foreground">Project Location</label>
          <input
            value={address}
            onChange={e => setAddress(e.target.value)}
            className="w-full border border-border rounded-lg p-3 pr-10 focus:outline-none focus:ring-2 focus:ring-primary bg-background text-foreground placeholder:text-muted-foreground"
            placeholder="17 Mile Drive, Pebble Beach, CA, USA"
          />
          <TbCurrentLocation
            className="absolute right-3 top-[51px] transform -translate-y-1/2 text-foreground pointer-events-none"
            size={20}
          />
        </div>

        {/* Apt input */}
        <input
          value={apt}
          onChange={e => setApt(e.target.value)}
          className="w-full border border-border rounded-lg p-3 pr-10 focus:outline-none focus:ring-2 focus:ring-primary bg-background text-foreground placeholder:text-muted-foreground"
          placeholder="zip code"
        />

        <Link href="/chooseService" onClick={handleContinue}>
          <button
            disabled={!address || !apt}
            className="bg-primary disabled:opacity-50 disabled:cursor-not-allowed w-full hover:bg-primary/90 text-primary-foreground font-semibold px-8 py-3 rounded-lg text-lg transition-colors duration-200 shadow-lg my-6 sm:my-8"
          >
            Continue
          </button>
        </Link>
      </div>
    </div>
  );
};

export default LocationPage;
