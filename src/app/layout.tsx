import { Lato } from "next/font/google";
import "@/app/globals.css";
import { AntdRegistry } from "@ant-design/nextjs-registry";
import Providers from "@/Providers/Providers";
import NextTopLoader from 'nextjs-toploader';

// Import Lato font
const lato = Lato({
  weight: ["300", "400", "700"],
  subsets: ["latin"],
  variable: "--font-lato",
});

export const metadata = {
  title: "YTS - Find Expert Contractors & Home Services",
  description: "Connect with trusted professional contractors for your home projects. Get quotes, read reviews, and find the perfect expert for interior design, construction, and more.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body
        className={`${lato.variable} font-sans antialiased bg-background`}
      >
        <NextTopLoader
          color="#2299DD"
          showSpinner={false}
          height={3}
        />
        <Providers>
          <AntdRegistry>{children}</AntdRegistry>
        </Providers>
      </body>
    </html>
  );
}
