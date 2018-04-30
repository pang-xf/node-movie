<template>
  <div class="banner" ref="banner">
    <div class="wrap">
      <div class='content'>
        <div class="list">
          <ul>
            <li>
              <router-link to="category/country/美国/1">美剧</router-link>
            </li>
            <li>
              <router-link to="category/country/日本/1">日剧</router-link>
            </li>
            <li>
              <router-link to="category/country/韩国/1">韩剧</router-link>
            </li>
            <li>
              <router-link to="category/type/动漫/1">动漫</router-link>
            </li>
            <li>
              <router-link to="category/country/大陆/1">国产剧</router-link>
            </li>
            <li>
              <router-link to="category/all/全部/1">全部</router-link>
            </li>
          </ul>
        </div>
        <div class="search">
            <el-input
            placeholder="想找什么呢"
            v-model="search"
            >
            <el-button slot="append" icon="el-icon-search" @click="searchData"></el-button>
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
      search:''
    }
  },
  mounted () {  
  },  
  methods:{
    searchData(){
      if(!this.search){
        this.$notify.info({
          title: '提示',
          message: '您还没输入内容哦',
        });
        return
      }
      this.$router.push({
        name:'detail',
        params:{
          id:this.search
        }
      })
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
  background: url(http://oo9xy1zeh.bkt.clouddn.com/wallhaven-603157.png)no-repeat 0 -100px;
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
