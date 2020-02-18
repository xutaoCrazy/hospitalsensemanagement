<template>
  <div class="outcontain">
    <el-main style="height:100%;position: relative;">
      <div class="main-header">
        <el-form label-width="80px">
          <el-row style="height:100%">
            <el-col :span="24">
              <el-col :span="4">
                <el-form-item label="开始时间">
                  <el-date-picker
                    type="date"
                    placeholder="选择日期"
                    style="width:100%"
                    v-model="stateFrom.ibh1a08"
                  ></el-date-picker>
                </el-form-item>
              </el-col>
              <el-col :span="4">
                <el-form-item label="结束时间">
                  <el-date-picker
                    type="date"
                    placeholder="选择日期"
                    style="width:100%"
                    v-model="stateFrom.ibh1a09"
                  ></el-date-picker>
                </el-form-item>
              </el-col>
              <el-col :span="4">
                <el-form-item label="医保机构">
                  <el-select
                    placeholder="请选择"
                    size="small"
                    v-model="stateFrom.iaa01"
                    @change="seateFromIaa01Change"
                    clearable
                  >
                    <el-option
                      v-for="item in iaa01Arr"
                      :key="item.iaa01"
                      :label="item.iaa03"
                      :value="item.iaa01"
                    ></el-option>
                  </el-select>
                </el-form-item>
              </el-col>
              <!-- <el-col :span="4">
                <el-form-item label="支付类别">
                  <el-select placeholder="请选择" size="small" v-model="stateFrom.iax04">
                    <el-option
                      v-for="item in paymentArr"
                      :key="item.iax01"
                      :label="item.iax05"
                      :value="item.iax01"
                    ></el-option>
                  </el-select>
                </el-form-item>
              </el-col>-->
              <el-col :span="4">
                <el-form-item label="患者状态">
                  <el-select placeholder="请选择" size="small" v-model="stateFrom.iaz12" clearable>
                    <el-option
                      v-for="item in  stateArr"
                      :label="item.label"
                      :value="item.id"
                      :key="item.id"
                    ></el-option>
                  </el-select>
                </el-form-item>
              </el-col>
              <el-col :span="4" style="text-align:left;padding-left:10px">
                <el-button type="primary" size="small" @click="topTabelData">查询</el-button>
                <el-button type="primary" size="small" @click="insuranceCard=true">新增</el-button>
              </el-col>
            </el-col>
          </el-row>
        </el-form>
      </div>
      <div class="main-content">
        <div class="main-bottom-header">
          <el-table
            height="100%"
            index="1"
            border
            stripe
            :data="topTabel.Data"
            @current-change="seltRowMetor"
            :empty-text="resultMsg"
          >
            <el-table-column
              v-for="col in topTabel.columns"
              :prop="col.id"
              :key="col.id"
              :label="col.label"
              align="left"
              :width="col.width"
              header-align="center"
              min-width="150"
              :fixed="col.fixed"
              show-overflow-tooltip
              :formatter="col.fn"
            ></el-table-column>
            <el-table-column
              label="操作"
              align="left"
              header-align="center"
              width="250"
              fixed="right"
            >
              <template slot-scope="scope">
                <span
                  class="edit"
                  @click="examineVerifyCommon(scope.row,3)"
                  v-if="audithidden && scope.row.iaz12 ==0 "
                >审核</span>
                <span v-if="audithidden && scope.row.iaz12 ==0 ">|</span>
                <span
                  class="edit"
                  @click="examineVerifyCommon(scope.row,5)"
                  v-if="(!scope.row.iaz12 && scope.row.iaz12!==0 )"
                >申请</span>
                <span
                  class="edit"
                  @click="examineVerifyCommon(scope.row,5)" 
                  v-if="scope.row.iaz12==4"
                >再次申请</span>
                <span v-if="scope.row.iaz12==4|| (!scope.row.iaz12 && scope.row.iaz12!==0) ">|</span>
                <span v-if="scope.row.iaz12 !=5 && scope.row.iaz12 !=6 " class="edit" @click="examineVerifyCommon(scope.row,1)">查看</span>
                <span v-if="scope.row.iaz12 !=4 && scope.row.iaz12 !=5 && scope.row.iaz12 !=6">|</span>
                <span
                  class="edit"
                  @click="examineVerifyCommon(scope.row,4)"
                  v-if="scope.row.iaz12 !=4 && scope.row.iaz12 !=5 && scope.row.iaz12 !=6"
                >变更</span>
                <span v-if="scope.row.iaz08 !='' && scope.row.iaz12 !=4 && scope.row.iaz12 !=5 && scope.row.iaz12 !=6&& !!scope.row.iaz12">|</span>
                <span
                  class="edit"
                  v-if="scope.row.iaz08 !='' && scope.row.iaz12 !=4 && !!scope.row.iaz12"
                  @click="insuranceExamine(scope.row)"
                >审核结果</span>
                <span v-if="scope.row.iaz12>0 && scope.row.iaz12<4 && !!scope.row.iaz12">|</span>
                <span
                  class="edit"
                  v-if="scope.row.iaz12>0 && scope.row.iaz12<4 && scope.row.iaz12 !=4 "
                  @click="regressionCommon(scope.row)"
                >回退</span>
              </template>
            </el-table-column>
          </el-table>
        </div>
        <div class="main-bottom-footer">
          <el-pagination
            background
            @size-change="handleSizeChange"
            @current-change="handleCurrentChange"
            :page-sizes="[5,10, 15, 20]"
            :pager-count="5"
            :page-size="topTabel.rows"
            layout="total, sizes, prev, pager, next, jumper"
            :total="topTabel.total"
          ></el-pagination>
        </div>
      </div>
    </el-main>
    <el-dialog
      title="读医保卡"
      :visible.sync="insuranceCard"
      width="500px"
      :close-on-click-modal="false"
    >
      <el-form label-width="85px" class="card-ruleForm">
        <el-row>
          <el-col :span="20">
            <el-form-item label="医保机构" :span="8">
              <el-select
                placeholder
                size="small"
                style="width:100%"
                v-model="iaaVal"
                @change="insuranceInstitutions"
                value-key="iaa01"
              >
                <el-option
                  v-for="item in iaa01Arr"
                  :key="item.iaa01"
                  :label="item.iaa03"
                  :value="item"
                ></el-option>
              </el-select>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="20">
            <el-form-item label="费别" :span="8">
              <el-select
                placeholder
                size="small"
                style="width:100%"
                v-model="abc01Val"
                value-key="abc01"
              >
                <el-option
                  v-for="item in payOffarr"
                  :key="item.abc01"
                  :label="item.abc02"
                  :value="item"
                ></el-option>
              </el-select>
            </el-form-item>
          </el-col>
        </el-row>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button type="primary" size="small" @click="readcard">读医保卡</el-button>
        <el-button size="small" @click="insuranceCard=false">取 消</el-button>
      </div>
    </el-dialog>
    <el-dialog
      title="新增门特方案"
      :visible.sync="addMentor"
      width="90%"
      :top="mHeight"
      id="metorcontaint"
      :close-on-click-modal="false"
      :destroy-on-clos="true"
    >
      <div id="completeDiv" style="width:100%;height:80vh">
        <iframe :src="srcMentor" width="100%" style="height:80vh" id="bdIframe"></iframe>
      </div>
    </el-dialog>
    <el-drawer :with-header="false" :show-close="false" :visible.sync="drawer" size="50%">
      <el-table height="100%" index="1" border stripe :data="auditArr">
        <el-table-column label=" 医保项目编码" prop="yka094" width="130" show-overflow-tooltip></el-table-column>
        <el-table-column label="医院项目名称" prop="yka095" width="200" show-overflow-tooltip></el-table-column>
        <el-table-column label="用法" prop="aka073"></el-table-column>
        <el-table-column label="用量" prop="yka293"></el-table-column>
        <el-table-column label="用药周期" prop="yka368"></el-table-column>
        <el-table-column label="物价编码" prop="yaa027" show-overflow-tooltip></el-table-column>
        <el-table-column label=" 审批通过标志" prop="akc175" width="120" :formatter="approvalMark"></el-table-column>
        <el-table-column label="审批意见" prop="yke073"></el-table-column>
        <el-table-column label="病种编码" prop="yka026"></el-table-column>
      </el-table>
    </el-drawer>
  </div>
