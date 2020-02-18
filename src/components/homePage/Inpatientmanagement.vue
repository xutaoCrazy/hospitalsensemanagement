<template>
  <div class="inpatcontain">
    <el-row style="height:100%">
      <el-col :span="4" style="height:100%;border-right:solid 1px #e4e4e4">
        <div class="inpatientLeft inpatienHeight">
          <div class="inpatientTop">
            <el-col :span="12">
              <div class="patientleft">患者信息</div>
            </el-col>
            <el-col :span="12">
              <div class="patientRight">
                <i class="el-icon-d-arrow-right"></i>
              </div>
            </el-col>
          </div>
          <div class="inpatientcenter">
            <el-input
              placeholder="请输入住院号、患者姓名"
              suffix-icon="el-icon-search"
              style="width:calc(100% - 25px)"
            ></el-input>
            <el-popover placement="bottom-end" width="330" trigger="click" :visible-arrow="false">
              <el-form label-width="100px" style="margin-bottom:5px!important">
                <el-form-item label="入院开始时间">
                  <el-date-picker type="date" placeholder="选择日期" style="width: 100%;"></el-date-picker>
                </el-form-item>
                <el-form-item label="入院结束时间">
                  <el-date-picker type="date" placeholder="选择日期" v style="width: 100%;"></el-date-picker>
                </el-form-item>
                <el-form-item label="住院科室">
                  <el-select></el-select>
                </el-form-item>
                <el-form-item label="医保类型">
                  <el-select></el-select>
                </el-form-item>
                <div class="serchbuttom">
                  <el-button type="primary" size="small">查询</el-button>
                </div>
              </el-form>
              <i
                class="el-icon-d-arrow-right el-icon-patient-bottom el-icon-patient"
                slot="reference"
              ></i>
            </el-popover>
          </div>
          <div class="inpatientbuttom"></div>
        </div>
      </el-col>

      <el-col :span="20" style="height:100%">
        <div class="inpatientRight inpatienHeight">
          <div class="main-header">
            <el-form label-width="80px">
              <el-row style="height:100%">
                <el-col :span="24">
                  <el-col :span="4">
                    <el-form-item label="医保类型">
                      <el-select placeholder="请选择" size="small"></el-select>
                    </el-form-item>
                  </el-col>
                  <el-col :span="4">
                    <el-form-item label="医保状态">
                      <el-select placeholder="请选择" size="small"></el-select>
                    </el-form-item>
                  </el-col>
                  <el-col :span="16" style="    text-align: left;padding-left: 10px;">
                    <el-button type="primary" size="small">读医保卡</el-button>
                    <el-dropdown>
                      <el-button type="primary" size="small">
                        入院
                        <i class="el-icon-arrow-down el-icon--right"></i>
                      </el-button>
                      <el-dropdown-menu slot="dropdown">
                        <el-dropdown-item>入院办理</el-dropdown-item>
                        <el-dropdown-item>入院撤销</el-dropdown-item>
                        <el-dropdown-item>入院修改</el-dropdown-item>
                      </el-dropdown-menu>
                    </el-dropdown>
                    <el-dropdown>
                      <el-button type="primary" size="small">
                        费用类别转换
                        <i class="el-icon-arrow-down el-icon--right"></i>
                      </el-button>
                      <el-dropdown-menu slot="dropdown">
                        <el-dropdown-item>异常转自费</el-dropdown-item>
                        <el-dropdown-item>设置手工报销</el-dropdown-item>
                      </el-dropdown-menu>
                    </el-dropdown>
                    <el-dropdown>
                      <el-button type="primary" size="small">
                        结算
                        <i class="el-icon-arrow-down el-icon--right"></i>
                      </el-button>
                      <el-dropdown-menu slot="dropdown">
                        <el-dropdown-item>预结算</el-dropdown-item>
                        <el-dropdown-item>结算</el-dropdown-item>
                        <el-dropdown-item>结算撤销</el-dropdown-item>
                      </el-dropdown-menu>
                    </el-dropdown>
                    <el-dropdown>
                      <el-button type="primary" size="small">
                        出院
                        <i class="el-icon-arrow-down el-icon--right"></i>
                      </el-button>
                      <el-dropdown-menu slot="dropdown">
                        <el-dropdown-item>出院办理</el-dropdown-item>
                        <el-dropdown-item>出院撤销</el-dropdown-item>
                        <el-dropdown-item></el-dropdown-item>
                      </el-dropdown-menu>
                    </el-dropdown>
                    <el-button type="primary" size="small">结算单打印</el-button>
                  </el-col>
                </el-col>
              </el-row>
            </el-form>
          </div>
          <div class="main-bottom-header">
            <el-tabs v-model="activeName">
              <el-tab-pane label="患者信息" name="first" style="height:100%">
                <patient-managment></patient-managment>
              </el-tab-pane>
              <el-tab-pane label="费用明细" name="second" style="height:100%">
                <detail-sexpenses></detail-sexpenses>
              </el-tab-pane>
              <el-tab-pane label="诊断手术" name="third" style="height:100%">
                <diagnostic-operation></diagnostic-operation>
              </el-tab-pane>
              <el-tab-pane label="医嘱信息" name="fourth" style="height:100%">
                <doctor-information></doctor-information>
              </el-tab-pane>
              <el-tab-pane label="院前检查" name="five" style="height:100%">
                <hospital-examination></hospital-examination>
              </el-tab-pane>
              <el-tab-pane label="费用上传日志" name="six" style="height:100%">
                <upload-log></upload-log>
              </el-tab-pane>
            </el-tabs>
          </div>
        </div>
      </el-col>
    </el-row>
  </div>
