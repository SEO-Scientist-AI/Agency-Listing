"use client"

import { Search, Handshake, TrendingUp } from 'lucide-react'
import { useState } from 'react'
import { TITLE_TAILWIND_CLASS } from '@/utils/constants'

const features = [
  {
    name: 'Seamless Listings',
    description: 'Easily list your agency or find the right service provider with powerful filters and user-friendly navigation, focusing on meaningful connections.',
    icon: Search,
    image: '/images/placeholder.svg'
  },
  {
    name: 'Effortless Connections',
    description: 'Eliminate repetitive tasks and focus on building impactful relationships effortlessly.',
    icon: Handshake,
    image: '/images/placeholder.svg'
  },
  {
    name: 'Ready for scale.',
    description: 'Ready for growth from day one with optimizations and scalable architecture, ensuring your application handles increased traffic.',
    icon: TrendingUp,
    image: '/images/placeholder.svg'
  },
]

export default function SideBySide() {
  const [selectedFeature, setSelectedFeature] = useState(features[0])

  return (
    <div className="overflow-hidden">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="mx-auto grid max-w-2xl grid-cols-1 gap-x-8 gap-y-16 sm:gap-y-20 lg:mx-0 lg:max-w-none lg:grid-cols-2">
          <div className="lg:pr-8">
            <div className="lg:max-w-lg">
              <p className={`${TITLE_TAILWIND_CLASS} mt-2 font-semibold tracking-tight dark:text-white text-gray-900`}>
                Find, Connect, and Scale with Top Agencies
              </p>
              <p className="mt-6 leading-8 text-gray-600 dark:text-gray-400">
                Experience a seamless journey from discovering the perfect agency to scaling your business success
              </p>
              <dl className="mt-10 max-w-xl space-y-8 leading-7 text-gray-600 lg:max-w-none">
                {features.map((feature) => (
                  <div 
                    key={feature.name} 
                    className={`relative pl-9 cursor-pointer transition-colors duration-200 ${
                      selectedFeature.name === feature.name 
                        ? 'dark:text-white text-black' 
                        : 'dark:text-gray-400 text-gray-600'
                    }`}
                    onClick={() => setSelectedFeature(feature)}
                  >
                    <dt className="inline font-semibold">
                      <feature.icon className="absolute left-1 top-1 h-5 w-5" aria-hidden="true" />
                      {feature.name}
                    </dt>{' '}
                    <dd className="inline">{feature.description}</dd>
                  </div>
                ))}
              </dl>
            </div>
          </div>
          <div className="relative w-full h-[400px] transition-all duration-500 ease-in-out mt-6">
            <img
              src={selectedFeature.image}
              alt={selectedFeature.name}
              className="object-cover rounded-lg w-full h-full mt-20"
            />
          </div>
        </div>
      </div>
    </div>
  )
}
