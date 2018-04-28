<template>
<div class="wrap">
  <div class="card" v-for="(value,index) in fetchMenuData" :key="index" v-show="fetchMenuData.length!=0">
    <div class="subImg">
      <router-link :to="{name:'detail',params:{id:value.id}}" ><img :src=value.img alt="图片"></router-link>
    </div>
    <div class="subText">
      <p class="sub1"><router-link to="/">{{value.name}}</router-link></p>
      <p class="sub2" v-show="value.state == 0">更新至{{value.update}}</p>
      <p class="sub2" v-show="value.state == 1">共{{value.all}}集</p>
      <div class="dingyue">
        <div class="left">订阅</div>
        <div class="right">{{value.dingyue}}</div>
      </div>
    </div>
  </div>
  <div class="none" v-show="fetchMenuData.length==0">
    暂无数据
  </div>
</div>
</template>
<script>
import axios from 'axios'
import { mapGetters } from 'vuex'
export default {
  data(){
    return{
      data:'',
      count:12
    }
  },
  mounted(){
    global.islogin = true;
    this.getData()
  },
  computed:{
    ...mapGetters(['currentCategory']),
    ...mapGetters(['fetchMenuData'])
  },
  watch:{
    '$route' (to, from) {
      // 对路由变化作出响应...  重新获取数据
        console.log(to.params.id);
      }
  },
  methods:{
    // 两个参数  第一个是菜单得总分类(状态，类目，地区，年代) 第二个是总分类下得子类
    // 默认为总的  全部
    getData(state,query){
      if(this.$route.params.id == '全部'){
        this.$store.dispatch('getDataByMenuAll',{
          count:this.count,
          curPage:1
        })
        return
      }
      //  console.log(this.$route.params.id);
      // console.log(state);
      // if(!state&&!query){
      //   axios.get('/api/movie/getMovieAll')
      //   .then(res=>{
      //     this.data = res.data
      //     console.log(this.data);
      //   })
      //   .catch(err=>{
      //     console.log(err);
      //   })
      // }else if(!query){
      //   axios.get('')
      //   .then(res=>{

      //   })
      //   .catch(err=>{
      //     console.log(err);
      //   })
      // }
    }
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
.wrap{
  width: 800px;
  min-height: 650px;
  border:1px solid #000;
  margin: 20px auto;
  float: right;
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
