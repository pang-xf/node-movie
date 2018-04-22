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
// 按四个条件
router.get('/api/movie/getMovieByAllConditions', function(req, res, next) {
  return api.getMovieByAllConditions(req, res, next);
})
// 按state和TYPE获取
router.get('/api/movie/getMovieByStateAndType', function(req, res, next) {
  return api.getMovieByStateAndType(req, res, next);
})
// 按state和country获取更新或者完结的剧集
router.get('/api/movie/getMovieByStateCountry', function(req, res, next) {
  return api.getMovieByStateCountry(req, res, next);
})
// 按state和year获取
router.get('/api/movie/getMovieByStateAndYear', function(req, res, next) {
  return api.getMovieByStateAndYear(req, res, next);
})
// 按type和year获取
router.get('/api/movie/getMovieByTypeAndYear', function(req, res, next) {
  return api.getMovieByTypeAndYear(req, res, next);
})
// 按type和country获取
router.get('/api/movie/getMovieByTypeAndRegion', function(req, res, next) {
  return api.getMovieByTypeAndRegion(req, res, next);
})
// 按地区和年代获取
router.get('/api/movie/getMovieByRegionAndYear', function(req, res, next) {
  return api.getMovieByRegionAndYear(req, res, next);
})
// 按状态和类别和地区获取
router.get('/api/movie/getMovieByStateAndClassAndCountry', function(req, res, next) {
  return api.getMovieByStateAndClassAndCountry(req, res, next);
})
// 按状态和地区和年代获取
router.get('/api/movie/getMovieByStateAndRegionAndYear', function(req, res, next) {
  return api.getMovieByStateAndRegionAndYear(req, res, next);
})
// 按状态 类目 年代
router.get('/api/movie/getMovieByStateAndTypeAndYear', function(req, res, next) {
  return api.getMovieByStateAndTypeAndYear(req, res, next);
})
// 类目 地区 年代
router.get('/api/movie/getMovieByTypeAndRegionAndYear', function(req, res, next) {
  return api.getMovieByTypeAndRegionAndYear(req, res, next);
})
// 按ID获取电影详情
router.get('/api/movie/getMovieById', function(req, res, next) {
  return api.getMovieById(req, res, next);
})
// 按分类查询
router.get('/api/movie/getMovieByClass', function(req, res, next) {
  return api.getMovieByClass(req, res, next);
})
// 按地区查询
router.get('/api/movie/getMovieByCountry', function(req, res, next) {
  return api.getMovieByRegion(req, res, next);
})
// 按时间
router.get('/api/movie/getMovieByYear', function(req, res, next) {
  return api.getMovieByYear(req, res, next);
})
// 按时间更早
router.get('/api/movie/getMovieByEarly', function(req, res, next) {
  return api.getMovieByEarly(req, res, next);
})
// 新剧推荐  按时间排序
router.get('/api/movie/getMovieByTime', function(req, res, next) {
  return api.getMovieByTime(req, res, next);
})
// 播放列表
router.get('/api/playList/getPlayListByMid', function(req, res, next) {
  return api.getPlayListByMid(req, res, next);
})
// 查询用户名和密码
router.get('/api/user/queryLogin', function(req, res, next) {
  return api.queryLogin(req, res, next);
})
// 注册
router.post('/api/user/register',function(req, res, next){
  return api.register(req, res, next);
})
// 分页查询 全部
router.get('/api/getMovieBypage', function(req, res, next) {
  return api.getMovieBypage(req, res, next);
})
// 获取推荐清单
router.get('/api/getTjqd', function(req, res, next) {
  return api.getTjqd(req, res, next);
})
// 获取用户订阅的列表
router.get('/api/user/userSubscribe',function(req, res, next){
  return api.getUserSub(req, res, next);
})
// 取消用户订阅
router.get('/api/movie/cancelSub',function(req, res, next){
  return api.cancelSub(req, res, next);
})
// 用户订阅
router.get('/api/subscribe',function(req, res, next){
  return api.subscribe(req, res, next);
})
// 获取用户收藏列表
router.get('/api/userCollect',function(req, res, next){
  return api.userCollect(req, res, next);
})
// 用户增加收藏列表
router.get('/api/addTjqd',function(req, res, next){
  return api.addTjqd(req, res, next);
})
// 取消用户收藏
router.get('/api/tjqd/cancel',function(req, res, next){
  return api.cancelTjqd(req, res, next);
})
module.exports = router;