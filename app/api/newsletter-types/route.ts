import { getDb } from '@/lib/db'
import { NextResponse } from 'next/server'

export const dynamic = 'force-dynamic'

export async function GET() {
  try {
    const sql = getDb()
    const all = await sql`SELECT id, folder_name, active FROM newsletter_types ORDER BY created_at ASC`
    const types = await sql`
      SELECT id, friendly_name, folder_name, description
      FROM newsletter_types
      WHERE active = true
      ORDER BY created_at ASC
    `
    console.log('[newsletter-types] all rows:', JSON.stringify(all))
    console.log('[newsletter-types] active rows:', types.length)
    return NextResponse.json({ types, debug_count: types.length, debug_all: all }, {
      headers: { 'Cache-Control': 'no-store, no-cache, must-revalidate' }
    })
  } catch (err) {
    console.error('[newsletter-types]', err)
    return NextResponse.json({ types: [] })
  }
}
