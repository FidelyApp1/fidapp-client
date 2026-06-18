import { useState, useEffect } from 'react'
import emailjs from '@emailjs/browser'
import Logo from '../assets/logo.jsx'
// --- DATA & CONSTANTS ---
const SECTORS = [
  { icon: '🍽️', label: 'Restauration' },
  { icon: '☕', label: 'Cafés' },
  { icon: '✂️', label: 'Coiffeurs' },
  { icon: '🛍️', label: 'Retail' },
  { icon: '💆', label: 'Bien-être' },
  { icon: '🏋️', label: 'Sport' },
]

const FEATURES = [
  {
    id: 'no-app',
    icon: 'smartphone',
    title: 'Zéro Installation',
    desc: "Vos clients scannent et c'est parti. Pas d'app à télécharger, pas de friction.",
    highlight: true,
  },
  {
    id: 'dashboard',
    icon: 'chart',
    title: 'Analytics Temps Réel',
    desc: "Visualisez vos clients, leurs fréquences et l'impact de vos offres en un coup d'œil.",
  },
  {
    id: 'security',
    icon: 'shield',
    title: 'Anti-Fraude Avancé',
    desc: 'QR Code rotatif et signature cryptée. Impossible de tricher ou de dupliquer.',
  },
  {
    id: 'setup',
    icon: 'zap',
    title: 'Setup en 120 secondes',
    desc: 'Compte créé, QR imprimé, premiers clients. Le tout en moins de 2 minutes.',
  },
  {
    id: 'local',
    icon: 'map-pin',
    title: '100% Marocain',
    desc: 'Conçu à Casablanca pour les réalités du commerce local. Support en Darija & Français.',
  },
  {
    id: 'rewards',
    icon: 'gift',
    title: 'Récompenses Flexibles',
    desc: 'Café offert, réduction, ou cadeau. Vous configurez les règles, on gère la technique.',
  },
]

const STEPS = [
  { num: '01', title: 'Scannez', desc: 'Le client scanne le QR code unique affiché sur votre comptoir.' },
  { num: '02', title: 'Validez', desc: 'Il entre son numéro. La visite est instantanément enregistrée.' },
  { num: '03', title: 'Récompensez', desc: 'Automatiquement notifié, il revient chercher son avantage.' },
]

// --- ICONS (SVG) ---
const Icon = ({ name, className = "w-6 h-6" }) => {
  const icons = {
    smartphone: <path d="M17 2H7c-1.1 0-2 .9-2 2v16c0 1.1.9 2 2 2h10c1.1 0 2-.9 2-2V4c0-1.1-.9-2-2-2zm-3 18H10v-1h4v1zm3-3H7V4h10v13z" />,
    chart: <path d="M3 13h2v-2H3v2zm0 4h2v-2H3v2zm0-8h2V7H3v2zm4 4h14v-2H7v2zm0 4h14v-2H7v2zM7 7v2h14V7H7z" />,
    shield: <path d="M12 1L3 5v6c0 5.55 3.84 10.74 9 12 5.16-1.26 9-6.45 9-12V5l-9-4zm-2 16l-4-4 1.41-1.41L10 14.17l6.59-6.59L18 9l-8 8z" />,
    zap: <path d="M11 21h-1l1-7H7.5c-.88 0-.33-.75-.31-.78C8.48 10.94 10.42 7.54 13.01 3h1l-1 7h3.51c.4 0 .62.19.4.66C12.97 17.55 11 21 11 21z" />,
    'map-pin': <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z" />,
    gift: <path d="M20 6h-2.18c.11-.31.18-.65.18-1 0-1.66-1.34-3-3-3-1.05 0-1.96.54-2.5 1.35l-.5.67-.5-.68C10.96 2.54 10.05 2 9 2 7.34 2 6 3.34 6 5c0 .35.07.69.18 1H4c-1.11 0-1.99.89-1.99 2L2 19c0 1.11.89 2 2 2h16c1.11 0 2-.89 2-2V8c0-1.11-.89-2-2-2zm-5-2c.55 0 1 .45 1 1s-.45 1-1 1-1-.45-1-1 .45-1 1-1zM9 4c.55 0 1 .45 1 1s-.45 1-1 1-1-.45-1-1 .45-1 1-1zm11 15H4v-2h16v2zm0-5H4V8h5.08L7 10.83 8.62 12 11 8.76l1-1.36 1 1.36L15.38 12 17 10.83 14.92 8H20v6z" />,
    check: <path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z" />,
    arrow: <path d="M12 4l-1.41 1.41L16.17 11H4v2h12.17l-5.58 5.59L12 20l8-8z" />,
  }
  return (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className={className}>
      {icons[name]}
    </svg>
  )
}

