import axios from 'axios'
import store from '@/store'
import url from 'postcss-url'
// import router from '@/router'
// import Cookies from 'vue-cookie'
// axios 配置
axios.defaults.baseURL = '/insuranceweb'
axios.defaults.headers.post['Content-Type'] = 'application/json;charset=utf-8'
// const token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwidXNlcm5hbWUiOiJhZG1pbiIsInBhc3N3b3JkIjoiJDJhJDEwJHAxWEh3Q2ZFR1pmeDJIRU81bXFJZy4uZUhHUWVydEEweWgzR09RQjE5MEtNclBkU3FucVkuIiwicm9sZSI6ImFkbWluIiwiZGF0YSI6IiIsImV4cCI6MTU1OTkwODg2OCwiaWF0IjoxNTU3MzE2ODY4LCJpc3MiOiJtYW5hZ2VyX2JhY2tlbmQiLCJzdWIiOiIxIn0.MlgEk8Pwm7e55ttpn2awU0GyYG5wc5qTxy2-Cy3L6wg'
// Cookies.set('token', token, 1)
// axios.defaults.headers.common['token'] = Cookies.get('token')
// http response 拦截器
/* eslint consistent-return: [0, { "treatUndefinedAsUnspecified": false }] */
axios.interceptors.response.use(response => response, (error) => {
  if (error.response) {
    switch (error.response.status) {
      case 401:
        // router.replace({
        //   path: '/login'
        // })
        break
      default:
        break
    }
    return Promise.reject(error.response.data)
  }
})
// 拦截器中处理公共参数
axios.interceptors.request.use(
  config => {
    let url = config.url
    // get参数编码
    if (config.method === 'get' && config.params && url.indexOf('jseesionids') < 0) {
      if (url.indexOf('?') < 0) {
        url += '?'
      } else {
        url += '&'
      }
      let keys = Object.keys(config.params)
      for (let key of keys) {
        // console.log(config.params[key])
        if('object'!=typeof config.params[key]){
          url += `${key}=${encodeURIComponent(config.params[key])}&`
        }else{
          url += `${key}=${encodeURIComponent(JSON.stringify(config.params[key]))}&`
        }
      }
      url = url.substring(0, url.length - 1)
      config.params = {}
    }
    if (url.indexOf('jessionids') < 0) {
      url = handlePubParams(url)
    }
    config.url = url
    return config
  })
function handlePubParams (url) {
  if (url.indexOf('jsessionids') < 0 && !url.endsWith('/')) {
    if (url.indexOf('?') < 0) {
      url += '?jsessionids=' + store.state.jsessionids
    } else {
      url += '&jsessionids=' + store.state.jsessionids
    }
  } else if (url.indexOf('jsessionids') > -1 && url.indexOf('?') > -1) {
    var urls = url.split('?')
    var params = urls[1].split('&')
    for (var param in params) {
      if (param.indexOf('jessiionids')) {
        var dic = param.split('=')
        dic[1] = dic[1] ? dic[1] : store.state.jsessionids
        param = dic.join('=')
      }
    }
    urls[1] = params.join('&')
    url = urls.join('?')
  }
  return url
}
export default axios
