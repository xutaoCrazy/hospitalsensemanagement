<template>
  <div class="calt-contain-main">
    <el-container style="width:100%;height:100%">
      <el-main style="overflow:hidden">
        <el-row style="height:100%">
          <el-col
            :span="12"
            style="height:100%;position:relative;border-right: solid 1px #d8d8d8;padding-right: 5px;"
          >
            <el-form ref="form" label-width="90px">
              <el-col :span="7">
                <el-form-item label="医保类型">
                  <el-select placeholder="请选择" size="small" v-model="IAA01" clearable>
                    <el-option
                      v-for="item in superiorArr"
                      :key="item.iaa01"
                      :label="item.iaa03"
                      :value="item.iaa01"
                      @click.native="getParamsiaa01(item)"
                    ></el-option>
                  </el-select>
                </el-form-item>
              </el-col>
              <el-col :span="7">
                <el-form-item label="对应状态">
                  <el-select placeholder="请选择" size="small" v-model="IAM06">
                    <el-option
                      v-for="item in correspondingstate"
                      :key="item.value"
                      :label="item.label"
                      :value="item.value"
                    ></el-option>
                  </el-select>
                </el-form-item>
              </el-col>

              <el-col :span="10">
                <el-form-item :label="directoty=='1'?'药品名称':'项目名称'">
                  <el-input
                    :placeholder="directoty=='1'?'请输入药品通用名':directoty=='2'?'请输入诊疗项目名称':directoty=='3'?'请输入物资耗材项目名称':'请输入ICD项目名称'"
                    v-model="lSql"
                    @keyup.enter.native="tableLeftInfo(1)"
                    :clearable="true"
                  ></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="7">
                <el-form-item :label="directoty=='1'?'药品编码':'项目编码'">
                  <el-input
                    :placeholder="directoty=='1'?'请输入药品编码':directoty=='4'?'请输入ICD编码':'请输入项目编码'"
                    clearable
                  ></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="7">
                <el-form-item :label="directoty=='1'?'药品分类':directoty=='2'?'项目分类':'项目类别'">
                  <el-select
                    placeholder="请选择"
                    size="small"
                    v-model="bdo01"
                    clearable
                    v-if="directoty==1"
                  >
                    <el-option
                      v-for="item in cationArr"
                      :key="item.bdo01"
                      :label="item.bdo03"
                      :value="item.bdo01"
                    ></el-option>
                  </el-select>
                  <el-select
                    placeholder="请选择"
                    size="small"
                    v-model="bdo01"
                    clearable
                    v-if="directoty==2"
                  >
                    <el-option
                      v-for="item in projectArr"
                      :key="item.bhh01"
                      :label="item.bhh02"
                      :value="item.bhh01"
                    ></el-option>
                  </el-select>
                  <el-select
                    placeholder="请选择"
                    size="small"
                    v-model="bdo01"
                    clearable
                    v-if="directoty==3"
                  >
                    <el-option
                      v-for="item in materialArr"
                      :key="item.bdo01"
                      :label="item.bdo03"
                      :value="item.bdo01"
                    ></el-option>
                  </el-select>
                  <el-select
                    placeholder="请选择"
                    size="small"
                    v-model="bdo01"
                    clearable
                    v-if="directoty==4"
                  >
                    <el-option
                      v-for="item in materialArr"
                      :key="item.bdo01"
                      :label="item.bdo03"
                      :value="item.bdo01"
                    ></el-option>
                  </el-select>
                </el-form-item>
              </el-col>
              <el-col :span="10" style="height:50px;text-align: left;padding-left: 15px;">
                <el-button type="primary" size="small" @click="tableLeftInfo(1)">查询</el-button>
                <el-button type="primary" size="small" @click="correspondence">取消对应关系</el-button>
              </el-col>
            </el-form>
            <div class="main-bottom" style="top:90px;right:10px">
              <div class="main-bottom-header">
                <el-table
                  height="100%"
                  index="1"
                  border
                  stripe
                  ref="singleTable"
                  :data="lefttableData"
                  @row-click="onSelecLeftRow"
                  :row-class-name="tableRowClassName"
                  highlight-current-row
                >
                  <el-table-column
                    v-for="col in columnsLeft"
                    :prop="col.id"
                    :key="col.id"
                    :label="col.label"
                    align="left"
                    :width="col.width"
                    header-align="center"
                    min-width="150"
                    :fixed="col.fixed"
                    show-overflow-tooltip
                    :formatter="col.fn"
                  ></el-table-column>
                </el-table>
              </div>
              <div class="main-bottom-footer">
                <el-pagination
                  background
                  @size-change="handleSizeChange"
                  :page-sizes="[10, 15, 20]"
                  :pager-count="5"
                  :page-size="leftrows"
                  layout="total, sizes, prev, pager, next, jumper"
                  :total="lefttotal"
                ></el-pagination>
              </div>
            </div>
          </el-col>
          <el-col :span="12" style="height:100%;position:relative">
            <el-form ref="form" label-width="80px">
              <el-col :span="8">
                <el-form-item :label="directoty=='1'?'药品名称':'项目名称'">
                  <el-input
                    :placeholder="directoty=='1'?'请输入药品通用名':directoty=='2'?'请输入诊疗项目名称':directoty=='3'?'请输入物资耗材项目名称':'请输入ICD项目名称'"
                    v-model="ItemName"
                    @keyup.enter.native="tableLeftInfo(2)"
                    clearable
                  ></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="8">
                <el-form-item :label="directoty=='1'?'药品编码':'项目编码'">
                  <el-input
                    :placeholder="directoty=='1'?'请输入药品编码':directoty=='4'?'请输入ICD编码':'请输入项目编码'"
                    v-model="ItemCode"
                    @keyup.enter.native="tableLeftInfo(2)"
                    clearable
                  ></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="8">
                <el-form-item :label="directoty=='4'?'项目类别':'费用等级'">
                  <el-select size="small" clearable v-model="IAE01" placeholder="请选择">
                    <el-option
                      v-for="item in costLevelArr"
                      :key="item.iae01"
                      :label="item.iae04"
                      :value="item.iae01"
                    ></el-option>
                  </el-select>
                </el-form-item>
              </el-col>

              <el-col :span="24" style="height:50px;text-align: right;">
                <el-button type="primary" size="small" @click="tableLeftInfo(2)">查询</el-button>
                <el-button type="primary" size="small" @click="correspondenceClick">建立对应关系</el-button>
              </el-col>
            </el-form>
            <div class="main-bottom" style="top:90px;left:10px">
              <div class="main-bottom-header">
                <el-table
                  height="100%"
                  index="1"
                  border
                  stripe
                  :data="righttableData"
                  highlight-current-row
                  @row-click="onSelecRightRow"
                >
                  <el-table-column
                    v-for="col in columnsRight"
                    :prop="col.id"
                    :key="col.id"
                    :label="col.label"
                    align="left"
                    :width="col.width"
                    header-align="center"
                    min-width="150"
                    :fixed="col.fixed"
                    show-overflow-tooltip
                    :formatter="col.fn"
                  ></el-table-column>
                </el-table>
              </div>
              <div class="main-bottom-footer">
                <el-pagination
                  background
                  @size-change="handleSizeChange1"
                  @current-change="handleCurrentChange1"
                  :page-sizes="[10, 15, 20]"
                  :pager-count="5"
                  :page-size="rightows"
                  layout="total, sizes, prev, pager, next, jumper"
                  :total="righttotal"
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
import {
  Leftcolumndirectory,
  rightcolumndirectory
} from "@/components/column/columndirectory"; //获取column
import {
  diretorLeftTabelCommon,
  diretorRightTabelCommon,
  correspondenceParms,
  correspondenceNOParms
} from "@/components/column/tabeldirectory";
export default {
  name: "",
  props: [
    "directoty",
    "superiorArr",
    "cationArr",
    "costLevelArr",
    "projectArr",
    "materialArr"
  ],
  data() {
    return {
      lSql: "", //药品通用名称
      leftcurr: 1,
      leftrows: 20,
      lefttotal: 0,
      rightcurr: 1,
      rightows: 20,
      righttotal: 0,
      ItemName: "", //药品名称
      ItemCode: "", //药品编码
      IAE01: "", //费用等级
      IAM06: "0", //状态
      IAA01: "",
      bdo01: "", //药品分类
      cflx: "", //处方类型
      iaa01Name: "",
      lefttableData: [], //左侧表格数据
      righttableData: [], //右侧表格数据,
      leftRow: [], //  获取左侧点击行数据
      rightRow: [], //  获取右侧点击行数据
      correspondingstate: [
        { label: "全部", value: "0" },
        { label: "已对应", value: "1" },
        { label: "未对应", value: "2" }
      ],
      prescription: [
        { label: "全部", value: "0" },
        { label: "处方药", value: "1" },
        { label: "非处方药", value: "2" }
      ],
      columnsLeft: Leftcolumndirectory(this, this.directoty),
      columnsRight: rightcolumndirectory(this, this.directoty),
      leftCorr: false, //判断是建立对应关系的时候刷新表格   选中之前选择的
      leftindex: "" //判断是建立对应关系的时候刷新表格   选中之前选择的
    };
  },
  methods: {
    tableRowClassName({ row, rowIndex }) {
      // 把每一行的索引放进row
      row.index = rowIndex;
    },
    tableLeftInfo(index) {
      if (index == 1) {
        this.leftcurr = 1;
        diretorLeftTabelCommon(this, this.directoty); //加载表格数据
        this.leftRow = [];
      } else {
        if (this.IAA01 == "") {
          this.$message({
            message: "请选择医保类型",
            type: "warning"
          });
          return false;
        }
        this.rightRow = [];
        this.rightcurr = 1;
        diretorRightTabelCommon(this, this.directoty);
      }
    },
    correspondingRelation(row, column, cellValue) {
      //状态
      if (cellValue == "0") {
        cellValue = "未对应";
      } else {
        cellValue = "对应";
      }
      return cellValue;
    },
    originType(row, column, cellValue) {
      //产地类型
      switch (cellValue) {
        case "1":
          cellValue = "国产";
          break;
        case "2":
          cellValue = "进口";
          break;
        case "3":
          cellValue = "合资";
          break;
        case "4":
          cellValue = "自制";
          break;
      }
      return cellValue;
    },
    costLevel(row, column, cellValue) {
      //费用等级
      return (cellValue = row.iae04);
    },
    insurance(row, column, cellValue) {
      return (cellValue = this.iaa01Name);
    },
    handleSizeChange(val) {
      //左侧点击每页多少条 加载表格
      this.leftrows = val;
      diretorLeftTabelCommon(this, this.directoty); //加载表格数据
    },
    handleCurrentChange(val) {
      //左侧点击分页加载表格
      this.leftcurr = val;
      diretorLeftTabelCommon(this, this.directoty); //加载表格数据
    },
    handleSizeChange1(val) {
      //右侧点击每页多少条 加载表格
      this.rightrows = val;
      diretorRightTabelCommon(this, this.directoty); //加载表格数据
    },
    handleCurrentChange1(val) {
      //右侧点击分页加载表格
      this.rightcurr = val;
      diretorRightTabelCommon(this, this.directoty); //加载表格数据
    },
    correspondence() {
      //取消对应关系
      if (this.leftRow == "") {
        this.$message({
          message: "请选择左侧表格数据",
          type: "warning"
        });
        return false;
      }
      if (this.leftRow.status == 0) {
        this.$message({
          message: "当前数据还未建立对应关系,不能取消对应关系",
          type: "warning"
        });
        return false;
      }
      correspondenceNOParms(this, this.directoty);
    },
    onSelecLeftRow(rows, index) {
      debugger;
      //点击左侧表格选中行数据
      if (this.IAA01 == "") {
        this.$message({
          message: "请选择医保类型",
          type: "warning"
        });
        return false;
      }
      this.rightcurr = 1;
      this.leftRow = rows;
      this.rightRow = [];
      this.leftindex = rows.index; //获取当前选中的是第几行
      debugger;
      if (!rows.iam01 && !rows.ial01) {
        if (this.directoty == "4") {
          this.ItemName = rows.bah03;
        } else {
          this.ItemName = rows.bby05;
        }
        diretorRightTabelCommon(this, this.directoty);
      } else {
        if (this.directoty == "4") {
          this.ItemName = "";
        } else {
          this.ItemName = "";
        }
        diretorRightTabelCommon(this, this.directoty, true);
      }
    },
    onSelecRightRow(rows, index) {
      debugger;
      //点击右侧表格选中行数据
      this.rightRow = rows;
    },
    getParamsiaa01(item) {
      //医疗保险机构选择方法
      this.iaa01Name = item.iaa03;
      this.tableLeftInfo(1);
    },
    correspondenceClick() {
      // 建立对应关系
      debugger;
      if (this.leftRow == "") {
        this.$message({
          message: "请选择左侧表格数据",
          type: "warning"
        });
        return false;
      }
      if (this.rightRow == "") {
        this.$message({
          message: "请选择右侧表格数据",
          type: "warning"
        });
        return false;
      }
      correspondenceParms(this, this.directoty);
    }
  },
  mounted() {}
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
.main-bottom-header .el-checkbox {
  margin-bottom: 0px;
}
</style>