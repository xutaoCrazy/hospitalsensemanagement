<!--机构信息-->
<template>
  <div class="information-contain patientfromationcontent" >
    <div class="contain-heard el-content-show" :style="{ height: LabelTopheight }" ref='contaionheight'>
      <el-tabs v-model="activeName"  style='width:100%'>
          <el-tab-pane label="机构信息" name="first" style='float:left'>
            <div class="charge-contain-main" :style="{height:firstTabelHeight}">
               <el-table  height="100%"  index='1'>
                <el-table-column  label="住院号"  width="100"> </el-table-column>
                <el-table-column  label="状态"   width="100">  </el-table-column>
                <el-table-column  width="100"   label="姓名">  </el-table-column>
                <el-table-column  width="100"   label="性别">  </el-table-column>
                <el-table-column  width="100"   label="保险号"> </el-table-column>
                <el-table-column  width="120"  label="社保登记号"></el-table-column>
                <el-table-column  width="120"  label="病人类别"></el-table-column>
                <el-table-column  width="120"  label="住院科室"></el-table-column>
                <el-table-column  width="120"  label="住院病区"> </el-table-column>
                <el-table-column  width="120"  label="床位号"></el-table-column>
                <el-table-column  width="120"   label="保险机构"></el-table-column>
                <el-table-column  width="120"  label="医疗类别"> </el-table-column>
                <el-table-column  width="120"  label="分中心"> </el-table-column>
                <el-table-column  width="120"   label="入院日期"> </el-table-column>
                <el-table-column  width="120"   label="登记ID"> </el-table-column>
              </el-table>
            </div>
            <div class="charge-contain-bottom" style="height:40px;padding-top:7px">
              <el-pagination
                background
                layout="total, sizes, prev, pager, next, jumper"
                :total="20">
              </el-pagination>
            </div>
          </el-tab-pane>
          <el-tab-pane key="addButton" name='second' disabled='true'  style='float:right'>
            <el-button slot="label" type="primary" size="small"  @click="informationPatient = true">新增</el-button>
          </el-tab-pane>
      </el-tabs>
    </div>
    <!--底部信息-->
    <div class="contain-bottom el-content-show" :style="{ height: LabelBottomheight }" ref='containbottomheight'>
      <el-tabs v-model="activeName" style='width:100%'>
        <el-tab-pane label="保险分中心(分管机构)" name="first" style="float:left" >
          <div class="charge-contain-main" style="bottom:0px" v-show='containShow' :style="{height:secondeTabelHeight}">
            <el-table  height="100%"  index='1'>
            <el-table-column label="住院号"  width="100"></el-table-column>
            <el-table-column label="状态"   width="100"></el-table-column>
            <el-table-column width="100"   label="姓名"></el-table-column>
            <el-table-column width="100"   label="性别"> </el-table-column>
            <el-table-column width="100"  label="保险号"></el-table-column>
            <el-table-column width="120"  label="社保登记号"> </el-table-column>
            <el-table-column  width="120" label="病人类别"></el-table-column>
            <el-table-column  width="120"  label="住院科室"></el-table-column>
            <el-table-column  width="120"  label="住院病区"></el-table-column>
            <el-table-column  width="120"  label="床位号"></el-table-column>
            <el-table-column  width="120"  label="保险机构"></el-table-column>
            <el-table-column  width="120"  label="医疗类别"> </el-table-column>
            <el-table-column  width="120"  label="分中心"> </el-table-column>
            <el-table-column  width="120"  label="入院日期"> </el-table-column>
            <el-table-column  width="120"  label="登记ID"> </el-table-column>
        </el-table>
        </div>
        </el-tab-pane>
        <el-tab-pane key="addButton" name='second' disabled='true'  style='float:right'>
          <el-button slot="label" type="primary" size="small"  @click="dialogFormVisible = true" style="margin-right:5px">新增</el-button>
          <el-tag slot="label" @click="shrinkPatient" >
              {{ labelTag }}
              <span :class="showHideClass"></span>
          </el-tag>
        </el-tab-pane>
      </el-tabs>
    </div>

    <el-dialog title="新增保险机构"   width="600px" close-on-click-modal='false' :visible.sync="dialogFormVisible"  @open=insuranceinStitution>
      <el-form  :model="ruleForm"  ref="ruleForm" :rules="rules" :label-position="labelPosition" label-width="100px"  >
        <el-form-item label="分中心编码" prop="name">
          <el-input size="small"  v-model="ruleForm.name"></el-input>
        </el-form-item>
        <el-form-item label="分中心名称">
          <el-input size="small"></el-input>
        </el-form-item>
        <el-form-item label="所属保险机构">
          <el-select size="small" style="width:100%"></el-select>
        </el-form-item>
    </el-form>

    <div slot="footer" class="dialog-footer">
      <el-button @click="dialogFormVisible = false" size="small">取 消</el-button>
      <el-button type="primary"  @click="submitForm('ruleForm')" size="small">保 存</el-button>
    </div>
    </el-dialog>

     <el-dialog title="新增"   width="600px"  :visible.sync="informationPatient"  @open=informationPatientOpen>
      <el-form  :model="ruleForm"  ref="ruleForm" :rules="rules" :label-position="labelPosition" label-width="80px"  >
        <el-row type="flex" >
          <el-col :span="11">
            <el-form-item label="ID" prop="name">
              <el-input size="small"  v-model="ruleForm.name"></el-input>
            </el-form-item>
          </el-col>
          <el-col class="line" :span="2"></el-col>
          <el-col :span="11">
            <el-form-item label="编码" prop="name">
              <el-input size="small"  v-model="ruleForm.name"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row type='flex'>
          <el-col :span='24'>
             <el-form-item label="名称" prop="name">
              <el-input size="small"  v-model="ruleForm.name"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row type='flex'>
          <el-col :span='24'>
             <el-form-item label="定点医院编码" prop="name" label-width="120px">
              <el-input size="small"  v-model="ruleForm.name"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row type='flex'>
          <el-col :span='24'>
             <el-form-item label="医保开发商" prop="name" label-width="120px">
              <el-input size="small"  v-model="ruleForm.name"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row type="flex" >
          <el-col :span="11">
            <el-form-item label="版本" prop="name">
              <el-input size="small"  v-model="ruleForm.name"></el-input>
            </el-form-item>
          </el-col>
          <el-col class="line" :span="2"></el-col>
          <el-col :span="11">
            <el-form-item label="接口驱动" prop="name">
              <el-input size="small"  v-model="ruleForm.name"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row type="flex" >
          <el-col :span="11">
            <el-form-item label="次序" prop="name">
              <el-input size="small"  v-model="ruleForm.name"></el-input>
            </el-form-item>
          </el-col>
          <el-col class="line" :span="2"></el-col>
          <el-col :span="11">
            <el-form-item label="上级机构" prop="name">
              <el-input size="small"  v-model="ruleForm.name"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row type='flex' style="text-align:justify">
          <el-col :span="24">
            <el-form-item >
               <el-checkbox-group v-model="fromcheck.type" size="medium">
                  <el-checkbox label="使用接口" name="type" size="medium"></el-checkbox>
                  <el-checkbox label="只读" name="type" size="medium"></el-checkbox>
                  <el-checkbox label="启用" name="type" size="medium"></el-checkbox>
               </el-checkbox-group>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row type="flex">
          <el-col :span='24'>
            <el-form-item label="说明">
              <el-input type="textarea" ></el-input>
            </el-form-item>
          </el-col>
        </el-row>
      </el-form>
    <div slot="footer" class="dialog-footer">
      <el-button type="primary"  @click="submitForm('ruleForm')" size="small">保 存</el-button>
      <el-button @click="informationPatient = false" size="small">取 消</el-button>
    </div>
    </el-dialog>
  </div>
