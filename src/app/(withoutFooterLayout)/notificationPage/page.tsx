/* eslint-disable @typescript-eslint/no-explicit-any */
'use client';

import Image from 'next/image';
import emptyImg from '@/assests/Notification 1.png'; // Your uploaded empty state image
import {
  useGetNotificationsQuery,
  useMarkAllNotificationsAsReadMutation,
  useMarkSingleNotificationAsReadMutation,
} from '@/redux/features/others/otherApi';
import { useAppSelector } from '@/redux/hooks';
import { selectCurrentUser } from '@/redux/features/auth/authSlice';
import { useGetSpecefiqUserQuery } from '@/redux/features/user/userApi';
import dayjs from 'dayjs';
import { useEffect, useState } from 'react';
import { Socket } from 'socket.io-client';
import { message } from 'antd';
import { getSocket } from '@/lib/socket';

const NotificationPage = () => {
  const { user } = useAppSelector(selectCurrentUser);
  const { data: specUser } = useGetSpecefiqUserQuery(user?.userId);
  const { data: oldNotifications } = useGetNotificationsQuery(user?.userId);
  const [socket, setSocket] = useState<Socket | null>(null);
  const [markNotificationsRead] = useMarkAllNotificationsAsReadMutation();
  const [markSingleNotificationAsRead] =
    useMarkSingleNotificationAsReadMutation();
  const [notifications, setNotifications] = useState<
    Record<string, any>[] | null
  >(null);

  const myUserId = user?.userId;

  const userImage =
    specUser?.data?.image ||
    'https://tse3.mm.bing.net/th/id/OIP.kUFzwD5-mfBV0PfqgI5GrAHaHa?cb=thfvnext&rs=1&pid=ImgDetMain&o=7&rm=3';

  useEffect(() => {
    if (oldNotifications?.data?.result) {
      setNotifications(oldNotifications?.data?.result);
    }
  }, [oldNotifications]);

  // Connect to socket
  useEffect(() => {
    if (!myUserId) return;

    const socket = getSocket(myUserId);
    setSocket(socket);

    const handleConnect = () => {
    };

    socket.on('connect', handleConnect);

    return () => {
      socket.off('connect', handleConnect);
    };
  }, [myUserId]);

  useEffect(() => {
    if (!socket) return;

    const handleNewNotification = (newNotice: any) => {
      if (newNotice._id) setNotifications(prev => [newNotice, ...prev]);
    };

    socket.on('newNotification', handleNewNotification);

    return () => {
      socket.off('newNotification', handleNewNotification);
    };
  }, [socket]);

  const handleMarkAllNoticeAsRead = async () => {
    try {
      const res = await markNotificationsRead(user?.userId).unwrap();

      if (res.success) {
        message.success(res.message);
      }
    } catch (error: any) {
      message.error(error?.data?.message || 'Something went wrong');
    }
  };

  const handleMarkSingleNoticeAsRead = async noticeId => {
    try {
      const res = await markSingleNotificationAsRead(noticeId).unwrap();

      if (res.success) {
        message.success(res.message);
      }
    } catch (error: any) {
      message.error(error?.data?.message || 'Something went wrong');
    }
  };

  return (
    <div className="max-w-7xl bg-white my-5 mx-auto px-4 py-8">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-semibold text-gray-900 pr-4">
          Notifications
        </h2>
        <div className="min-w-[100px] text-right">
          {notifications?.some(notification => !notification.isRead) && (
            <button
              onClick={handleMarkAllNoticeAsRead}
              className="text-sm text-blue-600 hover:underline"
            >
              Mark all as read
            </button>
          )}
        </div>
      </div>
      <div className="border-b border-gray-200 mb-5"></div>

      {notifications?.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-20 text-center">
          <Image
            src={emptyImg}
            alt="Empty"
            width={200}
            height={200}
            className="mb-6"
          />
          <h3 className="text-lg font-semibold text-gray-800">
            Nothing to display here!
          </h3>
          <p className="text-sm text-gray-500">
            We&apos;ll notify you once we have new notifications.
          </p>
        </div>
      ) : (
        <>
          <div className="space-y-2">
            {notifications?.map((notice, index) => (
              <div
                key={index}
                className={`rounded-lg ${!notice.isRead ? 'bg-blue-100' : ''}`}
              >
                <div className="flex items-start gap-4 p-4">
                  <Image
                    src={userImage}
                    alt="user Image"
                    width={40}
                    height={40}
                    className="rounded-full w-10 h-10 object-cover"
                  />
                  <div className="flex-1">
                    <p
                      className={`text-base ${
                        !notice.isRead
                          ? 'font-medium text-blue-900'
                          : 'text-gray-700'
                      }`}
                    >
                      {notice.title}
                    </p>

                    <p
                      className={`text-xs ${
                        !notice.isRead
                          ? 'font-medium text-blue-900'
                          : 'text-gray-700'
                      }`}
                    >
                      {notice.message}
                    </p>

                    <p className="text-xs text-gray-500 mt-1">
                      {dayjs(notice.createdAt).format('DD MMMM YYYY @ h:mm a')}
                    </p>
                  </div>
                  {!notice.isRead && (
                    <span className="w-3 h-3 bg-green-300 rounded-full mt-1"></span>
                  )}
                </div>

                {!notice.isRead && (
                  <div className="flex justify-end px-2 pb-2">
                    <button
                      onClick={() => handleMarkSingleNoticeAsRead(notice?._id)}
                      className="text-sm text-blue-600 hover:underline"
                    >
                      Mark as read
                    </button>
                  </div>
                )}
              </div>
            ))}
          </div>

          {/* <div className="pt-8 border-t mt-8 text-center">
            <button className="text-sm text-red-500 hover:underline">
              Clear all Notifications
            </button>
          </div> */}
        </>
      )}
    </div>
  );
};

export default NotificationPage;
