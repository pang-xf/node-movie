import Vue from 'vue';
import Vuex from 'vuex';
Vue.use(Vuex);
import dialog from './dialog/store';
import getCardData from './modules/getCardData';
import getFilmDetail from './modules/getFilmDetail';
import login from './modules/login';
import likeCount from './modules/likeCount';
import handlrMenu from './modules/handlrMenu';
import handlrMenuFetch from './modules/handlrMenuFetch';
export default new Vuex.Store({
  modules: {
    dialog: dialog,
    getCardData: getCardData,
    getFilmDetail:getFilmDetail,
    login:login,
    likeCount:likeCount,
    handlrMenu:handlrMenu,
    handlrMenuFetch:handlrMenuFetch,
  }
})