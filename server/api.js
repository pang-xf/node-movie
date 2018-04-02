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

// 向前台返回JSON方法的简单封装
var jsonWrite = function (res, data) {
  if(typeof data === 'undefined') {
    res.json({
      code:'1',
      msg: '操作失败'
    });
  } else {
    res.json(data);
  }
};

module.exports = {
  // 获取全部电影
  getMovieAll(req, res, next) {
    pool.getConnection((err, connection) => {
      connection.query(sqlMap.movie.queryAll, (err, result) => {
        jsonWrite(res, result);
        connection.release();
      })
    })
  },
  // 按更新状态获取电影
  getMovieByState(req,res,next){
    let state = req.query.state;
    pool.getConnection((err,connection)=>{
      connection.query(sqlMap.movie.queryByState,[state],(err,result) => {
        jsonWrite(res,result);
        connection.release();
      })
    })
  },
  // 按更新状态和国家获取电影
  getMovieByStateCountry(req,res,next){
    let state = req.query.state;
    let country = req.query.country;
    pool.getConnection((err,connection)=>{
      connection.query(sqlMap.movie.queryByStateCountry,[state,country],(err,result) => {
        jsonWrite(res,result);
        connection.release();
      })
    })
  },
  // 按电影的ID获取影片详情
  getMovieById(req,res,next){
    let id = req.query.id;
    pool.getConnection((err,connection)=>{
      connection.query(sqlMap.movie.queryById,[id],(err,result) => {
        jsonWrite(res,result);
        connection.release();
      })
    })
  },
  // 新剧推荐  按时间排序
  getMovieByTime(req,res,next){
    pool.getConnection((err,connection)=>{
      connection.query(sqlMap.movie.queryByTime,(err,result) => {
        jsonWrite(res,result);
        connection.release();
      })
    })
  },
  // 按 Mid获取播放列表
  getPlayListByMid(req,res,next){
    let mid = req.query.mid;
    pool.getConnection((err,connection)=>{
      connection.query(sqlMap.playList.queryPlayListByMid,{mid},(err,result) => {
        jsonWrite(res,result);
        connection.release();
      })
    })
  }
}