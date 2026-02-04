'use client'

import { useState } from 'react'

export default function ScanPage() {
  const [repo, setRepo] = useState('')
  const [prompt, setPrompt] = useState('')
  const [forceRescan, setForceRescan] = useState(false)
  const [scanResult, setScanResult] = useState<any>(null)
  const [analysisResult, setAnalysisResult] = useState<any>(null)
  const [activeAction, setActiveAction] = useState<'scan' | 'analyze'>('scan')
  const [currentPage, setCurrentPage] = useState(1)
  const [totalPages, setTotalPages] = useState(1)
  const [loading, setLoading] = useState(false)

  const handleScan = async () => {
    if (!repo) {
      alert('Please enter a repository')
      return
    }

    setLoading(true)
    setActiveAction('scan')
    try {
      const response = await fetch('/api/scan', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ repo, forceRescan }),
      })

      const data = await response.json()
      if (response.ok) {
        setScanResult(data)
        setAnalysisResult(null)
      } else {
        alert(data.error || 'Scan failed')
      }
    } catch (error) {
      alert('Error scanning repository')
    } finally {
      setLoading(false)
    }
  }

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
    setActiveAction('analyze')
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
    } catch (error) {
      alert('Error during analysis')
      console.error(error)
    } finally {
      setLoading(false)
    }
  }

  const formatAnalysisText = (text: string) => {
    return text.split('\n').map((line, index) => {
      if (line.startsWith('# ')) {
        return <h2 key={index} className="text-2xl font-bold text-gray-900 mt-6 mb-4">{line.substring(2)}</h2>
      } else if (line.startsWith('## ')) {
        return <h3 key={index} className="text-xl font-semibold text-gray-800 mt-4 mb-3">{line.substring(3)}</h3>
      } else if (line.startsWith('- ')) {
        return <li key={index} className="ml-4 text-gray-700">{line.substring(2)}</li>
      } else if (line.trim() === '') {
        return <br key={index} />
      } else {
        return <p key={index} className="text-gray-700 mb-2">{line}</p>
      }
    })
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-6xl mx-auto px-4">
        <h1 className="text-3xl font-bold text-gray-900 mb-8">
          Repository Scanner & Analysis
        </h1>

        <div className="bg-white rounded-lg shadow-md p-6 mb-6">
          <h2 className="text-xl font-semibold mb-4">Repository Information</h2>
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
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
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Analysis Prompt
              </label>
              <textarea
                value={prompt}
                onChange={(e) => setPrompt(e.target.value)}
                placeholder="Enter your analysis prompt here..."
                rows={4}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            <div className="flex items-center">
              <input
                type="checkbox"
                id="forceRescan"
                checked={forceRescan}
                onChange={(e) => setForceRescan(e.target.checked)}
                className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
              />
              <label htmlFor="forceRescan" className="ml-2 block text-sm text-gray-900">
                Force rescan (ignores 24-hour cache)
              </label>
            </div>
          </div>

          <div className="flex gap-4 mt-6">
            <button
              onClick={handleScan}
              disabled={loading}
              className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 disabled:opacity-50"
            >
              {loading && activeAction === 'scan' ? 'Scanning...' : 'Scan Repository'}
            </button>
            <button
              onClick={handleAnalyzeClick}
              disabled={loading}
              className="px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 disabled:opacity-50"
            >
              {loading && activeAction === 'analyze' ? 'Analyzing...' : 'Analyze Repository'}
            </button>
          </div>
        </div>

        {/* Scan Results - Only show when scan is active */}
        {scanResult && activeAction === 'scan' && (
          <div className="bg-white rounded-lg shadow-md p-6 mb-6">
            <h2 className="text-xl font-semibold mb-4">Scan Results</h2>
            
            {/* Scan Statistics Table */}
            <div className="mb-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-3">Scan Statistics</h3>
              <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-gray-200">
                  <thead className="bg-gray-50">
                    <tr>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Metric
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Value
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Metric
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Value
                      </th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    <tr>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                        Repository
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">
                        <span className="inline-flex px-2 py-1 text-xs font-medium rounded bg-blue-100 text-blue-800">
                          {scanResult.repo}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                        Issues Fetched
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">
                        <span className="inline-flex px-2 py-1 text-xs font-medium rounded bg-green-100 text-green-800">
                          {scanResult.issues_fetched?.toLocaleString()}
                        </span>
                      </td>
                    </tr>
                    <tr>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                        Status
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">
                        <span className={`inline-flex px-2 py-1 text-xs font-medium rounded ${
                          scanResult.cached_successfully 
                            ? 'bg-purple-100 text-purple-800' 
                            : 'bg-orange-100 text-orange-800'
                        }`}>
                          {scanResult.cached_successfully ? 'Cached' : 'Fresh Scan'}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                        Scan ID
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">
                        <span className="inline-flex px-2 py-1 text-xs font-medium rounded bg-gray-100 text-gray-800">
                          #{scanResult.scan_id}
                        </span>
                      </td>
                    </tr>
                    {scanResult.scan_data && (
                      <>
                        <tr>
                          <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                            Open Issues
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">
                            <span className="inline-flex px-2 py-1 text-xs font-medium rounded bg-green-100 text-green-800">
                              {scanResult.scan_data.openIssues?.toLocaleString()}
                            </span>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                            Total Issues
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">
                            <span className="inline-flex px-2 py-1 text-xs font-medium rounded bg-gray-100 text-gray-800">
                              {scanResult.scan_data.totalIssues?.toLocaleString()}
                            </span>
                          </td>
                        </tr>
                        <tr>
                          <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                            Scanned At
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700" colSpan={3}>
                            <span className="inline-flex px-2 py-1 text-xs font-medium rounded bg-indigo-100 text-indigo-800">
                              {new Date(scanResult.scan_data.timestamp).toLocaleString()}
                            </span>
                          </td>
                        </tr>
                      </>
                    )}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}

        {/* Analysis Results - Only show when analyze is active */}
        {analysisResult && activeAction === 'analyze' && (
          <div className="bg-white rounded-lg shadow-md p-6">
            <div className="mb-6">
              <h2 className="text-2xl font-bold text-gray-900 mb-2">
                {analysisResult.repository?.fullName}
              </h2>
              
              {/* Analysis Info */}
              <div className="mb-4 p-3 bg-blue-50 rounded-lg">
                <div className="flex flex-wrap gap-4 text-sm">
                  <div>
                    <span className="font-medium text-blue-900">Analyzed:</span>
                    <span className="ml-2 text-blue-700">
                      {analysisResult.analysisTimestamp && new Date(analysisResult.analysisTimestamp).toLocaleString()}
                    </span>
                  </div>
                  <div>
                    <span className="font-medium text-blue-900">Prompt:</span>
                    <span className="ml-2 text-blue-700 italic">"{analysisResult.prompt}"</span>
                  </div>
                </div>
              </div>
              
              {/* Repository Statistics Table */}
              <div className="mb-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-3">Repository Statistics</h3>
                <div className="overflow-x-auto">
                  <table className="min-w-full divide-y divide-gray-200">
                    <thead className="bg-gray-50">
                      <tr>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Metric
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Value
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Metric
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Value
                        </th>
                      </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                      <tr>
                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                          Language
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">
                          <span className="inline-flex px-2 py-1 text-xs font-medium rounded bg-blue-100 text-blue-800">
                            {analysisResult.repository?.language || 'N/A'}
                          </span>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                          Stars
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">
                          <span className="inline-flex px-2 py-1 text-xs font-medium rounded bg-yellow-100 text-yellow-800">
                            {analysisResult.repository?.stars?.toLocaleString()}
                          </span>
                        </td>
                      </tr>
                      <tr>
                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                          Forks
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">
                          <span className="inline-flex px-2 py-1 text-xs font-medium rounded bg-purple-100 text-purple-800">
                            {analysisResult.repository?.forks?.toLocaleString()}
                          </span>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                          Total Issues
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">
                          <span className="inline-flex px-2 py-1 text-xs font-medium rounded bg-gray-100 text-gray-800">
                            {analysisResult.summary?.totalIssues?.toLocaleString()}
                          </span>
                        </td>
                      </tr>
                      <tr>
                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                          Open Issues
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">
                          <span className="inline-flex px-2 py-1 text-xs font-medium rounded bg-green-100 text-green-800">
                            {analysisResult.summary?.openIssues?.toLocaleString()}
                          </span>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                          High Priority Issues
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">
                          <span className="inline-flex px-2 py-1 text-xs font-medium rounded bg-red-100 text-red-800">
                            {analysisResult.summary?.highPriorityIssues || 0}
                          </span>
                          {analysisResult.summary?.highPriorityIssues === 0 && (
                            <span className="ml-2 text-xs text-gray-500 italic">
                              (No priority labels found - all issues set to medium)
                            </span>
                          )}
                        </td>
                      </tr>
                      <tr>
                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                          Closed Issues
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">
                          <span className="inline-flex px-2 py-1 text-xs font-medium rounded bg-gray-100 text-gray-800">
                            {analysisResult.summary?.closedIssues?.toLocaleString()}
                          </span>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                          Relevant Issues
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">
                          <span className="inline-flex px-2 py-1 text-xs font-medium rounded bg-indigo-100 text-indigo-800">
                            {analysisResult.summary?.relevantIssues}
                          </span>
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>
            </div>

            <div className="mb-6">
              <h3 className="text-xl font-semibold text-gray-900 mb-4">Analysis Summary</h3>
              <div className="prose max-w-none text-gray-700 bg-gray-50 p-4 rounded-lg">
                {formatAnalysisText(analysisResult.analysis)}
              </div>
            </div>

            {analysisResult.relevantIssues && analysisResult.relevantIssues.length > 0 && (
              <div>
                <h3 className="text-xl font-semibold text-gray-900 mb-4">
                  Top Relevant Issues ({Math.min(analysisResult.relevantIssues.length, 20)} of {analysisResult.relevantIssues.length} analyzed)
                </h3>
                <div className="mb-4 p-3 bg-gray-50 rounded-lg">
                  <p className="text-sm text-gray-600">
                    Analyzed {analysisResult.repository?.totalIssues?.toLocaleString()} total issues and found {analysisResult.relevantIssues.length} relevant matches. 
                    Showing top 20 most relevant issues for display.
                  </p>
                </div>
                <div className="overflow-x-auto">
                  <table className="min-w-full divide-y divide-gray-200">
                    <thead className="bg-gray-50">
                      <tr>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Issue
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Status
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Priority
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Labels
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Created
                        </th>
                      </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                      {analysisResult.relevantIssues.slice(0, 20).map((issue: any, index: number) => (
                        <tr key={issue.id} className="hover:bg-gray-50">
                          <td className="px-6 py-4">
                            <div>
                              <div className="text-sm font-medium text-gray-900">
                                <a href={issue.url} target="_blank" rel="noopener noreferrer" className="hover:text-blue-600">
                                  {index + 1}. {issue.title}
                                </a>
                              </div>
                              <div className="text-sm text-gray-500">
                                #{issue.issueNumber} • {issue.author}
                              </div>
                            </div>
                          </td>
                          <td className="px-6 py-4">
                            <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${
                              issue.status === 'open' 
                                ? 'bg-green-100 text-green-800' 
                                : 'bg-gray-100 text-gray-800'
                            }`}>
                              {issue.status}
                            </span>
                          </td>
                          <td className="px-6 py-4">
                            <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${
                              issue.priority === 'critical' 
                                ? 'bg-red-600 text-white'
                                : issue.priority === 'high' 
                                ? 'bg-red-100 text-red-800'
                                : issue.priority === 'medium'
                                ? 'bg-yellow-100 text-yellow-800'
                                : 'bg-gray-100 text-gray-800'
                            }`}>
                              {issue.priority}
                            </span>
                          </td>
                          <td className="px-6 py-4">
                            <div className="flex flex-wrap gap-1">
                              {issue.labels?.slice(0, 3).map((label: string, labelIndex: number) => (
                                <span key={labelIndex} className="inline-flex px-2 py-1 text-xs font-medium rounded bg-blue-100 text-blue-800">
                                  {label}
                                </span>
                              ))}
                              {issue.labels?.length > 3 && (
                                <span className="text-xs text-gray-500">+{issue.labels.length - 3}</span>
                              )}
                            </div>
                          </td>
                          <td className="px-6 py-4 text-sm text-gray-500">
                            {new Date(issue.createdAt).toLocaleDateString()}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
                
                {/* Pagination Controls */}
                {analysisResult.pagination && totalPages > 1 && (
                  <div className="mt-6 flex items-center justify-between">
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
                  <div className="mt-4 text-center">
                    <p className="text-sm text-gray-500">
                      Showing top 20 of {analysisResult.relevantIssues.length} relevant issues. 
                      All {analysisResult.relevantIssues.length} issues were considered in the analysis.
                    </p>
                  </div>
                )}
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  )
}
