import { NextResponse } from 'next/server'
import { EmbeddingService } from '@/lib/embedding'
import { GitHubRepo, GitHubIssue } from '@/lib/types'
import { RepositoryService, IssueService, ScanService } from '@/lib/database/services'

export async function POST(request: Request) {
  try {
    const body = await request.json()
    const { repo, forceRescan = false } = body

    if (!repo) {
      return NextResponse.json(
        { error: 'Repository parameter is required' },
        { status: 400 }
      )
    }

    // Validate repo format (owner/repo)
    const repoPattern = /^[^\/]+\/[^\/]+$/
    if (!repoPattern.test(repo)) {
      return NextResponse.json(
        { error: 'Repository must be in format "owner/repository-name"' },
        { status: 400 }
      )
    }

    const [, ] = repo.split('/') // Extract owner and name but don't use them

    // Find repository in database
    let repository = await RepositoryService.findByFullName(repo)

    // Check if repository exists and has been scanned recently (unless forceRescan is true)
    if (repository && repository.scans.length > 0 && !forceRescan) {
      const lastScan = repository.scans[0]
      const scanAge = Date.now() - new Date(lastScan.createdAt).getTime()
      const hoursSinceScan = scanAge / (1000 * 60 * 60)
      
      // If scanned within last 24 hours, return existing scan data
      if (hoursSinceScan < 24) {
        const response = {
          repo,
          issues_fetched: lastScan.issuesFetched,
          cached_successfully: true,
          scan_id: lastScan.id,
          repository_id: repository.id,
          scan_data: lastScan.scanData,
          message: 'Repository already scanned recently. Returning cached data. Use forceRescan=true to force a new scan.'
        }
        return NextResponse.json(response)
      }
    }

    // Find repository without scans for further operations
    // const repositoryData = await prisma.repository.findUnique({
    //   where: { fullName: repo }
    // })

    if (!repository) {
      // Fetch repository info from GitHub
      console.log(`Fetching repository info for: ${repo}`)
      console.log(`Using GH_TOKEN: ${process.env.GH_TOKEN ? 'YES' : 'NO'}`)
      
      const repoResponse = await fetch(`https://api.github.com/repos/${repo}`, {
        headers: {
          'Accept': 'application/vnd.github.v3+json',
          'User-Agent': 'AI-Scanner/1.0',
          // Add GitHub token if available (for higher rate limits)
          ...(process.env.GH_TOKEN && {
            'Authorization': `token ${process.env.GH_TOKEN}`
          })
        }
      })

      console.log(`Repository API response status: ${repoResponse.status}`)

      if (!repoResponse.ok) {
        const errorText = await repoResponse.text()
        console.log(`Repository API error: ${errorText}`)
        
        if (repoResponse.status === 404) {
          return NextResponse.json(
            { error: `Repository not found: ${repo}. Please check the repository name and format.` },
            { status: 404 }
          )
        } else if (repoResponse.status === 403) {
          return NextResponse.json(
            { error: `API rate limit exceeded or invalid token. Please check GH_TOKEN environment variable. Details: ${errorText}` },
            { status: 429 }
          )
        } else if (repoResponse.status === 401) {
          return NextResponse.json(
            { error: `Invalid GitHub token. Please check GH_TOKEN environment variable. Details: ${errorText}` },
            { status: 401 }
          )
        }
        return NextResponse.json(
          { error: `Failed to fetch repository information. Status: ${repoResponse.status}. Details: ${errorText}` },
          { status: 500 }
        )
      }

      const repoData: GitHubRepo = await repoResponse.json()
      console.log(`Repository data fetched: ${repoData.name}, stars: ${repoData.stargazers_count}`)

      repository = await RepositoryService.create({
        name: repoData.name,
        owner: repoData.owner.login,
        fullName: repo,
        description: repoData.description,
        url: repoData.html_url,
        language: repoData.language,
        stars: repoData.stargazers_count,
        forks: repoData.forks_count
      }) as any
      
      console.log(`Repository created in database with ID: ${repository?.id}`)
    } else {
      // Use existing repository without scans
      console.log(`Using existing repository with ID: ${repository!.id}`)
    }

    if (!repository) {
      return NextResponse.json(
        { error: 'Repository creation failed' },
        { status: 500 }
      )
    }

    let allIssues: GitHubIssue[] = []
    let cursor: string | undefined = undefined
    let pageCount = 0

    try {
      // Keep fetching pages until there are no more issues using cursor-based pagination
      let shouldPaginate = true
      while (shouldPaginate) {
        // Add delay to avoid rate limiting (especially important for large repositories)
        if (pageCount > 0) {
          console.log(`Waiting 1 second before fetching page ${pageCount + 1}...`)
          await new Promise(resolve => setTimeout(resolve, 1000))
        }

        // Build URL with cursor if available
        let url = `https://api.github.com/repos/${repo}/issues?state=all&per_page=100`
        if (cursor) {
          url += `&after=${cursor}`
        }

        // Retry logic for failed requests
        let retryCount = 0
        const maxRetries = 3
        let fetchResponse: Response

        while (retryCount < maxRetries) {
          try {
            fetchResponse = await fetch(url, {
              headers: {
                'Accept': 'application/vnd.github.v3+json',
                'User-Agent': 'AI-Scanner/1.0',
                ...(process.env.GH_TOKEN && {
                  'Authorization': `token ${process.env.GH_TOKEN}`
                })
              },
              // Add timeout to prevent hanging requests
              signal: AbortSignal.timeout(30000) // 30 second timeout
            })

            console.log(`GitHub API response status: ${fetchResponse.status} for page ${pageCount + 1}`)
            
            // Get the Link header for pagination info
            const linkHeader = fetchResponse.headers.get('link')
            console.log(`Link header: ${linkHeader}`)

            if (!fetchResponse.ok) {
              const errorText = await fetchResponse.text()
              console.log(`GitHub API error response: ${errorText}`)
              
              if (fetchResponse.status === 403) {
                return NextResponse.json(
                  { error: `API rate limit exceeded. Please add GH_TOKEN environment variable. Details: ${errorText}` },
                  { status: 429 }
                )
              } else if (fetchResponse.status === 404) {
                return NextResponse.json(
                  { error: `Repository not found or no access. Details: ${errorText}` },
                  { status: 404 }
                )
              } else if (fetchResponse.status === 401) {
                return NextResponse.json(
                  { error: `Invalid GitHub token. Please check GH_TOKEN. Details: ${errorText}` },
                  { status: 401 }
                )
              }
              throw new Error(`GitHub API error: ${fetchResponse.status} - ${errorText}`)
            }

            const pageIssues: GitHubIssue[] = await fetchResponse.json()
            console.log(`Fetched ${pageIssues.length} issues from page ${pageCount + 1}`)

            // If no more issues, we're done
            if (pageIssues.length === 0) {
              shouldPaginate = false
              break
            }

            allIssues = allIssues.concat(pageIssues)
            pageCount++

            // Extract the next cursor from the Link header
            if (linkHeader) {
              const nextLink = linkHeader.split(',').find((link: string) => link.includes('rel="next"'))
              if (nextLink) {
                const match = nextLink.match(/after=([^&>]+)/)
                if (match) {
                  cursor = decodeURIComponent(match[1])
                  console.log(`Next cursor: ${cursor}`)
                }
              }
            }

            // Safety check to avoid infinite loops
            if (pageCount >= 100) {
              console.log('Reached safety limit of 100 pages, stopping pagination')
              shouldPaginate = false
              break
            }

            // Check if there are more pages by looking at the Link header
            if (!linkHeader || !linkHeader.includes('rel="next"')) {
              console.log('No more pages available, stopping pagination')
              shouldPaginate = false
              break
            }

            break // Exit retry loop on success
          } catch (error) {
            retryCount++
            console.log(`Request failed (attempt ${retryCount}/${maxRetries}):`, error)
            
            if (retryCount >= maxRetries) {
              throw error
            }
            
            // Wait before retry with exponential backoff
            const waitTime = Math.pow(2, retryCount) * 1000
            console.log(`Waiting ${waitTime}ms before retry...`)
            await new Promise(resolve => setTimeout(resolve, waitTime))
          }
        }
      }

      // Filter out pull requests (they appear as issues in the API)
      const actualIssues = allIssues.filter(issue => 
        !issue.html_url.includes('/pull/')
      )
      
      console.log(`Total issues fetched: ${allIssues.length}`)
      console.log(`Issues after filtering PRs: ${actualIssues.length}`)

      // Store issues with embeddings
      const storedIssues = []
      for (const issueData of actualIssues) {
        // Generate embedding for the issue
        const textToEmbed = `${issueData.title} ${issueData.body || ''} ${issueData.labels.map(label => label.name).join(' ')}`
        const embedding = await EmbeddingService.generateEmbedding(textToEmbed)

        // Create or update issue with embedding
        const issue = await IssueService.upsert({
          repositoryId: repository!.id,
          issueNumber: issueData.number,
          title: issueData.title,
          description: issueData.body,
          status: issueData.state,
          priority: 'medium', // Default priority
          labels: issueData.labels.map(label => label.name),
          author: issueData.user?.login || '',
          authorUrl: issueData.user?.html_url,
          url: issueData.html_url,
          embedding
        }) as any

        storedIssues.push(issue)
      }

      // Create scan record
      const scan = await ScanService.create({
        repositoryId: repository!.id,
        issuesFetched: storedIssues.length,
        cachedSuccessfully: true,
        scanData: {
          timestamp: new Date().toISOString(),
          totalIssues: storedIssues.length,
          openIssues: storedIssues.filter(i => i.status === 'open').length,
          closedIssues: storedIssues.filter(i => i.status === 'closed').length,
          totalApiIssues: allIssues.length,
          filteredPullRequests: allIssues.length - actualIssues.length
        }
      }) as any

      const response = {
        repo,
        issues_fetched: storedIssues.length,
        cached_successfully: true,
        scan_id: scan.id,
        repository_id: repository!.id,
        scan_data: scan.scanData
      }

      return NextResponse.json(response)
    } catch (error) {
      console.error('Error fetching issues from GitHub:', error)
      return NextResponse.json(
        { error: 'Failed to fetch issues from GitHub API' },
        { status: 500 }
      )
    }
  } catch (error) {
    console.error('Error in scan route:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}

