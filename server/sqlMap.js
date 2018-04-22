// 所以的sql语句
var sqlMap = {
  movie: {
    queryByStateCountry: 'SELECT * FROM MOVIE WHERE STATE=? AND COUNTRY=?',
    queryByState: 'SELECT * FROM MOVIE WHERE STATE=?',
    queryAll: 'SELECT * FROM MOVIE',
    queryById:'SELECT * FROM MOVIE WHERE ID=?',
    queryByTime:'SELECT name,`update`,`time`,`img`,`dingyue` FROM MOVIE order by time desc limit 3', 
    queryByClass:'SELECT * FROM MOVIE WHERE TYPE=?', 
    queryByCountry:'SELECT * FROM MOVIE WHERE COUNTRY=?', 
    queryByEarly:'SELECT * FROM MOVIE WHERE time < 2012', 
    queryByStateAndType:'SELECT * FROM MOVIE WHERE STATE=? AND TYPE=?', 
    queryByTypeAndCountry:'SELECT * FROM MOVIE WHERE type=? AND country=?', 
    queryByStateAndTypeAndCountry:'SELECT * FROM MOVIE WHERE state=? AND type=? AND country=?', 
    queryByStateAndTypeAndYear:'SELECT * FROM MOVIE WHERE state=? AND type=? AND year=?',
    queryByTypeAndRegionAndYear:'SELECT * FROM MOVIE WHERE country=? AND type=? AND year=?',
    queryTjqd:'SELECT * FROM tjqd',
  },
  playList:{
    queryPlayListByMid:'SELECT * FROM playList where mid=?'     
  },
  user:{
    queryUser: 'SELECT COUNT(1) as result FROM USER where USER=? AND PWD=?',
    queryUserOnly: 'SELECT COUNT(1) as result FROM USER where USER=?',
    queryUserAvtar: 'SELECT id,AVTAR FROM USER WHERE USER=?',
  },
  subscribe:{
    queryMidByuid:'SELECT mid FROM subscribe where uid=?',
    cancelSub:'DELETE  FROM subscribe where mid=?',
    userSubscribe:'INSERT INTO subscribe  (uid,mid) values (?,?)',
  },
  tjqd:{
    addTjqd:'INSERT INTO userTjqd  (uid,tid) values (?,?)',
    tjqdAddCollect:'update tjqd set collect=? where id = ?',
  }
}

module.exports = sqlMap;