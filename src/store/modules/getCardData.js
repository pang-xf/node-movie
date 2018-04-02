import axios from 'axios'
const state = {
  MovieByState:'',
  MovieByStateCountry:''
};
const mutations = {
  GET_MOVIE_BY_STATE(state,payload){
    state.MovieByState=payload;
  },
  GET_MOVIE_BY_STATE_COUNTRY(state,payload){ 
    state.MovieByStateCountry=payload;
  }
};

const actions = {
  getMovieByState({commit},params){
    axios.get("/api/movie/getMovieByState",{
      params:{state:params.state}
    })
    .then(res=>{
      let payload = res.data;
      commit("GET_MOVIE_BY_STATE",payload)
    })
    .catch(function (error) {
      console.log(error);
    });
  },
  getMovieByStateCountry({commit},params){
    axios.get('/api/movie/getMovieByStateCountry',{
      params:{state:params.state,country:params.dataClass}
    }).then(function (res) {
      let payload = res.data;
      commit("GET_MOVIE_BY_STATE_COUNTRY",payload)
    })
    .catch(function (error) {
      console.log(error);
    });
  }
};
const getters = {
  // 获取按更新状态的数据
  MovieByState:state => {
    return state.MovieByState
  },
  // 获取按更新状态和不同国家的分类
  MovieByStateCountry:state => {
    return state.MovieByStateCountry
  }
}
export default{
  state,
  mutations,
  actions,
  getters
}