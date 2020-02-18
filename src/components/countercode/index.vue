<template>
  <div class="calt-contain-main">
    <el-container style="width:100%;height:100%">
      <el-main>
        <el-row style="height:100%">
          <el-col :span="24" style="height:100%;position:relative;">
            <el-form ref="form" label-width="100px">
              <div class="searchLeft">
                <el-dropdown trigger="click">
                  <span class="el-dropdown-link">
                    全部数据
                    <i class="el-icon-arrow-down el-icon--right"></i>
                  </span>
                  <el-dropdown-menu slot="dropdown">
                    <el-dropdown-item>全部数据</el-dropdown-item>
                    <el-dropdown-item divided icon="el-icon-setting" @click.native="settingClick">设置</el-dropdown-item>
                  </el-dropdown-menu>
                </el-dropdown>
              </div>
              <div class="searchRight">
                <el-col :span="22">
                  <el-col :span="5">
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
                  <el-col :span="5">
                    <el-form-item
                      :label="directoty==1?'药品名称/编码':directoty==2?'诊疗项目':directoty==3?'物资耗材':'ICD项目名称'"
                    >
                      <el-input
                        :placeholder="directoty==1?'请输入药品商品名或通用名':directoty==2?'请输入诊疗项目名称':directoty==3?'请输入物资耗材名称':'请输入ICD项目名称'"
                        v-model="lSql"
                        @keyup.enter.native="searchCounter"
                      ></el-input>
                    </el-form-item>
                  </el-col>
                  <el-col :span="5" v-show="directoty==4?true:false">
                    <el-form-item label="ICD项目编码">
                      <el-input placeholder="请输入ICD项目编码" v-model="bak02"></el-input>
                    </el-form-item>
                  </el-col>
                  <el-col :span="5">
                    <el-form-item :label="directoty==1?'药品分类':directoty==4?'ICD分类':'项目分类'">
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
                          v-for="item in costLevelArr"
                          :key="item.iae01"
                          :label="item.iae04"
                          :value="item.iae01"
                        ></el-option>
                      </el-select>
                    </el-form-item>
                  </el-col>
                  <el-col :span="4" style="height:50px;text-align: left;padding-left: 15px;">
                    <el-button type="primary" size="small" @click="searchCounter">查询</el-button>
                    <el-button type="primary" size="small" @click="savePairCode">保存对码</el-button>
                  </el-col>
                </el-col>
              </div>
            </el-form>
            <div class="main-bottom counterpop" style="top:50px;right:0px">
              <div class="main-bottom-header counter">
                <el-row style="height:100%">
                  <el-col :span="12" style="height:100%;padding-right:5px">
                    <el-table
                      height="100%"
                      index="1"
                      border
                      stripe
                      ref="tabel"
                      highlight-current-row
                      :data="hisjsonarray"
                    >
                      <el-table-column
                        align="left"
                        header-align="center"
                        min-width="150"
                        label="医院目录"
                      >
                        <el-table-column
                          v-for="col in columnsLeft"
                          :prop="col.id"
                          :key="col.id"
                          :label="col.label"
                          align="left"
                          header-align="center"
                          min-width="150"
                          show-overflow-tooltip
                        ></el-table-column>
                      </el-table-column>
                    </el-table>
                  </el-col>
                  <el-col :span="12" style="height:100%">
                    <el-table
                      height="100%"
                      index="1"
                      border
                      stripe
                      ref="tabel"
                      :data="insujsonarray"
                      @cell-click="clickoncell"
                    >
                      <el-table-column
                        align="left"
                        header-align="center"
                        min-width="150"
                        show-overflow-tooltip
                        label="医保目录"
                      >
                        <template v-for="col in columnsRight">
                          <el-table-column
                            v-if="col.id=='iah05' "
                            :prop="col.id"
                            :key="col.id"
                            :label="col.label"
                            align="left"
                            header-align="center"
                            min-width="150"
                            show-overflow-tooltip
                          >
                            <template slot-scope="scope">
                              <el-popover
                                trigger="click"
                                placement="bottom"
                                width="470"
                                style="height:270px"
                              >
                                <drop-index
                                  :columns="columnsRight"
                                  :dropData="scope.row.dropArr"
                                  :index="scope.$index"
                                  @ChangeDropData="dropDatas($event)"
                                ></drop-index>

                                <div slot="reference" class="name-wrapper">{{ scope.row.iah05}}</div>
                              </el-popover>
                            </template>
                          </el-table-column>
                          <el-table-column
                            v-else-if="col.id=='iad04' "
                            :prop="col.id"
                            :key="col.id"
                            :label="col.label"
                            align="left"
                            header-align="center"
                            min-width="150"
                            show-overflow-tooltip
                          >
                            <template slot-scope="scope">
                              <el-popover
                                trigger="click"
                                placement="bottom"
                                width="470"
                                style="height:270px"
                              >
                                <drop-index
                                  :columns="columnsRight"
                                  :dropData="scope.row.dropArr"
                                  :index="scope.$index"
                                  @ChangeDropData="dropDatas($event)"
                                ></drop-index>

                                <div slot="reference" class="name-wrapper">{{ scope.row.iad04}}</div>
                              </el-popover>
                            </template>
                          </el-table-column>
                          <el-table-column
                            v-else
                            :prop="col.id"
                            :key="col.id"
                            :label="col.label"
                            align="left"
                            header-align="center"
                            min-width="150"
                            show-overflow-tooltip
                          ></el-table-column>
                        </template>
                      </el-table-column>
                      <el-table-column
                        align="left"
                        header-align="center"
                        min-width="200"
                        show-overflow-tooltip
                        fixed="right"
                        label="操作"
                      >
                        <el-table-column
                          align="center"
                          header-align="center"
                          min-width="200"
                          show-overflow-tooltip
                          width="200"
                        >
                          <template slot="header" slot-scope="scope">
                            <el-checkbox @change="onSelectAll" v-model="allchecked">全部确认</el-checkbox>
                          </template>
                          <template slot-scope="{ row }">
                            <el-radio-group
                              @change="onRadioChange($event, row)"
                              v-model="row._checked"
                            >
                              <el-radio :label="true">确认</el-radio>
                              <el-radio :label="false">待定</el-radio>
                            </el-radio-group>
                          </template>
                        </el-table-column>
                      </el-table-column>
                    </el-table>
                  </el-col>
                </el-row>
              </div>
              <div class="main-bottom-footer">
                <el-pagination
                  background
                  @size-change="handleSizeChange"
                  @current-change="handleCurrentChange"
                  :page-sizes="[2, 15, 20]"
                  :pager-count="5"
                  :page-size="rows"
                  layout="total, sizes, prev, pager, next, jumper"
                  :total="total"
                ></el-pagination>
              </div>
            </div>
          </el-col>
        </el-row>
      </el-main>
    </el-container>
    <search-index :searchModel.sync="searchModel" ref="son"></search-index>
  </div>
