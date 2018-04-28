// 记录用户浏览次数

import axios from 'axios'
const state = {
  lookCount:'',
};
const mutations = {
  GET_LOOKCOUNT(state,payload){
    state.lookCount=payload;
  }
};

const actions = {
  getMovieByState({commit},params){
    axios.get("/api/lookCount",{
      params:{
        uid:params.uid,
        category:params.category
      }
    })
    .then(res=>{
      let payload = res.data;
      console.log(res);
      // commit("GET_LOOKCOUNT",payload)
    })
    .catch(function (error) {
      console.log(error);
    });
  }
};
const getters = {
  // 获取按更新状态的数据
  lookCount:state => {
    return state.lookCount
  }
}
export default{
  state,
  mutations,
  actions,
  getters
}