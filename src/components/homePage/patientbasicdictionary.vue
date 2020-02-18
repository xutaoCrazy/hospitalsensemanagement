<template>
  <div class="main-container mainpatient">
    <el-container>
      <el-aside style="padding-right:10px">
        <el-row>
          <el-col :span="24">
            <el-container>
              <el-header style="height:40px">
                <el-select
                  v-model="insurancevalue"
                  placeholder="请选择"
                  size="small"
                  clearable
                  style="width:100%"
                >
                  <el-option
                    v-for="item in InsuranceArr"
                    :key="item.iaa01"
                    :label="item.iaa03"
                    :value="item.iaa01"
                    @click.native="getParamsZtree(item)"
                  ></el-option>
                </el-select>
              </el-header>
              <el-main>
                <el-tree
                  :data="ZtreeData"
                  node-key="id"
                  :default-expand-all="true"
                  @node-click="ztreeOnclick"
                  :highlight-current="true"
                >
                  <span class="custom-tree-node" slot-scope="{ node, data }">
                    <span class="whiteSpace" :title="node.label">{{ node.label }}</span>
                    <span v-if="node.childNodes.length===0">
                      <img
                        src="../../assets/img/edit.png"
                        style="cursor: pointer;"
                        title="编辑"
                        @click="ztreeEdit(node,data)"
                      />
                      <img
                        style="margin-left:10px;cursor: pointer;"
                        title="删除"
                        src="../../assets/img/remove.png"
                        @click="ztreeRemove(node,data)"
                      />
                    </span>
                  </span>
                </el-tree>
              </el-main>
            </el-container>
          </el-col>
        </el-row>
      </el-aside>
      <el-main>
        <div class="charge-contain-top">
          <div class="charge-button">
            <el-button type="primary" size="small" @click="open">字典类型新增</el-button>
            <el-button type="primary" size="small" @click="openItem">字典项目新增</el-button>
            <el-button type="primary" size="small">刷新</el-button>
          </div>
        </div>
        <div class="charge-contain-main">
          <el-table height="100%" index="1" border :data="tableData">
            <el-table-column
              label="字典类型"
              align="left"
              prop="iax05a"
              header-align="center"
              show-overflow-tooltip
            ></el-table-column>
            <el-table-column
              label="编码"
              align="left"
              header-align="center"
              prop="iax04"
              show-overflow-tooltip
            ></el-table-column>
            <el-table-column
              label="名称"
              align="left"
              header-align="center"
              prop="iax05"
              show-overflow-tooltip
            ></el-table-column>
            <el-table-column
              label="属性"
              align="left"
              header-align="center"
              prop="iax09"
              show-overflow-tooltip
            ></el-table-column>
            <el-table-column
              label="备注"
              align="left"
              header-align="center"
              prop="iax11"
              show-overflow-tooltip
            ></el-table-column>
            <el-table-column label="操作" align="center" header-align="center" width="100">
              <template slot-scope="scope">
                <img
                  src="../../assets/img/edit.png"
                  style="cursor: pointer;"
                  title="编辑"
                  @click="tabelEdit(scope.$index, scope.row)"
                />
                <img
                  style="margin-left:10px;cursor: pointer;"
                  title="删除"
                  src="../../assets/img/remove.png"
                  @click="tabelRemove(scope.$index, scope.row)"
                />
              </template>
            </el-table-column>
          </el-table>
        </div>
        <div class="charge-contain-bottom">
          <el-pagination style="margin-top: 10px" layout="prev, pager, next,jumper,total"></el-pagination>
        </div>
      </el-main>
    </el-container>
    <el-dialog
      :title="dictionaryTitle"
      width="500px"
      :visible.sync="dialogclassifidictionary"
      :close-on-click-modal="false"
    >
      <el-form :model="dictionarydata" ref="dictionarydata" :rules="rules" label-width="100px">
        <el-form-item label="类型编码" prop="iax04">
          <el-input size="small" v-model="dictionarydata.iax04"></el-input>
        </el-form-item>
        <el-form-item label="医保类型">
          <el-input size="small" v-model="dictionarydata.iaa03" readonly="readonly"></el-input>
        </el-form-item>
        <el-form-item label="字典类型" prop="iax05">
          <el-input size="small" v-model="dictionarydata.iax05"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button type="primary" @click="save('dictionarydata')" size="small">保 存</el-button>
        <el-button @click="dialogclassifidictionary = false" size="small">取 消</el-button>
      </div>
    </el-dialog>
    <el-dialog
      :title="dictionaryItemsTitle"
      width="500px"
      :visible.sync="dictionaryItems"
      :close-on-click-modal="false"
    >
      <el-form
        :model="dictionaryItemsData"
        ref="dictionaryItemsData"
        :rules="itemRules"
        label-width="100px"
      >
        <el-form-item label="费用类型">
          <el-input size="small" v-model="dictionaryItemsData.iaa03" readonly></el-input>
        </el-form-item>
        <el-form-item label="项目编码" prop="iax04">
          <el-input size="small" v-model="dictionaryItemsData.iax04"></el-input>
        </el-form-item>
        <el-form-item label="项目名称" prop="iax05">
          <el-input size="small" v-model="dictionaryItemsData.iax05"></el-input>
        </el-form-item>
        <el-form-item label="属性">
          <el-input size="small" v-model="dictionaryItemsData.iax09"></el-input>
        </el-form-item>
        <el-form-item label="备注">
          <el-input size="small" v-model="dictionaryItemsData.iax11"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button type="primary" @click="save('dictionaryItemsData',true)" size="small">保 存</el-button>
        <el-button @click="dictionaryItems = false" size="small">取 消</el-button>
      </div>
    </el-dialog>
  </div>
