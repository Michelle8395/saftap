# Contributing to Safari Tap

This guide sets up the local development environment for Saftap, including the backend PostgreSQL database, Prisma migration, and seed workflow.

## 1. Configure Environment

Create `apps/backend/.env` from the example file:

```bash
cp apps/backend/.env.example apps/backend/.env
```

Set `DATABASE_URL` to your local PostgreSQL database:

```env
DATABASE_URL=postgresql://USER:PASSWORD@localhost:5432/saftap?schema=public
```

Do not commit `.env`; it is ignored by git.

## 2. Start PostgreSQL

If you already have PostgreSQL running locally, create a database named `saftap` and use its credentials in `DATABASE_URL`.

For a quick Docker-based setup:

```bash
docker run --name saftap-postgres \
  -e POSTGRES_USER=saftap \
  -e POSTGRES_PASSWORD=saftap \
  -e POSTGRES_DB=saftap \
  -p 5432:5432 \
  -d postgres:16
```

Use this connection string with the Docker setup:

```env
DATABASE_URL=postgresql://saftap:saftap@localhost:5432/saftap?schema=public
```

If the container already exists but is stopped:

```bash
docker start saftap-postgres
```

## 3. Install Dependencies

From the repo root:

```bash
pnpm install
```

## 4. Generate Prisma Client

From the repo root:

```bash
pnpm --filter @saftap/backend prisma:generate
```

Or from `apps/backend`:

```bash
pnpm prisma generate
```

## 5. Run Initial Migration

From `apps/backend`:

```bash
pnpm prisma migrate dev --name init
```

Or from the repo root:

```bash
pnpm --filter @saftap/backend prisma:migrate
```

## 6. Seed the Database

From `apps/backend`:

```bash
pnpm prisma db seed
```

Or from the repo root:

```bash
pnpm --filter @saftap/backend prisma:seed
```

The seed script clears existing data and creates one test TOURIST user with a linked Base Sepolia-style wallet.

## 7. Verify

Run the backend tests:

```bash
pnpm --filter @saftap/backend test
```

Run the backend typecheck:

```bash
pnpm --filter @saftap/backend typecheck
```

## Troubleshooting

If Prisma reports `Environment variable not found: DATABASE_URL`, confirm that `apps/backend/.env` exists and includes `DATABASE_URL`.

If Prisma cannot connect to PostgreSQL, confirm the database is running and that the username, password, host, port, and database name match your `DATABASE_URL`.
