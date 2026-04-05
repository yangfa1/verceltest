import SubscribeForm from '@/components/SubscribeForm'
import Header from '@/components/Header'
import Footer from '@/components/Footer'

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="flex-1">
        {/* Hero */}
        <section className="bg-gradient-to-br from-brand-950 via-brand-800 to-brand-700 text-white py-20 px-4">
          <div className="max-w-3xl mx-auto text-center">
            <div className="inline-flex items-center gap-2 bg-white/10 rounded-full px-4 py-1.5 text-sm font-medium mb-6">
              <span className="w-2 h-2 bg-gold-400 rounded-full animate-pulse"></span>
              Free Weekly Intelligence
            </div>
            <h1 className="text-4xl md:text-5xl font-bold mb-4 leading-tight">
              Stay Ahead of the<br />
              <span className="text-gold-400">Canadian Market</span>
            </h1>
            <p className="text-lg text-blue-100 mb-10 max-w-xl mx-auto">
              Get expert weekly financial reports and next-week stock market forecasts
              delivered straight to your inbox. No fluff, just insight.
            </p>
            <SubscribeForm />
          </div>
        </section>

        {/* Features */}
        <section className="py-16 px-4 bg-white">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-2xl font-bold text-center text-brand-900 mb-10">What You'll Receive</h2>
            <div className="grid md:grid-cols-2 gap-6">
              <div className="card hover:shadow-md transition-shadow">
                <div className="text-3xl mb-3">📊</div>
                <h3 className="text-lg font-semibold text-brand-800 mb-2">Weekly Financial Report</h3>
                <p className="text-gray-600 text-sm leading-relaxed">
                  Comprehensive analysis of Canadian and global markets, economic indicators,
                  sector performance, and key financial news every week.
                </p>
              </div>
              <div className="card hover:shadow-md transition-shadow">
                <div className="text-3xl mb-3">🔮</div>
                <h3 className="text-lg font-semibold text-brand-800 mb-2">Market Forecast</h3>
                <p className="text-gray-600 text-sm leading-relaxed">
                  Data-driven predictions for the week ahead — which sectors to watch,
                  potential opportunities, and risk factors to consider.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Trust */}
        <section className="py-12 px-4 bg-gray-50 border-t border-gray-100">
          <div className="max-w-3xl mx-auto text-center">
            <p className="text-gray-500 text-sm">
              Trusted by Canadian investors · No spam, ever · Unsubscribe anytime in one click
            </p>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  )
}
