<template>
  <div class="container">
     <el-menu
      default-active="0"
      mode="vertical"
      class="my-menu"
      background-color="#efefef"
      :unique-opened = 'true'
      text-color="#000"
      @select="handleSelect"
      active-text-color="#FF6160">
      <el-menu-item index="0"><i class="el-icon-star-on"></i> 全部</el-menu-item>
      <el-submenu index="1">
        <template slot="title">
          <i class="el-icon-zoom-out"></i>
          <span>状态</span>
        </template>
        <el-menu-item-group>
          <el-menu-item index="1-1">连载</el-menu-item>
          <el-menu-item index="1-2">完结</el-menu-item>
        </el-menu-item-group>
      </el-submenu>
      <el-submenu index="2">
        <template slot="title">
          <i class="el-icon-edit"></i>
          <span>类目</span>
        </template>
        <el-menu-item-group>
          <el-menu-item index="2-1">电视剧</el-menu-item>
          <el-menu-item index="2-2">电影</el-menu-item>
          <el-menu-item index="2-3">动漫</el-menu-item>
          <el-menu-item index="2-4">综艺</el-menu-item>
        </el-menu-item-group>
      </el-submenu>

      <el-submenu index="3">
        <template slot="title">
          <i class="el-icon-setting"></i>
          <span>地区</span>
        </template>
        <el-menu-item-group>
          <el-menu-item index="3-1">大陆</el-menu-item>
          <el-menu-item index="3-2">香港</el-menu-item>
          <el-menu-item index="3-3">台湾</el-menu-item>
          <el-menu-item index="3-4">韩国</el-menu-item>
          <el-menu-item index="3-5">日本</el-menu-item>
          <el-menu-item index="3-6">美国</el-menu-item>
          <el-menu-item index="3-7">英国</el-menu-item>
          <el-menu-item index="3-8">泰国</el-menu-item>
        </el-menu-item-group>
      </el-submenu>

      <el-submenu index="4">
        <template slot="title">
          <i class="el-icon-date"></i>
          <span>年代</span>
        </template>
        <el-menu-item-group>
          <el-menu-item index="4-1">2018</el-menu-item>
          <el-menu-item index="4-2">2017</el-menu-item>
          <el-menu-item index="4-3">2016</el-menu-item>
          <el-menu-item index="4-4">2015</el-menu-item>
          <el-menu-item index="4-5">2014</el-menu-item>
        </el-menu-item-group>
      </el-submenu>
    </el-menu>
  </div>
</template>
<script>
export default {
  methods:{
    handleSelect(key, keyPath) {
      let mainMenu = ''
      switch (key) {
        case '0':
          mainMenu = 'all'
          key = '全部'
          break;
        case '1-1':
          mainMenu = 'state'
          key = '连载'
          break;
        case '1-2':
          mainMenu = 'state'
          key = '完结'
          break;
        case '2-1':
          mainMenu = 'type'
          key = '电视剧'
          break;
        case '2-2':
          mainMenu = 'type'
          key = '电影'
          break;
        case '2-3':
          mainMenu = 'type'
          key = '动漫'
          break;
        case '2-4':
          mainMenu = 'type'
          key = '综艺'
          break;
        case '3-1':
          mainMenu = 'country'
          key = '大陆'
          break;
        case '3-2':
          mainMenu = 'country'
          key = '香港'
          break;
        case '3-3':
          mainMenu = 'country'
          key = '台湾'
          break;
        case '3-4':
          mainMenu = 'country'
          key = '韩国'
          break;
        case '3-5':
          mainMenu = 'country'
          key = '日本'
          break;
        case '3-6':
          mainMenu = 'country'
          key = '美国'
          break;
        case '3-7':
          mainMenu = 'country'
          key = '英国'
          break;
        case '3-8':
          mainMenu = 'country'
          key = '泰国'
          break;
        case '4-1':
          mainMenu = 'time'
          key = '2018'
          break;
        case '4-2':
          mainMenu = 'time'
          key = '2017'
          break;
        case '4-3':
          mainMenu = 'time'
          key = '2016'
          break;
        case '4-4':
          mainMenu = 'time'
          key = '2015'
          break;
        case '4-5':
          mainMenu = 'time'
          key = '2014'
          break;
      }
      this.$router.push({
        name:'cardCate',
        params:{
          mainClass:mainMenu,
          menu:key,
          curPage:1
        }
      })
    }
  },
}
</script>
<style lang="less" scoped>
.container{
  float: left;
  .my-menu{
    width: 150px;
    border:1px solid #ccc;
  }
}
.el-submenu .el-menu-item{
  min-width: 0
}
</style>

