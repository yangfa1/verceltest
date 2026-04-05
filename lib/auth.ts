import { SignJWT, jwtVerify } from 'jose'
import { cookies } from 'next/headers'

const SECRET = new TextEncoder().encode(
  process.env.ADMIN_JWT_SECRET || 'fallback-dev-secret-change-in-production'
)

const COOKIE = 'ww_admin_session'

export async function createAdminSession(email: string): Promise<string> {
  return new SignJWT({ email, role: 'admin' })
    .setProtectedHeader({ alg: 'HS256' })
    .setExpirationTime('24h')
    .setIssuedAt()
    .sign(SECRET)
}

export async function verifyAdminSession(): Promise<{ email: string } | null> {
  try {
    const cookieStore = cookies()
    const token = cookieStore.get(COOKIE)?.value
    if (!token) return null
    const { payload } = await jwtVerify(token, SECRET)
    return { email: payload.email as string }
  } catch {
    return null
  }
}

export function isAdminEmail(email: string): boolean {
  const allowed = (process.env.ADMIN_EMAILS || '').split(',').map(e => e.trim().toLowerCase())
  return allowed.includes(email.toLowerCase())
}

export { COOKIE as ADMIN_COOKIE }
