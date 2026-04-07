import { getDb } from '@/lib/db'
import { NextRequest, NextResponse } from 'next/server'
import { verifyAdminSession } from '@/lib/auth'

export async function PATCH(req: NextRequest, { params }: { params: { id: string } }) {
  const session = await verifyAdminSession()
  if (!session) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })

  const { friendly_name, description, active } = await req.json()
  const sql = getDb()

  // Build update explicitly to avoid COALESCE boolean issues
  const result = await sql`
    UPDATE newsletter_types
    SET
      friendly_name = CASE WHEN ${friendly_name ?? null} IS NOT NULL THEN ${friendly_name ?? ''} ELSE friendly_name END,
      description   = CASE WHEN ${description ?? null} IS NOT NULL THEN ${description ?? ''} ELSE description END,
      active        = CASE WHEN ${active ?? null} IS NOT NULL THEN ${active === true} ELSE active END
    WHERE id = ${params.id}
    RETURNING *
  `
  if (!result.length) return NextResponse.json({ error: 'Not found.' }, { status: 404 })
  return NextResponse.json({ type: result[0] })
}

export async function DELETE(req: NextRequest, { params }: { params: { id: string } }) {
  const session = await verifyAdminSession()
  if (!session) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })

  const sql = getDb()
  await sql`DELETE FROM newsletter_types WHERE id = ${params.id}`
  return NextResponse.json({ success: true })
}
