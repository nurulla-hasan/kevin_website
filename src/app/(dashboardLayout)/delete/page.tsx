'use client';

import { logout, selectCurrentUser } from '@/redux/features/auth/authSlice';
import { useDeletProfileMutation } from '@/redux/features/user/userApi';
import { useAppDispatch, useAppSelector } from '@/redux/hooks';
import { message, Modal } from 'antd';
import { useRouter } from 'next/navigation';
import { useState } from 'react';

const DeletePage = () => {
  const user = useAppSelector(selectCurrentUser)
  const userId=user?.user?.userId
  const [isModalOpen, setIsModalOpen] = useState(false);
  const showModal = () => setIsModalOpen(true);
  const handleCancel = () => setIsModalOpen(false);
  const [deleteProfile]=useDeletProfileMutation()
  const dispatch = useAppDispatch()
  const router = useRouter()
  const handleConfirmDelete = async(userId) => {
    try {
      const res = await deleteProfile(userId).unwrap();
      if (res.success) {
        message.success(res?.message || 'Account deleted successfully');
        // Logout user after successful account deletion
        dispatch(logout());
        router.push('/');
      } else {
        message.error(res.message || 'Failed to delete account');
        setIsModalOpen(false);
      }
    } catch (error: any) {
      message.error(error?.data?.message || error?.message || 'Something went wrong');
      setIsModalOpen(false);
    }
  };
  return (
    <div>
      <div className="max-w-7xl min-h-screen mx-auto border border-border rounded-md p-6 shadow-sm bg-card">
        <h2 className="text-2xl font-semibold text-foreground mb-4">
          Delete Account
        </h2>
        <div className="border-b border-border mb-8"></div>

        <div className="mb-2 max-w-xl mx-auto">
          <p className="text-xl  text-muted-foreground mt-1">
            Once you delete your account, you will no longer be able to log in
            to Your Trade Source account. This action cannot be undone.
          </p>
          <button
            onClick={showModal}
            className="w-[60%] mt-3 border border-destructive text-destructive text-xl py-2 rounded-md  transition  font-semibold hover:bg-destructive/10"
          >
            Delete Account
          </button>
        </div>
      </div>
      <Modal
        open={isModalOpen}
        onCancel={handleCancel}
        footer={null}
        width={600}
        centered
      >
        <div className="max-w-7xl  mx-auto rounded-md p-6 bg-card border border-border">
          <h2 className="text-2xl font-semibold text-foreground mb-4">
            Delete Account
          </h2>
          <div className="border-b border-border mb-8"></div>

          <p className="text-xl  text-muted-foreground my-3">
            Are you sure you want to delete your account?
          </p>
          <div className="mb-2 max-w-xl mx-auto flex gap-4">
  
            <button
              onClick={()=>handleConfirmDelete(userId)}
              className="w-[50%] mt-3 bg-destructive text-destructive-foreground text-xl py-1 rounded-md  transition  font-semibold hover:bg-destructive/90"
            >
              Yes,Delete
            </button>
          </div>
        </div>
      </Modal>
    </div>
  );
};

export default DeletePage;
