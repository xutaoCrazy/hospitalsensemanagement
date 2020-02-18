<template>
  <div class="gray-bg loginInfo">
    <div  class="loginPageLogo"><img class="loginPageLogo" src="../../assets/img/login_header.png"></div>
    <div class=" middle-box text-center loginscreen  animated fadeInDown">
      <!--action="index.html"-->
      <form class="m-t" role="form">
        <div class="form-group">
          <el-select  v-model="value" @change="hospitalChange(value)" class="select-hospital login-form-select" placeholder="请选择">
            <el-option
              v-for="item in options"
              :key="item.value"
              :label="item.label"
              :value="item.value">
            </el-option>
          </el-select>
        </div>
        <!--loginIputWrap-->
        <div class="form-group form-group-input" style="position: relative;">
          <img style="position: absolute;z-index: 100;font-size: 20px;top: 10px;left: 10px;" src="../../assets/img/yhm.png"/>
          <el-input v-model="username" type="text" placeholder="用户名"></el-input>
        </div>
        <div class="form-group form-group-input"  style="position: relative">
          <img style="position: absolute;z-index: 100;font-size: 20px;top: 10px;left: 10px;" src="../../assets/img/mima.png"/>
          <el-input v-model="password" type="password" placeholder="密码"></el-input>
        </div>
        <div class="remember-user">
          <el-checkbox v-model="checked">记住用户名</el-checkbox>
        </div>
        <div @click="submint()" class="btn btn-primary block  m-b login">登 录</div>
        <!--<p class="text-muted text-center"> <a href="login.html#"><small>忘记密码了？</small></a> | <a href="register.html">注册一个新账号</a>-->
        <!--</p>-->
      </form>
    </div>
  </div>

</template>
<script>
import axios from 'axios'
// import Qs from 'qs'

