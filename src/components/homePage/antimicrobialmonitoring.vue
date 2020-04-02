<template>
  <div class="contain-warning">
    <el-row>
      <el-col :span="24" style="padding-right:5px">
        <div class="search-time-bottom">
          <el-tabs v-model="activeName" @tab-click="tabsClick">
            <el-tab-pane label="住院患者抗菌药物使用率" name="first">
              <reportquery-index></reportquery-index>
            </el-tab-pane>
            <el-tab-pane label="抗菌药物治疗前病原学送检率" name="second">
              <div class="contain-table-waring">
                <reportquery-index></reportquery-index>
              </div>
            </el-tab-pane>
          </el-tabs>
        </div>
      </el-col>
    </el-row>
  </div>
</template>

<script>
import reportqueryindex from "@/components/reportquery/index"; // 报告卡
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
    "reportquery-index": reportqueryindex
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
  height: 100%;
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