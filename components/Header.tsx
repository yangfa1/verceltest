import Link from 'next/link'
import Image from 'next/image'

export default function Header() {
  return (
    <header className="bg-white border-b border-gray-100 sticky top-0 z-50">
      <div className="max-w-6xl mx-auto px-4 h-16 flex items-center justify-between">
        <Link href="/" className="flex items-center gap-2">
          <Image
            src="https://www.wisewin.ca/logo.png"
            alt="Wise Win Financial"
            width={48}
            height={48}
            className="h-10 w-auto"
          />
          <span className="font-semibold text-gray-800 text-sm hidden sm:block">慧盈财富 · Wise Win Financial</span>
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
