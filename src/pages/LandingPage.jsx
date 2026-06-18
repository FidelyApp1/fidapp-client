import { useState } from 'react'
import emailjs from '@emailjs/browser'
import Logo from '../assets/logo'

const sectors = [
  { icon: '🍽️', label: 'Restaurant' },
  { icon: '☕', label: 'Café' },
  { icon: '✂️', label: 'Coiffeur' },
  { icon: '🛍️', label: 'Boutique' },
  { icon: '💆', label: 'Spa' },
  { icon: '🏋️', label: 'Sport' },
]

const steps = [
  { num: '01', title: 'Scannez', desc: 'Le client scanne le QR code affiché chez vous' },
  { num: '02', title: 'Validez', desc: 'Il entre son numéro — la visite est enregistrée' },
  { num: '03', title: 'Récompensez', desc: 'À chaque palier, il gagne sa récompense' },
]

const features = [
  { icon: '📱', title: 'Zéro installation', desc: 'Vos clients scannent et c\'est parti — pas d\'app à télécharger' },
  { icon: '📊', title: 'Dashboard temps réel', desc: 'Suivez vos clients, leurs visites et vos récompenses' },
  { icon: '🔒', title: 'Anti-fraude', desc: 'QR rotatif toutes les heures — impossible de tricher' },
  { icon: '⚡', title: 'Setup en 2 min', desc: 'Compte créé, QR affiché, premiers clients — en 2 minutes' },
  { icon: '🎯', title: 'Tous secteurs', desc: 'Restaurant, café, coiffeur, boutique, spa et plus' },
  { icon: '🇲🇦', title: 'Fait pour le Maroc', desc: 'Conçu à Casablanca, pour les commerces marocains' },
]

