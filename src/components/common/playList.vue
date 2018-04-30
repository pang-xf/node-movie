<template>
  <div class="container">
    <el-card class="box-card" v-loading="loading">
      <div slot="header" class="clearfix">
        <span>播放列表</span>
        <!-- <el-button style="float: right; padding: 3px 0" type="text">添加</el-button> -->
      </div>
      <div class="wrap">
        <div class="item" v-for="(item,index) in data" :key="index" v-show="data.length>0">
          <div class="left" @click="handleUpdate(index)">
            <a :href="item.url" target="_blank">{{item.playList}}</a>
          </div>
          <!-- <div class="right">未看</div> -->
        </div>
        <div class="noneList" v-show="data.length==0">
          <p>暂无播放列表</p>
          <p>管理员会尽快更新 ^_^</p>
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
    let mid = this.$route.params.id
    axios.get('/api/playList/getPlayListByMid',{
      params:{mid:mid}
    }).then(function(res){
      this.data = res.data;
      this.loading = false
    }.bind(this))
    .catch(function (error) {
        console.log(error);
    });
  },
  methods:{
    async getStateByMid(mid){
      return new Promise((resolve,reject)=>{
        axios.get('/api/movie/getMovieById',{
          params:{
            id:mid,
          }
        }).then(function(res){
          resolve(res.data.data[0].state)
        }.bind(this))
        .catch(function (error) {
            console.log(error);
        });
      })
    },
    async handleSetData(uid,mid,look){
      return new Promise((resolve,reject)=>{
        axios.get('/api/updateUserLooks',{
          params:{
            uid:uid,
            mid:mid,
            look:look
          }
        }).then(function(res){
          resolve(res)
        }.bind(this))
        .catch(function (error) {
            console.log(error);
        });
      })
    },
    async handleUpdate(index){
      // 思路  拿到index 利用index 查询this.data里的mid
      // 拿到mid后请求 userlooks表  把本地的userid和mid 还有点击的是第几个  更新look字段
      let mid = this.data[index].mid;
      let uid = localStorage.getItem('id');
      let state = await this.getStateByMid(mid)
      if(state == 1){
        return        
      }  //不在更新状态的  返回
      let data = await this.handleSetData(uid,mid,index+1)
    }
  }
}
</script>
<style lang="less" scoped>
  .container{
    width: 530px;
    // height: 500px;
    float: left;
    .noneList{
      display: flex;
      justify-content: center;
      align-items: center;
      color: #666;
      font-size: 22px;
      height: 335px;
    }
    .wrap{
      padding: 0 10px;
      min-height: 337px;
      .item{
        height: 39px;
        border-bottom: 1px dashed #bbb;
        display: flex;
        justify-content: space-between;
        align-items: center;
        cursor: pointer;
        transition: all .2s;
        padding: 0px 10px 0 15px;
        a{
          color:#666;
          font-size: 16px;
          &:hover{
          background: rgb(247, 244, 244);
           color:#E05E53;
        }
        }
      }
    }
  }
</style>
