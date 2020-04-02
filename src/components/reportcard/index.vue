<template>
  <div class="repotcard">
    <el-container>
      <el-main>
        <div class="title">医院感染病例报告卡</div>
        <div class="reportcard-contain">
          <el-row>
            <el-col :span="12" class="el-col-border el-col-border-right">
              <el-col :span="12" class="el-col-border">
                <div class="r-col">
                  <div class="r-col-label r-col-row">
                    <label>病人姓名:</label>
                  </div>
                  <div class="r-col_input r-col-row">
                    <el-input></el-input>
                  </div>
                </div>
              </el-col>
              <el-col :span="12" class="el-col-border">
                <div class="r-col">
                  <div class="r-col-label r-col-row">
                    <label>病历号:</label>
                  </div>
                  <div class="r-col_input r-col-row">
                    <el-input></el-input>
                  </div>
                </div>
              </el-col>
              <el-col :span="12" class="el-col-border">
                <div class="r-col">
                  <div class="r-col-label r-col-row">
                    <label class="letterspacing">性别:</label>
                  </div>
                  <div class="r-col_input r-col-row">
                    <el-input></el-input>
                  </div>
                </div>
              </el-col>
              <el-col :span="12" class="el-col-border">
                <div class="r-col">
                  <div class="r-col-label r-col-row">
                    <label class="letterspacing">年龄:</label>
                  </div>
                  <div class="r-col_input r-col-row">
                    <el-input></el-input>
                  </div>
                </div>
              </el-col>
              <el-col :span="24" class="el-col-border">
                <div class="r-col">
                  <div class="r-col-label r-col-row">
                    <label>入院日期:</label>
                  </div>
                  <div class="r-col_input r-col-row">
                    <el-input></el-input>
                  </div>
                </div>
              </el-col>
              <el-col :span="24" class="el-col-border">
                <div class="r-col">
                  <div class="r-col-label r-col-row">
                    <label>感染日期:</label>
                  </div>
                  <div class="r-col_input r-col-row">
                    <el-input></el-input>
                  </div>
                </div>
              </el-col>
              <el-col :span="24" class>
                <div class="r-col">
                  <div class="r-col-label r-col-row">
                    <label>感染诊断:</label>
                  </div>
                  <div class="r-col_input r-col-row">
                    <el-input type="textarea" :rows="3"></el-input>
                  </div>
                </div>
              </el-col>
            </el-col>
            <el-col :span="12">
              <el-col :span="24" class="el-col-border el-col-padding">
                <div class="r-col">
                  <div class="r-col-label r-col-row">
                    <label>感染诊断:</label>
                  </div>
                  <div class="r-col_input r-col-row">
                    <el-input type="textarea" :rows="8"></el-input>
                  </div>
                </div>
              </el-col>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="12" class="el-col-border-right">
              <el-col :span="24">
                <div class="r-col">
                  <div class="r-col-label r-col-row">
                    <label>感染部位:</label>
                  </div>
                </div>
              </el-col>
              <el-col :span="24" class>
                <div class="r-col">
                  <div class="r-col-checkbox r-col-row">
                    <label>1.呼吸系统:</label>
                  </div>
                  <div class="r-col_input r-col-row r-col-inherit">
                    <el-checkbox-group v-model="checkList1">
                      <el-checkbox label="上呼吸道"></el-checkbox>
                      <el-checkbox label="下呼吸道胸膜腔"></el-checkbox>
                    </el-checkbox-group>
                  </div>
                </div>
              </el-col>
              <el-col :span="24">
                <div class="r-col">
                  <div class="r-col-checkbox r-col-row">
                    <label>2.腹部和消化系统:</label>
                  </div>
                  <div class="r-col_input r-col-row r-col-inherit">
                    <el-checkbox-group v-model="checkList2">
                      <el-checkbox>胃肠道</el-checkbox>
                      <el-checkbox>盆腔、内组织</el-checkbox>
                      <el-checkbox>腹水</el-checkbox>
                    </el-checkbox-group>
                  </div>
                </div>
              </el-col>
              <el-col :span="24">
                <div class="r-col">
                  <div class="r-col-checkbox r-col-row">
                    <label>3.血液系统:</label>
                  </div>
                  <div class="r-col_input r-col-row r-col-inherit">
                    <el-checkbox-group v-model="checkList3">
                      <el-checkbox>败血症</el-checkbox>
                      <el-checkbox>菌血症</el-checkbox>
                    </el-checkbox-group>
                  </div>
                </div>
              </el-col>
              <el-col :span="24">
                <div class="r-col">
                  <div class="r-col-checkbox r-col-row">
                    <label>4.手术部位:</label>
                  </div>
                  <div class="r-col_input r-col-row r-col-inherit">
                    <el-checkbox-group v-model="checkList4">
                      <el-checkbox>表浅切</el-checkbox>
                      <el-checkbox>深部切</el-checkbox>
                      <el-checkbox>器官或腔隙</el-checkbox>
                    </el-checkbox-group>
                  </div>
                </div>
              </el-col>
              <el-col :span="24">
                <div class="r-col">
                  <div class="r-col-checkbox r-col-row">
                    <label>5.皮肤软组织:</label>
                  </div>
                  <div class="r-col_input r-col-row r-col-inherit">
                    <el-checkbox-group v-model="checkList5">
                      <el-checkbox>皮肤</el-checkbox>
                      <el-checkbox>软组织</el-checkbox>
                      <el-checkbox>褥疮</el-checkbox>
                      <el-checkbox>烧伤部位</el-checkbox>
                    </el-checkbox-group>
                  </div>
                </div>
              </el-col>
              <el-col :span="24">
                <div class="r-col">
                  <div class="r-col-checkbox r-col-row">
                    <label>6.泌尿系统:</label>
                  </div>
                  <div class="r-col_input r-col-row r-col-inherit">
                    <el-checkbox-group v-model="checkList6">
                      <el-checkbox>泌尿道</el-checkbox>
                    </el-checkbox-group>
                  </div>
                </div>
              </el-col>
              <el-col :span="24">
                <div class="r-col">
                  <div class="r-col-checkbox r-col-row">
                    <label>7.中枢神经系统:</label>
                  </div>
                  <div class="r-col_input r-col-row r-col-inherit">
                    <el-checkbox-group v-model="checkList7">
                      <el-checkbox>脑(室)膜炎</el-checkbox>
                      <el-checkbox>颅内脓肿</el-checkbox>
                      <el-checkbox>椎管内感染</el-checkbox>
                    </el-checkbox-group>
                  </div>
                </div>
              </el-col>
              <el-col :span="24" class="el-col-border">
                <div class="r-col">
                  <div class="r-col-label r-col-row" style="width:80px">
                    <label>8.其他部位:</label>
                  </div>
                  <div class="r-col_input r-col-row" style="width: calc(100% - 80px);">
                    <el-input></el-input>
                  </div>
                </div>
              </el-col>
            </el-col>
            <el-col :span="12">
              <el-col :span="14" class="el-col-border el-col-border-right el-col-height">
                <div class="r-col">
                  <div class="r-col_input r-col-row r-col-inherit">
                    <el-checkbox-group v-model="checkList7">
                      <el-checkbox>糖尿病</el-checkbox>
                      <el-checkbox>抗生素</el-checkbox>
                    </el-checkbox-group>
                  </div>
                </div>
              </el-col>
              <el-col :span="10" class="el-col-border el-col-border-right el-col-height">
                <div class="r-col">
                  <div class="r-col_input r-col-row r-col-inherit">
                    <el-checkbox-group v-model="checkList7">
                      <el-checkbox>泌尿道插管</el-checkbox>
                    </el-checkbox-group>
                  </div>
                </div>
              </el-col>
              <el-col :span="14" class="el-col-border el-col-border-right el-col-height">
                <div class="r-col">
                  <div class="r-col_input r-col-row r-col-inherit">
                    <el-checkbox-group v-model="checkList7">
                      <el-checkbox>肝硬化</el-checkbox>
                      <el-checkbox>药瘾者</el-checkbox>
                    </el-checkbox-group>
                  </div>
                </div>
              </el-col>
              <el-col :span="10" class="el-col-border el-col-border-right el-col-height">
                <div class="r-col">
                  <div class="r-col_input r-col-row r-col-inherit">
                    <el-checkbox-group v-model="checkList7">
                      <el-checkbox>动静脉插管</el-checkbox>
                    </el-checkbox-group>
                  </div>
                </div>
              </el-col>
              <el-col :span="14" class="el-col-border el-col-border-right el-col-height">
                <div class="r-col">
                  <div class="r-col_input r-col-row r-col-inherit">
                    <el-checkbox-group v-model="checkList7">
                      <el-checkbox>放疗</el-checkbox>
                      <el-checkbox>化疗</el-checkbox>
                    </el-checkbox-group>
                  </div>
                </div>
              </el-col>
              <el-col :span="10" class="el-col-border el-col-border-right el-col-height">
                <div class="r-col">
                  <div class="r-col_input r-col-row r-col-inherit">
                    <el-checkbox-group v-model="checkList7">
                      <el-checkbox>使用呼吸机</el-checkbox>
                    </el-checkbox-group>
                  </div>
                </div>
              </el-col>
              <el-col
                :span="14"
                class="el-col-border el-col-border-right el-col-height el-col-height"
              >
                <div class="r-col">
                  <div class="r-col_input r-col-row r-col-inherit">
                    <el-checkbox-group v-model="checkList7">
                      <el-checkbox>免疫抑制剂</el-checkbox>
                    </el-checkbox-group>
                  </div>
                </div>
              </el-col>
              <el-col :span="10" class="el-col-border el-col-border-right el-col-height">
                <div class="r-col">
                  <div class="r-col_input r-col-row r-col-inherit">
                    <el-checkbox-group v-model="checkList7">
                      <el-checkbox>人工装置</el-checkbox>
                    </el-checkbox-group>
                  </div>
                </div>
              </el-col>
              <el-col :span="14" class="el-col-border el-col-border-right el-col-height">
                <div class="r-col">
                  <div class="r-col_input r-col-row r-col-inherit">
                    <el-checkbox-group v-model="checkList7">
                      <el-checkbox>肿瘤</el-checkbox>
                    </el-checkbox-group>
                  </div>
                </div>
              </el-col>
              <el-col :span="10" class="el-col-border el-col-border-right el-col-height">
                <div class="r-col">
                  <div class="r-col_input r-col-row r-col-inherit">
                    <el-checkbox-group v-model="checkList7">
                      <el-checkbox>引流管</el-checkbox>
                    </el-checkbox-group>
                  </div>
                </div>
              </el-col>
              <el-col :span="14" class="el-col-border el-col-border-right el-col-height">
                <div class="r-col">
                  <div class="r-col_input r-col-row r-col-inherit">
                    <el-checkbox-group v-model="checkList7">
                      <el-checkbox>营养不良</el-checkbox>
                    </el-checkbox-group>
                  </div>
                </div>
              </el-col>
              <el-col :span="10" class="el-col-border el-col-border-right el-col-height">
                <div class="r-col">
                  <div class="r-col_input r-col-row r-col-inherit">
                    <el-checkbox-group v-model="checkList7">
                      <el-checkbox>手术</el-checkbox>
                    </el-checkbox-group>
                  </div>
                </div>
              </el-col>
              <el-col :span="14" class="el-col-border el-col-border-right el-col-height">
                <div class="r-col">
                  <div class="r-col_input r-col-row r-col-inherit">
                    <el-checkbox-group v-model="checkList7">
                      <el-checkbox>其他</el-checkbox>
                    </el-checkbox-group>
                  </div>
                </div>
              </el-col>
              <el-col :span="10" class="el-col-border el-col-border-right el-col-height">
                <div class="r-col">
                  <div class="r-col_input r-col-row r-col-inherit">
                    <el-checkbox-group v-model="checkList7"></el-checkbox-group>
                  </div>
                </div>
              </el-col>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="12" class="el-col-border-right">
              <el-col :span="24" class="el-col-border">
                <div class="r-col">
                  <div class="r-col-checkbox r-col-row">
                    <label>病源学检查:</label>
                  </div>
                  <div class="r-col_input r-col-row r-col-inherit">
                    <el-checkbox-group v-model="checkList7">
                      <el-checkbox>1.是</el-checkbox>
                      <el-checkbox>2.否</el-checkbox>
                    </el-checkbox-group>
                  </div>
                </div>
              </el-col>
              <el-col :span="24" class="el-col-border">
                <div class="r-col">
                  <div class="r-col-label r-col-row" style="width:80px">
                    <label>标本名称:</label>
                  </div>
                  <div class="r-col_input r-col-row" style="width: calc(100% - 80px);">
                    <el-input></el-input>
                  </div>
                </div>
              </el-col>
              <el-col :span="24" class="el-col-border">
                <div class="r-col">
                  <div class="r-col-label r-col-row" style="width:80px">
                    <label>病原体:</label>
                  </div>
                  <div class="r-col_input r-col-row" style="width: calc(100% - 80px);">
                    <el-input></el-input>
                  </div>
                </div>
              </el-col>
              <el-col :span="24" class="el-col-border">
                <div class="r-col">
                  <div class="r-col-checkbox r-col-row">
                    <label>送检方法:</label>
                  </div>
                  <div class="r-col_input r-col-row r-col-inherit">
                    <el-checkbox-group v-model="checkList7">
                      <el-checkbox>1.镜检</el-checkbox>
                      <el-checkbox>2.培养</el-checkbox>
                      <el-checkbox>2.血清学</el-checkbox>
                    </el-checkbox-group>
                  </div>
                </div>
              </el-col>
              <el-col :span="12" class="el-col-border">
                <div class="r-col">
                  <div class="r-col-label r-col-row">
                    <label>报告科室:</label>
                  </div>
                  <div class="r-col_input r-col-row">
                    <el-input></el-input>
                  </div>
                </div>
              </el-col>
              <el-col :span="12" class="el-col-border">
                <div class="r-col">
                  <div class="r-col-label r-col-row">
                    <label>报告人:</label>
                  </div>
                  <div class="r-col_input r-col-row">
                    <el-input></el-input>
                  </div>
                </div>
              </el-col>

              <el-col :span="24" class="el-col-border" style="padding-top:5px">
                <div>
                  <p>说明：</p>
                  <p style="text-indent:2em">1.医院感染科病例由报告人于24小时内报医院感染科</p>
                  <p style="text-indent:2em">2.医院感染科发现医院感染流行趋势应于24小时之内报告主管院长和医务科</p>
                  <p style="text-indent:2em">3.医院调查证实出现医院感染流行或暴发时，应于12小时之内报告当地卫生行政部门</p>
                  <p style="text-indent:2em">备注:填写患者发生医院感染时的阳性症状或体征</p>
                </div>
              </el-col>
            </el-col>
            <el-col :span="12">
              <el-col :span="24" class="el-col-border el-col-padding">
                <div class="r-col">
                  <div class="r-col-label r-col-row">
                    <label>备注:</label>
                  </div>
                  <div class="r-col_input r-col-row" style="padding-bottom:17px">
                    <el-input type="textarea" :rows="15"></el-input>
                  </div>
                </div>
              </el-col>
            </el-col>
          </el-row>
        </div>
      </el-main>
    </el-container>
  </div>
