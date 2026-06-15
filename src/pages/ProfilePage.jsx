import { useState } from 'react'
import { getClientProfile } from '../api/client'

const ProfilePage = () => {
  const [phone, setPhone] = useState('')
  const [data, setData] = useState(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  const handleSearch = async () => {
    if (phone.length < 9) {
      setError('Entrez un numéro valide')
      return
    }
    setLoading(true)
    setError('')
    try {
      const result = await getClientProfile(phone)
      setData(result)
    } catch {
      setError('Numéro introuvable — scannez d\'abord un QR code')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 to-white px-6 py-10">
      <div className="max-w-lg mx-auto">

        <div className="text-center mb-8">
          <div className="w-16 h-16 bg-orange-500 rounded-2xl flex items-center justify-center mx-auto mb-3">
            <span className="text-3xl">🃏</span>
          </div>
          <h1 className="text-2xl font-bold text-gray-800">Mon profil fidélité</h1>
          <p className="text-gray-400 text-sm mt-1">Entrez votre numéro pour voir vos points</p>
        </div>

        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 mb-6">
          <div className="flex gap-3">
            <input
              type="tel"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              placeholder="0600000000"
              className="flex-1 px-4 py-3 border-2 border-gray-100 rounded-xl focus:outline-none focus:border-orange-400 transition-colors"
            />
            <button
              onClick={handleSearch}
              disabled={loading}
              className="bg-orange-500 hover:bg-orange-600 disabled:bg-orange-300 text-white font-semibold px-5 py-3 rounded-xl transition-all"
            >
              {loading ? '...' : 'Voir'}
            </button>
          </div>
          {error && <p className="text-red-400 text-sm mt-3 text-center">{error}</p>}
        </div>

        {data && (
          <>
            <div className="grid grid-cols-2 gap-3 mb-6">
              <div className="bg-white rounded-2xl p-5 shadow-sm border border-gray-100 text-center">
                <p className="text-3xl font-bold text-orange-500">{data.totalCheckins}</p>
                <p className="text-xs text-gray-400 mt-1">Check-ins total</p>
              </div>
              <div className="bg-white rounded-2xl p-5 shadow-sm border border-gray-100 text-center">
                <p className="text-3xl font-bold text-green-500">{data.totalRewards}</p>
                <p className="text-xs text-gray-400 mt-1">Rewards gagnés</p>
              </div>
            </div>

            <h2 className="font-semibold text-gray-700 mb-3">Mes restaurants</h2>

            <div className="space-y-4">
              {data.user.loyaltyCards.map((card) => (
                <div key={card.id} className="bg-white rounded-2xl shadow-sm border border-gray-100 p-5">
                  <div className="flex items-center gap-3 mb-4">
                    <div className="w-10 h-10 bg-orange-100 rounded-xl flex items-center justify-center">
                      <span className="text-xl">🍽️</span>
                    </div>
                    <div>
                      <p className="font-semibold text-gray-800">{card.restaurant.name}</p>
                      <p className="text-xs text-gray-400">{card.totalChecks} visites au total</p>
                    </div>
                  </div>

                  <div className="mb-3">
                    <div className="flex justify-between mb-1">
                      <span className="text-xs text-gray-400">Progression</span>
                      <span className="text-xs font-semibold text-orange-500">
                        {card.checkCount}/{card.restaurant.checksRequired}
                      </span>
                    </div>
                    <div className="w-full bg-gray-100 rounded-full h-2">
                      <div
                        className="bg-orange-500 h-2 rounded-full transition-all duration-700"
                        style={{ width: `${Math.min((card.checkCount / card.restaurant.checksRequired) * 100, 100)}%` }}
                      />
                    </div>
                  </div>

                  <div className="bg-orange-50 rounded-xl p-3 text-center">
                    <p className="text-xs text-gray-400">Encore</p>
                    <p className="text-xl font-bold text-orange-500">
                      {card.restaurant.checksRequired - card.checkCount}
                    </p>
                    <p className="text-xs text-gray-400">visites pour un reward</p>
                  </div>

                  {card.rewards.length > 0 && (
                    <div className="mt-3 pt-3 border-t border-gray-50">
                      <p className="text-xs font-medium text-gray-500 mb-2">Rewards obtenus</p>
                      {card.rewards.map((reward) => (
                        <div key={reward.id} className="flex items-center justify-between py-1">
                          <span className="text-sm text-gray-600">🎁 {reward.description}</span>
                          <span className="text-xs text-gray-300">
                            {new Date(reward.createdAt).toLocaleDateString('fr-FR')}
                          </span>
                        </div>
                      ))}
                    </div>
                  )}

                  {card.checkins.length > 0 && (
                    <div className="mt-3 pt-3 border-t border-gray-50">
                      <p className="text-xs font-medium text-gray-500 mb-2">Dernières visites</p>
                      {card.checkins.map((checkin) => (
                        <div key={checkin.id} className="flex items-center justify-between py-1">
                          <span className="text-sm text-gray-500">✅ Visite validée</span>
                          <span className="text-xs text-gray-300">
                            {new Date(checkin.createdAt).toLocaleDateString('fr-FR')}
                          </span>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              ))}
            </div>
          </>
        )}
      </div>
    </div>
  )
}

export default ProfilePage