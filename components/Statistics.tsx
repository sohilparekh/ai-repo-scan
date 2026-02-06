interface Repository {
  language?: string
  stars?: number
  forks?: number
}

interface Summary {
  totalIssues?: number
  openIssues?: number
  closedIssues?: number
  relevantIssues?: number
  highPriorityIssues?: number
}

interface StatisticsProps {
  repository?: Repository
  summary?: Summary
}

export default function Statistics({ repository, summary }: StatisticsProps) {
  const formatNumber = (num?: number) => {
    return num?.toLocaleString() || '0'
  }

  return (
    <div className="space-y-3">
      <div className="flex justify-between items-center">
        <span className="text-sm font-medium text-gray-600">Language</span>
        <span className="text-sm font-semibold text-gray-900">
          {repository?.language || 'N/A'}
        </span>
      </div>
      <div className="flex justify-between items-center">
        <span className="text-sm font-medium text-gray-600">Stars</span>
        <span className="text-sm font-semibold text-gray-900">
          {formatNumber(repository?.stars)}
        </span>
      </div>
      <div className="flex justify-between items-center">
        <span className="text-sm font-medium text-gray-600">Forks</span>
        <span className="text-sm font-semibold text-gray-900">
          {formatNumber(repository?.forks)}
        </span>
      </div>
      <div className="flex justify-between items-center">
        <span className="text-sm font-medium text-gray-600">Total Issues</span>
        <span className="text-sm font-semibold text-gray-900">
          {formatNumber(summary?.totalIssues)}
        </span>
      </div>
      <div className="flex justify-between items-center">
        <span className="text-sm font-medium text-gray-600">Open Issues</span>
        <span className="text-sm font-semibold text-gray-900">
          {formatNumber(summary?.openIssues)}
        </span>
      </div>
      <div className="flex justify-between items-center">
        <span className="text-sm font-medium text-gray-600">Closed Issues</span>
        <span className="text-sm font-semibold text-gray-900">
          {formatNumber(summary?.closedIssues)}
        </span>
      </div>
      <div className="flex justify-between items-center">
        <span className="text-sm font-medium text-gray-600">Relevant Issues</span>
        <span className="text-sm font-semibold text-gray-900">
          {summary?.relevantIssues || 0}
        </span>
      </div>
      <div className="flex justify-between items-center">
        <span className="text-sm font-medium text-gray-600">High Priority</span>
        <span className="text-sm font-semibold text-red-600">
          {summary?.highPriorityIssues || 0}
        </span>
      </div>
    </div>
  )
}
