import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './modules/core/components/App.jsx';

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <App />
  </StrictMode>,
)
