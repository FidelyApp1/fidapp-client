import { useLocation, useNavigate, Link } from 'react-router-dom'
import ProgressBar from '../components/ProgressBar'
import { useEffect, useState } from 'react'

// --- ICONS (SVG, same family as LandingPage) ---
const Icon = ({ name, className = "w-6 h-6" }) => {
  const icons = {
    check: <path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z" />,
    arrow: <path d="M12 4l-1.41 1.41L16.17 11H4v2h12.17l-5.58 5.59L12 20l8-8z" />,
    sparkle: <path d="M12 2l1.5 5.5L19 9l-5.5 1.5L12 16l-1.5-5.5L5 9l5.5-1.5L12 2zM5 16l.75 2.75L8.5 19.5l-2.75.75L5 23l-.75-2.75L1.5 19.5l2.75-.75L5 16zm14-3l.6 2.2 2.2.6-2.2.6-.6 2.2-.6-2.2-2.2-.6 2.2-.6.6-2.2z" />,
    trophy: <path d="M5 4h14v2h-1v2c0 2.21-1.79 4-4 4h-.17A4 4 0 0112 14a4 4 0 01-1.83-2H10c-2.21 0-4-1.79-4-4V6H5V4zm2 2v2c0 1.1.9 2 2 2h6c1.1 0 2-.9 2-2V6H7zm4 10c.55 0 1 .45 1 1v2h2v2H8v-2h2v-2c0-.55.45-1 1-1z" />,
  }
  return (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className={className}>
      {icons[name]}
    </svg>
  )
}

