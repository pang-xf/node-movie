// 帮助分类查询  根据传来的分类  查询数据库 返回数据

import axios from 'axios'
const state = {
  data:'',
};
const mutations = {
  GET_DATA_BY_MENU(state,payload){
    state.data=payload;
  }
};
const actions = {
  getDataByMenuAll({commit},params){
    console.log(params);
    axios.get("/api/getMovieBypage",{
      params:{
        count:params.count,
        curPage:params.curPage,
      }
    })
    .then(res=>{
      let payload = res.data.data;
      console.log(payload);
      commit("GET_DATA_BY_MENU",payload)
    })
    .catch(function (error) {
      console.log(error);
    });
  }
};
const getters = {
  // 获取按更新状态的数据
  fetchMenuData:state => {
    return state.data
  }
}
export default{
  state,
  mutations,
  actions,
  getters
}