import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './App.css'
import 'locomotive-scroll/dist/locomotive-scroll.css'
import App from './App.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <App />
  </StrictMode>,
)
