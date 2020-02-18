<!--保险收费项目-->
<template>
  <div class="information-contain">
    <div class="contain-heard" :style="{ height: LabelTopheight }">
      <el-form :inline="true" class="demo-form-inline" style="text-align:left;margin-left:10px">
        <el-form-item label="保险机构">
          <el-select placeholder="请选择" size="small"></el-select>
        </el-form-item>
        <el-form-item>
          <el-input placeholder="请输入关键字" size="small"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" size="small">查询</el-button>
        </el-form-item>
        <el-form-item style="float:right">
          <el-button type="primary" size="small" @click="patientItemsOpen = true">新增</el-button>
          <el-button type="primary" size="small">下载</el-button>
        </el-form-item>
      </el-form>
      <div class="item_contain_main">
        <el-table height="100%" index="1">
          <el-table-column label="编码" width="100"></el-table-column>
          <el-table-column label="名称" width="100"></el-table-column>
          <el-table-column label="商品名" width="100"></el-table-column>
          <el-table-column label="英文名" width="100"></el-table-column>
          <el-table-column label="偿付费别" width="100"></el-table-column>
          <el-table-column label="保险费别编码" width="120"></el-table-column>
          <el-table-column label="保险费别" width="100"></el-table-column>
          <el-table-column label="赔付类型编码" width="120"></el-table-column>
          <el-table-column label="赔付类型" width="100"></el-table-column>
          <el-table-column label="拼音码" width="100"></el-table-column>
          <el-table-column label="五笔码" width="100"></el-table-column>
          <el-table-column label="规格" width="100"></el-table-column>
          <el-table-column label="包装规格" width="100"></el-table-column>
          <el-table-column label="剂型" width="100"></el-table-column>
          <el-table-column label="剂型名称" width="100"></el-table-column>
          <el-table-column label="单位" width="100"></el-table-column>
          <el-table-column label="参考价" width="100"></el-table-column>
          <el-table-column label="限价" width="100"></el-table-column>
          <el-table-column label="限额" width="100"></el-table-column>
          <el-table-column label="每日限额" width="100"></el-table-column>
          <el-table-column label="限量" width="100"></el-table-column>
          <el-table-column label="草药限制" width="100"></el-table-column>
          <el-table-column label="复方限制" width="100"></el-table-column>
          <el-table-column label="其他限制" width="100"></el-table-column>
          <el-table-column label="自负比例" width="100"></el-table-column>
          <el-table-column label="审批标志" width="100"></el-table-column>
          <el-table-column label="医院级别" width="100"></el-table-column>
          <el-table-column label="处方药" width="100"></el-table-column>
          <el-table-column label="GMP标志" width="100"></el-table-column>
          <el-table-column label="零差率标志" width="120"></el-table-column>
          <el-table-column label="状态" width="100"></el-table-column>
          <el-table-column label="产地" width="100"></el-table-column>
          <el-table-column label="标准编码" width="100"></el-table-column>
          <el-table-column label="自费编码" width="100"></el-table-column>
          <el-table-column label="备用编码" width="100"></el-table-column>
          <el-table-column label="批准文号" width="100"></el-table-column>
          <el-table-column label="管理级别" width="100"></el-table-column>
          <el-table-column label="产地类型" width="100"></el-table-column>
          <el-table-column label="业务性质代码" width="120"></el-table-column>
          <el-table-column label="业务性质" width="100"></el-table-column>
          <el-table-column label="项目内涵" width="100"></el-table-column>
          <el-table-column label="除外内容" width="100"></el-table-column>
          <el-table-column label="说明" width="100"></el-table-column>
          <el-table-column label="备注" width="100"></el-table-column>
          <el-table-column label="更新日期" width="100"></el-table-column>
          <el-table-column label="开始日期" width="100"></el-table-column>
          <el-table-column label="截止日期" width="100"></el-table-column>
          <el-table-column label="儿童用药限制" width="120"></el-table-column>
          <el-table-column label="居民用药限制" width="120"></el-table-column>
          <el-table-column label="用药(诊疗)限制信息" width="150"></el-table-column>
        </el-table>
      </div>
      <div class="charge-contain-bottom"></div>
    </div>
    <!--底部信息-->
    <div class="contain-bottom el-content-show" :style="{ height: LabelBottomheight }">
      <el-tabs v-model="activeName" style="width:100%">
        <el-tab-pane label="项目与人员类别报销比例信息" name="first" style="float:left">
          <div class="charge-contain-main" style="bottom:52px" v-show="containShow">
            <el-table height="100%" index="1">
              <el-table-column label="住院号" width="100"></el-table-column>
              <el-table-column label="状态" width="100"></el-table-column>
              <el-table-column width="100" label="姓名"></el-table-column>
              <el-table-column width="100" label="性别"></el-table-column>
              <el-table-column width="100" label="保险号"></el-table-column>
              <el-table-column width="120" label="社保登记号"></el-table-column>
              <el-table-column width="120" label="病人类别"></el-table-column>
              <el-table-column width="120" label="住院科室"></el-table-column>
              <el-table-column width="120" label="住院病区"></el-table-column>
              <el-table-column width="120" label="床位号"></el-table-column>
              <el-table-column width="120" label="保险机构"></el-table-column>
              <el-table-column width="120" label="医疗类别"></el-table-column>
              <el-table-column width="120" label="分中心"></el-table-column>
              <el-table-column width="120" label="入院日期"></el-table-column>
              <el-table-column width="120" label="登记ID"></el-table-column>
            </el-table>
          </div>
        </el-tab-pane>
        <div class="floatLeft">
          <el-tag slot="label" @click="shrinkPatient">
            {{ labelTag }}
            <span :class="showHideClass"></span>
          </el-tag>
        </div>
      </el-tabs>
    </div>
    <el-dialog title="新增" width="50%" :visible.sync="patientItemsOpen">
      <el-tabs v-model="activeNameIndex" class="el-dialog-height-edit">
        <el-tab-pane label="基本信息" name="first">
          <ess-components-formation></ess-components-formation>
        </el-tab-pane>
        <el-tab-pane label="偿付费别(报销比例类别)设置" name="second">
          <pay-mentdifference></pay-mentdifference>
        </el-tab-pane>
        <el-tab-pane label="限制信息" name="third">
          <limited-information></limited-information>
        </el-tab-pane>
        <el-tab-pane label="其他内容" name="fourth">
          <other-codes></other-codes>
        </el-tab-pane>
        <el-tab-pane label="项目内涵" name="five">项目内涵</el-tab-pane>
        <el-tab-pane label="除外内容" name="six">除外内容</el-tab-pane>
      </el-tabs>
      <div slot="footer" class="dialog-footer">
        <el-button @click="patientItemsOpen = false" size="small">取 消</el-button>
        <el-button type="primary" @click="submitForm('ruleForm')" size="small">保 存</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import essentialinformation from "@/components/payservice/essentialinformation";
