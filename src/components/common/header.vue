<template>
  <div class="wrap">
      <el-row>
        <el-col :span="14" class="header" :offset="5">
          <!-- logo -->
          <el-col :span="7">
            <div class="logo"><router-link to="/"><img src="https://ws1.sinaimg.cn/large/005N37m4gy1fpgqzelyalj305i01i3yd.jpg" alt="logo"></router-link></div>
          </el-col>
          <!-- 导航条 -->
          <el-col :span="10">
            <el-menu mode="horizontal" :default-active="activeIndex" text-color="#888" active-text-color="#5AB7AF">
              <el-menu-item index="1">首页</el-menu-item>
              <el-menu-item index="2">我的清单</el-menu-item>
              <el-menu-item index="3">分类</el-menu-item>
            </el-menu>
          </el-col>
          <!-- 搜索 -->
          <el-col :span="4">
            <el-input suffix-icon="el-icon-search" placeholder="搜索"></el-input>
          </el-col>
          <!-- 登录框 -->
          <el-col :span="3">
            <el-button type="primary" @click="handle">登录</el-button>
          </el-col>
        </el-col>
      </el-row>
      <Login :dialogVisible="show"></Login>
  </div>    
</template>
<script>
import Login from '@/components/common/login.vue'
import {mapState,mapActions} from 'vuex';
export default { 
    components:{
      Login
    },
    data() {
      return {
        activeIndex: '1',
        show: ''
      };
    },
    computed:{
      ...mapState([
        show=>state.dialog.dialogVisible
      ]),
    },
    methods:{
      ...mapActions(['handle'])
    }
}
</script>

<style lang="less" scoped>
.wrap{
  position: fixed;
  top:0;
  left: 0;
  background: #fff;
  z-index: 999;
  height: 56px;
  margin: 0 auto;
  width: 100%;
  box-shadow: 0 2px 6px rgba(0,0,0,0.1);
  overflow: hidden;
}
.header{
  height: 100%;
  .logo{
    a{
      text-decoration: none;
      display: inline-block;
    }
    img{
      height: 100%;
      width: 100%;
    }
  }
  .el-row{
    margin: 0 auto;
  }
  .el-menu{
    height: 56px;
    .el-menu-item{
      font-size: 18px;
    }
  }
  .el-input{
    line-height: 56px;
  }
  .el-button{
    // line-height: 56px;
    position: relative;
    top: 8px;
    left: 10px;
  }
}
</style>

