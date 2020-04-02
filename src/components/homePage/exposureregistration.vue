<template>
  <div class="doctot-cation">
    <div class="doc-hearder" style="padding-bottom:10px">
      <el-form ref="form" label-width="50px">
        <el-col :span="8">
          <el-form-item label="日期">
            <el-col :span="11">
              <el-date-picker type="date" placeholder="开始日期" style="width: 100%;"></el-date-picker>
            </el-col>
            <el-col class="line" :span="2" style="text-align:center">-</el-col>
            <el-col :span="11">
              <el-date-picker type="date" placeholder="结束日期" style="width: 100%;"></el-date-picker>
            </el-col>
          </el-form-item>
        </el-col>
        <el-col :span="2" style="margin-left:10px">
          <el-button type="primary" size="small">查询</el-button>
        </el-col>
        <div style="float:right">
          <el-button type="primary" size="small" @click="innerVisible = true">登记</el-button>
        </div>
      </el-form>
    </div>
    <div class="doc-cation">
      <div class="contain-table-waring">
        <el-table height="100%" style="width: 100%" index="1">
          <el-table-column label="科室"></el-table-column>
          <el-table-column label="事件数"></el-table-column>
          <el-table-column label="概要"></el-table-column>
        </el-table>
      </div>
    </div>
    <div class="doc-cation-bottom">
      <p>近七天需要复查人员</p>
      <div class="contain-table-waring">
        <el-table height="100%" style="width: 100%" index="1">
          <el-table-column label="科室"></el-table-column>
          <el-table-column label="事件数"></el-table-column>
          <el-table-column label="概要"></el-table-column>
        </el-table>
      </div>
    </div>
    <el-dialog width="60%" title="新增监测报告单" :visible.sync="innerVisible" top="5vh">
      <div class="dialog">
        <exposureeport-index></exposureeport-index>
      </div>
      <span slot="footer" class="dialog-footer">
        <el-button type="primary" size="small">保 存</el-button>
        <el-button type="primary" size="small" @click="innerVisible = false">取 消</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import exposureeportindex from "@/components/exposureeport/index"; //医务人员职务暴露登记卡
export default {
  name: "",
  data() {
    return {
      checkList: [],
      innerVisible: false
    };
  },
  components: {
    "exposureeport-index": exposureeportindex
  }
};
</script>

<style scoped>
.doctot-cation {
  height: 100%;
  padding: 5px 10px;
}
.doc-hearder {
  height: 40px;
  text-align: left;
}
.doc-cation {
  height: calc(100% - 240px);
}
.contain-table-waring {
  width: 100%;
  height: 100%;
  border: solid 1px #d8d8d8;
}
.doc-cation-bottom {
  height: 200px;
}
.doc-cation-bottom p {
  text-align: left;
  /* line-height: 36px; */
  margin: 0px;
  height: 40px;
  line-height: 40px;
}
.doc-cation-bottom .contain-table-waring {
  height: calc(100% - 40px);
}
</style>