import paymentdifference from "@/components/payservice/paymentdifference";
import limitedinformation from "@/components/payservice/limitedinformation";
import othercodes from "@/components/payservice/othercodes";
export default {
  name: "search",
  data() {
    return {
      activeName: "first",
      activeNameIndex: "second",
      showHideClass: "el-icon-caret-top",
      labelPosition: "left",
      LabelTopheight: "60%",
      LabelBottomheight: "40%",
      containShow: true, // 收缩展开
      patientItemsOpen: false,
      fromcheck: {
        type: []
      },
      ruleForm: {
        name: ""
      },
      labelTag: "收缩"
    };
  },
  methods: {
    submitForm(formName) {
      //  保险机构 保存
      this.$refs[formName].validate(valid => {
        if (valid) {
          alert("submit!");
        } else {
          return false;
        }
      });
    },
    insuranceinStitution() {
      this.$refs["ruleForm"].resetFields();
    },
    informationPatientOpen() {
      this.$refs["ruleForm"].resetFields();
    },
    shrinkPatient() {
      // 收缩展开
      debugger;
      this.containShow = !this.containShow;
      if (!this.containShow) {
        this.labelTag = "展开";
        this.LabelTopheight = "94%";
        this.LabelBottomheight = "6%";
        this.showHideClass = "el-icon-caret-bottom";
      } else {
        this.labelTag = "收缩";
        this.LabelTopheight = "60%";
        this.LabelBottomheight = "40%";
        this.showHideClass = "el-icon-caret-top";
      }
    }
  },
  mounted() {},
  components: {
    "ess-components-formation": essentialinformation,
    "pay-mentdifference": paymentdifference,
    "limited-information": limitedinformation,
    "other-codes": othercodes
  }
};
</script>
<style scoped>
.information-contain {
  width: 100%;
  height: 100%;
}
.contain-heard {
  width: 100%;

  position: relative;
}
.contain-bottom {
  width: 100%;
  height: 40%;
  position: relative;
}
.charge-contain-bottom {
  position: absolute;
  left: 0px;
  right: 0px;
  bottom: 0px;
  height: 40px;
}
.charge-contain-main {
  position: absolute;
  left: 5px;
  right: 5px;
  top: 0px;
  bottom: 40px;
  border: solid 1px #d8d8d8;
}
.el-tabs {
  width: 100%;
  height: 100%;
}

.el-tabs__nav {
  width: 100% !important;
}
.el-dialog__header {
  text-align: left;
}
.el-form-item {
  margin-bottom: 0px;
}
.el-dialog__footer {
  border-top: solid 1px #d8d8d8;
}
.el-dialog__body {
  padding: 30px 25px;
}
.floatLeft {
  position: absolute;
  right: 0px;
  top: -48px;
}
.containFloatLeft {
  position: absolute;
  right: 0px;
  top: -48px;
}
.item_contain_main {
  position: absolute;
  left: 0px;
  right: 0px;
  top: 40px;
  bottom: 40px;
  border: solid 1px #d8d8d8;
}
.info-title-container {
  position: relative;
  height: 24px;
}
.info-title {
  width: 100px;
  color: #000;
  font-size: 15px;
}
.info-line {
  position: absolute;
  left: 100px;
  right: 0px;
  top: 0px;
  bottom: 0px;
  padding: 13px 0px;
}
</style>
