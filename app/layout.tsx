import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: '慧盈财富 Newsletter | Wise Win Financial',
  description: 'Subscribe to weekly financial reports and stock market forecasts from Wise Win Financial.',
  icons: { icon: '/favicon.ico' },
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className="min-h-screen flex flex-col">{children}</body>
    </html>
  )
}
