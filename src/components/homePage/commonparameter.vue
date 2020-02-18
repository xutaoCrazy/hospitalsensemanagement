<template>
  <div class="commonparame">
    <div class="commonparame-contain">
      <el-form ref="form" label-width="200px" label-position="left" :model="settingParms">
        <el-form-item label="默认门特患者住院科室">
          <el-select
            placeholder="选择科室"
            style="width:180px"
            v-model="settingParms[0].pvalue"
            @change="departChange"
            value-key="bck01"
          >
            <el-option
              v-for="item in department"
              :key="item.bck01"
              :label="item.bck03"
              :value="item"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="默认门特患者住院病区">
          <el-select
            placeholder="选择病区"
            style="width:180px"
            v-model="settingParms[1].pvalue"
            value-key="bck01"
          >
            <el-option
              v-for="item in inpatientAreaArr"
              :key="item.bck01"
              :label="item.bck03"
              :value="item"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="具有门特方案审核权限的职称">
          <el-checkbox-group v-model="settingParms[2].pvalue" @change="getSlotsChange">
            <el-checkbox
              v-for="title in academicArr"
              :label="title.aah01"
              :key="title.aah01"
              :disabled="title.aah01==0?multiCheckbx:multiCheckqt"
            >{{title.aah02}}</el-checkbox>
          </el-checkbox-group>
        </el-form-item>
      </el-form>
    </div>
    <div slot="footer" class="dialog-footer">
      <el-button type="primary" size="small" @click="savedParameters">保存</el-button>
    </div>
  </div>
</template>

<script>
import {
  commonIDAjax,
  externalCallAjax,
  commonAjaxRequest
} from "@/service/api/InstitutionInterface";
import { mapState, mapMutations } from "vuex";
import qs from "qs";
export default {
  name: "",
  data() {
    return {
      department: [], //科室
      inpatientAreaArr: [], //病区
      departVal: "",
      inpatientAreaVal: "",
      academic: [],
      academicArr: [],
      multiCheckbx: false,
      multiCheckqt: false,
      settingParms: [
        {
          productid: 100,
          programid: 103017,
          paramno: 46,
          pvalue: "",
          privilege: 0,
          common: "103017_100_46"
        },
        {
          productid: 100,
          programid: 103017,
          paramno: 47,
          pvalue: "",
          privilege: 0,
          common: "103017_100_47"
        },
        {
          productid: 100,
          programid: 103017,
          paramno: 48,
          pvalue: [],
          privilege: 0,
          common: "103017_100_48"
        }
      ]
    };
  },
  computed: {
    ...mapState(["centerurl"])
  },
  methods: {
    selectDepartment() {
      var str = "";
      var keyword = "%";
      str += "BCK01B:" + 0 + ",";
      str += "sql:'" + keyword + "'";
      commonIDAjax(
        { ID: 622, paramStr: "{" + str + "}", rows: 9999, page: 1 },
        "commonQueryCache"
      ) //加载科室
        .then(res => {
          if (res.rows.length > 0) {
            this.department = res.rows;
          }
        })
        .catch(res => {
          this.$confirm(res, "提示", {
            confirmButtonText: "确定",
            type: "error",
            showCancelButton: false
          });
        });
    },
    departChange(val) {
      var str = "";
      var keyword = "%";
      str += "BCK01B:" + val.bck01 + ",";
      str += "sql:'" + keyword + "'";
      commonIDAjax(
        { ID: 2026, paramStr: "{" + str + "}", rows: 9999, page: 1 },
        "commonQueryCache"
      ) //加载科室
        .then(res => {
          if (res.rows.length > 0) {
            this.inpatientAreaArr = res.rows;
          }
        })
        .catch(res => {
          this.$confirm(res, "提示", {
            confirmButtonText: "确定",
            type: "error",
            showCancelButton: false
          });
        });
    },
    academicTitle() {
      //加载职务
      debugger;
      let url = "SysSchedule/getSlotsList";
      commonAjaxRequest({}, url)
        .then(res => {
          if (res.length > 0) {
            debugger;

            this.academicArr = res;
          }
        })
        .catch(res => {
          this.$confirm(res, "提示", {
            confirmButtonText: "确定",
            type: "error",
            showCancelButton: false
          });
        });
    },
    savedParameters() {
      //保存参数
      commonIDAjax(
        { grid2rows: JSON.stringify(this.settingParms) },
        "SavedParameters",
        "POST"
      ) //加载科室
        .then(res => {
          debugger;
          if (res.code == "200" || res.result.toLowerCase() == "success") {
            this.$message({
              message: "保存成功",
              type: "success"
            });
          }
        })
        .catch(res => {
          this.$confirm(res, "提示", {
            confirmButtonText: "确定",
            type: "error",
            showCancelButton: false
          });
        });
    },
    batchGetSysParam() {
      debugger;
      let values = [],
        views = [];
      views.push(
        "programid||'_'||productid||'_'||paramno as key,Value,DefValue"
      );
      values.push({ productid: 100, programid: 103017 });
      let url = "his/common/query/batchGetSysParam";
      commonAjaxRequest(
        {
          values: JSON.stringify(values),
          views: JSON.stringify(views)
        },
        url
      ) //查询参数
        .then(res => {
          debugger;
          if (res.list.length > 0) {
            for (let i = 0; i < res.list.length; i++) {
              for (let j = 0; j < this.settingParms.length; j++) {
                if (res.list[i].key == this.settingParms[j].common) {
                  if (res.list[i].key == "103017_100_48") {
                    let strValue = res.list[i].value;
                    let regex = /"([^"]*)"/g;
                    let currentResult;
                    let results = [];
                    while ((currentResult = regex.exec(strValue)) !== null) {
                      results.push(currentResult[1]);
                    }
                    this.settingParms[j].pvalue = results;
                  } else {
                    this.settingParms[j].pvalue = JSON.parse(res.list[i].value);
                  }
                }
              }
            }
            this.departChange(this.settingParms[0].pvalue);

            if (this.settingParms[2].pvalue.length == 0) {
              return false;
            }
            if (this.settingParms[2].pvalue.indexOf("0") >= 0) {
              this.multiCheckqt = true;
            } else {
              this.multiCheckbx = true;
            }
          }
        })
        .catch(res => {
          this.$confirm(res, "提示", {
            confirmButtonText: "确定",
            type: "error",
            showCancelButton: false
          });
        });
    },
    init() {
      this.selectDepartment();
      this.academicTitle();
      this.batchGetSysParam();
    },
    getSlotsChange(val) {
      if (val.indexOf("0") >= 0) {
        //判断是否有不限
        this.multiCheckqt = true;
      } else if (val.length == 0) {
        //一个都不选的话 清空
        this.multiCheckqt = false;
        this.multiCheckbx = false;
      } else if (val.indexOf("0") < 0) {
        //选的其他职务让不限置灰
        this.multiCheckbx = true;
      }
      debugger;
    }
  },
  mounted() {
    this.init();
  }
};
</script>

<style scoped>
.commonparame {
  height: 100%;
  padding: 30px 13px 8px 20px;
  width: 700px;
}
.commonparame-contain {
  height: calc(100% - 40px);
}
.dialog-footer {
  height: 40px;
  text-align: right;
  border-top: 1px solid #e4e4e4;
  line-height: 40px;
}
</style>