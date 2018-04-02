var express = require('express')
var router = express.Router();
var api = require('./api')

// 获取所有movie消息
router.get('/api/movie/getMovieAll', function(req, res, next) {
  return api.getMovieAll(req, res, next);
})
// 按state获取
router.get('/api/movie/getMovieByState', function(req, res, next) {
  return api.getMovieByState(req, res, next);
})
// 按state和country获取更新或者完结的剧集
router.get('/api/movie/getMovieByStateCountry', function(req, res, next) {
  return api.getMovieByStateCountry(req, res, next);
})
// 按ID获取电影详情
router.get('/api/movie/getMovieById', function(req, res, next) {
  return api.getMovieById(req, res, next);
})
// 新剧推荐  按时间排序
router.get('/api/movie/getMovieByTime', function(req, res, next) {
  return api.getMovieByTime(req, res, next);
})
// 播放列表
router.get('/api/playList/getPlayListByMid', function(req, res, next) {
  return api.getPlayListByMid(req, res, next);
})
module.exports = router;