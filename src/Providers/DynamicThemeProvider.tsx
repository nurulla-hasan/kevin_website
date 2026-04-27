"use client";

import React, { useEffect } from 'react';
import { useGetGlobalDataQuery } from '@/redux/features/cms/globalApi';

export const DynamicThemeProvider = ({ children }: { children: React.ReactNode }) => {
  const { data: globalData } = useGetGlobalDataQuery(undefined);

  console.log('globalData', globalData);
  useEffect(() => {
    if (globalData?.data?.branding) {
      const { primaryColor, secondaryColor } = globalData.data.branding;
      const root = document.documentElement;

      if (primaryColor) {
        const hsl = hexToHSL(primaryColor);
        if (hsl) {
          root.style.setProperty('--primary', hsl);
        }
      }

      if (secondaryColor) {
        const hsl = hexToHSL(secondaryColor);
        if (hsl) {
          root.style.setProperty('--secondary', hsl);
        }
      }
    }
  }, [globalData]);

  return <>{children}</>;
};

/**
 * Converts a hex color string to an HSL string format that shadcn/ui expects.
 * format: "221.2 83.2% 53.3%" (without hsl() wrapper)
 */
function hexToHSL(hex: string): string | null {
  // Remove the hash if it exists
  hex = hex.replace(/^#/, '');

  // Parse r, g, b
  let r = 0, g = 0, b = 0;
  if (hex.length === 3) {
    r = parseInt(hex[0] + hex[0], 16);
    g = parseInt(hex[1] + hex[1], 16);
    b = parseInt(hex[2] + hex[2], 16);
  } else if (hex.length === 6) {
    r = parseInt(hex.substring(0, 2), 16);
    g = parseInt(hex.substring(2, 4), 16);
    b = parseInt(hex.substring(4, 6), 16);
  } else {
    return null;
  }

  // Convert r, g, b to 0-1 range
  r /= 255;
  g /= 255;
  b /= 255;

  const max = Math.max(r, g, b);
  const min = Math.min(r, g, b);
  let h = 0, s = 0, l = (max + min) / 2;

  if (max !== min) {
    const d = max - min;
    s = l > 0.5 ? d / (2 - max - min) : d / (max + min);
    
    switch (max) {
      case r: h = (g - b) / d + (g < b ? 6 : 0); break;
      case g: h = (b - r) / d + 2; break;
      case b: h = (r - g) / d + 4; break;
    }
    h /= 6;
  }

  // Convert to degrees and percentages
  h = Math.round(h * 360);
  s = Math.round(s * 100);
  l = Math.round(l * 100);

  return `${h} ${s}% ${l}%`;
}
