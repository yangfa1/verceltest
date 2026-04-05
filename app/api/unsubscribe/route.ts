import { getDb } from '@/lib/db'
import { NextResponse } from 'next/server'
import { sendUnsubscribeConfirmEmail } from '@/lib/email'

export async function POST(req: Request) {
  try {
    const { email } = await req.json()
    if (!email) return NextResponse.json({ error: 'Email required.' }, { status: 400 })
    const normalizedEmail = email.toLowerCase().trim()
    const sql = getDb()

    const existing = await sql`SELECT * FROM subscribers WHERE email = ${normalizedEmail} AND status = 'active'`
    if (!existing.length) {
      return NextResponse.json({ error: 'No active subscription found for this email.' }, { status: 404 })
    }

    await sql`UPDATE subscribers SET status = 'inactive', updated_at = now() WHERE email = ${normalizedEmail}`
    await sendUnsubscribeConfirmEmail(normalizedEmail)
    return NextResponse.json({ message: `You've been unsubscribed from all Wise Win newsletters.` })
  } catch (err) {
    console.error('[unsubscribe]', err)
    return NextResponse.json({ error: 'Something went wrong.' }, { status: 500 })
  }
}
