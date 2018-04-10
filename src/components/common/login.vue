<template>
  <div class="modal" >
  <!-- 模态框 -->
    <el-dialog
      title="登录"
      :visible.sync="$store.state.dialog.dialogVisible"
      width="40%"
      >
      <div class="content">
        <div class="left"></div>
        <div class="right">
          <div class="right_wrap">
            <p>追剧管家</p>
              <!-- 登录 -->            
            <div class="from-con" v-show="showLoginModal">
              <p class="zhuce" @click="reg">
              没有账号?立即注册
              </p>
              <el-form ref="form" :model="form" label-width="80px" :label-position="top"
               status-icon :rules="loginRules">
                <el-form-item label="账号" prop="username">
                  <el-input v-model="form.username" placeholder="请输入用户名"></el-input>
                </el-form-item>
                <el-form-item label="密码" prop="password">
                  <el-input v-model="form.password" placeholder="请输入密码"></el-input>
                </el-form-item>
                <p class="zhuce">
                  <router-link to="#">忘记密码?点这里</router-link>
                </p>
                <el-form-item class="btn">
                  <el-button type="primary" @click="submitForm('form')">登 录</el-button>
                </el-form-item>
              </el-form>
            </div>
            <!-- 注册 -->
            <div class="from-con" v-show="!showLoginModal">
              <p class="zhuce" @click="reg">
              已有账号?立即登录
              </p>
              <el-form ref="form2" :model="form2" label-width="80px" :label-position="top" status-icon :rules="registerRules">
                <el-form-item label="用户名" prop="username">
                  <el-input v-model="form2.username" placeholder="请输入用户名"></el-input>
                </el-form-item>
                <el-form-item label="密码" prop="password">
                  <el-input v-model="form2.password" placeholder="请输入密码,密码由6-20位字母组成"></el-input>
                </el-form-item>
                <el-form-item label="重复密码" prop="repeatPwd">
                  <el-input v-model="form2.repeatPwd" placeholder="请再次输入上面的密码"></el-input>
                </el-form-item>
                <el-form-item class="btn">
                  <el-button type="primary" @click="submitRegForm('form2')">立即登录</el-button>
                </el-form-item>
              </el-form>
            </div>
          </div>
        </div>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import axios from 'axios'
export default {
  data(){
    var validatePass = (rule, value, callback) =>{
      if (value !== this.form2.password) {
        callback(new Error('两次密码输入不一致'));
      } else {
        callback();
      }
    }
    return{
      form:{
        username:'jack',
        password:'123456',
      },
      form2:{
        username:'liyu2',
        password:'123456',
        repeatPwd:'123456',
      },
      top:'top',
      showLoginModal:true,
      loginRules:{
        username:[
          {
            required: true,
            message: '请输入用户名',
            // validator: validateLoginUsername,
            trigger: 'blur'
          },
          {
            min: 1, max: 10, message: '请输入1-10位用户名', trigger: 'blur'
          }
        ],
        password:[
          {
            required: true,
            message: '请输入密码',
            trigger: 'blur'
          },
          {
            min: 6, max: 10, message: '请输入6-10位密码', trigger: 'blur'
          }
        ]
      },
      registerRules:{
        repeatPwd:[
          {
            required: true,
            message: '请重复输入密码',
            trigger: 'blur'
          },
          {
            validator: validatePass,
            trigger: 'blur'
          }
        ],
        username:[
          {
            required: true,
            message: '请输入用户名',
            trigger: 'blur'
          },
          {
            min: 1, max: 10, message: '请输入1-10位用户名', trigger: 'blur'
          }
        ],
        password:[
          {
            required: true,
            message: '请输入密码',
            trigger: 'blur'
          },
          {
            min: 6, max: 10, message: '请输入6-10位密码', trigger: 'blur'
          },
        ]
      }
    }
  },
  methods:{
    submitForm(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          let form = this.$refs[formName].$options.propsData.model
          let user = form.username,pwd = form.password
          axios.get("/api/user/queryLogin",{
            params:{user:user,pwd:pwd}
          })
          .then(res=>{
            if(res.data.code == 1){
              this.$router.go(0)
              // 拿到数据写到vuex里去
              console.log(res.data);
              this.$store.dispatch('getTOKEN',{user:res.data.user,token:res.data.token,avtar:res.data.avtar})
            }else{
              return false;
            }
          })
        }
      });
    },
    submitRegForm(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          let form = this.$refs[formName].$options.propsData.model
          let user = form.username,pwd = form.password,root='1',avtar='https://ws1.sinaimg.cn/large/005N37m4gy1fq5kwt78dpj30b40b4t8t.jpg'
          axios.post("/api/user/register",{
            params:{user:user,pwd:pwd,avtar:avtar,root:root}
          })
          .then(res=>{
            console.log(res);
            // 说明用户名已经存在
            if(res.data.code == -1){
              this.$alert('该用户名已被注册', '注册失败', {
                confirmButtonText: '确定',
                callback: action => {
                  // this.$router.go(0)
                }
              })
            }else{
              this.$alert('欢迎来到追剧管家,赶快登录吧', '注册成功', {
                confirmButtonText: '确定',
                callback: action => {
                  this.$router.go(0)
                }
              })
            }
          })
        }
      });
    },
    reg(){
      this.showLoginModal = !this.showLoginModal
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
    border-radius: 10px !important;
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
    border-radius: 10px !important;
    .left{
      width: 50%;
      height: 100%;
      float: left;
      background: url(http://neets.cc/assets/img/load.png);
      background-size: cover;
      border-top-left-radius: 10px !important;
      border-bottom-left-radius: 10px !important;
    }
    .right{
      width: 50%;
      height: 100%;
      float: left;
      background: #647084;
      border-top-right-radius: 10px !important;
      border-bottom-right-radius: 10px !important;
      color:#fff;
      .zhuce{
        padding: 0;
        font-size: 13px;
        text-align: right;
        margin: 0;
        margin-top: 5px;
        // margin-bottom: 10px;
        color:rgb(172, 169, 169);
        transition: all .25s;
        cursor: pointer;
        &:hover{
          color:salmon;
        }
        a{
          color:rgb(172, 169, 169);
          transition: all .25s;
          &:hover{
            color:salmon;
          }
        }
      }
      .right_wrap{
        padding: 5px 20px;
      }
      .el-form-item{
        margin-bottom: 12px !important;
      }
      p{
        margin: 10px 0 10px 0;
        font-size: 24px;
        font-weight: bold;
      }
      .el-form-item__label{
        color:#fff;
        padding: 0 !important;
        font-size: 16px;
      }
      .el-button{
        width: 100% !important;
        margin-top: 10px;
        background: #647084;
        border: 1px solid #4d5563;
        font-size: 18px;
        &:hover{
          background: #596374;
          border: 1px solid #3c424d;
        }
      }
      .el-input__inner{
        background: #647084;
        color:#fff;
        height: 35px;
      }
      .btn{
        .el-form-item__content{
          margin-left: 0 !important;
        }
      }
    }
  }
}
</style>

