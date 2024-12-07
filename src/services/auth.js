import $request from '@/axios/index'
import { catchAxiosError, catchAxiosSuccess } from './response'

export default {
  
  async login(formData) {
    try {
      let res = await $request.post(`api/auths/signin`, formData)
      catchAxiosSuccess(res)
      return res.data
    } catch (error) {
      catchAxiosError(error)
      // return error
      throw error
    }
  },

  async myProfile() {
    try {
      let res = await $request.get(`api/user`,)
      // catchAxiosSuccess(res)
      return res.data
    } catch (error) {
      catchAxiosError(error)
      // return error
      throw error
    }
  },

  async getUser(id) {
    try {
      let res = await $request.get(`api/user/profile/${id}`,)
      // catchAxiosSuccess(res)
      return res.data
    } catch (error) {
      // catchAxiosError(error)
      return error
      // throw error
    }
  },

  async requestCode(formData) {
    try {
      let res = await $request.post(`api/auths/request-otp`, formData)
      catchAxiosSuccess(res)
      return res.data
    } catch (error) {
      catchAxiosError(error)
      throw error
    }
  },

  async resendCode(formData) {
    try {
      let res = await $request.post(`api/auths/resendotp`, formData)
      catchAxiosSuccess(res)
      return res.data
    } catch (error) {
      catchAxiosError(error)
      throw error
    }
  },

  async verifyOTP(formData) {
    try {
      let res = await $request.post(`api/auths/verify-otp`, formData)
      catchAxiosSuccess(res)
      return res.data
    } catch (error) {
      catchAxiosError(error)
      throw error
    }
  },
  
  async setPassword(formData) {
    try {
      let res = await $request.post(`api/auths/set-password`, formData)
      catchAxiosSuccess(res)
      return res.data
    } catch (error) {
      catchAxiosError(error)
      throw error
    }
  },

  async listCountries(){
    try {
      let res = await $request.post(`api/auths/country-list`)
      // catchAxiosSuccess(res)
      return res.data
    } catch (error) {
      catchAxiosError(error)
      throw error
    }
  },

  async updateUserProfile(formData, id) {
    try {
      let res = await $request.put(`api/user/profile-update/${id}`, formData)
      catchAxiosSuccess(res)
      return res.data
    } catch (error) {
      catchAxiosError(error)
      throw error
    }
  },

  async updateProfilePhoto(formData) {
    try {
      let res = await $request.put(`api/user/profile-update`, formData)
      catchAxiosSuccess(res)
      return res.data
    } catch (error) {
      catchAxiosError(error)
      throw error
    }
  },

  async deleteAccount() {
    try {
      let res = await $request.delete(`api/user/delete-user`)
      catchAxiosSuccess(res)
      return res.data
    } catch (error) {
      catchAxiosError(error)
      throw error
    }
  }
}

