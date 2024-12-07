import $request from '@/axios/index'
// import { catchAxiosError, catchAxiosSuccess } from './response'
import { catchAxiosError, catchAxiosSuccess } from './response'
import store from '@/store'


export default {
  async conversations() {
    const userID = store.getters['auth/getUserID']
    try {
      let res = await $request.get(`api/chat/conversations/${userID}`)
      return res.data
    } catch (error) {
      catchAxiosError(error)
      throw error
    }
  },

  async conversation(id) {
    try {
      let res = await $request.get(`api/chat/messages/${id}`)
      return res.data
    } catch (error) {
      catchAxiosError(error)
      throw error
    }
  },

  async send(formdata) {
    try {
      let res = await $request.post(`api/chat/sendMessage`, formdata)
      return res.data
    } catch (error) {
      catchAxiosError(error)
      throw error
    }
  },

  async startChat(formdata){
    try {
      let res = await $request.post(`api/chat/startConversation`, formdata)
      return res.data
    } catch (error) {
      catchAxiosError(error)
      throw error
    }
  },

  async readChat(formdata, id){
    try {
      let res = await $request.post(`api/chat/conversations/${id}/read`, formdata)
      return res.data
    } catch (error) {
      catchAxiosError(error)
      throw error
    }
  },

  async updateStatus(formdata, id){
    try {
      let res = await $request.post(`api/chat/startConversation/status/${id}`, formdata)
      catchAxiosSuccess(res.data)
      return res.data
    } catch (error) {
      catchAxiosError(error)
      throw error
    }
  }

  
}
