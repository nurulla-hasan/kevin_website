import React from "react";

const NoItems = () => {
  return (
    <div className="flex flex-col items-center justify-center py-12 text-center bg-gray-50 rounded-lg shadow-inner">
      <div className="flex items-center justify-center w-12 h-12 rounded-full border border-gray-300 mb-4">
        <svg
          className="w-6 h-6 text-gray-400"
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={3}
            d="M12 4v16m8-8H4"
          />
        </svg>
      </div>
      <h2 className="text-lg font-semibold text-gray-700">No items found</h2>
      <p className="text-sm text-gray-500 mt-1">
        Try adjusting your search or check back later.
      </p>
    </div>
  );
};

export default NoItems;
