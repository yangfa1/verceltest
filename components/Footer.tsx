export default function Footer() {
  return (
    <footer className="bg-brand-950 text-blue-200 py-8 px-4">
      <div className="max-w-4xl mx-auto text-center text-sm space-y-2">
        <p className="font-semibold text-white">慧盈财富 · Wise Win Financial</p>
        <p>Weekly financial intelligence for Canadian investors.</p>
        <p className="text-blue-400 text-xs">
          © {new Date().getFullYear()} Wise Win Financial. All rights reserved. ·{' '}
          <a href="https://www.wisewin.ca" className="underline hover:text-white">wisewin.ca</a>
        </p>
      </div>
    </footer>
  )
}
