
export default {
  namespaced: true,
  state: {
    collapsed: false,
    subMenu: null,
    type: 'retailer'
  },

  getters: {
    isCollapsed: (state) => state.collapsed,
    subMenu: (state) => state.subMenu,
    getType: (state) => state.type
  },

  mutations: {
    SET_COLLAPSE_STATE(state, payload) {
      state.collapsed = payload
    },
    SET_SUB_MENU(state, payload) {
      state.subMenu = payload
    },
    setType(state, data) {
      state.type = data
    }
  },

  actions: {
    setCollapseState({ state, commit }) {
      let value = state.collapsed ? false : true
      commit('SET_COLLAPSE_STATE', value)
    },

    setSubMenu({ commit }, value) {
      commit('SET_SUB_MENU', value)
    }
  }
}
