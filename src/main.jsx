import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './styles/tailwind.css'
import './index.css'
import Test from './pages/Test.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <Test />
  </StrictMode>,
)
