<template>
  <div class="drop_content">
    <el-container>
      <el-header>
        <el-row style="height:100%">
          <el-col :span="24" style="height:100%;position:relative;">
            <el-col :span="24">
              <el-col :span="24">
                <el-input placeholder autofocus v-model="iText"></el-input>
              </el-col>
            </el-col>
          </el-col>
        </el-row>
      </el-header>
      <el-main>
        <el-table
          height="100%"
          index="1"
          border
          stripe
          ref="tabel"
          :data="dropData"
          @row-click="onSelecRightRow"
        >
          <el-table-column
            v-for="col in columns"
            :prop="col.id"
            :key="col.id"
            :label="col.label"
            align="left"
            header-align="center"
            show-overflow-tooltip
            min-width="150"
          ></el-table-column>
        </el-table>
      </el-main>
      <el-footer>
        <div class="main-bottom-footer">
          <el-pagination
            background
            :page-sizes="[10, 15, 20]"
            :pager-count="5"
            layout="total, sizes, prev, pager, next, jumper"
          ></el-pagination>
        </div>
      </el-footer>
    </el-container>
  </div>
</template>

<script>
export default {
  name: "drop-index",
  props: ["columns", "dropData", "index"],
  data() {
    return {
      iText: ""
    };
  },
  computed: {},
  methods: {
    onSelecRightRow(rows, index) {
      debugger;
      rows.index = this.index;
      rows._checked = false;
      rows["dropArr"] = this.dropData;
      this.$emit("ChangeDropData", rows);
    }
  },
  mounted() {
  }
};
</script>

<style  scoped>
.drop_content {
  width: 467px;
  height: 270px;
}
.el-header {
  height: 30px !important;
}
.el-main {
  height: 200px !important;
}
.el-footer {
  height: 40px !important;
  padding: 0px;
  padding-top: 5px;
}
</style>