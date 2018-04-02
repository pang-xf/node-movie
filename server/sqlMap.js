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
  },
  playList:{
    queryPlayListByMid:'SELECT * FROM playList where mid=?'     
  }
}

module.exports = sqlMap;