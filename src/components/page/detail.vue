<template>
  <div>
    <Header></Header>
    <div class="content">
      <div class="leftMenu">
          <ul>
            <li>
              <router-link to="#">
                <div class="icon"></div>
                <span>我的订阅</span>
              </router-link>
            </li>
            <li>
              <router-link to="#">
                <div class="icon"></div>
                <span>已看完</span>
              </router-link>
            </li>
          </ul>
      </div>
      <div class="rightWrap" v-for="(item,index) in film" :key="index">
        <!-- header -->
        <div class="header">
          <div class="top">
            <div class="topWrap">
              <p class="title">{{item.name}} <span>{{item.rate}}</span></p>
              <p class="subTitle">{{item.alias}}</p>
            </div>
          </div>
          <div class="bottom">
            <div class="bottomWrap">
              <div class="row">
                <div class="detail">类目：{{item.type}}</div>
                <div class="detail">类型：{{item.category}}</div>
                <div class="detail">地区：{{item.country}}</div>
                <div class="detail">时间：{{item.time}}</div>
              </div>
              <div class="row"><span class="blue" v-if="item.update"> 更新至{{item.update}}  / </span>共{{item.all}}集</div>
              <div class="row1">
                <div class="dingyue">
                  <div class="left">订阅</div>
                  <div class="rightNum">{{item.dingyue}}</div>
                </div>
                <div class="addTo">收藏至清单</div>
              </div>
            </div>
          </div>
          <div class="img">
            <div class="wrap">
              <img :src=item.img alt="">
            </div>
          </div>
        </div>
        <!-- 剧情简介 -->
        <FilmsIntro :filmDetail="item.profile"></FilmsIntro>
        <!-- 最新推荐 -->
        <NewTuiJian/>
        <!-- 播放列表 -->
        <PlayList/>
        <!-- 右下角广告 -->
        <div class="ad">
           <el-card>
            <img src="http://neets.cc/assets/img/ervm2.png" alt="">      
          </el-card>
        </div>
        <div class="footer">
          <Footer/>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import {mapActions,mapGetters} from 'vuex';
import Header from '@/components/common/header.vue';
import FilmsIntro from '@/components/common/filmsIntro.vue';
import NewTuiJian from '@/components/common/newTuiJian.vue';
import PlayList from '@/components/common/playList.vue';
import Footer from '@/components/common/footer.vue';
export default {
  components:{
    Header,
    FilmsIntro,
    NewTuiJian,
    PlayList,
    Footer
  },
  data(){
    return{
      country:''
    }
  },
  methods:{
    getData(){
      this.$store.dispatch('getFilmDetail',{id:this.$route.params.id})
    }
  },
  computed:{
    ...mapGetters(['film'])
  },
  mounted(){
    this.getData();
    window.scrollTo(0, 0)
  }
}
</script>
<style lang="less" scoped>
.clear{
  clear: both;
}
.ad{
  width: 250px;
  background: #fff;
  border-radius: 3px;
  margin-top: 15px;
  box-shadow: 0 1px 2px rgba(0,0,0,0.2);
  float: right;
}
.content{
  width: 1000px;
  height: 1200px;
  margin: 0 auto;
  margin-top: 80px;
}
.leftMenu{
  position: fixed;
  width: 166px;
  height: 509px;
  top: 80px;
  padding: 14px 0 0 14px;
  ul{
    padding: 0;
  }
  li{
    height: 30px;
    line-height: 30px;
    list-style: none;
    a{
      color:#888;
      text-decoration: none;
      &:hover{
        color: rgb(173, 37, 37);
      }
    }
  }
}
.rightWrap{
  height: 100%;
  width: 800px;
  float: right;
  .header{
    width: 100%;
    border-radius: 3px;
    position: relative;
    box-shadow: 0 1px 2px rgba(0,0,0,0.2);
    height: 327px;
    margin-bottom: 17px;
    .top{
      width: 100%;
      height: 154px;
      background: url(http://neets.cc/assets/img/tiaomu.png) center center;
      position: relative;
      .topWrap{
        box-sizing:border-box;
        min-height: 135px;
        padding-top: 80px;
        padding-bottom: 14px;
        float: right;
        width: 570px;
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
        text-shadow: 0px 2px 10px rgba(0,0,0,0.8);     
        color: #fff;           
        line-height: 30px;
        p{
          margin: 0;
          padding: 0;
        }
        .title{
          font-size: 24px;
          span{
            color: #F19D3C;
          }
        }
        .subTitle{
          font-size: 18px;
        }
      }
    }
    .img{
      top: 60px;
      left: 30px;
      width: 168px;
      height: 224px;
      padding: 3px;
      background: #fff;
      box-shadow: 0 1px 2px rgba(0,0,0,0.2);
      position: absolute;
      .wrap{
        width: 100%;
        height: 100%;
        overflow: hidden;
        position: relative;
      }
      img{
        width: auto;
        min-width: 100%;
        height: 100%;
        border-radius: 3px;
        position: absolute;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
      }
    }
    .bottom{
      height: 173px;
      width: 100%;
      background: #fff;
      position: relative;
      .bottomWrap{
        min-height: 173px;
        box-sizing:border-box;        
        padding-top: 12px;
        float: right;
        width: 410px;
        margin-right: 160px;
        // text-shadow: 0px 2px 10px rgba(0,0,0,0.8);     
        color: #fff;           
        line-height: 30px;
        .row{
          font-size: 13px;
          line-height: 22px;
          color: #333;
          width: 410px;
          .blue{
            color:#3F7583;
          }
          .detail{
            width: 200px;
            overflow: hidden;
            text-overflow: ellipsis;
            white-space: nowrap;
            display: inline-block;
          }
        }
        .row1{
          width: 100%;
          height: 30px;
          margin-top: 14px;
          color:#000;
          .dingyue{
            // width: 131.5px;
            height: 100%;
            cursor: pointer;
            float: left;
            border: 1px solid #E05E53;
            .left{
              float: left;
              background: #E05E53;
              height: 100%;
              font-size: 16px;
              color: #fff;
              border-radius: 2px;
              border-bottom-right-radius: 0;
              border-top-right-radius: 0;
              text-align: center;
              width: 70px;
            }
            .rightNum{
              float: left;
              height: 100%;
              padding: 2px 5px;
              color:#E05E53;
            }
          }
          .addTo{
            display: inline-block;
            font-size: 14px;
            color: #3F7CC1;
            margin-left: 10px;
            cursor: pointer;
            position: relative;
            top: 6px;
          }
        }
      }
    }
  }
}
.footer{
  float: left;
}
</style>
