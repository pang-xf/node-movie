var mysql = require('mysql');
var mysqlConf = require('./db');
var sqlMap = require('./sqlMap');
var svgCaptcha = require('svg-captcha');
// 连接数据库
var pool = mysql.createPool({
  host: mysqlConf.mysql.host,
  user: mysqlConf.mysql.user,
  password: mysqlConf.mysql.password,
  database: mysqlConf.mysql.database,
  port: mysqlConf.mysql.port
})

module.exports={
  _getTjqd(){
    pool.getConnection((err, connection) => {
      connection.query(sqlMap.movie.queryTjqd, (err, result) => {
        jsonWrite(res, result);
        connection.release();
      })
    })
  },
  // 由用户订阅的uid获取电影的mid拿值
  getMidByuid(uid){
    return new Promise((resolve,reject)=>{
      pool.getConnection((err, connection) => {
        connection.query(sqlMap.subscribe.queryMidByuid,uid,(err, result) => {
          resolve(result)
          connection.release();
        })
      })
    })
  },
  // 由mid的值拿到对应的影片信息
  getMovieBymid(mid){
    return new Promise((resolve,reject)=>{
      pool.getConnection((err, connection) => {
        connection.query(sqlMap.movie.queryById,mid,(err, result) => {
          resolve(result)
          connection.release();
        })
      })
    })
  },
  // 取消订阅
  async cancelSub(mid){
    let count = await this.getMovieCollects(mid) //获取订阅数
    let newCount = await this.delSubscribe(mid,count)//订阅数减一
    return new Promise((resolve,reject)=>{
      pool.getConnection((err, connection) => {
        connection.query(sqlMap.subscribe.cancelSub,mid,(err, result) => {
          resolve(result)
          connection.release();
        })
      })
    })
  },
  // 用户订阅  让Id重新排序
  async subscribe(uid,mid){
    let status = await this.sortById('subscribe')
    let count = await this.getMovieCollects(mid) //获取订阅数
    let newDingyue = await this.addSubscribe(mid,count) //订阅数加一
    // console.log(newDingyue);
    return new Promise((resolve,reject)=>{
      pool.getConnection((err, connection) => {
        connection.query(sqlMap.subscribe.userSubscribe,[uid,mid],(err, result) => {
          resolve(result)
          connection.release();
        })
      })
    })
  },
  // 获取订阅数
  getMovieCollects(id){
    return new Promise((resolve,reject)=>{
      pool.getConnection((err, connection) => {
        let sql = `select dingyue from movie where id = ${id} `
        connection.query(sql,(err, result) => {
          resolve(parseInt(result[0].dingyue))
          connection.release();
        })
      })
    })
  },
  // 让订阅数加1
  addSubscribe(id,count){
    count++; //订阅数+1
    return new Promise((resolve,reject)=>{
      pool.getConnection((err, connection) => {
        let sql = `update movie set dingyue = ${count} where id = ${id}`
        connection.query(sql,(err, result) => {
          // console.log(result);
          resolve(result)
          connection.release();
        })
      })
    })
  },
  //让订阅数减1
  delSubscribe(id,count){
    count--; //订阅数+1
    return new Promise((resolve,reject)=>{
      pool.getConnection((err, connection) => {
        let sql = `update movie set dingyue = ${count} where id = ${id}`
        connection.query(sql,(err, result) => {
          resolve(result)
          connection.release();
        })
      })
    })
  },
  // 让Id重新排序函数
  sortById(tableName){
    return new Promise((resolve,reject)=>{
      pool.getConnection((err,connection)=>{
        let sql = `ALTER  TABLE  ${tableName} DROP id`
        connection.query(sql,(err,result)=>{})
        let sql2 = `ALTER  TABLE  ${tableName} ADD id mediumint(6) PRIMARY KEY NOT NULL AUTO_INCREMENT FIRST`
        connection.query(sql2,(err,result)=>{
          resolve(result)
          connection.release();
        })
      })
    })
  },
  // 查询用户订阅列表所有的mid  防止用户重复订阅
  getAllMidByUid(uid){
    let arr = []
    return new Promise((resolve,reject)=>{
      pool.getConnection((err,connection)=>{
        let sql = `select mid from subscribe where uid = '${uid}'`
        connection.query(sql,(err,result)=>{
          for(var i = 0; i < result.length; i++){
            arr.push(result[i].mid)
          }
          resolve(arr)
          connection.release();
        })
      })
    })
  },
  // 数组查重
  arrRepeatQuery(arr,value){
    let state = arr.indexOf(parseInt(value))
    return new Promise((resolve,reject)=>{
      resolve(state)
    })
  },
  // 根据uid获取所有的tid
  getUserTjqd(uid){
    let arr = []
    return new Promise((resolve,reject)=>{
      pool.getConnection((err,connection)=>{
        let sql = `select tid from userTjqd where uid = '${uid}'`
        connection.query(sql,(err,result)=>{
          for(var i = 0; i < result.length; i++){
            arr.push(result[i].tid)
          }
          resolve(arr)
          connection.release();
        })
      })
    })
  },
  // 根据tid 获取用户收藏的清单
  async getTjqd(tid){
    return new Promise((resolve,reject)=>{
      pool.getConnection((err,connection)=>{
        let sql = `select * from tjqd where id = ${tid}`
        connection.query(sql,(err,result)=>{
          resolve(result[0])
        })
      })
    })
  },
  // 根据tid来查询count 防止重复
  async getTid(uid,tid){
    return new Promise((resolve,reject)=>{
      pool.getConnection((err,connection)=>{
        let sql = `SELECT COUNT(1) as result FROM usertjqd where tid= ${tid} and uid = ${uid}`
        connection.query(sql,(err,result)=>{
          resolve(result[0].result)
        })
      })
    })
  },
  // 增加收藏清单
  async addTjqd(uid,tid){
    return new Promise((resolve,reject)=>{
      pool.getConnection((err,connection)=>{
        connection.query(sqlMap.tjqd.addTjqd,[uid,tid],(err,result)=>{
          resolve(result)
          connection.release();
        })
      })
    })
  },
  // 根据id获取推荐清单tjqd收藏数
  getCollectNum(id){
    return new Promise((resolve,reject)=>{
      pool.getConnection((err,connection)=>{
        connection.query(sqlMap.tjqd.collectNum,id,(err,result)=>{
          resolve(result)
          connection.release();
        })
      })
    })
  },
  // 收藏清单数加1  没做
  async tjqdAddCollect(id){
    let count = await this.getCollectNum(id)
    let newCount = count[0].collect
    newCount++
    return new Promise((resolve,reject)=>{
      pool.getConnection((err,connection)=>{
        connection.query(sqlMap.tjqd.tjqdAddCollect,[newCount,id],(err,result)=>{
          resolve(result)
          connection.release();
        })
      })
    })
  },
  // 取消收藏
  async cancelTjqd(uid,tid){
    return new Promise((resolve,reject)=>{
      pool.getConnection((err,connection)=>{
        let sql = `delete  from userTjqd where uid = ${uid} and tid = ${tid}`
        connection.query(sql,(err,result)=>{
          resolve(result)
          connection.release();
        })
      })
    })
  },
  getCategory(uid){
    let midArr = []
    return new Promise((resolve,reject)=>{
      pool.getConnection((err,connection)=>{
        let sql = `select mid from userLikes where uid = ${uid} and count>6`
        connection.query(sql,(err,result)=>{
          for(var i = 0; i < result.length; i++){
            midArr.push(result[i].mid)
          }
          resolve(midArr)
          connection.release();
        })
      })
    })
  },
  getMovieByMid(mid){
    return new Promise((resolve,reject)=>{
      pool.getConnection((err,connection)=>{
        let sql = `select * from movie where id =${mid}`
        connection.query(sql,(err,result)=>{
          resolve(result)
          connection.release();
        })
      })
    })
  },
  // 数组拍平
  panelArr(arr){
    var newArr = [];
    var isArray = function(obj) {
     return Object.prototype.toString.call(obj) === '[object Array]';
    };
    var dealArr = function(arr){
     for (var i = 0;i<arr.length;i++){
      isArray(arr[i]) ? dealArr(arr[i]) : newArr.push(arr[i]);
     }
    };
    dealArr(arr);
    return newArr;
  },
  // 这个系统我是根据用户点击该卡片的次数 再由卡片的分类记录次数
  // 用户每次点击电影卡片时触发，记录用户喜欢的东西 每次提交  次数加一  返回前<6个项目  
  // 先获取当前用户喜欢的次数 
  async getUserLikeCount(uid,mid){
    return new Promise((resolve,reject)=>{
      pool.getConnection((err,connection)=>{
        let sql = `select count from userlikes where uid=${uid} and mid = ${mid}`
        connection.query(sql,(err,result)=>{
          resolve(result)
          connection.release();
        })
      })
    })
  },
  // 如果没有这个分类  插入一条数据
  async handlrInsertLike(uid,mid){
    return new Promise((resolve,reject)=>{
      pool.getConnection((err,connection)=>{
        let sql = `insert into  userlikes (uid,mid,count) values (${uid},${mid},1)`
        connection.query(sql,(err,result)=>{
          resolve(result)
          connection.release();
        })
      })
    })
  },

  // 再增加并重新设置
  async handlrUserLike(uid,mid,count){
    if(count.length == 0){
      let state = await this.handlrInsertLike(uid,mid)
      return
    }
    let newCount = (count[0].count)
    newCount++
    return new Promise((resolve,reject)=>{
      pool.getConnection((err,connection)=>{
        let sql = `update  userlikes set count = ${newCount} where uid=${uid} and mid = ${mid}`
        connection.query(sql,(err,result)=>{
          resolve(result)
          connection.release();
        })
      })
    })
  },
  // 获取验证码
  getCaptcha(){
    var captcha = svgCaptcha.create({  
      // 翻转颜色  
      inverse: false,  
      // 字体大小  
      fontSize: 36,  
      // 噪声线条数  
      noise: 2,  
      // 宽度  
      width: 80,  
      // 高度  
      height: 30,  
    });  
    return new Promise((resolve,reject)=>{
      resolve(captcha)
    })
  }
}