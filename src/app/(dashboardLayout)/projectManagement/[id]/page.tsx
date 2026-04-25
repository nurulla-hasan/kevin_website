/* eslint-disable @typescript-eslint/no-explicit-any */
'use client';
import Image from 'next/image';
import {
  Calendar,
  MapPin,

  FileText,
  MoreHorizontal,

  Clock,
} from 'lucide-react';
import { useState } from 'react';
import { jsPDF } from 'jspdf'; // Import jsPDF
import Link from 'next/link';
// import { useSingleQuoteQuery } from '@/redux/features/contractor/contractorApi';
import { useParams } from 'next/navigation';
import { useGiveReviewMutation, useSingleOrderQuery, useUpdateProjectStatusMutation } from '@/redux/features/contractor/contractorApi';
import {  message, Modal, Form, Input, Rate, Button } from 'antd';

export default function ProjectDetails() {
  const {id}=useParams()
  // const {data:singleQuote}=useSingleQuoteQuery(id)
  const {data:singleOrder,refetch}=useSingleOrderQuery(id)
const [updateProjectStatus]=useUpdateProjectStatusMutation()
const [giveReview] = useGiveReviewMutation()
  const user = singleOrder?.data?.user
  const project = singleOrder?.data
  const [isReviewOpen, setIsReviewOpen] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [form] = Form.useForm();
  const openReviewModal = () => {
    form.resetFields();
    setIsReviewOpen(true);
  };
  const closeReviewModal = () => setIsReviewOpen(false);

  const [showDropdown, setShowDropdown] = useState(false);
  // const [file, setFile] = useState(null);

  // const handleFileUpload = event => {
  //   const selectedFile = event.target.files ? event.target.files[0] : null;
  //   setFile(selectedFile);
  //   setShowDropdown(false); 
  // };

  // const handleFileRemove = () => {
  //   setFile(null);
  //   setShowDropdown(false);
  // };

  // Generate PDF for detailed quote
const handleDownloadQuote = () => {
  // Dynamic Content for the PDF
  // const projectDetails = project?.projectDescription || "No description available";
  const projectLocation = project?.location || "No location provided";
  const servicesOffered = project?.serviceType || "No services selected";
  const priceOffered = project?.serviceId?.price ? `${project?.serviceId?.price}` : "$0";
  const timeDetails = project?.date
  const paymentStatus = project?.paymentStatus
  const projectStatus = project?.projectStatus

  // Create PDF
  const doc = new jsPDF();
  doc.setFont('helvetica');
  doc.setFontSize(12);

  // Adding Header
  doc.setTextColor(0, 0, 0); // Black color for text
  doc.setFontSize(16);
  doc.text('Project Details', 10, 20);

  doc.setTextColor(0, 102, 204); // Blue color for subheading


  // Table Headers and Data
  const tableColumn = ["Field", "Details"];
  const tableRows = [
    // ["Project Description", projectDetails],
    ["Date & Time", timeDetails],
    ["Address", projectLocation],
    ["Services Offered", servicesOffered],
    ["Trust & Support Fee", "$5/hr"],
    ["Total Rate", priceOffered],
    ["Payment Status", paymentStatus],
    ["Project Status", projectStatus],
  ];


  // Define Table Layout
  const tableStartX = 10;
  const tableStartY = 30;
  const tableWidth = 180;
  const columnWidth = [tableWidth * 0.3, tableWidth * 0.7];
  const rowHeight = 12; // Adjusted for better spacing
  
  // Draw table header
  doc.setFillColor(0, 102, 204); // Blue header background
  doc.rect(tableStartX, tableStartY, tableWidth, rowHeight, 'F'); // Header background color
  
  // Write headers
  doc.setTextColor(255, 255, 255); // White text for header
  doc.text(tableColumn[0], tableStartX + 5, tableStartY + 7);
  doc.text(tableColumn[1], tableStartX + columnWidth[0] + 5, tableStartY + 7);

  // Draw table rows with alternating colors
  doc.setTextColor(0, 0, 0); // Black text for content
  let yOffset = tableStartY + rowHeight;

  tableRows.forEach((row, index) => {
    // Set alternating row colors
    if (index % 2 === 0) {
      doc.setFillColor(240, 240, 240); // Light grey for even rows
    } else {
      doc.setFillColor(255, 255, 255); // White for odd rows
    }
    
    // Draw row background
    doc.rect(tableStartX, yOffset, tableWidth, rowHeight, 'F');
    
    // Write the row data
    doc.setTextColor(0, 0, 0); // Black text for content
    doc.text(row[0], tableStartX + 5, yOffset + 8);  // Position text in the center of the row
    doc.text(row[1], tableStartX + columnWidth[0] + 5, yOffset + 8); // Position text in the center
    
    // Increment yOffset for the next row
    yOffset += rowHeight;
  });

  // Adding borders for the table
  doc.setDrawColor(0, 0, 0); // Black color for border
  doc.rect(tableStartX, tableStartY, tableWidth, yOffset - tableStartY); // Outer border of the table
  
  // Saving the PDF
  doc.save('detailed-quote.pdf');
};
  // Submit review
  const onSubmitReview = async () => {



    try {
      const values = await form.validateFields(); // { rating, comment }
      setSubmitting(true);

   
      const payload = {
        userId: user?._id,         
        rating: values.rating,
        comment: values.comment?.trim() || '',
      };

      // Replace with your RTK mutation if you have one:
      // await addReview(payload).unwrap();
      const res = await giveReview(payload).unwrap()

if(res?.success){
    message.success(res?.message);
         setIsReviewOpen(false);
      refetch();
}
    
 
    } catch (err: any) {
    message.error(err?.data?.message)
    } finally {
      setSubmitting(false);
    }
  };
  const handleStatusChange = async (status) => {

    try {
     const res = await updateProjectStatus({ id, status }).unwrap(); // Assuming API is set up for status update
      if (res.success) {
        message.success(res?.message);
        refetch();
        setShowDropdown(false)
      } else {
        message.error(res?.message);
      }
    } catch (error) {
     message.error(error?.data?.message)
    }
  };

  return (
    <div className="max-w-4xl mx-auto p-6 bg-card border border-border min-h-screen">
      {/* Header */}
      <h1 className="text-2xl font-semibold text-foreground mb-8 border-b border-border pb-3">
        Project Details
      </h1>

      {/* Profile Section */}
      <div className="flex items-start justify-between mb-8 pb-6 border-b border-border">
        <div className="flex items-start space-x-4">
          <Image
            src={user?.image}
            alt="Ellie Smith"
            className="w-16 h-16 rounded-full object-cover"
            width={500}
            height={500}
          />
          <div>
            <h2 className="text-xl font-semibold text-foreground mb-2">
              {user?.firstName}
            </h2>
            <p className="text-muted-foreground max-w-md">
            <span className='font-semibold mr-1'>Project Details: </span>{project?.projectDescription}
            </p>
          </div>
        </div>
    
          <button  onClick={openReviewModal} className="bg-primary hover:bg-primary/90 text-primary-foreground px-1 py-2 rounded-md font-medium transition-colors">
            Review
          </button>
   
        <Link href={'/inbox'}>
          <button className="bg-primary hover:bg-primary/90 text-primary-foreground px-6 py-2 rounded-md font-medium transition-colors">
            Message
          </button>
        </Link>
      </div>

      {/* Main Content */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
        {/* Cleaning Details */}
        <div>
          <h3 className="text-lg font-semibold text-foreground mb-4">{project?.serviceType}</h3>
          <div className="space-y-3">
            <div className="flex items-center space-x-3 text-foreground">
              <Calendar className="w-5 h-5" />
              <span>{project?.date}</span>
            </div>
            <div className="flex items-center space-x-3 text-foreground">
              <Clock className="w-5 h-5" />
              <span>{project?.time}</span>
            </div>
            <div className="flex items-center space-x-3 text-foreground">
              <MapPin className="w-5 h-5" />
              <span>{project?.location}</span>
            </div>
            <div className="flex items-center space-x-3 text-foreground">
          
              <span>Payment Status:{project?.status}</span>
            </div>
            <div className="flex items-center space-x-3 text-foreground">
          
              <span>Project Status:{project?.projectStatus}</span>
            </div>
          </div>
          <div className="border-b border-border mt-3"></div>
        </div>

        {/* Price Details */}
        <div>
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold text-foreground">
              Price Details
            </h3>
            <div className="flex items-center space-x-2">
              <button
                onClick={handleDownloadQuote}
                className="flex items-center space-x-2 text-primary hover:text-primary/80 font-medium"
              >
                <FileText className="w-4 h-4" />
                <span>Detailed quote</span>
              </button>
              <button
                onClick={() => setShowDropdown(!showDropdown)}
                className="text-muted-foreground hover:text-foreground"
              >
                <MoreHorizontal className="w-5 h-5" />
              </button>
            </div>
          </div>

          <div className="space-y-3 mb-4">
            <div className="flex justify-between items-center">
              <span className="text-foreground">Price Client offered</span>
              <span className="font-medium text-foreground">{project?.serviceId?.price}/hr</span>
            </div>
            <div className="flex justify-between items-center ">
              <span className="text-foreground">Trust & Support fee</span>
              <span className="font-medium text-foreground">$5/hr</span>
            </div>
            <div className="flex justify-between items-center font-semibold">
              <span className="text-foreground">Total Rate</span>
           <span className="text-foreground">${(Number(project?.serviceId?.price) || 0) + 5}</span>
            </div>
            {/* <div className="border-b  border-black mt-[70px]"></div> */}
          </div>

          {/* Dropdown for Upload and Remove Buttons */}
          {/* {showDropdowns && (
            <div className="flex flex-col space-y-2 mb-4">
     
              <label className="flex items-center justify-center space-x-2 text-blue-600 hover:text-blue-700 py-2 px-4 border border-blue-200 rounded-md hover:bg-blue-50 transition-colors">
                <Upload className="w-4 h-4" />
                <input
                  type="file"
                  className="hidden"
                  onChange={handleFileUpload}
                />
                <span>Upload doc</span>
              </label>

              {file && (
                <button
                  onClick={handleFileRemove}
                  className="flex items-center justify-center space-x-2 text-red-600 hover:text-red-700 py-2 px-4 border border-red-200 rounded-md hover:bg-red-50 transition-colors"
                >
                  <X className="w-4 h-4" />
                  <span>Remove doc</span>
                </button>
              )}
            </div>
          )} */}
        </div>
      </div>

      {/* === Review Modal === */}

      <Modal
        title="Leave a Review"
        open={isReviewOpen}
        onCancel={closeReviewModal}
        footer={null}
        destroyOnClose
      >
        <Form
          form={form}
          layout="vertical"
          onFinish={onSubmitReview}
          initialValues={{ rating: 5, comment: '' }}
        >
          <Form.Item
            label="Rating"
            name="rating"
            rules={[{ required: true, message: 'Please select a rating' }]}
          >
            <Rate allowHalf />
          </Form.Item>

          <Form.Item
            label="Comment"
            name="comment"
            rules={[{ max: 500, message: 'Max 500 characters' }]}
          >
            <Input.TextArea rows={4} placeholder="Share your experience…" />
          </Form.Item>

          <div className="flex justify-end space-x-2">
            <Button onClick={closeReviewModal}>Cancel</Button>
            <Button
              type="primary"
              htmlType="submit"
              loading={submitting}
            >
              Submit
            </Button>
          </div>
        </Form>
      </Modal>
      {/* Action Buttons */}
      <div className="flex space-x-4">
        <button className="flex-1 bg-destructive hover:bg-destructive/90 text-destructive-foreground py-3 px-6 rounded-md font-medium transition-colors">
          Cancel
        </button>
     <div className="relative flex-1">
    <div>
            <button
            onClick={() => setShowDropdown(!showDropdown)}
            className="bg-primary hover:bg-primary/90 text-primary-foreground py-3 px-6 rounded-md font-medium transition-colors w-full"
          >
            Update Offer
          </button>
    </div>

          {showDropdown && (
            <div className="absolute top-full left-0 bg-card border border-border mt-2 shadow-lg rounded-md w-full">
              <button
                onClick={() => handleStatusChange('booked')}
                className="block w-full text-left py-2 px-4 hover:bg-muted text-foreground"
              >
                Booked
              </button>
              <button
                onClick={() => handleStatusChange('onTheWay')}
                className="block w-full text-left py-2 px-4 hover:bg-muted text-foreground"
              >
                On the Way
              </button>
              <button
                onClick={() => handleStatusChange('started')}
                className="block w-full text-left py-2 px-4 hover:bg-muted text-foreground"
              >
                Started
              </button>
              <button
                onClick={() => handleStatusChange('done')}
                className="block w-full text-left py-2 px-4 hover:bg-muted text-foreground"
              >
                Done
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
