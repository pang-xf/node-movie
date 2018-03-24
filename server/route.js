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
module.exports = router;