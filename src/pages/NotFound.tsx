import { Link } from 'react-router-dom'
import { useSeo } from '../lib/hooks'

export default function NotFound() {
  useSeo('Not found — Arpit Pathak')

  return (
    <div className="relative z-10 flex min-h-[70vh] items-center">
      <div className="shell">
        <p className="label">Error 404</p>
        <h1 className="display mt-4 text-[clamp(2rem,6vw,3.4rem)] text-bone-50">Signal not found</h1>
        <p className="prose-sci mt-4 max-w-[48ch]">
          That route does not exist. The research index is the best place to pick the thread back up.
        </p>
        <Link
          to="/"
          className="mt-8 inline-flex border border-signal-eeg/45 bg-signal-eeg/[0.07] px-4 py-2.5 font-mono text-[11px] uppercase tracking-[0.14em] text-signal-eeg no-underline transition-colors hover:bg-signal-eeg/[0.14]"
        >
          Return home
        </Link>
      </div>
    </div>
  )
}