const LandingPage = () => {
  const [form, setForm] = useState({ restaurant_name: '', phone: '', city: '', message: '' })
  const [loading, setLoading] = useState(false)
  const [sent, setSent] = useState(false)
  const [error, setError] = useState('')
  const [menuOpen, setMenuOpen] = useState(false)

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value })

  const handleSubmit = async (e) => {
    e?.preventDefault()
    if (!form.restaurant_name || !form.phone || !form.city) {
      setError('Nom, téléphone et ville sont obligatoires')
      return
    }
    setLoading(true)
    setError('')
    try {
      await emailjs.send('service_kd7iwdc', 'template_cxs4mbl', form, 'ZaEscAr4yUeJaRox7')
      setSent(true)
    } catch {
      setError('Erreur envoi — réessayez')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-white">

      {/* NAV */}
      <nav className="fixed top-0 left-0 right-0 z-50 bg-white/90 backdrop-blur-sm border-b border-gray-100">
        <div className="max-w-6xl mx-auto px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Logo size={36} variant="dark" />
            <span className="font-black text-xl text-gray-900 tracking-tight">fid<span className="text-orange-500">app</span></span>
          </div>
          <div className="hidden md:flex items-center gap-8">
            <a href="#features" className="text-sm text-gray-500 hover:text-gray-900 transition-colors">Features</a>
            <a href="#how" className="text-sm text-gray-500 hover:text-gray-900 transition-colors">Comment ça marche</a>
            <a href="#demo" className="text-sm text-gray-500 hover:text-gray-900 transition-colors">Contact</a>
            <a href="https://fidapp-dashboard.vercel.app/login" className="bg-gray-900 text-white text-sm font-semibold px-5 py-2.5 rounded-xl hover:bg-gray-800 transition-colors">
              Espace restaurant →
            </a>
          </div>
          <button onClick={() => setMenuOpen(!menuOpen)} className="md:hidden w-9 h-9 flex items-center justify-center rounded-lg bg-gray-100">
            <span className="text-lg">{menuOpen ? '✕' : '☰'}</span>
          </button>
        </div>
        {menuOpen && (
          <div className="md:hidden border-t border-gray-100 px-6 py-4 space-y-3 bg-white">
            <a href="#features" className="block text-sm text-gray-600">Features</a>
            <a href="#how" className="block text-sm text-gray-600">Comment ça marche</a>
            <a href="#demo" className="block text-sm text-gray-600">Contact</a>
            <a href="https://fidapp-dashboard.vercel.app/login" className="block text-sm font-semibold text-orange-500">Espace restaurant →</a>
          </div>
        )}
      </nav>

      {/* HERO */}
      <section className="pt-32 pb-24 px-6 max-w-6xl mx-auto">
        <div className="max-w-3xl">
          <div className="inline-flex items-center gap-2 bg-orange-50 text-orange-600 text-xs font-semibold px-4 py-2 rounded-full mb-8">
            <span className="w-1.5 h-1.5 bg-orange-500 rounded-full"></span>
            Disponible au Maroc — Casablanca & partout
          </div>
          <h1 className="text-5xl md:text-7xl font-black text-gray-900 leading-tight tracking-tight mb-6">
            La fidélité<br />
            <span className="text-orange-500">réinventée.</span>
          </h1>
          <p className="text-xl text-gray-500 max-w-xl mb-10 leading-relaxed">
            Fini les cartes papier perdues. FidApp digitalise votre programme de fidélité en 2 minutes. Vos clients scannent, accumulent, et reviennent.
          </p>
          <div className="flex flex-wrap gap-4">
            <a href="#demo" className="bg-orange-500 hover:bg-orange-600 text-white font-bold px-8 py-4 rounded-2xl text-lg transition-all shadow-lg shadow-orange-200 hover:shadow-orange-300 hover:-translate-y-0.5 active:translate-y-0">
              Demander une démo gratuite
            </a>
            <a href="#how" className="bg-gray-100 hover:bg-gray-200 text-gray-900 font-bold px-8 py-4 rounded-2xl text-lg transition-all">
              Voir comment ça marche
            </a>
          </div>
        </div>

        {/* Hero visual */}
        <div className="mt-16 grid grid-cols-3 gap-4 max-w-lg">
          <div className="col-span-2 bg-gray-900 rounded-3xl p-6">
            <p className="text-xs text-gray-500 mb-3 font-medium uppercase tracking-wide">Check-ins ce mois</p>
            <p className="text-4xl font-black text-white">247</p>
            <div className="mt-3 flex gap-1">
              {[4,6,3,8,5,9,7,6,4,8,9,6,7,5,8].map((h,i) => (
                <div key={i} className="flex-1 bg-orange-500 rounded-sm opacity-80" style={{height: `${h*5}px`, alignSelf:'flex-end'}}></div>
              ))}
            </div>
          </div>
          <div className="flex flex-col gap-4">
            <div className="bg-orange-500 rounded-3xl p-4 text-center flex-1">
              <p className="text-3xl font-black text-white">89</p>
              <p className="text-xs text-orange-100 mt-1">clients fidèles</p>
            </div>
            <div className="bg-gray-100 rounded-3xl p-4 text-center flex-1">
              <p className="text-3xl font-black text-gray-900">12</p>
              <p className="text-xs text-gray-500 mt-1">rewards émis</p>
            </div>
          </div>
        </div>
      </section>

      {/* SECTORS */}
      <section className="py-12 px-6 bg-gray-50">
        <div className="max-w-6xl mx-auto">
          <p className="text-center text-sm text-gray-400 font-medium mb-8 tracking-wide uppercase">Pour tous les commerces</p>
          <div className="flex flex-wrap justify-center gap-3">
            {sectors.map((s, i) => (
              <div key={i} className="flex items-center gap-2 bg-white border border-gray-200 rounded-2xl px-5 py-3">
                <span className="text-xl">{s.icon}</span>
                <span className="text-sm font-semibold text-gray-700">{s.label}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* HOW IT WORKS */}
      <section id="how" className="py-24 px-6 max-w-6xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-black text-gray-900 tracking-tight mb-4">Simple comme bonjour.</h2>
          <p className="text-gray-500 text-lg">3 étapes. Zéro friction. Résultats immédiats.</p>
        </div>
        <div className="grid md:grid-cols-3 gap-8">
          {steps.map((s, i) => (
            <div key={i} className="relative">
              <div className="text-7xl font-black text-gray-100 mb-4">{s.num}</div>
              <h3 className="text-2xl font-black text-gray-900 mb-3">{s.title}</h3>
              <p className="text-gray-500 leading-relaxed">{s.desc}</p>
              {i < steps.length - 1 && (
                <div className="hidden md:block absolute top-8 right-0 translate-x-1/2 text-gray-200 text-2xl">→</div>
              )}
            </div>
          ))}
        </div>
      </section>

      {/* FEATURES */}
      <section id="features" className="py-24 px-6 bg-gray-50">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-black text-gray-900 tracking-tight mb-4">Tout ce qu'il vous faut.</h2>
            <p className="text-gray-500 text-lg">Un outil complet, pensé pour les commerces marocains.</p>
          </div>
          <div className="grid md:grid-cols-3 gap-6">
            {features.map((f, i) => (
              <div key={i} className={`p-8 rounded-3xl ${i === 0 ? 'bg-orange-500 text-white' : 'bg-white border border-gray-200'}`}>
                <div className="text-3xl mb-4">{f.icon}</div>
                <h3 className={`text-xl font-black mb-3 ${i === 0 ? 'text-white' : 'text-gray-900'}`}>{f.title}</h3>
                <p className={`leading-relaxed ${i === 0 ? 'text-orange-100' : 'text-gray-500'}`}>{f.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* DEMO FORM */}
      <section id="demo" className="py-24 px-6">
        <div className="max-w-xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-black text-gray-900 tracking-tight mb-4">Essayez gratuitement.</h2>
            <p className="text-gray-500 text-lg">On vous contacte dans les 24h pour une démo live.</p>
          </div>

          {sent ? (
            <div className="bg-gray-900 rounded-3xl p-12 text-center">
              <div className="text-5xl mb-4">✅</div>
              <h3 className="text-2xl font-black text-white mb-3">Demande envoyée !</h3>
              <p className="text-gray-400">On vous appelle dans les 24h sur WhatsApp.</p>
            </div>
          ) : (
            <div className="bg-gray-900 rounded-3xl p-8">
              <div className="space-y-4">
                <input
                  name="restaurant_name"
                  value={form.restaurant_name}
                  onChange={handleChange}
                  placeholder="Nom de votre commerce"
                  className="w-full px-5 py-4 bg-white/10 border border-white/10 rounded-2xl text-white placeholder-gray-500 focus:outline-none focus:border-orange-500 transition-colors"
                />
                <input
                  name="phone"
                  value={form.phone}
                  onChange={handleChange}
                  placeholder="Téléphone / WhatsApp"
                  className="w-full px-5 py-4 bg-white/10 border border-white/10 rounded-2xl text-white placeholder-gray-500 focus:outline-none focus:border-orange-500 transition-colors"
                />
                <input
                  name="city"
                  value={form.city}
                  onChange={handleChange}
                  placeholder="Ville"
                  className="w-full px-5 py-4 bg-white/10 border border-white/10 rounded-2xl text-white placeholder-gray-500 focus:outline-none focus:border-orange-500 transition-colors"
                />
                <textarea
                  name="message"
                  value={form.message}
                  onChange={handleChange}
                  placeholder="Parlez-nous de votre commerce (optionnel)"
                  rows={3}
                  className="w-full px-5 py-4 bg-white/10 border border-white/10 rounded-2xl text-white placeholder-gray-500 focus:outline-none focus:border-orange-500 transition-colors resize-none"
                />
              </div>

              {error && <p className="text-red-400 text-sm mt-4 text-center">{error}</p>}

              <button
                onClick={handleSubmit}
                disabled={loading}
                className="w-full mt-6 bg-orange-500 hover:bg-orange-600 disabled:bg-orange-800 text-white font-black py-5 rounded-2xl text-lg transition-all"
              >
                {loading ? 'Envoi...' : 'Demander ma démo gratuite →'}
              </button>
              <p className="text-center text-gray-600 text-xs mt-4">Aucun engagement · Réponse sous 24h</p>
            </div>
          )}
        </div>
      </section>

      {/* FOOTER */}
      <footer className="border-t border-gray-100 py-12 px-6">
        <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <Logo size={28} variant="dark" />
            <span className="font-black text-gray-900">fid<span className="text-orange-500">app</span></span>
          </div>
          <p className="text-sm text-gray-400">Carte de fidélité digitale · Fait à Casablanca 🇲🇦</p>
          <a href="https://fidapp-dashboard.vercel.app/login" className="text-sm text-orange-500 font-semibold hover:underline">
            Espace restaurant →
          </a>
        </div>
      </footer>

    </div>
  )
}

export default LandingPage