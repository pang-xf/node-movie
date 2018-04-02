<template>
  <div class="banner" ref="banner">
    <div class="wrap">
      <div class='content'>
        <div class="list">
          <ul>
            <li><a href="#">美剧</a></li>
            <li><a href="#">日剧</a></li>
            <li><a href="#">韩剧</a></li>
            <li><a href="#">动漫</a></li>
            <li><a href="#">国产剧</a></li>
            <li><a href="#">全部</a></li>
          </ul>
        </div>
        <div class="search">
            <el-input
            placeholder="想找什么呢"
            suffix-icon="el-icon-search">
          </el-input>
        </div>
      </div>
    </div>
  </div>
</template>
<script>

export default {
  data(){
    return{

    }
  },
  mounted () {  
    this.init();  
  },  
  methods:{
    init(){
    }
  }
}
</script>

<style lang="less" scoped>
.banner{
  margin-bottom: 25px;
  margin-top: 85px;
  width: 58.3%;
  border-radius: 6px;
  ul{
    width: 100%;
    display: inline-block;
    margin-top: 10px;
    margin-left: 46px;
  }
  li{
    list-style: none;
    float: left;
    width: 14%;
    text-align: center;
  }
  a{
    color: #fff;
    font-size: 16px;
    text-decoration: none;
    transition: all .3s;
    &:hover{
      color: salmon;
    }
  }
  height: 380px;
  background: url(http://neets.cc/assets/img/banner.png);
  background-size: cover;
  .wrap{
    width:100%;
    height: 380px;
    position: relative;
    top: 50%;
    transform: translateY(-50%);
    .content{
      width: 630px;
      height: 100px;
      margin: 0 auto;
      position: relative;
      top: 80%;
      transform: translateY(-50%);
      background: #000;
      opacity: 0.6;
      border-radius: 4px;
      z-index: 1;
      list{
        margin: 0 auto;
      }
      .search{
        width: 90%;
        margin: 10px auto;
      }
    }
  }
}
</style>
