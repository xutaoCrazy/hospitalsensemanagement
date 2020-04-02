<template>
  <div class="repotcard">
    <el-container>
      <el-main>
        <div class="reportcard-contain">
          <el-row>
            <el-col :span="10">
              <el-popover
                placement="bottom-start"
                width="470"
                trigger="click"
                @show="focusInput()"
                @hide="hideInput"
                :visible-arrow="false"
                v-model="popoverFlag"
              >
                <div style="height:300px">
                  <el-input
                    placeholder="请输入病案号/住院号/姓名检索"
                    suffix-icon="el-icon-search"
                    v-model="tableparameters.parms.selectValue"
                    ref="inputVal"
                    @keyup.enter.native="searchTable"
                  ></el-input>
                  <tabletemplate-index
                    :tableClumn="tableClumn"
                    :url="tableparameters.url"
                    :parms="tableparameters.parms"
                    classTable="dropTeble"
                    ref="tableclick"
                    @rowSelected="hanldeRowSelected"
                  ></tabletemplate-index>
                </div>
                <el-input
                  placeholder="请输入病案号/住院号/姓名检索"
                  suffix-icon="el-icon-search"
                  slot="reference"
                  v-model="rowData.vaa05"
                ></el-input>
              </el-popover>
            </el-col>
          </el-row>
          <el-row>
            <div class="p-header">
              <span class="v-name">{{rowData.vaa05}}</span>
              <span class="v-margin">
                <b>住院号:</b>
                <span>{{rowData.vaa04}}</span>
              </span>
              <span class="v-tow">{{rowData.abw02}}</span>
              <span class="v-margin">
                <b>入院日期:</b>
                <span>{{rowData.vae11}}</span>
              </span>
              <span class="v-margin">
                <b>床号:</b>
                <span>12</span>
              </span>

              <span class="v-margin">
                <b>主管医生:</b>
                <span>徐涛</span>
              </span>
              <span class="v-tow">在院</span>
              <span class="v-margin">
                <b>当前科室:</b>
                <span>泌尿外科</span>
              </span>
            </div>
          </el-row>
          <el-form ref="form" label-width="90px">
            <el-row>
              <el-col :span="12">
                <el-form-item label="感染时间">
                  <el-date-picker
                    type="date"
                    style="width: 100%;"
                    v-model="parmsJson.zia04"
                    value-format="yyyy-MM-dd"
                  ></el-date-picker>
                </el-form-item>
              </el-col>
            </el-row>
            <el-row>
              <el-col :span="12">
                <el-form-item label="感染诊断">
                  <el-input placeholder v-model="parmsJson.zia42 "></el-input>
                  <!-- <el-select
                    v-model="parmsJson.zia42"
                    multiple
                    filterable
                    remote
                    reserve-keyword
                    placeholder="请输入关键词"
                    :loading="loading"
                    style="width:100%"
                  >
                    <el-option
                      v-for="item in options"
                      :key="item.value"
                      :label="item.label"
                      :value="item.value"
                    ></el-option>
                  </el-select>-->
                </el-form-item>
              </el-col>
            </el-row>
            <el-row>
              <el-form-item label="感染部位">
                <template v-for="item in biyparentArr">
                  <el-col v-if="filterArr(item).length > 0" :key="item.biy01">
                    <label class="r-left r-lable">{{item.biy02}}:</label>
                    <el-checkbox-group class="r-left" v-model="parmsJson.biy01">
                      <el-checkbox
                        v-for="items in filterArr(item)"
                        :label="items.biy01"
                        :key="items.biy01"
                      >{{items.biy02}}</el-checkbox>
                    </el-checkbox-group>
                  </el-col>
                </template>
              </el-form-item>
            </el-row>
            <el-row>
              <el-col :span="24">
                <el-form-item label="易感因素">
                  <el-checkbox-group v-model="parmsJson.bis01" class="r-left">
                    <el-checkbox
                      v-for="item in BIS1Arr"
                      :key="item.bis01"
                      :label="item.bis01"
                    >{{item.bis02}}</el-checkbox>
                  </el-checkbox-group>
                </el-form-item>
              </el-col>
            </el-row>
            <el-row>
              <el-col :span="24">
                <el-form-item label="病原学检查">
                  <el-radio-group
                    class="r-left"
                    v-model="parmsJson.zia11"
                    style="margin-top: 10px;"
                  >
                    <el-radio :label="1">是</el-radio>
                    <el-radio :label="2">否</el-radio>
                  </el-radio-group>
                </el-form-item>
              </el-col>
            </el-row>
            <el-row>
              <el-col :span="12">
                <el-form-item label="标本名称">
                  <el-input placeholder v-model="parmsJson.zia43 "></el-input>
                </el-form-item>
              </el-col>
            </el-row>

            <el-row>
              <el-col :span="24">
                <el-form-item label="送检方法">
                  <el-checkbox-group v-model="parmsJson.rcd02" class="r-left">
                    <el-checkbox
                      v-for="item in rcd02Arr"
                      :key="item.rcd01"
                      :label="item.rcd01"
                    >{{item.rcd03}}</el-checkbox>
                  </el-checkbox-group>
                </el-form-item>
              </el-col>
            </el-row>
            <el-row>
              <el-col :span="12">
                <el-form-item label="备注">
                  <el-input placeholder type="textarea" :rows="2" v-model="parmsJson.zia35"></el-input>
                </el-form-item>
              </el-col>
            </el-row>
            <el-row>
              <el-col :span="12">
                <el-form-item label="报告科室">
                  <el-select
                    v-model="parmsJson.bck01a"
                    placeholder="请选择"
                    @change="bck1Change"
                    style="width:100%"
                    filterable
                  >
                    <el-option
                      filterable
                      v-for="item in bck01Arr"
                      :key="item.bck01"
                      :label="item.bck03"
                      :value="item.bck01"
                    ></el-option>
                  </el-select>
                </el-form-item>
              </el-col>
            </el-row>
            <el-row>
              <el-col :span="12">
                <el-form-item label="报告人">
                  <el-select
                    v-model="bce01as"
                    placeholder="请选择"
                    style="width:100%"
                    filterable
                    @change="bce01Change"
                    value-key="bce01"
                  >
                    <el-option
                      v-for="item in bce01Arr"
                      :key="item.bce01"
                      :label="item.bce03"
                      :value="item"
                    ></el-option>
                  </el-select>
                </el-form-item>
              </el-col>
            </el-row>
          </el-form>
        </div>
      </el-main>
    </el-container>
  </div>
