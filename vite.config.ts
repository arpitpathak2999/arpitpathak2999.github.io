import { defineConfig, loadEnv, type Plugin } from 'vite'
import react from '@vitejs/plugin-react'
import { viteSingleFile } from 'vite-plugin-singlefile'
import { copyFileSync, existsSync } from 'node:fs'
import { resolve } from 'node:path'

/** Every route the SPA serves, for sitemap generation. */
const ROUTES: { path: string; priority: string }[] = [
  { path: '/', priority: '1.0' },
  { path: '/research/sleep-staging', priority: '0.9' },
  { path: '/research/motor-imagery-eeg', priority: '0.8' },
  { path: '/research/emg-prosthetics', priority: '0.8' },
  { path: '/research/biomedical-imaging', priority: '0.8' },
  { path: '/publications', priority: '0.9' },
  { path: '/about', priority: '0.7' },
]

/**
 * Single-source-of-truth for the site URL.
 *
 * - Rewrites __SITE_URL__ placeholders in index.html
 * - Generates sitemap.xml and robots.txt
 * - Emits CNAME only when VITE_CUSTOM_DOMAIN is set, so an unconfigured
 *   custom domain can never break the live site
 * - Copies index.html to 404.html so GitHub Pages resolves deep links
 *   (/research/..., /publications, /about) client-side
 */
function siteMeta(siteUrl: string, customDomain: string): Plugin {
  return {
    name: 'site-meta',

    transformIndexHtml(html) {
      return html.replaceAll('__SITE_URL__', siteUrl)
    },

    generateBundle() {
      const urls = ROUTES.map(
        (r) =>
          `  <url>\n    <loc>${siteUrl}${r.path}</loc>\n    <changefreq>monthly</changefreq>\n    <priority>${r.priority}</priority>\n  </url>`,
      ).join('\n')

      this.emitFile({
        type: 'asset',
        fileName: 'sitemap.xml',
        source: `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${urls}\n</urlset>\n`,
      })

      this.emitFile({
        type: 'asset',
        fileName: 'robots.txt',
        source: `User-agent: *\nAllow: /\n\nSitemap: ${siteUrl}/sitemap.xml\n`,
      })

      if (customDomain) {
        this.emitFile({ type: 'asset', fileName: 'CNAME', source: `${customDomain}\n` })
      }
    },

    closeBundle() {
      const out = resolve(import.meta.dirname, 'dist')
      const index = resolve(out, 'index.html')
      if (existsSync(index)) copyFileSync(index, resolve(out, '404.html'))
    },
  }
}

export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), '')
  const siteUrl = (env.VITE_SITE_URL || 'https://arpitpathak2999.github.io').replace(/\/+$/, '')
  const customDomain = (env.VITE_CUSTOM_DOMAIN || '').trim()

  /**
   * Offline preview build: `npm run build:single` produces one self-contained
   * HTML file in dist-single/ that opens by double-clicking, no server needed.
   * Everything is inlined, so chunk splitting and the deploy-only files
   * (sitemap, robots, CNAME, 404.html) are skipped.
   */
  const singleFile = env.VITE_SINGLEFILE === '1'

  return {
    base: singleFile ? './' : '/',
    plugins: [react(), ...(singleFile ? [viteSingleFile()] : [siteMeta(siteUrl, customDomain)])],
    build: {
      outDir: singleFile ? 'dist-single' : 'dist',
      target: 'es2020',
      cssCodeSplit: !singleFile,
      assetsInlineLimit: singleFile ? 100_000_000 : 4096,
      reportCompressedSize: false,
      rollupOptions: {
        output: singleFile
          ? { inlineDynamicImports: true }
          : {
              manualChunks(id: string) {
                if (id.includes('node_modules')) {
                  if (id.includes('react-router')) return 'router'
                  if (id.includes('react')) return 'react'
                  return 'vendor'
                }
              },
            },
      },
    },
  }
})
