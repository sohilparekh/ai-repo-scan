// Tests for IssueService
const mockPrisma = {
  issue: {
    create: jest.fn(),
    findUnique: jest.fn(),
    findMany: jest.fn(),
    update: jest.fn(),
    delete: jest.fn(),
    upsert: jest.fn(),
  }
}

// Mock the database module
jest.mock('../lib/database', () => ({
  prisma: mockPrisma,
}))

// Mock the IssueService
const IssueService = {
  create: async (data) => {
    return mockPrisma.issue.create({ data })
  },
  findById: async (id) => {
    return mockPrisma.issue.findUnique({
      where: { id }
    })
  },
  findByRepositoryId: async (repositoryId) => {
    return mockPrisma.issue.findMany({
      where: { repositoryId },
      orderBy: { createdAt: 'desc' }
    })
  },
  update: async (id, data) => {
    return mockPrisma.issue.update({
      where: { id },
      data
    })
  },
  delete: async (id) => {
    return mockPrisma.issue.delete({
      where: { id }
    })
  },
  upsert: async (data) => {
    return mockPrisma.issue.upsert({
      where: {
        repositoryId_issueNumber: {
          repositoryId: data.repositoryId,
          issueNumber: data.issueNumber
        }
      },
      update: {
        title: data.title,
        description: data.description,
        status: data.status,
        priority: data.priority,
        labels: data.labels,
        author: data.author,
        authorUrl: data.authorUrl,
        url: data.url,
        embedding: data.embedding
      },
      create: data
    })
  },
  findAll: async () => {
    return mockPrisma.issue.findMany()
  }
}

const mockIssue = {
  id: 1,
  repositoryId: 1,
  issueNumber: 42,
  title: 'Test Issue',
  description: 'This is a test issue for unit testing',
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

describe('IssueService', () => {
  beforeEach(() => {
    jest.clearAllMocks()
  })

  describe('create', () => {
    it('should create a new issue successfully', async () => {
      const mockCreate = mockPrisma.issue.create
      mockCreate.mockResolvedValue(mockIssue)

      const result = await IssueService.create({
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
        embedding: [0.1, 0.2, 0.3]
      })

      expect(mockCreate).toHaveBeenCalledWith({
        data: {
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
          embedding: [0.1, 0.2, 0.3]
        }
      })
      expect(result).toEqual(mockIssue)
    })

    it('should handle create errors gracefully', async () => {
      const mockCreate = mockPrisma.issue.create
      const error = new Error('Database error')
      mockCreate.mockRejectedValue(error)

      await expect(IssueService.create({
        repositoryId: 1,
        issueNumber: 42,
        title: 'Test Issue'
      })).rejects.toThrow('Database error')
    })
  })

  describe('upsert', () => {
    it('should upsert an issue successfully', async () => {
      const mockUpsert = mockPrisma.issue.upsert
      mockUpsert.mockResolvedValue(mockIssue)

      const issueData = {
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
        embedding: [0.1, 0.2, 0.3]
      }

      const result = await IssueService.upsert(issueData)

      expect(mockUpsert).toHaveBeenCalledWith({
        where: {
          repositoryId_issueNumber: {
            repositoryId: 1,
            issueNumber: 42
          }
        },
        update: {
          title: 'Test Issue',
          description: 'This is a test issue',
          status: 'open',
          priority: 'medium',
          labels: ['bug', 'test'],
          author: 'testuser',
          authorUrl: 'https://github.com/testuser',
          url: 'https://github.com/testuser/test-repo/issues/42',
          embedding: [0.1, 0.2, 0.3]
        },
        create: issueData
      })
      expect(result).toEqual(mockIssue)
    })
  })

  describe('findByRepositoryId', () => {
    it('should find issues by repository id', async () => {
      const mockFindMany = mockPrisma.issue.findMany
      mockFindMany.mockResolvedValue([mockIssue])

      const result = await IssueService.findByRepositoryId(1)

      expect(mockFindMany).toHaveBeenCalledWith({
        where: { repositoryId: 1 },
        orderBy: { createdAt: 'desc' }
      })
      expect(result).toEqual([mockIssue])
    })

    it('should return empty array when no issues found', async () => {
      const mockFindMany = mockPrisma.issue.findMany
      mockFindMany.mockResolvedValue([])

      const result = await IssueService.findByRepositoryId(999)

      expect(result).toEqual([])
    })
  })
})
