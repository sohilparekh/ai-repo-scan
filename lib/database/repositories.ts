import { prisma } from '../database'
import { Repository } from '@prisma/client'

export type CreateRepositoryData = {
  name: string
  owner: string
  fullName: string
  description?: string
  url: string
  language?: string
  stars?: number
  forks?: number
}

export type UpdateRepositoryData = Partial<CreateRepositoryData>

export class RepositoryService {
  static async create(data: CreateRepositoryData): Promise<Repository> {
    return await prisma.repository.create({
      data: {
        ...data,
        stars: data.stars || 0,
        forks: data.forks || 0,
      }
    })
  }

  static async findById(id: number): Promise<Repository | null> {
    return await prisma.repository.findUnique({
      where: { id },
      include: {
        issues: true,
        scans: true,
      }
    })
  }

  static async findByFullName(fullName: string): Promise<(Repository & { scans: any[]; issues: any[] }) | null> {
    return await prisma.repository.findUnique({
      where: { fullName },
      include: {
        issues: {
          orderBy: { createdAt: 'desc' }
        },
        scans: {
          orderBy: { createdAt: 'desc' },
          take: 1
        },
      }
    })
  }

  static async findByName(name: string): Promise<Repository | null> {
    return await prisma.repository.findUnique({
      where: { name },
      include: {
        issues: true,
        scans: true,
      }
    })
  }

  static async update(id: number, data: UpdateRepositoryData): Promise<Repository> {
    return await prisma.repository.update({
      where: { id },
      data
    })
  }

  static async delete(id: number): Promise<Repository> {
    return await prisma.repository.delete({
      where: { id }
    })
  }

  static async findAll(): Promise<Repository[]> {
    return await prisma.repository.findMany({
      include: {
        issues: true,
        scans: true,
      },
      orderBy: {
        createdAt: 'desc'
      }
    })
  }

  static async findMany(limit?: number): Promise<Repository[]> {
    return await prisma.repository.findMany({
      include: {
        issues: true,
        scans: true,
      },
      orderBy: {
        createdAt: 'desc'
      },
      take: limit
    })
  }

  static async findWithoutScans(): Promise<Repository[]> {
    return await prisma.repository.findMany({
      where: {
        scans: {
          none: {}
        }
      }
    })
  }
}
