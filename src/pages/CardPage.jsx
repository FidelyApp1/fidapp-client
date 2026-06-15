import { useLocation, useNavigate } from 'react-router-dom'
import ProgressBar from '../components/ProgressBar'

const CardPage = () => {
  const { state } = useLocation()
  const navigate = useNavigate()

  if (!state) {
    navigate('/')
    return null
  }

  const isReward = !!state.reward

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 to-white flex flex-col items-center justify-center px-6">
      <div className="w-full max-w-sm">

        {isReward ? (
          <div className="text-center mb-8">
            <div className="w-24 h-24 bg-yellow-400 rounded-full flex items-center justify-center mx-auto mb-4 shadow-xl animate-bounce">
              <span className="text-5xl">🎉</span>
            </div>
            <h1 className="text-2xl font-bold text-gray-800">Félicitations !</h1>
            <p className="text-orange-500 font-semibold mt-1">{state.reward}</p>
          </div>
        ) : (
          <div className="text-center mb-8">
            <div className="w-20 h-20 bg-green-500 rounded-3xl flex items-center justify-center mx-auto mb-4 shadow-lg">
              <span className="text-4xl">✅</span>
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

          <ProgressBar current={state.checkCount} total={10} />

          <div className="mt-6 bg-orange-50 rounded-2xl p-4 text-center">
            <p className="text-xs text-gray-400">Encore</p>
            <p className="text-2xl font-bold text-orange-500">{10 - state.checkCount}</p>
            <p className="text-xs text-gray-400">visite{10 - state.checkCount > 1 ? 's' : ''} pour un repas gratuit</p>
          </div>
        </div>

        <p className="text-center text-gray-300 text-xs mt-6">FidApp • Votre fidélité récompensée</p>
      </div>
    </div>
  )
}

export default CardPage