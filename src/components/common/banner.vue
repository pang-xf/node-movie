<template>
  <el-row>
    <el-col :span="24">
      <div class="banner" ref="banner">
        <div class="wrap">
          <div class='content'>
            <div class="title">OvO追剧管家,你的私人追剧管家</div>
            <div>
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
    </el-col>
  </el-row>
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
  margin-top: 65px;
  ul{
    width: 100%;
    display: inline-block;
    margin-top: 35px;
  }
  li{
    list-style: none;
    float: left;
    width: 16%;
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
  height: 265px;
  background: url(https://ws1.sinaimg.cn/large/005N37m4gy1fpb3jt6260j31hc0bz0y6.jpg);
  .wrap{
    width:100%;
    height: 212px;
    position: relative;
    top: 50%;
    transform: translateY(-50%);
    .content{
      width: 443px;
      height: 159px;
      margin: 0 auto;
      position: relative;
      top: 50%;
      transform: translateY(-50%);
      .title{
        color: #fff;
        font-size: 28px;
        text-align: center;
      }
      .search{
        margin-top: 20px;
      }
    }
  }
}
</style>
