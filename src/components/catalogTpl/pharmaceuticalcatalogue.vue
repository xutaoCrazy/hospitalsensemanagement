<template>
  <div class="calt-contain-main">
    <el-main style="height:100%;position: relative;">
      <div class="main-header">
        <el-form label-width="80px">
          <el-row style="height:100%">
            <el-col :span="24">
              <el-col :span="4" style="text-align:left;">
                <el-select
                  placeholder="请选择"
                  size="small"
                  v-model="phInstitutions"
                  style="width:100%"
                >
                  <el-option
                    v-for="item in superiorArr"
                    :key="item.iaa01"
                    :label="item.iaa03"
                    :value="item.iaa01"
                  ></el-option>
                </el-select>
              </el-col>
              <el-col :span="4">
                <el-form-item :label="namedrug">
                  <el-input
                    :placeholder="placeholdername"
                    v-model="ItemName"
                    @keyup.enter.native="pharmaceuticalcatSearch"
                  >
                    <el-button
                      slot="append"
                      icon="el-icon-search"
                      style="width:30px;height:30px; padding: 9px 0px !important;"
                      @click="pharmaceuticalcatSearch"
                    ></el-button>
                  </el-input>
                </el-form-item>
              </el-col>
              <el-col :span="4">
                <el-form-item :label="drugcoding">
                  <el-input
                    style="width:100%"
                    v-model="ItemCode"
                    @keyup.enter.native="pharmaceuticalcatSearch"
                    :placeholder="placeholdercode"
                  ></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="4">
                <el-form-item :label="costLevel" v-show="showHidden">
                  <el-select placeholder="请选择" size="small" v-model="iae01">
                    <el-option
                      v-for="item in costLevelArr"
                      :key="item.iae01"
                      :label="item.iae04"
                      :value="item.iae01"
                    ></el-option>
                  </el-select>
                </el-form-item>
              </el-col>
              <el-col :span="4" style="text-align:left;padding-left:10px">
                <el-button type="primary" size="small" @click="pharmaceuticalcatSearch">查询</el-button>
                <el-button type="primary" size="small">下载</el-button>
              </el-col>
            </el-col>
          </el-row>
        </el-form>
      </div>
      <div class="main-bottom">
        <div class="main-bottom-header">
          <el-table height="100%" index="1" border stripe :data="phtableData">
            <el-table-column
              v-for="col in columns"
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
            @current-change="handleCurrentChange"
            :page-sizes="[10, 15, 20]"
            :pager-count="5"
            :page-size="rows"
            layout="total, sizes, prev, pager, next, jumper"
            :total="total"
          ></el-pagination>
        </div>
      </div>
    </el-main>
    <el-footer style="height:40%" v-show="true">
      <el-table height="100%" index="1" border stripe></el-table>
    </el-footer>
  </div>
</template>

