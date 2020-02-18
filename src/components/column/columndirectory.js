/**
 * 
 * @param {传过来this} _this 
 * @param {传过来是哪个tab} index 
 */

export const Leftcolumndirectory = (_this, index) => { // 获取左侧表格column
  let LeftcatalogueJson = [ //药品目录
    {
      label: '对应状态',
      id: 'status',
      width: 100,
      fn: _this.correspondingRelation,
    },
    {
      label: '药品编码',
      id: 'bby04',
    },
    {
      label: '药品名称',
      id: 'bby05'
    },
    {
      label: '剂量',
      id: 'bag03'
    },
    {
      label: '剂型',
      id: 'bap02'
    },
    {
      label: '规格',
      id: 'bby06'
    },
    {
      label: '批准文号',
      id: 'bag15'
    },
    {
      label: '价格单位',
      id: 'bag40'
    },
    {
      label: '价格包装',
      id: 'bag41'
    },
    {
      label: '产地类型',
      id: 'bag11',
      fn: _this.originType

    },
    {
      label: '协定药品',
      id: 'bag12'
    },
    {
      label: '自制药品',
      id: 'bag13'
    },
    {
      label: '注册商标',
      id: 'bag16'
    },
    {
      label: '批发价',
      id: 'bag18'
    },
    {
      label: '指导价',
      id: 'bag19'
    },
    {
      label: '高危药品分类',
      id: 'blw0'
    },
    {
      label: '基本药物',
      id: 'bag49'
    },
    {
      label: '抗生素分代级别',
      id: 'bag50'
    },
    {
      label: '药品本位码',
      id: 'bby50'
    },
  ]
  let projectsJson = [{ //诊疗项目
      label: '对应状态',
      id: 'status',
      width: 100,
      fn: _this.correspondingRelation,
    },
    {
      label: '项目编码',
      id: 'bby04'
    },
    {
      label: '收入项目',
      id: 'bax01'
    },
    {
      label: '单价',
      id: 'bby25'
    },
    {
      label: '偿付类别',
      id: 'aas01'
    },
    {
      label: '收据费别',
      id: 'abf01'
    },
    {
      label: '病案费别',
      id: 'aba01'
    },
    {
      label: '其他费别',
      id: 'bcg01'
    },
    {
      label: '折扣费别',
      id: 'bch01'
    },
    {
      label: '业务类别',
      id: 'acf01'
    },
    {
      label: '电子监管码',
      id: 'bby45'
    },
    {
      label: '说明',
      id: 'bby29'
    },
    {
      label: '财务费别',
      id: 'bgf01'
    },
    {
      label: '业务费别',
      id: 'bhh01'
    },
  ]
  let consumablesJson = [ //物资耗材
    {
      label: '对应状态',
      id: 'status',
      width: 100,
      fn: _this.correspondingRelation,
    },
    {
      label: '材料编码',
      id: 'bby04'
    },
    {
      label: '材料名称',
      id: 'bby05'
    },
    {
      label: '包装单位',
      id: 'bct18'
    },
    {
      label: '包装数量',
      id: 'bct19'
    },
    {
      label: '批发价',
      id: 'bct20'
    },
    {
      label: '指导价',
      id: 'bct21'
    },
    {
      label: '产地类型',
      id: 'acn02'
    },
    {
      label: '批准文号',
      id: 'bct15'
    },
    {
      label: '注册证书有效期',
      id: 'bct35',

    },
    {
      label: '注册证书名称',
      id: 'bct36'
    },
    {
      label: '许可证号',
      id: 'bct13'
    },
    {
      label: '许可证有效期',
      id: 'bct14',
      width: 170,
      fn: _this.dateFormat
    },
  ]
  let ICDJson = [ //ICD目录
    {
      label: '对应状态',
      id: 'status',
      width: 100,
      fn: _this.correspondingRelation,
    },
    {
      label: '类型',
      id: 'ach01'
    },
    {
      label: 'ICD编码',
      id: 'bak02'
    },
    {
      label: '中文名称',
      id: 'bak05'
    },
    {
      label: '英文名',
      id: 'bak'
    },
    {
      label: '拼音',
      id: 'abbrp'
    },
    {
      label: '五笔',
      id: 'abbrw'
    },
    {
      label: '性别限制',
      id: 'abw01'
    },
    {
      label: '疗效限制',
      id: 'abx01'
    },
    {
      label: '分娩',
      id: 'bak12'
    },
    {
      label: '手术类型',
      id: 'sslx'
    },
    {
      label: '操作类型',
      id: 'bak23'
    },
    {
      label: '统计码',
      id: 'bak14'
    },
    {
      label: '疾病分类',
      id: 'bah01'
    },
    {
      label: '专业病种分类',
      id: 'bmq01'
    },
    {
      label: '有效时间',
      id: 'bak17',
      width: 170,
      fn: _this.dateFormat
    },
    {
      label: '说明',
      id: 'bak07'
    },
  ]
  debugger;
  let parmsArr;
  switch (index) {
    case '1':
      parmsArr = LeftcatalogueJson //药品目录
      break;
    case '2':
      parmsArr = projectsJson //诊疗项目
      break;
    case '3':
      parmsArr = consumablesJson //物资耗材
      break;
    case '4':
      parmsArr = ICDJson //ICD编码
      break;
  }
  return parmsArr
}
export const rightcolumndirectory = (_this, index) => { // 获取右侧表格column
  let rightcatalogueJson = [{
      label: "编码",
      id: "iah04",

    },
    {
      label: "名称",
      id: "iah05",
    },
    {
      label: "医保类型",
      id: "yblx",
      fn: _this.insurance
    },
    {
      label: "费用等级",
      id: "fydj",
      fn: _this.costLevel
    },

    {
      label: "商品名",
      id: "iah06"
    },
    {
      label: "规格",
      id: "iah14"
    },
    {
      label: "剂型",
      id: "iah15"
    },
    {
      label: "英文名",
      id: "iah07"
    },
    {
      label: "保险偿付费别",
      id: "iaw03"
    },
    {
      label: "保险费别编码",
      id: "iaf03"
    },
    {
      label: "保险费别",
      id: "iaf04"
    },
    {
      label: "保险赔付类型编码",
      id: "iae03"
    },
    {
      label: "保险赔付类型",
      id: "iae04"
    },
    {
      label: "拼音码",
      id: "abbrp"
    },
    {
      label: "五笔码",
      id: "abbrwa"
    },
    {
      label: "单位",
      id: "iah16"
    },
    {
      label: "参考价",
      id: "iah17"
    }
  ]
  let ICDJson = [{
      label: "医保类型",
      id: "yblx",
      fn: _this.insurance

    },
    {
      label: "编码",
      id: "iad03",

    },
    {
      label: "名称",
      id: "iad04",
    },
    {
      label: "ICD编码",
      id: "bak02"
    },
    {
      label: "拼音",
      id: "abbrp"
    },
    {
      label: "五笔",
      id: "abbrw"
    },
    {
      label: "说明",
      id: "iad07"
    },
    {
      label: "类型",
      id: "iad09"
    },
    {
      label: "最高赔付",
      id: "iad11"
    },
    {
      label: "使用",
      id: "enabl",
      fn: _this.notFormat,
      width: 80
    },
    {
      label: "性别",
      id: "abw01",
      width: 80
    },
    {
      label: "更新日期",
      id: "iad13",
      fn: _this.dateFormat,
      width: 180
    },
    {
      label: "有效日期",
      id: "iad14",
      fn: _this.dateFormat
    },
    {
      label: "ial01",
      id: "ial01",

    }
  ];
  let parmsArr;
  if (index != '4') {
    parmsArr = rightcatalogueJson //药品目录  诊疗项目  物资耗材  
  } else {
    parmsArr = ICDJson //ICD目录
  }

  return parmsArr

}


