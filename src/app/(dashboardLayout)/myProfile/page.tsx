"use client";

import { useState } from "react";
import { Controller, useForm } from "react-hook-form";
import Image from "next/image";
import { Modal, message } from "antd";
import { FaUser, FaEnvelope, FaPhone, FaMapMarkerAlt } from "react-icons/fa";
import "react-phone-input-2/lib/style.css";
import { IoCameraOutline } from "react-icons/io5";
import { useAppSelector } from "@/redux/hooks";
// import { logout, selectCurrentUser } from "@/redux/features/auth/authSlice";
// import { usePathname, useRouter } from "next/navigation";
// import { setCookie } from "nookies";
// import { protectedRoutes } from "@/constants";
import {
  useGetSpecefiqUserQuery,
  useUpdateSpecefiqUserMutation,
} from "@/redux/features/user/userApi";
// import { resetContractorData } from "@/redux/features/contractor/contractorSlice";
import Link from "next/link";
import { selectCurrentUser } from "@/redux/features/auth/authSlice";

export default function ProfilePage() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  // const dispatch = useAppDispatch();
  const showModal = () => {
    setIsModalOpen(true);
  };
  const user = useAppSelector(selectCurrentUser);
  const { data: specUser,refetch } = useGetSpecefiqUserQuery(user?.user?.userId);
  // const router = useRouter();
  // const pathname = usePathname();

  const [updateUser] = useUpdateSpecefiqUserMutation();
  const role = specUser?.data?.role;
  const handleCancel = () => {
    setIsModalOpen(false);
  };

  // logout
  // const handleLogout = () => {
  //   dispatch(logout());
  //   dispatch(resetContractorData());
  //   // Delete cookie manually
  //   router.push("/");
  //   setCookie(null, "user", "", { path: "/", maxAge: -1 });
  //   message.success("Logout Success");
  //   if (protectedRoutes.some((route) => pathname.match(route))) {
  //     router.push("/");
  //   }
  // };

  const { handleSubmit, control } = useForm();

  const [previewImage, setPreviewImage] = useState(specUser?.data?.image);
  const [imageFile, setImageFile] = useState(null);

  const handleImageChange = (e) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setImageFile(file);

    // preview only
    const reader = new FileReader();
    reader.onloadend = () => setPreviewImage(reader.result);
    reader.readAsDataURL(file);
  };

  const onSubmit = async (data) => {
    try {
      if (!user?.user?.userId) {
        // message.error("User ID is missing");
        console.error("User ID is missing");
        return;
      }

      // Build FormData
      const form = new FormData();
      form.append("data", JSON.stringify(data)); 

         // Only append image if it's a new image file
    if (imageFile) {
      form.append("image", imageFile);
    }
      

      
      const res = await updateUser({
        id: user.user.userId,
        userInfo: form, 
      });
      if (res.error) {
        // console.error("Failed to update user:", res.error);
        message.error("Failed to update user");
      } else {
        message.success(res?.data?.message);
        refetch()
        setIsModalOpen(false)
      }
    } catch (err) {
      console.error("Update error:", err);
      // message.error("Server error");
    }
  };

  return (
    <div className="w-full   min-h-screen bg-white p-6">
      {/* Header */}
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-2xl font-bold text-gray-800">Profile</h1>
        <div>
          <button
            className="px-6 py-2 border border-gray-300 rounded text-gray-700 hover:bg-gray-50 transition"
            onClick={showModal}
          >
            Edit
          </button>
          <Link href={"/contractorHome"}>
            {role === "user" && (
              <button className="bg-blue-600 text-white px-4 py-2 ml-1 rounded hover:bg-blue-700">
                Become a Pro
              </button>
            )}
          </Link>
        </div>
      </div>

      {/* Divider */}
      <div className="border-b border-gray-200 mb-8"></div>

      {/* Profile Content */}
      <div className="flex flex-col md:flex-row justify-center xl:mt-48 items-center md:items-start gap-12">
        {/* Profile Photo */}
        <div className="relative w-44 h-44 rounded-full overflow-hidden">
          <Image
            src={
              specUser?.data?.image ||
              "https://tse3.mm.bing.net/th/id/OIP.kUFzwD5-mfBV0PfqgI5GrAHaHa?cb=thfvnext&rs=1&pid=ImgDetMain&o=7&rm=3"
            }
            alt="Profile"
            fill
            className="object-cover rounded-full"
          />
        </div>

        {/* User Information */}
        <div className="flex flex-col space-y-6 flex-grow">
          <div className="flex items-center gap-4">
            <FaUser className="text-gray-600 w-5 h-5" />
            <span className="text-lg text-gray-900">
              {(specUser?.data?.firstName)+' '+(specUser?.data?.lastName)}
            </span>
          </div>

          <div className="flex items-center gap-4">
            <FaEnvelope className="text-gray-600 w-5 h-5" />
            <span className="text-lg text-gray-900">
              {specUser?.data?.email}
            </span>
          </div>

          <div className="flex items-center gap-4">
            <FaPhone className="text-gray-600 w-5 h-5" />
            <span className="text-lg text-gray-900">
              {specUser?.data?.phone}
            </span>
          </div>

          <div className="flex items-center gap-4">
            <FaMapMarkerAlt className="text-gray-600 w-5 h-5" />
            <span className="text-lg text-gray-900">
              {specUser?.data?.address}
            </span>
          </div>

          {/* Logout Button */}
          {/* <button
            onClick={() => handleLogout()}
            className="w-[30%] bg-red-500 text-white py-3 rounded hover:bg-red-600 transition mt-4"
          >
            Logout
          </button> */}
        </div>
      </div>

      {/* Edit Profile Modal */}
      <Modal
        title={null}
        open={isModalOpen}
        onCancel={handleCancel}
        footer={null}
        width={700}
      >
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="flex flex-col md:flex-row gap-8 py-8"
        >
          {/* Profile Image */}
          <div className="flex flex-col items-center gap-2">
            <div className="flex flex-col items-center gap-2">
              <div className="relative w-44 h-44 rounded-full overflow-hidden bg-gray-200 flex items-center justify-center">
                {/* Image preview */}
                <Image
                  src={previewImage || specUser?.data?.image || ""}
                  alt="Profile"
                  fill
                  className={`object-cover rounded-full ${
                    previewImage || specUser?.data?.image ? "" : "opacity-0"
                  }`}
                />
                {/* If no image is available, show placeholder text */}
                {!previewImage && !specUser?.data?.image && (
                  <span className="text-gray-500">No Image</span>
                )}
                {/* Invisible file input */}
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleImageChange}
                  className="absolute inset-0 opacity-0 cursor-pointer"
                />
                {/* Camera icon (upload button) */}
                <label className="bg-black opacity-80 w-full p-1 shadow-md cursor-pointer absolute top-36 py-4">
                  <IoCameraOutline
                    size={24}
                    className="text-white absolute bottom-1 left-20"
                  />
                </label>
              </div>
            </div>
          </div>
          {/* Form Fields */}
          <div className="flex-1 space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm text-gray-500 mb-2">
                  First Name
                </label>
                <Controller
                  name="firstName"
                  control={control}
                  defaultValue={specUser?.data?.firstName || ""}
                  render={({ field }) => (
                    <input
                      {...field}
                      className="rounded-lg border p-2 w-full"
                    />
                  )}
                />
              </div>
              <div>
                <label className="block text-sm text-gray-500 mb-2">
                  Last Name
                </label>
                <Controller
                  name="lastName"
                  control={control}
                  defaultValue={specUser?.data?.lastName || ""}
                  render={({ field }) => (
                    <input
                      {...field}
                      className="rounded-lg border p-2 w-full"
                    />
                  )}
                />
              </div>
            </div>

            <div>
              <label className="block text-sm text-gray-500 mb-2">Bio</label>
              <Controller
                name="bio"
                control={control}
                defaultValue={specUser?.data?.bio || ""}
                render={({ field }) => (
                  <textarea
                    {...field}
                    className="rounded-lg border p-2 w-full"
                    rows={4}
                  />
                )}
              />
            </div>

            {/* Submit Button */}
            <div className="flex justify-end pt-4">
              <button
                type="submit"
                className="bg-blue-600 text-white rounded-lg px-4 py-2"
              >
                Update
              </button>
            </div>
          </div>
        </form>
      </Modal>
    </div>
  );
}
