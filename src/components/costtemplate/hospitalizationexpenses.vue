<!--住院费用明细记录-->
<template>
  <div id="records">
<el-container>
  <el-header :style="{ height:Headheight}">
     <el-form  class="demo-form-inline" style="text-align:left;"  label-width="100px" >
       <el-row>
          <el-col :sm="6">
              <el-input  placeholder="项目规格编码名称" size="small"></el-input>
          </el-col>
          <el-col :sm="6">
            <el-form-item label="开始时间"  size='small'>
              <el-date-picker type="date" placeholder="选择日期"  style="width: 100%;" size="small"  format='yyyy-MM-dd HH:mm:ss' v-model="costJson.startDate"></el-date-picker>
            </el-form-item>
          </el-col>
         <el-col :sm="6">
            <el-form-item label="结束时间"  size='small'>
              <el-date-picker type="date" placeholder="选择日期"  style="width: 100%;" size="small" v-model="enddate" format='yyyy-MM-dd HH:mm:ss'></el-date-picker>
            </el-form-item>
          </el-col>
          <el-col :sm="6">
              <el-button type="primary" size="small" style="margin-left:10px" @click="costInquiry()">查询</el-button>
              <el-tag @click="showMore()" style='float:right'>更多
                <span :class="showHideClass"></span>
              </el-tag>
          </el-col>
       </el-row>
        <el-row v-show="showHide">
            <el-col :sm='6'>
            <el-form-item label="偿付类别"  size='small'>
              <el-select v-model="reimbursementCategoryVal"  placeholder="请选择" size="small"  clearable  >
                <el-option  v-for= "item in reimbursementCategory"
                  :key="item.aas01"
                  :label='item.aas02'
                  :value='item.aas02'
                 >
                </el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :sm='6'>
            <el-form-item label="收据费别"  size='small'>
              <el-select v-model="receipFeeArrVal"  placeholder="请选择" size="small"  clearable  >
                <el-option v-for="item in receipFeeArr"
                  :key='item.abf01'
                  :label='item.abf02'
                  :value='item.abf02'
                >
                </el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :sm='6'>
            <el-form-item label="自费特性"  size='small'>
              <el-select v-model="receipExpenseArrval"  placeholder="请选择" size="small"  clearable  >
                <el-option v-for="item in receipExpenseArr"
                    :key=item.id
                    :label=item.value
                    :value=item.id
                >
                </el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :sm='6'>
            <el-form-item label="附加查询条件"  size='small' >
              <el-select   placeholder="请选择" size="small"  clearable  >
                <el-option>
                </el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :sm='6'>
            <el-form-item label="赔付类型"  size='small'>
              <el-select   placeholder="请选择" size="small"  clearable  >
                <el-option>
                </el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :sm='6'>
            <el-form-item label="保险费别"  size='small'>
              <el-select   placeholder="请选择" size="small"  clearable  >
                <el-option>
                </el-option>
              </el-select>
            </el-form-item>
          </el-col>
          </el-row>
    </el-form>
  </el-header>
  <el-main>
    <div class="contain-bottom">
      <el-form style="text-align:right">
        <el-button type="primary" size="small">设置费用自费
        </el-button>
        <el-button type="primary" size="small">设置费用不上传
        </el-button>
        <el-button type="primary" size="small">设置费用上传
        </el-button>
        <el-dropdown size="small" split-button type="primary" @click.stop>
              设置费用明细背景色背景色
              <el-dropdown-menu slot="dropdown">
                <el-dropdown-item>
                  <el-row>
                    <el-col :sm="16">
                      甲类背景色
                    </el-col>
                    <el-col :sm="8" class='colorRight'>
                      <el-color-picker v-model="jaileiColor" @change='colorchange(1)' show-alpha size="small"></el-color-picker>
                    </el-col>
                  </el-row>
                </el-dropdown-item>
                <el-dropdown-item>
                  <el-row>
                    <el-col :sm="16">
                      乙类背景色
                    </el-col>
                    <el-col :sm="8" class='colorRight'>
                      <el-color-picker v-model="jaileiColor"  @change='colorchange(2)' show-alpha size="small"></el-color-picker>
                    </el-col>
                  </el-row>
                </el-dropdown-item>
                <el-dropdown-item>
                  <el-row>
                    <el-col :sm="16">
                      丙类背景色
                    </el-col>
                    <el-col :sm="8" class='colorRight'>
                      <el-color-picker v-model="jaileiColor"  @change='colorchange(3)' show-alpha size="small"></el-color-picker>
                    </el-col>
                  </el-row>
                </el-dropdown-item>
                <el-dropdown-item style="width:200px">
                  <el-row>
                    <el-col :sm="16" >
                      目录外自费背景色
                    </el-col>
                    <el-col :sm="8" class='colorRight'>
                      <el-color-picker v-model="jaileiColor"  @change='colorchange(4)' show-alpha size="small"></el-color-picker>
                    </el-col>
                  </el-row>
                </el-dropdown-item>
              </el-dropdown-menu>
        </el-dropdown>
     </el-form>
      <el-table style="width: 100%;margin-top:5px;border:solid 1px #e4e4e4"  :height='tableHeight'>
      <el-table-column label="费用明细" align='center' >
        <el-table-column width="120"  header-align="center"  label="流水号"></el-table-column>
        <el-table-column width="120"  header-align="center"  label="自费"></el-table-column>
        <el-table-column width="120"  header-align="center"  label="编码"></el-table-column>
        <el-table-column width="120"  header-align="center"  label="项目名称"></el-table-column>
        <el-table-column width="120"  header-align="center"  label="规格"></el-table-column>
        <el-table-column width="120"  header-align="center"  label="偿付类型"></el-table-column>
        <el-table-column width="120"  header-align="center"  label="总数量"></el-table-column>
        <el-table-column width="120"  header-align="center"  label="记账金额"></el-table-column>
        <el-table-column width="120"  header-align="center"  label="原金额"></el-table-column>
        <el-table-column width="120"  header-align="center"  label="剂数"></el-table-column>
        <el-table-column width="120"  header-align="center"  label="单量"></el-table-column>
        <el-table-column width="120"  header-align="center"  label="零售单位"></el-table-column>
        <el-table-column width="120"  header-align="center"  label="开单人"></el-table-column>
        <el-table-column width="120"  header-align="center"  label="执行者"></el-table-column>
        <el-table-column width="120"  header-align="center"  label="开单科室"></el-table-column>
        <el-table-column width="120"  header-align="center"  label="记账时间"></el-table-column>
        <el-table-column width="120"  header-align="center"  label="收据费别"></el-table-column>
        <el-table-column width="120"  header-align="center"  label="上传状态"> </el-table-column>
      </el-table-column>
      <el-table-column label="项目对应的中心项目信息" align='center'>
        <el-table-column width="120" header-align="center"  label="医保编码"> </el-table-column>
        <el-table-column width="120" header-align="center"  label="医保项目"></el-table-column>
        <el-table-column width="120" header-align="center"  label="赔付类别"> </el-table-column>
        <el-table-column width="120" header-align="center" label="保险费别"></el-table-column>
      </el-table-column>
    </el-table>
  </div>
  </el-main>
  <el-footer style="height:40px">
    <div class="block" style="magin-top:10px">
      <el-pagination
        background
        layout="total, sizes, prev, pager, next, jumper"
        :total="20">
      </el-pagination>
    </div>
  </el-footer>
