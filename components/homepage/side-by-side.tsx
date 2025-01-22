"use client";

import { Search, Handshake, TrendingUp } from 'lucide-react'
import { TITLE_TAILWIND_CLASS } from '@/utils/constants'
import { useState } from 'react'
import Image from 'next/image'
import { motion, AnimatePresence } from 'framer-motion'

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

const FeatureImage = ({ selectedFeature }: { selectedFeature: string }) => {
  const feature = features.find(f => f.name === selectedFeature)
  
  return (
    <div className="relative w-full h-full min-h-[400px]">
      <AnimatePresence mode="wait">
        <motion.div
          key={feature?.name}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          transition={{ duration: 0.3 }}
          className="absolute inset-0"
        >
          <Image
            src={feature?.image || features[0].image}
            alt={feature?.name || features[0].name}
            fill
            className="object-contain"
            priority
          />
        </motion.div>
      </AnimatePresence>
    </div>
  )
}

export default function SideBySide() {
  const [selectedFeature, setSelectedFeature] = useState(features[0].name)
  const currentFeature = features.find(f => f.name === selectedFeature)

  return (
    <div className="overflow-hidden">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="mx-auto grid max-w-2xl grid-cols-1 gap-x-8 gap-y-16 sm:gap-y-20 lg:mx-0 lg:max-w-none lg:grid-cols-2">
          <div className="lg:pr-8 lg:pt-4">
            <div className="lg:max-w-lg">
              <p className={`${TITLE_TAILWIND_CLASS} mt-2 font-semibold tracking-tight dark:text-white text-gray-900`}>
                SEO Scientist: Connecting You Effortlessly
              </p>
              <div className="h-24 relative">
                <AnimatePresence mode="wait">
                  <motion.p
                    key={selectedFeature}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    transition={{ duration: 0.2 }}
                    className="mt-6 leading-8 text-gray-600 dark:text-gray-400 absolute inset-0"
                  >
                    {currentFeature?.description}
                  </motion.p>
                </AnimatePresence>
              </div>
              <dl className="mt-10 max-w-xl leading-7 text-gray-600 lg:max-w-none flex flex-col">
                {features.map((feature) => (
                  <div 
                    key={feature.name} 
                    className={`relative pl-9 cursor-pointer transition-colors duration-200 group hover:text-signature ${
                      selectedFeature === feature.name ? 'text-signature' : ''
                    }`}
                    onClick={() => setSelectedFeature(feature.name)}
                  >
                    <div 
                      className={`absolute left-0 top-0 w-[2px] h-full bg-signature transform origin-top transition-transform duration-300 ${
                        selectedFeature === feature.name ? 'scale-y-100' : 'scale-y-0'
                      }`}
                    >
                      <div className={`absolute top-0 left-0 w-full h-full bg-gradient-to-b from-signature/50 to-signature animate-pulse ${
                        selectedFeature === feature.name ? 'opacity-100' : 'opacity-0'
                      }`} />
                    </div>
                    <dt className="inline-flex items-center py-3 font-semibold dark:text-gray-100 text-gray-900">
                      <feature.icon 
                        className={`absolute left-2.5 h-[18px] w-[18px] transition-colors duration-200 ${
                          selectedFeature === feature.name ? 'text-signature' : ''
                        }`} 
                        aria-hidden="true" 
                      />
                      <span className="ml-1">{feature.name}</span>
                    </dt>
                  </div>
                ))}
              </dl>
            </div>
          </div>
          <FeatureImage selectedFeature={selectedFeature} />
        </div>
      </div>
    </div>
  )
}
