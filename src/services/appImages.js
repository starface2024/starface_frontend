import $request from '@/axios/index'
import { catchAxiosError, catchAxiosSuccess } from './response'
// import { catchAxiosError } from './response'
// import { useToast } from "vue-toastification";
// const toast = useToast();

export default {
  async connect(params) {
    try {
      let res = await $request.get(`api/connect`, { params })
      return res.data
    } catch (error) {
      catchAxiosError(error)
      throw error
    }
  },

  async getUser(id) {
    try {
      let res = await $request.get(`api/images/${id}`)
      // catchAxiosSuccess(res)
      return res.data
    } catch (error) {
      catchAxiosError(error)
      // return error
      throw error
    }
  },

  async getUserReels(id) {
    try {
      let res = await $request.get(`api/reel/get-reels/user/${id}`)
      // catchAxiosSuccess(res)
      return res.data
    } catch (error) {
      catchAxiosError(error)
      // return error
      throw error
    }
  },

  async delete(id) {
    try {
      let res = await $request.delete(`api/${id}`)
      catchAxiosSuccess(res)
      return res.data
    } catch (error) {
      catchAxiosError(error)
      // return error
      throw error
    }
  },

  async getCategory(slug) {
    try {
      let res = await $request.get(`show-category/${slug}`)
      return res.data
    } catch (error) {
      catchAxiosError(error)
      throw error
    }
  },

  async getStores({ name, type, page }) {
    try {
      let res = await $request.get(`/all-shops?name=${name}&type=${type}&page=${page}`)
      return res.data
    } catch (error) {
      catchAxiosError(error)
      throw error
    }
  },

  async showShop(slug) {
    try {
      let res = await $request.get(`show-shop/${slug}`)
      return res.data
    } catch (error) {
      catchAxiosError(error)
      throw error
    }
  },

  async findShop(id) {
    try {
      let res = await $request.get(`find-shop/${id}`)
      return res.data
    } catch (error) {
      catchAxiosError(error)
      throw error
    }
  },

  async getSubCategories() {
    try {
      let res = await $request.get(`all-subcategories`)
      return res.data
    } catch (error) {
      catchAxiosError(error)
      throw error
    }
  },

  async getTags() {
    try {
      let res = await $request.get(`all-tags`)
      return res.data
    } catch (error) {
      catchAxiosError(error)
      throw error
    }
  }
}
