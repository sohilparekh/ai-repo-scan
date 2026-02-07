# AI Repo Scan Backend

A modern Next.js application with Prisma, PostgreSQL, Redis, and Docker support.

## Features

- **Next.js 14** with Turbopack for fast development
- **Prisma ORM** for type-safe database access
- **PostgreSQL** as the primary database
- **Redis** for caching and session storage
- **Docker** support for containerized deployment
- **GitHub Actions** for CI/CD
- **TypeScript** for type safety
- **Tailwind CSS** for styling

## Quick Start

### Prerequisites

- Node.js 18+
- Docker and Docker Compose
- Git

### Installation

1. Clone the repository:
```bash
git clone <your-repo-url>
cd ai-repo-scan
```

2. Install dependencies:
```bash
npm install
```

3. Set up environment variables:
```bash
cp .env.example .env.local
```

4. Start the development environment with Docker:
```bash
npm run docker:dev
```

Or run locally:

5. Set up the database:
```bash
npm run db:generate
npm run db:migrate
npm run db:seed
```

6. Start the development server:
```bash
npm run dev
```

## Docker Deployment

### Development

```bash
# Start development environment
npm run docker:dev
```

### Production

```bash
# Build and start production environment
npm run docker:prod
```

## Available Scripts

- `npm run dev` - Start development server with Turbopack
- `npm run build` - Build for production
- `npm run start` - Start production server
- `npm run lint` - Run ESLint
- `npm run type-check` - Run TypeScript type checking
- `npm run test` - Run tests
- `npm run db:generate` - Generate Prisma client
- `npm run db:push` - Push database schema
- `npm run db:migrate` - Run database migrations
- `npm run db:studio` - Open Prisma Studio
- `npm run db:seed` - Seed the database
- `npm run docker:build` - Build Docker image
- `npm run docker:run` - Run Docker container
- `npm run docker:dev` - Start development with Docker Compose
- `npm run docker:prod` - Start production with Docker Compose

## Environment Variables

Copy `.env.example` to `.env.local` and configure:

```env
# Database Configuration
POSTGRES_DB=ai_db_dev
POSTGRES_USER=postgres
POSTGRES_PASSWORD=password
POSTGRES_PORT=5432

# Redis Configuration
REDIS_URL=redis://redis:6379
REDIS_PORT=6379

# NextAuth Configuration
NEXTAUTH_SECRET="your-secret-key-here"
NEXTAUTH_URL="http://localhost:3000"

# Application Configuration
NODE_ENV="development"
PORT=3000
```

## Database

The application uses PostgreSQL as the primary database. The schema is defined in `prisma/schema.prisma`.

### Database Migrations

```bash
# Create a new migration
npx prisma migrate dev --name <migration-name>

# Apply migrations
npx prisma migrate deploy

# Reset database
npx prisma migrate reset
```

### Prisma Studio

```bash
# Open Prisma Studio
npm run db:studio
```

## Redis

Redis is used for caching and session storage. The Redis connection is configured via the `REDIS_URL` environment variable.

## CI/CD

The project includes GitHub Actions workflows for:

- **CI Pipeline**: Tests, linting, and type checking
- **Docker Build**: Builds and tests Docker images
- **CD Pipeline**: Deploys to production on main branch

The workflows are located in `.github/workflows/`.

## Docker Services

The Docker Compose setup includes:

- **app**: Next.js application
- **postgres**: PostgreSQL database
- **redis**: Redis cache
- **studio**: Prisma Studio (development only)

## Project Structure

```
├── app/                 # Next.js app directory
├── components/          # React components
├── lib/                 # Utility libraries
├── prisma/             # Database schema and migrations
├── public/             # Static assets
├── .github/            # GitHub Actions workflows
├── docker-compose.yml  # Production Docker setup
├── docker-compose.dev.yml # Development Docker setup
├── Dockerfile          # Production Docker image
└── Dockerfile.dev      # Development Docker image
```

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Run tests and linting
5. Submit a pull request

## License

This project is licensed under the MIT License.
