<template>
<div class="wrap">
  <div class="card" v-for="(value,index) in data" :key="index" v-show="data.length!=0">
    <div class="subImg">
      <router-link :to="{name:'detail',params:{id:data[index].id}}" ><img :src=data[index].img alt="图片"></router-link>
    </div>
    <div class="subText">
      <p class="sub1"><router-link to="/">{{data[index].name}}</router-link></p>
      <p class="sub2" v-show="state[index] == 0">更新至{{data[index].update}}</p>
      <p class="sub2" v-show="state[index] == 1">共{{data[index].all}}集</p>
      <div class="dingyue">
        <div class="left">订阅</div>
        <div class="right">{{data[index].dingyue}}</div>
      </div>
    </div>
  </div>
  <div class="none" v-show="data.length==0">
    暂无数据
  </div>
  <div class="paging" v-show="data.length>0">
    <pagination 
      :page-index = curPage   
      :total = total    
      :page-size = pageSize  
      @change ="pageChange"
    ></pagination>
  </div>
</div>
</template>
<script>
import axios from 'axios'
import pagination from '@/components/common/paging.vue'
export default {
  props:['state','data','total','pageSize'],
  components:{
    pagination    
  },
  data(){
    return{
      curPage:1,
    }
  },
  mounted(){
    global.islogin = true;
    // console.log(this.state);
  },
  methods:{
    pageChange(i){
      this.curPage = i
      this.$emit('curPaging',this.curPage);
    },
  },
}
</script>
<style lang="less" scoped>
.paging{
  height: 50px;
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  // top: 0;
}
.card{
  overflow: hidden;
  width: 32%;
  height: 138px;
  float: left;
  margin-right: 10px;
  margin-bottom: 20px;
  background: #fff;
  box-shadow: 0 1px 2px rgba(0, 0, 0, 0.2);
  border-radius: 3px;
  .subImg{
    width:35%;
    height: 100%;
    float: left;
    img{
      width: 100%;
      height: 100%;
    }
  }
  .subText{
    float: left;
    width: 55%;
    height: 100%;
    text-align: left;
    padding-left: 10px;
    overflow: hidden;
    .sub1{
      width: 100%;
      height: 25px;
      overflow: hidden;
      margin-top: 10px;
      border-bottom: 1px dashed #999;
      a{
        transition: all .2s;
        &:hover{
          color:#E05E53;
        }
      }
    }
    .sub2{
      width: 100%;
      height: 16px;
      font-size: 12px;
      overflow: hidden;
      color: #666;
      margin-top: 8px;
    }
    a{
      text-decoration: none;
      color:#000;
      font-size: 14px;
    }
    .dingyue{
      position: relative;
      top: 42px;
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
.none{
  height: 300px;
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  color:#ccc;
  font-size: 42px;
  font-weight: bolder;
  letter-spacing: 10px;
}
</style>
