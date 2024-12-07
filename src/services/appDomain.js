import $request from '@/axios/index'
import { catchAxiosError, catchAxiosSuccess } from './response'

export default {
  async getUser(params) {
    try {
      let res = await $request.get(`wp-json/nellalink-mango-meet/v1/get-user-login-details`, { params })
      // catchAxiosSuccess(res)
      return res.data
    } catch (error) {
      catchAxiosError(error)
      throw error
    }
  },

  async getUserMeta(payload, user_id) {
    try {
      let res = await $request.get(`wp-json/nellalink/v2/smart-meta-manager/user/${user_id}`, { params: payload })
      // catchAxiosSuccess(res)
      return res.data
    } catch (error) {
      catchAxiosError(error)
      throw error
    }
  },

  async updateUserMeta(payload, user_id) {
    try {
      let res = await $request.put(`wp-json/nellalink/v2/smart-meta-manager/user/${user_id}`,  payload)
      catchAxiosSuccess(res)
      return res.data
    } catch (error) {
      catchAxiosError(error)
      throw error
    }
  },


  async getMatch(payload, user_id) {
    try {
      let res = await $request.get(`wp-json/nellalink-mango-meet/v1/match/${user_id}`, { params: payload })
      // catchAxiosSuccess(res)
      return res.data
    } catch (error) {
      catchAxiosError(error)
      throw error
    }
  },

  async likeMatch(payload) {
    try {
      let res = await $request.get(`wp-json/nellalink-mango-meet/v1/like-and-connect`, { params: payload })
      catchAxiosSuccess(res)
      return res.data
    } catch (error) {
      catchAxiosError(error)
      throw error
    }
  },

   async pay(payload) {
    try {
      let res = await $request.get(`wp-json/nellalink-mango-meet/v1/subscription-fees-payment`, { params: payload })
      catchAxiosSuccess(res)
      return res.data
    } catch (error) {
      catchAxiosError(error)
      throw error
    }
  },

  async listSubscriptionFees(user_id) {
    try {
      let res = await $request.get(`wp-json/nellalink-mango-meet/v1/subscription-fees?user_id=${user_id}`)
      return res.data
    } catch (error) {
      catchAxiosError(error)
      throw error
    }
  },

  //   Get Wallets
  async getWallets(params) {
      try {
        let res = await $request.get(`/wp-json/rimplenet/v1/user-wallet-balance/multi`, {
          params
        })
        return res.data
      } catch (error) {
        catchAxiosError(error)
        throw error
      }
  },

  //   get Transactions
  async getTransactions(params) {
      try {
      let res = await $request.get(`wp-json/rimplenet/v3/transactions`, {
        params
      })
      // catchAxiosSuccess(res)
      return res.data
    } catch (error) {
      catchAxiosError(error)
      throw error
    }
  },

  async claim(params) {
      try {
      let res = await $request.get(`wp-json/nellalink-mango-meet/v1/claim-coins`, {
        params
      })
      catchAxiosSuccess(res)
      return res.data
    } catch (error) {
      catchAxiosError(error)
      throw error
    }
  },

  async getLocationByType(params) {
    try {
    let res = await $request.get(`wp-json/nellalink-mango-meet/v1/geo-data`, {
      params
    })
    // catchAxiosSuccess(res)
    return res.data
  } catch (error) {
    catchAxiosError(error)
    throw error
  }
},
}
