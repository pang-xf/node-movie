<template>
  <div class="container">
    <el-row>
      <el-col :span="14" class="header" :offset="5">
        <el-card class="box-card">
          <div slot="header" class="clearfix">
            <span>我的订阅</span>
            <el-button style="float: right; padding: 3px 0" type="text" icon="el-icon-arrow-right">查看全部</el-button>
          </div>
          <div  class="content">
            <p>当你订阅的剧集更新时，你会在此看到它。</p>
            <el-button type="primary" @click="handle">登录</el-button>
          </div>
        </el-card>
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
  data(){
    return{
      show:''
    }
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
.container{
  margin-bottom: 15px;
}
.content{
  text-align: center;
  .el-button{
    margin-top: 20px;
  }
}
</style>

