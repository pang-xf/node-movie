<template>
  <div>
    <Header></Header>
    <div class="banner">
      <Banner></Banner>      
    </div>
    <UserChoose></UserChoose>
    <List title="新剧推荐" state="0"></List>
    <List title="完结剧集" state="1"></List>
    <el-row>
      <el-col :span="14" :offset="5" class="tuijian">
        <p class="title">推荐剧集</p>
        <tjqd />
      </el-col>
    </el-row>
    <Footer/>
  </div>
</template>
<script>
import Header from '@/components/common/header.vue';
import Banner from '@/components/common/banner.vue';
import UserChoose from '@/components/common/userChoose.vue';
import List from '@/components/common/list.vue';
import Footer from '@/components/common/footer.vue';
import tjqd from '@/components/common/tjqd.vue';
export default {
  data(){
    return{
      mdata:''
    }
  },
  components:{
    Header,
    Banner,
    UserChoose,
    List,
    Footer,
    tjqd
  },
}
</script>

<style lang="less">
*{
  margin: 0;
  padding: 0;
}
body{
  background: #f4f4f4;
}
li{
  list-style: none;
}
a{
  text-decoration: none;
}
.el-card__header{
  padding: 10px 20px;
}
.tuijian{
  background: #FFFFFF;
  box-shadow: 0 1px 2px 0 #B0B0B0;
  border-radius: 3px;
  padding: 8px 16px;
  margin-bottom: 20px;
  .title{
    border-bottom: 1px solid #ccc;
    padding-bottom: 5px;
  }
}
.banner{
  margin: 0 auto;
}
</style>

