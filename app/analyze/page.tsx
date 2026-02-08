'use client'

import React, { useState } from 'react'
import Accordion from '@/components/Accordion'
import IssuesTable from '@/components/IssuesTable'
import Statistics from '@/components/Statistics'
import GeneralObservations from '@/components/GeneralObservations'
import Recommendations from '@/components/Recommendations'
import BugAnalysis from '@/components/BugAnalysis'
import { AnalysisResult } from '@/lib/types'

export default function AnalyzePage() {
  const [repo, setRepo] = useState('')
  const [prompt, setPrompt] = useState('')
  const [analysisResult, setAnalysisResult] = useState<AnalysisResult | null>(null)
  const [currentPage, setCurrentPage] = useState(1)
  const [totalPages, setTotalPages] = useState(1)
  const [loading, setLoading] = useState(false)

  const handleAnalyzeClick = () => {
    setCurrentPage(1) // Reset to first page when analyzing
    handleAnalyze(1)
  }

  const handleAnalyze = async (page: number = 1) => {
    if (!repo || !prompt) {
      alert('Please enter both repository and prompt')
      return
    }

    setLoading(true)
    try {
      const response = await fetch('/api/analyze', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          repo,
          prompt,
          page,
          limit: 10
        }),
      })

      const data = await response.json()

      if (response.ok) {
        setAnalysisResult(data)
        setCurrentPage(data.pagination?.currentPage || 1)
        setTotalPages(data.pagination?.totalPages || 1)
      } else {
        alert(data.error || 'Analysis failed')
      }
      setLoading(false)
    } catch (error) {
      alert('Error during analysis')
      console.error(error)
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-gray-50 py-3">
      <div className="max-w-7xl mx-auto px-4">
        <h1 className="text-2xl font-bold text-gray-900 mb-4">
          Repository Analysis
        </h1>

        {/* Analysis Form */}
        <div className="bg-white rounded-lg shadow-md p-4 mb-4">
          <h2 className="text-xl font-semibold mb-3">Repository Information</h2>
          <div className="space-y-3">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
              Repository (owner/repository-name)
              </label>
              <input
                type="text"
                value={repo}
                onChange={(e) => setRepo(e.target.value)}
                placeholder="e.g., facebook/react"
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Analysis Prompt
              </label>
              <textarea
                value={prompt}
                onChange={(e) => setPrompt(e.target.value)}
                placeholder="Enter your analysis prompt here..."
                rows={3}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
          </div>

          <div className="flex gap-4 mt-4">
            <button
              onClick={handleAnalyzeClick}
              disabled={loading || !repo || !prompt}
              className="px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 disabled:opacity-50"
            >
              {loading ? 'Analyzing...' : 'Analyze Repository'}
            </button>
          </div>
        </div>

        {/* Analysis Results */}
        {analysisResult && (
          <div className="flex gap-4">
            {/* Main Content Area */}
            <div className="flex-1">
              <div className="bg-white rounded-lg shadow-md p-4">
                {/* Repository Name */}
                <div className="mb-3">
                  <h2 className="text-2xl font-bold text-gray-900">
                    {analysisResult.repository?.fullName || analysisResult.repository?.name || 'Repository Analysis'}
                  </h2>
                </div>

                {analysisResult.relevantIssues && analysisResult.relevantIssues.length > 0 && (
                  <div>
                    <h3 className="text-xl font-semibold text-gray-900 mb-3">
                      Top Relevant Issues ({Math.min(analysisResult.relevantIssues.length, 20)} of {analysisResult.relevantIssues.length} analyzed)
                    </h3>
                    <div className="mb-3 p-3 bg-gray-50 rounded-lg">
                      <p className="text-sm text-gray-600">
                        Analyzed {analysisResult.repository?.totalIssues?.toLocaleString()} total issues and found {analysisResult.relevantIssues.length} relevant matches. 
                        Showing top 20 most relevant issues for display.
                      </p>
                    </div>
                    <IssuesTable 
                      issues={analysisResult.relevantIssues.slice(0, 20)} 
                      currentPage={currentPage} 
                    />
                    
                    {/* Pagination Controls */}
                    {analysisResult.pagination && totalPages > 1 && (
                      <div className="mt-4 flex items-center justify-between">
                        <div className="text-sm text-gray-700">
                          Showing {((currentPage - 1) * 10) + 1} to {Math.min(currentPage * 10, analysisResult.pagination.totalItems)} of {analysisResult.pagination.totalItems} results
                        </div>
                        <div className="flex items-center space-x-2">
                          <button
                            onClick={() => handleAnalyze(currentPage - 1)}
                            disabled={!analysisResult.pagination.hasPreviousPage}
                            className="px-3 py-1 text-sm border rounded-md disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-50"
                          >
                            Previous
                          </button>
                          <span className="px-3 py-1 text-sm">
                            Page {currentPage} of {totalPages}
                          </span>
                          <button
                            onClick={() => handleAnalyze(currentPage + 1)}
                            disabled={!analysisResult.pagination.hasNextPage}
                            className="px-3 py-1 text-sm border rounded-md disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-50"
                          >
                            Next
                          </button>
                        </div>
                      </div>
                    )}
                    
                    {analysisResult.relevantIssues.length > 20 && (
                      <div className="mt-3 text-center">
                        <p className="text-sm text-gray-500">
                          Showing top 20 of {analysisResult.relevantIssues.length} relevant issues. 
                          All {analysisResult.relevantIssues.length} issues were considered in the analysis.
                        </p>
                      </div>
                    )}
                  </div>
                )}
              </div>
            </div>

            {/* Right Sidebar */}
            <div className="w-80">
              <div className="sticky top-6 space-y-4">
                {/* Statistics Section */}
                <div className="bg-white rounded-lg shadow-md p-4">
                  <Accordion title="Statistics" defaultExpanded={true}>
                    <Statistics 
                      repository={analysisResult.repository}
                      summary={analysisResult.summary}
                    />
                  </Accordion>
                </div>

                {/* Bug Analysis Section */}
                <div className="bg-white rounded-lg shadow-md p-4">
                  <Accordion title="Bug Analysis">
                    <BugAnalysis analysis={analysisResult.analysis} />
                  </Accordion>
                </div>

                {/* General Observations Section */}
                <div className="bg-white rounded-lg shadow-md p-4">
                  <Accordion title="General Observations">
                    <GeneralObservations analysis={analysisResult.analysis} />
                  </Accordion>
                </div>

                {/* Recommendations Section */}
                <div className="bg-white rounded-lg shadow-md p-4">
                  <Accordion title="Recommendations">
                    <Recommendations 
                      relevantIssuesCount={analysisResult.relevantIssues.length}
                      analysis={analysisResult.analysis}
                    />
                  </Accordion>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
