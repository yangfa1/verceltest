import { getDb } from '@/lib/db'
import { NextRequest, NextResponse } from 'next/server'
import { verifyAdminSession } from '@/lib/auth'

export async function GET(req: NextRequest) {
  const session = await verifyAdminSession()
  if (!session) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })

  const status = req.nextUrl.searchParams.get('status') || 'all'
  const page   = Number(req.nextUrl.searchParams.get('page') || 1)
  const limit  = 20
  const offset = (page - 1) * limit
  const sql    = getDb()

  let rows, count
  if (status === 'all') {
    rows  = await sql`SELECT id, email, status, newsletters, created_at, verified_at FROM subscribers ORDER BY created_at DESC LIMIT ${limit} OFFSET ${offset}`
    count = await sql`SELECT COUNT(*) as count FROM subscribers`
  } else {
    rows  = await sql`SELECT id, email, status, newsletters, created_at, verified_at FROM subscribers WHERE status = ${status} ORDER BY created_at DESC LIMIT ${limit} OFFSET ${offset}`
    count = await sql`SELECT COUNT(*) as count FROM subscribers WHERE status = ${status}`
  }

  return NextResponse.json({ subscribers: rows, total: Number(count[0].count), page, limit })
}
