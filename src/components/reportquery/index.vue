<template>
  <div class="doctot-cation">
    <div class="doc-hearder">
      <el-form ref="form" label-width="80px">
        <el-col :span="8">
          <el-form-item label="在院时间">
            <el-col :span="11">
              <el-date-picker type="date" placeholder="选择日期" style="width: 100%;"></el-date-picker>
            </el-col>
            <el-col class="line" :span="2" style="text-align:center">-</el-col>
            <el-col :span="11">
              <el-date-picker type="date" placeholder="选择日期" style="width: 100%;"></el-date-picker>
            </el-col>
          </el-form-item>
        </el-col>
        <el-col :span="4">
          <el-form-item label="感染类型">
            <el-select></el-select>
          </el-form-item>
        </el-col>
        <el-col :span="2" style="margin-left:10px">
          <el-button type="primary" size="small">查询</el-button>
        </el-col>
        <div style="float:right">
          <el-button type="primary" size="small">打印</el-button>
          <el-button type="primary" size="small">导出EXCEL</el-button>
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
  </div>
</template>

<script>
export default {
  name: "",
  data() {
    return {
      checkList: []
    };
  }
};
</script>

<style scoped>
.doctot-cation {
  height: 100%;
}
.doc-hearder {
  height: 40px;
  text-align: left;
}
.doc-cation {
  height: calc(100% - 40px);
}
.contain-table-waring {
  width: 100%;
  height: 100%;
  border: solid 1px #d8d8d8;
}
</style>