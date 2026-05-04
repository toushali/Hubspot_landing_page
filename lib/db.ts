import { Pool, type PoolClient, type QueryResultRow } from 'pg'

/**
 * Postgres connection pool.
 *
 * Singleton in the global scope so Vercel's serverless function instances
 * reuse the same pool across invocations (within the same warm container).
 *
 * Reads `DATABASE_URL` env var. Works with any Postgres provider:
 *   - Supabase:        postgresql://postgres.[ref]:[password]@aws-0-[region].pooler.supabase.com:6543/postgres
 *   - Neon:            postgresql://[user]:[password]@[host]/[db]?sslmode=require
 *   - Self-hosted:     postgresql://user:password@host:5432/db
 *
 * To swap providers, change DATABASE_URL — no code changes needed.
 */

declare global {
  // eslint-disable-next-line no-var
  var __pgPool: Pool | undefined
}

function createPool(): Pool {
  if (!process.env.DATABASE_URL) {
    throw new Error(
      'DATABASE_URL is not set. Add it to your .env.local file or Vercel env vars.',
    )
  }

  return new Pool({
    connectionString: process.env.DATABASE_URL,
    // Pool sizing tuned for serverless (Vercel functions are short-lived)
    max: 5,
    idleTimeoutMillis: 30_000,
    connectionTimeoutMillis: 10_000,
    // SSL is required by Supabase, Neon, and most managed Postgres providers.
    // The `require: true` plus rejectUnauthorized: false combo accepts the
    // provider's default cert without manual cert pinning.
    ssl:
      process.env.NODE_ENV === 'production'
        ? { rejectUnauthorized: false }
        : process.env.DATABASE_URL.includes('sslmode=require') ||
          process.env.DATABASE_URL.includes('supabase.com') ||
          process.env.DATABASE_URL.includes('neon.tech')
        ? { rejectUnauthorized: false }
        : undefined,
  })
}

export const pool: Pool = global.__pgPool ?? createPool()

if (process.env.NODE_ENV !== 'production') {
  global.__pgPool = pool
}

/**
 * Execute a SQL query.
 *
 * Usage:
 *   const result = await query<{ id: string }>('SELECT id FROM leads WHERE email = $1', [email])
 *   console.log(result.rows[0]?.id)
 */
export async function query<T extends QueryResultRow = QueryResultRow>(
  text: string,
  params?: unknown[],
) {
  return pool.query<T>(text, params)
}

/**
 * Run multiple statements in a single transaction.
 *
 * Usage:
 *   await transaction(async (client) => {
 *     await client.query('INSERT ...')
 *     await client.query('UPDATE ...')
 *   })
 */
export async function transaction<T>(
  callback: (client: PoolClient) => Promise<T>,
): Promise<T> {
  const client = await pool.connect()
  try {
    await client.query('BEGIN')
    const result = await callback(client)
    await client.query('COMMIT')
    return result
  } catch (error) {
    await client.query('ROLLBACK')
    throw error
  } finally {
    client.release()
  }
}