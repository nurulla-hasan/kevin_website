'use client';
import Image from 'next/image';
import Link from 'next/link';
import logo from '@/assests/navLogo.png';
import styles from '@/app/styles.module.css';
import { FaFacebookF, FaLinkedinIn } from 'react-icons/fa';
import { FaSquareInstagram, FaXTwitter } from 'react-icons/fa6';
import { IoLogoYoutube, IoMail, IoCall, IoLocation } from 'react-icons/io5';
import { useGetGlobalDataQuery } from '@/redux/features/cms/globalApi';

const Footer = () => {
  const { data: globalData } = useGetGlobalDataQuery(undefined, {
    refetchOnMountOrArgChange: true,
  });
  const footerData = globalData?.data?.footer;
  const branding = globalData?.data?.branding;
  const navigation = globalData?.data?.navigation || [];

  const accentColor = branding?.secondaryColor || '#ABE7B4';

  const getSocialIcon = (platform: string) => {
    switch (platform) {
      case 'Facebook': return FaFacebookF;
      case 'Instagram': return FaSquareInstagram;
      case 'Twitter': return FaXTwitter;
      case 'LinkedIn': return FaLinkedinIn;
      case 'Youtube': return IoLogoYoutube;
      default: return null;
    }
  };

  return (
    <footer className={`bg-[#1a2b3c] text-white ${styles.fontUrbanist}`}>
      {/* Main Footer Content */}
      <div className="container mx-auto px-6 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
          
          {/* Brand Column */}
          <div className="space-y-6">
            <div className="relative w-48 h-16">
              <Image
                src={branding?.logo || logo}
                alt="Company Logo"
                fill
                className="object-contain"
              />
            </div>
            <p className="text-gray-400 text-sm leading-relaxed max-w-xs">
              We are not Yelp or Angie. We&apos;re built different. 
              Connecting you with trusted professionals for all your needs.
            </p>
            
            {/* Social Icons */}
            <div className="flex gap-3">
              {footerData?.socialLinks?.map((social: any) => {
                const Icon = getSocialIcon(social.platform);
                return Icon ? (
                  <a
                    key={social.platform}
                    href={social.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center transition-all duration-300 hover:scale-110"
                    style={{ 
                      backgroundColor: 'rgba(255,255,255,0.1)',
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.backgroundColor = accentColor;
                      e.currentTarget.style.color = '#1a2b3c';
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.backgroundColor = 'rgba(255,255,255,0.1)';
                      e.currentTarget.style.color = 'white';
                    }}
                  >
                    <Icon size={18} />
                  </a>
                ) : null;
              })}
            </div>
          </div>

          {/* Quick Links */}
          <div className="space-y-6">
            <h4 className="text-lg font-semibold relative pb-3">
              Quick Links
              <span 
                className="absolute bottom-0 left-0 w-12 h-0.5"
                style={{ backgroundColor: accentColor }}
              />
            </h4>
            <ul className="space-y-3">
              <li>
                <Link href="/homepage" className="text-gray-400 hover:text-white transition-colors duration-300 flex items-center gap-2 group">
                  <span className="w-1.5 h-1.5 rounded-full transition-all duration-300 group-hover:w-3" style={{ backgroundColor: accentColor }} />
                  Home
                </Link>
              </li>
              <li>
                <Link href="/interior" className="text-gray-400 hover:text-white transition-colors duration-300 flex items-center gap-2 group">
                  <span className="w-1.5 h-1.5 rounded-full transition-all duration-300 group-hover:w-3" style={{ backgroundColor: accentColor }} />
                  Interior
                </Link>
              </li>
              <li>
                <Link href="/exterior" className="text-gray-400 hover:text-white transition-colors duration-300 flex items-center gap-2 group">
                  <span className="w-1.5 h-1.5 rounded-full transition-all duration-300 group-hover:w-3" style={{ backgroundColor: accentColor }} />
                  Exterior
                </Link>
              </li>
              <li>
                <Link href="/lawn" className="text-gray-400 hover:text-white transition-colors duration-300 flex items-center gap-2 group">
                  <span className="w-1.5 h-1.5 rounded-full transition-all duration-300 group-hover:w-3" style={{ backgroundColor: accentColor }} />
                  Lawn & Garden
                </Link>
              </li>
              <li>
                <Link href="/article" className="text-gray-400 hover:text-white transition-colors duration-300 flex items-center gap-2 group">
                  <span className="w-1.5 h-1.5 rounded-full transition-all duration-300 group-hover:w-3" style={{ backgroundColor: accentColor }} />
                  Articles
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact Info */}
          <div className="space-y-6">
            <h4 className="text-lg font-semibold relative pb-3">
              Contact Us
              <span 
                className="absolute bottom-0 left-0 w-12 h-0.5"
                style={{ backgroundColor: accentColor }}
              />
            </h4>
            <ul className="space-y-4">
              <li className="flex items-start gap-3 text-gray-400">
                <IoLocation 
                  size={20} 
                  style={{ color: accentColor }}
                  className="flex-shrink-0 mt-0.5"
                />
                <span className="text-sm leading-relaxed">
                  {footerData?.address || (
                    <>
                      6600 Headquarters Oaks Blvd Ste. 150,<br />
                      Plano, TX. 75023
                    </>
                  )}
                </span>
              </li>
              <li className="flex items-center gap-3 text-gray-400">
                <IoCall 
                  size={18} 
                  style={{ color: accentColor }}
                  className="flex-shrink-0"
                />
                <span className="text-sm">
                  {footerData?.phone || '(555) 123-4567'}
                </span>
              </li>
              <li className="flex items-center gap-3 text-gray-400">
                <IoMail 
                  size={18} 
                  style={{ color: accentColor }}
                  className="flex-shrink-0"
                />
                <span className="text-sm">
                  {footerData?.email || 'info@sparktech.com'}
                </span>
              </li>
            </ul>
          </div>

          {/* Services */}
          <div className="space-y-6">
            <h4 className="text-lg font-semibold relative pb-3">
              Our Services
              <span 
                className="absolute bottom-0 left-0 w-12 h-0.5"
                style={{ backgroundColor: accentColor }}
              />
            </h4>
            <ul className="space-y-3">
              <li>
                <Link href="/interior" className="text-gray-400 hover:text-white transition-colors duration-300 flex items-center gap-2 group">
                  <span className="w-1.5 h-1.5 rounded-full transition-all duration-300 group-hover:w-3" style={{ backgroundColor: accentColor }} />
                  Interior
                </Link>
              </li>
              <li>
                <Link href="/exterior" className="text-gray-400 hover:text-white transition-colors duration-300 flex items-center gap-2 group">
                  <span className="w-1.5 h-1.5 rounded-full transition-all duration-300 group-hover:w-3" style={{ backgroundColor: accentColor }} />
                  Exterior
                </Link>
              </li>
              <li>
                <Link href="/lawn" className="text-gray-400 hover:text-white transition-colors duration-300 flex items-center gap-2 group">
                  <span className="w-1.5 h-1.5 rounded-full transition-all duration-300 group-hover:w-3" style={{ backgroundColor: accentColor }} />
                  Lawn & Garden
                </Link>
              </li>
              <li>
                <Link href="/allServices" className="text-gray-400 hover:text-white transition-colors duration-300 flex items-center gap-2 group">
                  <span className="w-1.5 h-1.5 rounded-full transition-all duration-300 group-hover:w-3" style={{ backgroundColor: accentColor }} />
                  Specialized & Other Services
                </Link>
              </li>
            </ul>
            <p className="text-gray-400 text-sm mt-4">
              Professional services for all your home improvement needs.
            </p>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-white/10">
        <div className="container mx-auto px-6 py-6">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-gray-400 text-sm text-center md:text-left">
              {footerData?.copyRightText || '© 2025 Sparktech. All rights reserved.'}
            </p>
            <div className="flex gap-6 text-sm">
              <Link href="/privacy-policy" className="text-gray-400 hover:text-white transition-colors">
                Privacy Policy
              </Link>
              <Link href="/terms-of-service" className="text-gray-400 hover:text-white transition-colors">
                Terms of Service
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
