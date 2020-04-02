<!--上报卡管理-->
<template>
  <div class="contain-warning">
    <el-row>
      <el-col :span="6" style="padding-right:5px">
        <div class="search-time">
          <el-form ref="form" label-width="80px">
            <el-form-item label="上报日期">
              <el-col :span="11">
                <el-date-picker type="date" placeholder="选择日期" style="width: 100%;"></el-date-picker>
              </el-col>
              <el-col class="line" :span="2">-</el-col>
              <el-col :span="11">
                <el-date-picker type="date" placeholder="选择日期" style="width: 100%;"></el-date-picker>
              </el-col>
            </el-form-item>
            <el-form-item label="上报科室">
              <el-col :span="11">
                <el-select placeholder="请选择科室"></el-select>
              </el-col>
              <el-col class="line" :span="2"></el-col>
              <el-col :span="11">
                <el-button type="primary" size="small">查询</el-button>
                <el-button type="primary" size="small" @click="innerVisible = true">新增</el-button>
              </el-col>
            </el-form-item>
          </el-form>
        </div>
        <div class="search-time-bottom">
          <el-tabs v-model="activeName" @tab-click="tabsClick">
            <el-tab-pane label="未确认" name="first" lazy>
              <tabletemplate-index :tableClumn="tableClumn" :url="ajaxUrl"></tabletemplate-index>
            </el-tab-pane>
            <el-tab-pane label="已确认" name="second" lazy>
              <tabletemplate-index :tableClumn="tableClumn"></tabletemplate-index>
            </el-tab-pane>
            <el-tab-pane label="退卡" name="third" lazy>
              <tabletemplate-index :tableClumn="tableClumn"></tabletemplate-index>
            </el-tab-pane>
          </el-tabs>
        </div>
      </el-col>
      <el-col :span="18" style="padding-left:5px">
        <el-container>
          <el-header>
            <p class="p-hearder">
              <el-button type="primary" size="small">查看病历</el-button>
              <el-button type="primary" size="small">确认感染</el-button>
              <el-button type="primary" size="small">退卡</el-button>
            </p>
          </el-header>
          <el-main>
            <div class="contain-table-waring">
              <reportcard-index></reportcard-index>
            </div>
          </el-main>
        </el-container>
      </el-col>
    </el-row>
    <el-dialog
      width="40%"
      title="感染病例上报"
      :visible.sync="innerVisible"
      top="5vh"
      :close-on-click-modal="false"
      @opened="opendialog"
    >
      <div class="dialog">
        <infectioncases-index ref="getData" :innerVisible="innerVisible"></infectioncases-index>
      </div>
      <span slot="footer" class="dialog-footer">
        <el-button type="primary" size="small" @click="save">保 存</el-button>
        <el-button type="primary" size="small" @click="innerVisible = false">取 消</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import reportcardindex from "@/components/reportcard/index"; // 报告卡
import tabletemplateindex from "@/components/tabletemplate/index"; // 表格公共组件
import infectioncasesindex from "@/components/infectioncases/index";
import { getlistdata, ajaxPost } from "@/service/api/commonAJax";

export default {
  name: "",
  data() {
    return {
      activeName: "first",
      dialogstitutions: false,
      value: true,
      type: [],
      exclude: false,
      ajaxUrl: "",
      innerVisible: false,
      tableClumn: [
        { id: "vaa04", label: "住院号" },
        { id: "vaa05", label: "患者姓名" },
        { id: "vaa06", label: "性别" },
        { id: "vaa07", label: "年龄" },
        { id: "vaa08", label: "科室" },
        { id: "vaa09", label: "感染类型" },
        { id: "vaa10", label: "感染部位" },
        { id: "vaa11", label: "上报人" },
        { id: "vaa12", label: "上报时间" }
      ]
    };
  },
  methods: {
    tabsClick(tab, event) {
      tab.index == "0" ? (this.exclude = false) : (this.exclude = true);
    },
    init() {
      getlistdata().then(function(data) {
        console.log(1);
      });
    },
    save() {
      //保存
      let parms = this.$refs.getData.parmsJson;
      parms.biy01 = parms.biy01.join(",");
      parms.bis01 = parms.bis01.join(",");
      parms.rcd02 = parms.rcd02.join(",");
      ajaxPost(
        { selectValue: parms },
        "/CaseMonitorRest/addCaseMonitorVUE"
      ).then(data => {});
      console.log();
    }
  },
  mounted() {
    this.init();
  },
  components: {
    "reportcard-index": reportcardindex,
    "tabletemplate-index": tabletemplateindex,
    "infectioncases-index": infectioncasesindex
  }
};
</script>

<style scoped>
.contain-warning {
  width: 100%;
  height: 100%;
  padding: 5px 10px;
}
.el-row {
  height: 100%;
}
.el-col {
  height: 100%;
}
.search-time {
  height: 85px;
}
.search-time-bottom {
  height: calc(100% - 85px);
  position: relative;
}
.el-tabs {
  height: 100%;
}
.contain-table-waring {
  width: 100%;
  height: 100%;
  border: solid 1px #e4e4e4;
}
.table-contain-main {
  height: calc(100% - 40px) !important;
}
.el-col-8 {
  padding-right: 10px;
  border-right: solid 1px #e4e4e4;
}
.el-col-16 {
  padding-left: 10px;
}
.threshold {
  position: absolute;
  top: 15px;
  right: 0px;
  cursor: pointer;
}
.threshold-conatin {
}
.i-width {
  width: 60px;
}
.p-width {
  text-align: left;
  padding-left: 15px;
  margin-bottom: 5px;
}
.el-header {
  height: 40px !important;
}
.el-main {
  height: calc(100% - 40px) !important;
}
.is-vertical {
  height: 100% !important;
}
.p-hearder {
  text-align: left;
  border-bottom: solid 1px #e4e4e4;
  height: 33px;
  line-height: 33px;
  text-align: right;
}
.p-checkbox {
  margin-left: 10px;
}
.p-checkbox {
  display: block;
  float: left;
}
.el-checkbox {
  margin-right: 20px !important;
}
.main-bottom-footer {
  position: absolute;
  left: 0px;
  right: 0px;
  bottom: 0px;
  height: 40px;
  padding-top: 5px;
}
</style>