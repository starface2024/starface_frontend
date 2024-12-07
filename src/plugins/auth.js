import { jwtDecode } from 'jwt-decode'
// import Vue from "vue";
import store from '@/store'
import appDomain from '@/services/appDomain'

function loginUser() {
  const user = store.getters['auth/getUserMeta']
  let payload = {
    chat_id: user.telegram_chat_id
  }
  appDomain.getUser(payload).then((res) => {
    console.log(res, 'from:checking expired data')
    store.commit('auth/setUser', res.data)
    localStorage.setItem('_mangomeet_token', res.data.access_token)
  })
}

export function checkTokenExpiration() {
  const token = localStorage.getItem('_mangomeet_token')
  if (token) {
    // Decode the token to get the expiration time
    const tokenData = jwtDecode(token)
    // console.log(tokenData, 'ommmmmo')

    // Check if the token has expired
    if (tokenData.exp * 1000 < Date.now()) {
      // if (tokenData.exp * 1000 > 10) {
      //   Vue.$toast.open({
      //     message: `JWT Token Expired, please, login`,
      //     type: "error",
      //     position: "top",
      //   });
      loginUser()
      console.log('expired')
    }
  }
}
