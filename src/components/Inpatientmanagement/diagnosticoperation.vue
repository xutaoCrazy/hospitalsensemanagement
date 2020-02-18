<template>
  <div class="detailsexpenses-content">
    <div class="main-header">
      <el-form label-width="80px">
        <el-row style="height:100%">
          <el-col :span="24" class="diagheader">
            <el-button type="primary" size="small">手术上传</el-button>
            <el-button type="primary" size="small">刷新</el-button>
          </el-col>
        </el-row>
      </el-form>
    </div>
    <div class="main-bottom-header"></div>
  </div>
</template>

<script>
export default {
  name: "",
  data() {
    return {};
  }
};
</script>

<style  scoped>
.main-header {
  height: 40px;
}
.el-icon-patient-bottom {
  font-size: 18px;
  transform: rotate(90deg);
  cursor: pointer;
  margin-right: 10px;
  float: left;
  margin-top: 8px;
}
.serchbuttom {
  text-align: right;
}
.main-bottom-header {
  height: calc(100% - 40px);
}
.detailsexpenses-content {
  width: 100%;
  height: 100%;
}
.diagheader {
  text-align: right;
}
</style>