'use client';

import { FiDownload } from 'react-icons/fi';
import { IoIosArrowDown } from 'react-icons/io';

const transactions = [
  {
    id: 1,
    title: 'Furniture Assembly in Laximbur, TX',
    user: 'Ellie Smith',
    date: 'May 27, 2025',
    amount: '$133.92',
    status: 'Pending',
    statusColor: 'bg-red-500',
  },
  {
    id: 2,
    title: 'Furniture Assembly in Laximbur, TX',
    user: 'Ellie Smith',
    date: 'May 27, 2025',
    amount: '$144',
    status: 'Sent',
    statusColor: 'bg-green-500',
  },
];

import jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable';

const downloadHistory = () => {
  const doc = new jsPDF();

  // Title
  doc.setFontSize(18);
  doc.text('Transaction History', 14, 22);

  // Table headers and data
  const headers = [['Title', 'User', 'Date', 'Amount', 'Status']];
  const data = transactions.map(txn => [
    txn.title,
    txn.user,
    txn.date,
    txn.amount,
    txn.status,
  ]);

  autoTable(doc, {
    startY: 30,
    head: headers,
    body: data,
    theme: 'striped',
    headStyles: { fillColor: [0, 102, 204] }, // blue header
    styles: { fontSize: 10 },
  });

  // Save the file
  doc.save('transaction-history.pdf');
};

const TransactionHistory = () => {
  return (
    <div className="max-w-4xl min-h-screen mx-auto px-4 py-8 bg-card border border-border">
      <div className="flex justify-between items-center border-b border-border pb-4 mb-4">
        <h1 className="text-2xl font-semibold text-foreground mb-4">
          Transaction History
        </h1>

        {transactions.length > 0 && (
          <button
            onClick={downloadHistory}
            className="text-sm text-primary hover:underline flex items-center"
          >
            <FiDownload className="mr-1" />
            Download Transaction History
          </button>
        )}
      </div>

      {transactions.length === 0 ? (
        <div className="mb-2 max-w-xl mx-auto">
          <p className="text-xs text-muted-foreground mt-1">
            Looks like you haven&apos;t made any transactions yet. Get started!
          </p>
        </div>
      ) : (
        <div className="space-y-4">
          {transactions.map(txn => (
            <div
              key={txn.id}
              className="border border-border rounded-md p-4 flex flex-col md:flex-row md:justify-between md:items-center"
            >
              <div className="space-y-1">
                <p className="font-semibold text-foreground">{txn.title}</p>
                <p className="text-sm text-muted-foreground">with {txn.user}</p>
                <p className="text-sm text-muted-foreground">{txn.date}</p>
              </div>

              <div className="flex flex-col gap-3 items-center justify-between md:justify-end mt-4 md:mt-0 md:space-x-4 w-full md:w-auto">
                <div className="flex items-center space-x-1">
                  <p className="text-base font-semibold text-foreground">
                    {txn.amount}
                  </p>
                  <IoIosArrowDown className="text-muted-foreground" />
                </div>
                <span
                  className={`text-primary-foreground text-sm px-3 py-1 rounded-md ${txn.statusColor}`}
                >
                  {txn.status}
                </span>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default TransactionHistory;
