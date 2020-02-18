<template>
  <div>
    <el-form  :model="ruleForm"  ref="ruleForm" :rules="rules" :label-position="labelPosition" label-width="100px"  >
        <el-row type="flex" >
          <el-col :span="11">
            <el-form-item label="限价" prop="name">
              <el-input size="small"  v-model="ruleForm.name"></el-input>
            </el-form-item>
          </el-col>
          <el-col class="line" :span="2"></el-col>
          <el-col :span="11">
            <el-form-item label="限额" prop="name">
              <el-input size="small"  v-model="ruleForm.name"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row type="flex" >
          <el-col :span="11">
            <el-form-item label="每日限额" prop="name">
              <el-input size="small"  v-model="ruleForm.name"></el-input>
            </el-form-item>
          </el-col>
          <el-col class="line" :span="2"></el-col>
          <el-col :span="11">
            <el-form-item label="每日限量" prop="name">
              <el-input size="small"  v-model="ruleForm.name"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row type="flex" >
          <el-col :span="11">
            <el-form-item label="草药限制" prop="name">
              <el-input size="small"  v-model="ruleForm.name"></el-input>
            </el-form-item>
          </el-col>
          <el-col class="line" :span="2"></el-col>
          <el-col :span="11">
            <el-form-item label="复方限制" prop="name" style="text-align:justify">
                  <el-checkbox l name="type" size="medium"></el-checkbox>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row type="flex" style="text-align:justify">
          <el-col :span="24">
            <el-form-item  label="限制使用范围" >
               <el-checkbox-group v-model="fromcheck.type" size="medium">
                  <el-checkbox label="仅儿童使用" name="type" size="medium"></el-checkbox>
                  <el-checkbox label="仅居民使用" name="type" size="medium"></el-checkbox>
               </el-checkbox-group>
            </el-form-item>
          </el-col>
        </el-row>
      </el-form>
  </div>
</template>
<script>
export default {
  name: 'limitedinformation',
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
