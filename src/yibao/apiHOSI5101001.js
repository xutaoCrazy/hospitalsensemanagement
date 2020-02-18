import {
  insurance
} from "@/yibao/insuranceconfig";
(function () {}());
/**
 * 功能：EFS系统医保DLL接口封装公用方法
 *
 * @param commandline
 *            入参
 * @param appflag
 *            特殊处理标志
 * @returns
 */
var apiHOSI5101001Object = {
  Success: "1", // 返回值状态：成功标识
  Fail: "0", // 返回值状态：失败标识
  Nothing: "9", // 返回值状态：接口不存在标识
  // 普通医保接口交易
  // 获取病人信息 03
  getPersonInfo: function (param) {
    var callResult = "";
    callResult = insurance.tools.insSystemSyncAjax(param.paramCreateUrl, param);
    if (callResult.code == 1 || callResult.result == "Success") {
      // 拿到组织好的参数
      insurance.interface.insuLocalWeb.indata = callResult.resultObj;
      paramInsu = $.extend(insurance.interface.insuLocalWeb, param.insurancePubInfo);
      callResult = yinhaiService.call(paramInsu);
    } else {
      console.log(callResult.resultMsg);
    }
    if (callResult.code == 1 || callResult.result == "Success") {
      var returnParam = $.extend(JSON.parse(callResult.resultObj), insurance.config.baseInfo);
      callResult = insurance.tools.insSystemSyncAjax(param.returnHandleUrl, returnParam);
    } else {
      console.log(callResult.resultMsg);
    }
    return callResult;
  },

  // 签到 05
  signIn: function (param) {
    var callResult = "";
    callResult = insurance.tools.insSystemSyncAjax(param.paramCreateUrl, param);
    if (callResult.code == 1 || callResult.result == "Success") {
      // 拿到组织好的参数
      insurance.interface.insuLocalWeb.indata = callResult.resultObj;
      paramInsu = $.extend(insurance.interface.insuLocalWeb, param.insurancePubInfo);
      callResult = yinhaiService.call(paramInsu);
    } else {
      console.log(callResult.resultMsg);
    }
    if (callResult.code == 1 || callResult.result == "Success") {
      var returnParam = $.extend(JSON.parse(callResult.resultObj), insurance.config.baseInfo);
      callResult = insurance.tools.insSystemSyncAjax(param.returnHandleUrl, returnParam);
    } else {
      console.log(callResult.resultMsg);
    }
    return callResult;
  },
  //门特接口交易
  //门特申请14A
  opsdTreatmentApply: function (param) {
    // 入参校验
    var callResult = "";
    callResult = insurance.tools.insSystemSyncAjax(param.paramCreateUrl, param);
    if (callResult.code == 1 || callResult.result == "Success") {
      // 拿到组织好的参数
      insurance.interface.insuLocalWeb.indata = callResult.resultObj;
      paramInsu = $.extend(insurance.interface.insuLocalWeb, param.insurancePubInfo);
      callResult = yinhaiService.call(paramInsu);
    }
    if (callResult.code == 1 || callResult.result == "Success") {
      var returnParam = $.extend(JSON.parse(callResult.resultObj), insurance.config.baseInfo);
      callResult = insurance.tools.insSystemSyncAjax(param.returnHandleUrl, returnParam);
    }
    return callResult;
  },
  //门特申请变更14B
  opsdTreatmentChange: function (param) {
    var callResult = "";
    callResult = insurance.tools.insSystemSyncAjax(param.paramCreateUrl, param);
    if (callResult.code == 1 || callResult.result == "Success") {
      // 拿到组织好的参数
      insurance.interface.insuLocalWeb.indata = callResult.resultObj;
      paramInsu = $.extend(insurance.interface.insuLocalWeb, param.insurancePubInfo);
      callResult = yinhaiService.call(paramInsu);
    }
    if (callResult.code == 1 || callResult.result == "Success") {
      var returnParam = $.extend(JSON.parse(callResult.resultObj), insurance.config.baseInfo);
      callResult = insurance.tools.insSystemSyncAjax(param.returnHandleUrl, returnParam);
    }
    return callResult;
  },
  //门特申请取消15
  opsdTreatmentCancle: function (param) {
    var callResult = "";
    callResult = insurance.tools.insSystemSyncAjax(param.paramCreateUrl, param);
    if (callResult.code == 1 || callResult.result == "Success") {
      // 拿到组织好的参数
      insurance.interface.insuLocalWeb.indata = callResult.resultObj;
      paramInsu = $.extend(insurance.interface.insuLocalWeb, param.insurancePubInfo);
      callResult = yinhaiService.call(paramInsu);
    }
    if (callResult.code == 1 || callResult.result == "Success") {
      var returnParam = $.extend(JSON.parse(callResult.resultObj), insurance.config.baseInfo);
      callResult = insurance.tools.insSystemSyncAjax(param.returnHandleUrl, returnParam);
    }
    return callResult;
  },
  //门特申请记录查询16
  opsdTreatmentResult: function (param) {
    var callResult = "";
    callResult = insurance.tools.insSystemSyncAjax(param.paramCreateUrl, param);
    if (callResult.code == 1 || callResult.result == "Success") {
      // 拿到组织好的参数
      insurance.interface.insuLocalWeb.indata = callResult.resultObj;
      paramInsu = $.extend(insurance.interface.insuLocalWeb, param.insurancePubInfo);
      callResult = yinhaiService.call(paramInsu);
    }
    if (callResult.code == 1 || callResult.result == "Success") {
      var returnParam = $.extend(JSON.parse(callResult.resultObj), insurance.config.baseInfo);
      callResult = insurance.tools.insSystemSyncAjax(param.returnHandleUrl, returnParam);
    }
    return callResult;


    // var def=$.Deferred();
    // // 入参组织
    // $.when(insurance.tools.insSystemAjax(param.paramCreateUrl, param)).then(function(data){
    //     // 医保交互
    //     return yinhaiService.call(data);
    // }).then(function(data){
    //     // 反参处理
    //     return insurance.tools.insSystemAjax(param.returnHandleUrl, data);
    //   }).then(function(data){
    //       // 交易提交
    //     def.resolve(yinhaiService.confirm(data));
    //   },function(data){
    //      // 交易撤销  
    //      def.resolve(yinhaiService.cancel(data));
    //   }); 
    //  return def.promise();

  },
  //  门特申请认定查询122
  opsdTreatmentMaintain: function (param) {
    var callResult = "";
    callResult = insurance.tools.insSystemSyncAjax(param.paramCreateUrl, param);
    if (callResult.code == 1 || callResult.result == "Success") {
      // 拿到组织好的参数
      insurance.interface.insuLocalWeb.indata = callResult.resultObj;
      paramInsu = $.extend(insurance.interface.insuLocalWeb, param.insurancePubInfo);
      callResult = yinhaiService.call(paramInsu);
    }
    if (callResult.code == 1 || callResult.result == "Success") {
      var returnParam = $.extend(JSON.parse(callResult.resultObj), insurance.config.baseInfo);
      callResult = insurance.tools.insSystemSyncAjax(param.returnHandleUrl, returnParam);
    }
    return callResult;
  },
  //  门特记录处方关联 201
  saveIbh1aForVaf3: function (param) {
    var callResult = "";
    callResult = insurance.tools.insSystemSyncAjax(param.paramCreateUrl, param);
    return callResult;
  },
  //  门特方案内部审核状态查询 202
  checkOPSDApplyStatus: function (param) {
    var callResult = "";
    callResult = insurance.tools.insSystemSyncAjax(param.paramCreateUrl, param);
    return callResult;
  },
  //  门特方案内部审核状态变更 203
  checkOPSDApply: function (param) {
    var callResult = "";
    callResult = insurance.tools.insSystemSyncAjax(param.paramCreateUrl, param);
    return callResult;
  },


  checkErr: function (inputStr) {
    if (inputStr == null || inputStr == '' || inputStr == "undefined") {
      return false;
    }
    var errno2 = msg1.indexOf("调用医保接口参数文件");
    if (!(errno2 < 0)) {
      return false;
    }
    var errno1 = msg1.indexOf("error:");
    if (!(errno1 < 0)) {
      return false;
    }
  },
  formatFail: function (msg, data) {
    return {
      code: this.Fail,
      errMsg: insurance.tools.isNull(msg) ? "失败" : msg,
      data: insurance.tools.isNull(data) ? [] : data
    };
  },
  formatSuccess: function (msg, data) {
    return {
      code: this.Success,
      errMsg: insurance.tools.isNull(msg) ? "成功" : msg,
      data: insurance.tools.isNull(data) ? [] : data
    };
  },
};


