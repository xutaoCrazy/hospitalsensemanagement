import {
  insurance
} from '@/yibao/insuranceconfig'
import {
  tools
} from '@/yibao/tools/tools'
import {
  medicalInsuranceCardAJax
} from '@/service/api/InstitutionInterface'
import store from '@/store'
insurance.tools = tools
var commonApiObjects = new Array()
var commonApiObject = {
  Success: '1',
  Fail: '0',
  errMsg: "入参 'insuranceSystem'不可为空",
  apiId: 'api',
  code: -1,
  UN_INIT_STATE: -1, // 医保未初始化状态
  INIT_STATE: 0, // 医保已初始化状态
  initCommonParam: function (commonParam) {
    if (this.isNull(arguments) || !this.isJson(arguments[0])) {
      return commonApiObject.formatFail('页面参数初始化失败，请使用正确格式参数进行操作！')
    }
    this.commonParam = commonParam || {}
  },
  initExternalFeeSystem: function (param) {
    // 因为没有院区概念，所以直接加载数据库中有效的医保类型配置
    // insurance.config.baseInfo.insurancePubInfo.insuTypeCode="HOSI5101001";
    // insurance.config.baseInfo.insurancePubInfo.insuTypeId=31;
    setTimeout(function () {
      var initResult = commonApiObject.init($.extend(param, insurance.config.baseInfo.insurancePubInfo))
      if (initResult.code == commonApiObject.Fail) {
        console.log(initResult.errMsg)
      }
    }, 500)
  },
  init: function (params) {
    var callResult
    if (commonApiObject.code > -1) {
      return commonApiObject.formatSuccess('医保已初始化，无需再次初始化')
    }
    // 获取保险系统参数信息
    callResult = commonApiObject.initMedicalInsuranceParams(params)
    if (callResult.code == '0') {
      return callResult
    }
    // 初始化医保环境
    callResult = commonApiObject.initCommonParam()
    return callResult
  },
  initMedicalInsuranceParams: function (params) {
    var callResult = commonApiObject.formatSuccess('保险系统参数信息获取成功')
    console.log("insuBaseUrl=" + insurance.config.baseInfo.insCommonParams.hisBaseUrl)
    var _url = insurance.config.baseInfo.insCommonParams.hisBaseUrl + 'his/hoinsurance/ins/common/params'
    params = params
    console.log(tools)
    tools.getSynchAjax(_url, params, function (data) {
      if (data.list && data.list.length < 0) {
        commonApiObject.formatFail('获取保险系统参数信息失败')
      }
      // 拿到后台的配置后，循环去配置
      // insurance.config.baseInfo.insCommonParams.jsPath=data.list[0].scripts_url;
      callResult = commonApiObject.loadEfsDependency(data.list)
    }, function (data) {
      debugger
      if (data.code == '12000') {
        callResult = commonApiObject.formatFail('获取保险系统参数信息失败')
      } else {
        callResult = commonApiObject.formatFail(data.resultMsg)
      }
    })
    return callResult
  },
  loadEfsDependency: function (list) {
    debugger
    //   var urlList = scriptUrlStr.split(",");
    for (var i = 0; i < list.length; i++) {
      var url = ''
      if (!list[i].iaa1a02 || list[i].iaa1a02 == '') {
        continue
      }
      if (list[i].iaa1a02.indexOf('.js') > -1) {
        url = list[i].iaa1a02
      } else {
        url = list[i].iaa1a02 + '.js'
      }
      if (url) {
        url = insurance.config.baseInfo.insCommonParams.hisResourceUrl + 'js/yibao/' + url
        this.addScript(url, list[i])
      }
    }
  },
  addScript: function (jsfile, item) {
    var script = document.createElement('script')
    script.type = 'text/javascript'
    script.src = jsfile
    script.async = false
    document.getElementsByTagName('head')[0].appendChild(script)
    script.onload = script.onreadystatechange = function (e) {
      if (e.type == 'load') {
        console.log('加载完毕')
        insurance.api.configBean(item)
        console.log(insurance)
        $(window).trigger('insuReady')
      }
    }
  },
  loadParams: function (params, checkDataOptions) {
    var callResult = commonApiObject.formatSuccess('参数校验通过')
    try {
      if (commonApiObject.checkChargeParams(params, checkDataOptions)) {
        commonApiObject.chargeParams = $.extend(commonApiObject.chargeParams, params)
      }
    } catch (e) {
      callResult = this.formatFail(e)
    }
    return callResult
  },

  loadParamsCn: function (params, checkDataOptions) {
    var callResult = commonApiObject.formatSuccess('参数校验通过')
    try {
      if (commonApiObject.checkChargeParamsCn(params, checkDataOptions)) {
        commonApiObject.chargeParams = $.extend(commonApiObject.chargeParams, params)
      }
    } catch (e) {
      callResult = this.formatFail(e)
    }
    return callResult
  },
  checkChargeParams: function (checkData, checkDataName) {
    var baseParameter = []
    if (checkDataName != null && undefined != checkDataName && checkDataName.constructor == Array) {
      baseParameter = baseParameter.concat(checkDataName)
    }

    if (checkData == null || undefined == checkData) {
      throw '请求入参未传.'
    }

    for (var i in baseParameter) {
      if (!commonApiObject.isJsonObjectCheck(checkData, baseParameter[i])) {
        throw '【 ' + baseParameter[i] + ' 】参数未传或者为空.'
      }
    }

    return true
  },

  checkChargeParamsCn: function (checkData, checkDataName) {
    var baseParameter = []
    if (checkDataName != null && undefined != checkDataName && checkDataName.constructor == Array) {
      baseParameter = baseParameter.concat(checkDataName)
    }

    if (checkData == null || undefined == checkData) {
      throw '请求入参未传.'
    }

    for (var i in baseParameter) {
      if (!commonApiObject.isJsonObjectCheck(checkData, baseParameter[i]['name'])) {
        throw '【 ' + baseParameter[i]['msg'] + ' 】.'
      }
    }

    return true
  },
  initCommonParam: function () {
    return commonApiObject.formatSuccess('医保环境初始化成功')
  },
  getapiJsFile: function (parms) {
    return apiJsFile[parms.insuranceSystem]
  },

  loadJs: function (sid, jsurl, callback) {
    var nodeHead = document.getElementsByTagName('head')[0]
    var nodeScript = null
    if (document.getElementById(sid) == null) {
      nodeScript = document.createElement('script')
      nodeScript.setAttribute('type', 'text/javascript')
      nodeScript.setAttribute('src', jsurl)
      nodeScript.setAttribute('id', sid)
      if (callback != null) {
        nodeScript.onload = nodeScript.onreadystatechange = function () {
          if (nodeScript.ready) {
            return false
          }
          if (!nodeScript.readyState || nodeScript.readyState == 'loaded' || nodeScript.readyState == 'complete') {
            nodeScript.ready = true
            callback()
          }
        }
      }
      nodeHead.appendChild(nodeScript)
    } else {
      if (callback != null) {
        callback()
      }
    }
  },

  checkInsuranceSystem: function (parms) {
    if (parms.insuranceSystem == null || parms.insuranceSystem == '') {
      return false
    }
    return true
  },

  checkCommonParameters: function (checkData, checkDataName) {
    var baseParameter = []
    if (checkDataName != null && undefined != checkDataName && checkDataName.constructor == Array) {
      baseParameter = baseParameter.concat(checkDataName)
    }

    if (checkData == null || undefined == checkData) {
      throw '请求入参未传.'
    }

    for (let i in baseParameter) {
      if (!commonApiObject.isJsonObjectCheck(checkData, baseParameter[i])) {
        throw '【 ' + baseParameter[i] + ' 】参数未传或者为空.'
      }
    }

    return true
  },
  isJsonObjectCheck: function (jsonObj, key) {
    if (!commonApiObject.isJson(jsonObj)) {
      return false
    }

    for (name in jsonObj) {
      if (name == key) {
        if (commonApiObject.isNull(jsonObj[name])) {
          return false
        }
        return true
      }
    }
    return false
  },
  configBean: function (item) {
    if (!!item && item.iaa1a04 && item.iaa1a04 != '') {
      commonApiObjects[item.iaa02] = eval(item.iaa1a04)
    }
    if (commonApiObjects.length == 0) {
      commonApiObjects['HOSI5101001'] = apiHOSI5101001Object || null // 成都医保
    }
  },
  getBean: function (parms) {
    commonApiObject.configBean()
    return commonApiObjects[parms.insuTypeCode]
  },
  formatFail: function (msg) {
    var checkResult = {
      code: commonApiObject.Fail,
      errMsg: commonApiObject.isNull(msg) ? '失败' : msg,
      data: []
    }
    return checkResult
  },
  formatSuccess: function (msg, data) {
    var checkResult = {
      code: commonApiObject.Success,
      errMsg: commonApiObject.isNull(msg) ? '成功' : msg,
      data: commonApiObject.isNull(data) ? [] : data
    }
    return checkResult
  },
  isNull: function (data) {
    return !!((data == '' || data == undefined || data == null))
  },
  isJson: function (obj) {
    return typeof (obj) === 'object' && Object.prototype.toString.call(obj).toLowerCase() == '[object object]' && !obj.length
  },
  plusCommonParam: function (parms) {
    var readCardParms = 'readCardParms'
    var djParms = 'djParms'
    var mxParms = 'mxParms'
    var prechargeParms = 'prechargeParms'
    var upCompParms = 'upCompParms'
    for (var item in parms) {
      if (item == readCardParms) {
        $.extend(parms.readCardParms, this.commonParam)
      } else if (item == djParms) {
        $.extend(parms.djParms, this.commonParam)
      } else if (item == mxParms) {
        if ((typeof parms.mxParms === 'object') && parms.mxParms.constructor == Array) {
          for (var i = 0; i < parms.mxParms.length; i++) {
            $.extend(parms.mxParms[i], this.commonParam)
          }
        } else {
          $.extend(parms.mxParms, this.commonParam)
        }
      } else if (item == prechargeParms) {
        $.extend(parms.prechargeParms, this.commonParam)
      } else if (item == upCompParms) {
        if ((typeof parms.upCompParms === 'object') && parms.upCompParms.constructor == Array) {
          for (var i = 0; i < parms.upCompParms.length; i++) {
            $.extend(parms.upCompParms[i], this.commonParam)
          }
        } else {
          $.extend(parms.upCompParms, this.commonParam)
        }
      }
    }
  },
  downloadMedical: function (parms) {
    parms = $.extend(parms, insurance.config.baseInfo, insurance.config.dictionary.tradeCodeMap.PUB_SING_IN) || {}
    var callResult = {}
    try {
      // 药品下载
      if (this.checkCommonParameters(parms.insurancePubInfo)) {
        var api = commonApiObject.getBean(parms.insurancePubInfo)
        callResult = api.downloadMedical(parms)
      } else {
        callResult = this.formatFail(this.errMsg)
      }
    } catch (e) {
      callResult = this.formatFail(e)
    }
    return callResult
  },
  uploadMedicalComp: function (parms) {
    parms = $.extend(parms, insurance.config.baseInfo, insurance.config.dictionary.tradeCodeMap.PUB_SING_IN) || {}
    //				this.plusCommonParam(parms);
    var callResult = {}
    try {
      // 药品对照上传
      if (this.checkCommonParameters(parms.insurancePubInfo)) {
        var api = commonApiObject.getBean(parms.insurancePubInfo)
        callResult = api.uploadMedicalComp(parms)
      } else {
        callResult = this.formatFail(this.errMsg)
      }
    } catch (e) {
      callResult = this.formatFail(e)
    }
    return callResult
  },
  downloadMedicalComp: function (parms) {
    parms = $.extend(parms, insurance.config.baseInfo, insurance.config.dictionary.tradeCodeMap.PUB_SING_IN) || {}
    var callResult = {}
    try {
      // 药品对照审核状态下载
      if (this.checkCommonParameters(parms.insurancePubInfo)) {
        var api = commonApiObject.getBean(parms.insurancePubInfo)
        callResult = api.downloadMedicalComp(parms)
      } else {
        callResult = this.formatFail(this.errMsg)
      }
    } catch (e) {
      callResult = this.formatFail(e)
    }
    return callResult
  },
  revokeMedicalComp: function (parms) {
    parms = $.extend(parms, insurance.config.baseInfo, insurance.config.dictionary.tradeCodeMap.PUB_SING_IN) || {}
    var callResult = {}
    try {
      // 药品对照撤销
      if (this.checkCommonParameters(parms.insurancePubInfo)) {
        var api = commonApiObject.getBean(parms.insurancePubInfo)
        callResult = api.revokeMedicalComp(parms)
      } else {
        callResult = this.formatFail(this.errMsg)
      }
    } catch (e) {
      callResult = this.formatFail(e)
    }
    return callResult
  },
  downloadChargeItem: function (parms) {
    parms = $.extend(parms, insurance.config.baseInfo, insurance.config.dictionary.tradeCodeMap.PUB_SING_IN) || {}
    var callResult = {}
    try {
      // 收费项目下载
      if (this.checkCommonParameters(parms.insurancePubInfo)) {
        var api = commonApiObject.getBean(parms.insurancePubInfo)
        callResult = api.downloadChargeItem(parms)
      } else {
        callResult = this.formatFail(this.errMsg)
      }
    } catch (e) {
      callResult = this.formatFail(e)
    }
    return callResult
  },
  uploadChargeItem: function (parms) {
    parms = $.extend(parms, insurance.config.baseInfo, insurance.config.dictionary.tradeCodeMap.PUB_SING_IN) || {}
    //				this.plusCommonParam(parms);
    var callResult = {}
    try {
      // 收费项目对照上传
      if (this.checkCommonParameters(parms.insurancePubInfo)) {
        var api = commonApiObject.getBean(parms.insurancePubInfo)
        callResult = api.uploadChargeItem(parms)
      } else {
        callResult = this.formatFail(this.errMsg)
      }
    } catch (e) {
      callResult = this.formatFail(e)
    }
    return callResult
  },
  downloadChargeItemComp: function (parms) {
    parms = $.extend(parms, insurance.config.baseInfo, insurance.config.dictionary.tradeCodeMap.PUB_SING_IN) || {}
    var callResult = {}
    try {
      // 收费项目对照审核状态下载
      if (this.checkCommonParameters(parms.insurancePubInfo)) {
        var api = commonApiObject.getBean(parms.insurancePubInfo)
        callResult = api.downloadChargeItemComp(parms)
      } else {
        callResult = this.formatFail(this.errMsg)
      }
    } catch (e) {
      callResult = this.formatFail(e)
    }
    return callResult
  },

  uploadMedicalCompEdit: function (parms) {
    parms = $.extend(parms, insurance.config.baseInfo, insurance.config.dictionary.tradeCodeMap.PUB_SING_IN) || {}
    //				this.plusCommonParam(parms);
    var callResult = {}
    try {
      // 收费项目对照修改
      if (this.checkCommonParameters(parms.insurancePubInfo)) {
        var api = commonApiObject.getBean(parms.insurancePubInfo)
        callResult = api.uploadMedicalCompEdit(parms)
      } else {
        callResult = this.formatFail(this.errMsg)
      }
    } catch (e) {
      callResult = this.formatFail(e)
    }
    return callResult
  },

  uploadMedicalDisable: function (parms) {
    parms = $.extend(parms, insurance.config.baseInfo, insurance.config.dictionary.tradeCodeMap.PUB_SING_IN) || {}
    //				this.plusCommonParam(parms);
    var callResult = {}
    try {
      // 收费项目对照停用
      if (this.checkCommonParameters(parms.insurancePubInfo)) {
        var api = commonApiObject.getBean(parms.insurancePubInfo)
        callResult = api.uploadMedicalDisable(parms)
      } else {
        callResult = this.formatFail(this.errMsg)
      }
    } catch (e) {
      callResult = this.formatFail(e)
    }
    return callResult
  },
  revokeChargeItem: function (parms) {
    parms = $.extend(parms, insurance.config.baseInfo, insurance.config.dictionary.tradeCodeMap.PUB_SING_IN) || {}
    var callResult = {}
    try {
      // 收费项目对照撤销
      if (this.checkCommonParameters(parms.insurancePubInfo)) {
        var api = commonApiObject.getBean(parms.insurancePubInfo)
        callResult = api.revokeChargeItem(parms)
      } else {
        callResult = this.formatFail(this.errMsg)
      }
    } catch (e) {
      callResult = this.formatFail(e)
    }
    return callResult
  },
  downloadServiceItem: function (parms) {
    parms = $.extend(parms, insurance.config.baseInfo, insurance.config.dictionary.tradeCodeMap.PUB_SING_IN) || {}
    var callResult = {}
    try {
      // 服务设施下载
      if (this.checkCommonParameters(parms.insurancePubInfo)) {
        var api = commonApiObject.getBean(parms.insurancePubInfo)
        callResult = api.downloadServiceItem(parms)
      } else {
        callResult = this.formatFail(this.errMsg)
      }
    } catch (e) {
      callResult = this.formatFail(e)
    }
    return callResult
  },
  uploadServiceItem: function (parms) {
    parms = $.extend(parms, insurance.config.baseInfo, insurance.config.dictionary.tradeCodeMap.PUB_SING_IN) || {}
    var callResult = {}
    try {
      // 服务设施对照上传
      if (this.checkCommonParameters(parms.insurancePubInfo)) {
        var api = commonApiObject.getBean(parms.insurancePubInfo)
        callResult = api.uploadServiceItem(parms)
      } else {
        callResult = this.formatFail(this.errMsg)
      }
    } catch (e) {
      callResult = this.formatFail(e)
    }
    return callResult
  },
  revokeServiceItem: function (parms) {
    parms = $.extend(parms, insurance.config.baseInfo, insurance.config.dictionary.tradeCodeMap.PUB_SING_IN) || {}
    var callResult = {}
    try {
      // 服务设施对照撤销
      if (this.checkCommonParameters(parms.insurancePubInfo)) {
        var api = commonApiObject.getBean(parms.insurancePubInfo)
        callResult = api.uploadServiceItem(parms)
      } else {
        callResult = this.formatFail(this.errMsg)
      }
    } catch (e) {
      callResult = this.formatFail(e)
    }
    return callResult
  },
  downloadDisease: function (parms) {
    parms = $.extend(parms, insurance.config.baseInfo, insurance.config.dictionary.tradeCodeMap.PUB_SING_IN) || {}
    var callResult = {}
    try {
      // 疾病下载
      if (this.checkCommonParameters(parms.insurancePubInfo)) {
        var api = commonApiObject.getBean(parms.insurancePubInfo)
        callResult = api.downloadDisease(parms)
      } else {
        callResult = this.formatFail(this.errMsg)
      }
    } catch (e) {
      callResult = this.formatFail(e)
    }
    return callResult
  },
  getPersonInfo: function (parms, _$his) {
    debugger
    var _this = this
    let p = new Promise(function (resolve, reject) {
      parms = $.extend(parms, insurance.config.baseInfo, insurance.config.dictionary.tradeCodeMap.PUB_PERSON_INFO) || {}
      try {
        // 病人信息获取
        if (_this.checkCommonParameters(parms.insurancePubInfo)) {
          var api = commonApiObject.getBean(parms.insurancePubInfo)
          //   insurance.tools = tools;
          api.getPersonInfo(parms, insurance, medicalInsuranceCardAJax).then(function (callResult) {
            resolve(callResult)
          }).catch(function (callResult) {
            reject(callResult)
          })
        } else {
          callResult = _this.formatFail(this.errMsg)
          reject(callResult)
        }
      } catch (e) {
        callResult = _this.formatFail(e)
        reject(callResult)
      }
    })
    return p
  },
  outpatientRegistration: function (parms) {
    parms = $.extend(parms, insurance.config.baseInfo, insurance.config.dictionary.tradeCodeMap.PUB_SING_IN) || {}
    var callResult = {}
    try {
      // 病人信息获取
      if (this.checkCommonParameters(parms.insurancePubInfo)) {
        var api = commonApiObject.getBean(parms.insurancePubInfo)
        callResult = api.outpatientRegistration(parms)
      } else {
        callResult = this.formatFail(this.errMsg)
      }
    } catch (e) {
      callResult = this.formatFail(e)
    }
    return callResult
  },
  revokeOutpatientRegistration: function (parms) {
    parms = $.extend(parms, insurance.config.baseInfo, insurance.config.dictionary.tradeCodeMap.PUB_SING_IN) || {}
    var callResult = {}
    try {
      // 病人信息获取
      if (this.checkCommonParameters(parms.insurancePubInfo)) {
        var api = commonApiObject.getBean(parms.insurancePubInfo)
        callResult = api.revokeOutpatientRegistration(parms)
      } else {
        callResult = this.formatFail(this.errMsg)
      }
    } catch (e) {
      callResult = this.formatFail(e)
    }
    return callResult
  },
  uploadOutpatientRegist: function (parms) {
    parms = $.extend(parms, insurance.config.baseInfo, insurance.config.dictionary.tradeCodeMap.PUB_SING_IN) || {}
    var callResult = {}
    try {
      // 门诊登记上传
      if (this.checkCommonParameters(parms.insurancePubInfo)) {
        var api = commonApiObject.getBean(parms.insurancePubInfo)
        callResult = api.uploadOutpatientRegist(parms)
      } else {
        callResult = this.formatFail(this.errMsg)
      }
    } catch (e) {
      callResult = this.formatFail(e)
    }
    return callResult
  },
  modifyOutpatient: function (parms) {
    parms = $.extend(parms, insurance.config.baseInfo, insurance.config.dictionary.tradeCodeMap.PUB_SING_IN) || {}
    var callResult = {}
    try {
      // 门诊登记修改
      if (this.checkCommonParameters(parms.insurancePubInfo)) {
        var api = commonApiObject.getBean(parms.insurancePubInfo)
        callResult = api.modifyOutpatient(parms)
      } else {
        callResult = this.formatFail(this.errMsg)
      }
    } catch (e) {
      callResult = this.formatFail(e)
    }
    return callResult
  },
  revokeOutpatient: function (parms) {
    parms = $.extend(parms, insurance.config.baseInfo, insurance.config.dictionary.tradeCodeMap.PUB_SING_IN) || {}
    var callResult = {}
    try {
      // 门诊登记撤销
      if (this.checkCommonParameters(parms.insurancePubInfo)) {
        var api = commonApiObject.getBean(parms.insurancePubInfo)
        callResult = api.revokeOutpatient(parms)
      } else {
        callResult = this.formatFail(this.errMsg)
      }
    } catch (e) {
      callResult = this.formatFail(e)
    }
    return callResult
  },
  uploadInpRegister: function (parms) {
    parms = $.extend(parms, insurance.config.baseInfo, insurance.config.dictionary.tradeCodeMap.PUB_SING_IN) || {}
    var callResult = {}
    try {
      // 住院入院登记上传
      if (this.checkCommonParameters(parms.insurancePubInfo)) {
        var api = commonApiObject.getBean(parms.insurancePubInfo)
        callResult = api.uploadInpRegister(parms)
      } else {
        callResult = this.formatFail(this.errMsg)
      }
    } catch (e) {
      callResult = this.formatFail(e)
    }
    return callResult
  },
  modifyInpRegister: function (parms) {
    parms = $.extend(parms, insurance.config.baseInfo, insurance.config.dictionary.tradeCodeMap.PUB_SING_IN) || {}
    var callResult = {}
    try {
      // 住院入院登记修改
      if (this.checkCommonParameters(parms.insurancePubInfo)) {
        var api = commonApiObject.getBean(parms.insurancePubInfo)
        callResult = api.modifyInpRegister(parms)
      } else {
        callResult = this.formatFail(this.errMsg)
      }
    } catch (e) {
      callResult = this.formatFail(e)
    }
    return callResult
  },
  revokeInpRegister: function (parms) {
    parms = $.extend(parms, insurance.config.baseInfo, insurance.config.dictionary.tradeCodeMap.PUB_SING_IN) || {}
    var callResult = {}
    try {
      // 住院入院登记撤销
      if (this.commonParam.mscUrl != null && this.commonParam.mscUrl != '') {
        parms.djParms = $.extend(parms.djParms, {
          mscUrl: this.commonParam.mscUrl
        }) || {}
      }
      if (this.checkCommonParameters(parms.insurancePubInfo)) {
        var api = commonApiObject.getBean(parms.insurancePubInfo)
        callResult = api.revokeInpRegister(parms)
      } else {
        callResult = this.formatFail(this.errMsg)
      }
    } catch (e) {
      callResult = this.formatFail(e)
    }
    return callResult
  },
  getInpRegister: function (parms) {
    parms = $.extend(parms, insurance.config.baseInfo, insurance.config.dictionary.tradeCodeMap.PUB_SING_IN) || {}
    var callResult = {}
    try {
      // 住院登记查询
      if (this.checkCommonParameters(parms.insurancePubInfo)) {
        var api = commonApiObject.getBean(parms.insurancePubInfo)
        callResult = api.getInpRegister(parms)
      } else {
        callResult = this.formatFail(this.errMsg)
      }
    } catch (e) {
      callResult = this.formatFail(e)
    }
    return callResult
  },
  uploadOutInpRegist: function (parms) {
    parms = $.extend(parms, insurance.config.baseInfo, insurance.config.dictionary.tradeCodeMap.PUB_SING_IN) || {}
    var callResult = {}
    try {
      // 住院出院登记上传
      if (this.checkCommonParameters(parms.insurancePubInfo)) {
        var api = commonApiObject.getBean(parms.insurancePubInfo)
        callResult = api.uploadOutInpRegist(parms)
      } else {
        callResult = this.formatFail(this.errMsg)
      }
    } catch (e) {
      callResult = this.formatFail(e)
    }
    return callResult
  },
  revokeOutInpRegist: function (parms) {
    parms = $.extend(parms, insurance.config.baseInfo, insurance.config.dictionary.tradeCodeMap.PUB_SING_IN) || {}
    var callResult = {}
    try {
      // 住院出院登记撤销
      if (this.checkCommonParameters(parms.insurancePubInfo)) {
        var api = commonApiObject.getBean(parms.insurancePubInfo)
        callResult = api.revokeOutInpRegist(parms)
      } else {
        callResult = this.formatFail(this.errMsg)
      }
    } catch (e) {
      callResult = this.formatFail(e)
    }
    return callResult
  },
  uploadOutDetails: function (parms) {
    parms = $.extend(parms, insurance.config.baseInfo, insurance.config.dictionary.tradeCodeMap.PUB_SING_IN) || {}
    var callResult = {}
    try {
      // 明细上传
      if (this.checkCommonParameters(parms.insurancePubInfo)) {
        var api = commonApiObject.getBean(parms.insurancePubInfo)
        callResult = api.uploadOutDetails(parms)
      } else {
        callResult = this.formatFail(this.errMsg)
      }
    } catch (e) {
      callResult = this.formatFail(e)
    }
    return callResult
  },
  uploadInpDetails: function (parms) {
    parms = $.extend(parms, insurance.config.baseInfo, insurance.config.dictionary.tradeCodeMap.PUB_SING_IN) || {}
    var callResult = {}
    try {
      // 明细上传
      if (this.checkCommonParameters(parms.insurancePubInfo)) {
        var api = commonApiObject.getBean(parms.insurancePubInfo)
        callResult = api.uploadInpDetails(parms)
      } else {
        callResult = this.formatFail(this.errMsg)
      }
    } catch (e) {
      callResult = this.formatFail(e)
    }
    return callResult
  },
  revokeOutDetails: function (parms) {
    parms = $.extend(parms, insurance.config.baseInfo, insurance.config.dictionary.tradeCodeMap.PUB_SING_IN) || {}
    var callResult = {}
    try {
      // 明细撤销
      if (this.checkCommonParameters(parms.insurancePubInfo)) {
        var api = commonApiObject.getBean(parms.insurancePubInfo)
        callResult = api.revokeOutDetails(parms)
      } else {
        callResult = this.formatFail(this.errMsg)
      }
    } catch (e) {
      callResult = this.formatFail(e)
    }
    return callResult
  },
  queryInpDetails: function (parms) {
    parms = $.extend(parms, insurance.config.baseInfo, insurance.config.dictionary.tradeCodeMap.PUB_SING_IN) || {}
    var callResult = {}
    try {
      // 住院费用明细查询
      if (this.checkCommonParameters(parms.insurancePubInfo)) {
        var api = commonApiObject.getBean(parms.insurancePubInfo)
        callResult = api.queryInpDetails(parms)
      } else {
        callResult = this.formatFail(this.errMsg)
      }
    } catch (e) {
      callResult = this.formatFail(e)
    }
    return callResult
  },
  revokeInpDetails: function (parms) {
    parms = $.extend(parms, insurance.config.baseInfo, insurance.config.dictionary.tradeCodeMap.PUB_SING_IN) || {}
    var callResult = {}
    try {
      // 明细撤销
      if (this.commonParam.mscUrl != null && this.commonParam.mscUrl != '') {
        parms.mxParms = $.extend(parms.mxParms, {
          mscUrl: this.commonParam.mscUrl
        }) || {}
      }
      if (this.checkCommonParameters(parms.insurancePubInfo)) {
        var api = commonApiObject.getBean(parms.insurancePubInfo)
        callResult = api.revokeInpDetails(parms)
      } else {
        callResult = this.formatFail(this.errMsg)
      }
    } catch (e) {
      callResult = this.formatFail(e)
    }
    return callResult
  },
  doPreMZCharge: function (parms) {
    parms = $.extend(parms, insurance.config.baseInfo, insurance.config.dictionary.tradeCodeMap.PUB_SING_IN) || {}
    var callResult = {}
    try {
      // 费用预结算
      if (this.checkCommonParameters(parms.insurancePubInfo)) {
        var api = commonApiObject.getBean(parms.insurancePubInfo)
        callResult = api.doPreMZCharge(parms)
      } else {
        callResult = this.formatFail(this.errMsg)
      }
    } catch (e) {
      callResult = this.formatFail(e)
    }
    return callResult
  },
  doPreZYCharge: function (parms) {
    parms = $.extend(parms, insurance.config.baseInfo, insurance.config.dictionary.tradeCodeMap.PUB_SING_IN) || {}
    var callResult = {}
    try {
      // 费用预结算
      if (this.checkCommonParameters(parms.insurancePubInfo)) {
        var api = commonApiObject.getBean(parms.insurancePubInfo)
        callResult = api.doPreZYCharge(parms)
      } else {
        callResult = this.formatFail(this.errMsg)
      }
    } catch (e) {
      callResult = this.formatFail(e)
    }
    return callResult
  },
  preOutpatientCharge: function (parms) {
    parms = $.extend(parms, insurance.config.baseInfo, insurance.config.dictionary.tradeCodeMap.PUB_SING_IN) || {}
    var callResult = {}
    try {
      // 费用预结算
      if (this.checkCommonParameters(parms.insurancePubInfo)) {
        var api = commonApiObject.getBean(parms.insurancePubInfo)
        callResult = api.preOutpatientCharge(parms)
      } else {
        callResult = this.formatFail(this.errMsg)
      }
    } catch (e) {
      callResult = this.formatFail(e)
    }
    return callResult
  },
  preInpatientCharge: function (parms) {
    parms = $.extend(parms, insurance.config.baseInfo, insurance.config.dictionary.tradeCodeMap.PUB_SING_IN) || {}
    var callResult = {}
    try {
      // 费用预结算
      if (this.checkCommonParameters(parms.insurancePubInfo)) {
        var api = commonApiObject.getBean(parms.insurancePubInfo)
        callResult = api.preInpatientCharge(parms)
      } else {
        callResult = this.formatFail(this.errMsg)
      }
    } catch (e) {
      callResult = this.formatFail(e)
    }
    return callResult
  },
  doOutpatientCharge: function (parms) {
    parms = $.extend(parms, insurance.config.baseInfo, insurance.config.dictionary.tradeCodeMap.PUB_SING_IN) || {}
    var callResult = {}
    try {
      // 费用结算
      if (this.checkCommonParameters(parms.insurancePubInfo)) {
        var api = commonApiObject.getBean(parms.insurancePubInfo)
        callResult = api.doOutpatientCharge(parms)
      } else {
        callResult = this.formatFail(this.errMsg)
      }
    } catch (e) {
      callResult = this.formatFail(e)
    }
    return callResult
  },
  doInpatientCharge: function (parms) {
    parms = $.extend(parms, insurance.config.baseInfo, insurance.config.dictionary.tradeCodeMap.PUB_SING_IN) || {}
    var callResult = {}
    try {
      // 费用结算
      if (this.checkCommonParameters(parms.insurancePubInfo)) {
        var api = commonApiObject.getBean(parms.insurancePubInfo)
        callResult = api.doInpatientCharge(parms)
      } else {
        callResult = this.formatFail(this.errMsg)
      }
    } catch (e) {
      callResult = this.formatFail(e)
    }
    return callResult
  },
  revokeOutpatientCharge: function (parms) {
    parms = $.extend(parms, insurance.config.baseInfo, insurance.config.dictionary.tradeCodeMap.PUB_SING_IN) || {}
    var callResult = {}
    try {
      // 撤销结算
      if (this.checkCommonParameters(parms.insurancePubInfo)) {
        var api = commonApiObject.getBean(parms.insurancePubInfo)
        callResult = api.revokeOutpatientCharge(parms)
      } else {
        callResult = this.formatFail(this.errMsg)
      }
    } catch (e) {
      callResult = this.formatFail(e)
    }
    return callResult
  },
  revokeInpatientCharge: function (parms) {
    parms = $.extend(parms, insurance.config.baseInfo, insurance.config.dictionary.tradeCodeMap.PUB_SING_IN) || {}
    var callResult = {}
    try {
      // 撤销结算
      if (this.checkCommonParameters(parms.insurancePubInfo)) {
        var api = commonApiObject.getBean(parms.insurancePubInfo)
        callResult = api.revokeInpatientCharge(parms)
      } else {
        callResult = this.formatFail(this.errMsg)
      }
    } catch (e) {
      callResult = this.formatFail(e)
    }
    return callResult
  },

  signIn: function (parms) {
    parms = $.extend(parms, insurance.config.baseInfo, insurance.config.dictionary.tradeCodeMap.PUB_SING_IN) || {}
    var callResult = {}
    try {
      // 签到
      if (this.checkCommonParameters(parms.insurancePubInfo)) {
        var api = commonApiObject.getBean(parms.insurancePubInfo)
        callResult = api.signIn(parms)
      } else {
        callResult = this.formatFail(this.errMsg)
      }
    } catch (e) {
      callResult = this.formatFail(e)
    }
    return callResult
  },

  signOut: function (parms) {
    parms = $.extend(parms, insurance.config.baseInfo, insurance.config.dictionary.tradeCodeMap.PUB_SING_OUT) || {}
    var callResult = {}
    try {
      // 签退
      if (this.checkCommonParameters(parms.insurancePubInfo)) {
        var api = commonApiObject.getBean(parms.insurancePubInfo)
        callResult = api.signOut(parms)
      } else {
        callResult = this.formatFail(this.errMsg)
      }
    } catch (e) {
      callResult = this.formatFail(e)
    }
    return callResult
  },

  totalReconciliation: function (parms) {
    parms = $.extend(parms, insurance.config.baseInfo, insurance.config.dictionary.tradeCodeMap.PUB_SING_IN) || {}
    var callResult = {}
    try {
      // 总额对账
      if (this.checkCommonParameters(parms.insurancePubInfo)) {
        var api = commonApiObject.getBean(parms.insurancePubInfo)
        callResult = api.totalReconciliation(parms)
      } else {
        callResult = this.formatFail(this.errMsg)
      }
    } catch (e) {
      callResult = this.formatFail(e)
    }
    return callResult
  },

  downloadReconciliation: function (parms) {
    parms = $.extend(parms, insurance.config.baseInfo, insurance.config.dictionary.tradeCodeMap.PUB_SING_IN) || {}
    var callResult = {}
    try {
      // 对账数据下载
      if (this.checkCommonParameters(parms.insurancePubInfo)) {
        var api = commonApiObject.getBean(parms.insurancePubInfo)
        callResult = api.downloadReconciliation(parms)
      } else {
        callResult = this.formatFail(this.errMsg)
      }
    } catch (e) {
      callResult = this.formatFail(e)
    }
    return callResult
  },

  downloadDetailsInfo: function (parms) {
    parms = $.extend(parms, insurance.config.baseInfo, insurance.config.dictionary.tradeCodeMap.PUB_SING_IN) || {}
    var callResult = {}
    try {
      // 对账数据下载
      if (this.checkCommonParameters(parms.insurancePubInfo)) {
        var api = commonApiObject.getBean(parms.insurancePubInfo)
        callResult = api.downloadDetailsInfo(parms)
      } else {
        callResult = this.formatFail(this.errMsg)
      }
    } catch (e) {
      callResult = this.formatFail(e)
    }
    return callResult
  },

  editCardPwd: function (parms) {
    parms = $.extend(parms, insurance.config.baseInfo, insurance.config.dictionary.tradeCodeMap.PUB_SING_IN) || {}
    var callResult = {}
    try {
      // 对账数据下载
      if (this.checkCommonParameters(parms.insurancePubInfo)) {
        var api = commonApiObject.getBean(parms.insurancePubInfo)
        callResult = api.editCardPwd(parms)
      } else {
        callResult = this.formatFail(this.errMsg)
      }
    } catch (e) {
      callResult = this.formatFail(e)
    }
    return callResult
  },

  downloadInHosChronic: function (parms) {
    parms = $.extend(parms, insurance.config.baseInfo, insurance.config.dictionary.tradeCodeMap.PUB_SING_IN) || {}
    var callResult = {}
    try {
      // 对账数据下载
      if (this.checkCommonParameters(parms.insurancePubInfo)) {
        var api = commonApiObject.getBean(parms.insurancePubInfo)
        callResult = api.downloadInHosChronic(parms)
      } else {
        callResult = this.formatFail(this.errMsg)
      }
    } catch (e) {
      callResult = this.formatFail(e)
    }
    return callResult
  },

  printSettlement: function (parms) {
    parms = $.extend(parms, insurance.config.baseInfo, insurance.config.dictionary.tradeCodeMap.PUB_SING_IN) || {}
    var callResult = {}
    try {
      // 结算单打印
      if (this.checkCommonParameters(parms.insurancePubInfo)) {
        var api = commonApiObject.getBean(parms.insurancePubInfo)
        callResult = api.printSettlement(parms)
      } else {
        callResult = this.formatFail(this.errMsg)
      }
    } catch (e) {
      callResult = this.formatFail(e)
    }
    return callResult
  },

  liquidationApply: function (parms) {
    parms = $.extend(parms, insurance.config.baseInfo, insurance.config.dictionary.tradeCodeMap.PUB_SING_IN) || {}
    var callResult = {}
    try {
      // 清算申请
      if (this.checkCommonParameters(parms.insurancePubInfo)) {
        var api = commonApiObject.getBean(parms.insurancePubInfo)
        callResult = api.liquidationApply(parms)
      } else {
        callResult = this.formatFail(this.errMsg)
      }
    } catch (e) {
      callResult = this.formatFail(e)
    }
    return callResult
  },

  revokeLiquidationApply: function (parms) {
    parms = $.extend(parms, insurance.config.baseInfo, insurance.config.dictionary.tradeCodeMap.PUB_SING_IN) || {}
    var callResult = {}
    try {
      // 清算申请撤销
      if (this.checkCommonParameters(parms.insurancePubInfo)) {
        var api = commonApiObject.getBean(parms.insurancePubInfo)
        callResult = api.revokeLiquidationApply(parms)
      } else {
        callResult = this.formatFail(this.errMsg)
      }
    } catch (e) {
      callResult = this.formatFail(e)
    }
    return callResult
  },

  searchLiquidationApply: function (parms) {
    parms = $.extend(parms, insurance.config.baseInfo, insurance.config.dictionary.tradeCodeMap.PUB_SING_IN) || {}
    var callResult = {}
    try {
      // 清算申请查询
      if (this.checkCommonParameters(parms.insurancePubInfo)) {
        var api = commonApiObject.getBean(parms.insurancePubInfo)
        callResult = api.searchLiquidationApply(parms)
      } else {
        callResult = this.formatFail(this.errMsg)
      }
    } catch (e) {
      callResult = this.formatFail(e)
    }
    return callResult
  },
  printBasicMedLiquSumSheet: function (parms) {
    parms = $.extend(parms, insurance.config.baseInfo, insurance.config.dictionary.tradeCodeMap.PUB_SING_IN) || {}
    var callResult = {}
    try {
      // 打印基本医疗清算汇总表
      if (this.checkCommonParameters(parms.insurancePubInfo)) {
        var api = commonApiObject.getBean(parms.insurancePubInfo)
        callResult = api.printBasicMedLiquSumSheet(parms)
      } else {
        callResult = this.formatFail(this.errMsg)
      }
    } catch (e) {
      callResult = this.formatFail(e)
    }
    return callResult
  },

  printBasicMedLiquDetailSheet: function (parms) {
    parms = $.extend(parms, insurance.config.baseInfo, insurance.config.dictionary.tradeCodeMap.PUB_SING_IN) || {}
    var callResult = {}
    try {
      // 打印基本医疗清算明细表
      if (this.checkCommonParameters(parms.insurancePubInfo)) {
        var api = commonApiObject.getBean(parms.insurancePubInfo)
        callResult = api.printBasicMedLiquDetailSheet(parms)
      } else {
        callResult = this.formatFail(this.errMsg)
      }
    } catch (e) {
      callResult = this.formatFail(e)
    }
    return callResult
  },

  printLargeMedLiquSumSheet: function (parms) {
    parms = $.extend(parms, insurance.config.baseInfo, insurance.config.dictionary.tradeCodeMap.PUB_SING_IN) || {}
    var callResult = {}
    try {
      // 打印大额医疗清算汇总表
      if (this.checkCommonParameters(parms.insurancePubInfo)) {
        var api = commonApiObject.getBean(parms.insurancePubInfo)
        callResult = api.printLargeMedLiquSumSheet(parms)
      } else {
        callResult = this.formatFail(this.errMsg)
      }
    } catch (e) {
      callResult = this.formatFail(e)
    }
    return callResult
  },

  printLargeMedLiquDetailSheet: function (parms) {
    parms = $.extend(parms, insurance.config.baseInfo, insurance.config.dictionary.tradeCodeMap.PUB_SING_IN) || {}
    var callResult = {}
    try {
      // 打印大额医疗清算明细表
      if (this.checkCommonParameters(parms.insurancePubInfo)) {
        var api = commonApiObject.getBean(parms.insurancePubInfo)
        callResult = api.printLargeMedLiquDetailSheet(parms)
      } else {
        callResult = this.formatFail(this.errMsg)
      }
    } catch (e) {
      callResult = this.formatFail(e)
    }
    return callResult
  },

  printEmpMedLiquSheet: function (parms) {
    parms = $.extend(parms, insurance.config.baseInfo, insurance.config.dictionary.tradeCodeMap.PUB_SING_IN) || {}
    var callResult = {}
    try {
      // 打印职工医疗保险清算表
      if (this.checkCommonParameters(parms.insurancePubInfo)) {
        var api = commonApiObject.getBean(parms.insurancePubInfo)
        callResult = api.printEmpMedLiquSheet(parms)
      } else {
        callResult = this.formatFail(this.errMsg)
      }
    } catch (e) {
      callResult = this.formatFail(e)
    }
    return callResult
  },

  printEmpMedLiquDetailSheet: function (parms) {
    parms = $.extend(parms, insurance.config.baseInfo, insurance.config.dictionary.tradeCodeMap.PUB_SING_IN) || {}
    var callResult = {}
    try {
      // 打印职工医疗保险清算明细表
      if (this.checkCommonParameters(parms.insurancePubInfo)) {
        var api = commonApiObject.getBean(parms.insurancePubInfo)
        callResult = api.printEmpMedLiquDetailSheet(parms)
      } else {
        callResult = this.formatFail(this.errMsg)
      }
    } catch (e) {
      callResult = this.formatFail(e)
    }
    return callResult
  },

  printEmpMedLiquSumSheet: function (parms) {
    parms = $.extend(parms, insurance.config.baseInfo, insurance.config.dictionary.tradeCodeMap.PUB_SING_IN) || {}
    var callResult = {}
    try {
      // 打印职工医疗保险清算汇总表
      if (this.checkCommonParameters(parms.insurancePubInfo)) {
        var api = commonApiObject.getBean(parms.insurancePubInfo)
        callResult = api.printEmpMedLiquSumSheet(parms)
      } else {
        callResult = this.formatFail(this.errMsg)
      }
    } catch (e) {
      callResult = this.formatFail(e)
    }
    return callResult
  },

  printGenOutPatientLiquSumSheet: function (parms) {
    parms = $.extend(parms, insurance.config.baseInfo, insurance.config.dictionary.tradeCodeMap.PUB_SING_IN) || {}
    var callResult = {}
    try {
      // 打印城乡居民普通门诊清算汇总表
      if (this.checkCommonParameters(parms.insurancePubInfo)) {
        var api = commonApiObject.getBean(parms.insurancePubInfo)
        callResult = api.printGenOutPatientLiquSumSheet(parms)
      } else {
        callResult = this.formatFail(this.errMsg)
      }
    } catch (e) {
      callResult = this.formatFail(e)
    }
    return callResult
  },
  searchUnConfirm: function (parms) {
    parms = $.extend(parms, insurance.config.baseInfo, insurance.config.dictionary.tradeCodeMap.PUB_SING_IN) || {}
    var callResult = {}
    try {
      // 不确定交易查询
      if (this.checkCommonParameters(parms.insurancePubInfo)) {
        var api = commonApiObject.getBean(parms.insurancePubInfo)
        callResult = api.searchUnConfirm(parms)
      } else {
        callResult = this.formatFail(this.errMsg)
      }
    } catch (e) {
      callResult = this.formatFail(e)
    }
    return callResult
  },
  printChronicCharge: function (parms) {
    parms = $.extend(parms, insurance.config.baseInfo, insurance.config.dictionary.tradeCodeMap.PUB_SING_IN) || {}
    var callResult = {}
    try {
      // 特殊门诊收费单据打印
      if (this.checkCommonParameters(parms.insurancePubInfo)) {
        var api = commonApiObject.getBean(parms.insurancePubInfo)
        callResult = api.printChronicCharge(parms)
      } else {
        callResult = this.formatFail(this.errMsg)
      }
    } catch (e) {
      callResult = this.formatFail(e)
    }
    return callResult
  },
  printInpatientCharge: function (parms) {
    parms = $.extend(parms, insurance.config.baseInfo, insurance.config.dictionary.tradeCodeMap.PUB_SING_IN) || {}
    var callResult = {}
    try {
      // 住院收费单据打印
      if (this.checkCommonParameters(parms.insurancePubInfo)) {
        var api = commonApiObject.getBean(parms.insurancePubInfo)
        callResult = api.printInpatientCharge(parms)
      } else {
        callResult = this.formatFail(this.errMsg)
      }
    } catch (e) {
      callResult = this.formatFail(e)
    }
    return callResult
  },
  upLoadReferralSheet: function (parms) {
    parms = $.extend(parms, insurance.config.baseInfo, insurance.config.dictionary.tradeCodeMap.PUB_SING_IN) || {}
    var callResult = {}
    try {
      // 转诊转院登记
      if (this.checkCommonParameters(parms.insurancePubInfo)) {
        var api = commonApiObject.getBean(parms.insurancePubInfo)
        callResult = api.upLoadReferralSheet(parms)
      } else {
        callResult = this.formatFail(this.errMsg)
      }
    } catch (e) {
      callResult = this.formatFail(e)
    }
    return callResult
  },
  designatedSpecHosRegist: function (parms) {
    parms = $.extend(parms, insurance.config.baseInfo, insurance.config.dictionary.tradeCodeMap.PUB_SING_IN) || {}
    var callResult = {}
    try {
      // 医保特殊病定点登记
      if (this.checkCommonParameters(parms.insurancePubInfo)) {
        var api = commonApiObject.getBean(parms.insurancePubInfo)
        callResult = api.designatedSpecHosRegist(parms)
      } else {
        callResult = this.formatFail(this.errMsg)
      }
    } catch (e) {
      callResult = this.formatFail(e)
    }
    return callResult
  },
  findReferralSheetList: function (parms) {
    parms = $.extend(parms, insurance.config.baseInfo, insurance.config.dictionary.tradeCodeMap.PUB_SING_IN) || {}
    var callResult = {}
    try {
      // 转诊转院登记列表查询
      if (this.checkCommonParameters(parms.insurancePubInfo)) {
        var api = commonApiObject.getBean(parms.insurancePubInfo)
        callResult = api.findReferralSheetList(parms)
      } else {
        callResult = this.formatFail(this.errMsg)
      }
    } catch (e) {
      callResult = this.formatFail(e)
    }
    return callResult
  },
  findReferralSheet: function (parms) {
    parms = $.extend(parms, insurance.config.baseInfo, insurance.config.dictionary.tradeCodeMap.PUB_SING_IN) || {}
    var callResult = {}
    try {
      // 转诊转院登记查询
      if (this.checkCommonParameters(parms.insurancePubInfo)) {
        var api = commonApiObject.getBean(parms.insurancePubInfo)
        callResult = api.findReferralSheet(parms)
      } else {
        callResult = this.formatFail(this.errMsg)
      }
    } catch (e) {
      callResult = this.formatFail(e)
    }
    return callResult
  },
  designatedHosRegist: function (parms) {
    parms = $.extend(parms, insurance.config.baseInfo, insurance.config.dictionary.tradeCodeMap.PUB_SING_IN) || {}
    var callResult = {}
    try {
      // 居民门诊统筹定点登记
      if (this.checkCommonParameters(parms.insurancePubInfo)) {
        var api = commonApiObject.getBean(parms.insurancePubInfo)
        callResult = api.designatedHosRegist(parms)
      } else {
        callResult = this.formatFail(this.errMsg)
      }
    } catch (e) {
      callResult = this.formatFail(e)
    }
    return callResult
  },
  submitMonthlyInsuranceSummaryTable: function (parms) {
    parms = $.extend(parms, insurance.config.baseInfo, insurance.config.dictionary.tradeCodeMap.PUB_SING_IN) || {}
    var callResult = {}
    try {
      // 提交月度申报分险种汇总表申请
      if (this.checkCommonParameters(parms.insurancePubInfo)) {
        var api = commonApiObject.getBean(parms.insurancePubInfo)
        callResult = api.submitMonthlyInsuranceSummaryTable(parms)
      } else {
        callResult = this.formatFail(this.errMsg)
      }
    } catch (e) {
      callResult = this.formatFail(e)
    }
    return callResult
  },
  revokeMonthlyInsuranceSummaryTable: function (parms) {
    parms = $.extend(parms, insurance.config.baseInfo, insurance.config.dictionary.tradeCodeMap.PUB_SING_IN) || {}
    var callResult = {}
    try {
      // 提交月度申报分险种汇总表 回退
      if (this.checkCommonParameters(parms.insurancePubInfo)) {
        var api = commonApiObject.getBean(parms.insurancePubInfo)
        callResult = api.revokeMonthlyInsuranceSummaryTable(parms)
      } else {
        callResult = this.formatFail(this.errMsg)
      }
    } catch (e) {
      callResult = this.formatFail(e)
    }
    return callResult
  },
  submitMonthlySummaryTable: function (parms) {
    parms = $.extend(parms, insurance.config.baseInfo, insurance.config.dictionary.tradeCodeMap.PUB_SING_IN) || {}
    var callResult = {}
    try {
      // 提交月度申报汇总表
      if (this.checkCommonParameters(parms.insurancePubInfo)) {
        var api = commonApiObject.getBean(parms.insurancePubInfo)
        callResult = api.submitMonthlySummaryTable(parms)
      } else {
        callResult = this.formatFail(this.errMsg)
      }
    } catch (e) {
      callResult = this.formatFail(e)
    }
    return callResult
  },
  revokeMonthlySummaryTable: function (parms) {
    parms = $.extend(parms, insurance.config.baseInfo, insurance.config.dictionary.tradeCodeMap.PUB_SING_IN) || {}
    var callResult = {}
    try {
      // 提交月度申报汇总表回退
      if (this.checkCommonParameters(parms.insurancePubInfo)) {
        var api = commonApiObject.getBean(parms.insurancePubInfo)
        callResult = api.revokeMonthlySummaryTable(parms)
      } else {
        callResult = this.formatFail(this.errMsg)
      }
    } catch (e) {
      callResult = this.formatFail(e)
    }
    return callResult
  },
  uploadPatientInfo: function (parms) {
    parms = $.extend(parms, insurance.config.baseInfo, insurance.config.dictionary.tradeCodeMap.PUB_SING_IN) || {}
    var callResult = {}
    try {
      // 住院病人信息（病案首页）录入
      if (this.checkCommonParameters(parms.insurancePubInfo)) {
        var api = commonApiObject.getBean(parms.insurancePubInfo)
        callResult = api.uploadPatientInfo(parms)
      } else {
        callResult = this.formatFail(this.errMsg)
      }
    } catch (e) {
      callResult = this.formatFail(e)
    }
    return callResult
  },
  uploadPatientSummary: function (parms) {
    parms = $.extend(parms, insurance.config.baseInfo, insurance.config.dictionary.tradeCodeMap.PUB_SING_IN) || {}
    var callResult = {}
    try {
      // 住院病人出院小结（出院记录）录入
      if (this.checkCommonParameters(parms.insurancePubInfo)) {
        var api = commonApiObject.getBean(parms.insurancePubInfo)
        callResult = api.uploadPatientSummary(parms)
      } else {
        callResult = this.formatFail(this.errMsg)
      }
    } catch (e) {
      callResult = this.formatFail(e)
    }
    return callResult
  },
  downloadOverallPlanAreaOpenInfo: function (parms) {
    parms = $.extend(parms, insurance.config.baseInfo, insurance.config.dictionary.tradeCodeMap.PUB_SING_IN) || {}
    var callResult = {}
    try {
      // 统筹区开通信息下载
      if (this.checkCommonParameters(parms.insurancePubInfo)) {
        var api = commonApiObject.getBean(parms.insurancePubInfo)
        callResult = api.downloadOverallPlanAreaOpenInfo(parms)
      } else {
        callResult = this.formatFail(this.errMsg)
      }
    } catch (e) {
      callResult = this.formatFail(e)
    }
    return callResult
  },
  settlementClearingDetails: function (parms) {
    parms = $.extend(parms, insurance.config.baseInfo, insurance.config.dictionary.tradeCodeMap.PUB_SING_IN) || {}
    var callResult = {}
    try {
      // 提取跨省外来就医月度结算清分明细
      if (this.checkCommonParameters(parms.insurancePubInfo)) {
        var api = commonApiObject.getBean(parms.insurancePubInfo)
        callResult = api.settlementClearingDetails(parms)
      } else {
        callResult = this.formatFail(this.errMsg)
      }
    } catch (e) {
      callResult = this.formatFail(e)
    }
    return callResult
  },
  confirmSettlementClearing: function (parms) {
    parms = $.extend(parms, insurance.config.baseInfo, insurance.config.dictionary.tradeCodeMap.PUB_SING_IN) || {}
    var callResult = {}
    try {
      // 提交跨省外来就医月度结算清分确认结果
      if (this.checkCommonParameters(parms.insurancePubInfo)) {
        var api = commonApiObject.getBean(parms.insurancePubInfo)
        callResult = api.confirmSettlementClearing(parms)
      } else {
        callResult = this.formatFail(this.errMsg)
      }
    } catch (e) {
      callResult = this.formatFail(e)
    }
    return callResult
  },
  revokeSettlementClearing: function (parms) {
    parms = $.extend(parms, insurance.config.baseInfo, insurance.config.dictionary.tradeCodeMap.PUB_SING_IN) || {}
    var callResult = {}
    try {
      // 跨省外来就医月度结算清分确认结果回退
      if (this.checkCommonParameters(parms.insurancePubInfo)) {
        var api = commonApiObject.getBean(parms.insurancePubInfo)
        callResult = api.revokeSettlementClearing(parms)
      } else {
        callResult = this.formatFail(this.errMsg)
      }
    } catch (e) {
      callResult = this.formatFail(e)
    }
    return callResult
  },
  uploadDiagnosisInfo: function (parms) {
    parms = $.extend(parms, insurance.config.baseInfo, insurance.config.dictionary.tradeCodeMap.PUB_SING_IN) || {}
    var callResult = {}
    try {
      // 住院病人诊断信息（病案首页）录入
      if (this.checkCommonParameters(parms.insurancePubInfo)) {
        var api = commonApiObject.getBean(parms.insurancePubInfo)
        callResult = api.uploadDiagnosisInfo(parms)
      } else {
        callResult = this.formatFail(this.errMsg)
      }
    } catch (e) {
      callResult = this.formatFail(e)
    }
    return callResult
  },
  uploadOperationInfo: function (parms) {
    parms = $.extend(parms, insurance.config.baseInfo, insurance.config.dictionary.tradeCodeMap.PUB_SING_IN) || {}
    var callResult = {}
    try {
      // 住院病人手术信息（病案首页）录入
      if (this.checkCommonParameters(parms.insurancePubInfo)) {
        var api = commonApiObject.getBean(parms.insurancePubInfo)
        callResult = api.uploadOperationInfo(parms)
      } else {
        callResult = this.formatFail(this.errMsg)
      }
    } catch (e) {
      callResult = this.formatFail(e)
    }
    return callResult
  },
  uploadObstetricChildbirthInfo: function (parms) {
    parms = $.extend(parms, insurance.config.baseInfo, insurance.config.dictionary.tradeCodeMap.PUB_SING_IN) || {}
    var callResult = {}
    try {
      // 住院病人产科分娩婴儿信息（病案首页）录入
      if (this.checkCommonParameters(parms.insurancePubInfo)) {
        var api = commonApiObject.getBean(parms.insurancePubInfo)
        callResult = api.uploadObstetricChildbirthInfo(parms)
      } else {
        callResult = this.formatFail(this.errMsg)
      }
    } catch (e) {
      callResult = this.formatFail(e)
    }
    return callResult
  },
  uploadOncologyTreatmentInfo: function (parms) {
    parms = $.extend(parms, insurance.config.baseInfo, insurance.config.dictionary.tradeCodeMap.PUB_SING_IN) || {}
    var callResult = {}
    try {
      // 肿瘤专科病人治疗记录信息（病案首页）录入
      if (this.checkCommonParameters(parms.insurancePubInfo)) {
        var api = commonApiObject.getBean(parms.insurancePubInfo)
        callResult = api.uploadOncologyTreatmentInfo(parms)
      } else {
        callResult = this.formatFail(this.errMsg)
      }
    } catch (e) {
      callResult = this.formatFail(e)
    }
    return callResult
  }

}
if (insurance.api) {
  Object.assign(insurance.api, commonApiObject)
} else {
  insurance.api = Object.assign({}, commonApiObject)
}

// insurance.api.initExternalFeeSystem({
//   // "jsessionids": $.cookie("jsessionids")
// });

export {
  insurance
}
