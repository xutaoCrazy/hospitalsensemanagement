<template>
  <div>
     <el-form  :model="ruleForm"  ref="ruleForm" :rules="rules" :label-position="labelPosition" label-width="80px"  >
        <el-row type="flex" >
          <el-col :span="11">
            <el-form-item label="编码" prop="name">
              <el-input size="small"  v-model="ruleForm.name"></el-input>
            </el-form-item>
          </el-col>
          <el-col class="line" :span="2"></el-col>
          <el-col :span="11">
            <el-form-item label="名称" prop="name">
              <el-input size="small"  v-model="ruleForm.name"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row type="flex" >
          <el-col :span="11">
            <el-form-item label="商品名" prop="name">
              <el-input size="small"  v-model="ruleForm.name"></el-input>
            </el-form-item>
          </el-col>
          <el-col class="line" :span="2"></el-col>
          <el-col :span="11">
            <el-form-item label="英文名" prop="name">
              <el-input size="small"  v-model="ruleForm.name"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row type="flex" >
          <el-col :span="11">
            <el-form-item label="保险费别" prop="name">
              <el-input size="small"  v-model="ruleForm.name"></el-input>
            </el-form-item>
          </el-col>
          <el-col class="line" :span="2"></el-col>
          <el-col :span="11">
            <el-form-item label="付费类别" prop="name">
              <el-input size="small"  v-model="ruleForm.name"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row type="flex" >
          <el-col :span="11">
            <el-form-item label="规格" prop="name">
              <el-input size="small"  v-model="ruleForm.name"></el-input>
            </el-form-item>
          </el-col>
          <el-col class="line" :span="2"></el-col>
          <el-col :span="11">
            <el-form-item label="剂型" prop="name">
              <el-input size="small"  v-model="ruleForm.name"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row type="flex" >
          <el-col :span="11">
            <el-form-item label="单位" prop="name">
              <el-input size="small"  v-model="ruleForm.name"></el-input>
            </el-form-item>
          </el-col>
          <el-col class="line" :span="2"></el-col>
          <el-col :span="11">
            <el-form-item label="参考价" prop="name">
              <el-input size="small"  v-model="ruleForm.name"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row type="flex" >
          <el-col :span="11">
            <el-form-item label="自付比例" prop="name">
              <el-input size="small"  v-model="ruleForm.name"></el-input>
            </el-form-item>
          </el-col>
          <el-col class="line" :span="2"></el-col>
          <el-col :span="11">
            <el-form-item label="批准文号" prop="name">
              <el-input size="small"  v-model="ruleForm.name"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row type="flex" >
          <el-col :span="24">
            <el-form-item label="生产厂家" prop="name">
              <el-input size="small"  v-model="ruleForm.name"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row type="flex" >
          <el-col :span="11">
            <el-form-item label="截止日期" prop="name">
              <el-input size="small"  v-model="ruleForm.name"></el-input>
            </el-form-item>
          </el-col>
          <el-col class="line" :span="2"></el-col>
          <el-col :span="11">
            <el-form-item label="费目分类" prop="name">
              <el-input size="small"  v-model="ruleForm.name"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row type="flex" >
          <el-col :span="11">
            <el-form-item label="产地类别" prop="name">
              <el-input size="small"  v-model="ruleForm.name"></el-input>
            </el-form-item>
          </el-col>
          <el-col class="line" :span="2"></el-col>
          <el-col :span="11">
            <el-form-item label="管理级别" prop="name">
              <el-input size="small"  v-model="ruleForm.name"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row type="flex" >
          <el-col :span="11">
            <el-form-item label="业务类型" prop="name">
              <el-input size="small"  v-model="ruleForm.name"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row type="flex" style="text-align:justify">
          <el-col :span="24">
            <el-form-item >
               <el-checkbox-group v-model="fromcheck.type" size="medium">
                  <el-checkbox label="审批用药标志" name="type" size="medium"></el-checkbox>
                  <el-checkbox label="社区(零差率)药标准" name="type" size="medium"></el-checkbox>
                  <el-checkbox label="处方药标志" name="type" size="medium"></el-checkbox>
                  <el-checkbox label="GMP标志" name="type" size="medium"></el-checkbox>
               </el-checkbox-group>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row type="flex" >
          <el-col :span="24">
            <el-form-item label="备注" prop="name">
              <el-input size="small"  v-model="ruleForm.name"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row type="flex" >
          <el-col :span="24">
            <el-form-item label='说明' prop="name">
              <el-input size="small"  v-model="ruleForm.name"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
      </el-form>
  </div>
</template>

<script>

export default {
  name: 'essentialinformation',
  data () {
    return {
      labelPosition: 'left',
      ruleForm: {
        name: ''
      },
      labelTag: '收缩',
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
.el-tabs__content{
  height: 600px;
  overflow: auto;
}
</style>
