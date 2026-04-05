import Link from 'next/link'

export default function Header() {
  return (
    <header className="bg-white border-b border-gray-100 sticky top-0 z-50">
      <div className="max-w-6xl mx-auto px-4 h-16 flex items-center justify-between">
        <Link href="/" className="flex items-center gap-2">
          <div className="w-8 h-8 bg-brand-700 rounded-lg flex items-center justify-center">
            <span className="text-white font-bold text-sm">WW</span>
          </div>
          <div>
            <span className="font-bold text-brand-900 text-sm">慧盈财富</span>
            <span className="text-gray-400 text-sm"> · Wise Win Financial</span>
          </div>
        </Link>
        <nav className="flex items-center gap-4 text-sm">
          <a href="https://www.wisewin.ca" target="_blank" rel="noopener noreferrer"
            className="text-gray-500 hover:text-brand-700 transition-colors">
            Main Site
          </a>
        </nav>
      </div>
    </header>
  )
}
