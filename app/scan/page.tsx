'use client'

import React, { useState } from 'react'
import Label from '@/components/Label'

interface ScanResult {
  repo: string
  issues_fetched: number
  cached_successfully: boolean
  scan_id: number
  repository_id: number
  scan_data: any
  message?: string
}

export default function ScanPage() {
  const [repo, setRepo] = useState('')
  const [forceRescan, setForceRescan] = useState(false)
  const [scanResult, setScanResult] = useState<ScanResult | null>(null)
  const [loading, setLoading] = useState(false)

  const handleScan = async () => {
    if (!repo) {
      alert('Please enter a repository')
      return
    }

    setLoading(true)
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
      } else {
        alert(data.error || 'Scan failed')
      }
    } catch (error) {
      alert('Error scanning repository')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-gray-50 py-3">
      <div className="max-w-7xl mx-auto px-4">
        <h1 className="text-2xl font-bold text-gray-900 mb-4">
          Repository Scanner
        </h1>

        {/* Scan Form */}
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

          <div className="flex gap-4 mt-4">
            <button
              onClick={handleScan}
              disabled={loading || !repo}
              className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 disabled:opacity-50"
            >
              {loading ? 'Scanning...' : 'Scan Repository'}
            </button>
          </div>
        </div>

        {/* Scan Results */}
        {scanResult && (
          <div className="bg-white rounded-lg shadow-md p-4">
            <h2 className="text-xl font-semibold mb-3">Scan Results</h2>
            
            {/* Scan Statistics Table */}
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
                      <Label variant={scanResult.cached_successfully ? 'purple' : 'warning'}>
                        {scanResult.cached_successfully ? 'Cached' : 'Fresh Scan'}
                      </Label>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                      Scan ID
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">
                      <Label variant="gray">
                        #{scanResult.scan_id}
                      </Label>
                    </td>
                  </tr>
                  {scanResult.scan_data && (
                    <>
                      <tr>
                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                          Open Issues
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">
                          <Label variant="green">
                            {scanResult.scan_data.openIssues?.toLocaleString()}
                          </Label>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                          Total Issues
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">
                          <Label variant="gray">
                            {scanResult.scan_data.totalIssues?.toLocaleString()}
                          </Label>
                        </td>
                      </tr>
                      <tr>
                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                          Scanned At
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700" colSpan={3}>
                          <Label variant="indigo">
                            {new Date(scanResult.scan_data.timestamp).toLocaleString()}
                          </Label>
                        </td>
                      </tr>
                    </>
                  )}
                </tbody>
              </table>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
