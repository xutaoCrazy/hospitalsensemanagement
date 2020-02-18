<template>
  <div class="catalcontain">
    <el-tabs v-model="activeName">
      <el-tab-pane label="药品目录" name="first">
        <countercode-index directoty="1" :superiorArr="superiormedicalArr" :cationArr="cationArr"></countercode-index>
      </el-tab-pane>
      <el-tab-pane label="诊疗项目" name="second">
        <countercode-index directoty="2" :superiorArr="superiormedicalArr" :projectArr="projectArr"></countercode-index>
      </el-tab-pane>
      <el-tab-pane label="物资耗材" name="third">
        <countercode-index
          directoty="3"
          :superiorArr="superiormedicalArr"
          :materialArr="materialArr"
        ></countercode-index>
      </el-tab-pane>
      <el-tab-pane label="ICD目录" name="fourth">
        <countercode-index
          directoty="4"
          :superiorArr="superiormedicalArr"
          :costLevelArr="costLevelArr"
        ></countercode-index>
      </el-tab-pane>
    </el-tabs>
  </div>
</template>

<script>
import countercodeindex from "@/components/countercode/index"; // 目录对码药品目录
import { medicalInsurance } from "@/components/column/tabeldirectory";
export default {
  name: "",
  data() {
    return {
      activeName: "first",
      superiormedicalArr: [], //保险机构
      costLevelArr: [], //费用等级
      projectArr: [], //项目分类
      materialArr: [], //物资耗材分类
      cationArr: ""
    };
  },
  methods: {
    init() {
      medicalInsurance(this); //加载select数据
    }
  },
  mounted() {
    this.init();
  },
  components: {
    "countercode-index": countercodeindex
  }
};
</script>

<style scoped>
.catalcontain {
  padding: 10px;
  width: 100%;
  height: 100%;
}
</style>