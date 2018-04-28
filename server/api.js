var mysql = require('mysql');
var mysqlConf = require('./db');
var sqlMap = require('./sqlMap');
var utils = require('./utils');
const token = require('./token');
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
  // 获取推荐清单
  getTjqd(req,res,next){
    pool.getConnection((err, connection) => {
      connection.query(sqlMap.movie.queryTjqd, (err, result) => {
        jsonWrite(res, result);
        connection.release();
      })
    })
  },
  // 获取全部电影
  getMovieAll(req, res, next) {
    pool.getConnection((err, connection) => {
      connection.query(sqlMap.movie.queryAll, (err, result) => {
        jsonWrite(res, result);
        connection.release();
      })
    })
  },
  //  分页查询 全部 点击分页器
  getMovieBypage(req,res,next){
    let count = Number(req.query.count); //每页的数据量 前端传入
    let curPage = Number(req.query.curPage);//当前页  前端传入
    let start = count*(curPage-1); //起始的位置
    console.log(count);
    console.log(curPage);
    let sql = `SELECT * FROM MOVIE limit ${start},${count}`
    console.log(sql);
    pool.getConnection((err, connection) => {
      if(err) throw err;
      // 先拿到总条数 返回给前端 要做统计总页数      
      let promise = function(){
        return new Promise(((resolve,reject)=>{
          connection.query(sqlMap.movie.queryAll,(err,result) => {
            if(err){
              return reject(err);
            }
            resolve(result.length);
          })
        }))
      }
      promise().then(function(val){
        connection.query(sql, (err, result) => {
          if(err){
            res.json({
              code:'-1',
              msg:'操作失败',
            })
            throw err
          }else{
            // 计算总页数
            res.json({
              length:val,  //这里是数据库的总条数
              data:result,
              code:'1',
              msg:'操作成功',
              curPage:curPage
            })
          }
          connection.release();
        })
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
  // 按状态和类型查找
  getMovieByStateAndType(req,res,next){
    let state = req.query.state;
    let type = req.query.type;
    pool.getConnection((err,connection)=>{
      connection.query(sqlMap.movie.queryByStateAndType,[state,type],(err,result) => {
        jsonWrite(res,result);
        connection.release();
      })
    })
  },
  // 按电视剧分类获取电影
  getMovieByClass(req,res,next){
    let type = req.query.class;
    pool.getConnection((err,connection)=>{
      connection.query(sqlMap.movie.queryByClass,[type],(err,result) => {
        jsonWrite(res,result);
        connection.release();
      })
    })
  },
  // 按状态和年份
  getMovieByStateAndYear(req,res,next){
    let state = req.query.state;
    let year = req.query.year;
    let sql = `SELECT * FROM MOVIE WHERE STATE = ${state} AND time like '%${year}_%_%'`
    pool.getConnection((err,connection)=>{
      connection.query(sql,(err,result) => {
        jsonWrite(res,result);
        connection.release();
      })
    })
  },
  // 按类目和地区
  getMovieByTypeAndRegion(req,res,next){
    const type = req.query.type1;
    const country = req.query.country;
    pool.getConnection((err,connection)=>{
      connection.query(sqlMap.movie.queryByTypeAndCountry,[type,country],(err,result) => {
        jsonWrite(res,result);
        connection.release();
      })
    })
  },
  // 按类目和年代
  getMovieByTypeAndYear(req,res,next){
    let type = req.query.type;
    let year = req.query.year;
    let sql = `SELECT * FROM MOVIE WHERE TYPE = '${type}' AND time like '%${year}_%_%'`
    pool.getConnection((err,connection)=>{
      connection.query(sql,(err,result) => {
        jsonWrite(res,result);
        connection.release();
      })
    })
  },
  // 按地区和年代
  getMovieByRegionAndYear(req,res,next){
    let country = req.query.country;
    let year = req.query.year;
    let sql = `SELECT * FROM MOVIE WHERE COUNTRY = '${country}' AND time like '%${year}_%_%'`
    pool.getConnection((err,connection)=>{
      connection.query(sql,(err,result) => {
        jsonWrite(res,result);
        connection.release();
      })
    })
  },
  // 按四个条件
  getMovieByAllConditions(req,res,next){
    let country = req.query.country;
    let year = req.query.year;
    let state = req.query.state;
    let type = req.query.type;
    let sql = `SELECT * FROM MOVIE WHERE STATE = ${state} AND type = '${type}' AND COUNTRY = '${country}' AND time like '%${year}_%_%'`
    pool.getConnection((err,connection)=>{
      connection.query(sql,(err,result) => {
        jsonWrite(res,result);
        connection.release();
      })
    })
  },
  // 按状态 类别 地区获取
  getMovieByStateAndClassAndCountry(req,res,next){
    let state = req.query.state;
    let type = req.query.type;
    let country = req.query.country;
    pool.getConnection((err,connection)=>{
      connection.query(sqlMap.movie.queryByStateAndTypeAndCountry,[state,type,country],(err,result) => {
        jsonWrite(res,result);
        connection.release();
      })
    })
  },
  // 按状态 地区 年代获取
  getMovieByStateAndRegionAndYear(req,res,next){
    let state = req.query.state;
    let country = req.query.country;
    let year = req.query.year;
    let sql = `SELECT * FROM MOVIE WHERE STATE = ${state} AND country = '${country}' AND time like '%${year}_%_%'`
    pool.getConnection((err,connection)=>{
      connection.query(sql,(err,result) => {
        jsonWrite(res,result);
        connection.release();
      })
    })
  },
  // 按状态 类目 年代
  getMovieByStateAndTypeAndYear(req,res,next){
    let state = req.query.state;
    let type = req.query.type;
    let year = req.query.year;
    let sql = `SELECT * FROM MOVIE WHERE STATE = ${state} AND type = '${type}' AND time like '%${year}_%_%'`
    pool.getConnection((err,connection)=>{
      connection.query(sql,(err,result) => {
        jsonWrite(res,result);
        connection.release();
      })
    })
  },
  // 类目 地区 年代
  getMovieByTypeAndRegionAndYear(req,res,next){
    let country = req.query.country;
    let type = req.query.type;
    let year = req.query.year;
    let sql = `SELECT * FROM MOVIE WHERE country = '${country}' AND type = '${type}' AND time like '%${year}_%_%'`
    console.log(sql);
    pool.getConnection((err,connection)=>{
      connection.query(sql,(err,result) => {
        jsonWrite(res,result);
        connection.release();
      })
    })
  },
  // 按地区获取电影
  getMovieByRegion(req,res,next){
    let country = req.query.region;
    pool.getConnection((err,connection)=>{
      connection.query(sqlMap.movie.queryByCountry,[country],(err,result) => {
        jsonWrite(res,result);
        connection.release();
      })
    })
  },
  // 按资源年份获取
  getMovieByYear(req,res,next){
    let year = req.query.year;
    let sql = `SELECT * FROM MOVIE WHERE time like '%${year}_%_%'`
    pool.getConnection((err,connection)=>{
      connection.query(sql,(err,result) => {
        jsonWrite(res,result);
        connection.release();
      })
    })
  },
  //  按时间更早
  getMovieByEarly(req,res,next){
    pool.getConnection((err,connection)=>{
      connection.query(sqlMap.movie.queryByEarly,(err,result) => {
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
  },
  // 用户登录查询
  queryLogin(req,res,next){
    let user = req.query.user,pwd = req.query.pwd;
    pool.getConnection((err,connection)=>{
      connection.query(sqlMap.user.queryUser,[user,pwd],(err,result) => {
        if(result[0].result>0){
          let tokenMsg = token.generateToken(user);
          let avtar = function(){
            return new Promise(((resolve,reject)=>{
              connection.query(sqlMap.user.queryUserAvtar,[user],(err,result) => {
                if(err) {
                  return reject(err);
                }
                resolve(result[0]);
              })
            }))
          }
          avtar().then(function(val){
            res.json({
              code:'1',
              msg: '操作成功',
              user: user,
              token:tokenMsg,
              avtar: val.AVTAR,
              id:val.id
            });
          })
          return
        }else{
          res.json({
            code:'-1',
            msg: '操作失败0'
          });
        }
        connection.release();
      })
    })
  },
  // 游客注册
  register(req,res,next){
    let user = req.body.params.user
    let userMsg = {
      user:req.body.params.user,
      pwd:req.body.params.pwd,
      avtar:req.body.params.avtar,
      root:req.body.params.root,
      regtime:req.body.params.regtime,
    }
    pool.getConnection((err,connection)=>{
      connection.query(sqlMap.user.queryUserOnly,user,(err,result) => {
        // 说明已经这个账号被注册过了，返回-1
        if(result[0].result>0){
          res.json({
            code:'-1',
            msg: '操作失败0'
          });
          return
        }else{
          connection.query('insert into user set ?',userMsg,(err,result) => {
            if (err) throw  err;
            res.json({
              code: '1',
              msg:'操作成功'
            })
          })
        }
        connection.release();
      })
    })
  },
  // 获取用户订阅的电影列表
  async getUserSub(req,res,next){
    let uid = req.query.uid;
    let mid = await utils.getMidByuid(uid); //mid[0].mid
    let data = []
    for(let i = 0;i<mid.length;i++){
      data[i] = await utils.getMovieBymid(mid[i].mid)
    }
    res.json({
      code:'1',
      msg:'获取成功',
      data:data
    })
  },
  // 用户订阅
  async subscribe(req,res,next){
    // 告诉后端用户是谁  订阅的电影id是什么
    let uid = req.query.uid;
    let mid = req.query.mid;
    let allMid = await utils.getAllMidByUid(uid)
    let arrRe = await utils.arrRepeatQuery(allMid,mid)
    if(arrRe>=0){
      res.json({
        code:-1,
        msg:'订阅失败,你已经订阅过该资源',
      })
      return
    }else{
      let data = await utils.subscribe(uid,mid)
      res.json({
        code:1,
        msg:'订阅成功',
        data:data
      })
    }
  },
  // 取消订阅
  async cancelSub(req,res,next){
    let mid = req.query.id;
    let data = await utils.cancelSub(mid)
    res.json({
      code:1,
      msg:'取消订阅成功',
      data:data
    })
  },
  // 用户推荐的清单
  async userCollect(req,res,next){
    let uid = req.query.uid;
    let allTid = await utils.getUserTjqd(uid) //根据传的uid获取所有的tid
    let allTjqd = []
    for( i in allTid){
      allTjqd.push(await utils.getTjqd(allTid[i])) ////根据所有的tid获取所有的推荐清单
    }
    res.json({
      code:1,
      msg:'获取推荐清单成功',
      data:allTjqd
    })
  },
  // 增加清单收藏
  async addTjqd(req,res,next){
    let uid = req.query.uid;
    let tid = req.query.tid;
    let isHasTid = await utils.getTid(uid,tid) //查询该用户的tid是否存在
    if(isHasTid>0){
      res.json({
        code:-1,
        msg:'收藏失败,你已收藏过该清单，请勿重复收藏 ^_^'
      })
      return 
    }
    let state = await utils.addTjqd(uid,tid)
    let state2 = await utils.tjqdAddCollect(tid) //清单收藏数加1
    let status = await utils.sortById('userTjqd') //重新给主键id排序
    if(!state.affectedRows==1){
      res.json({
        code:-1,
        msg:'收藏失败'
      })
      return
    }
    res.json({
      code:1,
      msg:'收藏成功'
    })
  },
  // 取消清单收藏
  async cancelTjqd(req,res,next){
    let uid = req.query.uid;
    let tid = req.query.tid;
    let state = await utils.cancelTjqd(uid,tid)
    let status = await utils.sortById('userTjqd') //重新给主键id排序
    res.json({
      code:1,
      msg:'取消成功'
    })
  }, 
  // 获取用户喜欢的电影  首页 我的推荐  先获取uid  再根据uid获取mid 再用mid查询movie表  拿到这些值
  async userLikes(req,res,next){
    let uid = req.query.uid;
    let mid = await utils.getCategory(uid)  //应该是一个数组
    let data = []
    for(i in mid){
      data.push(await utils.getMovieByMid(mid[i]))
    }
    let newData = utils.panelArr(data) //拍平数组
    res.json({
      code:1,
      msg:'获取我的推荐成功',
      data:newData
    })
  },
  // 用户喜欢的次数++
  async likeCount(req,res,next){
    let uid = req.query.uid;
    let mid = req.query.mid 
    let count = await utils.getUserLikeCount(uid,mid)
    let data = await utils.handlrUserLike(uid,mid,count)
    let status = await utils.sortById('userlikes')
    res.json({
      code:1,
      msg:'感兴趣+1',
      data:data
    })
  },
  // 生产验证码
  async getCaptcha(req,res,next){
    let data = await utils.getCaptcha()
    // 保存到session,忽略大小写  
    req.session = data.text.toLowerCase(); 
    // console.log(req.session); // 生成的验证码
    //保存到cookie 方便前端调用验证
    res.cookie('captcha', req.session); 
    res.json({
      code:1,
      data:req.session
    })
  }
}