<!--门诊收费退费查询-->
<template>
  <div id='charge'>
  <div class='charge-contain-top'>
    <el-form   class="demo-form-inline" style="text-align:left;" label-width="80px">
      <el-row>
        <el-col :sm="20">
          <el-col :sm="5">
            <el-form-item label="保险机构">
              <el-select  placeholder="请选择" size="small">

              </el-select>
            </el-form-item>
          </el-col>
          <el-col :sm='5'>
            <el-form-item label="状态">
              <el-select  placeholder="请选择" size="small">

              </el-select>
            </el-form-item>
          </el-col>
          <el-col :sm='9'>
              <el-form-item label="更新时间" >
              <el-col :span="11">
                <el-date-picker type="date" placeholder="选择日期"  style="width: 100%;" size="small"></el-date-picker>
              </el-col>
              <el-col class="line" :span="2" style="text-align:center">-</el-col>
              <el-col :span="11">
                <el-form-item >
                  <el-date-picker type="date" placeholder="选择日期"  style="width: 100%;" size="small"></el-date-picker>
                </el-form-item>
              </el-col>
          </el-form-item>
          </el-col>
          <el-col :sm='5' style="padding-left:15px;line-height:40px">
             <el-input placeholder="请输入关键字" size="small"></el-input>
          </el-col>

        </el-col>
        <el-col :sm="4" class='serchbutton'>
            <el-button type="primary" size="small">查询</el-button>
            <el-tooltip class="item" effect="dark" content="作废中心以结账,本地未结账的收费记录" placement="bottom-end" style='float:right'>
               <el-button type="primary" size="small">取消保险结算</el-button>
            </el-tooltip>
        </el-col>
      </el-row>
    </el-form>
  </div>

  <div class='charge-contain-main'>
    <el-table height="100%"  index='1'>
      <el-table-column  label="门诊号"  width="100"></el-table-column>
      <el-table-column  label="社保登记号"  width="100"> </el-table-column>
      <el-table-column  label="姓名"  width="100"></el-table-column>
      <el-table-column  label="性别"  width="100"> </el-table-column>
      <el-table-column  label="年龄"  width="100"> </el-table-column>
      <el-table-column  label="身份证号" width="100"> </el-table-column>
      <el-table-column  label="总金额" width="100"></el-table-column>
      <el-table-column  label="医保返回总额" width="130"></el-table-column>
      <el-table-column  label="现金" width="100"></el-table-column>
      <el-table-column  label="赔付总额" width="100"></el-table-column>
      <el-table-column  label="个人账户支付" width="130"> </el-table-column>
      <el-table-column  label="结算时间" width="100"></el-table-column>
      <el-table-column  label="医生" width="100"> </el-table-column>
      <el-table-column  label="就诊科室" width="100"> </el-table-column>
      <el-table-column  label="医保卡号" width="100"> </el-table-column>
      <el-table-column  label="保险号"  width="100"> </el-table-column>
      <el-table-column  label="中心结算流水号"  width="130"> </el-table-column>
      <el-table-column  label="状态" width="100"> </el-table-column>
    </el-table>
  </div>

  <div class="charge-contain-bottom">
    <el-pagination style="margin-top: 10px" layout="prev, pager, next,jumper,total" >
    </el-pagination>
  </div>

  </div>
</template>

<script>

export default {
  name: 'patientcharge',
  data () {
    return {
    }
  },
  methods: {
  },
  mounted () {
  }
}
</script>
<style scoped>
#charge{
  width: 100%;
  height: 100%;
  position: relative
}
.charge-contain-top{
  width: 100%;
  height: 40px;
}
.charge-contain-bottom{
  position: absolute;
  left: 0px;
  right: 0px;
  bottom: 0px;
  height: 40px;
}
.charge-contain-main{
  position: absolute;
  left: 5px;
  right: 5px;
  top: 45px;
  bottom: 40px;
  border: solid 1px #d8d8d8
}
.el-form-item{
  margin-bottom: 0px
}
.serchbutton{
  padding-top: 4px;
  padding-left: 15px;
}
</style>
