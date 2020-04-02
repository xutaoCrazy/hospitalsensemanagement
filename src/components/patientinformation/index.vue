<template>
  <div class="patient-contain">
    <div class="p-header">
      <span class="v-name">董文杰</span>
      <span class="v-margin">
        <b>住院号:</b>
        <span>123455</span>
      </span>
      <span class="v-tow">女</span>
      <span class="v-margin">
        <b>入院日期:</b>
        <span>2020-02-03 10:30:30</span>
      </span>
      <span class="v-margin">
        <b>床号:</b>
        <span>12</span>
      </span>

      <span class="v-margin">
        <b>主管医生:</b>
        <span>徐涛</span>
      </span>
      <span class="v-tow">在院</span>
      <span class="v-margin">
        <b>当前科室:</b>
        <span>泌尿外科</span>
      </span>
    </div>
    <div class="p-contain">
      <el-tabs v-model="activeName">
        <el-tab-pane label="医嘱信息" name="first">
          <doctororderinformation-index :rowData="rowData"></doctororderinformation-index>
        </el-tab-pane>
        <el-tab-pane label="手术信息" name="second">
          <operativeinformation-index></operativeinformation-index>
        </el-tab-pane>
        <el-tab-pane label="检验信息" name="third">
          <inspectioninformation-index></inspectioninformation-index>
        </el-tab-pane>
        <el-tab-pane label="病程分析" name="fourth">
          <courseanalysis-index></courseanalysis-index>
        </el-tab-pane>
        <el-tab-pane label="护理记录" name="five">
          <nursingrecords-index></nursingrecords-index>
        </el-tab-pane>
        <el-tab-pane label="体温信息" name="six">
          <temperatureinformation-index></temperatureinformation-index>
        </el-tab-pane>
      </el-tabs>
    </div>
  </div>
</template>
<script>
import doctororderinformationindex from "@/components/patientdetails/doctororderinformation"; //医嘱信息
import operativeinformationindex from "@/components/patientdetails/operativeinformation"; //手术信息
import inspectioninformationindex from "@/components/patientdetails/inspectioninformation"; //检验信息
import courseanalysisindex from "@/components/patientdetails/courseanalysis"; //病程分析
import nursingrecordsindex from "@/components/patientdetails/nursingrecords"; //护理记录
import temperatureinformationindex from "@/components/patientdetails/temperatureinformation"; //体温信息
export default {
  name: "",
  props: { rowData: Object },
  data() {
    return {
      activeName: "first"
    };
  },
  components: {
    "doctororderinformation-index": doctororderinformationindex,
    "operativeinformation-index": operativeinformationindex,
    "inspectioninformation-index": inspectioninformationindex,
    "courseanalysis-index": courseanalysisindex,
    "nursingrecords-index": nursingrecordsindex,
    "temperatureinformation-index": temperatureinformationindex
  }
};
</script>

<style scoped>
.patient-contain {
  height: 100%;
  padding-left: 10px;
}
.p-header {
  height: 40px;
  text-align: left;
  line-height: 40px;
  background: #dbe3f9;
  opacity: 0.5;
  color: #959db3;
}
.p-contain {
  height: calc(100% - 40px);
  overflow: hidden;
}
.el-tabs--top {
  height: 100%;
}
b {
  font-weight: 400;
}
.v-name {
  width: 60px;
  display: inline-block;
}
.v-margin {
  margin-right: 10px;
}
.v-tow {
  display: inline-block;
  width: 40px;
  text-align: center;
}
</style>