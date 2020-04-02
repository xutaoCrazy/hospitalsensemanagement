<template>
  <div class="doctot-cation">
    <div class="doc-hearder">
      <el-form ref="form" label-width="80px">
        <el-col :span="4">
          <el-form-item label="选择月份">
            <el-date-picker type="date" placeholder="选择日期" style="width: 100%;"></el-date-picker>
          </el-form-item>
        </el-col>
        <el-col :span="2" style="margin-left:10px">
          <el-button type="primary" size="small">查询</el-button>
        </el-col>
        <div style="float:right">
          <el-button type="primary" size="small" @click="dialogVisible = true">新增评定</el-button>
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
    <el-dialog title="提示" :visible.sync="dialogVisible" width="60%">
      <div class="doc-hearder">
        <el-form ref="form" label-width="80px">
          <el-col :span="6">
            <el-form-item label="选择月份">
              <el-date-picker type="date" placeholder="选择日期" style="width: 100%;"></el-date-picker>
            </el-form-item>
          </el-col>
          <el-col :span="4" style="margin-left:10px">
            <el-button type="primary" size="small">查询</el-button>
            <span class="bqdjpd" @click="innerVisible = true">病情等级说明</span>
          </el-col>
        </el-form>
      </div>
      <div class="doc-cation" style="height:400px">
        <div class="contain-table-waring">
          <el-table height="100%" style="width: 100%" index="1">
            <el-table-column label="科室"></el-table-column>
            <el-table-column label="事件数"></el-table-column>
            <el-table-column label="概要"></el-table-column>
          </el-table>
        </div>
      </div>
      <span slot="footer" class="dialog-footer">
        <el-button type="primary" size="small" @click="dialogVisible = false">保存</el-button>
        <el-button type="primary" size="small" @click="dialogVisible = false">取消</el-button>
      </span>
      <el-dialog width="50%" title="病情等级说明" :visible.sync="innerVisible" append-to-body>
        <diseaseassessment-index></diseaseassessment-index>
        <span slot="footer" class="dialog-footer">
          <el-button type="primary" size="small" @click="innerVisible = false">取 消</el-button>
        </span>
      </el-dialog>
    </el-dialog>
  </div>
</template>

<script>
import diseaseassessmentindex from "@/components/diseaseassessment/index"; //
export default {
  name: "",
  data() {
    return {
      checkList: [],
      dialogVisible: false,
      innerVisible: false
    };
  },
  components: {
    "diseaseassessment-index": diseaseassessmentindex
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
.bqdjpd {
  margin-left: 20px;
  cursor: pointer;
}
</style>