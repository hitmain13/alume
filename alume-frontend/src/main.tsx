import { ThemeProvider } from '@/components/common/theme-provider'
import { createRoot } from 'react-dom/client'

import App from './App'

import './index.css'

createRoot(document.getElementById('root')!).render(
  <ThemeProvider defaultTheme="system" storageKey="alume-ui-theme">
    <App />
  </ThemeProvider>,
)