export const leftcolumncountercode = (_this, index) => { //  自动对码左侧表格
  let leftJson = [{
      label: "编码",
      id: "itemcode",
    },
    {
      label: "通用名称",
      id: "itemname",
    },
    {
      label: "规格",
      id: "bby06",
    },
    {
      label: "剂型",
      id: "bap02",
    },
    {
      label: "剂量",
      id: "bag03",
    },
    {
      label: "生产厂家",
      id: "bbe02",
    },
    {
      label: "药品单位",
      id: "bby08",
    },
    {
      label: "价格",
      id: "bag41",
    },
    // {
    //   label: "药监局编码",
    //   id: "",
    // },
    {
      label: "国药准字",
      id: "bag15",
    },
  ]

  let codeICDJson = [{
      label: "ICD编码",
      id: "bak02"
    },
    {
      label: "中文名称",
      id: "bak05"
    },
    {
      label: "英文名称",
      id: "bak06"
    },
    {
      label: "拼音码",
      id: "abbrp"
    },
    {
      label: "五笔码",
      id: "abbrw"
    },
    {
      label: "统计码",
      id: "bak14"
    },
    {
      label: "分类",
      id: "bah03"
    },
    {
      label: "性别限制",
      id: "abw01"
    },
    {
      label: "说明",
      id: "bak07"
    },
  ]
  let parmsArr;
  if (index != '4') {
    parmsArr = leftJson //药品目录  诊疗项目  物资耗材  
  } else {
    parmsArr = codeICDJson //ICD目录
  }
  return parmsArr
}


