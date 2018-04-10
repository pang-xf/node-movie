<template>
  <div class="container">
    <div class="line">
      <span>状态</span>
      <div class="menu">
        <div class="menuLink">全部</div>
        <div class="menuLink" @click="changeData(0)">连载</div>
        <div class="menuLink" @click="changeData(1)">完结</div>
      </div>
    </div>
    <div class="line">
      <span>类目</span>
      <div class="menu">
        <div class="menuLink">全部</div>
        <div class="menuLink">电视剧</div>
        <div class="menuLink">电影</div>
        <div class="menuLink">动漫</div>
        <div class="menuLink">综艺</div>
      </div>
    </div>
     <div class="line">
      <span>地区</span>
      <div class="menu">
        <div class="menuLink">全部</div>
        <div class="menuLink">大陆</div>
        <div class="menuLink">香港</div>
        <div class="menuLink">台湾</div>
        <div class="menuLink">韩国</div>
        <div class="menuLink">日本</div>
        <div class="menuLink">美国</div>
        <div class="menuLink">英国</div>
        <div class="menuLink">泰国</div>
      </div>
    </div>
    <div class="line">
      <span>年代</span>
      <div class="menu">
        <div class="menuLink">全部</div>
        <div class="menuLink">2018</div>
        <div class="menuLink">2017</div>
        <div class="menuLink">2016</div>
        <div class="menuLink">2015-2011</div>
        <div class="menuLink">90年代</div>
        <div class="menuLink">更早</div>
      </div>
    </div>
    <div class="line">
      <span>时间表</span>
      <div class="menu">
        <div class="menuLink">全部</div>
        <div class="menuLink">周一</div>
        <div class="menuLink">周二</div>
        <div class="menuLink">周三</div>
        <div class="menuLink">周四</div>
        <div class="menuLink">周五</div>
        <div class="menuLink">周六</div>
        <div class="menuLink">周日</div>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  data(){
    return{
      state:null
    }
  },
  methods:{
    changeData(i){
      this.state = i;
      this.$emit('changeMenu',this.state)
    }
  },
}
</script>
<style lang="less" scoped>
.container{
  width:960px;
  height: 225px;
  padding: 17px 30px 5px 30px;
  margin: 90px auto auto auto;
  background: #fff;
  box-shadow: 0 1px 2px rgba(0, 0, 0, 0.2);
  border-radius: 3px;
  .line{
    height: 35px;
    line-height: 35px;
    width: 100%;
    margin-bottom: 8px;
    span{
      display: inline-block;
      width: 10%;
      float: left;
      position: relative;
      top: 1px;
      color:#888;
      font-size: 14px;
    }
    .menu{
      width: 90%;
      border-bottom: 1px dashed #DEDEDE;
      float: left;
      .menuLink{
        color:#888;
        width: 90px;
        font-size: 14px;
        float: left;
        cursor: pointer;
        &:hover{
          color:#FF6160;
        }
        &:first-child{
          color:#FF6160
        }
      }
    }
  }
}
</style>