const CardPage = () => {
  const { state } = useLocation()
  const navigate = useNavigate()
  const [showConfetti, setShowConfetti] = useState(false)
  // 🎯 État pour stocker les confettis avec des valeurs aléatoires fixes
  const [confettiList, setConfettiList] = useState([])

  useEffect(() => {
    if (state?.reward) {
      // Génération unique des données aléatoires des confettis au moment du déclenchement
      const emojis = ['🎉', '🎊', '⭐', '🏆', '🎁']
      const generated = Array.from({ length: 20 }).map((_, i) => ({
        id: i,
        left: `${Math.random() * 100}%`,
        top: `${Math.random() * 100}%`,
        emoji: emojis[Math.floor(Math.random() * emojis.length)],
        delay: `${Math.random() * 1}s`,
        duration: `${0.5 + Math.random()}s`
      }))
      
      setConfettiList(generated)
      setShowConfetti(true)
      
      const timer = setTimeout(() => {
        setShowConfetti(false)
        setConfettiList([])
      }, 3000)

      return () => clearTimeout(timer)
    }
  }, [state])

  if (!state) {
    navigate('/')
    return null
  }

  const isReward = !!state.reward
  // Définition d'une constante locale pour éviter la répétition de la valeur par défaut
  const totalRequired = state.checksRequired || 10
  const remaining = totalRequired - state.checkCount

  return (
    <div className="min-h-screen bg-white text-gray-900 font-sans selection:bg-orange-200 selection:text-orange-900 relative overflow-hidden">
      <style>{`
        @keyframes fade-in-up {
          from { opacity: 0; transform: translateY(20px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .animate-fade-in-up {
          animation: fade-in-up 0.7s ease-out forwards;
          opacity: 0;
        }
        .delay-100 { animation-delay: 0.1s; }
        .delay-200 { animation-delay: 0.2s; }
        .delay-300 { animation-delay: 0.3s; }
        @keyframes pop-in {
          0% { opacity: 0; transform: scale(0.7); }
          60% { opacity: 1; transform: scale(1.05); }
          100% { opacity: 1; transform: scale(1); }
        }
        .animate-pop-in { animation: pop-in 0.6s cubic-bezier(0.34, 1.56, 0.64, 1) forwards; }
        @keyframes confetti-fall {
          0% { transform: translateY(-20px) rotate(0deg); opacity: 1; }
          100% { transform: translateY(110vh) rotate(360deg); opacity: 0; }
        }
        .animate-confetti { animation: confetti-fall linear forwards; }
      `}</style>

      {/* Ambient glow, same language as LandingPage hero */}
      <div className={`absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[600px] blur-[120px] rounded-full pointer-events-none transition-colors duration-700 ${
        isReward ? 'bg-orange-100/60' : 'bg-emerald-100/50'
      }`} />

      {/* 🎊 Rendu des confettis stabilisés */}
      {showConfetti && (
        <div className="fixed inset-0 pointer-events-none overflow-hidden z-50">
          {confettiList.map((c) => (
            <div
              key={c.id}
              className="absolute animate-confetti"
              style={{
                left: c.left,
                top: c.top,
                fontSize: '24px',
                animationDelay: c.delay,
                animationDuration: c.duration
              }}
            >
              {c.emoji}
            </div>
          ))}
        </div>
      )}

      <div className="relative z-10 min-h-screen flex flex-col items-center justify-center px-6 py-16">
        <div className="w-full max-w-sm">

          {/* Status badge — same pill language as the "Nouveau au Maroc" badge */}
          <div className="flex justify-center mb-6 animate-fade-in-up">
            <div className={`inline-flex items-center gap-2 text-xs font-bold px-3 py-1.5 rounded-full uppercase tracking-wider border ${
              isReward
                ? 'bg-orange-50 border-orange-100 text-orange-700'
                : 'bg-emerald-50 border-emerald-100 text-emerald-700'
            }`}>
              <span className={`w-2 h-2 rounded-full animate-pulse ${isReward ? 'bg-orange-500' : 'bg-emerald-500'}`} />
              {isReward ? 'Récompense débloquée' : 'Visite enregistrée'}
            </div>
          </div>

          {isReward ? (
            <div className="text-center mb-8 animate-fade-in-up delay-100">
              <div className="relative inline-block animate-pop-in">
                <div className="w-28 h-28 bg-gradient-to-br from-orange-400 to-orange-600 rounded-[2rem] flex items-center justify-center mx-auto mb-5 shadow-2xl shadow-orange-500/30 rotate-3">
                  <span className="text-6xl">{state.rewardEmoji || '🏆'}</span>
                </div>
                <div className="absolute -top-1 -right-1 w-9 h-9 bg-gray-900 rounded-full flex items-center justify-center shadow-lg">
                  <Icon name="check" className="w-4 h-4 text-white" />
                </div>
              </div>
              <h1 className="text-4xl font-black text-gray-900 tracking-tight mb-3">Félicitations !</h1>
              <div className="bg-gray-900 text-white font-bold px-6 py-3 rounded-2xl inline-flex items-center gap-2 shadow-lg shadow-gray-900/10">
                <span className="text-lg">{state.rewardEmoji || '🎁'}</span>
                {state.reward}
              </div>
              <p className="text-gray-400 text-sm mt-3 font-medium">Montrez cet écran au comptoir</p>
            </div>
          ) : (
            <div className="text-center mb-8 animate-fade-in-up delay-100">
              <div className="w-24 h-24 bg-gradient-to-br from-emerald-400 to-emerald-600 rounded-[2rem] flex items-center justify-center mx-auto mb-5 shadow-2xl shadow-emerald-500/30 animate-pop-in">
                <Icon name="check" className="w-11 h-11 text-white" />
              </div>
              <h1 className="text-3xl font-black text-gray-900 tracking-tight">Visite validée !</h1>
              <p className="text-gray-400 mt-1.5 text-sm font-medium">{state.message}</p>
            </div>
          )}

          {/* Main card — premium glass card, same border/shadow language as dashboard cards */}
          <div className="bg-white rounded-3xl shadow-2xl shadow-gray-200/60 border border-gray-100 p-8 animate-fade-in-up delay-200">
            <div className="flex items-center gap-3 mb-6 pb-6 border-b border-gray-50">
              <div className="w-12 h-12 bg-orange-50 rounded-2xl flex items-center justify-center border border-orange-100">
                <span className="text-2xl">🍽️</span>
              </div>
              <div>
                <p className="font-bold text-gray-900 text-base">{state.restaurant}</p>
                <p className="text-xs text-gray-400 font-medium">Carte de fidélité</p>
              </div>
            </div>

            {!isReward && (
              <>
                {/* 📊 Remplacement du total par la variable dynamique */}
                <ProgressBar current={state.checkCount} total={totalRequired} />

                <div className="mt-6 bg-gradient-to-br from-orange-50 to-amber-50/50 rounded-2xl p-5 text-center border border-orange-100/60">
                  <p className="text-xs font-bold text-orange-400 uppercase tracking-wider">Encore</p>
                  <p className="text-4xl font-black text-orange-500 tracking-tight my-1">{remaining}</p>
                  <p className="text-xs text-gray-500 font-medium">
                    visite{remaining > 1 ? 's' : ''} pour {state.rewardTitle || 'une récompense'} {state.rewardEmoji || '🎁'}
                  </p>
                </div>
              </>
            )}

            {isReward && (
              <div className="bg-gradient-to-br from-orange-50 to-amber-50/40 rounded-2xl p-6 text-center border-2 border-orange-100">
                <p className="text-4xl mb-3">{state.rewardEmoji || '🎊'}</p>
                <p className="font-bold text-gray-900 text-base mb-1">Votre récompense est prête !</p>
                <p className="text-sm text-gray-500 leading-relaxed">
                  {state.rewardDesc || 'Présentez cet écran à la caisse pour obtenir votre repas gratuit'}
                </p>
                <div className="mt-4 bg-white rounded-xl p-3.5 border border-orange-100 shadow-sm">
                  <p className="text-[11px] text-gray-400 font-bold uppercase tracking-wider">Compteur remis à zéro</p>
                  <p className="text-lg font-black text-orange-500 mt-0.5">0/{totalRequired} visites</p>
                </div>
              </div>
            )}
          </div>

          <div className="text-center mt-7 space-y-3 animate-fade-in-up delay-300">
            <Link
              to="/profile"
              className="group inline-flex items-center gap-1.5 text-gray-900 text-sm font-bold hover:text-orange-500 transition-colors"
            >
              Voir tout mon profil fidélité
              <Icon name="arrow" className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" />
            </Link>
            <p className="text-gray-300 text-xs font-medium">FidApp • Votre fidélité récompensée 🇲🇦</p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default CardPage