</template>
<script>
import tabletemplateindex from "@/components/tabletemplate/index"; // 表格公共组件
import { getlSelect, ajaxPost } from "@/service/api/commonAJax";
import { moment } from "@/service/api/dateFormat";

export default {
  name: "",
  props: {
    innerVisible: Boolean
  },
  watch: {
    innerVisible(val) {
      debugger;
      if (val) {
        this.parmsJson = this.$options.data().parmsJson;
        this.rowData = this.$options.data().rowData;
      }
    }
  },
  data() {
    return {
      checkList: [],
      options: [],
      biyparentArr: [], //感染部位父级
      biy1Arr: [], //感染部位子级
      BIS1Arr: "", //易感因素
      rcd02Arr: [], //送检方法
      rowData: {},
      popoverFlag: true, //下拉框显示隐藏
      bck01Arr: [], //科室
      bce01Arr: [], //人
      bce01as: [], //报告人
      tableparameters: {
        url: "CaseMonitorRest/selectVAA1",
        parms: {
          bljc: "1",
          selectValue: ""
        }
      },
      tableClumn: [
        {
          id: "vaa04",
          label: "病历号",
          width: 120
        },
        {
          id: "vaa05",
          label: "姓名"
        },
        {
          id: "abw01",
          label: "性别"
        },

        {
          id: "vaa10",
          label: "年龄"
        },
        {
          id: "vaa12",
          label: "出生日期",
          width: 200,
          fn: this.formatDate
        },
        {
          id: "vaa73",
          label: "入院日期",
          width: 120,
          fn: this.formatDate
        },
        {
          id: "vaa74",
          label: "入院日期",
          width: 120,
          fn: this.formatDate
        }
      ],
      parmsJson: {
        zia42: "", // 感染诊断
        zia11: "", // 病原学检查
        biy01: [], // 感染部位
        bis01: [], // 侵袭操作
        rcd02: [], // 送检方法
        zia43: "", // 标本名称
        zia44: "", // 病原体
        bck01a: "", //报告科室
        vaa01: "",
        zia04: "", //感染事件
        bce01a: "", //报告人
        zia35: "", //备注
        bce03a: ""
      }
    };
  },
  methods: {
    hanldeRowSelected(row) {
      //监听子组件
      console.log(row);
      this.rowData = row;
      this.parmsJson.vaa01 = row.vaa01;
      this.parmsJson.zia03 = row.vaa04;
      this.popoverFlag = false;
    },
    selectBiy1andBis1() {
      debugger;
      let url = "CaseMonitorRest/selectBiy1andBis1";
      getlSelect("", url).then(data => {
        debugger;
        console.log(data);
        if (data.code == "200") {
          this.rcd02Arr = data.map.RCD1; // 送检方法
          this.biy1Arr = data.map.BIY1; // 子级
          this.biyparentArr = data.map.BIY1.filter(arr => !arr.pid); //父级
          this.BIS1Arr = data.map.BIS1.filter(arr => !arr.pid); //易感因素
        }
      });
    },
    selectBCK1K() {
      //加载科室
      let url = "YGUtilRest/selectBCK1K";
      ajaxPost({}, url).then(data => {
        debugger;
        console.log(data);
        if (data.code == "200") {
          this.bck01Arr = data.list;
        }
      });
    },
    selectBce11ForBck1(bck01) {
      //加载医务人员
      let url = "YGUtilRest/selectBce11ForBck1";
      ajaxPost(
        { page: 1, rows: 1000, selectValue: { bck01: bck01 } },
        url
      ).then(data => {
        debugger;
        console.log(data);
        if (data.code == "200") {
          this.bce01Arr = data.list;
        }
      });
    },
    bck1Change(bck01) {
      debugger;
      //通过当前科室加载当前科室人员
      this.selectBce11ForBck1(bck01);
    },
    filterArr(arr) {
      return this.biy1Arr.filter(itm => Number(itm.pid) === Number(arr.biy01));
    },
    focusInput() {
      //显示下拉框执行
      this.tableparameters.parms.selectValue = "";
      this.$nextTick(() => {
        this.$refs.inputVal.focus();
        this.$refs.tableclick.getableList();
      });
    },
    hideInput() {
      //隐藏下拉框执行
      this.tableparameters.parms.selectValue = "";
    },
    searchTable() {
      //回车搜索病人
      this.$refs.tableclick.getableList();
    },
    formatDate(row, column, cellValue) {
      debugger;
      if (cellValue) {
        return moment(cellValue);
      }
    },
    bce01Change(row) {
      debugger;
      this.parmsJson.bce03a = row.bce03;
      this.parmsJson.bce01a = row.bce01;
      //报告人选中
    }
  },
  mounted() {
    debugger;
    this.selectBiy1andBis1();
    this.selectBCK1K();
  },
  components: {
    "tabletemplate-index": tabletemplateindex
  }
};
</script>

<style  scoped>
.repotcard {
  width: 100%;
  /* max-height: 600px !important; */
  height: 600px !important;
  /* height: 100vh !important; */
  overflow: auto;
}
.el-container {
  height: 100%;
}
.el-main {
  padding: 7px 0px;
}
.reportcard-contain {
  max-width: 800px;
  height: calc(100% - 62px);
  /* border: solid 1px #d8d8d8; */
  margin: 0 auto;
  padding-left: 5px;
  overflow: auto;
  height: 100%;
}
.p-header {
  /* height: 40px; */
  text-align: left;
  line-height: 30px;
  background: #c7d4f6;
  opacity: 0.5;
  color: #617098;
}
.el-row {
  margin-bottom: 5px;
}
.el-form-item {
  margin-bottom: 0px !important;
}
.r-left {
  margin-left: 5px;
  float: left;
}
.r-lable {
  width: 107px;
  text-align: start;
}
</style>