<template>
  <div class="doctot-cation">
    <el-col :span="24" class="el-col-height">
      <div class="doc-hearder">
        <el-form ref="form" label-width="80px">
          <el-col :span="10">
            <el-form-item label="病历日期">
              <el-col :span="11">
                <el-date-picker type="date" placeholder="选择日期" style="width: 100%;"></el-date-picker>
              </el-col>
              <el-col class="line" :span="2" style="text-align:center">-</el-col>
              <el-col :span="11">
                <el-date-picker type="date" placeholder="选择日期" style="width: 100%;"></el-date-picker>
              </el-col>
            </el-form-item>
          </el-col>
          <el-col :span="2" style="padding-left:10px">
            <el-button type="primary" size="small">查询</el-button>
          </el-col>
        </el-form>
      </div>
      <div class="doc-cation">
        <div class="contain-table-waring"></div>
      </div>
    </el-col>
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
.el-col-height {
  height: 100%;
}
</style>