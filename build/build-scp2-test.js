'use strict'
// 引入scp2模块
var client = require('scp2');
// var random = Math.random()
client.scp('./dist/', {
  "host": "192.168.1.191",
  "username": "root",
  "password": "cloudhealth",
  "port": "22",
  "path": "/home/cnhis/tomcat-insurance/webapps/insuranceweb"
}, function(err) {
  if(!err){
    console.log("npm run build-scp2-test: scp2工具上传完毕,远端服务路径：/home/cnhis/tomcat-insurance/webapps/insuranceweb")
  }else{
    console.log("err",err)
  }
})   