var yinhaiService = {
  url: insurance.config.baseInfo.insCommonParams.insuBaseUrl,
  callLocalService: function (requestData, successFunction, failFunction) {
    $.support.cors = true;
    $.ajax({
      url: requestData.localServiceUrl,
      type: "POST",
      // crossDomain: true,
      dataType: "json",
      data: requestData.data,
      async: false,
      success: function (data) {
        if (data.code == 1) {
          successFunction(data);
        } else {
          console.log("调用本地医保组件发生错误:");
          console.log(data.ex ? data.ex : "请查阅日志");
          console.log("请联系管理员");
          failFunction(data);
        }
      },
      error: function (xhr) {
        var msg = "";
        if (xhr.readyState == 4) {
          if (xhr.status == 0) {
            msg = "调用医保出错，请先启动本地服务！";
          } else {
            msg = "请先初始化医保接口！";
          }
        } else {
          msg = "调用医保出错，请先启动医保本地服务！"
        }
        // failFunction("调用本地医保服务发生错误.");
        failFunction(msg);
      }
    });
  },
  //init流程
  init: function () {
    var result = {};
    this.callLocalService({
      localServiceUrl: yinhaiService.url,
      data: {
        methodServer: "yh_interface_init",
        input: ''
      }
    }, function (data) {
      result = {
        state: data.retCode == 0 ? "1" : "0",
        errMsg: data.retValue,
        data: {}
      }
    }, function (msg) {
      result = {
        state: "0",
        errMsg: msg,
        data: {}
      }
    });

    return result;
  },

  //call流程
  call: function (param) {
    if (insurance.tools.isNull(param)) {
      throw "调用call流程时，【 param 】交易入参为空.";
    }
    var result = {};
    yinhaiService.callLocalService({
      localServiceUrl: yinhaiService.url,
      data: $.extend({
        method: "yh_interface_call",
        indata: param
      }, param)
    }, function (data) {
      result = data;
    }, function (msg) {
      result = msg;
    });
    return result;
  },

  //call流程
  callDetails: function (dataset) {
    if (insurance.tools.isNull(dataset))
      throw "调用callDetails流程时，【 dataset 】交易输入入参为空.";

    var result = {};
    this.callLocalService({
      localServiceUrl: yinhaiService.url,
      data: {
        methodServer: "yh_interface_call",
        dataset: JSON2.stringify(dataset)
      }
    }, function (data) {
      result = {
        state: data.retCode == 0 ? "1" : "0",
        errMsg: data.retCode == 0 ? "" : data.retValue,
        data: data.retCode == 0 ? data.retValue : ""
      };
    }, function (msg) {
      result = {
        state: "0",
        errMsg: msg,
        data: ""
      };
    });

    return result;
  },

  // confirm 流程
  confirm: function (input) {
    if (insurance.tools.isNull(input))
      throw "调用call流程时，【 input 】交易入参为空.";

    var result = {};
    this.callLocalService({
      localServiceUrl: yinhaiService.url,
      data: {
        methodServer: "yh_interface_confirm",
        input: input
      }
    }, function (data) {
      result = {
        state: data.retCode == 0 ? "1" : "0",
        errMsg: data.retCode == 0 ? "" : data.retValue,
        data: data.retCode == 0 ? data.retValue : ""
      };
    }, function (msg) {
      result = {
        state: "0",
        errMsg: msg,
        data: ""
      };
    });

    return result;
  },

  // uncertaintytrade 流程
  uncertaintytrade: function (input) {
    if (insurance.tools.isNull(input))
      throw "调用call流程时，【 input 】交易入参为空.";

    var result = {};
    this.callLocalService({
      localServiceUrl: yinhaiService.url,
      data: {
        methodServer: "yh_interface_getuncertaintytrade",
        input: input
      }
    }, function (data) {
      result = {
        state: data.retCode == 0 ? "1" : "0",
        errMsg: data.retCode == 0 ? "" : data.retValue,
        data: data.retCode == 0 ? data.retValue : ""
      };
    }, function (msg) {
      result = {
        state: "0",
        errMsg: msg,
        data: ""
      };
    });

    return result;
  },

  // cancel 流程
  cancel: function (input) {
    if (insurance.tools.isNull(input))
      throw "调用call流程时，【 input 】交易入参为空.";

    var result = {};
    this.callLocalService({
      localServiceUrl: yinhaiService.url,
      data: {
        methodServer: "yh_interface_cancel",
        input: input
      }
    }, function (data) {
      result = {
        state: data.retCode == 0 ? "1" : "0",
        errMsg: data.retCode == 0 ? "" : data.retValue,
        data: data.retCode == 0 ? data.retValue : ""
      };
    }, function (msg) {
      result = {
        state: "0",
        errMsg: msg,
        data: ""
      };
    });

    return result;
  },
  //getempInfo流程
  getempInfo: function (input) {
    if (insurance.tools.isNull(input))
      throw "调用getempInfo流程时，【 input 】交易入参为空.";

    var result = {};
    this.callLocalService({
      localServiceUrl: yinhaiService.url,
      data: {
        methodServer: "GetEmpInfo",
        input: input
      }
    }, function (data) {
      result = {
        state: data.retCode == 0 ? "1" : "0",
        errMsg: data.retCode == 0 ? "" : data.retValue,
        data: data.retCode == 0 ? data.retValue : ""
      }
    }, function (msg) {
      result = {
        state: "0",
        errMsg: msg,
        data: {}
      }
    });

    return result;
  }
};

/**
 * 异步日志
 * request  记录数据
 * params ： 接口公共传参
 * inOrOut : 入参还是出参  1 ： 入参 2：出参
 * @type {{asynLog: AsynLog.asynLog}}
 */
var AsynLog = {
  asynLog: function (request, params, inOrOut, logId) {
    var paramsValue = request;
    var url = "";
    if ("1" == inOrOut) {
      paramsValue = $.extend({}, paramsValue, params);
      url = params.efsurl + "/common/addRequestLogs";
    } else {
      url = params.efsurl + "/common/addResponseLogs"
    }

    var logInObject = {
      operaterName: params.operaterName,
      operaterId: params.operaterId,
      methodName: params.interfacename,
      parmstype: ("1" == inOrOut) ? "P1" : "P2",
      parmsvalue: JSON2.stringify(paramsValue),
      methodType: "POST",
      insuranceSystem: params.insuranceSystem,
      logId: logId
    };

    Requester.pAjax(url, logInObject, function (data) {}, function (errorMsg) {}, true);
  }
};
