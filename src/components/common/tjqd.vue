<template>
  <div class="tjqd_con">
    <div class="tjqd_item" v-for="(item,index) in  data" :key="index">
      <div class="left">
        <router-link to="#">
          <img :src="item.img" alt="">          
        </router-link>
      </div>
      <div class="right">
        <router-link to="#" class="right_title">{{item.name}}</router-link>
        <span class="count">{{item.count}}个条目</span>
        <div class="collect" @click="collect(item.id)">
          <span class="collect1">收藏</span>
          <span class="collect2">{{item.collect}}</span>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import axios from 'axios'
export default {
  data(){
    return{
      data:''
    }
  },
  mounted(){
    this.tjqd()
  },
  methods:{
    tjqd(){
      axios.get('/api/getTjqd')
      .then(res=>{
        this.data = res.data
      })
    },
    collect(tid){
      let uid = localStorage.getItem('id')
      axios.get('/api/addTjqd',{
        params:{
          uid:uid,
          tid:tid
        }
      })
      .then(res=>{
        if(res.data.code == 1){
          this.tjqd()
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
    }
  }
}
</script>
<style lang="less" scoped>
.tjqd_con{
  width: 94%;
  margin: 0 auto;
  display: flex;
  justify-content:space-between;
  flex-wrap: wrap;
  .tjqd_item{
    width: 32%;
    height: 120px;
    margin-top: 10px;
    border: 1px solid #666;
    .left{
      width: 35%;
      height: 100%;
      overflow: hidden;
      float: left;
      img{
        width: 100%;
        height: 100%;
      }
    }
    .right{
      margin-left: 5%;
      width: 60%;
      height: 100%;
      color: #666;
      position: relative;
      float: left;
      span{
        display: block;
      }
      .right_title{
        font-size: 15px;
        display: block;
        color:#666;
        font-weight: bold;
        transition: all .2s;
        &:hover{
          color:#FF6160;
        }
      }
      .count{
        margin-top: 5px;
      }
      span{
        font-size: 13px;
      }
      .collect{
        position: absolute;
        bottom: 5px;
        cursor: pointer;
        .collect1{
          padding: 4px 6px;
          color:#fff;
          background: #FF6160;
          float: left;
        }
        .collect2{
          padding: 3px 6px;
          border: 1px solid #FF6160;
          color:#FF6160;
          float: left;
        }
      }
    }
  }
}
</style>
