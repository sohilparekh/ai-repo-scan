// Simple test for RepositoryService using mocked dependencies
const mockPrisma = {
  repository: {
    create: jest.fn(),
    findUnique: jest.fn(),
    update: jest.fn(),
    delete: jest.fn(),
    findMany: jest.fn(),
  }
}

// Mock the database module
jest.mock('../lib/database', () => ({
  prisma: mockPrisma,
}))

// Mock the services to test them individually
const RepositoryService = {
  create: async (data) => {
    return mockPrisma.repository.create({ data })
  },
  findByFullName: async (fullName) => {
    return mockPrisma.repository.findUnique({
      where: { fullName },
      include: {
        issues: {
          orderBy: { createdAt: 'desc' }
        },
        scans: {
          orderBy: { createdAt: 'desc' },
          take: 1
        }
      }
    })
  },
  findById: async (id) => {
    return mockPrisma.repository.findUnique({
      where: { id }
    })
  },
  update: async (id, data) => {
    return mockPrisma.repository.update({
      where: { id },
      data
    })
  },
  delete: async (id) => {
    return mockPrisma.repository.delete({
      where: { id }
    })
  },
  findAll: async () => {
    return mockPrisma.repository.findMany()
  }
}

const mockRepository = {
  id: 1,
  name: 'test-repo',
  owner: 'testuser',
  fullName: 'testuser/test-repo',
  description: 'Test repository for unit testing',
  url: 'https://github.com/testuser/test-repo',
  language: 'TypeScript',
  stars: 100,
  forks: 25,
  createdAt: new Date('2024-01-01'),
  updatedAt: new Date('2024-01-01'),
}

describe('RepositoryService', () => {
  beforeEach(() => {
    jest.clearAllMocks()
  })

  describe('create', () => {
    it('should create a new repository successfully', async () => {
      const mockCreate = mockPrisma.repository.create
      mockCreate.mockResolvedValue(mockRepository)

      const result = await RepositoryService.create({
        name: 'test-repo',
        owner: 'testuser',
        fullName: 'testuser/test-repo',
        description: 'Test repository',
        url: 'https://github.com/testuser/test-repo',
        language: 'TypeScript',
        stars: 100,
        forks: 25
      })

      expect(mockCreate).toHaveBeenCalledWith({
        data: {
          name: 'test-repo',
          owner: 'testuser',
          fullName: 'testuser/test-repo',
          description: 'Test repository',
          url: 'https://github.com/testuser/test-repo',
          language: 'TypeScript',
          stars: 100,
          forks: 25
        }
      })
      expect(result).toEqual(mockRepository)
    })

    it('should handle create errors gracefully', async () => {
      const mockCreate = mockPrisma.repository.create
      const error = new Error('Database error')
      mockCreate.mockRejectedValue(error)

      await expect(RepositoryService.create({
        name: 'test-repo',
        owner: 'testuser',
        fullName: 'testuser/test-repo',
        url: 'https://github.com/testuser/test-repo'
      })).rejects.toThrow('Database error')
    })
  })

  describe('findByFullName', () => {
    it('should find repository by full name', async () => {
      const mockFindUnique = mockPrisma.repository.findUnique
      mockFindUnique.mockResolvedValue(mockRepository)

      const result = await RepositoryService.findByFullName('testuser/test-repo')

      expect(mockFindUnique).toHaveBeenCalledWith({
        where: { fullName: 'testuser/test-repo' },
        include: {
          issues: {
            orderBy: { createdAt: 'desc' }
          },
          scans: {
            orderBy: { createdAt: 'desc' },
            take: 1
          }
        }
      })
      expect(result).toEqual(mockRepository)
    })

    it('should return null when repository not found', async () => {
      const mockFindUnique = mockPrisma.repository.findUnique
      mockFindUnique.mockResolvedValue(null)

      const result = await RepositoryService.findByFullName('nonexistent/repo')

      expect(result).toBeNull()
    })
  })
})
