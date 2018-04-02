<template>
  <div class="container">
    <div class="line">
      <span>状态</span>
      <div class="menu">
        <router-link to="#">全部</router-link>
        <router-link to="#">连载</router-link>
        <router-link to="#">完结</router-link>
        <router-link to="#">未开播</router-link>
      </div>
    </div>
    <div class="line">
      <span>类目</span>
      <div class="menu">
        <router-link to="#">全部</router-link>
        <router-link to="#">电视剧</router-link>
        <router-link to="#">电影</router-link>
        <router-link to="#">动漫</router-link>
        <router-link to="#">综艺</router-link>
      </div>
    </div>
     <div class="line">
      <span>地区</span>
      <div class="menu">
        <router-link to="#">全部</router-link>
        <router-link to="#">大陆</router-link>
        <router-link to="#">香港</router-link>
        <router-link to="#">台湾</router-link>
        <router-link to="#">韩国</router-link>
        <router-link to="#">日本</router-link>
        <router-link to="#">美国</router-link>
        <router-link to="#">英国</router-link>
        <router-link to="#">泰国</router-link>
      </div>
    </div>
    <div class="line">
      <span>年代</span>
      <div class="menu">
        <router-link to="#">全部</router-link>
        <router-link to="#">2018</router-link>
        <router-link to="#">2017</router-link>
        <router-link to="#">2016</router-link>
        <router-link to="#">2015-2011</router-link>
        <router-link to="#">90年代</router-link>
        <router-link to="#">更早</router-link>
      </div>
    </div>
    <div class="line">
      <span>时间表</span>
      <div class="menu">
        <router-link to="#">全部</router-link>
        <router-link to="#">周一</router-link>
        <router-link to="#">周二</router-link>
        <router-link to="#">周三</router-link>
        <router-link to="#">周四</router-link>
        <router-link to="#">周五</router-link>
        <router-link to="#">周六</router-link>
        <router-link to="#">周日</router-link>
      </div>
    </div>
  </div>
</template>
<script>
export default {
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
      a{
        text-decoration: none;
        display: inline-block;
        color:#888;
        width: 90px;
        font-size: 14px;
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

