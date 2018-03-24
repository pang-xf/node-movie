import Vue from 'vue';
import Vuex from 'vuex';
Vue.use(Vuex);
import dialog from './dialog/store.js';
export default new Vuex.Store({
  modules: {
      dialog: dialog
  }
})