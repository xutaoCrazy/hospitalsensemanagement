<template>
  <div class="contain-table">
    <div class="table-contain-main" :id="classTable">
      <el-table
        height="100%"
        style="width: 100%"
        index="1"
        :data="data"
        @row-click="tableCLick"
        highlight-current-row
      >
        <el-table-column
          v-for="item in tableClumn"
          :key="item.id"
          :label="item.label"
          :prop="item.id"
          align="left"
          :width="item.width"
          show-overflow-tooltip
          header-align="center"
          :formatter="item.fn"
        ></el-table-column>
      </el-table>
    </div>
    <div class="main-bottom-footer">
      <el-pagination
        background
        layout="total, prev, pager, next"
        :pager-count="5"
        @current-change="handleCurrentChange"
        :page-size="topTabel.rows"
        :total="total"
      ></el-pagination>
    </div>
  </div>
</template>

<script>
import { getlistdata } from "@/service/api/commonAJax";
export default {
  name: "",
  props: {
    tableClumn: Array, //表头
    url: String, //地址
    classTable: "",
    parms: Object // 传参
  },
  watch: {
    parms(val) {
      debugger;
      this.getableList();
    }
  },
  data() {
    return {
      topTabel: {
        rows: 20,
        page: 1
      },
      data: [],
      total: 0,
      parms: {},
      rowData: ""
    };
  },
  methods: {
    getableList() {
      //获取列表
      debugger;
      this.topTabel = Object.assign(this.topTabel, this.parms);
      getlistdata(this.topTabel, this.url).then(data => {
        debugger;
        console.log(data);
        if (data.code == "200") {
          this.data = data.list;
          this.total = data.total;
        }
      });
    },
    handleCurrentChange(val) {
      //点击每一页
      debugger;
      this.topTabel.page = val;
      this.getableList();
    },
    tableCLick(row, column, event) {
      this.rowData = row;
      this.$emit("rowSelected", row);
    }
  },
  mounted() {
    debugger;
    this.getableList();
  }
};
</script>

<style lang="" scoped>
.contain-table-waring {
  width: 100%;
  border: solid 1px #e4e4e4;
}
.table-contain-main {
  height: calc(100% - 40px);
  width: 100%;
  border: solid 1px #e4e4e4;
}
.main-bottom-footer {
  position: absolute;
  left: 0px;
  right: 0px;
  bottom: 0px;
  height: 40px;
  padding-top: 5px;
}
.contain-table {
  height: 100%;
}
#dropTeble {
  height: calc(100% - 70px) !important;
}
</style>