export const rightcolumncountercode = (_this, index) => { //  自动对码左侧表格
  let rightJson = [{
      label: "医保编码",
      id: "iah04",
    },
    {
      label: "通用名称",
      id: "iah05",
      fn: _this.clickoncell
    },
    {
      label: "批准文号",
      id: "iah36",
    },
    {
      label: "产地",
      id: "iah32",
    },
    {
      label: "剂型",
      id: "iah15",
    },
    {
      label: "规格",
      id: "iah14",
    },
    {
      label: "单位",
      id: "iah16",
    },
    // {
    //   label: "用法",
    //   id: "",
    // },
    // {
    //   label: "用量",
    //   id: "",
    // },
    {
      label: "包装规格",
      id: "iah48",
    },
    {
      label: "草药限制",
      id: "iah22",
    },
    {
      label: "复方限制",
      id: "iah23",
    },
    {
      label: "其他限制",
      id: "iah24",
    }

  ]
  let ICDJson = [{
      label: "ICD10代码",
      id: "iad03"
    },
    // {
    //   label: "ICD10副编码",
    //   id: ""
    // },
    {
      label: "ICD10名称",
      id: "iad04"
    },
    {
      label: "拼音码",
      id: "abbrp"
    },
    {
      label: "五笔码",
      id: "abbrw"
    },
    // {
    //   label: "规格",
    //   id: ""
    // },
    {
      label: "变更时间",
      id: "iad13"
    },
    {
      label: "备注",
      id: "iad15"
    },

  ]
  let parmsArr;
  if (index != '4') {
    parmsArr = rightJson //药品目录  诊疗项目  物资耗材  
  } else {
    parmsArr = ICDJson //ICD目录
  }
  return parmsArr
}


export const columnmanagement = (_this) => { //门诊交易管理
  let managementJson = [{
      label: "门诊号",
      id: "",
    },
    {
      label: "姓名",
      id: "",
    },
    {
      label: "性别",
      id: "",
    },
    {
      label: "年龄",
      id: "",
    },
    {
      label: "身份证号",
      id: "",
    },
    {
      label: "总金额",
      id: "",
    },
    {
      label: "医保返回总额",
      id: "",
    },
    {
      label: "账户支付",
      id: "",
    },
    {
      label: "结账日期",
      id: "",
    },
    {
      label: "医生",
      id: "",
    },
    {
      label: "就诊科室",
      id: "",
    },
    {
      label: "保险卡号",
      id: "",
    },
    {
      label: "保险卡号",
      id: "",
    },
    {
      label: "中心结算流水号",
      id: "",
    }
  ]
  return managementJson;
}

/**
 * 
 * @author xutao
 * @param {this} _this 
 */

export const outpatientTopclumns = (_this) => {
  let outTopJson = [

    {
      label: "个人编码",
      id: "iak05",
      width: 120,
    },
    {
      label: "姓名",
      id: "vaa05",
      width: 90
    },
    {
      label: "医疗保险机构",
      id: "insutypename",
      width: 200
    },
    {
      label: "患者状态",
      id: "iaz12",
      width: 120,
      fn: _this.patientState
    },
    {
      label: "审核状态",
      id: "ibh1a05",
      width: 170,
      fn: _this.insuranceIbh1a05

    },
    {
      label: "资格审批号",
      id: "iaz08",
    },
    {
      label: "医疗人员类别",
      id: "",
    },
    {
      label: "申请人",
      id: "bce03a",
      width: 170,
    },
    {
      label: "申请时间",
      id: "iaz11",
      width: 170,
      fn: _this.dateFormat
    },
    {
      label: "院内审核人",
      id: "bce03",
      width: 170,

    },

    {
      label: "经办机构",
      id: "iaa03",
    },

    {
      label: "门特开始时间",
      id: "iaz15",
      width: 170,
      fn: _this.dateFormat
    },
    {
      label: "门特结束时间",
      id: "iaz16",
      width: 170,
      fn: _this.dateFormat
    },

    {
      label: "申请流水号",
      id: "iaz01",
      width: 170,
    },
    {
      label: "支付类别",
      id: "",
    },
    {
      label: "出生日期",
      id: "",
      width: 170,
      fn: _this.dateFormat
    },
  ]
  return outTopJson;
}

/**
 * 
 * @param {门诊特殊病人底部表格} _this 
 */
export const outpatientbottomclumns = (_this) => {
  let outBottomJson = [{
      label: "申请流水号",
      id: "",
    },
    {
      label: "门诊特殊病种编码",
      id: "",
    },
    {
      label: "门诊特殊病种名称",
      id: "",
    },
    {
      label: "病种付费方式",
      id: "",
    },

  ]
  return outBottomJson;
}
