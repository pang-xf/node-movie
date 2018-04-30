<template>
<div class="wrap">
  <div class="card" v-for="(value,index) in fetchMenuData.data" :key="index" v-show="fetchMenuData.data.length!=0">
    <div class="subImg">
      <router-link :to="{name:'detail',params:{id:value.id}}" ><img :src=value.img alt="图片"></router-link>
    </div>
    <div class="subText">
      <p class="sub1"><router-link :to="{name:'detail',params:{id:value.id}}">{{value.name}}</router-link></p>
      <p class="sub2" v-show="value.state == 0">更新至{{value.update}}</p>
      <p class="sub2" v-show="value.state == 1">共{{value.all}}集</p>
      <div class="dingyue" @click="collect(value.id)">
        <div class="left">订阅</div>
        <div class="right">{{value.dingyue}}</div>
      </div>
    </div>
  </div>
  <div class="none" v-show="fetchMenuData.data.length==0">
    暂无数据
  </div>
  <div class="paging" v-if="fetchMenuData.data.length!=0">
    <el-pagination
      background
      layout="prev, pager, next"
      :page-size  = count
      :current-page = curPage
      @current-change = changePage
      :total= total>
    </el-pagination>
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
      count:12,
      curPage:1,
      total:null,
      menu:'全部',
      mainClass:'all'
    }
  },
  mounted(){
    global.islogin = true;
    this.curPage = +this.$route.params.curPage
    this.mainClass = this.$route.params.mainClass
    this.menu = this.$route.params.menu
    this.getData(this.mainClass,this.menu,this.curPage) //进来先那个了
  },
  computed:{
    ...mapGetters(['fetchMenuData'])
  },
  watch:{
    '$route' (to, from) {
      // 对路由变化作出响应...  重新获取数据
        this.curPage = to.params.curPage
        this.mainClass = to.params.mainClass
        this.menu = to.params.menu
        this.getData(this.mainClass,this.menu,this.curPage)
      },
      fetchMenuData(val){
        this.total = this.fetchMenuData.length
      }
  },
  methods:{
    // 两个参数  第一个是菜单得总分类(状态，类目，地区，年代) 第二个是当前页
    // 默认为总的  全部  默认当前页为1
    getData(mainClass='all',menu='全部',curpage=1){
      if(menu == '全部'&&mainClass=='all'){
        this.$store.dispatch('getDataByMenuAll',{
          count:this.count,
          curPage:curpage
        })
      }else{
        this.$store.dispatch('getDataByCondition',{
          count:this.count,
          curPage:curpage,
          mainClass:mainClass,
          menu:menu
        })
      }
    },
    changePage(val){
      // 翻页
       this.getData(this.mainClass,this.menu,val)
    },
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
  },
}
</script>
<style lang="less" scoped>
  .wrap{
    width: 800px;
    min-height: 450px;
    margin: 0 auto;
    float: right;
    position: relative;
    background: #fff;
    padding: 20px 10px 80px 10px;
    border-radius: 8px;
  }
  .card{
    overflow: hidden;
    width: 32.082%;
    height: 138px;
    float: left;
    margin-left: 10px;
    margin-bottom: 20px;
    background: #fff;
    box-shadow: 0 1px 2px rgba(0, 0, 0, 0.2);
    border-radius: 3px;
    transition: all .2s;    
    &:hover{
      transform: scale(1.02);
      box-shadow: 0  10px 10px  rgba(0,0,0,0.5)
    }
    .subImg{
      width:35%;
      height: 100%;
      float: left;
      overflow: hidden;
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
  .paging{
    position: absolute;
    bottom: 10px;
    display: flex;
    justify-content: center;
    align-items: center;
    width: 800px;
  }
  .el-pagination.is-background .el-pager li.active{
    border-radius: 50% !important;
  }
</style>
