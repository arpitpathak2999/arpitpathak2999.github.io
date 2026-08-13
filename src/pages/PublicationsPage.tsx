import { Link } from 'react-router-dom'
import { ArrowLeft } from 'lucide-react'
import Publications from '../components/Publications'
import { useSeo } from '../lib/hooks'

export default function PublicationsPage() {
  useSeo(
    'Publications — Arpit Pathak',
    'Peer-reviewed conference papers and an accepted book chapter across EEG decoding, biomedical imaging, interpretable AI and quantum-enhanced machine learning.',
    '/publications',
  )

  return (
    <div>
      <div className="shell relative z-10 pt-24 sm:pt-28">
        <Link
          to="/"
          className="inline-flex items-center gap-2 text-[10.5px] uppercase tracking-wide text-ink-500 no-underline transition-colors hover:text-signal-eeg"
        >
          <ArrowLeft size={12} aria-hidden />
          Home
        </Link>
      </div>
      <Publications standalone />
    </div>
  )
}
