<template>
  <div class="listContainer">
    <el-row>
      <el-col :span="14" class="header" :offset="5">
        <el-card class="box-card">
          <div class="listContent">
             <span class="title">{{title}}</span>
            <el-tabs v-model="activeName">
              <el-tab-pane label="全部" name="1">
                <Card :state=this.state dataClass = "全部"></Card>
              </el-tab-pane>
              <el-tab-pane label="美剧" name="2">
                <Card :state=this.state dataClass = "美国"></Card>
              </el-tab-pane>
              <el-tab-pane label="韩剧" name="3">
                <Card :state=this.state dataClass = "韩国"></Card>
              </el-tab-pane>
              <el-tab-pane label="日剧" name="4">
                <Card :state=this.state dataClass = "日本"></Card>
              </el-tab-pane>
              <el-tab-pane label="动漫" name="5">动漫</el-tab-pane>
            </el-tabs>
          </div>
        </el-card>
      </el-col>  
    </el-row>
  </div>
</template>
<script>
import Login from '@/components/common/login.vue'
import Card from '@/components/common/card.vue'
export default {
  components:{
    Card
  },
  data(){
    return{
      show:'',
      activeName: '1',
    }
  },
  props:['title','state']
}
</script>

<style lang="less">
.listContainer{
  margin-bottom: 15px;
  .el-card__body{
    padding: 10px 20px;
  }
  .el-tabs__nav{
    float: right;
  }
  .title{
    position: absolute;
    left: 0;
    top: 8px;
  }
}
.listContent{
  text-align: center;
  position: relative;
  .el-button{
    margin-top: 20px;
  }
  .menu{
    // float: right;
    display: inline-block;
    li{
      float: left;
      list-style: none;
      a{
        color: red;
      }
    }
  }
}
</style>

