import { useState } from 'react'
import emailjs from '@emailjs/browser'

const LandingPage = () => {
  const [form, setForm] = useState({ restaurant_name: '', phone: '', city: '', message: '' })
  const [loading, setLoading] = useState(false)
  const [sent, setSent] = useState(false)
  const [error, setError] = useState('')

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value })

  const handleSubmit = async () => {
    if (!form.restaurant_name || !form.phone || !form.city) {
      setError('Nom, téléphone et ville sont obligatoires')
      return
    }
    setLoading(true)
    setError('')
    try {
      // 🔍 On stocke la réponse du serveur EmailJS
      const response = await emailjs.send(
        'service_kd7iwdc',
        'template_cxs4mbl',
        form
      )
      
      // 🚨 Affiche le résultat dans la console de ton navigateur (F12)
      console.log("SUCCÈS EMAILJS !", response.status, response.text)
      setSent(true)
    } catch (err) {
      console.error("ERREUR EMAILJS DÉTAILLÉE :", err)
      setError('Erreur envoi — réessayez')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 to-white">
      <nav className="px-6 py-5 flex items-center justify-between max-w-5xl mx-auto">
        <div className="flex items-center gap-2">
          <div className="w-9 h-9 bg-orange-500 rounded-xl flex items-center justify-center">
            <span className="text-lg">🃏</span>
          </div>
          <span className="font-bold text-gray-800 text-lg">FidApp</span>
        </div>
        
        {/* CORRECTION 1 : Rétablissement de la balise <a> */}
        <a
          href="https://fidapp-dashboard.vercel.app/login"
          className="text-sm text-orange-500 font-medium hover:underline"
        >
          Espace restaurant →
        </a>
      </nav>

      <section className="max-w-5xl mx-auto px-6 pt-16 pb-20 text-center">
        <div className="inline-block bg-orange-100 text-orange-600 text-xs font-semibold px-4 py-2 rounded-full mb-6">
          Disponible au Maroc 🇲🇦
        </div>
        <h1 className="text-4xl md:text-5xl font-bold text-gray-800 mb-6 leading-tight">
          La carte de fidélité<br />
          <span className="text-orange-500">digitale pour votre resto</span>
        </h1>
        <p className="text-gray-400 text-lg max-w-xl mx-auto mb-10">
          Vos clients scannent un QR code, accumulent des points, et reviennent plus souvent.
          Zéro application à télécharger.
        </p>
        
        {/* CORRECTION 2 : Rétablissement de la balise <a> */}
        <a
          href="#demo"
          className="bg-orange-500 hover:bg-orange-600 text-white font-semibold px-8 py-4 rounded-2xl text-lg transition-all shadow-lg hover:shadow-xl inline-block"
        >
          Demander une démo gratuite
        </a>
      </section>

      <section className="max-w-5xl mx-auto px-6 pb-20">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-50 text-center">
            <div className="w-14 h-14 bg-orange-100 rounded-2xl flex items-center justify-center mx-auto mb-4">
              <span className="text-3xl">📱</span>
            </div>
            <h3 className="font-semibold text-gray-800 mb-2">Zéro installation</h3>
            <p className="text-gray-400 text-sm">Le client scanne, entre son numéro et c'est tout. Pas d'app à télécharger.</p>
          </div>
          <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-50 text-center">
            <div className="w-14 h-14 bg-green-100 rounded-2xl flex items-center justify-center mx-auto mb-4">
              <span className="text-3xl">📊</span>
            </div>
            <h3 className="font-semibold text-gray-800 mb-2">Dashboard en temps réel</h3>
            <p className="text-gray-400 text-sm">Suivez vos clients fidèles, leurs visites et vos récompenses émises.</p>
          </div>
          <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-50 text-center">
            <div className="w-14 h-14 bg-blue-100 rounded-2xl flex items-center justify-center mx-auto mb-4">
              <span className="text-3xl">🔒</span>
            </div>
            <h3 className="font-semibold text-gray-800 mb-2">100% sécurisé</h3>
            <p className="text-gray-400 text-sm">Données chiffrées, conformes à la loi 09-08. Vos clients sont protégés.</p>
          </div>
        </div>
      </section>

      <section id="demo" className="max-w-lg mx-auto px-6 pb-24">
        <div className="bg-white rounded-3xl shadow-xl p-8">
          {sent ? (
            <div className="text-center py-8">
              <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-4xl">✅</span>
              </div>
              <h3 className="text-xl font-bold text-gray-800 mb-2">Demande envoyée !</h3>
              <p className="text-gray-400">On vous contacte dans les 24h sur WhatsApp.</p>
            </div>
          ) : (
            <>
              <h2 className="text-xl font-bold text-gray-800 mb-2">Demander une démo gratuite</h2>
              <p className="text-gray-400 text-sm mb-6">On vous appelle sous 24h pour vous montrer FidApp en live.</p>

              <div className="space-y-4">
                <div>
                  <label className="text-xs font-medium text-gray-500 uppercase tracking-wide">Nom du restaurant *</label>
                  <input
                    name="restaurant_name"
                    value={form.restaurant_name}
                    onChange={handleChange}
                    placeholder="Casa Burger"
                    className="w-full mt-2 px-4 py-3 border-2 border-gray-100 rounded-2xl focus:outline-none focus:border-orange-400 transition-colors"
                  />
                </div>
                <div>
                  <label className="text-xs font-medium text-gray-500 uppercase tracking-wide">Téléphone / WhatsApp *</label>
                  <input
                    name="phone"
                    value={form.phone}
                    onChange={handleChange}
                    placeholder="0600000000"
                    className="w-full mt-2 px-4 py-3 border-2 border-gray-100 rounded-2xl focus:outline-none focus:border-orange-400 transition-colors"
                  />
                </div>
                <div>
                  <label className="text-xs font-medium text-gray-500 uppercase tracking-wide">Ville *</label>
                  <input
                    name="city"
                    value={form.city}
                    onChange={handleChange}
                    placeholder="Casablanca"
                    className="w-full mt-2 px-4 py-3 border-2 border-gray-100 rounded-2xl focus:outline-none focus:border-orange-400 transition-colors"
                  />
                </div>
                <div>
                  <label className="text-xs font-medium text-gray-500 uppercase tracking-wide">Message (optionnel)</label>
                  <textarea
                    name="message"
                    value={form.message}
                    onChange={handleChange}
                    placeholder="J'ai un café de 30 couverts à Maarif..."
                    rows={3}
                    className="w-full mt-2 px-4 py-3 border-2 border-gray-100 rounded-2xl focus:outline-none focus:border-orange-400 transition-colors resize-none"
                  />
                </div>
              </div>

              {error && <p className="text-red-400 text-sm mt-4 text-center">{error}</p>}

              <button
                onClick={handleSubmit}
                disabled={loading}
                className="w-full mt-6 bg-orange-500 hover:bg-orange-600 disabled:bg-orange-300 text-white font-semibold py-4 rounded-2xl transition-all shadow-md active:scale-95"
              >
                {loading ? 'Envoi...' : 'Demander ma démo gratuite →'}
              </button>

              <p className="text-center text-gray-300 text-xs mt-4">
                Aucun engagement — réponse sous 24h
              </p>
            </>
          )}
        </div>
      </section>

      <footer className="text-center pb-8 text-gray-300 text-xs">
        FidApp • Carte de fidélité digitale • Maroc 🇲🇦
      </footer>
    </div>
  )
}

export default LandingPage