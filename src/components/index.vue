<template>
  <div>
    <Header></Header>
    <Banner></Banner>
    <UserChoose></UserChoose>
    <List title="新剧推荐" state="0"></List>
    <List title="完结剧集" state="1"></List>
    <el-row>
      <el-col :span="14" :offset="5" class="tuijian">
        推荐剧集
      </el-col>
    </el-row>
  </div>
</template>
<script>
import axios from 'axios'
import Header from '@/components/common/header.vue';
import Banner from '@/components/common/banner.vue';
import UserChoose from '@/components/common/userChoose.vue';
import List from '@/components/common/list.vue';
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
    List
  },
  created(){
    axios.get('/api/movie/getMovieAll')
      .then(function (response) {
        this.mdata = response.data[0].name;
    }.bind(this))
    .catch(function (error) {
      console.log(error);
    });
  }
}
</script>

<style lang="less">
*{
  margin: 0;
  padding: 0;
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
}
</style>

