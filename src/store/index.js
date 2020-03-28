import Vue from 'vue'
import Vuex from 'vuex'
import moment from 'moment'
Vue.use(Vuex)
export default new Vuex.Store({
  state: {
    sideCollapse: false,
    trueName: '', //
    systemVer: '', //版本号
    parameterArray: '', //医院名称
    baseHospitalid: '', //默认选中
    loginFilters: '',
    loginName: '',
    centerurl: '',
    bck03: '',
    loginTime: '',
    userId: '',
    jsessionids: '',
    jsonpFlag: false,
    btnCode: [],
    ceshi: '',
    doctorUrl: '',
    baseHospitalid: '',
    employeeId: '',
    insuBaseUrl: '',
    insuLocalBaseUrl: '',
    tabsParms: [{
      index: 1,
      id: 1,
      item: "首页",
      fold: false,
      noChild: true,
      path: "/home",
      logo: "menu-item-logo"
    }, ],
    tabsIndex: {
      index: 1,
      id: 1,
      item: "首页",
      fold: false,
      noChild: true,
      path: "/home",
      logo: "menu-item-logo"
    }
  },
  mutations: {
    ceshi2(state, bool) {
      state.ceshi = bool
    },
    setSideCollapse(state, bool) {
      state.sideCollapse = bool
    },
    trueName(state, name) { //当前登录人
      state.trueName = name
    },
    systemVer(state, name) { //版本号
      state.systemVer = name
    },
    baseHospitalid(state, name) { //默认医院
      state.baseHospitalid = name
    },
    parameterArray(state, name) { //医院名称
      state.parameterArray = name

    },
    loginFilters(state, name) { //
      state.loginFilter = name

    },
    loginName(state, name) { // 登录人编码
      state.loginName = name

    },
    centerurl(state, name) { //控制中心url
      state.centerurl = name
    },
    bck03(state, name) { //科室
      state.bck03 = name
    },
    doctorUrl(state, name) { //医生站地址
      state.doctorUrl = name
    },
    employeeId(state, name) { //登录人id
      state.employeeId = name
    },

    loginTimes(state, name) { //登陆时间
      state.loginTime = moment(parseFloat(name)).format(
        "YYYY-MM-DD HH:mm:ss"
      )
    },
    userId(state, name) { //登录人ID
      state.userId = name
    },
    jsessionids(state, name) { //jsessionids
      state.jsessionids = name
    },
    jsonpFlags(state, flag) {
      state.jsonpFlag = flag
    },
    btnCodes(state, btnCode) {
      state.btnCode = btnCode
    },
    tabsArr(state, name) {
      debugger
      if (name == 1) { //关闭全部选项卡
        state.tabsParms = []
        state.tabsParms.push({
          index: 1,
          id: 1,
          item: "首页",
          fold: false,
          noChild: true,
          path: "/home",
          logo: "menu-item-logo"
        })
        this.$router.push({
          path: state.tabsParms[0].path
        })
      } else if (name.clear) {
        name.clear = false
        delete name['clear']
        state.tabsParms = state.tabsParms.filter((e => {
          return e.id !== name.id
        }))

      } else {
        state.tabsParms.push(name)
      }

    },
    tabsIndexs(state, name) {

      state.tabsIndex = name
    },
  },
  actions: {

  },
})
