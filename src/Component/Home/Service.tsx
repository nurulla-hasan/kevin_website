/* eslint-disable @typescript-eslint/no-explicit-any */
'use client'
import Image from 'next/image'
import Link from 'next/link'
import handyman from '@/assests/handyman.png'
import landscaping from '@/assests/landscaping.png'
import plumbing from '@/assests/plumbing.png'
import electrical from '@/assests/electrical.png'
import remodeling from '@/assests/remodeling.png'

export default function Service({ setFilter }:{ setFilter: any; }) {
  const services = [
    { name: 'Handyman', img: handyman, value: 'handyman' },
    { name: 'Landscaping', img: landscaping, value: 'garden' },
    { name: 'Plumbing', img: plumbing, value: 'plumbing' },
    { name: 'Electrical', img: electrical, value: 'electrical' },
    { name: 'Remodeling', img: remodeling, value: 'remodeling' },
  ]

  return (
    <div className="bg-card max-w-7xl mx-auto border border-border shadow-xl rounded-xl mb-12 py-6 px-12 sm:px-8">
      <div className="flex flex-wrap justify-center items-center gap-x-2 md:gap-x-7 lg:gap-x-8 xl:gap-x-24 gap-y-6">
        {services.map((service, index) => (
          <div key={service.name} className="flex items-center">
            {/* Clickable service icon */}
            <button
              onClick={() => setFilter(service.value)}
              className="flex flex-col items-center text-primary hover:text-primary/80 transition-colors min-w-[80px] focus:outline-none"
            >
              <Image
                alt={service.name}
                src={service.img}
                width={64}
                height={64}
                className="w-16 h-16 transition-transform duration-150 hover:scale-105"
              />
              <span className="text-xs sm:text-sm font-semibold mt-2 text-center">
                {service.name}
              </span>
            </button>

            {/* Divider (not after the last one) */}
            {index < services.length - 1 && (
              <div className="hidden sm:block border-l border-primary h-10 mx-2"></div>
            )}
          </div>
        ))}
        <div className="hidden sm:block border-l border-primary h-10 mx-2"></div>
        {/* Browse all services button */}
        <Link href="/allServices">
          <button onClick={() => setFilter('')} className="bg-primary text-primary-foreground px-4 py-2 rounded-lg text-xs sm:text-sm font-medium whitespace-nowrap hover:bg-primary/90 transition-colors">
            All Services
          </button>
        </Link>
      </div>
    </div>
  )
}
