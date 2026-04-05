import { getDb } from '@/lib/db'
import { NextResponse } from 'next/server'
import { verifyAdminSession } from '@/lib/auth'

export async function GET() {
  const session = await verifyAdminSession()
  if (!session) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })

  const sql = getDb()
  const total   = await sql`SELECT COUNT(*) as count FROM subscribers`
  const active  = await sql`SELECT COUNT(*) as count FROM subscribers WHERE status = 'active'`
  const pending = await sql`SELECT COUNT(*) as count FROM subscribers WHERE status = 'pending'`
  const inactive= await sql`SELECT COUNT(*) as count FROM subscribers WHERE status = 'inactive'`
  const recent  = await sql`
    SELECT email, status, newsletters, created_at, verified_at
    FROM subscribers ORDER BY created_at DESC LIMIT 10
  `

  return NextResponse.json({
    stats: {
      total:    Number(total[0].count),
      active:   Number(active[0].count),
      pending:  Number(pending[0].count),
      inactive: Number(inactive[0].count),
    },
    recent: recent,
  })
}
