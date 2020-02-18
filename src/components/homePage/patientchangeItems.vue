<template>
  <div id='patientchangeitems'>
    <el-container style="height:100%">
      <el-header>
        <el-form :inline="true"  class="demo-form-inline" style="text-align:left;margin-bottom:0px">
          <el-form-item label="保险机构">
            <el-select  placeholder="请选择" size="small">
            </el-select>
          </el-form-item>
          <el-form-item >
            <el-input placeholder="请输入关键字" size="small"></el-input>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" size="small">查询</el-button>
          </el-form-item>
          <el-form-item style="float:right">
            <el-dropdown size="small">
              <el-button type="primary" size="small">
                对码查询<i class="el-icon-arrow-down el-icon--right"></i>
              </el-button>
              <el-dropdown-menu slot="dropdown">
                <el-dropdown-item v-for="item in codequeryJson" @click="clkCall(item.methods)"
                  :key='item.id'
                >{{item.value}}</el-dropdown-item>
              </el-dropdown-menu>
            </el-dropdown>
            <el-button type="primary" size="small" @click="patientchangeDialogVisible = true">对码</el-button>
            <el-dropdown size="small">
              <el-button type="primary" size="small">
                对码信息上传<i class="el-icon-arrow-down el-icon--right"></i>
              </el-button>
              <el-dropdown-menu slot="dropdown">
                <el-dropdown-item v-for="item in UpInJson"
                  :key='item.id'
                >{{item.value}}</el-dropdown-item>
              </el-dropdown-menu>
            </el-dropdown>
            <el-dropdown size="small">
              <el-button type="primary" size="small">
                对码上传信息<i class="el-icon-arrow-down el-icon--right"></i>
              </el-button>
              <el-dropdown-menu slot="dropdown">
                <el-dropdown-item v-for="item in UploadQuery"
                  :key='item.id'
                >{{item.value}}</el-dropdown-item>
              </el-dropdown-menu>
            </el-dropdown>
            <el-dropdown size="small">
              <el-button type="primary" size="small">
                扩展功能<i class="el-icon-arrow-down el-icon--right"></i>
              </el-button>
              <el-dropdown-menu slot="dropdown">
                <el-dropdown-item v-for="item in extendedfunctionJson"
                  :key='item.id'
                >{{item.value}}</el-dropdown-item>
              </el-dropdown-menu>
            </el-dropdown>

          </el-form-item>
        </el-form>
      </el-header>
      <el-main class="patientTabel">
        <div class='main-top ' :style="{height:LabelTopheight}">
          <el-tabs v-model="activeName"  style='width:100%'>
            <el-tab-pane label="医院药品目录" name="first" >
              <drug-list></drug-list>
            </el-tab-pane>
            <el-tab-pane label="医院收费项目目录" name="second" >
              <hospital-charge-items></hospital-charge-items>
            </el-tab-pane>
            <el-tab-pane label="医院材料目录" name="third" >
              <hospital-material-catalogue></hospital-material-catalogue>
            </el-tab-pane>
          </el-tabs>
        </div>
        <div class='main-bottom'  id='patientchangeTabs' :style="{height:LabelBottomheight}">
          <el-tabs v-model="activebottomName"  style='width:100%'>
            <el-tab-pane label="项目对照信息" name="b_first" >
              <Item-contro-linformation  ></Item-contro-linformation>
            </el-tab-pane>
            <el-tab-pane label="项目与人员类别报销比例信息" name="b_second" >
              <projects-personnel-information></projects-personnel-information>
            </el-tab-pane>
            <el-tab-pane key="addButton" name='second' disabled='true'  style='float:right'>
              <el-tag slot="label" @click="shrinkPatient" >
                  {{ labelTag }}
                  <span :class="showHideClass"></span>
              </el-tag>
            </el-tab-pane>
          </el-tabs>
        </div>
      </el-main>
    </el-container>
    <el-dialog title="保险收费项目对码"  :visible.sync="patientchangeDialogVisible" width="60%" height='70%'>
      <div class="dialog-body">
        <item-pair-code></item-pair-code>
      </div>
      <div slot="footer" class="dialog-footer">
        <el-checkbox v-model="paircodeFlag" >对码信息保存后自动跳转至下一条医院项目进行对码</el-checkbox>
        <el-button type="primary"  @click="submitForm('ruleForm')" size="small">保 存</el-button>
        <el-button @click="patientchangeDialogVisible = false" size="small">取 消</el-button>
      </div>
    </el-dialog>
    <el-dialog title="根据关联的中心项目信息查找医院项目" :visible.sync="patientchangeHospital" width="60%" height='70%'></el-dialog>
  </div>
</template>
<script>
import druglist from '@/components/payservicetpl/druglist'
import Itemcontrolinformation from '@/components/payservicetpl/Itemcontrolinformation'
import hospitalchargeitems from '@/components/payservicetpl/hospitalchargeitems'
import hospitalmaterialcatalogue from '@/components/payservicetpl/hospitalmaterialcatalogue'
import projectspersonnelinformation from '@/components/payservicetpl/projectspersonnelinformation'
import itempaircode from '@/components/payservicetpl/itempaircode'
export default {
  name: 'search',
  data () {
    return {
      activeName: 'first',
      activebottomName: 'b_first',
      showHideClass: 'el-icon-caret-top',
      LabelTopheight: '60%',
      LabelBottomheight: '40%',
      containShow: true, // 收缩展开
      fromcheck: {
        type: []
      },
      ruleForm: {
        name: ''
      },
      paircodeFlag: false,
      labelTag: '收缩',
      patientchangeDialogVisible: false,
      patientchangeHospital: false,
      codequeryJson: [
        {'id': '1', 'value': `根据关联的中心项目信息查找医院项目`, methods: `patientchangeHospital=false`},
        {'id': '2', 'value': `未对码项目`},
        {'id': '3', 'value': `已对码项目`},
        {'id': '4', 'value': `未上传至中心的已对码项目`},
        {'id': '5', 'value': `已上传至中心的对码项目`},
        {'id': '6', 'value': `原配错误的项目(当中心目录发生变更时，关联的中心编码不存在的情况)`}
      ],
      UpInJson: [
        {'id': '1', 'value': `上传选中项目`},
        {'id': '2', 'value': `上传所有项目`},
        {'id': '3', 'value': `撤销上传`},
        {'id': '4', 'value': `下载选中项目`}
      ],
      UploadQuery: [
        {'id': '1', 'value': `中心已审核`},
        {'id': '2', 'value': `中心审核未通过`},
        {'id': '3', 'value': `中心未审核`}
      ],
      extendedfunctionJson: [
        {'id': '1', 'value': `查看对码`},
        {'id': '2', 'value': `查看历史对码信息`}
      ]
    }
  },
  methods: {
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
    },
    clkCall (methodsWords) {
      debugger
      this.$emit('clkCallBk', methodsWords)
    }

  },
  mounted () {
  },
  components: {
    'drug-list': druglist,
    'Item-contro-linformation': Itemcontrolinformation,
    'hospital-charge-items': hospitalchargeitems,
    'hospital-material-catalogue': hospitalmaterialcatalogue,
    'projects-personnel-information': projectspersonnelinformation,
    'item-pair-code': itempaircode

  }
}
</script>
<style scoped>
.el-header{
  height: 40px!important;
}
.el-main{
  position: absolute;
  top: 45px;
  bottom: 5px;
  left: 10px;
  right: 10px;
}

</style>
