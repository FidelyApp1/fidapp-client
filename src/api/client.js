import axios from 'axios'

const api = axios.create({
  baseURL: 'https://fidapp-backend-production.up.railway.app/api',
  headers: { 'Content-Type': 'application/json' }
})

export const checkin = async (phone, qrCode) => {
  const res = await api.post('/checkin', { phone, qrCode })
  return res.data
}
export const getClientProfile = async (phone) => {
  const res = await api.get(`/client/profile/${phone}`)
  return res.data
}

export default api