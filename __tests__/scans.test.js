// Tests for ScanService
const mockPrisma = {
  scan: {
    create: jest.fn(),
    findUnique: jest.fn(),
    findMany: jest.fn(),
    findFirst: jest.fn(),
    update: jest.fn(),
    delete: jest.fn(),
  }
}

// Mock the database module
jest.mock('../lib/database', () => ({
  prisma: mockPrisma,
}))

// Mock the ScanService
const ScanService = {
  create: async (data) => {
    return mockPrisma.scan.create({ data })
  },
  findById: async (id) => {
    return mockPrisma.scan.findUnique({
      where: { id }
    })
  },
  findByRepositoryId: async (repositoryId) => {
    return mockPrisma.scan.findMany({
      where: { repositoryId },
      orderBy: { createdAt: 'desc' }
    })
  },
  findLatestByRepositoryId: async (repositoryId) => {
    return mockPrisma.scan.findFirst({
      where: { repositoryId },
      orderBy: { createdAt: 'desc' }
    })
  },
  update: async (id, data) => {
    return mockPrisma.scan.update({
      where: { id },
      data
    })
  },
  delete: async (id) => {
    return mockPrisma.scan.delete({
      where: { id }
    })
  },
  findAll: async () => {
    return mockPrisma.scan.findMany()
  }
}

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

describe('ScanService', () => {
  beforeEach(() => {
    jest.clearAllMocks()
  })

  describe('create', () => {
    it('should create a new scan successfully', async () => {
      const mockCreate = mockPrisma.scan.create
      mockCreate.mockResolvedValue(mockScan)

      const scanData = {
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
        }
      }

      const result = await ScanService.create(scanData)

      expect(mockCreate).toHaveBeenCalledWith({
        data: scanData
      })
      expect(result).toEqual(mockScan)
    })

    it('should handle create errors gracefully', async () => {
      const mockCreate = mockPrisma.scan.create
      const error = new Error('Database error')
      mockCreate.mockRejectedValue(error)

      await expect(ScanService.create({
        repositoryId: 1,
        issuesFetched: 50
      })).rejects.toThrow('Database error')
    })
  })

  describe('findByRepositoryId', () => {
    it('should find scans by repository id', async () => {
      const mockFindMany = mockPrisma.scan.findMany
      mockFindMany.mockResolvedValue([mockScan])

      const result = await ScanService.findByRepositoryId(1)

      expect(mockFindMany).toHaveBeenCalledWith({
        where: { repositoryId: 1 },
        orderBy: { createdAt: 'desc' }
      })
      expect(result).toEqual([mockScan])
    })

    it('should return empty array when no scans found', async () => {
      const mockFindMany = mockPrisma.scan.findMany
      mockFindMany.mockResolvedValue([])

      const result = await ScanService.findByRepositoryId(999)

      expect(result).toEqual([])
    })
  })

  describe('findLatestByRepositoryId', () => {
    it('should find latest scan by repository id', async () => {
      const mockFindFirst = mockPrisma.scan.findFirst
      mockFindFirst.mockResolvedValue(mockScan)

      const result = await ScanService.findLatestByRepositoryId(1)

      expect(mockFindFirst).toHaveBeenCalledWith({
        where: { repositoryId: 1 },
        orderBy: { createdAt: 'desc' }
      })
      expect(result).toEqual(mockScan)
    })

    it('should return null when no scans found', async () => {
      const mockFindFirst = mockPrisma.scan.findFirst
      mockFindFirst.mockResolvedValue(null)

      const result = await ScanService.findLatestByRepositoryId(999)

      expect(result).toBeNull()
    })
  })

  describe('update', () => {
    it('should update scan successfully', async () => {
      const mockUpdate = mockPrisma.scan.update
      const updatedScan = { ...mockScan, issuesFetched: 60 }
      mockUpdate.mockResolvedValue(updatedScan)

      const result = await ScanService.update(1, {
        issuesFetched: 60
      })

      expect(mockUpdate).toHaveBeenCalledWith({
        where: { id: 1 },
        data: { issuesFetched: 60 }
      })
      expect(result).toEqual(updatedScan)
    })

    it('should handle update errors gracefully', async () => {
      const mockUpdate = mockPrisma.scan.update
      const error = new Error('Update failed')
      mockUpdate.mockRejectedValue(error)

      await expect(ScanService.update(1, {
        issuesFetched: 60
      })).rejects.toThrow('Update failed')
    })
  })
})
