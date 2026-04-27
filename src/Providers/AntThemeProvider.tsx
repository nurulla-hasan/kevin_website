"use client";

import React from 'react';
import { ConfigProvider } from 'antd';
import { useGetGlobalDataQuery } from '@/redux/features/cms/globalApi';

export const AntThemeProvider = ({ children }: { children: React.ReactNode }) => {
  const { data: globalData } = useGetGlobalDataQuery(undefined);

  // Get colors from API or fallback to CSS variables
  const primaryColor = globalData?.data?.branding?.primaryColor || '#0066FF';
  const secondaryColor = globalData?.data?.branding?.secondaryColor || '#10B981';

  return (
    <ConfigProvider
      theme={{
        token: {
          colorPrimary: primaryColor,
          colorInfo: primaryColor,
          colorLink: primaryColor,
          colorSuccess: secondaryColor,
          borderRadius: 8,
        },
        components: {
          Pagination: {
            colorPrimary: primaryColor,
            colorPrimaryHover: secondaryColor,
            itemActiveBg: primaryColor,
            itemActiveColor: '#ffffff',
          },
          Button: {
            colorPrimary: primaryColor,
            colorPrimaryHover: primaryColor,
            defaultBg: secondaryColor,
          },
          Menu: {
            colorPrimary: primaryColor,
          },
          Tabs: {
            colorPrimary: primaryColor,
          },
          Input: {
            colorPrimary: primaryColor,
            activeBorderColor: primaryColor,
            hoverBorderColor: primaryColor,
          },
          Select: {
            colorPrimary: primaryColor,
          },
          DatePicker: {
            colorPrimary: primaryColor,
          },
          Modal: {
            colorPrimary: primaryColor,
          },
          Switch: {
            colorPrimary: primaryColor,
          },
          Radio: {
            colorPrimary: primaryColor,
          },
          Checkbox: {
            colorPrimary: primaryColor,
          },
        },
      }}
    >
      {children}
    </ConfigProvider>
  );
};
