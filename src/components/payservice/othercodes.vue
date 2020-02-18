<template>
  <div>
    <el-form  :model="ruleForm"  ref="ruleForm" :rules="rules" :label-position="labelPosition" label-width="80px"  >
        <el-row type="flex" >
          <el-col :span="11">
            <el-form-item label="标准编码" prop="name">
              <el-input size="small"  v-model="ruleForm.name"></el-input>
            </el-form-item>
          </el-col>
          <el-col class="line" :span="2"></el-col>
          <el-col :span="11">
            <el-form-item label="自费编码" prop="name">
              <el-input size="small"  v-model="ruleForm.name"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row type="flex" >
          <el-col :span="11">
            <el-form-item label="备用编码" prop="name">
              <el-input size="small"  v-model="ruleForm.name"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
      </el-form>
  </div>
</template>
<script>
export default {
  name: 'othercodes',
  data () {
    return {
      labelPosition: 'left',
      ruleForm: {
        name: ''
      },
      rules: {
        name: [
          { required: true, message: '请输入分中心编码', trigger: 'blur' }
        ]
      },
      fromcheck: {
        type: ''
      }
    }
  },
  methods: {
  },
  mounted () {
  }
}
</script>
<style scoped>

</style>
