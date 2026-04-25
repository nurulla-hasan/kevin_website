'use client';

import Image from 'next/image';
import logo from '@/assests/navLogo.png';
import Link from 'next/link';
import { Settings, Calendar, Hammer, Handshake } from 'lucide-react';
import { PiMapPinAreaBold } from 'react-icons/pi';
import { usePathname } from 'next/navigation';

const steps = [
  {
    icon: <PiMapPinAreaBold className="w-5 h-5 text-white" />,
    label: 'Enter your location',
    path: '/location',
  },
  {
    icon: <Settings className="w-5 h-5 text-white" />,
    label: 'Choose your service',
    path: '/chooseService',
  },
  { 
    icon: <Calendar className="w-5 h-5 text-white" />,
    label: 'Pick a time',
    path: '/time',
  },
  {
    icon: <Hammer className="w-5 h-5 text-white" />,
    label: 'Select a contractor',
    path: '/selectConstructor',
  },
  {
    icon: <Handshake className="w-5 h-5 text-white" />,
    label: 'Confirm',
    paths: ['/confirm', '/done'], // handle both routes
  },
];

const ServiceNav = () => {
  const pathname = usePathname();

  // Find the current step index
  const currentStepIndex = steps.findIndex(step => {
    if (step.paths) {
      return step.paths.includes(pathname);
    }
    return step.path === pathname;
  });

  // Add active status for all steps up to current
  const stepsWithActiveStatus = steps.map((step, index) => ({
    ...step,
    active: index <= currentStepIndex,
  }));

  return (
    <nav className="bg-card border-b border-border py-4 px-4 sm:px-6 lg:px-8 shadow-sm">
      <div className="container mx-auto flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
        {/* Logo */}
        <div className="flex justify-center lg:justify-start">
          <Link href="/">
            <Image
              src={logo}
              alt="Logo"
              width={200}
              height={100}
              className="h-12 w-auto sm:h-16"
              priority
            />
          </Link>
        </div>

        {/* Steps (Desktop) */}
        <div className="flex items-center overflow-x-auto gap-6 lg:gap-10 px-2">
          {stepsWithActiveStatus.map((step, index) => (
            <div key={index} className="flex items-center">
              <div className="flex flex-col items-center relative">
                <div
                  className={`w-10 h-10 rounded-full flex items-center justify-center ${
                    step.active ? 'bg-primary' : 'bg-muted'
                  }`}
                >
                  {step.icon}
                </div>
                <span
                  className={`mt-1 text-sm text-center whitespace-nowrap ${
                    step.active ? 'text-primary' : 'text-muted-foreground'
                  }`}
                >
                  {step.label}
                </span>
              </div>
              {index !== steps.length - 1 && (
                <div
                  className={`w-10 lg:w-16 h-px p-[2px] rounded-xl mx-2 ${
                    stepsWithActiveStatus[index].active &&
                    stepsWithActiveStatus[index + 1].active
                      ? 'bg-primary'
                      : 'bg-muted'
                  }`}
                ></div>
              )}
            </div>
          ))}
        </div>

        {/* Mobile Dots */}
        <div className="flex md:hidden justify-center space-x-2">
          {stepsWithActiveStatus.map((step, index) => (
            <div
              key={index}
              className={`w-3 h-3 rounded-full ${
                step.active ? 'bg-primary' : 'bg-muted'
              }`}
            />
          ))}
        </div>
      </div>
    </nav>
  );
};

export default ServiceNav;
