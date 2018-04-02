<template>
<div class="wrap">
  <Header/>
  <NavMenu/>
  <!-- 最新 最热 -->
  <div class="navBtn">
    <div class="wrap">
      <div class="btn" @click="handlerNavBtn(0)" :class="{active: 0 == active}">最热</div>
      <div class="btn" @click="handlerNavBtn(1)" :class="{active: 1 == active}">最新</div>
    </div>
  </div>
  <div class="cardWrap">
    <Card :state=1 dataClass = "全部"></Card>
  </div>
</div>
</template>
<script>
import Header from '@/components/common/header.vue';
import Footer from '@/components/common/footer.vue';
import NavMenu from '@/components/common/navMenu.vue';
import Card from '@/components/common/card.vue'
export default {
  components:{
    Header,
    Footer,
    NavMenu,
    Card
  },
  data(){
    return{
      active:0
    }
  },
  methods:{
    handlerNavBtn(i){
      this.active = i
    }
  }
}
</script>
<style lang="less" scoped>
body{
  background: #f4f4f4;
}
.navBtn{
  width: 1000px;
  height: 30px;
  line-height: 30px;
  margin: 20px auto;
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
  width: 940px;
  height: 1000px;
  margin: 0 auto;
  padding: 30px 0 0 30px;
  border:1px dashed saddlebrown;
}
</style>
