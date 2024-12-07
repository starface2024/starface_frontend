import $request from '@/axios/index'
import { catchAxiosError, catchAxiosSuccess } from './response'
// import { catchAxiosError } from './response'

export default {
  async earnWallet() {
    try {
      let res = await $request.get(`api/earn/wallet`)
      return res.data
    } catch (error) {
      catchAxiosError(error)
      throw error
    }
  },

  async allWallets() {
    try {
      let res = await $request.get(`api/wallet/get-wallet`)
      return res.data
    } catch (error) {
      catchAxiosError(error)
      throw error
    }
  },

  async deposit(formData){
    try {
        let res = await $request.post(`api/transaction/deposit`, formData)
        return res.data
      } catch (error) {
        catchAxiosError(error)
        throw error
      }
  },

  async convert(formData){
    try {
        let res = await $request.post(`api/transaction/convert`, formData)
        catchAxiosSuccess(res.data)
        return res.data
      } catch (error) {
        catchAxiosError(error)
        throw error
      }
  },

  async transfer(formData){
    try {
        let res = await $request.post(`api/transaction/transfer`, formData)
        catchAxiosSuccess(res.data)
        return res.data
      } catch (error) {
        catchAxiosError(error)
        throw error
      }
  },

  async withdraw(formData){
    try {
        let res = await $request.post(`api/trans/withdraw`, formData)
        catchAxiosSuccess(res.data)
        return res.data
      } catch (error) {
        catchAxiosError(error)
        throw error
      }
  },

  async redeem(){
    try {
        let res = await $request.get(`api/transaction/redeem-stars`)
        catchAxiosSuccess(res.data)
        return res.data
      } catch (error) {
        catchAxiosError(error)
        throw error
      }
  },

  async transactionHistory(params){
    try {
        let res = await $request.get(`api/transaction/history`, {params})
        // catchAxiosSuccess(res.data)
        return res.data
      } catch (error) {
        catchAxiosError(error)
        throw error
      }
  },
  
  async gift(payload){
    try {
        let res = await $request.post(`api/transaction/gift-flower`, payload)
        catchAxiosSuccess(res.data)
        return res.data
      } catch (error) {
        catchAxiosError(error)
        throw error
      }
  },
  
  async getSubsciptions(){
    try {
      let res = await $request.get(`api/subscribe/subscriptions`)
      // catchAxiosSuccess(res.data)
      return res.data
    } catch (error) {
      catchAxiosError(error)
      throw error
    }
  },

  async getSubsciptionPlans(){
    try {
      let res = await $request.get(`api/subscribe/plans`)
      // catchAxiosSuccess(res.data)
      return res.data
    } catch (error) {
      catchAxiosError(error)
      throw error
    }
  },

  async creatorPlans(){
    
    try {
      let res = await $request.get(`api/subscribe/creator-plans`)
      // catchAxiosSuccess(res.data)
      return res.data
    } catch (error) {
      catchAxiosError(error)
      throw error
    }
  },

  async subscibeToPlan(formData){
    try {
      let res = await $request.post(`api/subscribe`, formData)
      catchAxiosSuccess(res.data)
      return res.data
    } catch (error) {
      catchAxiosError(error)
      throw error
    }
  },

  async becomeACreator(formData) {
    try {
      let res = await $request.post(`api/subscribe/become-a-creaor`, formData)
      catchAxiosSuccess(res.data)
      return res.data
    } catch (error) {
      catchAxiosError(error)
      throw error
    }
  }
  
}
