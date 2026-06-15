import { useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { checkin } from '../api/client'

const ScanPage = () => {
  const { qrCode } = useParams()
  const navigate = useNavigate()
  const [phone, setPhone] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  const handleSubmit = async () => {
    if (phone.length < 9) {
      setError('Entrez un numéro valide')
      return
    }
    setLoading(true)
    setError('')
    try {
      const data = await checkin(phone, qrCode)
      navigate('/card', { state: data })
    } catch (err) {
      // 🛡️ Gestion de l'erreur anti-fraude du backend
      const msg = err.response?.data?.message
      if (err.response?.data?.error === 'anti_fraud') {
        setError(msg)
      } else {
        setError('Erreur — vérifiez votre numéro ou le QR code')
      }
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 to-white flex flex-col items-center justify-center px-6">
      <div className="w-full max-w-sm">

        <div className="text-center mb-10">
          <div className="w-20 h-20 bg-orange-500 rounded-3xl flex items-center justify-center mx-auto mb-4 shadow-lg">
            <span className="text-4xl">🃏</span>
          </div>
          <h1 className="text-2xl font-bold text-gray-800">FidApp</h1>
          <p className="text-gray-400 mt-1 text-sm">Carte de fidélité digitale</p>
        </div>

        <div className="bg-white rounded-3xl shadow-xl p-8">
          <h2 className="text-lg font-semibold text-gray-700 mb-1">Bienvenue !</h2>
          <p className="text-gray-400 text-sm mb-6">Entrez votre numéro pour valider votre visite</p>

          <div className="mb-4">
            <label className="text-xs font-medium text-gray-500 uppercase tracking-wide">Numéro de téléphone</label>
            <input
              type="tel"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              placeholder="06 00 00 00 00"
              className="w-full mt-2 px-4 py-4 border-2 border-gray-100 rounded-2xl text-lg font-medium focus:outline-none focus:border-orange-400 transition-colors"
            />
          </div>

          {error && (
            <p className="text-red-400 text-sm mb-4 text-center font-medium bg-red-50 p-3 rounded-xl border border-red-100">
              {error}
            </p>
          )}

          <button
            onClick={handleSubmit}
            disabled={loading}
            className="w-full bg-orange-500 hover:bg-orange-600 disabled:bg-orange-300 text-white font-semibold py-4 rounded-2xl transition-all duration-200 text-lg shadow-md hover:shadow-lg active:scale-95"
          >
            {loading ? 'Validation...' : 'Valider ma visite ✓'}
          </button>
        </div>

        <p className="text-center text-gray-300 text-xs mt-6">Sécurisé par FidApp • Maroc</p>
      </div>
    </div>
  )
}

export default ScanPage