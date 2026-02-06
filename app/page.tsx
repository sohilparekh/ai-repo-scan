'use client'

import React, { useState } from 'react'
import Link from 'next/link'

export default function HomePage() {
  const [activeTab, setActiveTab] = useState('professional')
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50">
      {/* Hero Section */}
      <div className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-blue-600/10 to-purple-600/10"></div>
        <div className="relative max-w-7xl mx-auto px-6 py-4">
          <div className="text-center">
            <div className="inline-flex items-center gap-2 bg-white/80 backdrop-blur-sm px-4 py-2 rounded-full border border-gray-200 mb-2">
              <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
              <span className="text-sm font-medium text-gray-700">Available for opportunities</span>
            </div>
            
            <h1 className="text-5xl md:text-6xl font-bold text-gray-900 mb-2 tracking-tight">
              Hi, I&apos;m <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-purple-600">Sohil K Parekh</span>
            </h1>
            
            <p className="text-xl md:text-2xl text-gray-600 mb-4 max-w-3xl mx-auto leading-relaxed">
              Senior Technical Lead &amp; Full Stack Developer crafting scalable solutions with 12+ years of experience
            </p>
            
            <div className="flex flex-wrap justify-center gap-4 mb-4">
              <Link 
                href="/scan" 
                className="inline-flex items-center gap-2 bg-gradient-to-r from-blue-600 to-purple-600 text-white px-6 py-3 rounded-lg hover:shadow-lg transition-all duration-300 hover:scale-105"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" />
                </svg>
                Try Repository Scanner
              </Link>
              <a 
                href="mailto:sohilparekh89@gmail.com" 
                className="inline-flex items-center gap-2 bg-white text-gray-700 px-6 py-3 rounded-lg border border-gray-300 hover:shadow-lg transition-all duration-300 hover:scale-105"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
                Get in Touch
              </a>
            </div>

            <div className="flex justify-center gap-6 text-sm text-gray-500 mb-4">
              <div className="flex items-center gap-2">
                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M2 3a1 1 0 011-1h2.153a1 1 0 01.986.836l.74 4.435a1 1 0 01.54 1.06l1.548.773a11.037 11.037 0 006.105 2.002l1.548-.773a1 1 0 01.54 1.06l.74-4.435a1 1 0 01-.986-.836H3a1 1 0 01-1-1V3z"/>
                </svg>
                <span>+91 8237776046</span>
              </div>
              <div className="flex items-center gap-2">
                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z"/>
                </svg>
                <span>sohilparekh89@gmail.com</span>
              </div>
            </div>
          </div>
        </div>
      </div>

        {/* Main Content */}
      <div className="max-w-7xl mx-auto px-6 py-4">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
          {/* Main Content Area */}
          <div className="lg:col-span-2 space-y-2">
            {/* Introduction Section */}
            <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-4 hover:shadow-md transition-shadow">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-10 h-10 bg-gradient-to-r from-blue-500 to-purple-500 rounded-lg flex items-center justify-center">
                  <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                  </svg>
                </div>
                <h2 className="text-2xl font-bold text-gray-900">About Me</h2>
              </div>
              <p className="text-gray-600 leading-relaxed mb-4">
                With over 12+ years of experience in software development, I specialize in leading high-performing teams to deliver scalable, secure, and efficient solutions. Proficient in modern technologies like Electron, React, Angular, NodeJS, AWS, Docker and Jest and Jasmine for unit testing, I have a proven track record of building full-stack systems, microservices architectures, and cloud-based applications across SaaS, FinTech, and EdTech industries.
              </p>
              <p className="text-gray-600 leading-relaxed">
                Adept at bridging technical expertise with business goals, I thrive on driving innovation, mentoring teams, and ensuring optimal project delivery.
              </p>
            </div>

            {/* Work Experience */}
            <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-4 hover:shadow-md transition-shadow">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-10 h-10 bg-gradient-to-r from-green-500 to-emerald-500 rounded-lg flex items-center justify-center">
                  <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                  </svg>
                </div>
                <h2 className="text-2xl font-bold text-gray-900">Experience</h2>
              </div>
              
              <div className="space-y-2">
                <div className="relative pl-8 pb-6 border-l-2 border-gray-200 last:border-0">
                  <div className="absolute left-0 top-0 w-4 h-4 bg-blue-500 rounded-full -translate-x-1/2"></div>
                  <div className="flex flex-wrap items-start justify-between mb-2">
                    <h3 className="text-lg font-semibold text-gray-900">Sr Technical Lead</h3>
                    <span className="text-sm text-gray-500 bg-gray-100 px-3 py-1 rounded-full">April 2024 - Dec 2025</span>
                  </div>
                  <p className="text-gray-600 font-medium mb-2">MarkTine Technologies Pvt Ltd</p>
                  <ul className="text-gray-600 space-y-1 text-sm">
                    <li>• Managing teams and their tasks against multiple projects</li>
                    <li>• Architecting project and tech stack for different projects</li>
                    <li>• Ongoing SaaS application architecture handling billions of requests</li>
                    <li>• Desktop application development using Electron and React for Italy Government research project</li>
                  </ul>
                </div>
                
                <div className="relative pl-8 pb-6 border-l-2 border-gray-200 last:border-0">
                  <div className="absolute left-0 top-0 w-4 h-4 bg-purple-500 rounded-full -translate-x-1/2"></div>
                  <div className="flex flex-wrap items-start justify-between mb-2">
                    <h3 className="text-lg font-semibold text-gray-900">SDE - II</h3>
                    <span className="text-sm text-gray-500 bg-gray-100 px-3 py-1 rounded-full">July 2022 - March 2024</span>
                  </div>
                  <p className="text-gray-600 font-medium mb-2">MarkTine Technologies Pvt Ltd</p>
                  <ul className="text-gray-600 space-y-1 text-sm">
                    <li>• Requirements gathering and client communication</li>
                    <li>• Machine Learning Project: Quantum Energy Products</li>
                    <li>• Map-based project: Mars and Job Management Portal</li>
                    <li>• Led development of projects and maintained client relationships</li>
                  </ul>
                </div>

                <div className="relative pl-8 pb-6 border-l-2 border-gray-200 last:border-0">
                  <div className="absolute left-0 top-0 w-4 h-4 bg-green-500 rounded-full -translate-x-1/2"></div>
                  <div className="flex flex-wrap items-start justify-between mb-2">
                    <h3 className="text-lg font-semibold text-gray-900">Software Engineer</h3>
                    <span className="text-sm text-gray-500 bg-gray-100 px-3 py-1 rounded-full">March 2020 - June 2022</span>
                  </div>
                  <p className="text-gray-600 font-medium mb-2">HiddenBrains Infotech Pvt Ltd</p>
                  <ul className="text-gray-600 space-y-1 text-sm">
                    <li>• Requirements gathering and client communication</li>
                    <li>• Front-end development with Angular 11/12/13 and TypeScript</li>
                    <li>• Unit testing with Jasmine</li>
                    <li>• FinTech domain projects including credit score system for Saudi Arabia</li>
                  </ul>
                </div>

                <div className="relative pl-8 pb-6 border-l-2 border-gray-200 last:border-0">
                  <div className="absolute left-0 top-0 w-4 h-4 bg-orange-500 rounded-full -translate-x-1/2"></div>
                  <div className="flex flex-wrap items-start justify-between mb-2">
                    <h3 className="text-lg font-semibold text-gray-900">Sr. Software Engineer</h3>
                    <span className="text-sm text-gray-500 bg-gray-100 px-3 py-1 rounded-full">October 2016 - March 2020</span>
                  </div>
                  <p className="text-gray-600 font-medium mb-2">Solution Analysts Pvt Ltd</p>
                  <ul className="text-gray-600 space-y-1 text-sm">
                    <li>• Requirements gathering, team management, and task assignment</li>
                    <li>• Client communication and project management</li>
                    <li>• Multiple technologies: Ionic 4, Angular 7, NodeJS, AWS services</li>
                    <li>• Restaurant/Supplier Management Web/Mobile Application for Saudi Arabia client</li>
                  </ul>
                </div>

                <div className="relative pl-8 pb-6 border-l-2 border-gray-200 last:border-0">
                  <div className="absolute left-0 top-0 w-4 h-4 bg-red-500 rounded-full -translate-x-1/2"></div>
                  <div className="flex flex-wrap items-start justify-between mb-2">
                    <h3 className="text-lg font-semibold text-gray-900">Software Engineer</h3>
                    <span className="text-sm text-gray-500 bg-gray-100 px-3 py-1 rounded-full">June 2015 - September 2016</span>
                  </div>
                  <p className="text-gray-600 font-medium mb-2">CourseKart</p>
                  <ul className="text-gray-600 space-y-1 text-sm">
                    <li>• Website and mobile app support for product owners</li>
                    <li>• B2B clients management for USB application</li>
                    <li>• EduTech domain development</li>
                    <li>• Node Electron Desktop Application with data sync capabilities</li>
                  </ul>
                </div>

                <div className="relative pl-8 pb-6 border-l-2 border-gray-200 last:border-0">
                  <div className="absolute left-0 top-0 w-4 h-4 bg-indigo-500 rounded-full -translate-x-1/2"></div>
                  <div className="flex flex-wrap items-start justify-between mb-2">
                    <h3 className="text-lg font-semibold text-gray-900">Web Developer</h3>
                    <span className="text-sm text-gray-500 bg-gray-100 px-3 py-1 rounded-full">July 2014 - May 2015</span>
                  </div>
                  <p className="text-gray-600 font-medium mb-2">Webeasts</p>
                  <ul className="text-gray-600 space-y-1 text-sm">
                    <li>• Front-end and back-end WordPress development</li>
                    <li>• CSS, HTML, JS, jQuery and responsive design</li>
                    <li>• Various plugins for effects and device responsiveness</li>
                  </ul>
                </div>

                <div className="relative pl-8 pb-6 border-l-2 border-gray-200 last:border-0">
                  <div className="absolute left-0 top-0 w-4 h-4 bg-pink-500 rounded-full -translate-x-1/2"></div>
                  <div className="flex flex-wrap items-start justify-between mb-2">
                    <h3 className="text-lg font-semibold text-gray-900">Web Developer</h3>
                    <span className="text-sm text-gray-500 bg-gray-100 px-3 py-1 rounded-full">July 2013 - Feb 2014</span>
                  </div>
                  <p className="text-gray-600 font-medium mb-2">rtCamp Solutions Pvt Ltd</p>
                  <ul className="text-gray-600 space-y-1 text-sm">
                    <li>• Front-end and back-end WordPress development</li>
                    <li>• HTML, CSS, JS, jQuery, SASS with Compass framework</li>
                    <li>• Grunt JavaScript task runner</li>
                    <li>• Google Analytics integration</li>
                  </ul>
                </div>

                <div className="relative pl-8 pb-6 border-l-2 border-gray-200 last:border-0">
                  <div className="absolute left-0 top-0 w-4 h-4 bg-teal-500 rounded-full -translate-x-1/2"></div>
                  <div className="flex flex-wrap items-start justify-between mb-2">
                    <h3 className="text-lg font-semibold text-gray-900">Technology Associate</h3>
                    <span className="text-sm text-gray-500 bg-gray-100 px-3 py-1 rounded-full">Jan 2013 - June 2013</span>
                  </div>
                  <p className="text-gray-600 font-medium mb-2">TopTalent.in</p>
                  <ul className="text-gray-600 space-y-1 text-sm">
                    <li>• Site optimization and enhancement</li>
                    <li>• Application Tracking System development</li>
                    <li>• Job Post Pricing and LinkedIn Integration</li>
                    <li>• Technologies: HTML, CSS, jQuery, JavaScript, PHP, MySQL</li>
                  </ul>
                </div>
              </div>
            </div>

            {/* Projects */}
            <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-4 hover:shadow-md transition-shadow">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-10 h-10 bg-gradient-to-r from-orange-500 to-red-500 rounded-lg flex items-center justify-center">
                  <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z" />
                  </svg>
                </div>
                <h2 className="text-2xl font-bold text-gray-900">Projects</h2>
              </div>

              {/* Tabs */}
              <div className="flex gap-2 mb-6 bg-gray-100 p-1 rounded-lg">
                {['professional', 'freelance', 'academic'].map((tab) => (
                  <button
                    key={tab}
                    onClick={() => setActiveTab(tab)}
                    className={`flex-1 px-4 py-2 rounded-md text-sm font-medium transition-all ${
                      activeTab === tab
                        ? 'bg-white text-gray-900 shadow-sm'
                        : 'text-gray-600 hover:text-gray-900'
                    }`}
                  >
                    {tab.charAt(0).toUpperCase() + tab.slice(1)}
                  </button>
                ))}
              </div>

              {/* Professional Projects */}
              {activeTab === 'professional' && (
                <div className="space-y-2">
                  <div className="border border-gray-200 rounded-lg p-4 hover:border-blue-300 transition-colors">
                    <div className="flex items-start justify-between mb-2">
                      <h3 className="text-lg font-semibold text-gray-900">Text Editor</h3>
                      <span className="text-xs text-gray-500 bg-blue-100 px-2 py-1 rounded">March 2025 - Dec 2025</span>
                    </div>
                    <p className="text-gray-600 text-sm mb-3">Cross-platform scholarly text editor desktop app for Italy Government research project with advanced critical apparatus, annotation tools, and Word-like formatting</p>
                    <div className="flex flex-wrap gap-2">
                      <span className="text-xs bg-gray-100 text-gray-700 px-2 py-1 rounded">Electron</span>
                      <span className="text-xs bg-gray-100 text-gray-700 px-2 py-1 rounded">React</span>
                      <span className="text-xs bg-gray-100 text-gray-700 px-2 py-1 rounded">Tiptap</span>
                      <span className="text-xs bg-gray-100 text-gray-700 px-2 py-1 rounded">TailwindCSS</span>
                      <span className="text-xs bg-gray-100 text-gray-700 px-2 py-1 rounded">TypeScript</span>
                    </div>
                  </div>
                  
                  <div className="border border-gray-200 rounded-lg p-4 hover:border-blue-300 transition-colors">
                    <div className="flex items-start justify-between mb-2">
                      <h3 className="text-lg font-semibold text-gray-900">API Manager</h3>
                      <span className="text-xs text-gray-500 bg-blue-100 px-2 py-1 rounded">Jan 2024 - Feb 2025</span>
                    </div>
                    <p className="text-gray-600 text-sm mb-3">Comprehensive API management platform with AI-driven enhancements, API merging, and unified endpoints</p>
                    <div className="flex flex-wrap gap-2">
                      <span className="text-xs bg-gray-100 text-gray-700 px-2 py-1 rounded">React</span>
                      <span className="text-xs bg-gray-100 text-gray-700 px-2 py-1 rounded">TypeScript</span>
                      <span className="text-xs bg-gray-100 text-gray-700 px-2 py-1 rounded">Micro FE</span>
                      <span className="text-xs bg-gray-100 text-gray-700 px-2 py-1 rounded">Micro Service</span>
                      <span className="text-xs bg-gray-100 text-gray-700 px-2 py-1 rounded">Event Driven Architecture</span>
                      <span className="text-xs bg-gray-100 text-gray-700 px-2 py-1 rounded">Kafka</span>
                      <span className="text-xs bg-gray-100 text-gray-700 px-2 py-1 rounded">Docker</span>
                      <span className="text-xs bg-gray-100 text-gray-700 px-2 py-1 rounded">Redis</span>
                      <span className="text-xs bg-gray-100 text-gray-700 px-2 py-1 rounded">TurboRepo</span>
                      <span className="text-xs bg-gray-100 text-gray-700 px-2 py-1 rounded">MongoDB</span>
                      <span className="text-xs bg-gray-100 text-gray-700 px-2 py-1 rounded">Express</span>
                      <span className="text-xs bg-gray-100 text-gray-700 px-2 py-1 rounded">NextJS</span>
                      <span className="text-xs bg-gray-100 text-gray-700 px-2 py-1 rounded">NodeJS</span>
                      <span className="text-xs bg-gray-100 text-gray-700 px-2 py-1 rounded">AWS</span>
                    </div>
                  </div>

                  <div className="border border-gray-200 rounded-lg p-4 hover:border-blue-300 transition-colors">
                    <div className="flex items-start justify-between mb-2">
                      <h3 className="text-lg font-semibold text-gray-900">Content Management System</h3>
                      <span className="text-xs text-gray-500 bg-blue-100 px-2 py-1 rounded">Jan 2024 - Feb 2025</span>
                    </div>
                    <p className="text-gray-600 text-sm mb-3">Robust CMS platform with Server-Side Rendering (SSR) using NextJS, FAQ library, theme publishing, and copy script functionality</p>
                    <div className="flex flex-wrap gap-2">
                      <span className="text-xs bg-gray-100 text-gray-700 px-2 py-1 rounded">React</span>
                      <span className="text-xs bg-gray-100 text-gray-700 px-2 py-1 rounded">TypeScript</span>
                      <span className="text-xs bg-gray-100 text-gray-700 px-2 py-1 rounded">Micro FE</span>
                      <span className="text-xs bg-gray-100 text-gray-700 px-2 py-1 rounded">Micro Service</span>
                      <span className="text-xs bg-gray-100 text-gray-700 px-2 py-1 rounded">Event Driven Architecture</span>
                      <span className="text-xs bg-gray-100 text-gray-700 px-2 py-1 rounded">Kafka</span>
                      <span className="text-xs bg-gray-100 text-gray-700 px-2 py-1 rounded">Docker</span>
                      <span className="text-xs bg-gray-100 text-gray-700 px-2 py-1 rounded">Redis</span>
                      <span className="text-xs bg-gray-100 text-gray-700 px-2 py-1 rounded">TurboRepo</span>
                      <span className="text-xs bg-gray-100 text-gray-700 px-2 py-1 rounded">MongoDB</span>
                      <span className="text-xs bg-gray-100 text-gray-700 px-2 py-1 rounded">Express</span>
                      <span className="text-xs bg-gray-100 text-gray-700 px-2 py-1 rounded">NextJS</span>
                      <span className="text-xs bg-gray-100 text-gray-700 px-2 py-1 rounded">NodeJS</span>
                      <span className="text-xs bg-gray-100 text-gray-700 px-2 py-1 rounded">AWS</span>
                    </div>
                  </div>

                  <div className="border border-gray-200 rounded-lg p-4 hover:border-blue-300 transition-colors">
                    <div className="flex items-start justify-between mb-2">
                      <h3 className="text-lg font-semibold text-gray-900">File Manager</h3>
                      <span className="text-xs text-gray-500 bg-blue-100 px-2 py-1 rounded">Jan 2024 - Feb 2025</span>
                    </div>
                    <p className="text-gray-600 text-sm mb-3">Powerful file management application with folderized structure, secure sharing, permissions management, and infinite scroll</p>
                    <div className="flex flex-wrap gap-2">
                      <span className="text-xs bg-gray-100 text-gray-700 px-2 py-1 rounded">React</span>
                      <span className="text-xs bg-gray-100 text-gray-700 px-2 py-1 rounded">TypeScript</span>
                      <span className="text-xs bg-gray-100 text-gray-700 px-2 py-1 rounded">Micro FE</span>
                      <span className="text-xs bg-gray-100 text-gray-700 px-2 py-1 rounded">Micro Service</span>
                      <span className="text-xs bg-gray-100 text-gray-700 px-2 py-1 rounded">Event Driven Architecture</span>
                      <span className="text-xs bg-gray-100 text-gray-700 px-2 py-1 rounded">Kafka</span>
                      <span className="text-xs bg-gray-100 text-gray-700 px-2 py-1 rounded">Docker</span>
                      <span className="text-xs bg-gray-100 text-gray-700 px-2 py-1 rounded">Redis</span>
                      <span className="text-xs bg-gray-100 text-gray-700 px-2 py-1 rounded">TurboRepo</span>
                      <span className="text-xs bg-gray-100 text-gray-700 px-2 py-1 rounded">MongoDB</span>
                      <span className="text-xs bg-gray-100 text-gray-700 px-2 py-1 rounded">Express</span>
                      <span className="text-xs bg-gray-100 text-gray-700 px-2 py-1 rounded">NextJS</span>
                      <span className="text-xs bg-gray-100 text-gray-700 px-2 py-1 rounded">NodeJS</span>
                      <span className="text-xs bg-gray-100 text-gray-700 px-2 py-1 rounded">AWS</span>
                    </div>
                  </div>

                  <div className="border border-gray-200 rounded-lg p-4 hover:border-blue-300 transition-colors">
                    <div className="flex items-start justify-between mb-2">
                      <h3 className="text-lg font-semibold text-gray-900">CRM</h3>
                      <span className="text-xs text-gray-500 bg-blue-100 px-2 py-1 rounded">Jan 2024 - Feb 2025</span>
                    </div>
                    <p className="text-gray-600 text-sm mb-3">Custom CRM solution with instant messaging, campaign management, content management, and chatbot to replace costly Zoho CRM</p>
                    <div className="flex flex-wrap gap-2">
                      <span className="text-xs bg-gray-100 text-gray-700 px-2 py-1 rounded">React</span>
                      <span className="text-xs bg-gray-100 text-gray-700 px-2 py-1 rounded">TypeScript</span>
                      <span className="text-xs bg-gray-100 text-gray-700 px-2 py-1 rounded">Micro FE</span>
                      <span className="text-xs bg-gray-100 text-gray-700 px-2 py-1 rounded">Micro Service</span>
                      <span className="text-xs bg-gray-100 text-gray-700 px-2 py-1 rounded">Event Driven Architecture</span>
                      <span className="text-xs bg-gray-100 text-gray-700 px-2 py-1 rounded">Kafka</span>
                      <span className="text-xs bg-gray-100 text-gray-700 px-2 py-1 rounded">Docker</span>
                      <span className="text-xs bg-gray-100 text-gray-700 px-2 py-1 rounded">Redis</span>
                      <span className="text-xs bg-gray-100 text-gray-700 px-2 py-1 rounded">TurboRepo</span>
                      <span className="text-xs bg-gray-100 text-gray-700 px-2 py-1 rounded">MongoDB</span>
                      <span className="text-xs bg-gray-100 text-gray-700 px-2 py-1 rounded">Express</span>
                      <span className="text-xs bg-gray-100 text-gray-700 px-2 py-1 rounded">NextJS</span>
                      <span className="text-xs bg-gray-100 text-gray-700 px-2 py-1 rounded">NodeJS</span>
                      <span className="text-xs bg-gray-100 text-gray-700 px-2 py-1 rounded">AWS</span>
                    </div>
                  </div>

                  <div className="border border-gray-200 rounded-lg p-4 hover:border-blue-300 transition-colors">
                    <div className="flex items-start justify-between mb-2">
                      <h3 className="text-lg font-semibold text-gray-900">Jobs Management Portal</h3>
                      <span className="text-xs text-gray-500 bg-blue-100 px-2 py-1 rounded">Jan 2023 - Dec 2023</span>
                    </div>
                    <p className="text-gray-600 text-sm mb-3">Job seeker and agency portal with resume parsing, regional access, and admin management for MBO Partners</p>
                    <div className="flex flex-wrap gap-2">
                      <span className="text-xs bg-gray-100 text-gray-700 px-2 py-1 rounded">HTML</span>
                      <span className="text-xs bg-gray-100 text-gray-700 px-2 py-1 rounded">CSS</span>
                      <span className="text-xs bg-gray-100 text-gray-700 px-2 py-1 rounded">Angular</span>
                      <span className="text-xs bg-gray-100 text-gray-700 px-2 py-1 rounded">TypeScript</span>
                      <span className="text-xs bg-gray-100 text-gray-700 px-2 py-1 rounded">JavaScript</span>
                      <span className="text-xs bg-gray-100 text-gray-700 px-2 py-1 rounded">Okta</span>
                      <span className="text-xs bg-gray-100 text-gray-700 px-2 py-1 rounded">Ngx-bootstrap</span>
                      <span className="text-xs bg-gray-100 text-gray-700 px-2 py-1 rounded">Python (BE)</span>
                      <span className="text-xs bg-gray-100 text-gray-700 px-2 py-1 rounded">MFE</span>
                      <span className="text-xs bg-gray-100 text-gray-700 px-2 py-1 rounded">Azure App Services</span>
                      <span className="text-xs bg-gray-100 text-gray-700 px-2 py-1 rounded">Azure Active Directory</span>
                      <span className="text-xs bg-gray-100 text-gray-700 px-2 py-1 rounded">Azure Storage Accounts</span>
                      <span className="text-xs bg-gray-100 text-gray-700 px-2 py-1 rounded">Azure Resource Groups</span>
                    </div>
                  </div>

                  <div className="border border-gray-200 rounded-lg p-4 hover:border-blue-300 transition-colors">
                    <div className="flex items-start justify-between mb-2">
                      <h3 className="text-lg font-semibold text-gray-900">Global Landing Page - Mars</h3>
                      <span className="text-xs text-gray-500 bg-blue-100 px-2 py-1 rounded">Oct 2022 - May 2023</span>
                    </div>
                    <p className="text-gray-600 text-sm mb-3">Unified landing page solution for Mars company with single URL access and simplified user management</p>
                    <div className="flex flex-wrap gap-2">
                      <span className="text-xs bg-gray-100 text-gray-700 px-2 py-1 rounded">HTML</span>
                      <span className="text-xs bg-gray-100 text-gray-700 px-2 py-1 rounded">CSS</span>
                      <span className="text-xs bg-gray-100 text-gray-700 px-2 py-1 rounded">Angular</span>
                      <span className="text-xs bg-gray-100 text-gray-700 px-2 py-1 rounded">TypeScript</span>
                      <span className="text-xs bg-gray-100 text-gray-700 px-2 py-1 rounded">JavaScript</span>
                      <span className="text-xs bg-gray-100 text-gray-700 px-2 py-1 rounded">Ngx-bootstrap</span>
                      <span className="text-xs bg-gray-100 text-gray-700 px-2 py-1 rounded">Python (BE)</span>
                      <span className="text-xs bg-gray-100 text-gray-700 px-2 py-1 rounded">Leaflet Map</span>
                      <span className="text-xs bg-gray-100 text-gray-700 px-2 py-1 rounded">Azure App Services</span>
                      <span className="text-xs bg-gray-100 text-gray-700 px-2 py-1 rounded">Azure Active Directory</span>
                      <span className="text-xs bg-gray-100 text-gray-700 px-2 py-1 rounded">Azure Storage Accounts</span>
                      <span className="text-xs bg-gray-100 text-gray-700 px-2 py-1 rounded">Azure Resource Groups</span>
                      <span className="text-xs bg-gray-100 text-gray-700 px-2 py-1 rounded">MSAL</span>
                    </div>
                  </div>

                  <div className="border border-gray-200 rounded-lg p-4 hover:border-blue-300 transition-colors">
                    <div className="flex items-start justify-between mb-2">
                      <h3 className="text-lg font-semibold text-gray-900">Quantum Energy Partners</h3>
                      <span className="text-xs text-gray-500 bg-blue-100 px-2 py-1 rounded">April 2022 - Oct 2022</span>
                    </div>
                    <p className="text-gray-600 text-sm mb-3">Web application for DAG creation with AI-powered insights and model evaluation for scientists/researchers</p>
                    <div className="flex flex-wrap gap-2">
                      <span className="text-xs bg-gray-100 text-gray-700 px-2 py-1 rounded">HTML</span>
                      <span className="text-xs bg-gray-100 text-gray-700 px-2 py-1 rounded">CSS</span>
                      <span className="text-xs bg-gray-100 text-gray-700 px-2 py-1 rounded">Angular</span>
                      <span className="text-xs bg-gray-100 text-gray-700 px-2 py-1 rounded">TypeScript</span>
                      <span className="text-xs bg-gray-100 text-gray-700 px-2 py-1 rounded">JavaScript</span>
                      <span className="text-xs bg-gray-100 text-gray-700 px-2 py-1 rounded">Ngx-Graph</span>
                      <span className="text-xs bg-gray-100 text-gray-700 px-2 py-1 rounded">Ngx-bootstrap</span>
                      <span className="text-xs bg-gray-100 text-gray-700 px-2 py-1 rounded">Python (BE)</span>
                      <span className="text-xs bg-gray-100 text-gray-700 px-2 py-1 rounded">Azure App Services</span>
                      <span className="text-xs bg-gray-100 text-gray-700 px-2 py-1 rounded">Azure Active Directory</span>
                      <span className="text-xs bg-gray-100 text-gray-700 px-2 py-1 rounded">Azure Storage Accounts</span>
                      <span className="text-xs bg-gray-100 text-gray-700 px-2 py-1 rounded">Azure Resource Groups</span>
                    </div>
                  </div>

                  <div className="border border-gray-200 rounded-lg p-4 hover:border-blue-300 transition-colors">
                    <div className="flex items-start justify-between mb-2">
                      <h3 className="text-lg font-semibold text-gray-900">iTable</h3>
                      <span className="text-xs text-gray-500 bg-blue-100 px-2 py-1 rounded">Jan 2017 - March 2020</span>
                    </div>
                    <p className="text-gray-600 text-sm mb-3">Restaurant management system with order tracking, inventory management, supplier management, and punch-in/punch-out functionality</p>
                    <div className="flex flex-wrap gap-2">
                      <span className="text-xs bg-gray-100 text-gray-700 px-2 py-1 rounded">HTML</span>
                      <span className="text-xs bg-gray-100 text-gray-700 px-2 py-1 rounded">CSS</span>
                      <span className="text-xs bg-gray-100 text-gray-700 px-2 py-1 rounded">Angular</span>
                      <span className="text-xs bg-gray-100 text-gray-700 px-2 py-1 rounded">TypeScript</span>
                      <span className="text-xs bg-gray-100 text-gray-700 px-2 py-1 rounded">MySQL</span>
                      <span className="text-xs bg-gray-100 text-gray-700 px-2 py-1 rounded">AWS Lambda</span>
                      <span className="text-xs bg-gray-100 text-gray-700 px-2 py-1 rounded">AWS EC2</span>
                      <span className="text-xs bg-gray-100 text-gray-700 px-2 py-1 rounded">AWS S3</span>
                      <span className="text-xs bg-gray-100 text-gray-700 px-2 py-1 rounded">AWS RDS</span>
                      <span className="text-xs bg-gray-100 text-gray-700 px-2 py-1 rounded">AWS ElasticSearch</span>
                      <span className="text-xs bg-gray-100 text-gray-700 px-2 py-1 rounded">Redis</span>
                      <span className="text-xs bg-gray-100 text-gray-700 px-2 py-1 rounded">AWS IAM</span>
                      <span className="text-xs bg-gray-100 text-gray-700 px-2 py-1 rounded">Socket IO</span>
                      <span className="text-xs bg-gray-100 text-gray-700 px-2 py-1 rounded">NodeJS</span>
                    </div>
                  </div>
                </div>
              )}

              {/* Freelance Projects */}
              {activeTab === 'freelance' && (
                <div className="space-y-2">
                  <div className="border border-gray-200 rounded-lg p-4 hover:border-blue-300 transition-colors">
                    <div className="flex items-start justify-between mb-2">
                      <h3 className="text-lg font-semibold text-gray-900">YTFeeds</h3>
                      <span className="text-xs text-gray-500 bg-green-100 px-2 py-1 rounded">March 2014 - June 2014</span>
                    </div>
                    <p className="text-gray-600 text-sm mb-3">WordPress plugin for sharing YouTube videos on channels with PHP, YouTube API & MySQL database</p>
                    <div className="flex flex-wrap gap-2">
                      <span className="text-xs bg-gray-100 text-gray-700 px-2 py-1 rounded">PHP</span>
                      <span className="text-xs bg-gray-100 text-gray-700 px-2 py-1 rounded">YouTube API</span>
                      <span className="text-xs bg-gray-100 text-gray-700 px-2 py-1 rounded">MySQL</span>
                      <span className="text-xs bg-gray-100 text-gray-700 px-2 py-1 rounded">WordPress</span>
                    </div>
                  </div>

                  <div className="border border-gray-200 rounded-lg p-4 hover:border-blue-300 transition-colors">
                    <div className="flex items-start justify-between mb-2">
                      <h3 className="text-lg font-semibold text-gray-900">Order Management System</h3>
                      <span className="text-xs text-gray-500 bg-green-100 px-2 py-1 rounded">March 2014 - June 2014</span>
                    </div>
                    <p className="text-gray-600 text-sm mb-3">WordPress WooCommerce add-on for managing orders with Google Drive API integration and AJAX functionality</p>
                    <div className="flex flex-wrap gap-2">
                      <span className="text-xs bg-gray-100 text-gray-700 px-2 py-1 rounded">PHP</span>
                      <span className="text-xs bg-gray-100 text-gray-700 px-2 py-1 rounded">Google Drive API</span>
                      <span className="text-xs bg-gray-100 text-gray-700 px-2 py-1 rounded">MySQL</span>
                      <span className="text-xs bg-gray-100 text-gray-700 px-2 py-1 rounded">WooCommerce</span>
                    </div>
                  </div>

                  <div className="border border-gray-200 rounded-lg p-4 hover:border-blue-300 transition-colors">
                    <div className="flex items-start justify-between mb-2">
                      <h3 className="text-lg font-semibold text-gray-900">Photo Slider</h3>
                      <span className="text-xs text-gray-500 bg-green-100 px-2 py-1 rounded">March 2014 - June 2014</span>
                    </div>
                    <p className="text-gray-600 text-sm mb-3">Facebook application for sliding images in carousel with PHP, Facebook API & MySQL database</p>
                    <div className="flex flex-wrap gap-2">
                      <span className="text-xs bg-gray-100 text-gray-700 px-2 py-1 rounded">PHP</span>
                      <span className="text-xs bg-gray-100 text-gray-700 px-2 py-1 rounded">Facebook API</span>
                      <span className="text-xs bg-gray-100 text-gray-700 px-2 py-1 rounded">MySQL</span>
                    </div>
                  </div>

                  <div className="border border-gray-200 rounded-lg p-4 hover:border-blue-300 transition-colors">
                    <div className="flex items-start justify-between mb-2">
                      <h3 className="text-lg font-semibold text-gray-900">Whether Forecast</h3>
                      <span className="text-xs text-gray-500 bg-green-100 px-2 py-1 rounded">March 2014 - June 2014</span>
                    </div>
                    <p className="text-gray-600 text-sm mb-3">Weather forecast application using AngularJS, HTML, CSS without page reload for multiple cities</p>
                    <div className="flex flex-wrap gap-2">
                      <span className="text-xs bg-gray-100 text-gray-700 px-2 py-1 rounded">AngularJS</span>
                      <span className="text-xs bg-gray-100 text-gray-700 px-2 py-1 rounded">HTML</span>
                      <span className="text-xs bg-gray-100 text-gray-700 px-2 py-1 rounded">CSS</span>
                    </div>
                  </div>
                </div>
              )}

              {/* Academic Projects */}
              {activeTab === 'academic' && (
                <div className="space-y-2">
                  <div className="border border-gray-200 rounded-lg p-4 hover:border-blue-300 transition-colors">
                    <div className="flex items-start justify-between mb-2">
                      <h3 className="text-lg font-semibold text-gray-900">E-Voting System</h3>
                      <span className="text-xs text-gray-500 bg-purple-100 px-2 py-1 rounded">Academic</span>
                    </div>
                    <p className="text-gray-600 text-sm mb-3">E-voting system for DA-IICT committees</p>
                    <div className="flex flex-wrap gap-2">
                      <span className="text-xs bg-gray-100 text-gray-700 px-2 py-1 rounded">Java</span>
                      <span className="text-xs bg-gray-100 text-gray-700 px-2 py-1 rounded">MySQL</span>
                      <span className="text-xs bg-gray-100 text-gray-700 px-2 py-1 rounded">JSP</span>
                    </div>
                  </div>

                  <div className="border border-gray-200 rounded-lg p-4 hover:border-blue-300 transition-colors">
                    <div className="flex items-start justify-between mb-2">
                      <h3 className="text-lg font-semibold text-gray-900">Library Management System</h3>
                      <span className="text-xs text-gray-500 bg-purple-100 px-2 py-1 rounded">Academic</span>
                    </div>
                    <p className="text-gray-600 text-sm mb-3">Complete library management system with inventory tracking</p>
                    <div className="flex flex-wrap gap-2">
                      <span className="text-xs bg-gray-100 text-gray-700 px-2 py-1 rounded">Java</span>
                      <span className="text-xs bg-gray-100 text-gray-700 px-2 py-1 rounded">MySQL</span>
                      <span className="text-xs bg-gray-100 text-gray-700 px-2 py-1 rounded">Swing</span>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Sidebar */}
          <div className="space-y-2">
            {/* Skills */}
            <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-4 hover:shadow-md transition-shadow">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-8 h-8 bg-gradient-to-r from-indigo-500 to-blue-500 rounded-lg flex items-center justify-center">
                  <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
                  </svg>
                </div>
                <h3 className="text-lg font-bold text-gray-900">Skills</h3>
              </div>
              
              <div className="space-y-2">
                <div>
                  <h4 className="text-sm font-semibold text-gray-700 mb-2">Web Technology</h4>
                  <div className="flex flex-wrap gap-1">
                    <span className="text-xs bg-blue-50 text-blue-700 px-2 py-1 rounded">HTML5</span>
                    <span className="text-xs bg-blue-50 text-blue-700 px-2 py-1 rounded">CSS3</span>
                    <span className="text-xs bg-blue-50 text-blue-700 px-2 py-1 rounded">JavaScript</span>
                    <span className="text-xs bg-blue-50 text-blue-700 px-2 py-1 rounded">XML</span>
                    <span className="text-xs bg-blue-50 text-blue-700 px-2 py-1 rounded">AJAX</span>
                  </div>
                </div>
                
                <div>
                  <h4 className="text-sm font-semibold text-gray-700 mb-2">JavaScript Framework</h4>
                  <div className="flex flex-wrap gap-1">
                    <span className="text-xs bg-blue-50 text-blue-700 px-2 py-1 rounded">Angular 16</span>
                    <span className="text-xs bg-blue-50 text-blue-700 px-2 py-1 rounded">jQuery</span>
                    <span className="text-xs bg-blue-50 text-blue-700 px-2 py-1 rounded">NodeJS</span>
                    <span className="text-xs bg-blue-50 text-blue-700 px-2 py-1 rounded">React</span>
                    <span className="text-xs bg-blue-50 text-blue-700 px-2 py-1 rounded">TypeScript</span>
                    <span className="text-xs bg-blue-50 text-blue-700 px-2 py-1 rounded">Vue (Learning)</span>
                    <span className="text-xs bg-blue-50 text-blue-700 px-2 py-1 rounded">NextJS</span>
                    <span className="text-xs bg-blue-50 text-blue-700 px-2 py-1 rounded">NgRx</span>
                    <span className="text-xs bg-blue-50 text-blue-700 px-2 py-1 rounded">RxJS</span>
                    <span className="text-xs bg-blue-50 text-blue-700 px-2 py-1 rounded">Jest</span>
                  </div>
                </div>
                
                <div>
                  <h4 className="text-sm font-semibold text-gray-700 mb-2">Cloud Technology</h4>
                  <div className="flex flex-wrap gap-1">
                    <span className="text-xs bg-purple-50 text-purple-700 px-2 py-1 rounded">AWS EC2</span>
                    <span className="text-xs bg-purple-50 text-purple-700 px-2 py-1 rounded">AWS S3</span>
                    <span className="text-xs bg-purple-50 text-purple-700 px-2 py-1 rounded">Elastic Search</span>
                    <span className="text-xs bg-purple-50 text-purple-700 px-2 py-1 rounded">Load Balancing</span>
                    <span className="text-xs bg-purple-50 text-purple-700 px-2 py-1 rounded">Lambda</span>
                    <span className="text-xs bg-purple-50 text-purple-700 px-2 py-1 rounded">IAM</span>
                    <span className="text-xs bg-purple-50 text-purple-700 px-2 py-1 rounded">RDBMS</span>
                    <span className="text-xs bg-purple-50 text-purple-700 px-2 py-1 rounded">Code Pipeline</span>
                    <span className="text-xs bg-purple-50 text-purple-700 px-2 py-1 rounded">ElastiCache</span>
                    <span className="text-xs bg-purple-50 text-purple-700 px-2 py-1 rounded">Kafka</span>
                    <span className="text-xs bg-purple-50 text-purple-700 px-2 py-1 rounded">Redis</span>
                    <span className="text-xs bg-purple-50 text-purple-700 px-2 py-1 rounded">Azure App Services</span>
                    <span className="text-xs bg-purple-50 text-purple-700 px-2 py-1 rounded">Azure Active Directory</span>
                    <span className="text-xs bg-purple-50 text-purple-700 px-2 py-1 rounded">Azure Storage Accounts</span>
                    <span className="text-xs bg-purple-50 text-purple-700 px-2 py-1 rounded">Azure Resource Groups</span>
                    <span className="text-xs bg-purple-50 text-purple-700 px-2 py-1 rounded">Socket IO</span>
                  </div>
                </div>
                
                <div>
                  <h4 className="text-sm font-semibold text-gray-700 mb-2">Database</h4>
                  <div className="flex flex-wrap gap-1">
                    <span className="text-xs bg-green-50 text-green-700 px-2 py-1 rounded">MongoDB</span>
                    <span className="text-xs bg-green-50 text-green-700 px-2 py-1 rounded">MySQL</span>
                    <span className="text-xs bg-green-50 text-green-700 px-2 py-1 rounded">ORACLE</span>
                    <span className="text-xs bg-green-50 text-green-700 px-2 py-1 rounded">MSSQL</span>
                  </div>
                </div>
                
                <div>
                  <h4 className="text-sm font-semibold text-gray-700 mb-2">DevOps & Tools</h4>
                  <div className="flex flex-wrap gap-1">
                    <span className="text-xs bg-orange-50 text-orange-700 px-2 py-1 rounded">Docker</span>
                    <span className="text-xs bg-orange-50 text-orange-700 px-2 py-1 rounded">Visual Studio Code</span>
                    <span className="text-xs bg-orange-50 text-orange-700 px-2 py-1 rounded">Xampp</span>
                    <span className="text-xs bg-orange-50 text-orange-700 px-2 py-1 rounded">WAMP</span>
                    <span className="text-xs bg-orange-50 text-orange-700 px-2 py-1 rounded">LAMP</span>
                    <span className="text-xs bg-orange-50 text-orange-700 px-2 py-1 rounded">UML</span>
                    <span className="text-xs bg-orange-50 text-orange-700 px-2 py-1 rounded">Design Patterns</span>
                  </div>
                </div>
                
                <div>
                  <h4 className="text-sm font-semibold text-gray-700 mb-2">Other Technologies</h4>
                  <div className="flex flex-wrap gap-1">
                    <span className="text-xs bg-gray-50 text-gray-700 px-2 py-1 rounded">PHP</span>
                    <span className="text-xs bg-gray-50 text-gray-700 px-2 py-1 rounded">Laravel</span>
                    <span className="text-xs bg-gray-50 text-gray-700 px-2 py-1 rounded">Python</span>
                    <span className="text-xs bg-gray-50 text-gray-700 px-2 py-1 rounded">SASS</span>
                    <span className="text-xs bg-gray-50 text-gray-700 px-2 py-1 rounded">Google Maps</span>
                    <span className="text-xs bg-gray-50 text-gray-700 px-2 py-1 rounded">Leaflet Maps</span>
                    <span className="text-xs bg-gray-50 text-gray-700 px-2 py-1 rounded">WebRTC</span>
                    <span className="text-xs bg-gray-50 text-gray-700 px-2 py-1 rounded">Twilio</span>
                    <span className="text-xs bg-gray-50 text-gray-700 px-2 py-1 rounded">Ionic 4</span>
                    <span className="text-xs bg-gray-50 text-gray-700 px-2 py-1 rounded">React Native (Learning)</span>
                    <span className="text-xs bg-gray-50 text-gray-700 px-2 py-1 rounded">Google APIs</span>
                    <span className="text-xs bg-gray-50 text-gray-700 px-2 py-1 rounded">Facebook API</span>
                    <span className="text-xs bg-gray-50 text-gray-700 px-2 py-1 rounded">Twitter API</span>
                    <span className="text-xs bg-gray-50 text-gray-700 px-2 py-1 rounded">LinkedIn API</span>
                    <span className="text-xs bg-gray-50 text-gray-700 px-2 py-1 rounded">Nation Builder API</span>
                    <span className="text-xs bg-gray-50 text-gray-700 px-2 py-1 rounded">Campaign Monitor API</span>
                    <span className="text-xs bg-gray-50 text-gray-700 px-2 py-1 rounded">Zoho API</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Education */}
            <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-4 hover:shadow-md transition-shadow">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-8 h-8 bg-gradient-to-r from-yellow-500 to-orange-500 rounded-lg flex items-center justify-center">
                  <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 14l9-5-9-5-9 5 9 5z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 14l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0012 20.055a11.952 11.952 0 00-6.824-2.998 12.078 12.078 0 01.665-6.479L12 14z" />
                  </svg>
                </div>
                <h3 className="text-lg font-bold text-gray-900">Education</h3>
              </div>
              
              <div className="space-y-2">
                <div className="pb-3 border-b border-gray-100 last:border-0">
                  <h4 className="font-semibold text-gray-900">M.Sc. (IT)</h4>
                  <p className="text-sm text-gray-600">DAIICT</p>
                  <p className="text-xs text-gray-500">2013 • CPI: 6.33</p>
                </div>
                
                <div className="pb-3 border-b border-gray-100 last:border-0">
                  <h4 className="font-semibold text-gray-900">BCA</h4>
                  <p className="text-sm text-gray-600">Virani Science College, Rajkot</p>
                  <p className="text-xs text-gray-500">2011 • 61.56%</p>
                </div>
              </div>
            </div>

            {/* Contact */}
            <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-4 hover:shadow-md transition-shadow">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-8 h-8 bg-gradient-to-r from-pink-500 to-rose-500 rounded-lg flex items-center justify-center">
                  <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                  </svg>
                </div>
                <h3 className="text-lg font-bold text-gray-900">Contact</h3>
              </div>
              
              <div className="space-y-3">
                <a href="tel:+918237776046" className="flex items-center gap-3 text-gray-600 hover:text-gray-900 transition-colors">
                  <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M2 3a1 1 0 011-1h2.153a1 1 0 01.986.836l.74 4.435a1 1 0 01.54 1.06l1.548.773a11.037 11.037 0 006.105 2.002l1.548-.773a1 1 0 01.54 1.06l.74-4.435a1 1 0 01-.986-.836H3a1 1 0 01-1-1V3z"/>
                  </svg>
                  <span className="text-sm">+91 8237776046</span>
                </a>
                
                <a href="mailto:sohilparekh89@gmail.com" className="flex items-center gap-3 text-gray-600 hover:text-gray-900 transition-colors">
                  <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z"/>
                  </svg>
                  <span className="text-sm">sohilparekh89@gmail.com</span>
                </a>
                
                <div className="flex items-center gap-3 text-gray-600">
                  <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3a1 1 0 01-1-1v-5.5z" clipRule="evenodd"/>
                  </svg>
                  <span className="text-sm">Indian</span>
                </div>
                
                <div className="flex items-center gap-3 text-gray-600">
                  <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M2 5a2 2 0 012-2h7a2 2 0 012 2v4a2 2 0 01-2 2H9l-3 3v-3H4a2 2 0 01-2-2V5z"/>
                    <path d="M15 7v2a4 4 0 01-4 4H9.828l-1.766 1.767c.28.149.599.32.842.515l1.766-1.767H17a4 4 0 004-4V7a2 2 0 00-2-2h-2a2 2 0 00-2 2z"/>
                  </svg>
                  <span className="text-sm">English, Hindi, Gujarati</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
