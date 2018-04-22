<template>
<div class="wrap">
  <div class="card" v-for="(value,index) in data" :key="index">
    <div class="subImg">
      <router-link :to="{name:'detail',params:{id:data[index].id}}" ><img :src=data[index].img alt="图片"></router-link>
    </div>
    <div class="subText">
      <p class="sub1">
        <router-link :to="{name:'detail',params:{id:data[index].id}}">
          {{data[index].name}}
        </router-link>
      </p>
      <p class="sub2" v-if="state==0">更新至{{data[index].update}}</p>
      <p class="sub2" v-if="state==1">完结</p>
      <div class="dingyue" @click="collect(data[index].id)">
        <div class="left">订阅</div>
        <div class="right">{{data[index].dingyue}}</div>
      </div>
    </div>
  </div>
</div>
</template>
<script>
import axios from 'axios'
export default {
  props:['state','dataClass'],
  data(){
    return{
      data:'',
    }
  },
  mounted(){
    global.islogin = true;
  },
  computed:{
  },
  methods:{
    collect(id){
      let uid = localStorage.getItem('id');
      axios.get('/api/subscribe',{
        params:{
          uid:uid,
          mid:id
        }
      })
      .then(res=>{
        if(res.data.code == 1 ){
          this.getData()
          this.$notify({
            title: 'success',
            message: '订阅成功',
            type: 'success'
          });
        }else{
          this.$notify.error({
            title: 'faild',
            message: res.data.msg,
          });
        }
      })
    },
    getData(){
      if(this.dataClass == '全部'){
        axios.get('/api/movie/getMovieByState',{
        params:{state:this.state}
        }).then(function (response) {
          this.data = response.data;
        }.bind(this))
        .catch(function (error) {
          console.log(error);
        });
      }else{
        axios.get('/api/movie/getMovieByStateCountry',{
          params:{state:this.state,country:this.dataClass}
        }).then(function (response) {
          this.data = response.data;
        }.bind(this))
        .catch(function (error) {
          console.log(error);
        });
      }
    }
  },
  created(){
    this.getData()
    // if(this.dataClass == '全部'){
    //   axios.get('/api/movie/getMovieByState',{
    //   params:{state:this.state}
    //   }).then(function (response) {
    //     this.data = response.data;
    //   }.bind(this))
    //   .catch(function (error) {
    //     console.log(error);
    //   });
    // }else{
    //   axios.get('/api/movie/getMovieByStateCountry',{
    //     params:{state:this.state,country:this.dataClass}
    //   }).then(function (response) {
    //     this.data = response.data;
    //   }.bind(this))
    //   .catch(function (error) {
    //     console.log(error);
    //   });
    // }
  }
}
</script>
<style lang="less" scoped>
.card{
  // border: 1px solid red;
  overflow: hidden;
  width: 23%;
  height: 120px;
  float: left;
  margin-right: 10px;
  margin-bottom: 10px;
  background: #fff;
  .subImg{
    width:34%;
    height: 100%;
    float: left;
    img{
      width: 100%;
      height: 100%;
    }
  }
  .subText{
    float: left;
    width: 60%;
    height: 100%;
    text-align: left;
    padding-left: 10px;
    overflow: hidden;
    .sub1{
      width: 100%;
      height: 25px;
      overflow: hidden;
      margin-top: 10px;
    }
    .sub2{
      width: 100%;
      height: 16px;
      font-size: 12px;
      overflow: hidden;
      color: #666;
      margin-top: 5px;
    }
    a{
      text-decoration: none;
      color:#000;
      font-size: 14px;
    }
    .dingyue{
      position: relative;
      top: 32px;
      border:  1px solid #E05E53;
      border-radius: 3px;
      cursor: pointer;
      font-size: 12px;
      height: 20px;
      width: 86px;
      overflow: hidden;
      .left{
        float: left;
        background: #E05E53;
        color: #fff;
        padding: 2px 4px;
        text-align: center;
      }
      .right{
        float: left;
        padding: 2px 4px;
      }
    }
  }
}
</style>