export default {
  name: 'login',
  data () {
    return {
      username: '',
      password: '',
      options: [],
      value: '',
      checked: true,
      dbstyle: ''
    }
  },
  props: {userAuthority: Object},
  methods: {
    hospitalChange (value) {
      for (let i = 0; i < this.options.length; i++) {
        if (this.options[i].value === value) {
          this.dbstyle = this.options[i].lable
          break
        }
      }
    },
    submint () {
      let _this = this
      _this.checked ? localStorage.setItem('userName', this.username) : localStorage.removeItem('userName')
      _this.httpServe(_this.Global.baseUrl + '/login', {
        dbstyle: this.dbstyle,
        // dbstyle:'db2',
        user: this.username,
        password: this.password}, 'post', 'formData').then(response => {
        if (response.data) {
          _this.Global.userAuthority.status = true
          let userAuthority = {
            userAuthority: true,
            userName: _this.username,
            hospitalName: _this.value,
            baseData: response.data
          }
          _this.Global.setUserAuthority(userAuthority)
          // vueRouter.push({path: '/homePage/首页'})
          // vueRouter.replace({path :'/homePage'})
          // location.reload()
        } else {
          _this.Global.userAuthority.status = false
          this.$notify.error({
            title: '错误',
            message: '账号或密码输入有误'
          })
        }
        return response.data
      }).catch(error => {
        this.userAuthority.status = false
        this.$message({
          message: error,
          type: 'warning'
        })
      }).then(data => {
        _this.httpServe(_this.Global.baseUrl + '/sys/config', {jessionId: data.jessionids}, 'get').then(response => {
          sessionStorage.setItem('baseUrl2', response.data.emrUrl)
          sessionStorage.setItem('baseUrl3', response.data.emrUrl.substr(0, response.data.emrUrl.lastIndexOf('/emrweb')))
          _this.Global.baseUrl2 = response.data.emrUrl
          _this.Global.baseUrl3 = response.data.emrUrl.substr(0, response.data.emrUrl.lastIndexOf('/emrweb'))
        }
        )
      })
    },
    init () {
      // 读取用户名
      this.username = localStorage.getItem('userName')
      // 获取医院列表数据
      this.options = []
      axios.get(this.Global.baseUrl + '/getdbList').then(response => {
        let dataList = response.data.data.dblist
        for (let i = 0; i < dataList.length; i++) {
          if (i === 1) {
            this.value = dataList[i].shortname
            this.dbstyle = dataList[i].dbstyle
          }
          let obj = {}
          obj.value = dataList[i].shortname
          obj.lable = dataList[i].dbstyle
          this.options.push(obj)
        }
      })
      // this.httpServe(this.Global.baseUrl + '/sys/config',{},'get')
    }
  },
  mounted: function () {
    this.init()
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style >
  .gray-bg {
    min-height: 954px;
    text-align: center;
    margin-top: -16px;
    padding-top: 180px;
    position: relative;
    /*background-color: #f9f9f9;*/
    background-image: url('../../assets/img/bg.jpg');
    background-repeat: no-repeat;
    background-size: 100% 100%;
    -moz-background-size: 100% 100%;
  }
  .loginPageLogo {
    position: absolute;
    left: 20px;
    top: 20px;
  }
    .form-group-input{
      width: 400px;

    }
  .middle-box {
    z-index: 100;
    margin: 0 auto;
    width: 600px;
    height: 400px;
    position: relative;
    background: url("../../assets/img/login_bgkuang.png");
    background-size: 100% 100%;
  }

  .middle-box h1 {
    font-size: 170px;
  }

  .logo-name {
    color: #e6e6e6;
    font-size: 180px;
    font-weight: 800;
    letter-spacing: -10px;
    margin-bottom: 0;
  }
  .loginInfo .el-input__inner{
    height:50px;
    width:400px;
    color:#fff;
    border: none;
    background:  rgba(60, 131, 247, 0.25);
  }
  .login-form-select ul.el-select-dropdown__list  li{
    background:  rgba(60, 131, 247, 0.25);
  }
  .loginInfo .form-group-input .el-input__inner {
    text-indent: 30px;
    color:#fff;
  }
  .login{
    height:50px;
    width:400px;
    background-color:rgb(60,131,247)!important
  }
  .loginInfo .el-select-dropdown__empty, .loginInfo  .el-select-dropdown__list{
    width:400px;
  }
  .loginInfo .el-input__suffix{
     left: 370px;
  }
  .loginInfo  .login{
    height: 40px;
    line-height: 29px;
  }
  .yhm{
  }
  .remember-user{
    text-align: left;
    margin-bottom: 5px;
  }
  .remember-user .el-checkbox__label{
    color:rgb(35,157,138)!important
  }
  .loginIputStyle {
    width: 460px;
    box-shadow: 0 0 0 1000px rgba(0, 0, 0, 0) inset !important;
    border: 0px;
    color: red;
    border-radius: 2px;
    border: 0px;
    -webkit-box-shadow: 0 0 0 1000px rgba(0, 0, 0, 0) inset !important;
    background: rgba(0, 0, 0, 0);
  }

  .loginIputWrap {
    width: 460px;
    height: 60px !important;
    /*background: rgba(60, 131, 247, 0.25);*/
    border-radius: 10px;
  }

  h3, h4, h5 {
    margin-top: 5px;
    font-weight: 600;
  }

  h3 {
    font-size: 16px;
  }

  h1, h2, h3, h4, h5, h6 {
    font-weight: 100;
  }

  .m-t {
    margin-top: 70px;
    width: 300px;
    position: absolute;
    left: 100px;
  }

  .text-center {
    text-align: center;
  }

  .form-group {
    margin-bottom: 15px;
  }

  .select-hospital {
    width: 300px !important;
  }

  .form-control, .single-line {
    background-color: #FFF;
    background-image: none;
    border: 1px solid #d8d8d8;
    border-radius: 1px;
    color: inherit;
    display: block;
    padding: 6px 12px;
    -webkit-transition: border-color .15s ease-in-out 0s, box-shadow .15s ease-in-out 0s;
    transition: border-color .15s ease-in-out 0s, box-shadow .15s ease-in-out 0s;
    width: 100%;
    font-size: 14px;
  }

  .form-control {
    box-shadow: none;
  }

  .form-group {
    margin-bottom: 15px;
  }

  .m-b {
    margin-bottom: 15px;
  }

  .full-width {
    width: 100% !important;
  }

  .btn-primary {
    background-color: #0494d3;
    border-color: #0494d3;
    color: #FFF;
  }

  .btn {
    border-radius: 3px;
  }

  .text-muted {
    color: #888;
  }

</style>
