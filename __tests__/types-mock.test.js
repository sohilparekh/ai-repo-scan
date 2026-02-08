// Tests for types and interfaces (JavaScript version)
describe('Types and Interfaces', () => {
  describe('RepositoryEntity', () => {
    it('should have required repository fields', () => {
      const repository = {
        id: 1,
        name: 'test-repo',
        owner: 'testuser',
        fullName: 'testuser/test-repo',
        url: 'https://github.com/testuser/test-repo',
        createdAt: new Date(),
        updatedAt: new Date(),
      }

      expect(repository.id).toBe(1)
      expect(repository.name).toBe('test-repo')
      expect(repository.owner).toBe('testuser')
      expect(repository.fullName).toBe('testuser/test-repo')
      expect(repository.url).toContain('github.com')
      expect(repository.createdAt).toBeInstanceOf(Date)
      expect(repository.updatedAt).toBeInstanceOf(Date)
    })

    it('should have optional repository fields', () => {
      const repository = {
        id: 1,
        name: 'test-repo',
        owner: 'testuser',
        fullName: 'testuser/test-repo',
        url: 'https://github.com/testuser/test-repo',
        description: 'Test repository',
        language: 'TypeScript',
        stars: 100,
        forks: 25,
        createdAt: new Date(),
        updatedAt: new Date(),
      }

      expect(repository.description).toBe('Test repository')
      expect(repository.language).toBe('TypeScript')
      expect(repository.stars).toBe(100)
      expect(repository.forks).toBe(25)
    })

    it('should handle repository with issues', () => {
      const repository = {
        id: 1,
        name: 'test-repo',
        owner: 'testuser',
        fullName: 'testuser/test-repo',
        url: 'https://github.com/testuser/test-repo',
        createdAt: new Date(),
        updatedAt: new Date(),
        issues: [
          {
            id: 1,
            repositoryId: 1,
            issueNumber: 42,
            title: 'Test Issue',
            status: 'open',
            priority: 'medium',
            createdAt: new Date(),
            updatedAt: new Date(),
          }
        ]
      }

      expect(Array.isArray(repository.issues)).toBe(true)
      expect(repository.issues).toHaveLength(1)
      expect(repository.issues[0].title).toBe('Test Issue')
    })
  })

  describe('IssueEntity', () => {
    it('should have required issue fields', () => {
      const issue = {
        id: 1,
        repositoryId: 1,
        issueNumber: 42,
        title: 'Test Issue',
        status: 'open',
        priority: 'medium',
        createdAt: new Date(),
        updatedAt: new Date(),
      }

      expect(issue.id).toBe(1)
      expect(issue.repositoryId).toBe(1)
      expect(issue.issueNumber).toBe(42)
      expect(issue.title).toBe('Test Issue')
      expect(['open', 'closed']).toContain(issue.status)
      expect(['critical', 'high', 'medium', 'low']).toContain(issue.priority)
      expect(issue.createdAt).toBeInstanceOf(Date)
      expect(issue.updatedAt).toBeInstanceOf(Date)
    })

    it('should have optional issue fields', () => {
      const issue = {
        id: 1,
        repositoryId: 1,
        issueNumber: 42,
        title: 'Test Issue',
        description: 'This is a test issue',
        status: 'open',
        priority: 'medium',
        labels: ['bug', 'test'],
        author: 'testuser',
        authorUrl: 'https://github.com/testuser',
        url: 'https://github.com/testuser/test-repo/issues/42',
        embedding: [0.1, 0.2, 0.3],
        createdAt: new Date(),
        updatedAt: new Date(),
      }

      expect(issue.description).toBe('This is a test issue')
      expect(Array.isArray(issue.labels)).toBe(true)
      expect(issue.labels).toContain('bug')
      expect(issue.author).toBe('testuser')
      expect(issue.authorUrl).toContain('github.com')
      expect(issue.url).toContain('github.com')
      expect(Array.isArray(issue.embedding)).toBe(true)
    })
  })

  describe('ScanEntity', () => {
    it('should have required scan fields', () => {
      const scan = {
        id: 1,
        repositoryId: 1,
        issuesFetched: 50,
        cachedSuccessfully: true,
        createdAt: new Date(),
        updatedAt: new Date(),
      }

      expect(scan.id).toBe(1)
      expect(scan.repositoryId).toBe(1)
      expect(scan.issuesFetched).toBe(50)
      expect(typeof scan.cachedSuccessfully).toBe('boolean')
      expect(scan.createdAt).toBeInstanceOf(Date)
      expect(scan.updatedAt).toBeInstanceOf(Date)
    })

    it('should have scan data object', () => {
      const scan = {
        id: 1,
        repositoryId: 1,
        issuesFetched: 50,
        cachedSuccessfully: true,
        scanData: {
          timestamp: new Date().toISOString(),
          totalIssues: 50,
          openIssues: 30,
          closedIssues: 20,
          totalApiIssues: 55,
          filteredPullRequests: 5,
        },
        createdAt: new Date(),
        updatedAt: new Date(),
      }

      expect(typeof scan.scanData).toBe('object')
      expect(scan.scanData.totalIssues).toBe(50)
      expect(scan.scanData.openIssues).toBe(30)
      expect(scan.scanData.closedIssues).toBe(20)
      expect(scan.scanData.totalApiIssues).toBe(55)
      expect(scan.scanData.filteredPullRequests).toBe(5)
    })
  })

  describe('AnalysisResult', () => {
    it('should have analysis result structure', () => {
      const analysisResult = {
        analysis: '# Repository Analysis\n\nThis is a test analysis.',
        analysisTimestamp: new Date().toISOString(),
        prompt: 'test prompt',
        repository: {
          id: 1,
          name: 'test-repo',
          owner: 'testuser',
          fullName: 'testuser/test-repo',
          url: 'https://github.com/testuser/test-repo',
          totalIssues: 10,
        },
        allRelevantIssues: [],
        relevantIssues: [],
        summary: {
          totalIssues: 10,
          relevantIssues: 5,
          openIssues: 3,
          closedIssues: 7,
          highPriorityIssues: 2,
        },
        pagination: {
          currentPage: 1,
          totalPages: 1,
          totalItems: 5,
          itemsPerPage: 10,
          hasNextPage: false,
          hasPreviousPage: false,
        },
        cached: false,
      }

      expect(typeof analysisResult.analysis).toBe('string')
      expect(analysisResult.analysis).toContain('# Repository Analysis')
      expect(analysisResult.analysisTimestamp).toMatch(/^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}/)
      expect(analysisResult.prompt).toBe('test prompt')
      expect(typeof analysisResult.repository).toBe('object')
      expect(Array.isArray(analysisResult.allRelevantIssues)).toBe(true)
      expect(Array.isArray(analysisResult.relevantIssues)).toBe(true)
      expect(typeof analysisResult.summary).toBe('object')
      expect(typeof analysisResult.pagination).toBe('object')
      expect(typeof analysisResult.cached).toBe('boolean')
    })

    it('should have valid summary structure', () => {
      const summary = {
        totalIssues: 10,
        relevantIssues: 5,
        openIssues: 3,
        closedIssues: 7,
        highPriorityIssues: 2,
      }

      expect(summary.totalIssues).toBe(10)
      expect(summary.relevantIssues).toBe(5)
      expect(summary.openIssues).toBe(3)
      expect(summary.closedIssues).toBe(7)
      expect(summary.highPriorityIssues).toBe(2)
      expect(summary.openIssues + summary.closedIssues).toBe(summary.totalIssues)
    })

    it('should have valid pagination structure', () => {
      const pagination = {
        currentPage: 1,
        totalPages: 2,
        totalItems: 15,
        itemsPerPage: 10,
        hasNextPage: true,
        hasPreviousPage: false,
      }

      expect(pagination.currentPage).toBe(1)
      expect(pagination.totalPages).toBe(2)
      expect(pagination.totalItems).toBe(15)
      expect(pagination.itemsPerPage).toBe(10)
      expect(pagination.hasNextPage).toBe(true)
      expect(pagination.hasPreviousPage).toBe(false)
      expect(pagination.currentPage).toBeLessThanOrEqual(pagination.totalPages)
    })
  })

  describe('API Request/Response Types', () => {
    it('should validate analyze request structure', () => {
      const analyzeRequest = {
        repo: 'owner/repo',
        prompt: 'test prompt',
        page: 1,
        limit: 10,
      }

      expect(analyzeRequest.repo).toBe('owner/repo')
      expect(analyzeRequest.prompt).toBe('test prompt')
      expect(analyzeRequest.page).toBe(1)
      expect(analyzeRequest.limit).toBe(10)
    })

    it('should validate scan request structure', () => {
      const scanRequest = {
        repo: 'owner/repo',
        force: false,
      }

      expect(scanRequest.repo).toBe('owner/repo')
      expect(typeof scanRequest.force).toBe('boolean')
    })

    it('should validate error response structure', () => {
      const errorResponse = {
        error: 'Repository not found',
        status: 404,
      }

      expect(typeof errorResponse.error).toBe('string')
      expect(errorResponse.status).toBe(404)
    })
  })

  describe('Database Types', () => {
    it('should validate CreateRepositoryData', () => {
      const createRepoData = {
        name: 'test-repo',
        owner: 'testuser',
        fullName: 'testuser/test-repo',
        url: 'https://github.com/testuser/test-repo',
        description: 'Test repository',
        language: 'TypeScript',
        stars: 100,
        forks: 25,
      }

      expect(createRepoData.name).toBe('test-repo')
      expect(createRepoData.owner).toBe('testuser')
      expect(createRepoData.fullName).toBe('testuser/test-repo')
      expect(createRepoData.url).toContain('github.com')
    })

    it('should validate CreateIssueData', () => {
      const createIssueData = {
        repositoryId: 1,
        issueNumber: 42,
        title: 'Test Issue',
        description: 'Test description',
        status: 'open',
        priority: 'medium',
        labels: ['bug', 'test'],
        author: 'testuser',
        authorUrl: 'https://github.com/testuser',
        url: 'https://github.com/testuser/test-repo/issues/42',
        embedding: [0.1, 0.2, 0.3],
      }

      expect(createIssueData.repositoryId).toBe(1)
      expect(createIssueData.issueNumber).toBe(42)
      expect(createIssueData.title).toBe('Test Issue')
      expect(['open', 'closed']).toContain(createIssueData.status)
      expect(['critical', 'high', 'medium', 'low']).toContain(createIssueData.priority)
      expect(Array.isArray(createIssueData.labels)).toBe(true)
    })

    it('should validate CreateScanData', () => {
      const createScanData = {
        repositoryId: 1,
        issuesFetched: 50,
        cachedSuccessfully: true,
        scanData: {
          timestamp: new Date().toISOString(),
          totalIssues: 50,
          openIssues: 30,
          closedIssues: 20,
        },
      }

      expect(createScanData.repositoryId).toBe(1)
      expect(createScanData.issuesFetched).toBe(50)
      expect(typeof createScanData.cachedSuccessfully).toBe('boolean')
      expect(typeof createScanData.scanData).toBe('object')
    })
  })

  describe('Enum Types', () => {
    it('should validate priority enum values', () => {
      const priorities = ['critical', 'high', 'medium', 'low']
      
      priorities.forEach(priority => {
        expect(['critical', 'high', 'medium', 'low']).toContain(priority)
      })
    })

    it('should validate status enum values', () => {
      const statuses = ['open', 'closed']
      
      statuses.forEach(status => {
        expect(['open', 'closed']).toContain(status)
      })
    })
  })
})
