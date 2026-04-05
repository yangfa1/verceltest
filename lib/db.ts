import { sql } from '@vercel/postgres'

export async function getDb() {
  return sql
}

export async function runMigrations() {
  await sql`
    CREATE TABLE IF NOT EXISTS subscribers (
      id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
      email VARCHAR(255) UNIQUE NOT NULL,
      status VARCHAR(20) NOT NULL DEFAULT 'pending',
      newsletters TEXT[] NOT NULL DEFAULT '{}',
      token UUID UNIQUE DEFAULT gen_random_uuid(),
      created_at TIMESTAMPTZ DEFAULT now(),
      updated_at TIMESTAMPTZ DEFAULT now(),
      verified_at TIMESTAMPTZ
    )
  `
  await sql`
    CREATE TABLE IF NOT EXISTS admin_sessions (
      id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
      email VARCHAR(255) NOT NULL,
      token UUID UNIQUE DEFAULT gen_random_uuid(),
      expires_at TIMESTAMPTZ NOT NULL,
      used_at TIMESTAMPTZ,
      created_at TIMESTAMPTZ DEFAULT now()
    )
  `
}
