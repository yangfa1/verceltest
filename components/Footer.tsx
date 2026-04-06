import Image from 'next/image'

export default function Footer() {
  return (
    <footer className="bg-gray-50 border-t border-gray-100 py-8 px-4">
      <div className="max-w-4xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
        <div className="flex items-center gap-2">
          <Image
            src="https://www.wisewin.ca/logo.png"
            alt="Wise Win Financial"
            width={32}
            height={32}
            className="h-7 w-auto"
          />
          <span className="text-gray-700 font-semibold text-sm">慧盈财富 · Wise Win Financial</span>
        </div>
        <div className="text-gray-400 text-xs text-center">
          © {new Date().getFullYear()} Wise Win Financial · Weekly financial intelligence for Canadian investors ·{' '}
          <a href="https://www.wisewin.ca" className="hover:text-brand-700 transition-colors">wisewin.ca</a>
        </div>
      </div>
    </footer>
  )
}
