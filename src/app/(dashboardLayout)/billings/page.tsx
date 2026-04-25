'use client';

import { useState } from 'react';
import { FileText } from 'lucide-react';
import { Button } from 'antd';
import {
  FaCcVisa,
  FaCcMastercard,
  FaCcAmex,
  FaCreditCard,
} from 'react-icons/fa';
export default function TransactionHistory() {
  const [activeTab, setActiveTab] = useState('Transactions');

  const tabs = ['Transactions'];

  const transactions = [
    {
      date: '01/15/25',
      transactionId: 'TID-12345',
      client: 'Ellie Smith',
      service: 'Furniture Assembly',
      location: 'Lawimbur, TX',
      amount: '$240',
      status: 'Completed',
      statusColor: 'text-green-600',
    },
    {
      date: '01/15/25',
      transactionId: 'TID-12345',
      client: 'Ellie Smith',
      service: 'Furniture Assembly',
      location: 'Lawimbur, TX',
      amount: '$190',
      status: 'Pending',
      statusColor: 'text-orange-500',
    },
    {
      date: '01/15/25',
      transactionId: 'TID-12345',
      client: 'Ellie Smith',
      service: 'Furniture Assembly',
      location: 'Lawimbur, TX',
      amount: '$240',
      status: 'Pending',
      statusColor: 'text-orange-500',
    },
    {
      date: '01/15/25',
      transactionId: 'TID-12345',
      client: 'Ellie Smith',
      service: 'Furniture Assembly',
      location: 'Lawimbur, TX',
      amount: '$240',
      status: 'Completed',
      statusColor: 'text-green-600',
    },
  ];

  return (
    <div className="max-w-7xl mx-auto p-6 bg-card border border-border min-h-screen">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-2xl font-semibold text-foreground mb-4">
          Transaction History
        </h1>
        <hr className="border-border" />
      </div>

      {/* Tabs */}
      <div className="flex space-x-4 mb-8">
        {tabs.map(tab => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={`px-6 py-2 rounded-md font-medium transition-colors ${
              activeTab === tab
                ? 'bg-primary text-primary-foreground'
                : 'border border-border text-foreground hover:bg-muted'
            }`}
          >
            {tab}
          </button>
        ))}
      </div>

      {/* Transaction Table */}
      {activeTab === 'Transactions' && (
        <div className="overflow-x-auto">
          <table className="w-full">
            {/* Table Header */}
            <thead>
              <tr className="bg-muted">
                <th className="px-6 py-4 text-left text-sm font-medium text-foreground">
                  Date
                </th>
                <th className="px-6 py-4 text-left text-sm font-medium text-foreground">
                  Transaction ID
                </th>
                <th className="px-6 py-4 text-left text-sm font-medium text-foreground">
                  Client
                </th>
                <th className="px-6 py-4 text-left text-sm font-medium text-foreground">
                  Amount
                </th>
                <th className="px-6 py-4 text-left text-sm font-medium text-foreground">
                  Status
                </th>
                <th className="px-6 py-4 text-left text-sm font-medium text-foreground">
                  Actions
                </th>
              </tr>
            </thead>
            {/* Table Body */}
            <tbody className="divide-y divide-border">
              {transactions.map((transaction, index) => (
                <tr key={index} className="hover:bg-muted">
                  <td className="px-6 py-4 text-sm text-foreground">
                    {transaction.date}
                  </td>
                  <td className="px-6 py-4 text-sm text-foreground">
                    {transaction.transactionId}
                  </td>
                  <td className="px-6 py-4">
                    <div>
                      <div className="text-sm font-medium text-foreground">
                        {transaction.client}
                      </div>
                      <div className="text-sm text-muted-foreground">
                        {transaction.service},{' '}
                        <span className="text-muted-foreground">
                          {transaction.location}
                        </span>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 text-sm font-medium text-foreground">
                    {transaction.amount}
                  </td>
                  <td className="px-6 py-4">
                    <span
                      className={`text-sm font-medium ${transaction.statusColor}`}
                    >
                      {transaction.status}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <button className="flex items-center space-x-2 text-foreground hover:text-primary">
                      <span className="text-sm">View Receipt</span>
                      <FileText className="w-4 h-4" />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {/* Placeholder content for other tabs */}
      {activeTab === 'Balances' && (
        <div className="">
          <div className="mb-2">
            <p className="font-semibold text-lg text-foreground">
              Available balance: <span className="text-foreground font-bold">$0</span>
            </p>
            <p className="text-xs text-muted-foreground mt-1">
              *Account balances automatically update when a task is completed.
            </p>
          </div>

          <input
            type="text"
            placeholder="Enter a redemption code here"
            className="w-full border border-border rounded-md px-3 py-2 mt-4 mb-4 text-sm focus:outline-none focus:ring-2 focus:ring-primary bg-background text-foreground placeholder:text-muted-foreground"
          />

          <button className="w-full bg-primary text-primary-foreground py-2 rounded-md hover:bg-primary/90 transition text-sm font-medium">
            Apply code
          </button>
        </div>
      )}

      {activeTab === 'Payment Methods' && (
        <div className="bg-card border border-border min-h-screen rounded-md shadow-sm p-3">
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
            <Button
              type="primary"
              htmlType="submit"
              className="bg-primary hover:bg-primary/90 w-1/2"
            >
              Update
            </Button>
          </div>
        </div>
      )}
    </div>
  );
}
