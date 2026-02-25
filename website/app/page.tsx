import Link from 'next/link'

export default function HomePage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-50 to-slate-100 dark:from-slate-900 dark:to-slate-800">
      <header className="border-b border-slate-200 dark:border-slate-700 bg-white/80 dark:bg-slate-900/80 backdrop-blur">
        <div className="max-w-4xl mx-auto px-6 py-4 flex justify-between items-center">
          <span className="font-semibold text-slate-800 dark:text-slate-100">
            Software Engineering Wiki
          </span>
          <Link
            href="/docs"
            className="text-sm font-medium text-blue-600 hover:text-blue-700 dark:text-blue-400 dark:hover:text-blue-300"
          >
            Docs →
          </Link>
        </div>
      </header>
      <main className="max-w-4xl mx-auto px-6 py-16">
        <h1 className="text-4xl font-bold text-slate-900 dark:text-white mb-4">
          Software Engineering Wiki
        </h1>
        <p className="text-lg text-slate-600 dark:text-slate-300 mb-8">
          A practical guide to algorithms, data structures, and system design.
        </p>
        <Link
          href="/docs"
          className="inline-flex items-center gap-2 rounded-lg bg-blue-600 px-5 py-2.5 text-sm font-medium text-white hover:bg-blue-700 transition-colors"
        >
          Browse the docs
        </Link>
      </main>
    </div>
  )
}
