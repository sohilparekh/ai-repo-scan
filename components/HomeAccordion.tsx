'use client'

import React, { useState } from 'react'

interface HomeAccordionProps {
  title: string
  children: React.ReactNode
  defaultExpanded?: boolean
}

export default function HomeAccordion({ title, children, defaultExpanded = false }: HomeAccordionProps) {
  const [isExpanded, setIsExpanded] = useState(defaultExpanded)

  const toggleExpanded = () => {
    setIsExpanded(!isExpanded)
  }

  return (
    <div className="bg-white rounded-lg shadow-md mb-4">
      <button
        onClick={toggleExpanded}
        className="w-full px-6 py-4 text-left flex justify-between items-center hover:bg-gray-50 transition-colors rounded-t-lg"
      >
        <h2 className="text-xl font-semibold text-gray-900">{title}</h2>
        <svg
          className={`w-5 h-5 text-gray-600 transform transition-transform ${isExpanded ? 'rotate-180' : ''}`}
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
        </svg>
      </button>
      <div className={`overflow-hidden transition-all duration-300 ${isExpanded ? 'max-h-screen' : 'max-h-0'}`}>
        <div className="px-6 pb-4">
          {children}
        </div>
      </div>
    </div>
  )
}
