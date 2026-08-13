import About from '../components/About'
import { useSeo } from '../lib/hooks'

export default function AboutPage() {
  useSeo(
    'About — Arpit Pathak',
    'Computer Science student and researcher working across computational neuroscience, biomedical signal processing, biomedical imaging and interpretable AI.',
    '/about',
  )

  return <About standalone />
}
