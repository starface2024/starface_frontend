import $request from '@/axios/index'
import { catchAxiosError, catchAxiosSuccess } from './response'
// import { catchAxiosError } from './response'
// import { useToast } from "vue-toastification";
// const toast = useToast();

export default {
  async list() {
    try {
      let res = await $request.get(`api/reel/get-reels`)
      return res.data
    } catch (error) {
      catchAxiosError(error)
      throw error
    }
  },

  async get(id) {
    try {
      let res = await $request.get(`api/reel/get-reels/${id}`)
      return res.data
    } catch (error) {
      catchAxiosError(error)
      throw error
    }
  },

  async comment(formData, id) {
    try {
      let res = await $request.post(`api/reel/reels/${id}/comment`, formData)
      return res.data
    } catch (error) {
      catchAxiosError(error)
      throw error
    }
  },

  async create(formData) {
    try {
      let res = await $request.post(`api/reel/post-reels`, formData)
      catchAxiosSuccess(res.data)
      return res.data
    } catch (error) {
      catchAxiosError(error)
      throw error
    }
  },

  async uploadImage(formData) {
    try {
      let res = await $request.post(`api/images/upload`, formData)
      catchAxiosSuccess(res.data)
      return res.data
    } catch (error) {
      catchAxiosError(error)
      throw error
    }
  },

  async like(formData, id) {
    try {
      let res = await $request.post(`api/reel/reels/${id}/like`, formData)
      // catchAxiosSuccess(res.data)
      return res.data
    } catch (error) {
      catchAxiosError(error)
      throw error
    }
  },

  async share(id) {
    try {
      let res = await $request.post(`api/reel/reels/${id}/share`)
      // catchAxiosSuccess(res.data)
      return res.data
    } catch (error) {
      catchAxiosError(error)
      throw error
    }
  },

  async delete(id) {
    try {
      let res = await $request.delete(`api/reel/reels/${id}`)
      catchAxiosSuccess(res.data)
      return res.data
    } catch (error) {
      catchAxiosError(error)
      throw error
    }
  }
}
