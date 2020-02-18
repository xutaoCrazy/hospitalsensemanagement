<template>
  <div class="calt-contain-main">
    <el-container style="width:100%;height:100%">
      <el-main>
        <el-row style="height:100%">
          <el-col :span="24" style="height:100%;position:relative;">
            <el-form ref="form" label-width="90px">
              <el-col :span="18">
                <el-col :span="6">
                  <el-form-item label="开始日期">
                    <el-input placeholder></el-input>
                  </el-form-item>
                </el-col>
                <el-col :span="6">
                  <el-form-item label="结束日期">
                    <el-input placeholder></el-input>
                  </el-form-item>
                </el-col>
                <el-col :span="6">
                  <el-form-item label="患者信息">
                    <el-input placeholder></el-input>
                  </el-form-item>
                </el-col>
                <el-col :span="6">
                  <el-form-item label="收费状态">
                    <el-input placeholder></el-input>
                  </el-form-item>
                </el-col>
              </el-col>
              <el-col :span="18">
                <el-col :span="6">
                  <el-form-item label="交易状态">
                    <el-input placeholder></el-input>
                  </el-form-item>
                </el-col>
                <el-col :span="6">
                  <el-form-item label="操作员">
                    <el-input placeholder></el-input>
                  </el-form-item>
                </el-col>
                <el-col :span="6" style="height:40px;text-align: left;padding-left: 15px;">
                  <el-button type="primary" size="small">查询</el-button>
                </el-col>
              </el-col>
            </el-form>
            <div class="main-bottom" style="top:80px;right:0px">
              <div class="main-bottom-header">
                <el-row style="height:100%">
                  <el-col :span="24" style="height:100%">
                    <el-table
                      height="100%"
                      index="1"
                      border
                      stripe
                      ref="tabel"
                      highlight-current-row
                    >
                      <el-table-column
                        v-for="col in columns"
                        :prop="col.id"
                        :key="col.id"
                        :label="col.label"
                        align="left"
                        header-align="center"
                        min-width="150"
                        show-overflow-tooltip
                      ></el-table-column>
                    </el-table>
                  </el-col>
                </el-row>
              </div>
              <div class="main-bottom-footer">
                <el-pagination
                  background
                  :page-sizes="[10, 15, 20]"
                  :pager-count="5"
                  layout="total, sizes, prev, pager, next, jumper"
                ></el-pagination>
              </div>
            </div>
          </el-col>
        </el-row>
      </el-main>
    </el-container>
  </div>
</template>

<script>
import {
  promiseInterFace,
  promiseTabel,
  promiseAjax
} from "@/service/api/InstitutionInterface";
import { columnmanagement } from "@/components/column/columndirectory";
export default {
  name: "",
  props: ["directoty", "superiorArr", "cationArr"],
  data() {
    return {
      curr: 1,
      rows: 20,
      total: 0,
      columns: columnmanagement(this, this.directoty)
    };
  },
  methods: {
   
  },
  mounted() {
 
  }
};
</script>

<style  scoped>
.calt-contain-main {
  position: absolute;
  left: 0px;
  top: 0px;
  right: 0px;
  bottom: 0px;
  padding: 7px 7px;
}
.main-bottom {
  position: absolute;
  left: 0px;
  top: 45px;
  right: 0px;
  bottom: 0px;
}
.main-bottom-header {
  position: absolute;
  left: 0px;
  top: 0px;
  right: 0px;
  bottom: 40px;
}
.main-bottom-footer {
  position: absolute;
  left: 0px;
  right: 0px;
  bottom: 0px;
  height: 40px;
  padding-top: 5px;
}
.el-form-item {
  margin-bottom: 5px !important;
}
</style>