</template>
<script>
export default {
  name: "",
  data() {
    return {
      checkList1: [],
      checkList2: [],
      checkList3: [],
      checkList4: [],
      checkList5: [],
      checkList6: [],
      checkList7: [],
      reapotJson: {
        vaa05: "", //姓名
        zia03: "", //病历号
        detecsex: "", //性别
        vaa10: "", //年龄
        vaa73: "" //入院日期
      }
    };
  }
};
</script>

<style  scoped>
.repotcard {
  width: 100%;
  height: 100%;
}
.el-container {
  height: 100%;
}
.el-main {
  /* padding: 20px 0px; */
}
.reportcard-contain {
  max-width: 800px;
  height: calc(100% - 62px);
  border: solid 1px #d8d8d8;
  margin: 0 auto;
  padding-left: 5px;
  overflow: auto;
}
.r-col-row {
  float: left;
}
.r-col-label {
  width: 70px;
  text-align: left;
  padding-left: 5px;
}
.r-col_input {
  width: calc(100% - 70px);
}
.r-col {
  height: 30px;
  line-height: 30px;
}
.el-col-border {
  border-bottom: solid 1px #d8d8d8;
}
.el-col-border-right {
  border-right: solid 1px #d8d8d8;
}
.el-col-padding {
  padding-bottom: 19px;
}
.letterspacing {
  letter-spacing: 8px;
}
.r-col-checkbox {
  margin-right: 10px;
}
.r-col-inherit {
  float: inherit;
  display: contents;
}
.el-col-height {
  height: 58.7px;
  padding-top: 18px;
  padding-left: 18px;
}
.el-col-border {
  text-align: left;
}
p {
  color: #000;
}
.title {
  font-size: 30px;
}
</style>