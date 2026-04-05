'use client'
import { useEffect } from 'react'
import { useSearchParams, useRouter } from 'next/navigation'

export default function AdminVerifyClient() {
  const params = useSearchParams()
  const router = useRouter()
  const token = params.get('token')
  const error = params.get('error')

  useEffect(() => {
    if (token) {
      router.push(`/api/admin/verify?token=${token}`)
    }
  }, [token, router])

  if (error) return (
    <div className="bg-white rounded-2xl p-8 text-center max-w-sm w-full">
      <div className="text-4xl mb-3">⚠️</div>
      <h2 className="text-xl font-bold text-red-700 mb-2">Link expired or invalid</h2>
      <p className="text-gray-600 text-sm mb-4">Please request a new magic link.</p>
      <a href="/admin/login" className="btn-primary inline-block">Back to Login</a>
    </div>
  )

  return (
    <div className="text-white text-center">
      <div className="text-4xl mb-3">⏳</div>
      <p>Signing you in...</p>
    </div>
  )
}
