'use client';

import { useState } from 'react';
import Image from 'next/image';
import { Modal, Radio, Button, Upload, Input, message } from 'antd';
import { HiFlag } from 'react-icons/hi2';
import { LockOutlined, UploadOutlined } from '@ant-design/icons';


import { RcFile } from 'antd/es/upload';
import { useGiveReportMutation } from '@/redux/features/contractor/contractorApi';
import Link from 'next/link';

const ProfDet = ({ contractorId, profileData }) => {
  const { TextArea } = Input;
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isSecondModalOpen, setIsSecondModalOpen] = useState(false);
  const [image, setImage] = useState<RcFile | null>(null);
  const [selectedReason, setSelectedReason] = useState<string>(""); // Store selected reason
  const [feedback, setFeedback] = useState<string>(""); // Store feedback data for the second modal
  const [postReport] = useGiveReportMutation();

  const reasons = [
    "It is inaccurate or incorrect",
    "It is not a real person",
    "It is a scam",
    "It is offensive",
    "It is something else",
  ];

  // Handle first modal continue
  const handleContinueFirstModal = () => {
    if (!selectedReason) {
      message.error("Please select a reason.");
      return;
    }
    setIsModalOpen(false);
    setIsSecondModalOpen(true);
  };

  // Handle second modal submit
  const handleContinueSecondModal = async () => {
    // Logging the data before submission
      reason: selectedReason,
      feedback,
      image,
    });

    const formData = new FormData();
    const modifiedData = {
      report: {
        reason: selectedReason,
        feedback,
      },
    };
    formData.append("data", JSON.stringify(modifiedData)); // Pass selected reason and feedback to the backend

    formData.append("image", image);


    // Log the FormData contents
    // formData.forEach((value, key) => {
    // });
    try {
      const res = await postReport({
        info: formData,
        id: contractorId,
      }).unwrap();

      if (res.success) {
        message.success(res?.message);
        setIsSecondModalOpen(false);
        setSelectedReason("");
        setFeedback("");
        setImage(null);
      } else {
        message.error(res?.message);
      }
    } catch (error) {
      message.error(error?.message);
    }
  };

  // Handle cancel modal
  const handleCancelAll = () => {
    setIsModalOpen(false);
    setIsSecondModalOpen(false);
  };

  // Handle file upload
  const handleFileChange = ({ fileList }) => {
    if (fileList.length > 0) {
      setImage(fileList[0].originFileObj as RcFile);
    } else {
      setImage(null);
    }
  };

  return (
    <div className="container mx-auto">
      {/* Profile Top Section */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center space-y-4 sm:space-y-0 space-x-0 sm:space-x-6 p-6">
        <div className="flex items-center gap-5">
          <div className="relative w-28 h-28 rounded-full overflow-hidden">
            <Image
              src={profileData?.image}
              alt="Profile"
              fill
              className="object-cover rounded-full"
            />
          </div>
          <div>
            <h2 className="text-lg font-semibold text-gray-900">
              {profileData?.firstName + " " + profileData?.lastName}
            </h2>
            <p className="text-gray-600">{profileData?.address}</p>
          </div>
          <Link href={"/quote"}>
            <button className="bg-blue-600 h-10 text-white text-sm px-3 py-0 rounded-xl transition">
              Request Quote
            </button>
          </Link>
        </div>
        {contractorId && (
          <div
            className="flex gap-3 border-[#F44848] border-b-2 cursor-pointer"
            onClick={() => setIsModalOpen(true)}
          >
            <HiFlag size={24} className="text-[#F44848]" />
            <p className="text-[#F44848]">Report Contractor</p>
          </div>
        )}
      </div>

      {/* About Section */}
      <div className="mb-8">
        <p className="text-[#0F161C] text-sm">{profileData?.bio}</p>
      </div>

      {/* First Modal */}
      <Modal
        open={isModalOpen}
        onCancel={handleCancelAll}
        footer={null}
        centered
        width={450}
      >
        <div className="p-5">
          <h2 className="text-3xl font-semibold mb-4 border-b-2 border-black py-3">
            Report This Contractor
          </h2>
          <div className="mb-2 font-medium text-base text-[#0F161C]">
            Why are you reporting the Contractor?
          </div>
          <div className="text-gray-500 text-sm mb-5 flex items-center gap-2">
            <LockOutlined /> This won&apos;t be shared with Contractor.
          </div>

          {/* Radio Group for reasons */}
          <Radio.Group
            value={selectedReason}
            onChange={(e) => setSelectedReason(e.target.value)} // Update selected reason
            className="custom-radio-group space-y-4 flex flex-col sm:w-[350px]"
          >
            {reasons.map((r) => (
              <Radio key={r} value={r}>
                {r}
              </Radio>
            ))}
          </Radio.Group>

          <div className="flex justify-between mt-8">
            <Button
              onClick={handleCancelAll}
              className="w-1/2 mr-2 border border-gray-300 text-gray-700"
            >
              Cancel
            </Button>
            <Button
              type="primary"
              onClick={handleContinueFirstModal}
              className="w-1/2 ml-2 bg-blue-600 hover:bg-blue-700"
              disabled={!selectedReason} // Button will be enabled only when a reason is selected
            >
              Continue
            </Button>
          </div>
        </div>
      </Modal>

      {/* Second Modal */}
      <Modal
        open={isSecondModalOpen}
        onCancel={handleCancelAll}
        footer={null}
        centered
        width={500}
      >
        <div className="p-5">
          <h2 className="text-2xl font-bold mb-6 border-b-2 border-black pb-3">
            Report This Contractor
          </h2>
          <div className="mb-4">
            <p className="text-lg font-medium">
              Why are you reporting the Contractor?
            </p>
            <p className="text-sm text-gray-600 mt-2">
              We want to hear what you think so we can do better. We may not be
              able to respond to every piece of feedback individually.
            </p>
            <p className="text-sm text-gray-600 mt-1">
              If you have a question or need help resolving an issue, search our
              Help Center.
            </p>
          </div>

          {/* Feedback Textarea */}
          <div className="mb-4">
            <label className="font-medium block mb-1">Feedback</label>
            <TextArea
              rows={4}
              placeholder="Describe your issue or question"
              value={feedback}
              onChange={(e) => setFeedback(e.target.value)} // Update feedback state
            />
          </div>

          {/* File Upload */}
          <div className="mb-6">
            <label className="font-medium block mb-2">Attach File</label>
            <Upload
              beforeUpload={() => false}
              showUploadList={true}
              onChange={handleFileChange}
            >
              <Button icon={<UploadOutlined />}>Choose File</Button>
            </Upload>
            {!image && (
              <span className="ml-3 text-sm text-red-500">No file chosen</span>
            )}
          </div>

          <div className="flex justify-between">
            <Button
              onClick={handleCancelAll}
              className="w-1/2 mr-2 border border-gray-300 text-gray-700"
            >
              Cancel
            </Button>
            <Button
              type="primary"
              onClick={handleContinueSecondModal} // Handle data submission
              className="w-1/2 ml-2 bg-blue-600 hover:bg-blue-700"
              disabled={!image} // Ensure a file is chosen before submitting
            >
              Send Report
            </Button>
          </div>
        </div>
      </Modal>
    </div>
  );
};

export default ProfDet;
