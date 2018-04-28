<template>
  <div class="container">
     <el-menu
      default-active="2"
      mode="vertical"
      class="el-menu-vertical-demo"
      background-color="#fff"
      text-color="#666"
      active-text-color="#FF6160">
      <el-menu-item index="1">
        <i class="el-icon-menu"></i>
        <span slot="title">导航一</span>
      </el-menu-item>
      <el-menu-item index="2">
        <i class="el-icon-menu"></i>
        <span slot="title">导航二</span>
      </el-menu-item>
      <el-menu-item index="3">
        <i class="el-icon-setting"></i>
        <span slot="title">导航三</span>
      </el-menu-item>
    </el-menu>
  </div>
</template>
<script>
export default {
  data(){
    return{
      active:0,
      tag:0,
      type:0,
      tagArr:{}
    }
  },
  watch:{
     '$route' (to, from) {
       this.$store.dispatch('setCategory',{
         class:to.params.id
       })
      // 对路由变化作出响应...
        // console.log(to);
      }
  },
  mounted(){
    this.getPath()
    // console.log(this.$route.params);
  },
  methods:{
    getPath(){
      let path = this.$route.params.id; //获得当前路径
      this.setActive(path)
      console.log(path);
    },
    setActive(params){
      // 根据路由动态设置样式
      
    }
  },
}
</script>
<style lang="less" scoped>
.container{
  // width:760px;
  float: left;
}
</style>

