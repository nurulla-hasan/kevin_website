'use client';
import Image from 'next/image';
import logo from '@/assests/navLogo.png';
import styles from '@/app/styles.module.css';
import { FaFacebookF, FaLinkedinIn } from 'react-icons/fa';
import { FaSquareInstagram, FaXTwitter } from 'react-icons/fa6';
import { IoLogoYoutube } from 'react-icons/io';
import { useGetGlobalDataQuery } from '@/redux/features/cms/globalApi';

const Footer = () => {
  const { data: globalData } = useGetGlobalDataQuery(undefined, {
    refetchOnMountOrArgChange: true,
  });
  const footerData = globalData?.data?.footer;
  const branding = globalData?.data?.branding;
  const navigation = globalData?.data?.navigation || [];

  return (
    <footer
      className={`bg-[#2C3E50] text-white py-10 px-5 ${styles.fontUrbanist}`}
    >
      <div className="container mx-auto flex flex-col md:flex-row md:justify-between md:items-start gap-10">
        {/* Logo and first address */}
        <div className="flex flex-col md:w-1/3">
          <div
            className="w-[379px] max-w-full mb-4 relative"
            style={{ height: 176 }}
          >
            <Image
              src={branding?.logo || logo}
              alt="YTS Logo"
              layout="fill"
              objectFit="contain"
            />
          </div>
          <div className="flex flex-col md:flex-row md:gap-20">
            <div>
              <h3 
                className="font-semibold text-2xl mb-2"
                style={{ color: branding?.secondaryColor || '#ABE7B4' }}
              >
                Address
              </h3>
              <address
                className={`text-xl not-italic leading-snug ${styles.lineClamp3}`}
              >
                {footerData?.address || (
                  <>
                    6600 Headquarters Oaks Blvd Ste. 150, <br />
                    Plano, TX. 75023.
                  </>
                )}
              </address>
            </div>

            {/* Second address */}
            {/* <div className="mt-8 md:mt-0 w-full">
              <h3 className="text-[#ABE7B4] font-semibold text-2xl mb-2">
                Address
              </h3>
              <address
                className={`not-italic leading-snug text-xl ${styles.lineClamp3}`}
              >
                123 Albacore Road, <br />
                Wolverton Air, <br />
                MK12 5AB, <br />
                United Kingdom
              </address>
            </div> */}
          </div>
        </div>

        {/* Pages and Socials */}
        <div className="md:w-1/3 flex flex-col md:flex-row md:justify-between gap-6">
          {/* Pages */}
          <div className="mt-16">
            <h3 className="uppercase font-semibold text-2xl mb-8">PAGES</h3>
            <ul className="text-xl space-y-5">
              {navigation
                .filter((item: any) => item.isVisible)
                .map((item: any) => (
                  <li key={item.label}>{item.label}</li>
                ))}
            </ul>
            <p className="mt-3 text-[19px]">
              We are not Yelp or Angie. We&apos;re built different.
            </p>
          </div>

          {/* Socials */}
          <div className="mt-16">
            <h3 className="uppercase font-semibold mb-8 text-2xl">SOCIALS</h3>
            <ul className="text-xl space-y-5">
              {footerData?.socialLinks?.map((social: any) => {
                const Icon = 
                  social.platform === 'Facebook' ? FaFacebookF :
                  social.platform === 'Instagram' ? FaSquareInstagram :
                  social.platform === 'Twitter' ? FaXTwitter :
                  social.platform === 'LinkedIn' ? FaLinkedinIn :
                  social.platform === 'Youtube' ? IoLogoYoutube : null;
                
                return (
                   <li key={social.platform} className="flex gap-2 items-center">
                     <a href={social.url} target="_blank" rel="noopener noreferrer" className="flex items-center gap-2">
                       {Icon && <Icon style={{ color: branding?.secondaryColor || '#ABE7B4' }} />} {social.platform}
                     </a>
                   </li>
                 );
              })}
            </ul>
          </div>
        </div>
      </div>

      <div className="mt-10 border-t border-gray-500 pt-3 text-sm text-right">
        <p className="mt-1">{footerData?.copyRightText || '© 2025 Sparktech. All rights reserved.'}</p>
      </div>
    </footer>
  );
};

export default Footer;
