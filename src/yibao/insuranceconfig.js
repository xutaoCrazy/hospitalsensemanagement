import store from '@/store';
let insurance = insurance || {};
insurance.config = {
  baseInfo: {
    //  his 人员信息
    hisPatientInfo: {
      vaa01: ""
    },

    //  公共入参配置
    insurancePatientInfo: {
      insuPatientCode: "", //  人员编码
      insuPatientPayType: "", //  支付类别
      insuPatientVisitNo: "", //  就诊编号
      insuPatientSpType: "" //  门特业务类型

    },
    // 初始化参数
    insCommonParams: {
      jsPath: "", // 对应各自医保的js文件
      hisBaseUrl: '',
      hisResourceUrl: '', //获取个性化接口
      insuBaseUrl: ''
    },
    //  公共入参配置
    insurancePubInfo: {
      operaterId: "", //  HIS操作员编号
      edition: "", //  接口版本    
      operaterName: "", //  HIS操作员姓名
      insuTypeId: "", //  医保经办机构ID iaa101
      insuTypeCode: "", //  医保经办机构CODE
      tradeCode: "" //  交易编码
    }
  },
  //  配置字典
  dictionary: {
    tradeCodeMap: {
      PUB_SING_IN: {
        code: 100001,
        method: "signIn",
        content: "签到05",
        paramCreateUrl: "his/hoinsurance/csi/in/pub/sign",
        returnHandleUrl: "his/hoinsurance/csi/out/pub/sign"
      },
      PUB_SING_OUT: {
        code: 100002,
        method: "signOut",
        content: "签退",
        paramCreateUrl: "",
        returnHandleUrl: ""
      },
      PUB_PERSON_INFO: {
        code: 100003,
        method: "getPersonInfo",
        content: "获取病人信息",
        paramCreateUrl: "his/hoinsurance/csi/in/pub/patientinsuinfo",
        returnHandleUrl: "his/hoinsurance/csi/out/pub/patientinsuinfo"
      },
      OUT_REG: {
        code: 200001,
        method: "signIn",
        content: "门诊登记",
        paramCreateUrl: "",
        returnHandleUrl: ""
      },
      SP_TREATMENT_APPLY: {
        code: 300001,
        method: "signIn",
        content: "门特方案申请14A",
        paramCreateUrl: "his/hoinsurance/spcsi/organization/opsdtreatmentapply",
        returnHandleUrl: "his/hoinsurance/spcsi/analysis/opsdtreatmentapply"
      },
      SP_TREATMENT_APPLY_MODIFY: {
        code: 300002,
        method: "signOut",
        content: "门特方案变更14B",
        paramCreateUrl: "his/hoinsurance/spcsi/organization/opsdtreatmentchange",
        returnHandleUrl: "his/hoinsurance/spcsi/analysis/opsdtreatmentchange"
      },
      SP_TREATMENT_APPLY_CANCEL: {
        code: 300003,
        method: "getPersonInfo",
        content: "门特方案回退15",
        paramCreateUrl: "his/hoinsurance/spcsi/organization/opsdtreatmentcancle",
        returnHandleUrl: "his/hoinsurance/spcsi/analysis/opsdtreatmentcancle"
      },
      SP_TREATMENT_APPLY_QUERY: {
        code: 300004,
        method: "getPersonInfo",
        content: "门特方案查询16",
        paramCreateUrl: "his/hoinsurance/spcsi/organization/queryopsdtreatmentreulst",
        returnHandleUrl: "his/hoinsurance/spcsi/analysis/queryopsdtreatmentreulst"
      },
      SP_TREATMENT_APPLY_MAINTAIN: {
        code: 300005,
        method: "getPersonInfo",
        content: "门特方案认定查询122",
        paramCreateUrl: "his/hoinsurance/spcsi/organization/opsddisease",
        returnHandleUrl: "his/hoinsurance/spcsi/analysis/opsddisease"
      },
      SP_TREATMENT_LINK: {
        code: 300006,
        method: "getPersonInfo",
        content: "门特方案处方关联表",
        paramCreateUrl: "his/hoinsurance/spcsi/opsdibh1a01",
        returnHandleUrl: ""
      },
      SP_TREATMENT_CHECK_STATUS: {
        code: 300007,
        method: "getPersonInfo",
        content: "门特方案内部审核状态查询",
        paramCreateUrl: "his/hoinsurance/spcsi/hos/checkopsdapplaystatus",
        returnHandleUrl: ""
      },
      SP_TREATMENT_CHECK: {
        code: 300008,
        method: "getPersonInfo",
        content: "门特方案内部审核状态变更",
        paramCreateUrl: "his/hoinsurance/spcsi/hos/checkopsdapplay",
        returnHandleUrl: ""

      }
    }
  }
};
insurance.interface = {
  insuLocalWeb: {
    indata: "",
    id: 1
  }
};

export {
  insurance
}
