<!--住院公共管理-->
<template>
  <div class='main-container' id='main-height-contain'>
    <el-row>
      <el-col :span="8" style=" border-right: solid 1px #d8d8d8;padding-right: 5px;position: relative;">
        <el-form  label-width="80px">
          <el-form-item label="保险机构">
           <el-select v-model="insurancevalue"  placeholder="请选择" size="small"  clearable  @change="onSelectedDrug()">
              <el-option v-for= "item in InsuranceArr"
                :key="item.iaa01"
                :label="item.iaa03"
                :value="item.iaa01"
              >
              </el-option>
              </el-select>
          </el-form-item>
        </el-form>
        <el-form :inline="true"  class="demo-form-inline" style="text-align:left;margin-left:10px">
          <el-form-item label="病人检索">
            <el-input placeholder="请输入关键字" size="small" v-popover:popover  @keyup.13.native='searchPatient'></el-input>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" size="small">查询</el-button>
          </el-form-item>
        </el-form>
        <el-form style="text-align:left;margin-left:10px">
          <el-dropdown size="small" split-button type="primary">
            住院费用明细上传
            <el-dropdown-menu slot="dropdown">
              <el-dropdown-item>费用上传(续传)</el-dropdown-item>
              <el-dropdown-item>费用上传</el-dropdown-item>
              <el-dropdown-item>住院费用自动上传设置</el-dropdown-item>
            </el-dropdown-menu>
          </el-dropdown>
          <el-dropdown size="small" split-button type="primary" placement='bottom-start'>
            转自费病人
            <el-dropdown-menu slot="dropdown">
              <el-dropdown-item>正常转自费（撤销病人在中心的就医登记记录后，同事清除病人本地的医疗保险信息）</el-dropdown-item>
              <el-dropdown-item>异常转自费（确认病人当前未在中心办理入院登记的情况下，直接使用本功能清除病人本地的医疗保险信息）</el-dropdown-item>

            </el-dropdown-menu>
          </el-dropdown>
          <el-button type="primary" size="small">预算</el-button>
        </el-form>
        <div id='main-contain-tabel'>
          <el-table :data="tableData" height="100%"  index='1' header-align="center"   @row-click="costRecord"  highlight-current-row >
            <el-table-column  width="120" label="住院号"   header-align="center" prop='vaa04' fixed></el-table-column>
            <el-table-column  width="80" label="状态"  header-align="center"   prop='status' ></el-table-column>
            <el-table-column  width="100"  label="姓名"  header-align="center"  prop='vaa05' ></el-table-column>
            <el-table-column  width="60" label="性别" header-align="center"    prop='abw01' :formatter="abw02prop" ></el-table-column>
            <el-table-column  width="200" label="保险号"  header-align="center" prop='iak05'></el-table-column>
            <el-table-column  width="200" label="社保登记号" header-align="center" prop='iar25'></el-table-column>
            <el-table-column  width="120" label="病人类别"  header-align="center"  prop='bdp02'> </el-table-column>
            <el-table-column  width="120"  label="住院科室"  header-align="center" prop='indept'></el-table-column>
            <el-table-column  width="120" label="住院病区" header-align="center"  prop='InWard'></el-table-column>
            <el-table-column width="80"  label="床位号" header-align="center"   prop='bcq04b'> </el-table-column>
            <el-table-column  width="100"  label="保险机构"  header-align="center"  prop='iaa03' > </el-table-column>
            <el-table-column  width="120"  label="医疗类别"  header-align="center" prop='iai03'></el-table-column>
            <el-table-column  width="120" label="分中心" header-align="center"  prop='iab03'></el-table-column>
            <el-table-column  width="200" label="入院日期"  header-align="center"   prop='vae11' :formatter="dateFormat"></el-table-column>
            <el-table-column  width="200" label="登记ID"  header-align="center"   prop='vae01' ></el-table-column>
          </el-table>
        </div>
      </el-col>
      <el-col :span="16">
        <div class='contain-left-main  el-content-show' id='contain-left-mian'  ref="elememt" >
          <el-tabs v-model="activeName">
          <el-tab-pane label="住院费用明细记录" name="first">
              <cot-components-expensee v-bind:psMsg='showHight'  :costJson='costJson'></cot-components-expensee>
          </el-tab-pane>
          <el-tab-pane label="预算结果" name="second">预算结果</el-tab-pane>
          <el-tab-pane label="费用上传日志" name="third">费用上传日志</el-tab-pane>
        </el-tabs>
        </div>
      </el-col>
    </el-row>
    <el-popover
      ref="popover"
      placement="bottom"
      width="400"
      transition="fade"
      @show='inquiriesPatients'
      trigger="click"
      id='tabel-popover'
      >
      <el-table  width='470px' height="270px">
        <el-table-column  property="date" label="住院号"></el-table-column>
        <el-table-column  property="name" label="姓名"></el-table-column>
        <el-table-column  property="address" label="入院时间"></el-table-column>
      </el-table>
      </el-popover>
  </div>
