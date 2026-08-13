/// <reference types="vite/client" />

interface ImportMetaEnv {
  /** Public address of the site, no trailing slash. Set in .env */
  readonly VITE_SITE_URL?: string
  /** Custom domain, empty until DNS points at GitHub Pages. Set in .env */
  readonly VITE_CUSTOM_DOMAIN?: string
  /** 'hash' only for the offline single-file preview build (file:// has no real paths) */
  readonly VITE_ROUTER?: string
  /** '1' builds one self-contained HTML file into dist-single/ */
  readonly VITE_SINGLEFILE?: string
}

interface ImportMeta {
  readonly env: ImportMetaEnv
}