</template>

<script>
import insuranceCardout from "@/components/insurancecard/index";
import { insurance } from "@/yibao/insurancespecial";
import {
  medicalInsuranceCard,
  batchGetSysParamSearh
} from "@/yibao/insurancecard";
import { mapState, mapMutations } from "vuex";
import AnswerSystem from "@/service/api/answerService";
import {
  outpatientTopclumns,
  outpatientbottomclumns
} from "@/components/column/columndirectory"; //获取column
import {
  promiseInterFace,
  promiseTabel,
  promiseAjax,
  commonAjaxRequest
} from "@/service/api/InstitutionInterface";

export default {
  name: "",
  data() {
    return {
      insuranceCard: false, //读医保卡
      addMentor: false, // 门特方案
      drawer: false,
      rowData: [],
      mHeight: "50px",
      srcMentor: "",
      iaa01Arr: [],
      iaaVal: "",
      iax01Val: "",
      paymentArr: [],
      medicalCardArr: [],
      parmsArrIn: [], //参数设置
      audithidden: false,
      aah01: "",
      resultMsg: "暂无数据",
      abc01Val: "",
      auditArr: [],
      payOffarr: [],
      topTabel: {
        Data: [],
        columns: outpatientTopclumns(this),
        total: 10,
        rows: 20,
        curr: 1
      },
      bottomTabel: {
        Data: [],
        columns: outpatientbottomclumns(this)
      },
      stateFrom: {
        ibh1a08: "", //开始时间
        ibh1a09: "", //结束时间
        iaz12: "", //方案状态
        iaz12: "", //医保机构
        iax04: "", //支付类型
        iaa01: ""
      },
      stateArr: [
        {
          id: 0,
          label: "未提交申请(本地缓存)"
        },
        {
          id: 1,
          label: "申请"
        },
        {
          id: 2,
          label: "审批通过"
        },
        {
          id: 3,
          label: "审批未通过"
        },
        {
          id: 4,
          label: "撤销申请"
        },
        {
          id: 5,
          label: "提交申请后作废"
        },
        {
          id: 6,
          label: "未提交申请作废"
        }
      ]
    };
  },
  computed: {
    ...mapState(["jsessionids", "employeeId", "trueName"])
  },
  watch: {
    parmsArrIn(val, oldval) {
      debugger;

      this.currentUserChange();
    }
  },
  methods: {
    handleSizeChange(val) {
      this.topTabel.rows = val;
      this.topTabel.curr = 1;
      this.topTabelData();
    },
    insuranceIbh1a05(row, column, cellValue) {
      debugger;
      let cellVal = "";
      switch (cellValue) {
        case 0:
          cellVal = "未审批";
          break;
        case 1:
          cellVal = "审批通过";
          break;
        case 2:
          cellVal = "审批不通过";
          break;
        case 9:
          cellVal = "无需审批";
          break;
      }
      return (cellValue = cellVal);
    },
    handleCurrentChange(val) {
      this.topTabel.curr = val;
      this.topTabelData();
    },
    topTabelData() {
      promiseTabel(
        //获取表格数据
        {
          page: this.topTabel.curr,
          rows: this.topTabel.rows,
          jsonStr: JSON.stringify(this.stateFrom)
        },
        "spcsi/opsdapplay"
      )
        .then(res => {
          debugger;
          //获取tabel 数据
          this.topTabel.Data = res.rows;
          this.topTabel.total = res.total;
        })
        .catch(res => {
          // this.$confirm(res, "提示", {
          //   confirmButtonText: "确定",
          //   type: "error",
          //   showCancelButton: false
          // });
          this.resultMsg = res;
          console.log(res);
          this.topTabel.Data = [];
        });
    },
    IAA01Select() {
      promiseInterFace() //  加载医疗保险接
        .then(res => {
          debugger;
          this.iaa01Arr = res;
          this.iaaVal = this.iaa01Arr[0];
          this.stateFrom.iaaval = this.iaa01Arr[0].iaa01;
          this.medicalCardArr = this.iaa01Arr[0]; //读医保卡传值
          this.paymentCategory(this.iaa01Arr[0].iaa01);
        })
        .catch(res => {
          this.$confirm(res, "提示", {
            confirmButtonText: "确定",
            type: "error",
            showCancelButton: false
          });
        });
    },
    seltRowMetor(rowData) {
      debugger;
      this.rowData = rowData;
    },
    readcard() {
      //读医保卡打卡方案弹窗
      //读医保卡
      debugger;
      medicalInsuranceCard(this, 2);
    },

    examineVerifyCommon(row, num) {
      //  1,查看 2.申请 3.审核 4.变更;
      if (row.iaz12 != 0 && num == 3 && row.iaz12 != undefined) {
        this.$message({
          message: "患者状态不是未提交申请时,不能审核",
          type: "warning"
        });
        return false;
      }
      if (num == 1 && (row.iaz12 == 5 || row.iaz12 == 6)) {
        this.$message({
          message:
            row.iaz12 == 5
              ? "患者提交申请后作废,不能查看"
              : "患者未提交申请作废,不能查看",
          type: "warning"
        });
        return false;
      }
      if (num == 4 && (row.iaz12 == 5 || row.iaz12 == 6 || row.iaz12 == 4)) {
        this.$message({
          message:
            row.iaz12 == 5
              ? "患者提交申请后作废,不能更改"
              : row.iaz12 == 6
              ? "患者未提交申请作废,不能更改"
              : "患者撤销申请,不能更改",
          type: "warning"
        });
        return false;
      }

      if (num == 4) {
        this.$confirm(
          "由于之前为病人开具的门特申请单已提交给社保局审核，您此次更改治疗方案将会为病人生成新的变更申请单！您确定要生成新的变更申请单吗？",
          "提示",
          {
            confirmButtonText: "确定",
            type: "warning",
            showCancelButton: true
          }
        ).then(async () => {
          medicalInsuranceCard(this, num, row);
        });
      } else {
        medicalInsuranceCard(this, num, row);
      }
    },
    init() {
      this.topTabelData();
      this.IAA01Select();
      insurance.api.initExternalFeeSystem({
        jsessionids: this.jsessionids
      });

      batchGetSysParamSearh(this);
      this.payOff();
    },
    async insuranceExamine(row) {
      // 此方案还未上传,请上传以后在查看
      this.loadings();
      let serverObj = {};
      insurance.config.baseInfo.insurancePubInfo.insuTypeId = row.iaa01;
      insurance.config.baseInfo.insurancePubInfo.insuTypeCode =
        row.insutypecode;
      insurance.config.baseInfo.insurancePubInfo.operaterName = this.trueName;
      serverObj.iak05 = row.iak05;
      serverObj.iax04 = row.iax04;
      serverObj.iaz08 = row.iaz08;

      debugger;
      try {
        var result = await insurance.api.opsdTreatmentResult(
          serverObj,
          insurance
        );
        if (result.result == "Success" && JSON.parse(result.resultObj).row[0]) {
          this.auditArr = JSON.parse(result.resultObj).row[0].datasetxm;
          this.drawer = true;
        } else {
          this.$confirm(result.resultMsg, "提示", {
            confirmButtonText: "确定",
            type: "error",
            showCancelButton: false
          });
        }
      } catch (data) {
        this.$confirm(data.resultMsg, "提示", {
          confirmButtonText: "确定",
          type: "error",
          showCancelButton: false
        });
      }
      this.closeLoading();
    },
    regressionCommon(row) {
      debugger;
      this.$confirm(
        "回退操作将从医保中心撤销掉之前上传的方案，请谨慎操作",
        "提示",
        {
          confirmButtonText: "确定",
          type: "warning",
          showCancelButton: true
        }
      ).then(async () => {
        this.loadings();
        let serverObj = {};
        insurance.config.baseInfo.insurancePubInfo.insuTypeId = row.iaa01;
        insurance.config.baseInfo.insurancePubInfo.insuTypeCode =
          row.insutypecode;
        insurance.config.baseInfo.insurancePubInfo.operaterName = this.trueName;
        insurance.config.baseInfo.hisPatientInfo.vaa01 = row.vaa01;
        serverObj.iak05 = row.iak05;
        serverObj.iax04 = row.iax04;
        serverObj.iaz08 = row.iaz08;

        try {
          var result = await insurance.api.opsdTreatmentCancle(
            serverObj,
            insurance
          );
          debugger;
          console.log(result);
          if (result.result == "Success") {
            this.topTabelData();
            this.$message({
              message: "回退成功",
              type: "success"
            });
          } else {
            this.$confirm(result.resultMsg, "提示", {
              confirmButtonText: "确定",
              type: "error",
              showCancelButton: false
            });
          }
        } catch (data) {
          debugger;
          this.$confirm(data.resultMsg, "提示", {
            confirmButtonText: "确定",
            type: "error",
            showCancelButton: false
          });
        }
        this.closeLoading();
      });
    },
    patientState(row, column, cellValue) {
      let stateArr = [
        "未提交申请(本地缓存)",
        "申请",
        "审批通过",
        "审批未通过",
        "撤销申请",
        "提交申请后作废",
        "未提交申请作废"
      ];
      debugger;
      if (cellValue || stateArr[cellValue]) {
        return stateArr[cellValue];
      }
    },
    paymentCategory(val, type) {
      let url = "extdic";
      let param = {
        scriptId: 2201,
        instituionId: JSON.stringify(this.iaaVal),
        IAX01A: 373
      };
      let orderApi = new AnswerSystem();
      orderApi.list(param, url).then(
        ({ data }) => {
          if (data.result === "Success") {
            this.paymentArr = data.list;
          }
        },
        error => {
          this.$notify.error(error.message);
        }
      );
    },
    seateFromIaa01Change(val) {
      this.paymentCategory(val, search);
    },
    insuranceInstitutions(val) {
      //读卡  医疗保险机构
      this.medicalCardArr = val;
    },
    currentUserChange() {
      //获取当前人职务
      if (this.parmsArrIn[2].value.indexOf("0") > 0) {
        this.audithidden = true;
      } else {
        let url = "SysSchedule/CurrentUser";
        debugger;
        commonAjaxRequest({ loginUserId: this.employeeId }, url).then(res => {
          console.log(res);
          if (res.result == "Success" && res.list[0] && res.list[0].aah01) {
            this.aah01 = res.list[0].aah01;
            if (this.parmsArrIn[2].value.indexOf(this.aah01) > 0) {
              this.audithidden = true;
            }
          }
        });
      }
    },
    approvalMark(row, column, cellValue) {
      return cellValue == "00" ? "不通过" : "通过";
    },
    payOff() {
      let url = "his/common/query/selectDataByScriptId";
      commonAjaxRequest({ ID: 1100013 }, url).then(res => {
        console.log(res);
        if (res.result == "Success") {
          this.payOffarr = res.list;
          this.abc01Val = res.list[0];
        }
      });
    }
  },
  mounted() {
    this.init();
    window.addEventListener("message", e => {
      var d = e.data;
      if (d.parentId == "ybiframe") {
        if (d.close && d.result == "success") {
          this.addMentor = false;
          this.topTabelData();
          this.$message({
            message: "保存成功",
            type: "success"
          });
        } else {
          this.addMentor = false;
        }
      }
    });
  },
  components: {
    "insurance-card-out": insuranceCardout
  }
};
</script>

<style  scoped>
.outcontain {
  padding: 10px;
  width: 100%;
  height: 100%;
  padding-bottom: 0px !important;
}

iframe {
  overflow: hidden;
  border: aliceblue;
}

.main-header {
  height: 40px;
}
.main-content {
  position: absolute;
  left: 0px;
  top: 45px;
  right: 0px;
  bottom: 0px;
}
.el-footer {
  padding: 0px !important;
  margin-top: 10px;
}
.main-bottom-header {
  position: absolute;
  left: 0px;
  top: 0px;
  right: 0px;
  bottom: 40px;
}
.main-bottom-footer {
  position: absolute;
  left: 0px;
  right: 0px;
  bottom: 0px;
  height: 40px;
  padding-top: 5px;
}
.edit {
  color: #409eff;
  margin-right: 3px;
}
.card-ruleForm {
  height: 150px;
  padding-top: 55px;
  padding-left: 35px;
}
</style>