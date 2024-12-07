import $request from '@/axios/index'
import { catchAxiosError, catchAxiosSuccess } from './response'

export default {
  async getProducts() {
    try {
      let res = await $request.get(`vendor-products`)
      // catchAxiosSuccess(res)
      return res.data
    } catch (error) {
      catchAxiosError(error)
      throw error
    }
  },

  async createProduct(formData) {
    try {
      let res = await $request.post(`create-product`, formData)
      catchAxiosSuccess(res)
      return res.data
    } catch (error) {
      catchAxiosError(error)
      throw error
    }
  },

  async updateProduct(id, formData) {
    try {
      let res = await $request.post(`/edit-product/${id}`, formData)
      catchAxiosSuccess(res)
      return res.data
    } catch (error) {
      catchAxiosError(error)
      throw error
    }
  },

  async updateStock(id, formData) {
    try {
      let res = await $request.post(`/update-stock/${id}`, formData)
      catchAxiosSuccess(res)
      return res.data
    } catch (error) {
      catchAxiosError(error)
      throw error
    }
  },

  async getOrderByID(id) {
    try {
      let res = await $request.get(`/vendor-order/${id}`, )
      // catchAxiosSuccess(res)
      return res.data
    } catch (error) {
      // catchAxiosError(error)
      return error
    }
  },

  async addDiscount(id, formData) {
    try {
      let res = await $request.post(`/add-discount/${id}`, formData)
      catchAxiosSuccess(res)
      return res.data
    } catch (error) {
      catchAxiosError(error)
      throw error
    }
  },

  async removeDiscount(id) {
    try {
      let res = await $request.post(`/remove-discount/${id}`)
      catchAxiosSuccess(res)
      return res.data
    } catch (error) {
      catchAxiosError(error)
      throw error
    }
  },

  async getOrders() {
    try {
      let res = await $request.get(`vendor-orders`)
      // catchAxiosSuccess(res)
      return res.data
    } catch (error) {
      catchAxiosError(error)
      throw error
    }
  },

  async getTransactions() {
    try {
      let res = await $request.get(`user-transactions`)
      // catchAxiosSuccess(res)
      return res.data
    } catch (error) {
      catchAxiosError(error)
      throw error
    }
  },

  async getPayouts() {
    try {
      let res = await $request.get(`user-payouts`)
      // catchAxiosSuccess(res)
      return res.data
    } catch (error) {
      catchAxiosError(error)
      throw error
    }
  },

  async requestPayout(formData) {
    try {
      let res = await $request.post(`request-payout`, formData)
      catchAxiosSuccess(res)
      return res.data
    } catch (error) {
      catchAxiosError(error)
      throw error
    }
  },

  async addBankDetails(formData) {
    try {
      let res = await $request.post(`add-bank-details`, formData)
      catchAxiosSuccess(res)
      return res.data
    } catch (error) {
      catchAxiosError(error)
      throw error
    }
  },

  async removeAccount(id) {
    try {
      let res = await $request.post(`delete-bank-details/${id}`)
      catchAxiosSuccess(res)
      return res.data
    } catch (error) {
      catchAxiosError(error)
      throw error
    }
  },

  async submitWholesaleApplication(formData) {
    try {
      let res = await $request.post(`create-manufacturer-application`, formData)
      catchAxiosSuccess(res)
      return res.data
    } catch (error) {
      catchAxiosError(error)
      throw error
    }
  },

  async wholesaleApplications(status, page) {
    try {
      let res = await $request.get(`my-manufacturer-applications?status=${status}&page=${page}`)
      // catchAxiosSuccess(res)
      return res.data
    } catch (error) {
      catchAxiosError(error)
      throw error
    }
  },

  async viewManufacturerApplication(params) {
    try {
      let res = await $request.get(`/find-manufacturer-application/${params}`, )
      // catchAxiosSuccess(res)
      return res.data
    } catch (error) {
      // catchAxiosError(error)
      return error
      // throw error
    }
  },

  async createShop(formData) {
    try {
      let res = await $request.post(`create-shop`, formData)
      catchAxiosSuccess(res)
      return res.data
    } catch (error) {
      catchAxiosError(error)
      throw error
    }
  },
}
