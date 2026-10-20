import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import "./i18n";
import { inject } from "@vercel/analytics";
import App from './App.jsx'

// Initialise before render so events fired on a page's first load aren't dropped
inject();

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <App />
  </StrictMode>,
)
