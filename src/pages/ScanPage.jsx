import { useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { checkin } from '../api/client'
import Logo from '../assets/logo.jsx'

const ScanPage = () => {
  const { qrCode } = useParams()
  const navigate = useNavigate()
  const [phone, setPhone] = useState('')
  const [name, setName] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  const handleSubmit = async () => {
    if (phone.length < 9) {
      setError('Veuillez entrer un numéro de téléphone marocain valide.')
      return
    }
    if (!name.trim()) {
      setError('Veuillez renseigner votre prénom.')
      return
    }

    setLoading(true)
    setError('')
    try {
      const data = await checkin(phone, qrCode, name.trim())
      navigate('/card', { state: data })
    } catch (err) {
      const msg = err.response?.data?.message
      if (err.response?.data?.error === 'anti_fraud') {
        setError(msg)
      } else {
        setError('Ce lien a expiré ou est invalide. Veuillez re-scanner le QR Code au comptoir.')
      }
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-white text-gray-900 font-sans flex flex-col justify-between px-6 py-12 relative overflow-hidden">
      {/* Trame de fond */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#8080800a_1px,transparent_1px),linear-gradient(to_bottom,#8080800a_1px,transparent_1px)] bg-[size:14px_24px] pointer-events-none" />
      <div className="absolute top-[-10%] left-1/2 -translate-x-1/2 w-80 h-80 bg-orange-100/40 rounded-full blur-3xl pointer-events-none" />

      <div className="w-full max-w-sm mx-auto my-auto relative z-10 animate-fade-in-up">
        {/* Branding mini */}
        <div className="text-center mb-8">
          <div className="flex items-center justify-center gap-2 mb-2">
            <Logo size={32} />
            <span className="font-black text-xl tracking-tight text-gray-900">fid<span className="text-orange-500">app</span></span>
          </div>
          <p className="text-xs font-bold text-gray-400 uppercase tracking-widest">Carte de Fidélité Virtuelle</p>
        </div>

        {/* Formulaire Client */}
        <div className="bg-white rounded-[2.5rem] shadow-2xl shadow-gray-200/60 border border-gray-100 p-6 sm:p-8">
          <div className="mb-6">
            <h2 className="text-xl font-black text-gray-900 tracking-tight">Bienvenue ! 👋</h2>
            <p className="text-sm text-gray-500 font-medium mt-1">Validez votre tampon en un clic.</p>
          </div>

          <div className="space-y-4">
            <div>
              <label className="block text-[10px] font-bold text-gray-400 uppercase tracking-widest pl-1 mb-1.5">Votre Prénom</label>
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Ex: Anis"
                className="w-full px-4 py-3.5 bg-gray-50 border border-gray-200 rounded-xl font-semibold text-gray-900 outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent transition-all text-sm"
              />
            </div>

            <div>
              <label className="block text-[10px] font-bold text-gray-400 uppercase tracking-widest pl-1 mb-1.5">Numéro WhatsApp</label>
              <input
                type="tel"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                placeholder="06 12 34 56 78"
                className="w-full px-4 py-3.5 bg-gray-50 border border-gray-200 rounded-xl font-semibold text-gray-900 outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent transition-all text-sm tracking-wide"
              />
            </div>
          </div>

          {error && (
            <div className="mt-4 text-red-500 text-xs font-semibold bg-red-50 border border-red-100 p-3.5 rounded-xl text-center leading-relaxed">
              {error}
            </div>
          )}

          <button
            onClick={handleSubmit}
            disabled={loading}
            className="w-full bg-gray-900 hover:bg-gray-800 text-white font-bold py-4 rounded-xl transition-all shadow-lg active:scale-[0.97] text-sm mt-6"
          >
            {loading ? 'Validation du tampon...' : 'Enregistrer ma visite ✓'}
          </button>
        </div>
      </div>

      <div className="text-center text-[10px] font-bold text-gray-300 uppercase tracking-widest relative z-10">
        🔒 Propulsé par FidApp Maroc
      </div>
    </div>
  )
}

export default ScanPage