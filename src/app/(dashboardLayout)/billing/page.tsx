'use client';

import { Button } from 'antd';
import {
  FaCcVisa,
  FaCcMastercard,
  FaCcAmex,
  FaCreditCard,
} from 'react-icons/fa';

export default function BillingInfo() {
  return (
    <div className="bg-card border border-border min-h-screen rounded-md shadow-sm p-3">
      <h2 className="text-2xl font-semibold text-foreground mb-6">
        Billing Info
      </h2>
      {/* Divider */}
      <div className="border-b border-border mb-8"></div>
      <div className="mb-6">
        <h3 className="text-lg font-medium text-foreground mb-2">
          Payment Method
        </h3>

        {/* Card Logos */}
        <div className="flex items-center gap-4 mb-4">
          <FaCcVisa className="text-3xl text-blue-600" />
          <FaCcMastercard className="text-3xl text-red-500" />
          <FaCcAmex className="text-3xl text-blue-800" />
        </div>

        {/* Card Number Field */}
        <div className="relative mb-4">
          <input
            type="text"
            placeholder="Card number"
            className="w-full pl-10 pr-32 py-2 border border-border rounded-md placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary bg-background text-foreground"
          />
          <FaCreditCard className="absolute top-2.5 left-3 text-muted-foreground text-lg" />
          <button className="absolute right-2 top-1.5 bg-foreground text-background text-sm px-3 py-1 rounded-md">
            Autofill{' '}
            <span className="text-primary font-medium ml-1">link</span>
          </button>
        </div>

        {/* Name on Card Field */}
        <input
          type="text"
          placeholder="Name on Card"
          className="w-full px-4 py-2 border border-border rounded-md placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary bg-background text-foreground"
        />
      </div>

      {/* Action Buttons */}
      <div className="flex w-full justify-end gap-3 pt-4">
        <Button className="w-1/2">Cancel</Button>
        <Button type="primary" htmlType="submit" className="bg-primary hover:bg-primary/90 w-1/2">
          Update
        </Button>
      </div>
    </div>
  );
}
