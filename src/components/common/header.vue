<template>
  <div class="wrap">
      <el-row class="con">
        <el-col class="header">
          <!-- logo -->
          <el-col :span="4">
            <div class="logo"><router-link to="/"><img src="https://ws1.sinaimg.cn/large/005N37m4gy1fpgqzelyalj305i01i3yd.jpg" alt="logo"></router-link></div>
          </el-col>
          <!-- 导航条 -->
          <el-col :span="12">
            <el-menu mode="horizontal" 
            text-color="#888" 
            active-text-color="#5AB7AF" 
            class="menu" 
            router
            :default-active="$route.path"
            >
              <el-menu-item index="/">首页</el-menu-item>
              <el-menu-item index="2">我的清单</el-menu-item>
              <el-menu-item index="/category" route="/category">分类</el-menu-item>
            </el-menu>
          </el-col>
          <!-- 搜索 -->
          <el-col :span="6">
            <el-input suffix-icon="el-icon-search" placeholder="搜索"></el-input>
          </el-col>
          <!-- 登录框 -->
          <el-col :span="1">
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
        show: ''
      };
    },
    computed:{
      ...mapState([
        show=>state.dialog.dialogVisible
      ]),
    },
    methods:{
      ...mapActions(['handle']),
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
  width: 100%;
  box-shadow: 0 2px 6px rgba(0,0,0,0.1);
  overflow: hidden;
  margin: 0 auto;
}
.con{
  width: 1000px;
  margin: 0 auto;
}
.menu{
  position: relative;
  left: 11.3px;
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
      position: relative;
      top: 4px;
      left: -6px;
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
    left: 14px;
  }
}
</style>

