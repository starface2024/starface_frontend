import { createStore } from "vuex";

import createPersistedState from "vuex-persistedstate";

import auth from "@/stores/auth";
import drawer from "@/stores/drawer";
import videos from "@/stores/videos";

// initial state
let initialState = {
  auth: auth.state,
};
// const debug = process.env.NODE_ENV !== "production";
let plugins = [createPersistedState({})];
// if (debug) plugins.push(createLogger());
export default createStore({
  modules: {
    auth,
    drawer,
    videos
  },
  plugins,
  state: {},
  mutations: {
    RESET(state) {
      Object.keys(state).forEach((key) => {
        Object.assign(state[key], initialState[key]);
      });
    },
  },
  actions: {},
  getters: {
    getToken: (state) => state.auth.token,
  },
});