

import $request from '@/axios/index'
import { catchAxiosError, catchAxiosSuccess } from './response'
// import { catchAxiosError } from './response'

export default {

    async followCount() {
        try {
          let res = await $request.get(`api/activity/follow-count`)
          return res.data
        } catch (error) {
          catchAxiosError(error)
          throw error
        }
      },

      async views() {
        try {
          let res = await $request.get(`api/activity/views-like`)
          return res.data
        } catch (error) {
          catchAxiosError(error)
          throw error
        }
      },

      async allPosts() {
        try {
          let res = await $request.get(`api/activity/all-posts`)
          return res.data
        } catch (error) {
          catchAxiosError(error)
          throw error
        }
      },

      async allReferralRecords() {
        try {
          let res = await $request.get(`/api/activity/get-referral`)
          return res.data
        } catch (error) {
          catchAxiosError(error)
          throw error
        }
      },

      async followFunc(formData) {
        try {
          let res = await $request.post(`/api/activity/follow`, formData)
          // catchAxiosSuccess(res.data)
          return res.data
        } catch (error) {
          catchAxiosError(error)
          throw error
        }
      },

      async likeImage(id) {
        try {
          let res = await $request.get(`api/activity/like-image/${id}`)
          catchAxiosSuccess(res.data)
          return res.data
        } catch (error) {
          catchAxiosError(error)
          throw error
        }
      },

      async toggleUserActions(formdata){
        try {
          let res = await $request.post(`api/user/action`, formdata)
          // catchAxiosSuccess(res.data)
          return res.data
        } catch (error) {
          catchAxiosError(error)
          throw error
        }
      },

      async toggleBlockActions(formData, userIdToBlock) {
        try {
          let res = await $request.post(`api/user/block/${userIdToBlock}`, formData)
          catchAxiosSuccess(res.data)
          return res.data
        } catch (error) {
          catchAxiosError(error)
          throw error
        }
      }
      
      
}