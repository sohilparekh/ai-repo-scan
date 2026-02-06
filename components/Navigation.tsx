'use client'

import React from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'

interface NavItem {
  label: string
  href: string
}

export default function Navigation() {
  const pathname = usePathname()
  
  const navItems: NavItem[] = [
    { label: 'Home', href: '/' },
    { label: 'Scan', href: '/scan' },
    { label: 'Analyze', href: '/analyze' }
  ]

  return (
    <nav className="bg-white shadow-sm border-b border-gray-200">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex space-x-8">
          {navItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className={`
                px-3 py-4 text-sm font-medium transition-colors
                ${pathname === item.href 
                  ? 'text-blue-600 border-b-2 border-blue-600' 
                  : 'text-gray-700 hover:text-gray-900 border-b-2 border-transparent hover:border-gray-300'
                }
              `}
            >
              {item.label}
            </Link>
          ))}
        </div>
      </div>
    </nav>
  )
}
