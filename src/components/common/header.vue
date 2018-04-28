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
              <el-menu-item index="/mylist">我的清单</el-menu-item>
              <el-menu-item index="/category" route="/category/全部">分类</el-menu-item>
            </el-menu>
          </el-col>
          <!-- 搜索 -->
          <el-col :span="6">
            <el-input suffix-icon="el-icon-search" placeholder="搜索"></el-input>
          </el-col>
          <!-- 登录框 -->
          <el-col :span="1" v-if="!this.$store.state.login.currentUser.getUserToken()">
            <el-button type="primary" @click="handle">登录</el-button>
          </el-col>
          <el-col :span="1" v-else class="image">
            <a href="#" @click="showUserMenu">
              <img :src="avtar" alt="avtar">
            </a>
            <div class="userMenu" v-show="avtarHover">
              <div class="icon_san"></div>
              <div class="my_btn_li">
                {{user}}
              </div>
              <div class="my_btn_li" @click="layout">
                退出登录
              </div>
            </div>
            <!-- <el-button type="primary" @click="handle">{{user}}</el-button> -->
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
        show: '',
        token:null,
        user:'',
        avtar:'',
        avtarHover:false
      };
    },
    mounted(){
      this.token = this.$store.state.login.currentUser.getUserToken(),
      this.user = this.$store.state.login.currentUser.getUserName()
      this.avtar = this.$store.state.login.currentUser.getUserAvtar()
      if(this.avtar!== null){
        return this.avtar.replace(/http\w{0,1}:\/\/p/g,'https://images.weserv.nl/?url=p');
      }
    },
    computed:{
      ...mapState([
        show=>state.dialog.dialogVisible
      ]),
    },
    methods:{
      ...mapActions(['handle']),
      showUserMenu(){
        this.avtarHover = !this.avtarHover
      },
      // 退出登录
      layout(){
        // 退出登录  然后判断  再刷新页面
        this.$store.dispatch('remove')
        if(this.$store.state.login.currentUser.layout){
          this.$router.go(0)
        }
      },
    },
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
  // overflow: hidden;
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
  .image{
    position: relative;
    img{
      width: 100%;
      height: 100%;
      border-radius: 50%;
      position: relative;
      left: 28px;
      top: 7px;
    }
    .userMenu{
      position: absolute;
      top: 56px;
      left: -35px;
      width: 100px;
      background: #fff;
      font-size: 13px;
      box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
      filter: drop-shadow(0 2px 8px rgba(0, 0, 0, 0.1));
      border: 1px solid #DEDEDE;
      -webkit-filter: drop-shadow(0 2px 8px rgba(0, 0, 0, 0.1));
      border-radius: 2px;
      z-index: 999;
      .icon_san{
        position: absolute;
        top: -17px;
        right: 8px;
        width: 0;
        border-width: 8px;
        border-style: solid;
        border-color: transparent transparent #DEDEDE transparent;
        &::before{
          content: '';
          position: absolute;
          top: -7px;
          left: -8px;
          width: 0;
          border-width: 8px;
          border-style: solid;
          border-color: transparent transparent #fff transparent;
        }
      }
      .my_btn_li{
        text-align: center;
        color: #333;
        width: 100%;
        height: 28px;
        line-height: 28px;
        cursor: pointer;
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
        margin: 5px 0; 
        &:hover{
          background: #efefef;
          color: salmon;
        }
      }
    }
  }
}
</style>

