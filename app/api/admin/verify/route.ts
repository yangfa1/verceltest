import { sql } from '@vercel/postgres'
import { NextRequest, NextResponse } from 'next/server'
import { createAdminSession, ADMIN_COOKIE } from '@/lib/auth'

export async function GET(req: NextRequest) {
  const token = req.nextUrl.searchParams.get('token')
  if (!token) return NextResponse.redirect(new URL('/admin/login?error=invalid', req.url))

  try {
    const result = await sql`
      SELECT * FROM admin_sessions
      WHERE token = ${token}
      AND expires_at > now()
      AND used_at IS NULL
    `
    if (!result.rows.length) {
      return NextResponse.redirect(new URL('/admin/login?error=expired', req.url))
    }

    await sql`UPDATE admin_sessions SET used_at = now() WHERE token = ${token}`

    const session = await createAdminSession(result.rows[0].email)
    const res = NextResponse.redirect(new URL('/admin', req.url))
    res.cookies.set(ADMIN_COOKIE, session, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      maxAge: 60 * 60 * 24, // 24h
      path: '/',
    })
    return res
  } catch (err) {
    console.error('[admin/verify]', err)
    return NextResponse.redirect(new URL('/admin/login?error=server', req.url))
  }
}
