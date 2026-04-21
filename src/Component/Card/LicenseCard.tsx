import { MdPrivacyTip } from 'react-icons/md';

export default function LicenseCard({ license }) {

  const isVerified = license?.licenseStatus === "approved";

  return (
    <div className="w-full max-w-md mx-auto">
      <div className="bg-white border border-gray-200 rounded-xl p-6 shadow-lg hover:shadow-2xl transition-shadow duration-300">
        
        {/* Header Section */}
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-blue-100 rounded-full">
              <MdPrivacyTip size={24} className="text-blue-600" />
            </div>
            <span className="text-lg font-semibold text-gray-900">
              {license.title}
            </span>
          </div>

          {/* Status Badge */}
          <div
            className={`px-3 py-1 rounded-full text-sm font-semibold transition-colors duration-200 ${
              isVerified
                ? "bg-green-100 text-green-800"
                : "bg-red-100 text-red-800"
            }`}
          >
            {isVerified ? "Verified" : "Contractor Not Verified"}
          </div>
        </div>

        {/* Optional Details Section */}
        <div className="text-gray-700 space-y-2">
          {license.details && (
            <p className="text-sm">{license.details}</p>
          )}
          {license.categoryName && (
            <p className="text-sm">
              <span className="font-medium">Category:</span>{" "}
              {license.categoryName.join(", ")}
            </p>
          )}
        </div>
      </div>
    </div>
  );
}
