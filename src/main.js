// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import ElementUI from 'element-ui'
import VueAxios from 'vue-axios'
import router from './router'
import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap/dist/js/bootstrap.js'
import 'element-ui/lib/theme-chalk/index.css'
import '@/index.scss'
import axios from '@/service/http'
import store from '@/store'

import {
  dateFormat,
  moment,
  notFormat,
  loadings,
  closeLoading
} from '@/service/api/dateFormat'
Vue.prototype.$moment = moment //  传参 需要的 (val,index)   val  需要个格式化的时间   index : ''  YYYY-MM-DD HH:mm:ss  true : YYYY-MM-DD 
Vue.prototype.dateFormat = dateFormat // 格式化时间
Vue.prototype.notFormat = notFormat //  是否转换
Vue.prototype.loadings = loadings //  加载中
Vue.prototype.closeLoading = closeLoading //  取消加载中
Vue.config.productionTip = false
Vue.use(ElementUI)
Vue.use(VueAxios, axios)

new Vue({
  router,
  store,
  components: {
    App
  },
  template: '<App/>'
}).$mount('#app')
