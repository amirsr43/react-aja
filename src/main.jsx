import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import '../dist/output.css'  // ← Path ini tergantung struktur folder

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <App />
  </StrictMode>,
)