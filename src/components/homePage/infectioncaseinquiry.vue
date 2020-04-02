<template>
  <div class="contain-warning">
    <el-row>
      <el-col :span="6" style="padding-right:5px">
        <div class="search-time">
          <el-form ref="form" label-width="80px">
            <el-form-item label="报告日期">
              <el-col :span="11">
                <el-date-picker type="date" placeholder="选择日期" style="width: 100%;"></el-date-picker>
              </el-col>
              <el-col class="line" :span="2">-</el-col>
              <el-col :span="11">
                <el-date-picker type="date" placeholder="选择日期" style="width: 100%;"></el-date-picker>
              </el-col>
            </el-form-item>
            <el-form-item label="检索">
              <el-col :span="11">
                <el-select placeholder="请选择科室"></el-select>
              </el-col>
              <el-col class="line" :span="2"></el-col>
              <el-col :span="11">
                <el-button type="primary" size="small">查询</el-button>
              </el-col>
            </el-form-item>
          </el-form>
        </div>
        <div class="search-time-bottom">
          <el-tabs v-model="activeName" @tab-click="tabsClick">
            <el-tab-pane label="院感" name="first">
              <div class="contain-table-waring">
                <el-table height="100%" style="width: 100%" index="1">
                  <el-table-column label="科室"></el-table-column>
                  <el-table-column label="事件数"></el-table-column>
                  <el-table-column label="概要"></el-table-column>
                </el-table>
              </div>
            </el-tab-pane>
            <el-tab-pane label="社感" name="second">
              <div class="contain-table-waring">
                <el-table height="100%" style="width: 100%" index="1">
                  <el-table-column label="科室"></el-table-column>
                  <el-table-column label="事件数"></el-table-column>
                  <el-table-column label="概要"></el-table-column>
                </el-table>
              </div>
            </el-tab-pane>
          </el-tabs>
        </div>
      </el-col>
      <el-col :span="18" style="padding-left:5px">
        <el-container>
          <el-header>
            <p class="p-hearder">
              <el-button type="primary" size="small">查看病历</el-button>
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
  </div>
</template>

<script>
import reportcardindex from "@/components/reportcard/index"; // 报告卡
export default {
  name: "",
  data() {
    return {
      activeName: "first",
      dialogstitutions: false,
      value: true,
      type: [],
      exclude: false
    };
  },
  methods: {
    tabsClick(tab, event) {
      tab.index == "0" ? (this.exclude = false) : (this.exclude = true);
    }
  },
  components: {
    "reportcard-index": reportcardindex
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
</style>