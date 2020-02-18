import {
  insurance
} from "@/yibao/insuranceconfig";
import {

  commonAjaxRequest
} from "@/service/api/InstitutionInterface";
import store from '@/store';
import moments from 'moment' // 导入文件
/**
 * 
 * @param {当前对象} _this 
 * @param {1是新增,2是审核} num 
 * @param {row 是审核传过来的数据} row 
 */
export const medicalInsuranceCard = async (_this, num, row) => {
  _this.loadings();
  insurance.config.baseInfo.insurancePubInfo.insuTypeId = num == 2 ? _this.medicalCardArr.iaa01 : row.iaa01;
  insurance.config.baseInfo.insurancePubInfo.insuTypeCode = num == 2 ? _this.medicalCardArr.iaa02 : row.insutypecode;
  insurance.config.baseInfo.insurancePubInfo.tradeCode = 100003;
  insurance.config.baseInfo.insurancePubInfo.operaterName = store.state.trueName;
  if (num == 2) { //申请
    insurance.api.getPersonInfo('', _this).then(async function (data) {
      _this.closeLoading()
      if (data.result == 'Success') {
        applyPatientInfo(_this, num, row, data)
      } else {
        _this.closeLoading()
        _this.$confirm(data.resultMsg, "提示", {
          confirmButtonText: "确定",
          type: "error",
          showCancelButton: false
        });

      }
    }).catch(function (data) {
      _this.closeLoading()
      _this.$confirm("1" + data.resultMsg, "提示", {
        confirmButtonText: "确定",
        type: "error",
        showCancelButton: false
      });
    });
  } else if (num == 3) { //审核
    //   指定此次交易的his人员vaa01
    _this.closeLoading()
    insurance.config.baseInfo.hisPatientInfo.vaa01 = row.vaa01
    let params = await insurance.api.checkOPSDApplyStatus({}, insurance);
    // 已经
    if ((params.resultObj && (params.resultObj.ibh1a05 == 0) || !params.resultObj)) {
      doctorIfrma(_this, num, row)
    } else {
      _this.$confirm(row.vaa05 + '患者已经有有效记录', "提示", {
        confirmButtonText: "确定",
        type: "error",
        showCancelButton: false
      });
    }
  } else if (num == 6) {
    applyPatientInfo(_this, num, row)
  } else { //  查看 变更
    _this.closeLoading()
    doctorIfrma(_this, num, row)
  }
}

export const batchGetSysParamSearh = (_this) => {
  debugger;
  let values = [],
    views = [];
  views.push(
    "programid||'_'||productid||'_'||paramno as key,Value,DefValue"
  );
  values.push({
    productid: 100,
    programid: 103017,
    paramno: 46
  });
  values.push({
    productid: 100,
    programid: 103017,
    paramno: 47
  });
  values.push({
    productid: 100,
    programid: 103017,
    paramno: 48
  });
  let url = "his/common/query/batchGetSysParam";
  commonAjaxRequest({
        values: JSON.stringify(values),
        views: JSON.stringify(views)
      },
      url
    ) //查询参数
    .then(res => {
      if (res.list) {
        _this.parmsArrIn = res.list
      }
    })
    .catch(res => {
      _this.$confirm(res, "提示", {
        confirmButtonText: "确定",
        type: "error",
        showCancelButton: false
      });
    });
}


export const doctorIfrma = (_this, num, row, data) => {
  debugger;
  var MTParams = {
    bce01: num != 2 ? row.bce01 : store.state.employeeId,
    bce03: num != 2 ? row.bce03 : store.state.trueName,
    applyTime: moments().format("YYYY-MM-DD HH:mm:ss"),
    bce01a: store.state.employeeId,
    bce03a: store.state.trueName,
    auditTime: moments().format("YYYY-MM-DD HH:mm:ss"),
    optionType: num,
    abc01: num != 2 ? row.abc01 : _this.abc01Val.abc01,
    abc02: num != 2 ? row.abc02 : _this.abc01Val.abc02,
    iaz13: num == 4 ? row.iaz13 : '',
    auditAuthority: _this.audithidden,
    ibh1a01: row ? row.ibh1a01 : '',
    ibh1a08: row ? row.ibh1a08 : '',
    ibh1a09: row ? row.ibh1a09 : ''
  }
  _this.addMentor = true;
  _this.insuranceCard = false;
  let hisPatientInfoParms = num != 2 ? encodeURI(row.vaa1json) : encodeURI(JSON.stringify(JSON.parse(data.resultObj).hisPatientInfo))
  _this.srcMentor = store.state.doctorUrl + "/jsp/ordernew/new_mediadv_plus.jsp" +
    "?valid=1" +
    "&MTPatientInfo=" + hisPatientInfoParms +
    "&theme_type=la" +
    "&outcall=true" +
    "&hospitalId=" + store.state.baseHospitalid +
    "&departmentId=" + JSON.parse(_this.parmsArrIn[0].value).bck01 +
    "&departmentname=" + JSON.parse(_this.parmsArrIn[0].value).bck03 +
    "&inpatientAreaId=" + JSON.parse(_this.parmsArrIn[1].value).bck01 +
    "&inpatientAreaName=" + JSON.parse(_this.parmsArrIn[1].value).bck03 +
    "&mediadvRecordPerson=0" + //本人：0  区分本人小孩
    "&loginName=" + store.state.loginName +
    "&employeeId=" + store.state.employeeId +
    "&trueName=" + store.state.trueName +
    "&userId=" + store.state.userId +
    "&jsessionids=" + store.state.jsessionids +
    "&MTFA=true" +
    "&MTParams=" + encodeURI(JSON.stringify(MTParams)) +
    "&parentId=ybiframe";
  if (num != 2) {
    _this.srcMentor += "&cbm01=" + row.cbm01;

  }
}


export const applyPatientInfo = async (_this, num, row, data) => {
  insurance.config.baseInfo.hisPatientInfo.vaa01 = num == 2 ? JSON.parse(data.resultObj).hisPatientInfo.vaa01 : row.vaa01
  let params = await insurance.api.checkOPSDApplyStatus({}, insurance);
  // 新增条件  ibh1a02 不存在，或者等于5（作废），如果是 0，1，2，3，4 都不可以
  if (!params.resultObj || params.resultObj.ibh1a02 == undefined || (params.resultObj.ibh1a02 != undefined && params.resultObj.ibh1a02 == 5)) {
    doctorIfrma(_this, 2, row, data)
  } else {
    _this.$confirm(num == 2 ? JSON.parse(data.resultObj).hisPatientInfo.vaa05 : row.vaa05 + '患者已经有有效记录', "提示", {
      confirmButtonText: "确定",
      type: "error",
      showCancelButton: false
    });
  }
}
