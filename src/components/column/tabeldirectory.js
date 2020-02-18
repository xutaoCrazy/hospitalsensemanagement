/** 
 * drugCatalogue              药品目录查询
 * diretorLeftTabelCommon     目录对照左侧表格查询
 * diretorRightTabelCommon    目录对照右侧表格查询
 * correspondenceParms        建立对应关系
 * saveCodingPreservation     自动对码保存
 */
import {
  promiseInterFace,
  promiseTabel,
  promiseAjax,
  promiseCommonAjax
} from "@/service/api/InstitutionInterface";




//==================================================================================================================================================================
export const diretorLeftTabelCommon = (_this, index) => { //左侧表格公共方法
  let parms = {};
  let url = '';
  if (index != '4') {
    url = 'insuhiscatalogall';
    parms.ItemType = index;
    parms.Today = '1990-01-01 00:00:00';
    parms.lSql = _this.lSql;
    parms.page = _this.leftcurr;
    parms.rows = _this.leftrows;
    parms.IAA01 = _this.IAA01;
    parms.ComStatus = _this.IAM06;
    parms.paramStr = {
      BDO01: _this.bdo01,
      BHH01: ''
    };
  } else {
    url = 'hisicd';
    parms.KeyWord = '';
    parms.page = _this.leftcurr;
    parms.rows = _this.leftrows;
    parms.BAK02 = '';
    parms.IAA01 = _this.IAA01;
  }
  promiseTabel(parms, url).then(res => {
    debugger;
    if (res.result == 'Success') {
      _this.lefttableData = res.rows;
      _this.lefttotal = res.total;
      if (_this.leftCorr == true) {
        _this.$refs.singleTable.setCurrentRow(res.rows[_this.leftindex]);
        _this.leftCorr = false
        _this.leftRow = res.rows[_this.leftindex];
        _this.leftRow.index = _this.leftindex
        _this.rightRow = [];
        diretorRightTabelCommon(_this, _this.directoty, true);
      }
    }
  }).catch(res => {
    _this.$confirm(res, "提示", {
      confirmButtonText: "确定",
      type: "error",
      showCancelButton: false
    });
  })
}
export const diretorRightTabelCommon = (_this, index, flag) => { //右侧公共方法
  let IAM01;
  let IAL01;
  if (flag == true) {
    IAM01 = _this.leftRow.iam01
    IAL01 = _this.leftRow.ial01
  } else {
    IAM01 = ''
    IAL01 = ''
  }
  if (index != '4') { // 药品目录 诊疗项目   物资耗材

    promiseTabel(
        //获取表格数据
        {
          page: _this.rightcurr,
          rows: _this.rightows,
          paramStr: {
            IAA01: _this.IAA01,
            ItemName: _this.ItemName,
            ItemCode: _this.ItemCode,
            IAM01: IAM01,
          }
        },
        "insucatalog"
      )
      .then(res => {
        debugger;
        //获取tabel 数据
        _this.righttableData = res.rows;
        _this.righttotal = res.total;
      })
      .catch(res => {
        _this.$confirm(res, "提示", {
          confirmButtonText: "确定",
          type: "error",
          showCancelButton: false
        });
      });
  } else { //ICD目录
    promiseTabel(
        //获取表格数据
        {
          ItemType: "1",
          IAA01: _this.IAA01,
          page: _this.rightcurr,
          rows: _this.rightows,
          KeyWord: _this.ItemName,
          ItemCode: _this.ItemCode,
          paramStr: {
            IAL01: IAL01
          }
        },
        "insuicd"
      )
      .then(res => {
        //获取tabel 数据
        _this.righttableData = res.rows;
        _this.righttotal = res.total;
      })
      .catch(res => {
        _this.$confirm(res, "提示", {
          confirmButtonText: "确定",
          type: "error",
          showCancelButton: false
        });
      });
  }
}
export const medicalInsurance = (_this) => { //加载医疗保险机构

  promiseInterFace() //  加载医疗保险接
    .then(res => {
      _this.superiormedicalArr = res;
    })
    .catch(res => {
      _this.$confirm(res, "提示", {
        confirmButtonText: "确定",
        type: "error",
        showCancelButton: false
      });
    });

  promiseAjax({ //药品分类
        ID: 1100006
      },
      "business/selectDataByScriptId"
    )
    .then(res => {
      _this.cationArr = res.list

    })
    .catch(res => {
      _this.$confirm(res, "提示", {
        confirmButtonText: "确定",
        type: "error",
        showCancelButton: false
      });
    });
  promiseAjax({
      instituionId: 569
    }, "pubdiccompensationtype") //  加载费用等级
    .then(res => {
      debugger;
      _this.costLevelArr = res.list;
    })
    .catch(res => {
      _this.$confirm(res, "提示", {
        confirmButtonText: "确定",
        type: "error",
        showCancelButton: false
      });
    });

  promiseAjax({ //项目分类
        ID: 1100008
      },
      "business/selectDataByScriptId"
    )
    .then(res => {
      _this.projectArr = res.list

    })
    .catch(res => {
      _this.$confirm(res, "提示", {
        confirmButtonText: "确定",
        type: "error",
        showCancelButton: false
      });
    });
  promiseAjax({ //物资耗材分类
        ID: 1100007
      },
      "business/selectDataByScriptId"
    )
    .then(res => {
      _this.materialArr = res.list

    })
    .catch(res => {
      _this.$confirm(res, "提示", {
        confirmButtonText: "确定",
        type: "error",
        showCancelButton: false
      });
    });

}


