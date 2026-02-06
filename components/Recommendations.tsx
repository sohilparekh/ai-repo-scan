interface RecommendationsProps {
  relevantIssuesCount: number
  analysis?: string
}

export default function Recommendations({ relevantIssuesCount, analysis }: RecommendationsProps) {
  return (
    <div className="space-y-3">
      <div className="p-3 bg-blue-50 rounded-lg">
        <h4 className="text-sm font-semibold text-blue-900 mb-2">Key Insights</h4>
        <p className="text-sm text-blue-700">
          Based on the analysis of {relevantIssuesCount} relevant issues, 
          here are the main recommendations for improving this repository.
        </p>
      </div>
      
      {analysis && analysis.includes('recommend') && (
        <div className="p-3 bg-green-50 rounded-lg">
          <h4 className="text-sm font-semibold text-green-900 mb-2">Action Items</h4>
          <p className="text-sm text-green-700">
            Review the detailed analysis for specific recommendations and action items.
          </p>
        </div>
      )}
      
      <div className="p-3 bg-yellow-50 rounded-lg">
        <h4 className="text-sm font-semibold text-yellow-900 mb-2">Next Steps</h4>
        <ul className="text-sm text-yellow-700 space-y-1">
          <li>• Prioritize high-priority issues</li>
          <li>• Address security vulnerabilities</li>
          <li>• Improve documentation</li>
          <li>• Consider code refactoring</li>
        </ul>
      </div>
    </div>
  )
}
