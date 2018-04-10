const jwt = require('jsonwebtoken');
//登录时：核对用户名和密码成功后，应用将用户的id（图中的user_id）作为JWT Payload的一个属性
//生成token的方法
exports.generateToken=function(data){
  var secretOrPrivateKey="love" // 这是加密的key（密钥） 
  var content ={msg:"userMsg"} // 要生成token的主题信息
  var token = jwt.sign(content, secretOrPrivateKey, {
      expiresIn: 60*60*24*15  // 15天过期
  })
  // console.log("token ：" +token )
  return token;
}

exports.verifyToken=function(token){
  // var token = rq.body.token || rq.query.token || rq.headers["x-access-token"]; // 从body或query或者header中获取token
  jwt.verify(token, secretOrPrivateKey, function (err, decode) {
    if (err) {  //  时间失效的时候/ 伪造的token          
        rs.json({err:err})
    } else {
      rq.decode = decode; 
      console.log(decode.msg);   // today  is  a  good  day
      next();
    }
})
}