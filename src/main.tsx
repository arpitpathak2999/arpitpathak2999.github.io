import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter, HashRouter } from 'react-router-dom'
import App from './App'
import './index.css'

/**
 * The deployed site uses real paths (/about, /research/...) via BrowserRouter.
 * The offline single-file preview build runs from file://, where pathnames are
 * filesystem paths and no route would ever match — so that build sets
 * VITE_ROUTER=hash and gets HashRouter instead.
 */
const Router = import.meta.env.VITE_ROUTER === 'hash' ? HashRouter : BrowserRouter

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <Router>
      <App />
    </Router>
  </StrictMode>,
)
