<template>
  <div class="pmangement-content">
    <div class="pmanagement essentialinformation">
      <el-form label-width="100px">
        <el-row style="height:100%">
          <el-col :span="24">
            <el-col :span="6">
              <el-form-item label="住院号">
                <el-input size="small"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="6">
              <el-form-item label="患者姓名">
                <el-input size="small"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="6">
              <el-form-item label="患者性别">
                <el-input size="small"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="6">
              <el-form-item label="患者年龄">
                <el-input size="small"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="6">
              <el-form-item label="身份证号">
                <el-input size="small"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="6">
              <el-form-item label="联系方式">
                <el-input size="small"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="6">
              <el-form-item label="现住址">
                <el-input size="small"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="6">
              <el-form-item label="入院科室">
                <el-select placeholder="请选择" size="small"></el-select>
              </el-form-item>
            </el-col>
            <el-col :span="6">
              <el-form-item label="入院次数">
                <el-input size="small"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="6">
              <el-form-item label="入院日期">
                <el-input size="small"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="6">
              <el-form-item label="住院目的">
                <el-input size="small"></el-input>
              </el-form-item>
            </el-col>
          </el-col>
        </el-row>
      </el-form>
    </div>
    <div class="pmanagement insuranceinformation">
      <el-form label-width="100px">
        <el-row style="height:100%">
          <el-col :span="24">
            <el-col :span="6">
              <el-form-item label="医保类型">
                <el-input size="small"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="6">
              <el-form-item label="患者姓名">
                <el-input size="small"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="6">
              <el-form-item label="医保编号">
                <el-input size="small"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="6">
              <el-form-item label="身份证号">
                <el-input size="small"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="6">
              <el-form-item label="患者性别">
                <el-input size="small"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="6">
              <el-form-item label="患者年龄">
                <el-input size="small"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="6">
              <el-form-item label="医疗人员类别">
                <el-input size="small"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="6">
              <el-form-item label="公务员类别">
                <el-select placeholder="请选择" size="small" style="width:100%"></el-select>
              </el-form-item>
            </el-col>
            <el-col :span="6">
              <el-form-item label="个人账户种类">
                <el-input size="small"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="6">
              <el-form-item label="个人账户余额">
                <el-input size="small"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="6">
              <el-form-item label="单位编码">
                <el-input size="small"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="6">
              <el-form-item label="单位名称">
                <el-input size="small"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="6">
              <el-form-item label="特慢病种编码">
                <el-input size="small"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="6">
              <el-form-item label="特慢病种名称">
                <el-input size="small"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="6">
              <el-form-item label="其他说明">
                <el-input size="small"></el-input>
              </el-form-item>
            </el-col>
          </el-col>
        </el-row>
      </el-form>
    </div>
    <div class="pmanagement settlementinformation">
      <el-form label-width="100px">
        <el-row style="height:100%">
          <el-col :span="24">
            <el-col :span="6">
              <el-form-item label="就诊编码">
                <el-input size="small"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="6">
              <el-form-item label="个人编号">
                <el-input size="small"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="6">
              <el-form-item label="支付类别">
                <el-input size="small"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="6">
              <el-form-item label="报销类型">
                <el-input size="small"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="6">
              <el-form-item label="费用分段标准">
                <el-input size="small"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="6">
              <el-form-item label="起付线">
                <el-input size="small"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="6">
              <el-form-item label="进入起付线">
                <el-input size="small"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="6">
              <el-form-item label="报销比例">
                <el-select placeholder="请选择" size="small" style="width:100%"></el-select>
              </el-form-item>
            </el-col>
            <el-col :span="6">
              <el-form-item label="费用总额">
                <el-input size="small"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="6">
              <el-form-item label="明细条数">
                <el-input size="small"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="6">
              <el-form-item label="符合范围">
                <el-input size="small"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="6">
              <el-form-item label="挂钩自负">
                <el-input size="small"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="6">
              <el-form-item label="全自费">
                <el-input size="small"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="6">
              <el-form-item label="账户余额">
                <el-input size="small"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="6">
              <el-form-item label="基金支付">
                <el-input size="small"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="6">
              <el-form-item label="个账支付">
                <el-input size="small"></el-input>
              </el-form-item>
            </el-col>
          </el-col>
        </el-row>
      </el-form>
    </div>
  </div>
</template>

<script>
export default {
  name: "",
  data() {
    return {};
  }
};
</script>

<style  scoped>
.pmanagement {
  width: 100%;
  min-height: 50px;
  border: solid 1px #e4e4e4;
  position: relative;
  margin-top: 5px;
  padding-top: 15px;
  padding-top: 15px;
  padding-left: 10px;
  padding-right: 15px;
  margin-bottom: 20px;
}
.essentialinformation::after {
  content: "\57fa\672c\4fe1\606f";
  display: inline-block;
  background: #f9f9f9;
  padding: 0 10px;
  position: absolute;
  top: -10px;
  left: 15px;
  color: #000;
}
.insuranceinformation::after {
  content: "\533b\4fdd\4fe1\606f";
  display: inline-block;
  background: #f9f9f9;
  padding: 0 10px;
  position: absolute;
  top: -10px;
  left: 15px;
  color: #000;
}
.settlementinformation::after {
  content: "\9884\7ed3\7b97\4fe1\606f";
  display: inline-block;
  background: #f9f9f9;
  padding: 0 10px;
  position: absolute;
  top: -10px;
  left: 15px;
  color: #000;
}
.pmangement-content {
  overflow: auto;
}
.pmangement-content {
  height: calc(100% - 0px);
}
</style>