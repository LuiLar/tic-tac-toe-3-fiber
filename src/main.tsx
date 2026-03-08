import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.tsx'
import GameControllerProvider from './providers/GameControllerProvider.tsx'
import './main.css'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <GameControllerProvider>
      <App />
    </GameControllerProvider>
  </StrictMode>,
)
