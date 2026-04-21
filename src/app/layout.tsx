import { DM_Sans, Urbanist, Inter } from "next/font/google";
import "@/app/globals.css";
import { AntdRegistry } from "@ant-design/nextjs-registry";
import Providers from "@/Providers/Providers";
import NextTopLoader from 'nextjs-toploader';

// Import fonts
const dmSans = DM_Sans({
  weight: ["300", "400", "500", "700"],
  subsets: ["latin"],
  variable: "--font-dm-sans",
});

const urbanist = Urbanist({
  weight: ["300", "400", "500", "700"],
  subsets: ["latin"],
  variable: "--font-urbanist",
});

const inter = Inter({
  weight: ["300", "400", "500", "700"],
  subsets: ["latin"],
  variable: "--font-inter",
});

export const metadata = {
  title: "Kevin",
  description: "Let's build something different",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body
        className={`${dmSans.variable} ${urbanist.variable} ${inter.variable} antialiased bg-[#EAECEE]`}
      >
        <NextTopLoader
          color="#2299DD"
          height={3}
        />
        <Providers>
          <AntdRegistry>{children}</AntdRegistry>
        </Providers>
      </body>
    </html>
  );
}
