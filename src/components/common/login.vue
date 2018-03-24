<template>
  <div class="modal">
  <!-- 模态框 -->
    <el-dialog
      title="登录"
      :visible.sync="$store.state.dialog.dialogVisible"
      width="40%"
      >
      <div class="content">
        <div class="left"></div>
        <div class="right">
          
        </div>
      </div>
      <!-- <span slot="footer" class="dialog-footer">
        <el-button @click="$store.commit('handle')">取 消</el-button>
        <el-button type="primary" @click="$store.commit('handle')">确 定</el-button>
      </span> -->
    </el-dialog>
  </div>
</template>

<script>
export default {
  data(){
    return{
 
    }
  }
}
</script>

<style lang="less">
.modal{
  .el-dialog{
    margin-top: 0!important;
    top: 50%;
    transform: translateY(-50%);
    background: none;
    width: 700px !important;
    .el-dialog__header{
      display: none;
    }
    .el-dialog__body{
      width: 700px !important;
      margin: 0;
      padding:0;
      display: block;
      border-radius: 10px !important;
    }
  }
  .content{
    width: 100%;
    height: 430px;
    box-shadow: 0 1px 30px #333;
    // border-radius: 10px !important;
    .left{
      width: 50%;
      height: 100%;
      float: left;
      background: url(http://neets.cc/assets/img/load.png);
      background-size: cover;
    }
    .right{
      width: 50%;
      height: 100%;
      float: left;
      background: #647084;
    }
  }
}
</style>

