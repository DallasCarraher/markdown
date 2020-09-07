import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    user: {
      uid: '',
      email: '',
    },
  },
  mutations: {
    setUser(state, payload) {
      state.user.uid = payload.uid;
      state.user.email = payload.email;
    },
  },
  actions: {},
  modules: {},
  getters: {
    getUser: (state) => state.user,
  },
});