</template>
<script>
import AnswerSystem from "@/service/api/answerService";

export default {
  data() {
    return {
      dialogbasic: false,
      dialogclassification: false,
      dialogclassifidictionary: false,
      cationtcheck: true,
      InsuranceArr: [],
      insurancevalue: "",
      ZtreeData: [],
      dictionaryTitle: "字典类型新增",
      dictionaryItemsTitle: "字典项目新增",
      dictionaryItems: false,
      dictionarydata: {
        iaa01: "",
        iaa03: "",
        iax04: "",
        iax05: "",
        iax01: "0",
        Operation: "1" //新增是1  编辑是2
      },
      rules: {
        iax04: [{ required: true, message: "请输入类型编码", trigger: "blur" }],
        iax05: [{ required: true, message: "请输入字典类型", trigger: "blur" }]
      },
      itemRules: {
        iax04: [{ required: true, message: "请输入项目编码", trigger: "blur" }],
        iax05: [{ required: true, message: "请输入项目名称", trigger: "blur" }]
      },
      dictionaryItemsData: {
        iax01a: "",
        iaa03: "",
        iax04: "",
        iax05: "",
        iax09: "",
        iaa01: "",
        iax11: "",
        iax01: "0",
        Operation: "1" //新增是1  编辑是2
      },
      ztreeiaa1: {
        iaa01: "",
        iaa03: ""
      },
      ztreeIax01a: {
        iax01a: "",
        iaa03: ""
      },
      tableData: []
    };
  },
  methods: {
    ztreeEdit(node, data) {
      debugger;
      this.dialogclassifidictionary = true;
      this.dictionarydata.iaa01 = this.ztreeiaa1.iaa01;
      this.dictionarydata.iax05 = data.label;
      this.dictionarydata.iax04 = data.iax04;
      this.dictionarydata.iaa03 = data.iaa03;
      this.dictionarydata.iax01 = data.id;
      this.dictionaryTitle = "字典类型编辑";
      this.dictionarydata.Operation = "2";
    },
    ztreeRemove(node, data) {
      debugger;
      if (data.pubFalg === "1") {
        this.$confirm("[" + node.label + "]字典类型不允许删除", "提示", {
          confirmButtonText: "确定",
          type: "warning",
          showCancelButton: false
        });
        return;
      }
      this.$confirm("确定删除字典类型[" + data.label + "]吗？", "提示", {
        confirmButtonText: "确定",
        type: "warning",
        showCancelButton: true
      }).then(() => {
        debugger;
        let removeurl = "extdictype/" + data.id;
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
                this.init();
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
    ztreeOnclick(node, index, data) {
      debugger;
      this.ztreeIax01a.iax01a = node.id;
      this.ztreeIax01a.iaa03 = node.label;
      this.tabelInfo(node);
    },
    open() {
      //字典类型新增
      this.resetFields();
      this.dialogclassifidictionary = true;
      this.dictionarydata.iaa01 = this.ztreeiaa1.iaa01;
      this.dictionarydata.iaa03 = this.ztreeiaa1.iaa03;
      this.dictionaryTitle = "字典类型新增";
      this.dictionarydata.Operation = "1";
    },
    openItem() {
      //字典项目新增
      this.resetFields();
      this.dictionaryItemsData.iax01a = this.ztreeIax01a.iax01a;
      this.dictionaryItemsData.iaa03 = this.ztreeIax01a.iaa03;
      if (this.dictionaryItemsData.iax01a == "") {
        this.$message({
          message: "请选择字典类型",
          type: "warning"
        });
        return;
      }
      this.dictionaryItemsData.Operation = "1";
      this.dictionaryItemsData.iax01 = "0";
      this.dictionaryItems = true;
      this.dictionaryItemsTitle = "字典项目新增";
    },
    tabelEdit(row, data) {
      debugger;
      this.resetFields();
      this.dictionaryItemsData.Operation = "2";
      this.dictionaryItems = true;
      this.dictionaryItemsTitle = "字典项目编辑";
      this.dictionaryItemsData.iax01a = this.ztreeIax01a.iax01a;
      this.dictionaryItemsData.iaa03 = data.iax05a;
      this.dictionaryItemsData.iax04 = data.iax04;
      this.dictionaryItemsData.iax05 = data.iax05;
      this.dictionaryItemsData.iax09 = data.iax09;
      this.dictionaryItemsData.iaa01 = this.ztreeiaa1.iaa01;
      this.dictionaryItemsData.iax11 = data.iax11;
      this.dictionaryItemsData.iax01 = data.iax01;
    },
    tabelRemove(row, data) {
      this.$confirm("确定删除当前字典项目[" + data.iax05 + "]吗？", "提示", {
        confirmButtonText: "确定",
        type: "warning",
        showCancelButton: true
      }).then(() => {
        debugger;
        let removeurl = "extdictype/" + data.iax01;
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
    init() {
      let url = "institutaions";
      let param = {
        scriptId: 2154
      };
      let orderApi = new AnswerSystem();
      orderApi.list(param, url).then(
        ({ data }) => {
          if (data.result === "Success") {
            this.InsuranceArr = data.list;
            this.insurancevalue = data.list[0].iaa01;
            this.ztreeLoad(data.list[0].iaa01, data.list[0].iaa03);
            this.ztreeiaa1.iaa01 = data.list[0].iaa01;
            this.ztreeiaa1.iaa03 = data.list[0].iaa03;
          }
        },
        error => {
          this.$notify.error(error.message);
        }
      );
    },
    resetFields() {
      //清空所有内容
      for (let item in this.dictionarydata) {
        this.dictionarydata[item] = "";
      }
      for (let item in this.dictionaryItemsData) {
        this.dictionaryItemsData[item] = "";
      }
      this.dictionarydata.iax01 = "0";
    },
    getParamsZtree(parms) {
      debugger;
      this.ztreeLoad(parms.iaa01, parms.iaa03);
      this.ztreeiaa1.iaa01 = parms.iaa01;
      this.ztreeiaa1.iaa03 = parms.iaa03;
    },
    ztreeLoad(iaa01, iaa03) {
      let url = "extdic";
      let param = {
        scriptId: 2199,
        instituionId: iaa01,
        instituionName: iaa03,
        IAX01A: 0
      };
      let orderApi = new AnswerSystem();
      orderApi.list(param, url).then(
        ({ data }) => {
          if (data.result === "Success") {
            debugger;
            this.ZtreeData = data.data;
          }
        },
        error => {
          this.$notify.error(error.message);
        }
      );
    },
    save(formName, flag) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          let $json = "";
          let url = "extdic";
          if (flag) {
            this.dictionaryItemsData.iaa01 = this.ztreeiaa1.iaa01;
            $json = this.dictionaryItemsData;
          } else {
            $json = this.dictionarydata;
          }
          let parms = {
            sqlfunction: "new_insu_iax1_update",
            json: $json
          };
          let orderApi = new AnswerSystem();
          orderApi.save(parms, url).then(
            ({ data }) => {
              this.saveLoading = false;
              if (data.result === "Success") {
                this.dialogclassifidictionary = false;
                this.dictionaryItems = false;
                this.$message({
                  message: "保存成功",
                  type: "success"
                });
                this.resetFields();
                if (flag) {
                  this.tabelInfo();
                } else {
                  this.ztreeLoad(this.ztreeiaa1.iaa01, this.ztreeiaa1.iaa03);
                }
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
    tabelInfo(node) {
      let url = "extdic";
      let param = {
        scriptId: node.scriptId,
        instituionId: this.ztreeiaa1.iaa01,
        instituionName: this.ztreeiaa1.iaa03,
        IAX01A: this.ztreeIax01a.iax01a
      };
      let orderApi = new AnswerSystem();
      orderApi.list(param, url).then(
        ({ data }) => {
          if (data.result === "Success") {
            this.tableData = data.list;
          }
        },
        error => {
          this.$notify.error(error.message);
        }
      );
    }
  },
  mounted() {
    this.init();
  }
};
</script>
<style scoped>
.main-container {
  position: absolute;
  left: 0px;
  right: 0px;
  bottom: 0px;
  top: 0px;
  margin: 5px;
}
.el-container {
  height: 100%;
}
.el-main {
  height: 100%;
  padding-left: 5px;
  padding-right: 5px;
  position: relative;
}
.mainpatient .el-aside {
  width: 300px;
  border-right: solid 1px #d8d8d8;
}
.charge-contain-main {
  position: absolute;
  left: 5px;
  right: 0px;
  top: 40px;
  bottom: 42px;
  /* border: solid 1px #d8d8d8; */
}
.charge-contain-bottom {
  position: absolute;
  left: 0px;
  right: 0px;
  bottom: 0px;
  height: 42px;
}
.mainpatient .charge-contain-top {
  width: 100%;
  height: 40px;
  height: 40px;
  text-align: right;
}
.el-header {
  height: 40px !important;
}
.custom-tree-node {
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: space-between;
  font-size: 14px;
  padding-right: 8px;
}

/*

.mainpatient .el-main {
  min-height: calc(100vh);
  position: relative;
  padding: 5px;
}

.mainpatient .charge-contain-main {
  min-height: calc(100vh - 100px);
}
.mainpatient .el-table {
  min-height: calc(100vh - 100px);
} */
/*
.el-row {
  width: 100%;
  height: 100%;
}
.el-row .el-col {
  height: 100%;
}


.el-form-item {
  margin-bottom: 0px;
}
.el-aside .el-button {
  float: left;
}

.charge-contain-top .charge-button {
  float: right;
}


#children .el-dialog__body {
  height: 250px !important;
  padding-left: 0px;
} */
</style>