</template>

<script>
import patientmanagment from "@/components/Inpatientmanagement/patient_managment"; //患者管理
import detailsexpenses from "@/components/Inpatientmanagement/detailsexpenses"; //费用明细
import diagnosticoperation from "@/components/Inpatientmanagement/diagnosticoperation"; //诊断手术
import doctorinformation from "@/components/Inpatientmanagement/doctorinformation"; //医嘱信息
import hospitalexamination from "@/components/Inpatientmanagement/hospitalexamination"; //院前检查
import uploadlog from "@/components/Inpatientmanagement/uploadlog"; //院前检查

export default {
  name: "",
  data() {
    return {
      activeName: "first"
    };
  },
  components: {
    "patient-managment": patientmanagment,
    "detail-sexpenses": detailsexpenses,
    "diagnostic-operation": diagnosticoperation,
    "doctor-information": doctorinformation,
    "hospital-examination": hospitalexamination,
    "upload-log": uploadlog
  }
};
</script>

<style scoped>
.inpatcontain {
  padding: 10px;
  width: 100%;
  height: 100%;
  background: #f9f9f9;
}
.inpatienHeight {
  height: 100%;
}
.inpatientTop {
  height: 30px;
  border: solid 1px #e4e4e4;
  line-height: 30px;
  margin-bottom: 5px;
}
.inpatientcenter {
  height: 30px;
  text-align: left;
}
.patientleft {
  text-align: left;
}
.patientRight {
  text-align: right;
  font-size: 18px;
}
.el-icon-patient-bottom {
  font-size: 18px;
  transform: rotate(90deg);
  cursor: pointer;
}
.el-icon-patient {
  float: right;
  margin-top: 8px;
  margin-right: 3px;
}
.inpatientbuttom {
  height: calc(100% - 70px);
  border: solid 1px #e4e4e4;
  margin-top: 5px;
  margin-right: 5px;
}
.el-popover {
  background: #f9f9f9;
}
.serchbuttom {
  text-align: right;
}
.main-header {
  height: 40px;
}
.main-bottom-header {
  height: calc(100% - 40px);
  padding-left: 13px;
}
</style>