// --- SUB-COMPONENTS ---

const Navbar = () => {
  const [scrolled, setScrolled] = useState(false)
  const [mobileOpen, setMobileOpen] = useState(false)

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20)
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return (
    <nav className={`fixed top-0 w-full z-50 transition-all duration-300 ${scrolled ? 'bg-white/80 backdrop-blur-lg border-b border-gray-100 shadow-sm' : 'bg-transparent'}`}>
      <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Logo size={32} />
          <span className="font-black text-xl tracking-tight text-gray-900">fid<span className="text-orange-500">app</span></span>
        </div>

        <div className="hidden md:flex items-center gap-8">
          <a href="#features" className="text-sm font-medium text-gray-600 hover:text-orange-500 transition-colors">Fonctionnalités</a>
          <a href="#how" className="text-sm font-medium text-gray-600 hover:text-orange-500 transition-colors">Comment ça marche</a>
          <a href="#demo" className="text-sm font-medium text-gray-600 hover:text-orange-500 transition-colors">Contact</a>
          <a 
            href="https://fidapp-dashboard.vercel.app/login" 
            className="bg-gray-900 text-white text-sm font-semibold px-5 py-2.5 rounded-full hover:bg-gray-800 transition-all hover:scale-105 active:scale-95"
          >
            Espace Pro
          </a>
        </div>

        <button onClick={() => setMobileOpen(!mobileOpen)} className="md:hidden p-2 text-gray-900">
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" /></svg>
        </button>
      </div>
      
      {mobileOpen && (
        <div className="md:hidden absolute top-20 left-0 w-full bg-white border-b border-gray-100 p-6 flex flex-col gap-4 shadow-lg animate-fade-in-down">
          <a href="#features" onClick={() => setMobileOpen(false)} className="text-gray-800 font-medium">Fonctionnalités</a>
          <a href="#how" onClick={() => setMobileOpen(false)} className="text-gray-800 font-medium">Comment ça marche</a>
          <a href="#demo" onClick={() => setMobileOpen(false)} className="text-orange-500 font-bold">Demander une démo</a>
        </div>
      )}
    </nav>
  )
}

const Hero = () => (
  <section className="relative pt-32 pb-20 px-6 overflow-hidden">
    <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[600px] bg-orange-100/50 blur-[120px] rounded-full pointer-events-none" />
    
    <div className="max-w-7xl mx-auto grid lg:grid-cols-2 gap-12 items-center relative z-10">
      <div className="animate-fade-in-up">
        <div className="inline-flex items-center gap-2 bg-orange-50 border border-orange-100 text-orange-700 text-xs font-bold px-3 py-1.5 rounded-full mb-6 uppercase tracking-wider">
          <span className="w-2 h-2 bg-orange-500 rounded-full animate-pulse" />
          Nouveau au Maroc
        </div>
        <h1 className="text-5xl md:text-7xl font-black text-gray-900 leading-[1.1] tracking-tight mb-6">
          La fidélité,<br />
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-500 to-red-500">sans les cartes.</span>
        </h1>
        <p className="text-xl text-gray-600 mb-8 leading-relaxed max-w-lg">
          Digitalisez votre programme de fidélité en 2 minutes. Vos clients scannent, accumulent, et reviennent. Fini le papier perdu.
        </p>
        <div className="flex flex-wrap gap-4">
          <a href="#demo" className="group bg-gray-900 text-white font-bold px-8 py-4 rounded-full text-lg transition-all shadow-xl shadow-gray-900/20 hover:shadow-gray-900/40 hover:-translate-y-1 flex items-center gap-2">
            Essayer Gratuitement
            <Icon name="arrow" className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
          </a>
          <a href="#how" className="bg-white border-2 border-gray-100 text-gray-900 font-bold px-8 py-4 rounded-full text-lg hover:border-gray-200 transition-all">
            Voir la Démo
          </a>
        </div>
      </div>

      {/* Dashboard Mockup */}
      <div className="relative animate-fade-in-up delay-200">
        <div className="absolute inset-0 bg-gradient-to-tr from-orange-500/20 to-transparent blur-2xl" />
        <div className="relative bg-white rounded-3xl shadow-2xl border border-gray-100 p-6 transform rotate-2 hover:rotate-0 transition-transform duration-500">
          <div className="flex items-center justify-between mb-6">
            <div className="flex gap-2">
              <div className="w-3 h-3 rounded-full bg-red-400" />
              <div className="w-3 h-3 rounded-full bg-yellow-400" />
              <div className="w-3 h-3 rounded-full bg-green-400" />
            </div>
            <span className="text-xs font-mono text-gray-400">dashboard.fidapp.ma</span>
          </div>
          
          <div className="grid grid-cols-2 gap-4 mb-4">
            <div className="bg-gray-50 rounded-2xl p-4 border border-gray-100">
              <p className="text-xs text-gray-500 font-medium mb-1">Visites ce mois</p>
              <p className="text-3xl font-black text-gray-900">1,248</p>
              <div className="flex items-center gap-1 mt-2 text-green-600 text-xs font-bold">
                <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M5.293 9.707a1 1 0 010-1.414l4-4a1 1 0 011.414 0l4 4a1 1 0 01-1.414 1.414L11 7.414V15a1 1 0 11-2 0V7.414L6.707 9.707a1 1 0 01-1.414 0z" clipRule="evenodd" /></svg>
                +12.5%
              </div>
            </div>
            <div className="bg-orange-500 rounded-2xl p-4 text-white">
              <p className="text-xs text-orange-100 font-medium mb-1">Clients Actifs</p>
              <p className="text-3xl font-black">342</p>
              <div className="mt-3 flex gap-1">
                {[3,5,2,8,6,9,4].map((h, i) => (
                  <div key={i} className="flex-1 bg-white/30 rounded-full" style={{ height: `${h * 4}px` }} />
                ))}
              </div>
            </div>
          </div>
          
          <div className="bg-gray-900 rounded-2xl p-4 text-white">
            <div className="flex justify-between items-center mb-3">
              <span className="text-sm font-semibold">Dernière activité</span>
              <span className="text-xs text-gray-400">En direct</span>
            </div>
            <div className="space-y-3">
              <div className="flex items-center gap-3 text-sm">
                <div className="w-8 h-8 rounded-full bg-gray-700 flex items-center justify-center">👤</div>
                <div className="flex-1">Karim B. <span className="text-gray-500">a scanné</span></div>
                <span className="text-orange-400 font-bold">+1 pts</span>
              </div>
              <div className="flex items-center gap-3 text-sm">
                <div className="w-8 h-8 rounded-full bg-gray-700 flex items-center justify-center">👤</div>
                <div className="flex-1">Sara M. <span className="text-gray-500">a validé une récompense</span></div>
                <span className="text-green-400 font-bold">Café ☕</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
)

