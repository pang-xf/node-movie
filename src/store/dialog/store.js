export default{
  state : {
    dialogVisible : false
  },
  mutations:{
    handle(state){
      state.dialogVisible = state.dialogVisible?false:true;
    }
  },
  actions:{
    handle(context){
      context.commit('handle');
    }
  }
}