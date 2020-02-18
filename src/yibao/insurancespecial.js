import {
  insurance
} from "@/yibao/insuranceapi";
import {
  medicalInsuranceCardAJax
} from '@/service/api/InstitutionInterface'
import {
  promises
} from "fs";

var spapiObject = {
  //门特申请变更14A
  opsdTreatmentApply: function (parms) {
    parms = $.extend(parms, insurance.config.baseInfo, insurance.config.dictionary.tradeCodeMap.SP_TREATMENT_APPLY) || {};
    var callResult = {};
    try {
      if (this.checkCommonParameters(parms.insurancePubInfo, ["insuTypeCode", "insuTypeId"])) {
        var api = insurance.api.getBean(parms.insurancePubInfo);
        callResult = api.opsdTreatmentApply(parms);
      } else {
        callResult = insurance.api.formatFail(this.errMsg);
      }
    } catch (e) {
      callResult = insurance.api.formatFail(e);
    }
    return callResult;
  },
  //门特申请变更14B
  opsdTreatmentChange: function (parms) {
    parms = $.extend(parms, insurance.config.baseInfo, insurance.config.dictionary.tradeCodeMap.SP_TREATMENT_APPLY_MODIFY) || {};
    var callResult = {};
    try {
      if (this.checkCommonParameters(parms.insurancePubInfo, ["insuTypeCode", "insuTypeId"])) {
        var api = insurance.api.getBean(parms.insurancePubInfo);
        callResult = api.opsdTreatmentChange(parms);
      } else {
        callResult = insurance.api.formatFail(this.errMsg);
      }
    } catch (e) {
      callResult = insurance.api.formatFail(e);
    }
    return callResult;
  },
  //门特申请取消15
  opsdTreatmentCancle: function (parms, insurance) {
    let p = new Promise((resolve, reject) => {
      parms = $.extend(parms, insurance.config.baseInfo, insurance.config.dictionary.tradeCodeMap.SP_TREATMENT_APPLY_CANCEL) || {};
      try {
        if (this.checkCommonParameters(parms.insurancePubInfo, ["insuTypeCode", "insuTypeId"])) {
          var api = insurance.api.getBean(parms.insurancePubInfo);
          api.opsdTreatmentCancle(parms, insurance, medicalInsuranceCardAJax).then((callResult) => {
            debugger
            resolve(callResult)
          }).catch((callResult) => {
            debugger;
            reject(callResult)
          });
        } else {
          callResult = insurance.api.formatFail(this.errMsg);
          reject(callResult)
        }
      } catch (e) {
        callResult = insurance.api.formatFail(e);
        reject(callResult)
      }
    })
    return p;
  },
  //门特申请记录查询16
  opsdTreatmentResult: function (parms, insurance) {
    debugger;
    let p = new Promise((resolve, reject) => {
      parms = $.extend(parms, insurance.config.baseInfo, insurance.config.dictionary.tradeCodeMap.SP_TREATMENT_APPLY_QUERY) || {};

      try {
        if (this.checkCommonParameters(parms.insurancePubInfo, ["insuTypeCode", "insuTypeId"])) {
          var api = insurance.api.getBean(parms.insurancePubInfo);
          api.opsdTreatmentResult(parms, insurance, medicalInsuranceCardAJax).then((callResult) => {
            resolve(callResult)
          }).catch((callResult) => {
            debugger;
            reject(callResult)
          });
        } else {
          callResult = insurance.api.formatFail(this.errMsg);
          reject(callResult)
        }
      } catch (e) {
        callResult = insurance.api.formatFail(e);
        reject(callResult)
      }
    })

    return p;
  },
  //  门特申请认定查询122
  opsdTreatmentMaintain: function (parms) {
    parms = $.extend(parms, insurance.config.baseInfo, insurance.config.dictionary.tradeCodeMap.SP_TREATMENT_APPLY_MAINTAIN) || {};
    var callResult = {};
    try {
      if (this.checkCommonParameters(parms.insurancePubInfo, ["insuTypeCode", "insuTypeId"])) {
        var api = insurance.api.getBean(parms.insurancePubInfo);
        callResult = api.opsdTreatmentMaintain(parms);
      } else {
        callResult = insurance.api.formatFail(this.errMsg);
      }
    } catch (e) {
      callResult = insurance.api.formatFail(e);
    }
    return callResult;
  },
  //  门特记录处方关联
  saveIbh1aForVaf3: function (parms) {
    parms = $.extend(parms, insurance.config.baseInfo, insurance.config.dictionary.tradeCodeMap.SP_TREATMENT_LINK) || {};
    var callResult = {};
    try {
      if (this.checkCommonParameters(parms.insurancePubInfo)) {
        var api = insurance.api.getBean(parms.insurancePubInfo);
        callResult = api.saveIbh1aForVaf3(parms);
      } else {
        callResult = insurance.api.formatFail(this.errMsg);
      }
    } catch (e) {
      callResult = insurance.api.formatFail(e);
    }
    return callResult;
  },
  //  门特方案内部审核状态查询
  checkOPSDApplyStatus: async function (parms) {
    parms = $.extend(parms, insurance.config.baseInfo, insurance.config.dictionary.tradeCodeMap.SP_TREATMENT_CHECK_STATUS) || {};
    var callResult = {};
    try {
      if (this.checkCommonParameters(parms)) {
        var api = insurance.api.getBean(parms.insurancePubInfo);
        callResult = await api.checkOPSDApplyStatus(parms, insurance);
      } else {
        callResult = insurance.api.formatFail(this.errMsg);
      }
    } catch (e) {
      callResult = insurance.api.formatFail(e);
    }
    return callResult;
  },
  //  门特方案内部审核状态变更 SP_TREATMENT_CHECK
  checkOPSDApply: async function (parms) {
    parms = $.extend(parms, insurance.config.baseInfo, insurance.config.dictionary.tradeCodeMap.SP_TREATMENT_CHECK) || {};
    var callResult = {};
    try {
      if (this.checkCommonParameters(parms)) {
        var api = insurance.api.getBean(parms.insurancePubInfo);
        callResult = await api.checkOPSDApply(parms, insurance);
      } else {
        callResult = insurance.api.formatFail(this.errMsg);
      }
    } catch (e) {
      callResult = insurance.api.formatFail(e);
    }
    return callResult;
  }
};

if (insurance.api) {
  Object.assign(insurance.api, spapiObject);
} else {
  insurance.api = Object.assign({}, spapiObject);
}

export {
  insurance
}
