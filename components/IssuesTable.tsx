import Label from './Label'

interface Issue {
  id: string
  issueNumber: number
  title: string
  url: string
  status: 'open' | 'closed'
  priority: 'critical' | 'high' | 'medium' | 'low'
  labels: string[]
  author: string
  createdAt: string
}

interface IssuesTableProps {
  issues: Issue[]
  currentPage: number
}

export default function IssuesTable({ issues, currentPage }: IssuesTableProps) {
  const getPriorityVariant = (priority: string) => {
    switch (priority) {
      case 'critical': return 'error'
      case 'high': return 'warning'
      case 'medium': return 'default'
      case 'low': return 'default'
      default: return 'default'
    }
  }

  const getStatusVariant = (status: string) => {
    return status === 'open' ? 'success' : 'gray'
  }

  return (
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
          {issues.map((issue, index) => (
            <tr key={issue.id} className="hover:bg-gray-50">
              <td className="px-6 py-4">
                <div>
                  <div className="text-sm font-medium text-gray-900">
                    <a href={issue.url} target="_blank" rel="noopener noreferrer" className="hover:text-blue-600">
                      {((currentPage - 1) * 10) + index + 1}. {issue.title}
                    </a>
                  </div>
                  <div className="text-sm text-gray-500">
                    #{issue.issueNumber} • {issue.author}
                  </div>
                </div>
              </td>
              <td className="px-6 py-4">
                <Label variant={getStatusVariant(issue.status)}>
                  {issue.status}
                </Label>
              </td>
              <td className="px-6 py-4">
                <Label variant={getPriorityVariant(issue.priority)}>
                  {issue.priority}
                </Label>
              </td>
              <td className="px-6 py-4">
                <div className="flex flex-wrap gap-1">
                  {issue.labels?.slice(0, 3).map((label, labelIndex) => (
                    <Label key={labelIndex} variant="blue">
                      {label}
                    </Label>
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
  )
}
