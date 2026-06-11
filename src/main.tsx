import React from 'react'
import ReactDOM from 'react-dom/client'
import './index.css'
import App from './App'
import { initPostHog } from './lib/posthog'
import { captureUTMs } from './lib/utm'

initPostHog()
captureUTMs() // capture on every page load, only persists if UTMs present

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
)
