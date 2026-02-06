interface BugAnalysisProps {
  analysis: string
}

export default function BugAnalysis({ analysis }: BugAnalysisProps) {
  const extractBugAnalysis = (fullAnalysis: string) => {
    // Look for bug-related sections in the analysis, but exclude recommendations, repo name, and overview
    const bugKeywords = ['bug', 'issue', 'error', 'problem', 'defect', 'flaw', 'vulnerability']
    const excludeKeywords = ['recommendation', 'suggest', 'should', 'advise', 'propose', 'overview', 'summary', 'introduction', 'repository', 'repo name']
    const lines = fullAnalysis.split('\n')
    const bugSections: string[] = []
    let currentSection: string[] = []
    let inBugSection = false
    let skipSection = false

    for (const line of lines) {
      const lowerLine = line.toLowerCase()
      
      // Check if this line starts a bug-related section
      if (line.startsWith('# ') || line.startsWith('## ')) {
        // If we were in a bug section, save it
        if (inBugSection && currentSection.length > 0 && !skipSection) {
          bugSections.push(currentSection.join('\n'))
          currentSection = []
        }
        
        // Check if this section is bug-related
        inBugSection = bugKeywords.some(keyword => lowerLine.includes(keyword))
        skipSection = excludeKeywords.some(keyword => lowerLine.includes(keyword))
        
        if (inBugSection && !skipSection) {
          // Don't add the header line to content - remove titles
          // currentSection.push(line) // REMOVED: Don't include headers
        }
      } else if (inBugSection && !skipSection) {
        currentSection.push(line)
      }
    }
    
    // Add the last section if it was a bug section
    if (inBugSection && currentSection.length > 0 && !skipSection) {
      bugSections.push(currentSection.join('\n'))
    }
    
    return bugSections.join('\n\n')
  }

  const formatAnalysisText = (text: string) => {
    if (!text.trim()) {
      return <p className="text-gray-500 italic">No specific bug analysis available.</p>
    }
    
    return text.split('\n').map((line, index) => {
      // Process bold text with ** **
      const boldRegex = /\*\*(.*?)\*\*/g
      const parts = []
      let lastIndex = 0
      let match

      while ((match = boldRegex.exec(line)) !== null) {
        // Add text before bold
        if (match.index > lastIndex) {
          parts.push(line.substring(lastIndex, match.index))
        }
        // Add bold text
        parts.push(<strong key={index + '-bold-' + match.index} className="font-semibold">{match[1]}</strong>)
        lastIndex = match.index + match[0].length
      }
      // Add remaining text
      if (lastIndex < line.length) {
        parts.push(line.substring(lastIndex))
      }

      if (line.startsWith('# ')) {
        return <h2 key={index} className="text-2xl font-bold text-gray-900 mt-6 mb-4">{line.substring(2).replace(/\*\*(.*?)\*\*/g, '$1')}</h2>
      } else if (line.startsWith('## ')) {
        return <h3 key={index} className="text-xl font-semibold text-gray-800 mt-4 mb-3">{line.substring(3).replace(/\*\*(.*?)\*\*/g, '$1')}</h3>
      } else if (line.startsWith('- ')) {
        return <li key={index} className="ml-4 text-gray-700">{parts.length > 0 ? parts : line.substring(2)}</li>
      } else if (line.trim() === '') {
        return <br key={index} />
      } else {
        return <p key={index} className="text-gray-700 mb-2">{parts.length > 0 ? parts : line}</p>
      }
    })
  }

  const bugAnalysis = extractBugAnalysis(analysis)

  return (
    <div className="prose prose-sm max-w-none text-gray-700">
      {formatAnalysisText(bugAnalysis)}
    </div>
  )
}