</template>

<script>
import dropindex from "@/components/droptabel/index";
import searchindex from "@/components/search/index";
import {
  promiseInterFace,
  promiseTabel,
  promiseAjax,
  promiseCommonAjax
} from "@/service/api/InstitutionInterface";
import {
  leftcolumncountercode,
  rightcolumncountercode
} from "@/components/column/columndirectory";
import {
  automaticCounterCode,
  saveCodingPreservation
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
      IAA01: "",
      curr: 1,
      rows: 2,
      total: 0,
      bdo01: "",
      Data: [],
      IAM06: "",
      lSql: "",
      columnsLeft: leftcolumncountercode(this, this.directoty),
      columnsRight: rightcolumncountercode(this, this.directoty),
      hisjsonarray: [], // 左侧
      insujsonarray: [], //  右侧
      checkboxLeftArr: [],
      visible: false,
      searchModel: false,
      loading: false,
      bak02: ""
    };
  },
  computed: {
    allchecked() {
      debugger;
      let checked =
        this.insujsonarray.length &&
        this.insujsonarray.every(row => row._checked);
      return checked;
    }
  },
  components: {
    "drop-index": dropindex,
    "search-index": searchindex
  },
  methods: {
    handleSizeChange(val) {
      this.rows = val;
      this.curr = 1;
      automaticCounterCode(this, this.directoty);
    },
    handleCurrentChange(val) {
      this.curr = val;
      automaticCounterCode(this, this.directoty);
    },
    getParamsiaa01(item) {
      //医疗保险机构选择方法
      this.iaa01Name = item.iaa03;
    },
    searchCounter() {
      this.curr = 1;
      automaticCounterCode(this, this.directoty);
    },
    onRadioChange(val, row) {
      this.$set(row, "_checked", val);
    },
    onSelectAll(val) {
      this.insujsonarray.forEach(row => this.$set(row, "_checked", val));
    },
    clickoncell(row, column, cell, event) {
      debugger;
      //点击单元格
    },
    dropDatas(row) {
      debugger;
      //下拉表格修改  表格数据
      this.$set(this.insujsonarray, row.index, row);
    },
    savePairCode() {
      saveCodingPreservation(this, this.directoty);
    },
    settingClick() {
      this.searchModel = true;
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
.counter label {
  margin-bottom: 0px !important;
}
table tbody tr {
  cursor: pointer;
}
.searchLeft {
  height: 50px;
  width: 90px;
  float: left;
  line-height: 35px;
}
.searchRight {
  position: absolute;
  left: 90px;
  right: 0px;
  height: 50px;
}
.el-dropdown-menu__item {
  line-height: 20px;
}
</style>