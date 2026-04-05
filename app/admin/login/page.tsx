'use client'
import { useState } from 'react'

export default function AdminLoginPage() {
  const [email, setEmail] = useState('')
  const [status, setStatus] = useState<'idle' | 'loading' | 'sent' | 'error'>('idle')
  const [msg, setMsg] = useState('')

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setStatus('loading')
    const res = await fetch('/api/admin/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email }),
    })
    const data = await res.json()
    if (res.ok) { setStatus('sent'); setMsg(data.message) }
    else { setStatus('error'); setMsg(data.error || 'Something went wrong.') }
  }

  return (
    <div className="min-h-screen bg-brand-950 flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl shadow-xl p-8 w-full max-w-sm">
        <div className="text-center mb-6">
          <div className="w-12 h-12 bg-brand-700 rounded-xl flex items-center justify-center mx-auto mb-3">
            <span className="text-white font-bold">WW</span>
          </div>
          <h1 className="text-xl font-bold text-brand-900">Admin Login</h1>
          <p className="text-gray-500 text-sm mt-1">We'll send a magic link to your email</p>
        </div>

        {status === 'sent' ? (
          <div className="text-center py-4">
            <div className="text-4xl mb-3">📧</div>
            <p className="text-gray-700 text-sm">{msg}</p>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-4">
            <input
              type="email" required value={email} onChange={e => setEmail(e.target.value)}
              placeholder="admin@wisewin.ca"
              className="input-field"
            />
            {status === 'error' && <p className="text-red-500 text-sm">{msg}</p>}
            <button type="submit" disabled={status === 'loading'} className="btn-primary w-full">
              {status === 'loading' ? 'Sending...' : 'Send Magic Link'}
            </button>
          </form>
        )}
      </div>
    </div>
  )
}