<script>
import AnswerSystem from "@/service/api/answerService";
import {
  promiseInterFace,
  promiseTabel,
  promiseAjax
} from "@/service/api/InstitutionInterface";
export default {
  name: "",
  props: ["cataShow"],
  data() {
    return {
      superiorArr: [],
      phInstitutions: "",
      costLevelArr: [],
      iae01: [],
      ItemName: "",
      ItemCode: "",
      curr: 1,
      rows: 20,
      total: 0,
      phtableData: [],
      namedrug: "药品名称",
      drugcoding: "药品编码",
      placeholdername: "请输入药品通用名或商品名",
      placeholdercode: "请输入药品编码",
      costLevel: "费用等级",
      showHidden: true,
      columnsArr: [
        { label: "编码", id: "iah04", fixed: "left" },
        { label: "项目名称", id: "iah05", fixed: "left" }, //诊疗项目
        { label: "名称", id: "iah05", width: 200, fixed: "left" }, //药品目录
        { label: "商品名", id: "iah06" }, //药品目录
        { label: "英文名", id: "iah07" }, //药品目录
        { label: "保险偿付费别", id: "iaw03" },
        { label: "保险费别", id: "iaf04" },
        { label: "保险费别编码", id: "iaf03" },
        { label: "保险赔付类型编码", id: "iae03" },
        { label: "保险赔付类型", id: "iae04" },
        { label: "医保编码", id: "iah04" }, //诊疗项目
        { label: "拼音码", id: "abbrp" },
        { label: "五笔码", id: "abbrwa" },
        { label: "规格", id: "iah14" },
        { label: "剂型", id: "iah15" }, //药品目录
        { label: "单位", id: "iah16" },
        { label: "价格", id: "iah17" }, //诊疗项目
        { label: "说明", id: "iah43" }, //诊疗项目
        { label: "备注", id: "iah44" }, //诊疗项目
        { label: "参考价", id: "iah17" } //药品目录
      ],
      columnsICD: [
        { label: "编码", id: "iad03", fixed: "left" },
        { label: "名称", id: "iad04", fixed: "left" },
        { label: "ICD编码", id: "bak02" },
        { label: "拼音", id: "abbrp" },
        { label: "五笔", id: "abbrw" },
        { label: "说明", id: "iad07" },
        { label: "类型", id: "iad09" },
        { label: "最高赔付", id: "iad11" },
        { label: "使用", id: "enabl", fn: this.notFormat, width: 80 },
        { label: "性别", id: "abw01", width: 80 },
        { label: "更新日期", id: "iad13", fn: this.dateFormat, width: 180 },
        { label: "有效日期", id: "iad14", fn: this.dateFormat }
      ],
      columns: []
    };
  },
  methods: {
    init() {
      debugger;
      promiseInterFace() //  加载医疗保险接
        .then(res => {
          this.superiorArr = res;
        })
        .catch(res => {
          this.$confirm(res, "提示", {
            confirmButtonText: "确定",
            type: "error",
            showCancelButton: false
          });
        });
      promiseAjax({ instituionId: 569 }, "pubdiccompensationtype") //  加载费用等级
        .then(res => {
          debugger;
          this.costLevelArr = res.list;
        })
        .catch(res => {
          this.$confirm(res, "提示", {
            confirmButtonText: "确定",
            type: "error",
            showCancelButton: false
          });
        });
    },
    pharmaceuticalcatSearch() {
      if (this.phInstitutions == "") {
        this.$message({
          message: "请选择保险机构",
          type: "warning"
        });
        return false;
      }
      if (this.cataShow != "3") {
        promiseTabel(
          //获取表格数据
          {
            page: this.curr,
            rows: this.rows,
            paramStr: {
              IAA01: this.phInstitutions,
              ItemName: this.ItemName,
              ItemCode: this.ItemCode
            }
          },
          "insucatalog"
        )
          .then(res => {
            //获取tabel 数据
            this.phtableData = res.rows;
            this.total = res.total;
          })
          .catch(res => {
            this.$confirm(res, "提示", {
              confirmButtonText: "确定",
              type: "error",
              showCancelButton: false
            });
          });
      } else {
        promiseTabel(
          //获取表格数据
          {
            ItemType: "1",
            IAA01: this.phInstitutions,
            page: this.curr,
            rows: this.rows,
            KeyWord: this.ItemName,
            ItemCode: this.ItemCode
          },
          "insuicd"
        )
          .then(res => {
            //获取tabel 数据
            this.phtableData = res.rows;
            this.total = res.total;
          })
          .catch(res => {
            this.$confirm(res, "提示", {
              confirmButtonText: "确定",
              type: "error",
              showCancelButton: false
            });
          });
      }
    },
    handleSizeChange(val) {
      this.rows = val;
      this.pharmaceuticalcatSearch();
    },
    handleCurrentChange(val) {
      this.curr = val;
      this.pharmaceuticalcatSearch();
    },
    componentValue() {
      if (this.cataShow == "2") {
        //诊疗项目  服务设施
        this.namedrug = "项目名称";
        this.drugcoding = "项目编码";
        this.placeholdername = "请输入诊疗项目名称";
        this.placeholdercode = "请输入项目编码";
        this.columnsArr.splice(
          this.columnsArr.findIndex(item => item.label === "名称"),
          1
        );
        this.columnsArr.splice(
          this.columnsArr.findIndex(item => item.id === "iah06"),
          1
        );
        this.columnsArr.splice(
          this.columnsArr.findIndex(item => item.id === "iah07"),
          1
        );
        this.columnsArr.splice(
          this.columnsArr.findIndex(item => item.id === "iah15"),
          1
        );
        this.columnsArr.splice(
          this.columnsArr.findIndex(item => item.label === "参考价"),
          1
        );
        this.columns = this.columnsArr;
      } else if (this.cataShow == "1") {
        //药品目录
        this.columnsArr.splice(
          this.columnsArr.findIndex(item => item.label === "项目名称"),
          1
        );
        this.columnsArr.splice(
          this.columnsArr.findIndex(item => item.label === "医保编码"),
          1
        );
        this.columnsArr.splice(
          this.columnsArr.findIndex(item => item.label === "价格"),
          1
        );
        this.columnsArr.splice(
          this.columnsArr.findIndex(item => item.id === "iah43"),
          1
        );
        this.columnsArr.splice(
          this.columnsArr.findIndex(item => item.id === "iah44"),
          1
        );
        this.columns = this.columnsArr;
      } else {
        //ICD 目录
        this.namedrug = "项目名称";
        this.drugcoding = "项目编码";
        this.placeholdername = "请输入疾病名称、手术名称";
        this.placeholdercode = "请输入ICD编码";
        this.columns = this.columnsICD;
        this.showHidden = false;
      }
    }
  },
  mounted() {
    this.init();
    this.componentValue();
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
.main-header {
  height: 40px;
}
.main-bottom {
  position: absolute;
  left: 0px;
  top: 45px;
  right: 0px;
  bottom: 0px;
}
.el-footer {
  padding: 0px !important;
  margin-top: 10px;
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
</style>