<!--疑似感染-->
<template>
  <div class="contain-warning">
    <el-row>
      <el-col :span="6">
        <div class="search-time-bottom">
          <el-tabs v-model="activeName" @tab-click="tabsClick">
            <el-tab-pane label="未读" name="first">
              <div class="r-radio">
                <el-radio-group>
                  <el-radio label="1">在院</el-radio>
                  <el-radio label="2">出院</el-radio>
                </el-radio-group>
              </div>

              <div class="contain-table-waring">
                <el-tree :props="props" :load="loadNode" lazy accordion @node-click="treeCclick"></el-tree>
              </div>
            </el-tab-pane>
            <el-tab-pane label="待查" name="second">
              <el-table height="100%" style="width: 100%" index="1">
                <el-table-column label="科室"></el-table-column>
                <el-table-column label="事件数"></el-table-column>
                <el-table-column label="概要"></el-table-column>
              </el-table>
            </el-tab-pane>
            <el-tab-pane label="已确认院感" name="second">
              <el-table height="100%" style="width: 100%" index="1">
                <el-table-column label="科室"></el-table-column>
                <el-table-column label="事件数"></el-table-column>
                <el-table-column label="概要"></el-table-column>
              </el-table>
            </el-tab-pane>
          </el-tabs>
        </div>
      </el-col>
      <el-col :span="18">
        <el-container>
          <el-main>
            <patientinformation-index :rowData="rowData"></patientinformation-index>
          </el-main>
        </el-container>
      </el-col>
    </el-row>
  </div>
</template>

<script>
import patientinformationindex from "@/components/patientinformation/index"; // 患者信息
import { getlSelect, ajaxPost } from "@/service/api/commonAJax";
export default {
  name: "",
  data() {
    return {
      activeName: "first",
      dialogstitutions: false,
      value: true,
      type: [],
      exclude: false,
      rowData: [],
      props: {
        label: "name",
        children: "zones",
        isLeaf: "isleaf"
      }
    };
  },
  methods: {
    treeCclick(data, node, index) {
      debugger;
      //树点击事件
      this.rowData = data;
    },
    tabsClick(tab, event) {
      tab.index == "0" ? (this.exclude = false) : (this.exclude = true);
    },
    selectBCK1K() {
      //加载科室
      let url = "YGUtilRest/selectBCK1K";
      ajaxPost({}, url).then(data => {
        debugger;
        console.log(data);
        if (data.code == "200") {
          this.bck01Arr = data.list;
        }
      });
    },
    loadNode(node, resolve) {
      debugger;
      if (node.level === 0) {
        let url = "YGUtilRest/selectBCK1K";
        ajaxPost({}, url).then(data => {
          debugger;
          console.log(data);
          if (data.code == "200") {
            resolve(data.list);
          }
        });
      } else {
        let url = "YGUtilRest/selectVaa1ForBck1";
        ajaxPost(
          { page: 1, rows: 1000, selectValue: { bck01d: node.data.bck01 } },
          url
        ).then(data => {
          debugger;
          console.log(data);
          if (data.code == "200") {
            resolve(data.list.filter(arr => (arr.isleaf = true)));
          }
        });
      }
    }
  },
  components: {
    "patientinformation-index": patientinformationindex
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
  height: calc(100% - 30px);
  /* border: solid 1px #e4e4e4; */
  overflow: auto;
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
  height: 100%;
}
.el-container {
  height: 100%;
}
.r-radio {
  height: 30px;
  line-height: 30px;
  text-align: left;
}
</style>