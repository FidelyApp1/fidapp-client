import { useLocation, useNavigate, Link } from 'react-router-dom'
import ProgressBar from '../components/ProgressBar'
import { useEffect, useState } from 'react'

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

  return (
    <div className={`min-h-screen flex flex-col items-center justify-center px-6 transition-all duration-500 ${
      isReward 
        ? 'bg-gradient-to-br from-yellow-50 via-orange-50 to-white' 
        : 'bg-gradient-to-br from-green-50 to-white'
    }`}>

      {/* 🎊 Rendu des confettis stabilisés */}
      {showConfetti && (
        <div className="fixed inset-0 pointer-events-none overflow-hidden z-50">
          {confettiList.map((c) => (
            <div
              key={c.id}
              className="absolute animate-bounce"
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

      <div className="w-full max-w-sm">
        {isReward ? (
          <div className="text-center mb-8">
            <div className="relative inline-block">
              <div className="w-28 h-28 bg-gradient-to-br from-yellow-400 to-orange-500 rounded-full flex items-center justify-center mx-auto mb-4 shadow-2xl">
                <span className="text-6xl">🏆</span>
              </div>
              <div className="absolute -top-2 -right-2 w-8 h-8 bg-green-500 rounded-full flex items-center justify-center">
                <span className="text-white text-sm font-bold">✓</span>
              </div>
            </div>
            <h1 className="text-3xl font-bold text-gray-800 mb-2">Félicitations !</h1>
            <div className="bg-orange-500 text-white font-semibold px-6 py-3 rounded-2xl inline-block mb-2">
              🎁 {state.reward}
            </div>
            <p className="text-gray-400 text-sm mt-2">Montrez cet écran au comptoir</p>
          </div>
        ) : (
          <div className="text-center mb-8">
            <div className="w-24 h-24 bg-green-500 rounded-3xl flex items-center justify-center mx-auto mb-4 shadow-lg">
              <span className="text-5xl">✅</span>
            </div>
            <h1 className="text-2xl font-bold text-gray-800">Visite validée !</h1>
            <p className="text-gray-400 mt-1 text-sm">{state.message}</p>
          </div>
        )}

        <div className="bg-white rounded-3xl shadow-xl p-8">
          <div className="flex items-center gap-3 mb-6 pb-6 border-b border-gray-50">
            <div className="w-12 h-12 bg-orange-100 rounded-2xl flex items-center justify-center">
              <span className="text-2xl">🍽️</span>
            </div>
            <div>
              <p className="font-semibold text-gray-800">{state.restaurant}</p>
              <p className="text-xs text-gray-400">Carte de fidélité</p>
            </div>
          </div>

          {!isReward && (
            <>
              <ProgressBar current={state.checkCount} total={10} />
              <div className="mt-6 bg-orange-50 rounded-2xl p-4 text-center">
                <p className="text-xs text-gray-400">Encore</p>
                <p className="text-3xl font-bold text-orange-500">{10 - state.checkCount}</p>
                <p className="text-xs text-gray-400">
                  visite{10 - state.checkCount > 1 ? 's' : ''} pour un repas gratuit 🎁
                </p>
              </div>
            </>
          )}

          {isReward && (
            <div className="bg-gradient-to-br from-orange-50 to-yellow-50 rounded-2xl p-6 text-center border-2 border-orange-200">
              <p className="text-4xl mb-3">🎊</p>
              <p className="font-bold text-gray-800 mb-1">Votre récompense est prête !</p>
              <p className="text-sm text-gray-500">Présentez cet écran à la caisse pour obtenir votre repas gratuit</p>
              <div className="mt-4 bg-white rounded-xl p-3 border border-orange-200">
                <p className="text-xs text-gray-400">Compteur remis à zéro</p>
                <p className="text-lg font-bold text-orange-500">0/10 visites</p>
              </div>
            </div>
          )}
        </div>

        <div className="text-center mt-6 space-y-3">
          <Link
            to="/profile"
            className="block text-orange-500 text-sm font-medium hover:underline transition-all"
          >
            Voir tout mon profil fidélité →
          </Link>
          <p className="text-gray-300 text-xs">FidApp • Votre fidélité récompensée 🇲🇦</p>
        </div>
      </div>
    </div>
  )
}

export default CardPage