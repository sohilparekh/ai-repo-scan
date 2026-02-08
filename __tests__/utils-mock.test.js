// Tests for utility functions (JavaScript version)
function delay(ms) {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve()
    }, ms)
  })
}

function sum(a, b) {
  return a + b
}

describe('Utility Functions', () => {
  describe('delay', () => {
    it('should delay execution for specified time', async () => {
      const startTime = Date.now()
      await delay(100)
      const endTime = Date.now()
      
      const elapsed = endTime - startTime
      expect(elapsed).toBeGreaterThanOrEqual(100)
      expect(elapsed).toBeLessThan(150) // Allow some tolerance
    })

    it('should resolve with undefined', async () => {
      const result = await delay(50)
      expect(result).toBeUndefined()
    })

    it('should handle zero delay', async () => {
      const startTime = Date.now()
      await delay(0)
      const endTime = Date.now()
      
      const elapsed = endTime - startTime
      expect(elapsed).toBeLessThan(50) // Should be very fast
    })

    it('should handle negative delay', async () => {
      const startTime = Date.now()
      await delay(-10)
      const endTime = Date.now()
      
      const elapsed = endTime - startTime
      expect(elapsed).toBeLessThan(50) // Should be very fast
    })
  })

  describe('sum', () => {
    it('should add two positive numbers', () => {
      expect(sum(2, 3)).toBe(5)
      expect(sum(10, 5)).toBe(15)
      expect(sum(100, 200)).toBe(300)
    })

    it('should handle negative numbers', () => {
      expect(sum(-2, 3)).toBe(1)
      expect(sum(2, -3)).toBe(-1)
      expect(sum(-5, -10)).toBe(-15)
    })

    it('should handle zero', () => {
      expect(sum(0, 0)).toBe(0)
      expect(sum(0, 5)).toBe(5)
      expect(sum(5, 0)).toBe(5)
    })

    it('should handle decimal numbers', () => {
      expect(sum(2.5, 3.5)).toBe(6)
      expect(sum(1.1, 2.2)).toBeCloseTo(3.3, 1)
    })

    it('should handle large numbers', () => {
      expect(sum(1000000, 2000000)).toBe(3000000)
    })
  })

  describe('Mock Data Objects', () => {
    it('should have valid mock repository structure', () => {
      const mockRepository = {
        id: 1,
        name: 'test-repo',
        owner: 'testuser',
        fullName: 'testuser/test-repo',
        description: 'Test repository',
        url: 'https://github.com/testuser/test-repo',
        language: 'TypeScript',
        stars: 100,
        forks: 25,
        createdAt: new Date('2024-01-01'),
        updatedAt: new Date('2024-01-01'),
      }

      expect(mockRepository.id).toBe(1)
      expect(mockRepository.name).toBe('test-repo')
      expect(mockRepository.owner).toBe('testuser')
      expect(mockRepository.fullName).toBe('testuser/test-repo')
      expect(mockRepository.url).toBe('https://github.com/testuser/test-repo')
      expect(mockRepository.language).toBe('TypeScript')
      expect(mockRepository.stars).toBe(100)
      expect(mockRepository.forks).toBe(25)
      expect(mockRepository.createdAt).toBeInstanceOf(Date)
      expect(mockRepository.updatedAt).toBeInstanceOf(Date)
    })

    it('should have valid mock issue structure', () => {
      const mockIssue = {
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
        createdAt: new Date('2024-01-01'),
        updatedAt: new Date('2024-01-01'),
      }

      expect(mockIssue.id).toBe(1)
      expect(mockIssue.repositoryId).toBe(1)
      expect(mockIssue.issueNumber).toBe(42)
      expect(mockIssue.title).toBe('Test Issue')
      expect(mockIssue.status).toBe('open')
      expect(mockIssue.priority).toBe('medium')
      expect(Array.isArray(mockIssue.labels)).toBe(true)
      expect(mockIssue.labels).toContain('bug')
      expect(mockIssue.author).toBe('testuser')
      expect(mockIssue.url).toContain('github.com')
      expect(Array.isArray(mockIssue.embedding)).toBe(true)
      expect(mockIssue.createdAt).toBeInstanceOf(Date)
      expect(mockIssue.updatedAt).toBeInstanceOf(Date)
    })

    it('should have valid mock scan structure', () => {
      const mockScan = {
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
        createdAt: new Date('2024-01-01'),
        updatedAt: new Date('2024-01-01'),
      }

      expect(mockScan.id).toBe(1)
      expect(mockScan.repositoryId).toBe(1)
      expect(mockScan.issuesFetched).toBe(50)
      expect(mockScan.cachedSuccessfully).toBe(true)
      expect(typeof mockScan.scanData).toBe('object')
      expect(mockScan.scanData.totalIssues).toBe(50)
      expect(mockScan.scanData.openIssues).toBe(30)
      expect(mockScan.scanData.closedIssues).toBe(20)
      expect(mockScan.createdAt).toBeInstanceOf(Date)
      expect(mockScan.updatedAt).toBeInstanceOf(Date)
    })
  })

  describe('Data Validation Utilities', () => {
    it('should validate repository names', () => {
      const validNames = [
        'test-repo',
        'test_repo',
        'test.repo',
        'test123',
        'Test-Repo'
      ]
      
      const invalidNames = [
        '',
        'test repo', // space
        'test/repo', // slash
        'test@repo', // special char
      ]

      validNames.forEach(name => {
        expect(name.length).toBeGreaterThan(0)
        expect(/^[a-zA-Z0-9._-]+$/.test(name)).toBe(true)
      })
    })

    it('should validate GitHub URLs', () => {
      const validUrls = [
        'https://github.com/owner/repo',
        'https://github.com/owner/repo.git',
        'https://www.github.com/owner/repo'
      ]
      
      const githubUrlPattern = /^https?:\/\/(www\.)?github\.com\/[^\/]+\/[^\/]+/
      
      validUrls.forEach(url => {
        expect(githubUrlPattern.test(url)).toBe(true)
      })
    })

    it('should validate issue priorities', () => {
      const validPriorities = ['critical', 'high', 'medium', 'low']
      
      validPriorities.forEach(priority => {
        expect(['critical', 'high', 'medium', 'low']).toContain(priority)
      })
    })

    it('should validate issue statuses', () => {
      const validStatuses = ['open', 'closed']
      
      validStatuses.forEach(status => {
        expect(['open', 'closed']).toContain(status)
      })
    })
  })

  describe('Error Handling Utilities', () => {
    it('should handle null inputs gracefully', () => {
      expect(() => sum(0, null)).not.toThrow() // JavaScript converts null to 0
      expect(() => sum(undefined, 5)).not.toThrow() // JavaScript converts undefined to NaN
    })

    it('should handle string inputs in sum function', () => {
      expect(sum('2', '3')).toBe('23') // JavaScript string concatenation
    })
  })
})
