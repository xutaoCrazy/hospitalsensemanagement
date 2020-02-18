import Vue from 'vue'
import Router from 'vue-router'
// Vue.prototype.Global = Global
import patientmanagment from '@/components/homePage/patientmanagment' // 病人管理
import patientcharge from '@/components/homePage/patientcharge' // 门诊收费退费
import Global from '../components/frameWork/Global'
import login from '../components/login/login'
import patientinformation from '@/components/homepage/patientinformation' // 机构信息
import patientItems from '@/components/homepage/patientItems' // 保险收费项目
import patientchangeItems from '@/components/homepage/patientchangeItems' // 保险收费项目对应
import patientbasicdictionary from '@/components/homePage/patientbasicdictionary' // 基础字典
import patientdiseasecatalogue from '@/components/homePage/patientdiseasecatalogue' // 疾病目录
import patientInstitutions from '@/components/homePage/patientInstitutions' // 保险机构
import cataloguequery from '@/components/homePage/cataloguequery' // 目录查询
import pharmaceuticalcatalogue from '@/components/catalogTpl/pharmaceuticalcatalogue' // 药品目录
import directorypairing from '@/components/homePage/directorypairing' // 目录对码
import transactionmanagement from '@/components/homePage/transactionmanagement' // 门诊交易管理
import outpatientspecialpatients from '@/components/homePage/outpatientspecialpatients' // 门诊特殊病人
import Inpatientmanagement from '@/components/homePage/Inpatientmanagement' // 住院患者管理
import countercode from '@/components/homePage/countercode' // 自动对码
import directorypage from '@/components/directory/index' // 目录对码药品目录
import commonparameter from '@/components/homePage/commonparameter' // 公共参数
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
          path: 'patientmanagment', // 病人管理
          name: 'patientmanagment',
          component: patientmanagment
        },
        {
          path: 'patientcharge', // 门诊收费退费
          name: 'patientcharge',
          component: patientcharge
        },
        {
          path: 'patientinformation', // 机构信息
          name: 'patientinformation',
          component: patientinformation
        },
        {
          path: 'patientItems', // 保险收费项目
          name: 'patientItems',
          component: patientItems
        },
        {
          path: 'patientchangeItems', // 保险收费项目对应
          name: 'patientchangeItems',
          component: patientchangeItems
        },
        {
          path: 'patientbasicdictionary', // 基础字典
          name: 'patientbasicdictionary',
          component: patientbasicdictionary
        },
        {
          path: 'patientdiseasecatalogue', // 疾病目录
          name: 'patientdiseasecatalogue',
          component: patientdiseasecatalogue
        },
        {
          path: 'patientInstitutions', // 保险机构
          name: 'patientInstitutions',
          component: patientInstitutions
        },
        {
          path: 'cataloguequery', // 目录查询
          name: 'cataloguequery',
          component: cataloguequery
        },
        {
          path: 'directorypairing', // 目录对码
          name: 'directorypairing',
          component: directorypairing
        },
        {
          path: 'countercode', // 自动对码
          name: 'countercode',
          component: countercode
        },
        {
          path: 'transactionmanagement', //   门诊交易管理
          name: 'transactionmanagement',
          component: transactionmanagement
        },
        {
          path: 'outpatientspecialpatients', //   门诊特殊病人
          name: 'outpatientspecialpatients',
          component: outpatientspecialpatients
        },
        {
          path: 'Inpatientmanagement', //   住院患者管理
          name: 'Inpatientmanagement',
          component: Inpatientmanagement
        },
        {
          path: 'commonparameter', //   公共参数
          name: 'commonparameter',
          component: commonparameter
        },
        {
          path: '/', //   首页
          name: 'main',
          component: main
        }
      ]
    },
    {
      path: '/patientmanagment', // 病人管理
      name: 'patientmanagment',
      component: patientmanagment
    },
    {
      path: '/patientcharge', // 门诊收费退费
      name: 'patientcharge',
      component: patientcharge
    },
    {
      path: '/patientinformation', // 机构信息
      name: 'patientinformation',
      component: patientinformation
    },
    {
      path: '/patientItems', // 保险收费项目
      name: 'patientItems',
      component: patientItems
    },
    {
      path: '/patientchangeItems', // 保险收费项目对应
      name: 'patientchangeItems',
      component: patientchangeItems
    },
    {
      path: '/patientbasicdictionary', // 基础字典
      name: 'patientbasicdictionary',
      component: patientbasicdictionary
    },
    {
      path: '/patientdiseasecatalogue', // 疾病目录
      name: 'patientdiseasecatalogue',
      component: patientdiseasecatalogue
    },
    {
      path: '/cataloguequery', // 目录查询
      name: 'cataloguequery',
      component: cataloguequery
    },
    {
      path: '/pharmaceuticalcatalogue', // 药品目录
      name: 'pharmaceuticalcatalogue',
      component: pharmaceuticalcatalogue
    },
    {
      path: '/patientInstitutions', // 保险机构
      name: 'patientInstitutions',
      component: patientInstitutions
    },
    {
      path: '/directorypairing', // 目录对码
      name: 'directorypairing',
      component: directorypairing
    },
    {
      path: '/directorypage', // 目录对码
      name: 'directorypage',
      component: directorypage
    },
    {
      path: '/countercode', // 自动对码
      name: 'countercode',
      component: countercode
    },
    {
      path: '/transactionmanagement', // 门诊交易管理
      name: 'transactionmanagement',
      component: transactionmanagement
    },
    {
      path: 'outpatientspecialpatients', //   门诊特殊病人
      name: 'outpatientspecialpatients',
      component: outpatientspecialpatients
    },
    {
      path: 'Inpatientmanagement', //   住院患者管理
      name: 'Inpatientmanagement',
      component: Inpatientmanagement
    },
    {
      path: 'commonparameter', //   公共参数
      name: 'commonparameter',
      component: commonparameter
    }, {
      path: '/login',
      name: 'login',
      component: login
    }
  ]
})
let _this = this

export default vueRouter
