<template>
  <div class="doctot-cation">
    <div class="doc-hearder">
      <el-form ref="form" label-width="80px">
        <el-col :span="4">
          <el-form-item label="调查日期">
            <el-date-picker type="date" placeholder="选择日期" style="width: 100%;"></el-date-picker>
          </el-form-item>
        </el-col>
        <el-col :span="4">
          <el-form-item label="上报科室">
            <el-select placeholder="请选择科室" style="width:100%"></el-select>
          </el-form-item>
        </el-col>
        <el-form-item label="登记状态" style="width: 263px;float: left;">
          <el-checkbox-group v-model="checkList">
            <el-checkbox label="未登记"></el-checkbox>
            <el-checkbox label="已登记"></el-checkbox>
          </el-checkbox-group>
        </el-form-item>
        <el-col :span="4">
          <el-input placeholder="请输入病案号/住院号/姓名检索" suffix-icon="el-icon-search"></el-input>
        </el-col>
        <el-col :span="2" style="padding-left:10px">
          <el-button type="primary" size="small">查询</el-button>
        </el-col>
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
  padding-top: 5px;
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