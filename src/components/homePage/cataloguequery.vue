<template>
  <div class="catalcontain">
    <el-tabs v-model="activeName">
      <el-tab-pane label="药品目录" name="first">
        <pharmaceutical-catalogue cataShow="1"></pharmaceutical-catalogue>
      </el-tab-pane>
      <el-tab-pane label="诊疗项目" name="second">
        <pharmaceutical-catalogue cataShow="2"></pharmaceutical-catalogue>
      </el-tab-pane>
      <el-tab-pane label="服务设施" name="third">
        <pharmaceutical-catalogue cataShow="2"></pharmaceutical-catalogue>
      </el-tab-pane>
      <el-tab-pane label="ICD目录" name="fourth">
        <pharmaceutical-catalogue cataShow="3"></pharmaceutical-catalogue>
      </el-tab-pane>
    </el-tabs>
  </div>
</template>

<script>
import pharmaceuticalcatalogue from "@/components/catalogTpl/pharmaceuticalcatalogue"; //药品目录
export default {
  name: "",
  data() {
    return {
      activeName: "first"
    };
  },
  components: {
    "pharmaceutical-catalogue": pharmaceuticalcatalogue
  }
};
</script>

<style scoped>
.catalcontain {
  padding: 10px;
  width: 100%;
  height: 100%;
}
</style>