-- Enable pgvector extension
CREATE EXTENSION IF NOT EXISTS vector;

-- Create indexes for vector similarity search
-- These will be created after the tables exist
-- The actual indexes will be created by Prisma migrations
