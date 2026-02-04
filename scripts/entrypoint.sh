#!/bin/sh
# Exit immediately if a command exits with a non-zero status
set -e

# Run pending migrations
npx prisma migrate deploy

# (Optional) Seed the database - Prisma 7+ requires explicit seeding
# npx prisma db seed

# Start the application
exec "$@"