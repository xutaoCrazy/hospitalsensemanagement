<template>
  <div id="chargesitions">
    <el-container>
      <el-header class="header-body">
        <el-row>
          <el-col :span="24">
            <el-button type="primary" size="small" @click="open">医保机构新增</el-button>
            <el-button type="primary" size="small">刷新</el-button>
          </el-col>
        </el-row>
      </el-header>
      <el-main class="main-body">
        <el-table
          height="100%"
          style="width:2000px"
          index="1"
          border
          :data="tableData"
          row-key="id"
          :tree-props="{children: 'children'}"
          :fit="true"
        >
          <el-table-column
            label="编码"
            align="left"
            prop="iaa02"
            min-width="150"
            show-overflow-tooltip
          ></el-table-column>
          <el-table-column
            label="名称"
            align="left"
            prop="iaa03"
            min-width="200"
            show-overflow-tooltip
            header-align="center"
          ></el-table-column>
          <el-table-column label="类型" align="left" prop show-overflow-tooltip header-align="center"></el-table-column>
          <el-table-column label="定点医院编码" align="center" min-width="120" show-overflow-tooltip></el-table-column>
          <el-table-column
            label="接口驱动"
            align="left"
            prop="iaa06"
            min-width="150"
            show-overflow-tooltip
            header-align="center"
          ></el-table-column>
          <el-table-column
            label="版本"
            align="left"
            prop="iaa07"
            show-overflow-tooltip
            header-align="center"
          ></el-table-column>
          <el-table-column
            label="开发商"
            align="left"
            prop="iaa08"
            min-width="200"
            show-overflow-tooltip
            header-align="center"
          ></el-table-column>
          <el-table-column
            label="说明"
            align="left"
            prop="iaa09"
            min-width="200"
            show-overflow-tooltip
            header-align="center"
          ></el-table-column>
          <el-table-column
            label="次序"
            align="left"
            prop="rownr"
            show-overflow-tooltip
            header-align="center"
          ></el-table-column>
          <el-table-column
            label="上级机构"
            align="left"
            header-align="center"
            prop="iaa01a"
            show-overflow-tooltip
            :formatter="iaa01aFormatter"
          ></el-table-column>
          <el-table-column
            label="使用接口"
            align="left"
            prop="iaa05"
            show-overflow-tooltip
            :formatter="iaa05formatter"
            header-align="center"
          ></el-table-column>
          <el-table-column
            label="启用"
            align="left"
            prop="enabl"
            show-overflow-tooltip
            :formatter="iaa05formatter"
            header-align="center"
          ></el-table-column>
          <el-table-column
            label="只读"
            align="left"
            prop="ronly"
            show-overflow-tooltip
            :formatter="iaa05formatter"
            header-align="center"
          ></el-table-column>
          <el-table-column label="操作" align="center" fixed="right" width="130">
            <template slot-scope="scope">
              <img
                src="../../assets/img/edit.png"
                style="cursor: pointer;"
                title="编辑"
                @click="edit(scope.$index, scope.row)"
              />
              <img
                style="margin-left:10px;cursor: pointer;"
                title="删除"
                src="../../assets/img/remove.png"
                @click="remove(scope.$index, scope.row)"
              />
            </template>
          </el-table-column>
        </el-table>
      </el-main>
    </el-container>
    <div class="charge-contain-bottom">
      <el-pagination style="margin-top: 10px" layout="prev, pager, next,jumper,total"></el-pagination>
    </div>
    <el-dialog
      title="新增"
      width="600px"
      :visible.sync="dialogstitutions"
      :close-on-click-modal="false"
      @close="clooseAll"
    >
      <el-form label-width="85px" :model="parms" ref="parms" :rules="rules" class="demo-ruleForm">
        <el-row>
          <el-col :span="12">
            <el-form-item label="类型">
              <el-select placeholder size="small"></el-select>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="上级机构">
              <el-select
                placeholder
                size="small"
                v-model="superiorSelect"
                @change="changeSuperior"
                ref="select"
              >
                <el-option
                  v-for="item in superiorArr"
                  :key="item.iaa01"
                  :label="item.iaa03"
                  :value="item.iaa01"
                  @click.native="getIaa01aParams(item)"
                ></el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="12" v-show="nodisplay">
            <el-form-item label="ID" prop="iaa01">
              <el-input size="small" v-model="parms.iaa01"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="12" v-show="nodisplay">
            <el-form-item label="名称" prop="iaa03">
              <el-input size="small" v-model="parms.iaa03"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="12" v-show="nodisplay">
            <el-form-item label="定点编码" prop="iaa02">
              <el-input size="small" v-model="parms.iaa02"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="12" v-show="nodisplay">
            <el-form-item label="接口驱动" prop="iaa06">
              <el-input size="small" v-model="parms.iaa06"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="12" v-show="nodisplay">
            <el-form-item label="版本" prop="iaa07">
              <el-input size="small" v-model="parms.iaa07"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="12" v-show="nodisplay">
            <el-form-item label="开发商" prop="iaa08">
              <el-input size="small" v-model="parms.iaa08"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="12" v-show="nodisplay">
            <el-form-item label="使用接口">
              <el-select placeholder size="small" v-model="parms.iaa05">
                <el-option
                  v-for="item in availability"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value"
                ></el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="12" v-show="nodisplay">
            <el-form-item label="启用">
              <el-select placeholder size="small" v-model="parms.enabl">
                <el-option
                  v-for="item in availability"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value"
                ></el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="12" v-show="nodisplay">
            <el-form-item label="只读">
              <el-select placeholder size="small" v-model="parms.ronly">
                <el-option
                  v-for="item in availability"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value"
                ></el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="12" v-show="nodisplay">
            <el-form-item label="次序" prop="rownr">
              <el-input size="small" v-model="parms.rownr"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="24" v-show="nodisplay">
            <el-form-item label="说明" prop="iaa09">
              <el-input size="small" type="textarea" :rows="2" v-model="parms.iaa09"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="24" v-show="display">
            <el-form-item label="所属机构">
              <el-input size="small" v-model="subordinate" readonly="readonly"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="24" v-show="display">
            <el-form-item label="分中心编码" prop="iab02">
              <el-input size="small" v-model="parms.iab02"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="24" v-show="display">
            <el-form-item label="分中心名称" prop="iab03">
              <el-input size="small" v-model="parms.iab03"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button
          type="primary"
          @click="savestitutions('parms')"
          size="small"
          :disabled="saveLoading"
        >保 存</el-button>
        <el-button @click="clooseAll()" size="small">取 消</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import "@/index.scss";
