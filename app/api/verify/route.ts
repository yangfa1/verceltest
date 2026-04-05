import { getDb } from '@/lib/db'
import { NextRequest, NextResponse } from 'next/server'

export async function GET(req: NextRequest) {
  const token = req.nextUrl.searchParams.get('token')
  if (!token) return NextResponse.json({ error: 'Token required.' }, { status: 400 })

  try {
    const sql = getDb()
    const result = await sql`
      UPDATE subscribers
      SET status = 'active', verified_at = now(), updated_at = now()
      WHERE token = ${token} AND status = 'pending'
      RETURNING email
    `
    if (!result.length) {
      return NextResponse.redirect(new URL('/verify?error=invalid', req.url))
    }
    return NextResponse.redirect(new URL('/verify?success=1', req.url))
  } catch (err) {
    console.error('[verify]', err)
    return NextResponse.redirect(new URL('/verify?error=server', req.url))
  }
}
