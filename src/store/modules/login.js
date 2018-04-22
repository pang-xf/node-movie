import axios from 'axios'
const state = {
  currentUser:{
    getUserName(){
        return localStorage.getItem("name");
    },
    getUserToken(){
        return localStorage.getItem("token");
    },
    getUserAvtar(){
      return localStorage.getItem("avtar");
    },
    layout:false
  }
};
const mutations = {
  TOKEN(state,payload){
    console.log(payload);
    localStorage.setItem("name",payload.user);
    localStorage.setItem("token",payload.token);
    localStorage.setItem("avtar",payload.avtar);
    localStorage.setItem("id",payload.id);
  },
  layout(state,payload){
    localStorage.removeItem("name");
    localStorage.removeItem("token");
    localStorage.removeItem("avtar");
    localStorage.removeItem("id");
    state.currentUser.layout = true
  }
};

const actions = {
  // 权限验证
  getTOKEN({commit},params){
    let payload = {
      user : params.user,
      token: params.token,
      avtar: params.avtar,
      id:params.id
    }
    commit("TOKEN",payload)
  },
  remove({commit}){
    commit("layout")
  }
};
const getters = {
  token:state => {
    return state.currentUser.getUserToken
  },
}
export default{
  state,
  mutations,
  actions,
  getters
}