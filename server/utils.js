var mysql = require('mysql');
var mysqlConf = require('./db');
var sqlMap = require('./sqlMap');
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
  // 增加收藏清单
  // async addTjqd(uid,tid){
  //   return new Promise((resolve,reject)=>{
  //     pool.getConnection((err,connection)=>{
  //       connection.query(sqlMap.tjqd.addTjqd,[uid,tid],(err,result)=>{
  //         resolve(result)
  //         connection.release();
  //       })
  //     })
  //   })
  // },
  // 收藏清单数加1
  async tjqdAddCollect(id){
    return new Promise((resolve,reject)=>{
      pool.getConnection((err,connection)=>{
        connection.query(sqlMap.tjqd.tjqdAddCollect,[collect,id],(err,result)=>{
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
}