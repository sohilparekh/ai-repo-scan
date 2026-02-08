import { prisma } from '../database'
import { Issue } from '@prisma/client'

export type CreateIssueData = {
  repositoryId: number
  issueNumber: number
  title: string
  description?: string
  status?: string
  priority?: string
  labels?: string[]
  author?: string
  authorUrl?: string
  url: string
  embedding?: any
}

export type UpdateIssueData = Partial<CreateIssueData>

export class IssueService {
  static async create(data: CreateIssueData): Promise<Issue> {
    return await prisma.issue.create({
      data: {
        ...data,
        status: data.status || 'open',
        priority: data.priority || 'medium',
      }
    })
  }

  static async findById(id: number): Promise<Issue | null> {
    return await prisma.issue.findUnique({
      where: { id },
      include: {
        repository: true
      }
    })
  }

  static async findByRepositoryId(repositoryId: number): Promise<Issue[]> {
    return await prisma.issue.findMany({
      where: { repositoryId },
      include: {
        repository: true
      },
      orderBy: {
        createdAt: 'desc'
      }
    })
  }

  static async findByIssueNumber(repositoryId: number, issueNumber: number): Promise<Issue | null> {
    return await prisma.issue.findUnique({
      where: {
        repositoryId_issueNumber: {
          repositoryId,
          issueNumber
        }
      },
      include: {
        repository: true
      }
    })
  }

  static async update(id: number, data: UpdateIssueData): Promise<Issue> {
    return await prisma.issue.update({
      where: { id },
      data
    })
  }

  static async upsert(data: CreateIssueData): Promise<Issue> {
    return await prisma.issue.upsert({
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
  }

  static async delete(id: number): Promise<Issue> {
    return await prisma.issue.delete({
      where: { id }
    })
  }

  static async deleteByRepositoryId(repositoryId: number): Promise<number> {
    const result = await prisma.issue.deleteMany({
      where: { repositoryId }
    })
    return result.count
  }

  static async findAll(limit?: number): Promise<Issue[]> {
    return await prisma.issue.findMany({
      include: {
        repository: true
      },
      orderBy: {
        createdAt: 'desc'
      },
      take: limit
    })
  }

  static async findByStatus(status: string): Promise<Issue[]> {
    return await prisma.issue.findMany({
      where: { status },
      include: {
        repository: true
      },
      orderBy: {
        createdAt: 'desc'
      }
    })
  }

  static async findByPriority(priority: string): Promise<Issue[]> {
    return await prisma.issue.findMany({
      where: { priority },
      include: {
        repository: true
      },
      orderBy: {
        createdAt: 'desc'
      }
    })
  }

  static async findByLabel(label: string): Promise<Issue[]> {
    return await prisma.issue.findMany({
      where: {
        labels: {
          has: label
        }
      },
      include: {
        repository: true
      },
      orderBy: {
        createdAt: 'desc'
      }
    })
  }

  static async search(query: string): Promise<Issue[]> {
    return await prisma.issue.findMany({
      where: {
        OR: [
          {
            title: {
              contains: query,
              mode: 'insensitive'
            }
          },
          {
            description: {
              contains: query,
              mode: 'insensitive'
            }
          }
        ]
      },
      include: {
        repository: true
      },
      orderBy: {
        createdAt: 'desc'
      }
    })
  }
}
