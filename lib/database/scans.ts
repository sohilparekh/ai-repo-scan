import { prisma } from '../database'
import { Scan } from '@prisma/client'

export type CreateScanData = {
  repositoryId: number
  issuesFetched: number
  cachedSuccessfully?: boolean
  scanData?: any
}

export type UpdateScanData = Partial<CreateScanData>

export class ScanService {
  static async create(data: CreateScanData): Promise<Scan> {
    return await prisma.scan.create({
      data: {
        ...data,
        cachedSuccessfully: data.cachedSuccessfully ?? true,
      }
    })
  }

  static async findById(id: number): Promise<Scan | null> {
    return await prisma.scan.findUnique({
      where: { id },
      include: {
        repository: true
      }
    })
  }

  static async findByRepositoryId(repositoryId: number): Promise<Scan[]> {
    return await prisma.scan.findMany({
      where: { repositoryId },
      include: {
        repository: true
      },
      orderBy: {
        createdAt: 'desc'
      }
    })
  }

  static async findLatestByRepositoryId(repositoryId: number): Promise<Scan | null> {
    return await prisma.scan.findFirst({
      where: { repositoryId },
      include: {
        repository: true
      },
      orderBy: {
        createdAt: 'desc'
      }
    })
  }

  static async update(id: number, data: UpdateScanData): Promise<Scan> {
    return await prisma.scan.update({
      where: { id },
      data
    })
  }

  static async delete(id: number): Promise<Scan> {
    return await prisma.scan.delete({
      where: { id }
    })
  }

  static async deleteByRepositoryId(repositoryId: number): Promise<number> {
    const result = await prisma.scan.deleteMany({
      where: { repositoryId }
    })
    return result.count
  }

  static async findAll(limit?: number): Promise<Scan[]> {
    return await prisma.scan.findMany({
      include: {
        repository: true
      },
      orderBy: {
        createdAt: 'desc'
      },
      take: limit
    })
  }

  static async findSuccessfulScans(): Promise<Scan[]> {
    return await prisma.scan.findMany({
      where: {
        cachedSuccessfully: true
      },
      include: {
        repository: true
      },
      orderBy: {
        createdAt: 'desc'
      }
    })
  }

  static async findFailedScans(): Promise<Scan[]> {
    return await prisma.scan.findMany({
      where: {
        cachedSuccessfully: false
      },
      include: {
        repository: true
      },
      orderBy: {
        createdAt: 'desc'
      }
    })
  }

  static async getScanStats(): Promise<{
    totalScans: number
    successfulScans: number
    failedScans: number
    averageIssuesFetched: number
  }> {
    const stats = await prisma.scan.aggregate({
      _count: {
        id: true
      },
      _avg: {
        issuesFetched: true
      },
      where: {
        cachedSuccessfully: true
      }
    })

    const failedStats = await prisma.scan.count({
      where: {
        cachedSuccessfully: false
      }
    })

    return {
      totalScans: stats._count.id + failedStats,
      successfulScans: stats._count.id,
      failedScans: failedStats,
      averageIssuesFetched: Math.round(stats._avg.issuesFetched || 0)
    }
  }
}
