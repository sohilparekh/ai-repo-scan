import { NextResponse } from 'next/server'
import { PrismaClient } from '@prisma/client'
import { RepositoryEntity, IssueEntity, AnalysisResult } from '@/types'

const prisma = new PrismaClient()

// Simple in-memory cache for analysis results (fallback when Redis is not available)
const analysisCache = new Map<string, { data: AnalysisResult; timestamp: number }>()
const CACHE_DURATION = 60 * 60 * 1000 // 1 hour in milliseconds

export async function POST(request: Request) {
  try {
    const body = await request.json()
    const { repo, prompt, page = 1, limit = 10 } = body

    if (!repo || !prompt) {
      return NextResponse.json(
        { error: 'Both repo and prompt parameters are required' },
        { status: 400 }
      )
    }

    // Validate pagination parameters
    const pageNum = Math.max(1, parseInt(page))
    const limitNum = Math.max(1, Math.min(50, parseInt(limit))) // Max 50 per page
    const offset = (pageNum - 1) * limitNum

    // Validate repo format (owner/repo)
    const repoPattern = /^[^\/]+\/[^\/]+$/
    if (!repoPattern.test(repo)) {
      return NextResponse.json(
        { error: 'Repository must be in format "owner/repository-name"' },
        { status: 400 }
      )
    }

    // Create cache key for analysis results
    const cacheKey = `analysis:${repo}:${Buffer.from(prompt).toString('base64')}`
    
    // Try to get cached analysis (using in-memory cache as fallback)
    const cached = analysisCache.get(cacheKey)
    const now = Date.now()
    
    let analysisData: AnalysisResult
    if (cached && (now - cached.timestamp) < CACHE_DURATION) {
      console.log(`Cache hit for ${repo} analysis, age: ${Math.round((now - cached.timestamp) / 1000)}s`)
      analysisData = cached.data
    } else {
      // Find repository in database with all issues
      const repository = await prisma.repository.findUnique({
        where: { fullName: repo },
        include: {
          issues: {
            orderBy: { createdAt: 'desc' }
            // Get ALL issues for comprehensive analysis
          }
        }
      })

      if (!repository) {
        return NextResponse.json(
          { error: `Repository ${repo} not found. Please scan the repository first.` },
          { status: 404 }
        )
      }

      if (repository.issues.length === 0) {
        return NextResponse.json(
          { error: `No issues found for repository ${repo}. Please scan the repository first.` },
          { status: 404 }
        )
      }

      // Analyze issues based on user prompt
      const relevantIssues = analyzeIssues(repository.issues, prompt)
      
      // Debug: Log priority distribution
      const priorityCounts = {
        critical: repository.issues.filter((i: IssueEntity) => i.priority === 'critical').length,
        high: repository.issues.filter((i: IssueEntity) => i.priority === 'high').length,
        medium: repository.issues.filter((i: IssueEntity) => i.priority === 'medium').length,
        low: repository.issues.filter((i: IssueEntity) => i.priority === 'low').length
      }
      console.log(`Priority distribution for ${repo}:`, priorityCounts)
      
      // Generate dynamic analysis based on actual data
      const analysis = generateAnalysis(repository, relevantIssues, prompt)
      
      // Prepare analysis data
      const cacheData: AnalysisResult = {
        analysis,
        analysisTimestamp: new Date().toISOString(),
        prompt: prompt,
        repository: {
          id: repository.id,
          name: repository.name,
          owner: repository.owner,
          fullName: repository.fullName,
          description: repository.description || undefined,
          url: repository.url,
          stars: repository.stars,
          forks: repository.forks,
          language: repository.language || undefined,
          createdAt: repository.createdAt,
          updatedAt: repository.updatedAt,
          totalIssues: repository.issues.length
        },
        allRelevantIssues: relevantIssues.map((issue: IssueEntity) => ({
          id: issue.id.toString(),
          repositoryId: issue.repositoryId,
          issueNumber: issue.issueNumber,
          title: issue.title,
          description: issue.description || undefined,
          status: issue.status as 'open' | 'closed',
          priority: issue.priority as 'critical' | 'high' | 'medium' | 'low',
          labels: issue.labels,
          author: issue.author || '',
          authorUrl: issue.authorUrl || undefined,
          url: issue.url,
          createdAt: issue.createdAt.toISOString(),
          updatedAt: issue.updatedAt
        })),
        relevantIssues: [], // Will be populated after pagination
        summary: {
          totalIssues: repository.issues.length,
          relevantIssues: relevantIssues.length,
          openIssues: repository.issues.filter((i: IssueEntity) => i.status === 'open').length,
          closedIssues: repository.issues.filter((i: IssueEntity) => i.status === 'closed').length,
          highPriorityIssues: repository.issues.filter((i: IssueEntity) => i.priority === 'high' || i.priority === 'critical').length
        },
        pagination: {
          currentPage: 1,
          totalPages: 1,
          totalItems: relevantIssues.length,
          itemsPerPage: limitNum,
          hasNextPage: false,
          hasPreviousPage: false
        },
        cached: false
      }
      
      analysisCache.set(cacheKey, {
        data: cacheData,
        timestamp: now
      })
      analysisData = cacheData
      console.log(`Cached analysis for ${repo}`)
    }

    // Apply pagination to relevant issues
    const paginatedIssues = analysisData.allRelevantIssues.slice(offset, offset + limitNum)
    const totalPages = Math.ceil(analysisData.allRelevantIssues.length / limitNum)

    const response = {
      analysis: analysisData.analysis,
      analysisTimestamp: new Date().toISOString(),
      prompt: analysisData.prompt,
      repository: analysisData.repository,
      summary: analysisData.summary,
      relevantIssues: paginatedIssues,
      pagination: {
        currentPage: pageNum,
        totalPages: totalPages,
        totalItems: analysisData.allRelevantIssues.length,
        itemsPerPage: limitNum,
        hasNextPage: pageNum < totalPages,
        hasPreviousPage: pageNum > 1
      },
      cached: !!cached
    }

    return NextResponse.json(response)
  } catch (error) {
    console.error('Error in analyze route:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}

function analyzeIssues(issues: IssueEntity[], prompt: string) {
  const promptLower = prompt.toLowerCase()
  const keywords = extractKeywords(promptLower)
  
  // Check if prompt specifically mentions open issues or fixing
  const mentionsOpen = keywords.some(keyword => 
    ['open', 'fix', 'fixing', 'resolved', 'pending', 'active', 'current'].includes(keyword)
  )
  
  // Score all issues based on relevance to the prompt
  const scoredIssues = issues.map(issue => {
    let score = 0
    
    // Title matching (highest weight)
    const titleMatch = keywords.some(keyword => 
      issue.title.toLowerCase().includes(keyword)
    )
    if (titleMatch) score += 10
    
    // Description matching (medium weight)
    const descMatch = keywords.some(keyword => issue.description?.toLowerCase().includes(keyword) || false)
    if (descMatch) score += 5
    
    // Label matching (medium weight)
    const labelMatch = issue.labels && issue.labels.some((label: string) => 
      keywords.some(keyword => 
        label.toLowerCase().includes(keyword)
      )
    )
    if (labelMatch) score += 5
    
    // Exact keyword matches (bonus points)
    keywords.forEach(keyword => {
      if (issue.title.toLowerCase().includes(keyword)) {
        score += 3 // Bonus for each keyword match in title
      }
      if (issue.description && issue.description.toLowerCase().includes(keyword)) {
        score += 1 // Bonus for each keyword match in description
      }
    })
    
    // Priority bonus
    if (issue.priority === 'critical') score += 4
    else if (issue.priority === 'high') score += 3
    else if (issue.priority === 'medium') score += 1
    
    // STATUS-BASED SCORING - Enhanced logic
    if (mentionsOpen) {
      // When prompt mentions open/fixing, heavily prioritize open issues
      if (issue.status === 'open') {
        score += 20 // Major bonus for open issues when fixing is mentioned
        // Additional bonus for high priority open issues
        if (issue.priority === 'critical') score += 15
        else if (issue.priority === 'high') score += 10
        else if (issue.priority === 'medium') score += 5
      } else if (issue.status === 'closed') {
        score -= 15 // Penalize closed issues when looking for fixes
      }
    } else {
      // Normal scoring when open/fixing not specifically mentioned
      if (issue.status === 'open') score += 1
      if (issue.status === 'closed') score -= 2 // Slight penalty for closed
    }
    
    // Additional bonus for recently updated open issues (more likely to be active)
    if (issue.status === 'open' && issue.updatedAt) {
      const daysSinceUpdate = (new Date().getTime() - new Date(issue.updatedAt).getTime()) / (1000 * 60 * 60 * 24)
      if (daysSinceUpdate < 30) score += 2 // Recently updated open issues
    }
    
    return { issue, score }
  })
  
  // Sort by score (descending) and take top 100
  const topIssues = scoredIssues
    .sort((a, b) => b.score - a.score)
    .slice(0, 100)
    .map(item => item.issue)
  
  return topIssues
}

function extractKeywords(prompt: string): string[] {
  // Common technical keywords to look for
  const technicalKeywords = ['bug', 'error', 'issue', 'feature', 'enhancement', 'fix', 'update', 'improvement', 'performance', 'security', 'documentation', 'test', 'deployment', 'api', 'ui', 'frontend', 'backend', 'database', 'refactor']
  
  // Extract words from prompt
  const words = prompt.split(/\s+/).filter(word => word.length > 2)
  
  // Combine prompt words with technical keywords that appear in prompt
  const keywords = words.filter(word => 
    technicalKeywords.includes(word) || 
    words.includes(word)
  )
  
  // If no specific keywords found, use all words from prompt
  return keywords.length > 0 ? keywords : words.slice(0, 5)
}

function generateAnalysis(repository: RepositoryEntity, relevantIssues: IssueEntity[], prompt: string) {
  const totalIssues = repository.issues?.length || 0
  const openIssues = repository.issues?.filter((i: IssueEntity) => i.status === 'open').length || 0
  const closedIssues = repository.issues?.filter((i: IssueEntity) => i.status === 'closed').length || 0
  const highPriorityIssues = repository.issues?.filter((i: IssueEntity) => i.priority === 'high').length || 0
  
  const promptLower = prompt.toLowerCase()
  let analysis = `# Repository Analysis: ${repository.fullName}\n\n`
  
  // Basic repository overview
  analysis += `## Overview\n`
  analysis += `- **Repository**: ${repository.fullName}\n`
  analysis += `- **Language**: ${repository.language || 'Not specified'}\n`
  analysis += `- **Stars**: ${repository.stars}\n`
  analysis += `- **Forks**: ${repository.forks}\n`
  analysis += `- **Total Issues**: ${totalIssues}\n`
  analysis += `- **Open Issues**: ${openIssues}\n`
  analysis += `- **Closed Issues**: ${closedIssues}\n`
  analysis += `- **High Priority Issues**: ${highPriorityIssues}\n\n`
  
  // Analysis based on prompt
  if (promptLower.includes('bug') || promptLower.includes('error')) {
    const bugIssues = relevantIssues.filter(i => 
      i.title.toLowerCase().includes('bug') || 
      i.title.toLowerCase().includes('error') ||
      (i.description && i.description.toLowerCase().includes('bug'))
    )
    analysis += `## Bug Analysis\n`
    analysis += `Found ${bugIssues.length} bug-related issues out of ${relevantIssues.length} relevant issues. `
    analysis += bugIssues.length > 0 ? 
      `Critical bugs need immediate attention, especially those with high priority.` :
      `No critical bugs found in the recent issues.`
    analysis += `\n\n`
  }
  
  if (promptLower.includes('feature') || promptLower.includes('enhancement')) {
    const featureIssues = relevantIssues.filter(i => 
      i.title.toLowerCase().includes('feature') || 
      i.title.toLowerCase().includes('enhancement')
    )
    analysis += `## Feature Analysis\n`
    analysis += `Identified ${featureIssues.length} feature requests. `
    analysis += featureIssues.length > 0 ? 
      `The repository shows active development with ongoing feature improvements.` :
      `No active feature requests found in recent issues.`
    analysis += `\n\n`
  }
  
  if (promptLower.includes('performance') || promptLower.includes('optimization')) {
    const perfIssues = relevantIssues.filter(i => 
      i.title.toLowerCase().includes('performance') || 
      i.title.toLowerCase().includes('slow') ||
      (i.description && i.description.toLowerCase().includes('performance'))
    )
    analysis += `## Performance Analysis\n`
    analysis += `Found ${perfIssues.length} performance-related issues. `
    analysis += perfIssues.length > 0 ? 
      `Performance improvements are needed to maintain system efficiency.` :
      `No performance issues reported recently.`
    analysis += `\n\n`
  }
  
  if (promptLower.includes('security')) {
    const securityIssues = relevantIssues.filter(i => 
      i.title.toLowerCase().includes('security') || 
      i.title.toLowerCase().includes('vulnerability')
    )
    analysis += `## Security Analysis\n`
    analysis += `Identified ${securityIssues.length} security-related issues. `
    analysis += securityIssues.length > 0 ? 
      `Security issues require immediate attention to protect the codebase.` :
      `No security vulnerabilities reported in recent issues.`
    analysis += `\n\n`
  }
  
  // General analysis
  analysis += `## General Observations\n`
  
  if (openIssues > totalIssues * 0.5) {
    analysis += `- **Issue Management**: High number of open issues (${openIssues}/${totalIssues}) suggests need for better issue triage and resolution processes.\n`
  } else {
    analysis += `- **Issue Management**: Good issue resolution rate with ${closedIssues} closed issues out of ${totalIssues} total.\n`
  }
  
  if (highPriorityIssues > 0) {
    analysis += `- **Priority Management**: ${highPriorityIssues} high priority issues require immediate attention from maintainers.\n`
  }
  
  if (relevantIssues.length > 0) {
    analysis += `- **Relevance**: Found ${relevantIssues.length} issues matching your query "${prompt}".\n`
  }
  
  analysis += `\n## Recommendations\n`
  
  if (openIssues > 20) {
    analysis += `- Consider implementing regular issue triage sessions to reduce open issue backlog.\n`
  }
  
  if (highPriorityIssues > 5) {
    analysis += `- Prioritize high priority issues to maintain code quality and user satisfaction.\n`
  }
  
  if (relevantIssues.length === 0) {
    analysis += `- No issues found matching your specific query. Consider refining your search terms.\n`
  } else {
    analysis += `- Focus on the ${relevantIssues.length} relevant issues identified in this analysis.\n`
  }
  
  return analysis
}
