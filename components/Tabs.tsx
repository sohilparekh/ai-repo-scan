'use client'

import React from 'react'

interface TabItem<T = string> {
  id: T
  label: string
  content: React.ReactNode
}

interface TabsProps<T = string> {
  tabs: TabItem<T>[]
  activeTab: T
  onTabChange: (tabId: T) => void
  className?: string
}

export default function Tabs<T = string>({ tabs, activeTab, onTabChange, className = '' }: TabsProps<T>) {
  const activeTabData = tabs.find(tab => tab.id === activeTab)

  return (
    <div className={className}>
      {/* Tab Navigation */}
      <div className="border-b border-gray-200">
        <nav className="-mb-px flex space-x-8">
          {tabs.map((tab) => (
            <button
              key={String(tab.id)}
              onClick={() => onTabChange(tab.id)}
              className={`
                py-2 px-1 border-b-2 font-medium text-sm transition-colors
                ${activeTab === tab.id
                  ? 'border-blue-500 text-blue-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                }
              `}
            >
              {tab.label}
            </button>
          ))}
        </nav>
      </div>

      {/* Tab Content */}
      <div className="mt-6">
        {activeTabData?.content}
      </div>
    </div>
  )
}
