<template>
  <div class="doctot-cation">
    {{rowData}}
    <div class="doc-hearder">
      <el-form ref="form" label-width="80px">
        <el-col :span="4">
          <el-form-item class="el-width">
            <el-checkbox-group v-model="checkList">
              <el-checkbox label="长嘱"></el-checkbox>
              <el-checkbox label="临嘱"></el-checkbox>
            </el-checkbox-group>
          </el-form-item>
        </el-col>
        <el-col :span="10">
          <el-form-item label="上报日期">
            <el-col :span="11">
              <el-date-picker type="date" placeholder="选择日期" style="width: 100%;"></el-date-picker>
            </el-col>
            <el-col class="line" :span="2" style="text-align:center">-</el-col>
            <el-col :span="11">
              <el-date-picker type="date" placeholder="选择日期" style="width: 100%;"></el-date-picker>
            </el-col>
          </el-form-item>
        </el-col>
        <el-col :span="6">
          <el-form-item label="上报科室">
            <el-select placeholder="请选择科室"></el-select>
          </el-form-item>
        </el-col>
        <el-col :span="2">
          <!-- <el-form-item> -->
          <el-button type="primary" size="small">查询</el-button>
          <!-- </el-form-item> -->
        </el-col>
      </el-form>
    </div>
    <div class="doc-cation">
      <div class="contain-table-waring">
        <tabletemplate-index
          ref="tableclick"
          :tableClumn="tableClumn"
          :url="tableparameters.url"
          :parms="tableparameters.parms"
        ></tabletemplate-index>
      </div>
    </div>
  </div>
</template>

<script>
import tabletemplateindex from "@/components/tabletemplate/index"; // 表格公共组件

export default {
  name: "",
  props: {
    rowData: Object
  },
  data() {
    return {
      checkList: [],
      tableparameters: {
        url: "CaseMonitorRest/selectVAA1",
        parms: {
          bljc: "1",
          selectValue: {
            vaa01: "",
            vaa07: "",
            vaf11: "",
            startVaf22: "",
            endVaf22: ""
          }
        }
      },
      tableClumn: [
        {
          id: "vaa04",
          label: "抗菌药物"
        },
        {
          id: "vaa05",
          label: "侵袭操作"
        },
        {
          id: "abw01",
          label: "长/临嘱"
        },

        {
          id: "vaa10",
          label: "开嘱时间"
        },
        {
          id: "vaa12",
          label: "停嘱时间",
          width: 200
        },
        {
          id: "vaa73",
          label: "医嘱内容",
          width: 120
        },
        {
          id: "vaa74",
          label: "用量",
          width: 120
        },
        {
          id: "vaa74",
          label: "医嘱备注",
          width: 120
        },
        {
          id: "vaa74",
          label: "开嘱医生",
          width: 120
        },
        {
          id: "vaa74",
          label: "停嘱医生",
          width: 120
        }
      ]
    };
  },
  components: {
    "tabletemplate-index": tabletemplateindex
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
  /* border: solid 1px #d8d8d8; */
}
</style>