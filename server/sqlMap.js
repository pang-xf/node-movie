// 所以的sql语句
var sqlMap = {
  movie: {
    insert:'INSERT INTO user(user_id,author,title,tyep,loadURL,tag,summary,posy_time,upd_time) VALUES(8023,陈亮,?,0,$,tag,?,?,?)',
    update:'update blog set name=?, age=? where id=?',
    delete: 'delete from blog where id=?',
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
  },
  playList:{
    queryPlayListByMid:'SELECT * FROM playList where mid=?'     
  },
  user:{
    queryUser: 'SELECT COUNT(1) as result FROM USER where USER=? AND PWD=?',
    queryUserOnly: 'SELECT COUNT(1) as result FROM USER where USER=?',
    queryUserAvtar: 'SELECT AVTAR FROM USER WHERE USER=?',
  }
}

module.exports = sqlMap;