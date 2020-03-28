import Vue from 'vue'
import Router from 'vue-router'
// Vue.prototype.Global = Global
import hospitaloutbreakwarning from '@/components/homePage/hospitaloutbreakwarning' // 爆发预警
import hosptialobjectdetection from '@/components/homePage/hosptialobjectdetection' // 报告卡管理
import suspectedinfection from '@/components/homePage/suspectedinfection' // 疑似感染
import infectioncaseinquiry from '@/components/homePage/infectioncaseinquiry' // 感染病例查询
import surveycurrentincidence from '@/components/homePage/surveycurrentincidence' // 现患率调查
import surveyincidence from '@/components/homePage/surveyincidence' // 现患率调查统计
import infectionstatistics from '@/components/homePage/infectionstatistics' // 感染统计
import underreportingcases from '@/components/homePage/underreportingcases' // 医院感染漏报率
import ICUlog from '@/components/homePage/ICUlog' // ICU日志
import clinicalgradeassessment from '@/components/homePage/clinicalgradeassessment' // 临床病情等级评定
import ICUinfectionstatistics from '@/components/homePage/ICUinfectionstatistics' // ICU感染统计
import surgicalinfectiondetection from '@/components/homePage/surgicalinfectiondetection' // 外科手术感染监测
import bacterialmonitoring from '@/components/homePage/bacterialmonitoring' // 耐药菌监测
import antimicrobialmonitoring from '@/components/homePage/antimicrobialmonitoring' // 抗菌药物监测
import reportcard from '@/components/reportcard/index' // 院感检测传染病报告卡管理
import patientinformation from '@/components/patientinformation/index' // 医嘱信息

import Global from '../components/frameWork/Global'
import login from '../components/login/login'

import main from '@/components/homePage/main' // 首页
import home from '@/home' // 保险机构
Vue.prototype.Global = Global
Vue.use(Router)
window.vueRouter = new Router({
  routes: [{
      path: '/home', // 
      name: 'home',
      component: home,
      children: [{
          path: 'hospitaloutbreakwarning', // 爆发预警
          name: 'hospitaloutbreakwarning',
          component: hospitaloutbreakwarning
        },
        {
          path: 'hosptialobjectdetection', // 报告卡管理
          name: 'hosptialobjectdetection',
          component: hosptialobjectdetection
        },
        {
          path: 'suspectedinfection', // 疑似感染
          name: 'suspectedinfection',
          component: suspectedinfection
        },
        {
          path: 'infectioncaseinquiry', // 感染病例查询
          name: 'infectioncaseinquiry',
          component: infectioncaseinquiry
        },
        {
          path: 'surveycurrentincidence', // 现患率调查
          name: 'surveycurrentincidence',
          component: surveycurrentincidence
        },
        {
          path: 'infectionstatistics', // 感染统计
          name: 'infectionstatistics',
          component: infectionstatistics
        },
        {
          path: 'underreportingcases', // 医院感染漏报率
          name: 'underreportingcases',
          component: underreportingcases
        },
        {
          path: 'ICUlog', // ICU日志
          name: 'ICUlog',
          component: ICUlog
        },
        {
          path: 'clinicalgradeassessment', // 临床病情等级评定
          name: 'clinicalgradeassessment',
          component: clinicalgradeassessment
        },
        {
          path: 'ICUinfectionstatistics', // ICU感染统计
          name: 'ICUinfectionstatistics',
          component: ICUinfectionstatistics
        },
        {
          path: 'surgicalinfectiondetection', // 外科手术感染监测
          name: 'surgicalinfectiondetection',
          component: surgicalinfectiondetection
        },
        {
          path: 'surveyincidence', // 现患病率调查统计
          name: 'surveyincidence',
          component: surveyincidence
        },
        {
          path: 'bacterialmonitoring', // 细菌耐药监测
          name: 'bacterialmonitoring',
          component: bacterialmonitoring
        },
        {
          path: 'antimicrobialmonitoring', // 抗菌药物监测
          name: 'antimicrobialmonitoring',
          component: antimicrobialmonitoring
        },
        //   {
        //     path: 'commonparameter', //   公共参数
        //     name: 'commonparameter',
        //     component: commonparameter
        //   },
        {
          path: '/', //   首页
          name: 'main',
          component: main
        }
      ]
    },
    {
      path: '/reportcard', // 院感管理传染病报告卡管理
      name: 'reportcard',
      component: reportcard
    },
    {
      path: '/patientinformation', // 患者信息
      name: 'patientinformation',
      component: patientinformation
    },

    // {
    //   path: 'commonparameter', //   公共参数
    //   name: 'commonparameter',
    //   component: commonparameter
    // },
    {
      path: '/login',
      name: 'login',
      component: login
    }
  ]
})
let _this = this

export default vueRouter
