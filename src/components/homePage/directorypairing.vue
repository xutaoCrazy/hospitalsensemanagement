<template>
  <div class="catalcontain">
    <el-tabs v-model="activeName">
      <el-tab-pane label="药品目录" name="first">
        <directory-index
          directoty="1"
          :superiorArr="superiormedicalArr"
          :cationArr="cationArr"
          :costLevelArr="costLevelArr"
        ></directory-index>
      </el-tab-pane>
      <el-tab-pane label="诊疗项目" name="second">
        <directory-index
          directoty="2"
          :superiorArr="superiormedicalArr"
          :costLevelArr="costLevelArr"
          :projectArr='projectArr'
        ></directory-index>
      </el-tab-pane>
      <el-tab-pane label="物资耗材" name="third">
        <directory-index directoty="3" :superiorArr="superiormedicalArr" :costLevelArr="costLevelArr" :materialArr='materialArr'></directory-index>
      </el-tab-pane>
      <el-tab-pane label="ICD目录" name="fourth">
        <directory-index directoty="4"  :superiorArr="superiormedicalArr" :costLevelArr="costLevelArr" :ICDArr='ICDArr'></directory-index>
      </el-tab-pane>
    </el-tabs>
  </div>
</template>

<script>
import directoryindex from "@/components/directory/index"; // 目录对码药品目录
import { medicalInsurance } from "@/components/column/tabeldirectory";
export default {
  name: "",
  data() {
    return {
      activeName: "first",
      superiormedicalArr: [], //保险机构
      cationArr: [], //药品分类
      costLevelArr: [], //费用等级
      projectArr: [] ,  //项目分类
      materialArr: [],   //物资耗材分类
      ICDArr:[],     //ICD分类
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
    "directory-index": directoryindex
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