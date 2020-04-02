<template>
  <div class="doctot-cation" style="height:300px">
    <div class="doc-hearder">ICU监测患者临床病情分类标准及分值</div>
    <div class="doc-cation">
      <div class="contain-table-waring">
        <el-table height="100%" style="width: 100%" index="1" :data="standardscore">
          <el-table-column prop="level" label="分类级别" width="80" header-align="center"></el-table-column>
          <el-table-column prop="score" label="分值" width="80" header-align="center"></el-table-column>
          <el-table-column prop="content" label="分类标准" header-align="center"></el-table-column>
        </el-table>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "",
  data() {
    return {
      checkList: [],
      dialogVisible: false,
      innerVisible: false,
      standardscore: [
        {
          level: "A级",
          score: "1分",
          content:
            "需要常规观察，不需加强护理和治疗,(包括手术后只需观察的患者),这类患者常在48H内从ICU转出"
        },
        {
          level: "B级",
          score: "2分",
          content:
            "病情稳定，单需要预防性观察，不需要加强护理和治疗的患者，例如某些患者因需要排除心肌炎、心肌梗死以及需要服药而在ICU过夜观察"
        },
        {
          level: "C级",
          score: "3分",
          content:
            "病情稳定，但需要加强或监护的患者，如昏迷患者或出现慢性肾衰的患者"
        },
        {
          level: "D级",
          score: "4分",
          content:
            "病情不稳定，需要加强护理和治疗，需要经常评价和调整治疗方案的患者，如心律不齐，糖尿病酮症酸中毒（但尚未出现昏迷、休克、DIC）"
        },
        {
          level: "E级",
          score: "5分",
          content:
            "病情不稳定，且处于昏迷或休克状态，需要心扉复苏或需要加强护理治疗，并需要经常评价护理和治疗效果的患者"
        }
      ]
    };
  }
};
</script>

<style scoped>
.doctot-cation {
  height: 100%;
}
.doc-hearder {
  height: 40px;
  text-align: left;
}
.doc-cation {
  height: calc(100% - 40px);
}
.contain-table-waring {
  width: 100%;
  height: 100%;
  border: solid 1px #d8d8d8;
}
.bqdjpd {
  margin-left: 20px;
  cursor: pointer;
}
.doc-hearder {
  text-align: center;
  line-height: 40px;
  font-size: 18px;
}
</style>