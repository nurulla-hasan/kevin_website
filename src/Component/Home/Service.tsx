/* eslint-disable @typescript-eslint/no-explicit-any */
'use client'
import Link from 'next/link'
import { Wrench, TreePine, Droplets, Zap, Home } from 'lucide-react'

export default function Service({ setFilter }:{ setFilter: any; }) {
  const services = [
    { name: 'Handyman', icon: Wrench, value: 'handyman' },
    { name: 'Landscaping', icon: TreePine, value: 'garden' },
    { name: 'Plumbing', icon: Droplets, value: 'plumbing' },
    { name: 'Electrical', icon: Zap, value: 'electrical' },
    { name: 'Remodeling', icon: Home, value: 'remodeling' },
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
              <service.icon
                className="w-12 h-12 sm:w-14 sm:h-14 transition-transform duration-150 hover:scale-105"
                strokeWidth={1.5}
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
