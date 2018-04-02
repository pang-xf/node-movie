<template>
  <div class="container">
    <el-card class="box-card" v-loading="loading">
      <div slot="header" class="clearfix">
        <span>播放列表</span>
        <el-button style="float: right; padding: 3px 0" type="text">添加</el-button>
      </div>
      <div class="wrap">
        <div class="item" v-for="(item,index) in data" :key="index">
          <div class="left">{{item.playList}}</div>
          <div class="right">未看</div>
        </div>
      </div>
    </el-card>
  </div>
</template>
<script>
import axios from 'axios'
export default {
  data(){
    return{
      loading:true,
      data:''
    }
  },
  mounted(){
    axios.get('/api/playList/getPlayListByMid',{
      params:{mid:1}
    }).then(function(res){
      this.data = res.data;
      this.loading = false
    }.bind(this))
    .catch(function (error) {
        console.log(error);
    });
  }
}
</script>
<style lang="less" scoped>
  .container{
    width: 530px;
    height: 500px;
    float: left;
    margin-top: 18px;
    .wrap{
      padding: 0 10px;
      height: 100%;
      .item{
        height: 39px;
        border-bottom: 1px dashed #bbb;
        font-size: 15px;
        display: flex;
        justify-content: space-between;
        align-items: center;
        cursor: pointer;
        transition: all .2s;
        padding: 0px 10px 0 15px;
        &:hover{
          background: rgb(247, 244, 244);
          .left{
            color:#E05E53;
          }
        }
      }
    }
  }
</style>