export const correspondenceParms = (_this, index) => {
  debugger;
  let lRow = _this.leftRow
  let rRow = _this.rightRow
  let parms = '';
  let url = '';
  if (index != 4) {
    parms = { //药品分类
      ID: 2172,
      paramStr: {
        XML: "<root><iam1><ie RecordID='1' IAA01='" + _this.IAA01 + "' BBY01='" + lRow.bby01 + "' IAH01='" + rRow.iah01 + "' IAH04='" + rRow.iah04 + "' BBY05='" + lRow.bby05 + "' IAM07=''  IAM12='' IAM13='' IAW03='' IAM16='' IAM17='0' /></iam1></root> ",
      }
    }
    url = "comparison"
  } else {
    parms = {
      sqlfunction: "new_insur_ial1_update",
      json: {
        "ial01": lRow.ial01 == undefined ? '0' : lRow.ial01,
        "bak01": lRow.bak01,
        "iaa01": _this.IAA01,
        "iad01": rRow.iad01,
        "ial05": 0
      }
    }
    url = 'function'
  }
  promiseCommonAjax(parms, url)
    .then(res => {
      _this.$message({
        message: res,
        type: "success"
      });
      _this.leftCorr = true
      _this.tableLeftInfo(1)
    })
    .catch(res => {
      debugger;
      _this.$confirm(res, "提示", {
        confirmButtonText: "确定",
        type: "error",
        showCancelButton: false
      });
    });
}

export const correspondenceNOParms = (_this, index) => {
  let parms = '';
  let url = ''
  if (index != '4') {
    parms = {
      IAM01: _this.leftRow.iam01
    }
    url = "insucompdel"
  } else {
    parms = {
      IAL01: _this.leftRow.ial01
    }
    url = "icdcompdel"
  }
  promiseAjax(parms, url)
    .then(res => {
      _this.$message({
        message: "取消对应关系成功",
        type: "success"
      });
      _this.tableLeftInfo(1)
    })
    .catch(res => {
      _this.$confirm(res, "提示", {
        confirmButtonText: "确定",
        type: "error",
        showCancelButton: false
      });
    });
}


export const automaticCounterCode = (_this, index) => {
  debugger;
  _this.loadings();
  let parms = {};
  let url = index == '4' ? 'autopreicdcomparison' : 'autoprecomparison'
  if (index != '4') {
    parms.ItemType = index
    parms.Today = '1970-01-01 00:00:00'
    parms.lSql = _this.lSql
    parms.IAM01 = ''
    parms.ComStatus = ''
    parms.paramStr = {
      BDO01: _this.bdo01,
      BHH01: ''
    }
  } else {
    parms.KeyWord = _this.lSql
    parms.BAK02 = _this.bak02;
    parms.paramStr = {
      BDO01: '',
      BHH01: _this.bdo01
    }

  }
  parms.page = _this.curr
  parms.rows = _this.rows
  parms.IAA01 = _this.IAA01



  promiseTabel(parms, url).then(res => {
    debugger;
    if (res.result == 'Success') {
      _this.hisjsonarray = []
      _this.insujsonarray = []
      _this.total = res.total
      for (let i = 0; i < res.rows.length; i++) {
        let $json = JSON.parse(res.rows[i].insujsonarray)[0]
        if ($json != null) {
          $json._checked = false
          $json.dropArr = JSON.parse(res.rows[i].insujsonarray)
          $json.eq = i
          $json.itemcode = res.rows[i].itemcode
          _this.insujsonarray.push($json)
        }
        let jsonarray = JSON.parse(res.rows[i].hisjsonarray)[0]
        jsonarray.itemcode = res.rows[i].itemcode
        _this.hisjsonarray.push(jsonarray);
      }
      _this.closeLoading()

    }
  }).catch(res => {
    _this.closeLoading()
    _this.$confirm(res, "提示", {
      confirmButtonText: "确定",
      type: "error",
      showCancelButton: false
    });
  }) //自动对码查询

}


export const saveCodingPreservation = (_this, index) => {
  debugger;
  let parms = [];
  let parmsJson = {};
  let dtolLIst = {}
  _this.insujsonarray.forEach((row, index) => {
    if (row._checked) {
      parmsJson = {};
      parmsJson.iam01 = _this.hisjsonarray[index].iam01 == null ? '0' : _this.hisjsonarray[index].iam01;
      parmsJson.iaa01 = _this.IAA01;
      parmsJson.bby01 = _this.hisjsonarray[index].bby01;
      parmsJson.iah01 = row.iah01;
      parmsJson.iam09 = row.iah04;
      parmsJson.ial01 = _this.hisjsonarray[index].ial01 == null ? '0' : _this.hisjsonarray[index].ial01;
      parmsJson.bak01 = _this.hisjsonarray[index].bak01;
      parmsJson.iad01 = row.iad01;
      parms.push(parmsJson);

    }
  });
  if (index != 4) {
    dtolLIst.iam1DtoList = parms
  } else {
    dtolLIst.ial1DtoList = parms
  }
  if (parms.length == 0) {
    _this.$message({
      message: "当前保存对码数据为空，请确认以后在保存.",
      type: "warning"
    });
    return false;
  }
  _this.loadings(true);
  let url = index == '4' ? 'autoicdcomparison' : "autocomparison";
  promiseCommonAjax(
      JSON.stringify(dtolLIst),
      url
    )
    .then(res => {
      _this.closeLoading()
      _this.$message({
        message: res,
        type: "success"
      });
    })
    .catch(res => {
      debugger;
      _this.closeLoading()

      _this.$confirm(res, "提示", {
        confirmButtonText: "确定",
        type: "error",
        showCancelButton: false
      });
    });
}

