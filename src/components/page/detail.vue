<template>
  <div>
    <Header></Header>
    {{id}}
  </div>
</template>
<script>
import Header from '@/components/common/header.vue';
export default {
  components:{
    Header
  },
  data(){
    return{
      id:''
    }
  },
  mounted(){
    this.id = this.$route.params.id
    console.log('this.id:'+this.id);
  }
}
</script>
<style lang="less" scoped>
</style>
