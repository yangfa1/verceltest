'use client'
import { useSearchParams } from 'next/navigation'
import Link from 'next/link'

export default function VerifyClient() {
  const params = useSearchParams()
  const success = params.get('success')
  const error = params.get('error')

  if (success) return (
    <div className="text-center max-w-md">
      <div className="text-6xl mb-4">✅</div>
      <h1 className="text-2xl font-bold text-brand-900 mb-2">You're subscribed!</h1>
      <p className="text-gray-600 mb-6">Your email has been verified. You'll start receiving Wise Win newsletters shortly.</p>
      <Link href="/" className="btn-primary inline-block">Back to Home</Link>
    </div>
  )

  if (error) return (
    <div className="text-center max-w-md">
      <div className="text-6xl mb-4">⚠️</div>
      <h1 className="text-2xl font-bold text-red-700 mb-2">Invalid or expired link</h1>
      <p className="text-gray-600 mb-6">This verification link has already been used or has expired. Please subscribe again.</p>
      <Link href="/" className="btn-primary inline-block">Try Again</Link>
    </div>
  )

  return (
    <div className="text-center">
      <div className="text-4xl mb-4">⏳</div>
      <p className="text-gray-600">Processing your verification...</p>
    </div>
  )
}
