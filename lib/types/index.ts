// Database entity types (from Prisma)
export interface RepositoryEntity {
  id: number;
  name: string;
  owner: string;
  fullName: string;
  description: string | null;
  url: string;
  language: string | null;
  stars: number;
  forks: number;
  createdAt: Date;
  updatedAt: Date;
  issues?: IssueEntity[];
  scans?: ScanEntity[];
}

export interface IssueEntity {
  id: number;
  repositoryId: number;
  repository?: RepositoryEntity;
  issueNumber: number;
  title: string;
  description: string | null;
  status: string;
  priority: string;
  labels: string[];
  author: string | null;
  authorUrl: string | null;
  url: string;
  createdAt: Date;
  updatedAt: Date;
  embedding?: unknown;
}

export interface ScanEntity {
  id: number;
  repositoryId: number;
  repository?: RepositoryEntity;
  issuesFetched: number;
  cachedSuccessfully: boolean;
  scanData?: unknown;
  createdAt: Date;
}

// Component/API types (transformed)
export interface Repository {
  id: number;
  name: string;
  owner: string;
  fullName: string;
  description?: string;
  url: string;
  language?: string;
  stars: number;
  forks: number;
  createdAt: Date;
  updatedAt: Date;
  issues?: Issue[];
  scans?: Scan[];
  totalIssues?: number; // Added for UI compatibility
}

export interface Issue {
  id: string; // Changed to string to match IssuesTable component
  repositoryId: number;
  repository?: Repository;
  issueNumber: number;
  title: string;
  description?: string;
  status: 'open' | 'closed';
  priority: 'critical' | 'high' | 'medium' | 'low';
  labels: string[];
  author: string;
  authorUrl?: string;
  url: string;
  createdAt: string; // Changed to string to match IssuesTable component
  updatedAt: Date;
  embedding?: number[];
}

export interface Scan {
  id: number;
  repositoryId: number;
  repository?: Repository;
  issuesFetched: number;
  cachedSuccessfully: boolean;
  scanData?: Record<string, unknown>;
  createdAt: Date;
}

export interface Pagination {
  currentPage: number;
  totalPages: number;
  totalItems: number;
  itemsPerPage: number;
  hasNextPage: boolean;
  hasPreviousPage: boolean;
}

export interface AnalysisResult {
  analysis: string;
  analysisTimestamp: string;
  prompt: string;
  repository: Repository;
  summary: {
    totalIssues: number;
    relevantIssues: number;
    openIssues: number;
    closedIssues: number;
    highPriorityIssues: number;
  };
  relevantIssues: Issue[];
  allRelevantIssues: Issue[]; // For pagination
  pagination: Pagination;
  cached: boolean;
}

export interface GitHubRepo {
  id: number;
  name: string;
  full_name: string;
  description?: string;
  html_url: string;
  language?: string;
  stargazers_count: number;
  forks_count: number;
  owner: {
    login: string;
    id: number;
    avatar_url: string;
    html_url: string;
  };
}

export interface GitHubIssue {
  id: number;
  number: number;
  title: string;
  body?: string;
  state: string;
  labels: Array<{
    id: number;
    name: string;
    color: string;
  }>;
  user?: {
    login: string;
    id: number;
    html_url: string;
  };
  html_url: string;
  created_at: string;
  updated_at: string;
}
