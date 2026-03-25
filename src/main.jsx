import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App'
import { StudyProvider } from './context/StudyContext'
import './index.css'

createRoot(document.getElementById('root')).render(
    <StudyProvider>
      <App/>
    </StudyProvider>
)
