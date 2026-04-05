import { redirect } from 'next/navigation'
import { verifyAdminSession } from '@/lib/auth'
import AdminDashboard from './AdminDashboard'

export default async function AdminPage() {
  const session = await verifyAdminSession()
  if (!session) redirect('/admin/login')
  return <AdminDashboard email={session.email} />
}
