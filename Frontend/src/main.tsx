import { createRoot } from 'react-dom/client'
import App from './App.tsx'
import '@/global.css'
import { BrowserRouter } from 'react-router-dom'
import "@fontsource/work-sans/600.css"; // Defaults to weight 400
import "@fontsource/work-sans/400.css"; // Specify weight

createRoot(document.getElementById('root')!).render(
  <BrowserRouter>
    <App />
  </BrowserRouter>,
)
