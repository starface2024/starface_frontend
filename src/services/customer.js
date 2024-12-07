import $request from '@/axios/index'
import { catchAxiosError, catchAxiosSuccess } from './response'

export default {
  async addToCart(payload) {
    try {
      let res = await $request.post(`/add-to-cart`, payload)
      catchAxiosSuccess(res)
      return res.data
    } catch (error) {
      catchAxiosError(error)
      throw error
    }
  },

  async updateCart({id, payload}) {
    try {
      let res = await $request.post(`/update-cart-item/${id}`, payload)
      catchAxiosSuccess(res)
      return res.data
    } catch (error) {
      catchAxiosError(error)
      throw error
    }
  },

  async removeFromCart(id) {
    try {
      let res = await $request.post(`/remove-cart-item/${id}`)
      catchAxiosSuccess(res)
      return res.data
    } catch (error) {
      catchAxiosError(error)
      throw error
    }
  },

  async addToWishlist(payload) {
    try {
      let res = await $request.post(`/add-to-wishlist`, payload)
      catchAxiosSuccess(res)
      return res.data
    } catch (error) {
      catchAxiosError(error)
      throw error
    }
  },

  async removeFromWishlist(id) {
    try {
      let res = await $request.post(`/remove-from-wishlist/${id}`)
      catchAxiosSuccess(res)
      return res.data
    } catch (error) {
      catchAxiosError(error)
      throw error
    }
  },

  async getOrders(status, page) {
    try {
      let res = await $request.get(`/user-orders?status=${status}&page=${page}`, )
      // catchAxiosSuccess(res)
      return res.data
    } catch (error) {
      // catchAxiosError(error)
      return error
      // throw error
    }
  },

  async getOrderByID(id) {
    try {
      let res = await $request.get(`/find-order/${id}`, )
      // catchAxiosSuccess(res)
      return res.data
    } catch (error) {
      // catchAxiosError(error)
      return error
    }
  },

  async vendorApplications(status, page) {
    try {
      let res = await $request.get(`/my-vendor-applications?status=${status}&page=${page}`, )
      // catchAxiosSuccess(res)
      return res.data
    } catch (error) {
      // catchAxiosError(error)
      return error
      // throw error
    }
  },

  async viewVendorApplication(params) {
    try {
      let res = await $request.get(`/find-vendor-application/${params}`, )
      // catchAxiosSuccess(res)
      return res.data
    } catch (error) {
      // catchAxiosError(error)
      return error
      // throw error
    }
  },

  async submitApplication(formData) {
    try {
      let res = await $request.post(`/create-vendor-application`, formData)
      catchAxiosSuccess(res)
      return res.data
    } catch (error) {
      catchAxiosError(error)
      // return error
      throw error
    }
  },

  async addAddress(payload) {
    try {
      let res = await $request.post(`/add-address`, payload)
      catchAxiosSuccess(res)
      return res.data
    } catch (error) {
      catchAxiosError(error)
      throw error
    }
  },

  async removeAddress(id) {
    try {
      let res = await $request.post(`/remove-address/${id}`)
      catchAxiosSuccess(res)
      return res.data
    } catch (error) {
      catchAxiosError(error)
      throw error
    }
  },

  async placeOrder(payload) {
    try {
      let res = await $request.post(`/make-order`, payload)
      catchAxiosSuccess(res)
      return res.data
    } catch (error) {
      catchAxiosError(error)
      throw error
    }
  },

  async removeOrder(id) {
    try {
      let res = await $request.post(`/delete-user-order/${id}`)
      catchAxiosSuccess(res)
      return res.data
    } catch (error) {
      catchAxiosError(error)
      throw error
    }
  },

  async PayWithUSDT(payload) {
    try {
      let res = await $request.post(`/crypto-pay`, payload)
      catchAxiosSuccess(res)
      return res.data
    } catch (error) {
      catchAxiosError(error)
      throw error
    }
  },

  async PayWithUSD(payload) {
    try {
      let res = await $request.post(`/pay-usd`, payload)
      catchAxiosSuccess(res)
      return res.data
    } catch (error) {
      catchAxiosError(error)
      throw error
    }
  },

  async PayWithNGN(payload) {
    try {
      let res = await $request.post(`/paystack/pay`, payload)
      catchAxiosSuccess(res)
      return res.data
    } catch (error) {
      catchAxiosError(error)
      throw error
    }
  },

  async createRating(payload) {
    try {
      let res = await $request.post(`/create-rating`, payload)
      catchAxiosSuccess(res)
      return res.data
    } catch (error) {
      catchAxiosError(error)
      throw error
    }
  },

  async createReview(payload) {
    try {
      let res = await $request.post(`/create-review`, payload)
      catchAxiosSuccess(res)
      return res.data
    } catch (error) {
      catchAxiosError(error)
      throw error
    }
  },
}




