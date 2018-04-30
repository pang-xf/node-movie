<template>
<div class="wrap">
  <div class="card" v-for="(value,index) in data" :key="index">
    <div class="subImg">
      <router-link :to="{name:'detail',params:{id:data[index].id}}" ><img :src=data[index].img alt="图片"></router-link>
    </div>
    <div class="subText">
      <p class="sub1" @click.prevent="handlrRouter(data[index].id,data[index].id)">{{data[index].name}}
      </p>
      <p class="sub2" v-if="state==0">更新至{{data[index].update}}</p>
      <p class="sub2" v-if="state==1">完结</p>
      <div class="dingyue" @click="collect(data[index].id)">
        <div class="left">订阅</div>
        <div class="right">{{data[index].dingyue}}</div>
      </div>
    </div>
  </div>
  <div class="moreData" v-show="dataLength>7">
    <router-link to="/category/all/全部/1">查看更多</router-link>
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
      dataLength:0
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
          this.dataLength = response.data.length;
          this.data = response.data.slice(0,7); //拿到数据 显示7个  多得显示更多按钮
        }.bind(this))
        .catch(function (error) {
          console.log(error);
        });
      }else{
        axios.get('/api/movie/getMovieByStateCountry',{
          params:{state:this.state,country:this.dataClass}
        }).then(function (response) {
          this.dataLength = response.data.dataLength;
          this.data = response.data;
        }.bind(this))
        .catch(function (error) {
          console.log(error);
        });
      }
    },
    handlrRouter(id,mid){
      let uid = localStorage.getItem('id')
      if(!uid){
        this.$router.push({ name: 'detail', params: { id:id }})
        return  //如果未登录  就跳链接  返回
      }
      // 登录  加感兴趣+1 并跳链接
      axios.get('/api/likeCount',{
        params:{
          uid:uid,
          mid:mid
        }
      }).then(res=>{
        if(res.data.code == 1){
          this.$router.push({ name: 'detail', params: { id:id }})
        }
      })
    }
  },
  created(){
    this.getData()
  }
}
</script>
<style lang="less" scoped>
.card{
  overflow: hidden;
  width: 23%;
  height: 120px;
  float: left;
  margin-right: 10px;
  margin-bottom: 10px;
  background: #fff;
  border:1px solid #ccc;
  position: relative;
  .subImg{
    width:34%;
    height: 100%;
    float: left;
    overflow: hidden;
    img{
      width: 100%;
      height: 100%;
      transition: all .3s;
       &:hover{
        transform: scale(1.12)
      }
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
      text-decoration: none;
      color:#000;
      font-size: 16px;
      transition: all .2s;
      cursor: pointer;
      &:hover {
        color: salmon;
      }
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
.moreData{
    position: absolute;
    right: 4.2%;
    bottom: 9px;
    width: 23%;
    height: 120px;
    border: 1px dashed #ccc;
    display: flex;
    background: #fff;
    justify-content: center;
    align-items: center;
    a{
      transition: all .2s;
      letter-spacing: 3px;
      color: #666;
      font-weight: bold;
      &:hover{
        color:salmon;
      }
    }
  }
</style>
