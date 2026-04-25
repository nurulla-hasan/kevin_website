'use client';

import Image from 'next/image';
import logo from '@/assests/navLogo.png';
import Link from 'next/link';
import { Hammer } from 'lucide-react';
import { BsCardHeading } from 'react-icons/bs';
import { FaLocationCrosshairs } from 'react-icons/fa6';
import { usePathname } from 'next/navigation';

const steps = [
  {
    icon: <FaLocationCrosshairs className="w-6 h-6" />,
    label: 'Details of your service',
    path: '/serviceDetails',
  },
  {
    icon: <BsCardHeading className="w-6 h-6" />,
    label: 'Details of you',
    path: '/yourDetails',
  },
  {
    icon: <Hammer className="w-6 h-6" />,
    label: 'Complete Setup',
    path: '/maxLead',
  },
];

const ContractorProNav = () => {
  const pathname = usePathname();
  const currentStepIndex = steps.findIndex(step => step.path === pathname);

  const stepsWithStatus = steps.map((step, index) => ({
    ...step,
    active: index === currentStepIndex,
    completed: index < currentStepIndex,
  }));

  return (
    <nav className="bg-white py-4 px-4 sm:px-6 lg:px-8 shadow-sm">
      <div className="container mx-auto flex flex-col gap-20 lg:flex-row">
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

        {/* Steps */}
        <div className="flex items-center gap-5 overflow-x-auto">
          {stepsWithStatus.map((step, index) => (
            <div key={index} className="flex items-center gap-4">
              {/* Icon with circle */}
              <div className="flex flex-col items-center text-center">
                <div
                  className={`
                    w-12 h-12 flex items-center justify-center rounded-full border
                    ${
                      step.active
                        ? 'bg-white text-blue-600 border-blue-600'
                        : step.completed
                        ? 'bg-blue-600 text-white border-blue-600'
                        : 'bg-gray-300 text-white border-gray-400'
                    }
                  `}
                >
                  {step.icon}
                </div>
                <span
                  className={`text-xs mt-1 text-center ${
                    step.active ? 'text-blue-600 font-medium' : 'text-gray-500'
                  }`}
                >
                  {step.label}
                </span>
              </div>

              {/* Divider */}
              {index !== steps.length - 1 && (
                <div
                  className={`w-12 md:w-44 -mt-3 h-0.5 ${
                    index < currentStepIndex ? 'bg-blue-600' : 'bg-gray-300'
                  }`}
                />
              )}
            </div>
          ))}
        </div>

        {/* Mobile Dots (optional) */}
        <div className="flex md:hidden justify-center space-x-2 mt-4">
          {stepsWithStatus.map((step, index) => (
            <div
              key={index}
              className={`w-3 h-3 rounded-full ${
                step.active || step.completed ? 'bg-blue-600' : 'bg-gray-400'
              }`}
            />
          ))}
        </div>
      </div>
    </nav>
  );
};

export default ContractorProNav;
