import axios from 'axios'
const state = {
  film:{
    name:'',
    type:'',
    category:'',
    country:'',
    time:'',
    alias:'',
    all:'',
    profile:'',
    state:'',
    img:'',
    update:'',
    dingyue:'',
    rate:''
  }
};
const mutations = {
  GET_FILM_DETAIL(state,payload){
    console.log('进入mutations');
    state.film=payload;
  }
};

const actions = {
  getFilmDetail({commit},params){
    console.log('进入action');
    axios.get("/api/movie/getMovieById",{
      params:{id:params.id}
    })
    .then(res=>{
      let payload = res.data;
      commit("GET_FILM_DETAIL",payload)
    })
    .catch(function (error) {
      console.log(error);
    });
  }
};
const getters = {
  film:state => {
    return state.film
  }
}
export default{
  state,
  mutations,
  actions,
  getters
}