</template>

<script>
import hospitalizaexpenses from '@/components/costtemplate/hospitalizationexpenses'
import AnswerSystem from '@/service/api/answerService'
export default {
  name: 'container',
  data () {
    return {
      tableData: [ ],
      activeName: 'first',
      showHight: 600,
      insurancevalue: '',
      InsuranceArr: [],
      costJson: {
        records: '',
        startDate: ''
      }

    }
  },
  components: {
    'cot-components-expensee': hospitalizaexpenses
  },
  methods: {
    tabeldataisinfo () { // table 赋值
      let param = {ID: 2231, paramStr: '{IAA01:' + (this.insurancevalue ? this.insurancevalue : 0) + '}'}
      
      let orderApi = new AnswerSystem()
      orderApi.list(param)
        .then(({data}) => {
          if (data.result === 'Success') {
            this.tableData = data.list
          }
        }, (error) => {
          this.$notify.error(error.message)
        })
    },
    selectAssignment () {
      debugger
      let param = {ID: 2251}
      const orderApi = new AnswerSystem()
      orderApi.list(param)
        .then(({data}) => {
          this.InsuranceArr = data.list
        }, (error) => {
          this.$notify.error(error.message)
        })
    },
    onSelectedDrug () {
      this.tabeldataisinfo()
    },
    abw02prop (row, column) {
      switch (row['abw01']) {
        case '1':
          return '女'
          break
        case '2':
          return '男'
          break
        case '0':
          return '未知'
          break
      }
    },
    dateFormat (row, column, cellValue) {
      return this.$moment(cellValue).format('YYYY-MM-DD HH:mm:ss')
    },
    inquiriesPatients () {

    },
    searchPatient () {
      this.inquiriesPatients()
    },
    init () {
      this.selectAssignment()
      this.tabeldataisinfo()
    },
    costRecord (row, event, column) {
      this.costJson.records = row.vae01
      this.costJson.startDate = row.vae11
    }
  },
  mounted () {

  },
  created () {
    this.init()
  }

}
</script>
<style scoped>
.main-container{
  width: 100%;
  height: 100%;
}
.el-row{
  width: 100%;
  height: 100%;
}
.el-row .el-col{
  height: 100%;
}
.el-select{
  width: 100%
}
.el-form-item{
  margin-bottom: 5px;
}
#main-contain-tabel{
  position: absolute;
  bottom: 5px;
  border: solid 1px #e4e4e4;
  top: 142px;
  left: 5px;
  right: 5px;
}
::-webkit-scrollbar-thumb{
    background-color: #ccc;
    /* background-clip: padding-box; */
    /* border: solid transparent; */
    /* min-height: 28px; */
    /* padding: 100px 0 0; */
    box-shadow: inset 1px 1px 0 rgba(#bfbfbf),inset 0 -1px 0 rgba(#bfbfbf);
    border-radius: 15px;
}
::-webkit-scrollbar {
    height: 14px;
    overflow: visible;
    width: 14px;
}
.contain-left-main{
  padding: 5px 10px;
  height: 100%;
   position: relative
}
#main-contain-tabel .el-table td, .el-table th.is-leaf {
    border: 1px solid #e4e4e4;
}
#main-contain-tabel .el-table td, .el-table th {
    padding: 3px 0!important;
}
#main-contain-tabel .el-table td, .el-table th.is-leaf {
    border: 1px solid #e4e4e4;
}

</style>
