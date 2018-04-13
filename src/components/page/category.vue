<template>
<div class="wrap">
  <Header/>
  <NavMenu 
  @changeMenu = changeMenu
  > 
  </NavMenu>
  <!-- 最新 最热 -->
  <!-- <div class="navBtn">
    <div class="wrap">
      <div class="btn" @click="handlerNavBtn(0)" :class="{active: 0 == active}">最热</div>
      <div class="btn" @click="handlerNavBtn(1)" :class="{active: 1 == active}">最新</div>
    </div>
  </div> -->
  <div class="cardWrap">
    <Card 
     :state = state 
     :data = data 
     @curPaging = curPaging
     :total = total
     :pageSize = pageSize
     v-loading= 'loading'
     >
    </Card>
    <div class="clear"></div>
  </div>
  <Footer />>
</div>
</template>
<script>
import Header from '@/components/common/header.vue';
import Footer from '@/components/common/footer.vue';
import NavMenu from '@/components/common/navMenu.vue';
import Card from '@/components/common/cardCate.vue'
import axios from 'axios'
export default {
  components:{
    Header,
    Footer,
    NavMenu,
    Card,
  },
  data(){
    return{
      active:0,
      data:'',
      curPage:1,
      total:null,
      pageSize:18,
      state: [],
      loading:true
    }
  },
  methods:{
    changeMenu(arr){
      // console.log(arr);
      // 只输入一个条件时 0,1,2,3  4种情况
      if(arr[0]&&!arr[1]&&!arr[2]&&!arr[3]){
        switch(arr[0]){
          case '全部':
            this.getData()
            break;
          case '连载':
            this.getDataByState(1)
            break;
          case '完结':
            this.getDataByState(0)
            break;
        }
      }else if(!arr[0]&&arr[1]&&!arr[2]&&!arr[3]){
        switch(arr[1]){
          case '全部':
            this.getData()
            break;
          case '电视剧':
            this.getDataByClass(arr[1])
            break;
          case '电影':
            this.getDataByClass(arr[1])
            break;
          case '动漫':
            this.getDataByClass(arr[1])
            break;
          case '综艺':
            this.getDataByClass(arr[1])
            break;
        }
      }else if(!arr[0]&&!arr[1]&&arr[2]&&!arr[3]){
        switch(arr[2]){
          case '全部':
            this.getData()
            break;
          case '大陆':
            this.getMovieByCountry(arr[2])
            break;
          case '香港':
            this.getMovieByCountry(arr[2])
            break;
          case '台湾':
            this.getMovieByCountry(arr[2])
            break;
          case '韩国':
            this.getMovieByCountry(arr[2])
            break;
          case '日本':
            this.getMovieByCountry(arr[2])
            break;
          case '美国':
            this.getMovieByCountry(arr[2])
            break;
          case '英国':
            this.getMovieByCountry(arr[2])
            break;
          case '泰国':
            this.getMovieByCountry(arr[2])
            break;
        }
      }else{
        switch(arr[3]){
          case '全部':
            this.getData()
            break;
          case '2018':
            this.getMovieByYear(arr[3])
            break;
          case '2017':
            this.getMovieByYear(arr[3])
            break;
          case '2016':
            this.getMovieByYear(arr[3])
            break;
          case '2015':
            this.getMovieByYear(arr[3])
            break;
          case '2014':
            this.getMovieByYear(arr[3])
            break;
          case '2013':
            this.getMovieByYear(arr[3])
            break;
          case '更早':
            this.getMovieByEarly()
            break;
        }
      }
      // 输入两个条件  0 1,0 2,0 3,1 2,1 3,2 3  6种情况
      if(arr[0]&&arr[1]&&!arr[2]&&!arr[3]){
        // 按状态和类别查找
        let stateArr = {}
        if(arr[0] == '全部'||arr[1] == '全部'){
          this.getData()
          return
        }
        stateArr[0] = arr[0]
        stateArr[1] = arr[1]
        this.getMovieByStateAndType(stateArr)
      }else if(arr[0]&&!arr[1]&&arr[2]&&!arr[3]){
        // 按状态和地区查找
        let stateArr = {}
        if(arr[0] == '全部'||arr[1] == '全部'){
          this.getData()
          return
        }
        stateArr[0] = arr[0]
        stateArr[1] = arr[2]
        this.getMovieByStateAndRegion(stateArr)
      }else if(arr[0]&&!arr[1]&&!arr[2]&&arr[3]){
        // 按状态和年份查找
        let stateArr = {}
        if(arr[0] == '全部'||arr[1] == '全部'){
          this.getData()
          return
        }
        stateArr[0] = arr[0]
        stateArr[1] = arr[3]
        this.getMovieByStateAndYear(stateArr)
      }else if(!arr[0]&&arr[1]&&arr[2]&&!arr[3]){
        // 按类别和地区查找
        let stateArr = {}
        if(arr[0] == '全部'||arr[1] == '全部'){
          this.getData()
          return
        }
        stateArr[0] = arr[1]
        stateArr[1] = arr[2]
        this.getMovieByTypeAndRegion(stateArr)
      }else if(!arr[0]&&arr[1]&&!arr[2]&&arr[3]){
        // 按类别和年代查找
        let stateArr = {}
        if(arr[0] == '全部'||arr[1] == '全部'){
          this.getData()
          return
        }
        stateArr[0] = arr[1]
        stateArr[1] = arr[3]
        this.getMovieByTypeAndYear(stateArr)
      }else if(!arr[0]&&!arr[1]&&arr[2]&&arr[3]){
        // 按地区和年代查找
        let stateArr = {}
        if(arr[0] == '全部'||arr[1] == '全部'){
          this.getData()
          return
        }
        stateArr[0] = arr[2]
        stateArr[1] = arr[3]
        this.getMovieByRegionAndYear(stateArr)
      }
      // 输入三种条件 0 1 2,0 1 3,0 2 3,1 2 3, 4种情况
      if(arr[0]&&arr[1]&&arr[2]&&!arr[3]){
         // 按状态和类别和地区查找
        let stateArr = {}
        if(arr[0] == '全部'||arr[1] == '全部'){
          this.getData()
          return
        }
        stateArr[0] = arr[0]
        stateArr[1] = arr[1]
        stateArr[2] = arr[2]
        this.getMovieByStateAndClassAndYear(stateArr)
      }else if(arr[0]&&!arr[1]&&arr[2]&&arr[3]){
        // 按状态 地区 年代
        let stateArr = {}
        if(arr[0] == '全部'||arr[1] == '全部'){
          this.getData()
          return
        }
        stateArr[0] = arr[0]
        stateArr[1] = arr[2]
        stateArr[2] = arr[3]
        this.getMovieByStateAndRegionAndYear(stateArr)
      }else if(arr[0]&&arr[1]&&!arr[2]&&arr[3]){
        // 按状态 类目 年代
        let stateArr = {}
        if(arr[0] == '全部'||arr[1] == '全部'){
          this.getData()
          return
        }
        stateArr[0] = arr[0]
        stateArr[1] = arr[1]
        stateArr[2] = arr[3]
        this.getMovieByStateAndTypeAndYear(stateArr)
      }else if(!arr[0]&&arr[1]&&arr[2]&&arr[3]){
        // 类目 地区 年代
        let stateArr = {}
        if(arr[0] == '全部'||arr[1] == '全部'){
          this.getData()
          return
        }
        stateArr[0] = arr[1]
        stateArr[1] = arr[2]
        stateArr[2] = arr[3]
        // this.getMovieByTypeAndRegionAndYear(stateArr)
      }
      // 输入四种条件 1 2 3 4  1种
    },
    curPaging(i){
      this.curPage = i
      this.getData()
    },
    handlerNavBtn(i){
      this.active = i
    },
    // 全部
    getData(){
      this.loading = true
      axios.get('/api/getMovieBypage',{
        params:{curPage:this.curPage,pageSize:this.pageSize}
        }).then(function (response) {
          if(response.data.code == 1 ){
            this.data = response.data.data;
            this.total = response.data.length
            this.loading = false
            for(let i = 0;i<18;i++){
              this.state.push(this.data[i].state)
            }
          }else{
            console.log('请求失败');
          }
        }.bind(this))
        .catch(function (error) {
          // console.log(error);
      });
    },
    // 按更新状态
    getDataByState(state){
      this.state.length = 0;
      this.loading = true
      axios.get('/api/movie/getMovieByState',{
      params:{state:state}
      }).then(function (response) {
        this.data = response.data;
        this.total = response.data.length
        this.loading = false
        for(let i = 0;i<this.total;i++){
          this.state.push(this.data[i].state)
        }
      }.bind(this))
      .catch(function (error) {
        console.log(error);
      });
    },
    // 按电视剧分类
    getDataByClass(state){
      this.loading = true
      axios.get('/api/movie/getMovieByClass',{
        params:{class:state}
      }).then(function (response) {
        this.total = response.data.length
        this.data = response.data;
        this.loading = false
      }.bind(this))
      .catch(function (error) {
        console.log(error);
      });
    },
    // 按地区
    getMovieByCountry(state){
      this.loading = true
      axios.get('/api/movie/getMovieByCountry',{
        params:{region:state}
      }).then(function (response) {
        this.total = response.data.length
        this.data = response.data;
        this.loading = false
      }.bind(this))
      .catch(function (error) {
        console.log(error);
      });
    },
    // 按时间
    getMovieByYear(state){
      this.loading = true
      axios.get('/api/movie/getMovieByYear',{
        params:{year:state}
      }).then(function (response) {
        this.total = response.data.length
        this.data = response.data;
        this.loading = false
      }.bind(this))
      .catch(function (error) {
        console.log(error);
      });
    },
    // 按时间更早
    getMovieByEarly(){
      this.loading = true
      axios.get('/api/movie/getMovieByEarly')
      .then(function (response) {
        this.total = response.data.length
        this.data = response.data;
        this.loading = false
      }.bind(this))
      .catch(function (error) {
        console.log(error);
      });
    },
    // 按状态和类别查找
    getMovieByStateAndType(state){
      this.loading = true
      console.log(state);
      let tag = null
      if(state[0]=='连载'){
        tag = 0
      }else{
        tag = 1
      }
      axios.get('/api/movie/getMovieByStateAndType',{
        params:{state:tag,type:state[1]}
      }).then(function (response) {
        this.total = response.data.length
        this.data = response.data;
        this.loading = false
      }.bind(this))
      .catch(function (error) {
        console.log(error);
      });
    },
    // 按状态和地区查找
    getMovieByStateAndRegion(state){
      this.loading = true
      console.log(state);
      let tag = null
      if(state[0]=='连载'){
        tag = 0
      }else{
        tag = 1
      }
      axios.get('/api/movie/getMovieByStateCountry',{
        params:{state:tag,country:state[1]}
      }).then(function (response) {
        this.total = response.data.length
        this.data = response.data;
        this.loading = false
      }.bind(this))
      .catch(function (error) {
        console.log(error);
      });
    },
    // 按状态和年代查找
    getMovieByStateAndYear(state){
      this.loading = true
      console.log(state);
      let tag = null
      if(state[0]=='连载'){
        tag = 0
      }else{
        tag = 1
      }
      axios.get('/api/movie/getMovieByStateAndYear',{
        params:{state:tag,year:state[1]}
      }).then(function (response) {
        this.total = response.data.length
        this.data = response.data;
        console.log(this.data);
        this.loading = false
      }.bind(this))
      .catch(function (error) {
        console.log(error);
      });
    },
    // 按地区和年代查找
    getMovieByRegionAndYear(state){
      this.loading = true
      console.log(state);
      axios.get('/api/movie/getMovieByRegionAndYear',{
        params:{country:state[0],year:state[1]}
      }).then(function (response) {
        this.total = response.data.length
        this.data = response.data;
        console.log(this.data);
        this.loading = false
      }.bind(this))
      .catch(function (error) {
        console.log(error);
      });
    },
    // 按地区和类别查找
    getMovieByTypeAndRegion(state){
      this.loading = true
      console.log(state);
      axios.get('/api/movie/getMovieByTypeAndRegion',{
        params:{type1:state[0],country:state[1]}
      }).then(function (response) {
        this.total = response.data.length
        this.data = response.data;
        console.log(this.data);
        this.loading = false
      }.bind(this))
      .catch(function (error) {
        console.log(error);
      });
    },
    // 按类别和年代
    getMovieByTypeAndYear(state){
      this.loading = true
      console.log(state);
      axios.get('/api/movie/getMovieByTypeAndYear',{
        params:{type:state[0],year:state[1]}
      }).then(function (response) {
        this.total = response.data.length
        this.data = response.data;
        console.log(this.data);
        this.loading = false
      }.bind(this))
      .catch(function (error) {
        console.log(error);
      });
    },
    // 按状态 类别 地区获取
    getMovieByStateAndClassAndCountry(state){
      this.loading = true
      let tag = null
      if(state[0]=='连载'){
        tag = 0
      }else{
        tag = 1
      }
      console.log(state);
      axios.get('/api/movie/getMovieByStateAndClassAndYear',{
        params:{state:tag,type:state[1],country:state[2]}
      }).then(function (response) {
        this.total = response.data.length
        this.data = response.data;
        console.log(this.data);
        this.loading = false
      }.bind(this))
      .catch(function (error) {
        console.log(error);
      });
    },
    // 按状态 地区 年代
    getMovieByStateAndRegionAndYear(state){
      this.loading = true
      let tag = null
      if(state[0]=='连载'){
        tag = 0
      }else{
        tag = 1
      }
      console.log(state);
      axios.get('/api/movie/getMovieByStateAndRegionAndYear',{
        params:{state:tag,country:state[1],year:state[2]}
      }).then(function (response) {
        this.total = response.data.length
        this.data = response.data;
        this.loading = false
      }.bind(this))
      .catch(function (error) {
        console.log(error);
      });
    },
    // 按状态 类目 年代
    getMovieByStateAndTypeAndYear(state){
      
    }
  },
  created(){
    this.getData()
  }
}
</script>
<style lang="less" scoped>
body{
  background: #f4f4f4;
}
.clear{
  clear: both;
}
.navBtn{
  width: 1000px;
  height: 30px;
  line-height: 30px;
  margin: 20px auto 0 auto;
  position: relative;
  .wrap{
    position: absolute;
    right: 0;
  }
  .btn{
    float: left;
    width: 68px;
    background: #fff;
    text-align: center;
    color:#000;
    cursor: pointer;
    box-shadow: 0 1px 2px rgba(0, 0, 0, 0.2);
    border-radius: 3px;
  }
  .active{
    background: #F47368;
    color:#fff;
  }
}
.cardWrap{
  width: 1000px;
  min-height: 500px;
  margin: 0 auto;
  padding: 30px 0 60px 30px;
  position: relative;
  min-height: 500px;
}
</style>
