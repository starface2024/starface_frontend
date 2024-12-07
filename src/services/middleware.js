import $request from '@/axios/middleware'
import { catchAxiosError, catchAxiosSuccess } from './response'

export default {
  async generateWalletAddress(user_id) {
    try {
      let res = await $request.get(`cryptocurrency/bscscan/deposit-address/${user_id}`)
      catchAxiosSuccess(res)
      return res.data
    } catch (error) {
      catchAxiosError(error)
      throw error
    }
  },

  async dashboardRefresh(payload) {
    const token = localStorage.getItem('_mangomeet_token')
    try {
      let res = await $request.post(`custom/mangomeet/trigger/on-user-frontend-dashboard-refresh`, payload, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      })
      // catchAxiosSuccess(res)
      return res.data
    } catch (error) {
      catchAxiosError(error)
      throw error
    }
  },
}
