import { createStore } from 'vuex';
import adminModule from './module/admin';
import userModule from './module/user';

export default createStore({
  strict: process.env.NODE_ENV !== 'production',
  state: {
  },
  getters: {
  },
  mutations: {
  },
  actions: {
  },
  modules: {
    adminModule,
    userModule,
  },
});