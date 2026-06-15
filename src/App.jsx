import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import ScanPage from './pages/ScanPage'
import CardPage from './pages/CardPage'

const queryClient = new QueryClient()

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <BrowserRouter>
        <Routes>
          <Route path="/scan/:qrCode" element={<ScanPage />} />
          <Route path="/card" element={<CardPage />} />
          <Route path="*" element={
            <div className="min-h-screen flex items-center justify-center bg-orange-50">
              <div className="text-center">
                <div className="text-6xl mb-4">🃏</div>
                <h1 className="text-2xl font-bold text-gray-700">FidApp</h1>
                <p className="text-gray-400 mt-2">Scannez un QR code pour commencer</p>
              </div>
            </div>
          } />
        </Routes>
      </BrowserRouter>
    </QueryClientProvider>
  )
}

export default App