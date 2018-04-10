import Vue from 'vue';
import Vuex from 'vuex';
Vue.use(Vuex);
import dialog from './dialog/store';
import getCardData from './modules/getCardData';
import getFilmDetail from './modules/getFilmDetail';
import login from './modules/login';
export default new Vuex.Store({
  modules: {
    dialog: dialog,
    getCardData: getCardData,
    getFilmDetail:getFilmDetail,
    login:login,
  }
})