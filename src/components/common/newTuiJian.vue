<template>
  <div class="container">
    <el-card class="box-card" v-loading="loading">
      <div slot="header" class="clearfix">
        <span>新剧推荐</span>
        <el-button style="float: right; padding: 3px 0" type="text">更多</el-button>
      </div>
      <div  class="wrap">
        <div class="card" v-for="(item,index) in data" :key="index">
          <div class="leftImg">
            <router-link to="#">
              <img :src="data[index].img" alt="data[index].name">              
            </router-link>
          </div>
          <div class="rightCon">
            <router-link to="#" class="name">{{data[index].name}}</router-link>
            <p class="update">更新至{{data[index].update}}</p>
            <div class="dingyue">
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
    axios.get('/api/movie/getMovieByTime').then(function (response) {
        this.data = response.data;
        this.loading = false
        // console.log(this.data);
      }.bind(this))
      .catch(function (error) {
        console.log(error);
    });
  }
}
</script>
<style lang="less" scoped>
  .container{
    width: 250px;
    float: right;
    box-shadow: 0 1px 2px rgba(0,0,0,0.2);
    border-radius: 3px;
    margin-top: 18px;
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
