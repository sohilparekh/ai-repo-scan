export async function delay(ms: number): Promise<void> {
  return new Promise<void>((resolve) => {
    setTimeout(() => {
      resolve()
    }, ms)
  })
}

export const HOST = process.env.NEXT_PUBLIC_URL ?? 'http://localhost:3000'

export function sum(a: number, b: number): number {
  return a + b
}

import { jest } from '@jest/globals'

// Test utilities and mock data for unit tests

export const mockRepository = {
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

export const mockIssue = {
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

export const mockScan = {
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

export const mockGitHubRepo = {
  name: 'test-repo',
  owner: {
    login: 'testuser',
    html_url: 'https://github.com/testuser',
  },
  fullName: 'testuser/test-repo',
  description: 'Test repository',
  html_url: 'https://github.com/testuser/test-repo',
  language: 'TypeScript',
  stargazers_count: 100,
  forks_count: 25,
}

export const mockGitHubIssue = {
  number: 42,
  title: 'Test Issue',
  body: 'This is a test issue',
  state: 'open',
  labels: [
    { name: 'bug' },
    { name: 'test' }
  ],
  user: {
    login: 'testuser',
    html_url: 'https://github.com/testuser',
  },
  html_url: 'https://github.com/testuser/test-repo/issues/42',
  created_at: '2024-01-01T00:00:00Z',
  updated_at: '2024-01-01T00:00:00Z',
}

// Helper function to create mock Prisma client
export const createMockPrismaClient = (overrides = {}) => {
  const defaultMocks = {
    repository: {
      findUnique: jest.fn(),
      findMany: jest.fn(),
      create: jest.fn(),
      update: jest.fn(),
      delete: jest.fn(),
      upsert: jest.fn(),
    },
    issue: {
      findUnique: jest.fn(),
      findMany: jest.fn(),
      create: jest.fn(),
      update: jest.fn(),
      delete: jest.fn(),
      upsert: jest.fn(),
    },
    scan: {
      findUnique: jest.fn(),
      findMany: jest.fn(),
      create: jest.fn(),
      update: jest.fn(),
      delete: jest.fn(),
    },
  }

  // Merge with any overrides
  return {
    ...defaultMocks,
    ...overrides,
  }
}

// Helper to reset all mocks
export const resetAllMocks = () => {
  jest.clearAllMocks()
}
