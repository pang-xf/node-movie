<template>
  <div class="container">
    <div class="line">
      <span>状态</span>
      <div class="menu">
        <div class="menuLink" v-for="(line1,line1_index) in line1" :class="{active: line1_index == active1}">
          <div @click="changeDataLine1(line1.name,line1_index)">
            {{line1.name}}
          </div>
        </div>
        <!-- <div class="menuLink" v-for="(line1,line1_index) in line1" :class="{active: line1_index == active}">
          <div @click="changeData(line1_index)">
            {{line1.name}}
          </div>
        </div> -->
      </div>
    </div>
    <div class="line">
      <span>类目</span>
      <div class="menu">
        <div class="menuLink" v-for="(line2,line2_index) in line2" :class="{active: line2_index == active2}">
          <div @click="changeDataLine2(line2.name,line2_index)">
            {{line2.name}}
          </div>
        </div>
      </div>
    </div>
     <div class="line">
      <span>地区</span>
      <div class="menu">
        <div class="menuLink" v-for="(line3,line3_index) in line3" :class="{active: line3_index == active3}">
          <div @click="changeDataLine3(line3.name,line3_index)">
            {{line3.name}}
          </div>
        </div>
      </div>
    </div>
    <div class="line">
      <span>年代</span>
      <div class="menu">
        <div class="menuLink" v-for="(line4,line4_index) in line4" :class="{active: line4_index == active4}">
          <div @click="changeDataLine4(line4.name,line4_index)">
            {{line4.name}}
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  data(){
    return{
      active1:0,
      active2:0,
      active3:0,
      active4:0,
      line1:[
        {
          name:'全部'
        },
        {
          name:'连载'
        },
        {
          name:'完结'
        }
      ],
      line2:[
        {
          name:'全部'
        },
        {
          name:'电视剧'
        },
        {
          name:'电影'
        },
        {
          name:'动漫'
        },
        {
          name: '综艺'
        }
      ],
      line3:[
        {
          name:'全部'
        },
        {
          name:'大陆'
        },
        {
          name:'香港'
        },
        {
          name:'台湾'
        },
        {
          name: '韩国'
        },
        {
          name: '日本'
        },
        {
          name: '美国'
        },
        {
          name: '英国'
        },
        {
          name: '泰国'
        }
      ],
      line4:[
        {
          name:'全部'
        },
        {
          name:'2018'
        },
        {
          name:'2017'
        },
        {
          name:'2016'
        },
        {
          name: '2015'
        },
        {
          name: '2014'
        },
        {
          name: '2013'
        },
        {
          name: '更早'
        }
      ],
      tagArr:{}
    }
  },
  methods:{
    changeDataLine1(name,i){
      if(i==0){
        this.active1 = 0
        this.active2 = 0
        this.active3 = 0
        this.active4 = 0
        this.changeData(name,'line1')
      }else{
        this.active1 = i;
        this.changeData(name,'line1')
      }
    },
    changeDataLine2(name,i){
      this.active2 = i;
      this.changeData(name,'line2')
    },
    changeDataLine3(name,i){
      this.active3 = i;
      this.changeData(name,'line3')
    },
    changeDataLine4(name,i){
      this.active4 = i;
      this.changeData(name,'line4')
    },
    changeData(name,tag){
      switch(tag)
      {
        case 'line1':
          this.tagArr[0] = name
          break;
        case 'line2':
          this.tagArr[1] = name
          break;
        case 'line3':
          this.tagArr[2] = name
          break;
        case 'line4':
          this.tagArr[3] = name
          break;
      }
      this.$emit('changeMenu',this.tagArr)
    }
  },
}
</script>
<style lang="less" scoped>
.container{
  width:960px;
  height: 175px;
  padding: 17px 30px 5px 30px;
  margin: 90px auto auto auto;
  background: #fff;
  box-shadow: 0 1px 2px rgba(0, 0, 0, 0.2);
  border-radius: 3px;
  .line{
    height: 35px;
    line-height: 35px;
    width: 100%;
    margin-bottom: 8px;
    span{
      display: inline-block;
      width: 10%;
      float: left;
      position: relative;
      top: 1px;
      color:#888;
      font-size: 14px;
    }
    .menu{
      width: 90%;
      border-bottom: 1px dashed #DEDEDE;
      float: left;
      .menuLink{
        color:#888;
        width: 90px;
        font-size: 14px;
        float: left;
        cursor: pointer;
        &:hover{
          color:#FF6160;
        }
      }
      .active{
        color:#FF6160;
      }
    }
  }
}
</style>

