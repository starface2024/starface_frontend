// import router from "@/router"

export default {
  namespaced: true,
  state: {
    user: null,
    starface_token: null,
  },

  mutations: {
    setUser(state, data) {
      state.user = data
    },

    login(state, { token, user }) {
      state.starface_token = token;
      state.user = user;
    },

    async LOGOUT(state) {
      state.user = null
      state.starface_token = null
      localStorage.clear()
    },

    RESET(state) {
      Object.keys(state).forEach((key) => {
        Object.assign(state[key], null)
      })
    }
  },

  actions: {
    logout({ commit }) {
      commit('LOGOUT')
    }
  },
  
  getters: {
    auth: (state) => state.auth,
    getUser: (state) => state.user,
    getToken: (state) => state.starface_token,
    getAuthenticated: (state) => !!state.starface_token,
    getUserID:(state) => state.user._id
  }
}