</el-container>

</div>
</template>

<script>
import AnswerSystem from '@/service/api/answerService'
export default {
  name: 'hospitalizationexpenses',
  props: ['costJson'],
  data () {
    return {
      showHide: false,
      showHideClass: 'el-icon-caret-top',
      Headheight: '40px',
      showHight: this.psMsg,
      reimbursementCategory: [], // 偿付类别
      reimbursementCategoryVal: '', // 偿付val
      receipFeeArr: [], // 收据费别
      receipFeeArrVal: [], // 收据费别val
      enddate: this.$moment().format('YYYY-MM-DD HH:mm:ss'),
      receipExpenseArr: [ // 自费费别
        {id: '0', value: `自费项目`},
        {id: '1', value: `非自费项目`},
        {id: '2', value: `所有项目(包含以上两者)`}
      ],
      receipExpenseArrval: '', // 自费value
      tableHeight: window.innerHeight - 313,
      jaileiColor: 'rgba(19, 206, 102, 0.8)'
    }
  },
  methods: {
    showMore  () {
      if (!this.showHide) {
        this.showHide = true
        this.Headheight = '120px'
        this.tableHeight = window.innerHeight - (313 + 80)
      } else {
        this.showHide = false
        this.Headheight = '40px'
        this.tableHeight = window.innerHeight - 313
      }
      if (!this.showHide) {
        this.showHideClass = 'el-icon-caret-bottom'
      } else {
        this.showHideClass = 'el-icon-caret-top'
      }
    },
    selectReimbursement () {
      let param134 = {ID: 134} // 偿付类别
      let orderApi = new AnswerSystem()
      orderApi.list(param134)
        .then(({data}) => {
          if (data.result === 'Success') {
            this.reimbursementCategory = data.list
          }
        }, (error) => {
          this.$notify.error(error.message)
        })
    },
    selectReceipt () {
      let param135 = {ID: 135} // 收据类别
      let orderApicharges = new AnswerSystem()
      orderApicharges.list(param135)
        .then(({data}) => {
          if (data.result === 'Success') {
            this.receipFeeArr = data.list
          }
        }, (error) => {
          this.$notify.error(error.message)
        })
    },
    costInquiry () {
      debugger
      if (this.records === '') {
        this.$message({
          message: '请选择病人',
          type: 'warning',
          duration: 2000
        })
      }
      let param136 = {} // 费用查询
      param136.ID = 2277
      param136.Find_Term = 'VAJ1.VAJ05 < 3,VAA07:' + this.costJson.records
      let orderApicharges = new AnswerSystem()
      orderApicharges.list(param136)
        .then(({data}) => {
          debugger
          if (data.result === 'Success') {
            this.receipFeeArr = data.list
          }
        }, (error) => {
          this.$notify.error(error.message)
        })
    },
    init () {
      const p1 = new Promise((resolve) => { this.selectReimbursement(resolve) })
      const p2 = new Promise((resolve) => { this.selectReceipt(resolve) })
      Promise.all(
        [p1, p2]
      ).then(({data}) => {
      }).catch((error) => {
      })
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
.el-form-item{
  margin-bottom: 3px;
}
.el-tag{
  cursor: pointer;
}
.transition-box {
  margin-bottom: 10px;
  width: 200px;
  height: 100px;
  border-radius: 4px;
  background-color: #409EFF;
  text-align: center;
  color: #fff;
  padding: 40px 20px;
  box-sizing: border-box;
  margin-right: 20px;
}
.records{
    position: absolute;
    left: 0px;
    right: 0px;
    bottom: 0px;
    top: 0px;
}
.block{
  position: absolute;
  bottom: 0px;
  right: 180px;
  text-align: center;
}
.colorRight{
  text-align: right
}
</style>
