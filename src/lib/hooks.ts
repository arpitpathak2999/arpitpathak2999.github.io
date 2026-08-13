import { useEffect } from 'react'

const SITE_URL = (import.meta.env.VITE_SITE_URL || 'https://arpitpathak2999.github.io').replace(
  /\/+$/,
  '',
)

/** Sets document title + meta description per route. */
export function useSeo(title: string, description?: string, canonicalPath?: string) {
  useEffect(() => {
    document.title = title
    if (description) {
      let m = document.querySelector('meta[name="description"]')
      if (!m) {
        m = document.createElement('meta')
        m.setAttribute('name', 'description')
        document.head.appendChild(m)
      }
      m.setAttribute('content', description)
    }
    const og = document.querySelector('meta[property="og:title"]')
    og?.setAttribute('content', title)
    if (canonicalPath) {
      let l = document.querySelector('link[rel="canonical"]')
      if (!l) {
        l = document.createElement('link')
        l.setAttribute('rel', 'canonical')
        document.head.appendChild(l)
      }
      l.setAttribute('href', `${SITE_URL}${canonicalPath}`)
    }
  }, [title, description, canonicalPath])
}
