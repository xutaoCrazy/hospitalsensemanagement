<template>
  <div class="doctot-cation">
    <div class="doc-hearder">
      <el-form ref="form" label-width="80px">
        <el-col :span="7">
          <el-form-item label="报告单号">
            <el-select placeholder="请选择科室"></el-select>
          </el-form-item>
        </el-col>
        <el-col :span="7">
          <el-form-item label="科室">
            <el-select placeholder="请选择科室"></el-select>
          </el-form-item>
        </el-col>
        <el-col :span="7">
          <el-form-item label="填报人">
            <el-select placeholder="请选择科室"></el-select>
          </el-form-item>
        </el-col>
        <el-col :span="7">
          <el-form-item label="填报时间">
            <el-select placeholder="请选择科室"></el-select>
          </el-form-item>
        </el-col>
        <el-col :span="7">
          <el-form-item label="负责人">
            <el-select placeholder="请选择科室"></el-select>
          </el-form-item>
        </el-col>
      </el-form>
    </div>
    <div class="doc-cation">
      <div class="contain-table-waring">
        <el-col
          :span="12"
          class="el-width"
          style="padding-right:5px;border-right:solid 1px #d8d8d8"
        >
          <p class="el-p">
            <span>监测项目列表</span>
            <el-button type="primary" size="small" style="float:right">新增</el-button>
          </p>
          <div class="el-top-bottom">
            <el-table height="100%" style="width: 100%" index="1">
              <el-table-column label="科室"></el-table-column>
              <el-table-column label="事件数"></el-table-column>
              <el-table-column label="概要"></el-table-column>
            </el-table>
          </div>
        </el-col>
        <el-col :span="12" style="padding-left:5px">
          <p class="el-p">
            <span>监测项目明细</span>
          </p>
          <el-form ref="form" label-width="80px">
            <el-row>
              <el-col :span="24">
                <el-col :span="12">
                  <el-form-item label="检测项目">
                    <el-select placeholder></el-select>
                  </el-form-item>
                </el-col>
              </el-col>
              <el-col :span="24">
                <el-col :span="12">
                  <el-form-item label="采样场所">
                    <el-select placeholder></el-select>
                  </el-form-item>
                </el-col>
                <el-col :span="12">
                  <el-form-item label="采样标本">
                    <el-select placeholder></el-select>
                  </el-form-item>
                </el-col>
              </el-col>
              <el-col :span="24">
                <el-col :span="12">
                  <el-form-item label="采样方法">
                    <el-select placeholder></el-select>
                  </el-form-item>
                </el-col>
                <el-col :span="12">
                  <el-form-item label="采样点数">
                    <el-select placeholder></el-select>
                  </el-form-item>
                </el-col>
              </el-col>
              <el-col :span="24">
                <el-col :span="12">
                  <el-form-item label="采样人员">
                    <el-select placeholder></el-select>
                  </el-form-item>
                </el-col>
                <el-col :span="12">
                  <el-form-item label="采样日期">
                    <el-select placeholder></el-select>
                  </el-form-item>
                </el-col>
              </el-col>
              <el-col :span="24">
                <el-col :span="24">
                  <el-form-item label="采样备注">
                    <el-input></el-input>
                  </el-form-item>
                </el-col>
              </el-col>
              <el-col :span="24">
                <el-col :span="12">
                  <el-form-item label="监测类型">
                    <el-input></el-input>
                  </el-form-item>
                </el-col>
                <el-col :span="12">
                  <el-form-item label="是否复查">
                    <el-radio-group v-model="radio" style="margin-top:10px">
                      <el-radio :label="3">是</el-radio>
                      <el-radio :label="6">否</el-radio>
                    </el-radio-group>
                  </el-form-item>
                </el-col>
              </el-col>
              <el-col :span="24">
                <el-col :span="12">
                  <el-form-item label="检验人员">
                    <el-input></el-input>
                  </el-form-item>
                </el-col>
                <el-col :span="12">
                  <el-form-item label="报告日期">
                    <el-input placeholder></el-input>
                  </el-form-item>
                </el-col>
              </el-col>
              <el-col :span="24">
                <div style="height:155px;border:solid 1px #d8d8d8;margin-bottom:10px">
                  <el-table height="100%" style="width: 100%" index="1">
                    <el-table-column label="科室"></el-table-column>
                    <el-table-column label="事件数"></el-table-column>
                    <el-table-column label="概要"></el-table-column>
                  </el-table>
                </div>
              </el-col>
              <el-col :span="24">
                <el-col :span="12">
                  <el-form-item label="检出菌">
                    <el-input></el-input>
                  </el-form-item>
                </el-col>
                <el-col :span="12">
                  <el-form-item label="菌落数">
                    <el-input placeholder></el-input>
                  </el-form-item>
                </el-col>
              </el-col>

              <el-col :span="24">
                <el-form-item label="结果备注">
                  <el-input></el-input>
                </el-form-item>
              </el-col>
            </el-row>
          </el-form>
        </el-col>
      </div>
    </div>
  </div>
</template>

<script>
import monitoringreportindex from "@/components/monitoringreport/index"; //
export default {
  name: "",
  data() {
    return {
      checkList: [],
      innerVisible: false,
      radio: ""
    };
  },
  components: {
    "monitoringreport-index": monitoringreportindex
  }
};
</script>

<style scoped>
.doctot-cation {
  height: 600px;
  padding: 5px 10px;
}
.doc-hearder {
  height: 75px;
  text-align: left;
  border-bottom: solid 1px #d8d8d8;
}
.doc-cation {
  height: calc(100% - 75px);
  padding-top: 10px;
}
.contain-table-waring {
  width: 100%;
  height: 100%;
}
.el-width {
  height: 100%;
}
.el-p {
  text-align: left;
  height: 30px;
}
.el-top-bottom {
  height: calc(100% - 40px);
  border: solid 1px #d8d8d8;
}
</style>