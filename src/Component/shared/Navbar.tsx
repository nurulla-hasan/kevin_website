/* eslint-disable @typescript-eslint/no-explicit-any */
'use client';

import Image from 'next/image';
import { useEffect, useState } from 'react';
import logo from '@/assests/navLogo.png';
import styles from '@/app/styles.module.css';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { IoNotificationsOutline } from 'react-icons/io5';
import { LuMessageSquareMore } from 'react-icons/lu';
import { useAppDispatch, useAppSelector } from '@/redux/hooks';
import { logout, selectCurrentUser } from '@/redux/features/auth/authSlice';
import { useGetSpecefiqUserQuery } from '@/redux/features/user/userApi';
import { resetContractorData } from '@/redux/features/contractor/contractorSlice';
import { setCookie } from 'nookies';
import { message } from 'antd';
import { protectedRoutes } from '@/constants';
import { useGetUnseenNotificationCountQuery } from '@/redux/features/others/otherApi';
import { Socket } from 'socket.io-client';
import { getSocket } from '@/lib/socket';
import { useGetGlobalDataQuery } from '@/redux/features/cms/globalApi';

export default function Navbar() {
  const { data: globalData } = useGetGlobalDataQuery(undefined, {
    refetchOnMountOrArgChange: true,
  });
  const [isOpen, setIsOpen] = useState(false);
  const [notificationCount, setNotificationCount] = useState(0);
  const [socket, setSocket] = useState<Socket | null>(null);
  const user = useAppSelector(selectCurrentUser);
  const { data: specUser } = useGetSpecefiqUserQuery(user?.user?.userId);
  // console.log("spec user from navbar--->",specUser);
  const { data: unSeenNotificationCount } = useGetUnseenNotificationCountQuery(
    user?.user?.userId
  );

  const pathname = usePathname();
  const role = specUser?.data?.role;
  const homeLink = user?.user?.userId ? '/homepage' : '/';

  const cmsNav = globalData?.data?.navigation || [];

  const navItems = [
    { originalLabel: 'Home', href: homeLink, cmsIndex: 0 },
    { originalLabel: 'Interior', href: '/interior', cmsIndex: 1 },
    { originalLabel: 'Exterior', href: '/exterior', cmsIndex: 2 },
    { originalLabel: 'Lawn & Garden', href: '/lawn', cmsIndex: 3 },
    { originalLabel: 'Specialized & Other Services', href: '/allServices', cmsIndex: 4 },
    { originalLabel: 'Articles', href: '/article', cmsIndex: 5 },
  ]
    .map(item => {
      const cmsItem = cmsNav[item.cmsIndex];
      return {
        label: cmsItem?.label || item.originalLabel,
        href: item.href,
        isVisible: cmsItem ? cmsItem.isVisible : true,
      };
    })
    .filter(item => item.isVisible);

  // Get $10 dynamic data
  const get10Cms = cmsNav[6];
  const get10Label = get10Cms?.label || 'Get $10';
  const isGet10Visible = get10Cms ? get10Cms.isVisible : true;

  // const profileLink = role === 'contractor' ||'vipContractor' ? '/dashboard' : '/myProfile';
  const profileLink = (role === 'contractor' || role === 'vipContractor') ? '/dashboard' : '/myProfile';

  const router = useRouter();
  const dispatch = useAppDispatch();

  const handleLogout = () => {
    dispatch(logout());
    dispatch(resetContractorData());
    router.push('/');
    setCookie(null, 'user', '', { path: '/', maxAge: -1 });
    message.success('Logout Success');
    if (protectedRoutes.some(route => pathname.match(route))) {
      router.push('/');
    }
  };

  const myUserId = user?.user?.userId;

  useEffect(() => {
    if (unSeenNotificationCount) {
      setNotificationCount(Number(unSeenNotificationCount?.data));
    }
  }, [unSeenNotificationCount]);

  // Connect to sockett
  useEffect(() => {
    if (!myUserId) return;

    const socket = getSocket(myUserId);
    setSocket(socket);

    const handleConnect = () => {
      console.log('Connected to socket:', socket.id);
    };

    socket.on('connect', handleConnect);

    return () => {
      socket.off('connect', handleConnect);
    };
  }, [myUserId]);

  useEffect(() => {
    if (!socket) return;

    const handleNewNotification = (newNotice: any) => {
      if (newNotice.unReadCount >= 0) {
        setNotificationCount(newNotice.unReadCount);
      } else if (newNotice.unReadMinus == 1) {
        setNotificationCount(prev => prev - 1);
      } else {
        setNotificationCount(prev => prev + 1);
      }
    };

    socket.on('newNotification', handleNewNotification);

    return () => {
      socket.off('newNotification', handleNewNotification);
    };
  }, [socket, unSeenNotificationCount]);

  return (
    <nav
      className={` bg-white lg:px-2 xl:px-8 px-3 py-3 flex justify-center items-center ${styles.fontDmSans}`}
    >
      {/* Logo */}
      <div className="lg:mr-5 xl:mr-6 2xl:mr-44 mr-auto flex items-center ">
        <Link href={homeLink}>
          <Image
            src={globalData?.data?.branding?.logo || logo}
            alt="Logo"
            width={200}
            height={100}
            className="h-20 w-48"
          />
        </Link>
      </div>

      {/* Desktop nav items */}
      <ul className="hidden lg:flex lg:space-x-4 xl:space-x-5 2xl:space-x-8 font-medium text-gray-800 lg:mr-3 xl:mr-5 2xl:mr-20">
        {navItems.map(item => {
          const isActive = item.href === pathname;
          return (
            <li key={item.label}>
              <Link
                href={item.href}
                className={`hover:text-blue-600 ${
                  isActive ? 'text-blue-600 font-semibold' : ''
                }`}
              >
                {item.label}
              </Link>
            </li>
          );
        })}
      </ul>

      {/* Buttons */}
      <div className="hidden lg:flex lg:gap-3 items-center xl:space-x-2 2xl:space-x-6 ">
        {user ? (
          <>
            {isGet10Visible && (
              <Link
                href="/refer"
                className={`font-medium hover:text-blue-600 ${
                  pathname === '/refer'
                    ? 'text-blue-600 font-semibold'
                    : 'text-gray-700'
                }`}
              >
                {get10Label}
              </Link>
            )}
            <div className="border flex justify-evenly lg:gap-2 xl:gap-2 2xl:gap-3  items-center border-gray-300 rounded-md shadow-md lg:px-3 xl:px-8 py-2">
              <Link href="/inbox">
                <div
                  className={`p-2 border border-black rounded-full cursor-pointer ${
                    pathname === '/inbox'
                      ? 'bg-blue-500 text-white border-blue-500'
                      : 'hover:bg-gray-100 border-gray-300'
                  }`}
                >
                  <LuMessageSquareMore size={24} />
                </div>
              </Link>
              <Link href="/notificationPage">
                <div className="relative">
                  {/* Notification Icon Button */}
                  <div
                    className={`p-2 border rounded-full transition-all duration-200 shadow-sm cursor-pointer ${
                      pathname === '/notificationPage'
                        ? 'bg-blue-500 text-white border-blue-500'
                        : 'hover:bg-gray-100 border-gray-300'
                    }`}
                  >
                    <IoNotificationsOutline size={24} />
                  </div>

                  {/* Notification Counter Badge */}
                  {notificationCount > 0 && (
                    <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs font-medium px-1.5 py-0.5 rounded-full shadow-md animate-bounce">
                      {notificationCount}
                    </span>
                  )}
                </div>
              </Link>
              <Link href={profileLink}>
                <button className="flex items-center space-x-2 cursor-pointer">
                  <Image
                    src={
                      specUser?.data?.image ||
                      'https://tse3.mm.bing.net/th/id/OIP.kUFzwD5-mfBV0PfqgI5GrAHaHa?cb=thfvnext&rs=1&pid=ImgDetMain&o=7&rm=3'
                    }
                    alt="User Avatar"
                    width={30}
                    height={30}
                    className="rounded-full w-10 h-10 "
                  />
                  <span className="font-medium text-gray-700">
                    Hi, {specUser?.data?.firstName}
                  </span>
                </button>
              </Link>
            </div>
          </>
        ) : (
          <>
            <Link href={'/authentication'}>
              <button className="border border-black lg:px-4 xl:px-4 py-1 rounded hover:bg-gray-100">
                Log In / Sign Up
              </button>
            </Link>
          </>
        )}
      </div>

      {/* Mobile hamburger */}
      <button
        className="lg:hidden ml-4 focus:outline-none"
        onClick={() => setIsOpen(!isOpen)}
        aria-label="Toggle menu"
      >
        <svg
          className="w-6 h-6 text-gray-800"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
          xmlns="http://www.w3.org/2000/svg"
        >
          {isOpen ? (
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M6 18L18 6M6 6l12 12"
            />
          ) : (
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M4 6h16M4 12h16M4 18h16"
            />
          )}
        </svg>
      </button>

      {/* Mobile menu */}
      {isOpen && (
        <ul className="absolute top-16 left-0 right-0 bg-white border-t border-gray-300 flex flex-col lg:hidden z-10">
          {navItems.map(item => {
            const isActive = item.href === pathname;
            return (
              <li key={item.label} className="border-b border-gray-200">
                <Link
                  href={item.href}
                  className={`block px-6 py-3 text-gray-800 hover:bg-gray-100 ${
                    isActive ? 'text-blue-600 font-semibold' : ''
                  }`}
                  onClick={() => setIsOpen(false)}
                >
                  {item.label}
                </Link>
              </li>
            );
          })}

          {/* Mobile buttons */}
          <li className="flex flex-col px-6 py-3 space-y-2">
            {user ? (
              <>
                {isGet10Visible && (
                  <Link
                    href="/refer"
                    className={`font-medium hover:text-blue-600 text-center py-2 rounded ${
                      pathname === '/refer'
                        ? 'text-blue-600 font-semibold'
                        : 'text-gray-700'
                    }`}
                    onClick={() => setIsOpen(false)}
                  >
                    {get10Label}
                  </Link>
                )}
                <div className="flex justify-between items-center border border-gray-300 rounded-md shadow-md px-4 py-2 space-x-4">
                  <Link href="/inbox">
                    <div
                      className={`p-2 border border-black rounded-full cursor-pointer ${
                        pathname === '/inbox'
                          ? 'bg-blue-500 text-white'
                          : 'hover:bg-gray-200'
                      }`}
                    >
                      <LuMessageSquareMore size={24} />
                    </div>
                  </Link>
                  <Link href="/notificationPage">
                    <div
                      className={`p-2 border border-black rounded-full cursor-pointer ${
                        pathname === '/notificationPage'
                          ? 'bg-blue-500 text-white'
                          : 'hover:bg-gray-200'
                      }`}
                    >
                      <IoNotificationsOutline size={24} />
                    </div>
                  </Link>
                  <div className="flex items-center space-x-2">
                    <Link href={profileLink}>
                      <button className="flex items-center space-x-2 cursor-pointer">
                        <Image
                          src={specUser?.data?.image}
                          alt="User Avatar"
                          width={30}
                          height={30}
                          className="rounded-full w-10 h-10"
                        />
                        <span className="font-medium text-gray-700">
                          Hi, {specUser?.data?.firstName}
                        </span>
                      </button>
                    </Link>
                  </div>
                </div>
                <button
                  onClick={() => handleLogout()}
                  className="bg-blue-600 text-white px-4 p-2 rounded hover:bg-blue-700 w-full text-center"
                >
                  Logout
                </button>
              </>
            ) : (
              <>
                <Link href="/authentication" onClick={() => setIsOpen(false)}>
                  <button className="border border-black px-4 py-2 rounded text-center hover:bg-gray-100 w-full">
                    Log In / Sign Up
                  </button>
                </Link>
              </>
            )}
          </li>
        </ul>
      )}
    </nav>
  );
}
