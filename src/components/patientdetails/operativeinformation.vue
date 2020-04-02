<template>
  <div class="doctot-cation">
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
  height: 100%;
}
.contain-table-waring {
  width: 100%;
  height: 100%;
  border: solid 1px #d8d8d8;
}
</style>