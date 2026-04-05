import { getDb } from '@/lib/db'
import { NextResponse } from 'next/server'
import { sendAdminMagicLink } from '@/lib/email'
import { isAdminEmail } from '@/lib/auth'

export async function POST(req: Request) {
  try {
    const { email } = await req.json()
    if (!email) return NextResponse.json({ error: 'Email required.' }, { status: 400 })
    if (!isAdminEmail(email)) {
      return NextResponse.json({ message: 'If this email is authorized, a login link has been sent.' })
    }
    const sql = getDb()
    const result = await sql`
      INSERT INTO admin_sessions (email, expires_at)
      VALUES (${email.toLowerCase()}, now() + interval '15 minutes')
      RETURNING token
    `
    await sendAdminMagicLink(email, result[0].token)
    return NextResponse.json({ message: 'If this email is authorized, a login link has been sent.' })
  } catch (err) {
    console.error('[admin/login]', err)
    return NextResponse.json({ error: 'Something went wrong.' }, { status: 500 })
  }
}
