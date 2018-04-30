<template>
<div class="wrap">
  <Header/>
  <div class="content">
    <NavMenu
    @changeMenu = changeMenu
    >
    </NavMenu>
    <router-view></router-view>
  </div>

  <div class="footer">
    <Footer />
  </div>
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
      pageSize:15,
      state: [],
      loading:true
    }
  },
  methods:{
    changeMenu(){
      console.log('123');
    }
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
.content{
  width: 980px;
  // height:700px;
  margin: 90px auto auto auto;
}
.footer{
  height: 200px;
  width: 100%;
  position: relative;
  bottom: 0;
  display: flex;
  align-items: center;
  justify-content: center;
}
</style>