const FeatureCard = ({ feature }) => (
  <div className={`group relative p-8 rounded-3xl transition-all duration-300 hover:-translate-y-2 ${
    feature.highlight 
      ? 'bg-gray-900 text-white shadow-2xl shadow-gray-900/20 lg:col-span-2' 
      : 'bg-white border border-gray-100 hover:shadow-xl hover:border-orange-100'
  }`}>
    <div className={`w-12 h-12 rounded-2xl flex items-center justify-center mb-6 ${
      feature.highlight ? 'bg-orange-500 text-white' : 'bg-orange-50 text-orange-500'
    }`}>
      <Icon name={feature.icon} className="w-6 h-6" />
    </div>
    <h3 className={`text-xl font-bold mb-3 ${feature.highlight ? 'text-white' : 'text-gray-900'}`}>
      {feature.title}
    </h3>
    <p className={`leading-relaxed ${feature.highlight ? 'text-gray-300' : 'text-gray-600'}`}>
      {feature.desc}
    </p>
    {feature.highlight && (
      <div className="absolute top-8 right-8 opacity-10 group-hover:opacity-20 transition-opacity">
         <Icon name="smartphone" className="w-32 h-32" />
      </div>
    )}
  </div>
)

const LandingPage = () => {
  const [form, setForm] = useState({ restaurant_name: '', phone: '', city: '', sector: '' })
  const [status, setStatus] = useState('idle') // idle, loading, success, error
  const [errorMsg, setErrorMsg] = useState('')

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value })

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (!form.restaurant_name || !form.phone || !form.city || !form.sector) {
      setStatus('error')
      setErrorMsg('Veuillez remplir tous les champs obligatoires.')
      return
    }
    
    setStatus('loading')
    try {
      // Clés sécurisées via variables d'environnement (Vite standard)
      const serviceId = import.meta.env.VITE_EMAILJS_SERVICE_ID || 'service_kd7iwdc'
      const templateId = import.meta.env.VITE_EMAILJS_TEMPLATE_ID || 'template_cxs4mbl'
      const publicKey = import.meta.env.VITE_EMAILJS_PUBLIC_KEY || 'ZaEscAr4yUeJaRox7'

      await emailjs.send(serviceId, templateId, form, publicKey)
      setStatus('success')
      setForm({ restaurant_name: '', phone: '', city: '', sector: '' })
    } catch (err) {
      setStatus('error')
      setErrorMsg('Une erreur est survenue. Veuillez réessayer.')
    }
  }

  return (
    <div className="min-h-screen bg-white text-gray-900 font-sans selection:bg-orange-200 selection:text-orange-900">
      <style>{`
        @keyframes fade-in-up {
          from { opacity: 0; transform: translateY(20px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .animate-fade-in-up {
          animation: fade-in-up 0.8s ease-out forwards;
          opacity: 0;
        }
        .delay-200 { animation-delay: 0.2s; }
        .delay-400 { animation-delay: 0.4s; }
        @keyframes fade-in-down {
          from { opacity: 0; transform: translateY(-10px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .animate-fade-in-down { animation: fade-in-down 0.3s ease-out forwards; }
      `}</style>

      <Navbar />

      <main>
        <Hero />

        {/* SECTORS */}
        <section className="py-12 border-y border-gray-100 bg-gray-50/50">
          <div className="max-w-7xl mx-auto px-6">
            <p className="text-center text-xs font-bold text-gray-400 uppercase tracking-widest mb-8">
              La solution préférée des commerces marocains
            </p>
            <div className="flex flex-wrap justify-center gap-8 opacity-60 grayscale hover:grayscale-0 transition-all duration-500">
              {SECTORS.map((s, i) => (
                <div key={i} className="flex items-center gap-2 text-lg font-bold text-gray-700">
                  <span className="text-2xl">{s.icon}</span>
                  <span>{s.label}</span>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* FEATURES (BENTO GRID) */}
        <section id="features" className="py-24 px-6">
          <div className="max-w-7xl mx-auto">
            <div className="max-w-2xl mb-16">
              <h2 className="text-4xl md:text-5xl font-black tracking-tight mb-4">
                Tout ce qu'il faut.<br />
                <span className="text-gray-400">Rien de superflu.</span>
              </h2>
              <p className="text-xl text-gray-600">
                Un outil puissant conçu pour la simplicité.
              </p>
            </div>

            <div className="grid md:grid-cols-3 gap-6">
              {FEATURES.map((feature) => (
                <FeatureCard key={feature.id} feature={feature} />
              ))}
            </div>
          </div>
        </section>

        {/* HOW IT WORKS */}
        <section id="how" className="py-24 px-6 bg-gray-900 text-white">
          <div className="max-w-7xl mx-auto">
            <div className="text-center mb-16">
              <h2 className="text-4xl font-black mb-4">Simple comme bonjour.</h2>
              <p className="text-gray-400 text-lg">3 étapes pour fidéliser sans effort.</p>
            </div>
            
            <div className="grid md:grid-cols-3 gap-8 relative">
              <div className="hidden md:block absolute top-12 left-[16%] right-[16%] h-0.5 bg-gray-800" />
              
              {STEPS.map((step, i) => (
                <div key={i} className="relative text-center group">
                  <div className="w-24 h-24 mx-auto bg-gray-800 rounded-3xl flex items-center justify-center mb-6 border-4 border-gray-900 group-hover:border-orange-500 transition-colors relative z-10">
                    <span className="text-3xl font-black text-orange-500">{step.num}</span>
                  </div>
                  <h3 className="text-2xl font-bold mb-2">{step.title}</h3>
                  <p className="text-gray-400 max-w-xs mx-auto">{step.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* CTA / FORM */}
        <section id="demo" className="py-24 px-6 bg-gradient-to-b from-gray-50 to-white">
          <div className="max-w-4xl mx-auto">
            <div className="bg-white rounded-[2.5rem] shadow-2xl shadow-gray-200/50 border border-gray-100 overflow-hidden grid md:grid-cols-5">
              
              {/* Left Info */}
              <div className="md:col-span-2 bg-gray-900 p-8 md:p-12 text-white relative overflow-hidden">
                <div className="absolute -bottom-10 -right-10 w-40 h-40 bg-orange-500 rounded-full blur-3xl opacity-20" />
                <h3 className="text-3xl font-black mb-4 relative z-10">Prêt à commencer ?</h3>
                <p className="text-gray-400 mb-8 relative z-10">
                  Recevez votre QR code et votre accès dashboard en moins de 24h.
                </p>
                <ul className="space-y-4 relative z-10">
                  <li className="flex items-center gap-3 text-sm">
                    <div className="w-6 h-6 rounded-full bg-orange-500/20 text-orange-500 flex items-center justify-center">
                      <Icon name="check" className="w-3 h-3" />
                    </div>
                    Essai gratuit 30 jours
                  </li>
                  <li className="flex items-center gap-3 text-sm">
                    <div className="w-6 h-6 rounded-full bg-orange-500/20 text-orange-500 flex items-center justify-center">
                      <Icon name="check" className="w-3 h-3" />
                    </div>
                    Sans engagement
                  </li>
                  <li className="flex items-center gap-3 text-sm">
                    <div className="w-6 h-6 rounded-full bg-orange-500/20 text-orange-500 flex items-center justify-center">
                      <Icon name="check" className="w-3 h-3" />
                    </div>
                    Support WhatsApp dédié
                  </li>
                </ul>
              </div>

              {/* Right Form */}
              <div className="md:col-span-3 p-8 md:p-12">
                {status === 'success' ? (
                  <div className="h-full flex flex-col items-center justify-center text-center py-12">
                    <div className="w-16 h-16 bg-green-100 text-green-600 rounded-full flex items-center justify-center mb-6 animate-bounce">
                      <Icon name="check" className="w-8 h-8" />
                    </div>
                    <h4 className="text-2xl font-bold mb-2">Demande reçue !</h4>
                    <p className="text-gray-500">On vous contacte très vite sur WhatsApp.</p>
                  </div>
                ) : (
                  <form onSubmit={handleSubmit} className="space-y-5">
                    <h3 className="text-2xl font-bold mb-6">Demander votre démo</h3>
                    
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label className="block text-xs font-bold text-gray-500 uppercase mb-2">Commerce</label>
                        <input
                          name="restaurant_name"
                          value={form.restaurant_name}
                          onChange={handleChange}
                          className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-orange-500 focus:border-transparent outline-none transition-all"
                          placeholder="Ex: Café Neon"
                        />
                      </div>
                      <div>
                        <label className="block text-xs font-bold text-gray-500 uppercase mb-2">Ville</label>
                        <input
                          name="city"
                          value={form.city}
                          onChange={handleChange}
                          className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-orange-500 focus:border-transparent outline-none transition-all"
                          placeholder="Casablanca"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block text-xs font-bold text-gray-500 uppercase mb-2">Secteur d'Activité</label>
                      <select
                        name="sector"
                        value={form.sector}
                        onChange={handleChange}
                        className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-orange-500 focus:border-transparent outline-none transition-all text-gray-700"
                      >
                        <option value="">Sélectionnez votre secteur</option>
                        {SECTORS.map((s, idx) => (
                          <option key={idx} value={s.label}>{s.icon} {s.label}</option>
                        ))}
                      </select>
                    </div>

                    <div>
                      <label className="block text-xs font-bold text-gray-500 uppercase mb-2">WhatsApp</label>
                      <input
                        name="phone"
                        type="tel"
                        value={form.phone}
                        onChange={handleChange}
                        className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-orange-500 focus:border-transparent outline-none transition-all"
                        placeholder="06 12 34 56 78"
                      />
                    </div>

                    {status === 'error' && (
                      <p className="text-red-500 text-sm font-medium bg-red-50 p-3 rounded-lg">{errorMsg}</p>
                    )}

                    <button
                      type="submit"
                      disabled={status === 'loading'}
                      className="w-full bg-orange-500 hover:bg-orange-600 text-white font-bold py-4 rounded-xl transition-all shadow-lg shadow-orange-500/20 hover:shadow-orange-500/40 disabled:opacity-70 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                    >
                      {status === 'loading' ? (
                        <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                        </svg>
                      ) : (
                        <>
                          <span>Recevoir mon accès</span>
                          <Icon name="arrow" className="w-5 h-5" />
                        </>
                      )}
                    </button>
                    <p className="text-center text-xs text-gray-400 mt-4">
                      🔒 Vos données sont sécurisées et restent confidentielles.
                    </p>
                  </form>
                )}
              </div>
            </div>
          </div>
        </section>
      </main>

      {/* FOOTER */}
      <footer className="border-t border-gray-100 py-12 px-6 bg-white">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="flex items-center gap-2">
            <Logo size={24} />
            <span className="font-black text-lg text-gray-900">fid<span className="text-orange-500">app</span></span>
          </div>
          <div className="flex gap-8 text-sm text-gray-500 font-medium">
            <a href="#" className="hover:text-orange-500 transition-colors">Confidentialité</a>
            <a href="#" className="hover:text-orange-500 transition-colors">Conditions</a>
            <a href="mailto:hello@fidapp.ma" className="hover:text-orange-500 transition-colors">Contact</a>
          </div>
          <p className="text-sm text-gray-400">
            © 2026 FidApp
          </p>
        </div>
      </footer>
    </div>
  )
}

export default LandingPage;