import AnswerSystem from "@/service/api/answerService";
import { Loading } from "element-ui";
import { promiseInterFace } from "@/service/api/InstitutionInterface";
export default {
  name: "",
  data() {
    return {
      dialogstitutions: false,
      parms: {
        iaa01a: "0",
        iaa01: "",
        iaa03: "",
        iaa02: "",
        iaa06: "",
        iaa07: "",
        iaa08: "",
        iaa05: 0,
        enabl: 1,
        ronly: 0,
        iaa09: "",
        rownr: "",
        iab02: "",
        iab03: "",
        iab01: "0"
      },
      rules: {
        iaa01: [{ required: true, message: "请输入ID", trigger: "blur" }],
        iaa03: [{ required: true, message: "请输入名称", trigger: "blur" }]
      },
      superiorSelect: "0",
      superiorArr: [], //上级机构
      availability: [{ value: 0, label: "否" }, { value: 1, label: "是" }],
      display: false,
      nodisplay: true,
      subordinate: "", //所属机构
      superiors: 0, //通过选择上级机构通过1和0 来保存,
      saveLoading: false,
      tableData: []
    };
  },
  methods: {
    iaa05formatter(row, column) {
      return row[column.property] == "0"
        ? "否"
        : row[column.property] == "1"
        ? "是"
        : "";
    },
    iaa01aFormatter(row, column) {
      return row[column.property] == "0" ? "无" : "";
    },
    init() {
      promiseInterFace()
        .then(res => {
          debugger;
          this.superiorArr = res;
          this.superiorArr.push({ iaa01: "0", iaa03: "无" });
        })
        .catch(res => {
          this.$notify.error(error.message);
        });
      this.tabelInfo();
    },
    getIaa01aParams(parms) {
      //选择上级机构变换分机构
      if (parms.iaa01 != "0") {
        this.nodisplay = false;
        this.display = true;
        this.subordinate = parms.iaa03;
        this.superiors = 1;
        this.parms.iaa01 = parms.iaa01;
      } else {
        this.nodisplay = true;
        this.display = false;
        this.subordinate = "";
        this.superiors = 0;
      }
    },
    open() {
      this.dialogstitutions = true;
      this.nodisplay = true;
      this.display = false;
      this.subordinate = "";
      this.superiors = 0;
    },
    savestitutions(formName) {
      
      debugger;
      this.$refs[formName].validate(valid => {
        if (valid || this.superiors != 0) {
          this.saveLoading = true;
          let url = "";
          let orderApi = new AnswerSystem();
          if (this.superiors == 0) {
            url = "institutaions";
          } else {
            url = "subinstitutaions";
          }
          orderApi.save(this.parms, url).then(
            ({ data }) => {
              debugger;
              this.saveLoading = false;
              if (data.result === "Success") {
                this.$message({
                  message: "保存成功",
                  type: "success"
                });
                this.tabelInfo();
                this.resetFields();
                this.dialogstitutions = false;
              } else {
                this.$confirm(data.resultMsg, "提示", {
                  confirmButtonText: "确定",
                  type: "error",
                  showCancelButton: false
                });
              }
            },
            error => {
              this.$notify.error(error.message);
              this.saveLoading = false;
            }
          );
        } else {
          return false;
        }
      });
    },
    resetFields() {
      //清空所有数据
      debugger;
      for (let item in this.parms) {
        this.parms[item] = "";
      }
      this.parms.iaa01a = "0";
      this.parms.iaa05 = 0;
      this.parms.enabl = 1;
      this.parms.ronly = 0;
      this.superiorSelect = "0";
      this.subordinate = "";
      this.parms.iab01 = "0";
    },
    tabelInfo() {
      debugger;
      promiseInterFace().then(res => {
        debugger;
        this.tableData = res;
      });
    },
    edit(index, row) {
      debugger;
      this.dialogstitutions = true;
      this.parms.iaa01a = row.iaa01a;
      this.parms.iaa01 = row.iaa01;
      this.parms.iaa03 = row.iaa03;
      this.parms.iaa02 = row.iaa02;
      this.parms.iaa06 = row.iaa06;
      this.parms.iaa07 = row.iaa07;
      this.parms.iaa08 = row.iaa08;
      this.parms.iaa05 = row.iaa05;
      this.parms.enabl = row.enabl;
      this.parms.ronly = row.ronly;
      this.parms.iaa09 = row.iaa09;
      this.parms.rownr = row.rownr;
      this.parms.iab02 = row.iab02;
      this.parms.iab03 = row.iab03;
      this.parms.iab01 = row.iab01;
      this.superiorSelect = row.iaa01;
      if (row.children == undefined) {
        this.nodisplay = false;
        this.display = true;
        for (let i = 0; i < this.superiorArr.length; i++) {
          if (this.superiorArr[i].iaa01 === row.iaa01) {
            this.subordinate = this.superiorArr[i].iaa03;
          }
        }
        this.superiors = 1;
        this.parms.iaa01 = row.iaa01;
      } else {
        this.nodisplay = true;
        this.display = false;
        this.subordinate = "";
        this.superiors = 0;
        this.parms.iaa01 = row.iaa01;
      }
    },
    remove(index, row) {
      this.$confirm("确定删除当前医疗保险机构[" + row.iaa03 + "]吗？", "提示", {
        confirmButtonText: "确定",
        type: "warning",
        showCancelButton: true
      }).then(() => {
        debugger;
        let removeurl = "";
        if (row.children == undefined) {
          removeurl = "subinstitutaions/" + row.iab01; //子集删除
        } else {
          removeurl = "institutaions/" + row.iaa01; //父集删除
        }
        let orderApi = new AnswerSystem();
        orderApi.delete("", removeurl).then(
          ({ data }) => {
            if (data.result === "Success") {
              if (data.result === "Success") {
                this.$message({
                  message: "删除成功",
                  type: "success"
                });
                this.tabelInfo();
              } else {
                this.$confirm(data.resultMsg, "提示", {
                  confirmButtonText: "确定",
                  type: "error",
                  showCancelButton: false
                });
              }
            }
          },
          error => {
            this.$notify.error(error.message);
          }
        );
      });
    },
    clooseAll() {
      this.dialogstitutions = false;
      this.resetFields();
    },
    changeSuperior(val) {
      debugger;
    }
  },
  mounted() {
    this.init();
  }
};
</script>  
 
<style scoped>
#chargesitions {
  position: absolute;
  left: 0px;
  right: 0px;
  bottom: 0px;
  top: 0px;
  margin: 5px;
}
.header-body {
  width: 100%;
  width: 100%;
  height: 40px !important;
  line-height: 50px;
  text-align: right;
}
.main-body {
  /* height: calc(100% - 40px); */
}
.el-form {
  padding-right: 50px !important;
}
.main-body {
  position: absolute;
  left: 0px;
  right: 0px;
  top: 50px;
  bottom: 0px;
}
.charge-contain-bottom {
  position: absolute;
  left: 0px;
  bottom: 0px;
  height: 40px;
  right: 0px;
  display: none;
}
</style>   