</template>

<script>

export default {
  name: 'search',
  data () {
    return {
      activeName: 'first',
      showHideClass: 'el-icon-caret-top',
      dialogFormVisible: false,
      labelPosition: 'left',
      informationPatient: false,
      LabelTopheight: '60%',
      LabelBottomheight: '40%',
      containShow: true, // 收缩展开
      fromcheck: {
        type: []
      },
      ruleForm: {
        name: ''
      },
      labelTag: '收缩',
      rules: {
        name: [
          { required: true, message: '请输入分中心编码', trigger: 'blur' }
        ]
      },
      firstTabelHeight: '',
      secondeTabelHeight: ''
    }
  },
  methods: {
    submitForm (formName) { //  保险机构 保存
      this.$refs[formName].validate((valid) => {
        if (valid) {
          alert('submit!')
        } else {
          return false
        }
      })
    },
    insuranceinStitution () {
      this.$refs['ruleForm'].resetFields()
    },
    informationPatientOpen () {
      this.$refs['ruleForm'].resetFields()
    },
    shrinkPatient () { // 收缩展开
      this.containShow = !this.containShow
      if (!this.containShow) {
        this.labelTag = '展开'
        this.LabelTopheight = '94%'
        this.LabelBottomheight = '6%'
        this.showHideClass = 'el-icon-caret-bottom'
      } else {
        this.labelTag = '收缩'
        this.LabelTopheight = '60%'
        this.LabelBottomheight = '40%'
        this.showHideClass = 'el-icon-caret-top'
      }
      const _let = this
      setTimeout(() => {
        _let.heightstyle()
      }, 10)
    },
    heightstyle () {
      const $height = this.$refs.contaionheight.offsetHeight
      const $secondeTabelHeight = this.$refs.containbottomheight.offsetHeight
      this.firstTabelHeight = $height - 95 + 'px'
      this.secondeTabelHeight = $secondeTabelHeight - 55 + 'px'
    }
  },
  mounted () {
    this.heightstyle()
  }
}
</script>
 <style scoped>
.information-contain{
  width: 100%;
  height: 100%

}
.contain-heard{
  width: 100%;

  position: relative;
}
 .contain-bottom{
  width: 100%;
  height: 40%;
  position: relative
}
.charge-contain-main{
  border: solid 1px #e4e4e4
}
.el-tabs__nav {
  width: 100%!important;
}
</style>
