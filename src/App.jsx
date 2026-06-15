import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import ScanPage from './pages/ScanPage'
import CardPage from './pages/CardPage'
import LandingPage from './pages/LandingPage'

const queryClient = new QueryClient()

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <BrowserRouter>
        <Routes>
          {/* Page d'accueil / Landing Page */}
          <Route path="/" element={<LandingPage />} />

          {/* Autres routes de l'application */}
          <Route path="/scan/:qrCode" element={<ScanPage />} />
          <Route path="/card" element={<CardPage />} />

          {/* Redirection automatique vers la racine si la route n'existe pas */}
          <Route path="*" element={<Navigate to="/" />} />
        </Routes>
      </BrowserRouter>
    </QueryClientProvider>
  )
}

export default App