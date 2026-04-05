import { getDb } from '@/lib/db'
import { NextResponse } from 'next/server'
import { sendVerificationEmail } from '@/lib/email'

export async function POST(req: Request) {
  try {
    const { email, newsletters } = await req.json()
    if (!email || !newsletters?.length) {
      return NextResponse.json({ error: 'Email and at least one newsletter required.' }, { status: 400 })
    }
    const normalizedEmail = email.toLowerCase().trim()
    const sql = getDb()

    const existing = await sql`SELECT * FROM subscribers WHERE email = ${normalizedEmail}`

    let token: string

    if (existing.length > 0) {
      const result = await sql`
        UPDATE subscribers
        SET status = 'pending', newsletters = ${newsletters}, token = gen_random_uuid(), updated_at = now()
        WHERE email = ${normalizedEmail}
        RETURNING token
      `
      token = result[0].token
      if (existing[0].status === 'active') {
        return NextResponse.json({
          message: `You're already subscribed! We've sent a new verification link to update your preferences.`
        })
      }
    } else {
      const result = await sql`
        INSERT INTO subscribers (email, newsletters, status)
        VALUES (${normalizedEmail}, ${newsletters}, 'pending')
        RETURNING token
      `
      token = result[0].token
    }

    await sendVerificationEmail(normalizedEmail, token)
    return NextResponse.json({
      message: `We've sent a verification link to ${normalizedEmail}. Please check your inbox!`
    })
  } catch (err) {
    console.error('[subscribe]', err)
    return NextResponse.json({ error: 'Something went wrong. Please try again.' }, { status: 500 })
  }
}
