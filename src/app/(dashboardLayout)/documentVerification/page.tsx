"use client";

import Image from "next/image";
import { useState } from "react";
import { FiPlus, FiChevronDown } from "react-icons/fi";
import license from "@/assests/Licenses 1.png";
import { useRouter } from "next/navigation";
import { useVerifyDocMutation } from "@/redux/features/contractor/contractorApi";
import { message } from "antd";

export default function DocumentVerification() {
  const [selectedDocumentType, setSelectedDocumentType] =
    useState("Plumbing Licenses");
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [frontLicense, setFrontLicense] = useState(null);
  const [backLicense, setBackLicense] = useState(null);
  const router = useRouter();
  const documentTypes = [
     
    "Plumbing Licenses",
    "Electrical Licenses",
    "HVAC Licenses",
    "General Contractor License",
    "Insurance Certificate",
  ];
  const [verifyDoc] = useVerifyDocMutation();

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Prepare the FormData object for the request
    const formData = new FormData();
if(!selectedDocumentType){
message.warning('please Select a Document type')
return
}
   const documentData = { documentType: selectedDocumentType };
    formData.append('data', JSON.stringify(documentData));  // Append object as string

    // Append the front and back licenses
    if (frontLicense) {
      formData.append("frontLicense", frontLicense);
    }

    if (backLicense) {
      formData.append("backLicense", backLicense);
    }
  // Log the FormData contents
    // formData.forEach((value, key) => {
    // });
    try {
      // Send the FormData to the backend API using the mutation
      const res = await verifyDoc(formData).unwrap();

      if (res.success) {
        message.success(res?.message);
        // Redirect or further actions (optional)
        router.push('/doneVerification');
      } else {
        message.error(res?.message);
      }
    } catch (error) {
       console.error('Error:', error); 
      message.error(
        error?.data?.message
      );
       if (error?.data?.message === 'Document verification already exists for this contractor') {


    router.push('/doneVerification'); 
  }
    }
  };

  const handleFrontUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      setFrontLicense(file);
    }
  };

  const handleBackUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      setBackLicense(file);
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 lg:py-12 bg-background">
      <div className="">
        {/* Left Column - Form */}
        <div className="bg-card border border-border rounded-lg p-6 sm:p-8">
          {/* Form Title and Description */}
          <div className="mb-8 border-b border-border pb-3">
            <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-foreground mb-4">
              Verify Your License/Insurance
            </h1>
            <p className="text-muted-foreground text-base leading-relaxed">
              Ensure your credentials are verified for a trusted and
              professional presence on YourTradeSource.
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Document Type Dropdown */}
            <label className="block text-sm font-medium text-foreground mb-3">
              Document Type
            </label>
            <div className="flex justify-between gap-8">
              <div className="relative">
                <button
                  type="button"
                  onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                  className="w-full px-4 py-3 border border-border rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent outline-none transition-all text-left bg-background text-foreground flex items-center justify-between"
                >
                  <span className="text-foreground">{selectedDocumentType}</span>
                  <FiChevronDown
                    className={`w-5 h-5 text-muted-foreground transition-transform ${
                      isDropdownOpen ? "rotate-180" : ""
                    }`}
                  />
                </button>

                {isDropdownOpen && (
                  <div className="absolute z-10 w-full mt-1 bg-card border border-border rounded-lg shadow-lg">
                    {documentTypes.map((type) => (
                      <button
                        key={type}
                        type="button"
                        onClick={() => {
                          setSelectedDocumentType(type);
                          setIsDropdownOpen(false);
                        }}
                        className="w-full px-4 py-3 text-left hover:bg-muted first:rounded-t-lg last:rounded-b-lg transition-colors text-foreground"
                      >
                        {type}
                      </button>
                    ))}
                  </div>
                )}
                {/* Front of License Upload */}
                <div>
                  <label className="block text-sm font-medium text-foreground mt-5">
                    Front of your license
                  </label>
                  <div className="border-2 w-[100%] mt-5 border-dashed border-border rounded-lg p-12 sm:p-16 text-center hover:border-muted-foreground transition-colors cursor-pointer">
                    <input
                      type="file"
                      accept="image/*,.pdf"
                      onChange={handleFrontUpload}
                      className="hidden"
                      id="front-upload"
                    />
                    <label htmlFor="front-upload" className="cursor-pointer">
                      <div className="flex w-full flex-col items-center">
                        <FiPlus className="w-8 h-8 text-muted-foreground mb-3" />
                        <span className="text-lg font-medium text-foreground">
                          {frontLicense ? frontLicense.name : "Upload"}
                        </span>
                      </div>
                    </label>
                  </div>
                </div>
              </div>

              {/* Right Column - Illustration */}
              <div className="flex items-center justify-center">
                <div className="w-full  ">
                  <Image
                    src={license}
                    alt="License verification illustration"
                    className=" w-80"
                    width={500}
                    height={500}
                  />
                </div>
              </div>
            </div>

            {/* Back of License Upload */}
            <div>
              <label className="block text-sm font-medium text-foreground mb-3">
                Back of your license
              </label>
              <div className="border-2 border-dashed border-border rounded-lg p-12 sm:p-16 text-center hover:border-muted-foreground transition-colors cursor-pointer">
                <input
                  type="file"
                  accept="image/*,.pdf"
                  onChange={handleBackUpload}
                  className="hidden"
                  id="back-upload"
                />
                <label htmlFor="back-upload" className="cursor-pointer">
                  <div className="flex flex-col items-center">
                    <FiPlus className="w-8 h-8 text-muted-foreground mb-3" />
                    <span className="text-lg font-medium text-foreground">
                      {backLicense ? backLicense.name : "Upload"}
                    </span>
                  </div>
                </label>
              </div>
            </div>

            {/* Terms and Conditions */}
            <div className="text-sm text-muted-foreground leading-relaxed">
              By clicking Submit for Review,you agree to the{" "}
              <a
                href="#"
                className="text-primary hover:text-primary/80 underline"
              >
                Terms of Service
              </a>{" "}
              and{" "}
              <a
                href="#"
                className="text-primary hover:text-primary/80 underline"
              >
                Privacy Policy
              </a>
              . And allow the platform to verify your license.
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              className="w-full bg-primary hover:bg-primary/90 text-primary-foreground font-semibold py-4 px-6 rounded-lg transition-colors duration-200 text-lg"
            >
              Submit for verification
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
