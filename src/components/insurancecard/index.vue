<template>
  <div>
    <el-form label-width="85px" :model="parms" ref="parms" :rules="rules" class="demo-ruleForm">
      <el-row>
        <el-col :span="24">
          <el-form-item label="医保机构">
            <el-select placeholder size="small" v-model="iaaVal">
              <el-option
                v-for="item in iaa01Arr"
                :key="item.iaa01"
                :label="item.iaa03"
                :value="item.iaa01"
              ></el-option>
            </el-select>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="24">
          <el-form-item label="支付类别">
            <el-select placeholder size="small"></el-select>
          </el-form-item>
        </el-col>
      </el-row>
    </el-form>
    <div slot="footer" class="dialog-footer">
      <el-button type="primary" size="small">保 存</el-button>
      <el-button size="small">取 消</el-button>
    </div>
  </div>
</template>
<script>
export default {
  name: "",
  data() {
    return {
      iaa01Arr: [],
      iaaVal: ""
    };
  },
  methods: {
  
    init() {
      IAA01Select();
    }
  },
  mounted() {
    debugger;
    this.init();
  }
};
</script>

<style scoped>
.el-dialog__body {
  padding: 10px 0px !important;
}
.dialog-footer {
  padding: 9px;
  border: solid 1px #e4e4e4;
}
</style>