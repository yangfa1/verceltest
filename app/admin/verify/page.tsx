import { Suspense } from 'react'
import AdminVerifyClient from './AdminVerifyClient'

export default function AdminVerifyPage() {
  return (
    <div className="min-h-screen bg-brand-950 flex items-center justify-center p-4">
      <Suspense fallback={<div className="text-white">Processing...</div>}>
        <AdminVerifyClient />
      </Suspense>
    </div>
  )
}
