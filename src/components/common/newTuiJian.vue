<template>
  <div class="container">
    <el-card class="box-card" v-loading="loading">
      <div slot="header" class="clearfix">
        <span>新剧推荐</span>
        <el-button style="float: right; padding: 3px 0" type="text" @click="moreMovie">更多</el-button>
      </div>
      <div  class="wrap">
        <div class="card" v-for="(item,index) in data" :key="index">
          <div class="leftImg">
            <router-link :to="{name:'detail',params:{id:data[index].id}}">
              <img :src="data[index].img" alt="data[index].name">              
            </router-link>
          </div>
          <div class="rightCon">
            <router-link :to="{name:'detail',params:{id:data[index].id}}" class="name">{{data[index].name}}</router-link>
            <p class="update">更新至{{data[index].update}}</p>
            <div class="dingyue" @click="collect(data[index].id)">
              <div class="sub1">订阅</div>
              <div class="sub2">{{data[index].dingyue}}</div>
            </div>
          </div>
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
      data:'',
      loading:true
    }
  },
  created(){
  },
  mounted(){
   this.getData()
  },
  methods:{
    moreMovie(){
      this.$router.push({
        path:'/category/all/全部/1'
      })
    },
    getData(){
      axios.get('/api/movie/getMovieByTime').then(function (response) {
        this.data = response.data;
        this.loading = false
      }.bind(this))
      .catch(function (error) {
        console.log(error);
      });
    },
    collect(id){
      let uid = localStorage.getItem('id');
      axios.get('/api/subscribe',{
        params:{
          uid:uid,
          mid:id
        }
      })
      .then(res=>{
        if(res.data.code == 1 ){
          this.getData()
          this.$notify({
            title: 'success',
            message: '订阅成功',
            type: 'success'
          });
        }else{
          this.$notify.error({
            title: 'faild',
            message: res.data.msg,
          });
        }
      })
    },
  }
}
</script>
<style lang="less" scoped>
  .container{
    width: 250px;
    float: right;
    box-shadow: 0 1px 2px rgba(0,0,0,0.2);
    border-radius: 3px;
    a{
      text-decoration: none;
    }
    .el-card{
      border:none;
      font-size: 13px;
      line-height: 21px;
    }
    .wrap{
      width: 100%;
      .card{
        width: 100%;        
        height: 100px;
        margin-bottom: 14px;
        .leftImg{
          width: 75px;
          height: 100%;
          float: left;
          img{
            width: 100%;
            height: 100%;
          }
        }
        .rightCon{
          float: left;
          width: 123px;
          height: 100%;
          margin-left: 10px;
          position: relative;
          .name{
            color:#333;
            &:hover{
              color:#E05E53;
            }
          }
          .update{
            font-size: 12px;
            color: #888;
            margin-top: 3px;
          }
          .dingyue{
            position: absolute;
            bottom: 2px;
            left: 0;
            font-size: 0;
            cursor: pointer;
            overflow: hidden;
            .sub1{
              float: left;
              background: #E05E53;
              height: 100%;
              line-height: 1;
              padding: 5px;
              font-size: 12px;
              color: #fff;
              cursor: pointer;
              border: 1px solid #E05E53;
              border-radius: 2px;
              border-bottom-right-radius: 0;
              border-top-right-radius: 0;
            }
            .sub2{
              display: inline-block;
              height: 100%;
              line-height: 1;
              font-size: 12px;
              padding: 5px 4px;
              color: #E05E53;
              border: 1px solid #E05E53;
              border-radius: 2px;
              border-bottom-left-radius: 0;
              border-top-left-radius: 0;
            }
          }
        }
      }
    }
  }
</style>
