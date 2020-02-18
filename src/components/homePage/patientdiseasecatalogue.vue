<!--门诊收费退费查询-->
<template>
  <div id='charge'>
  <div class='charge-contain-top'>
    <el-form   class="demo-form-inline" style="text-align:left;" label-width="80px">
      <el-row>
        <el-col :sm="15">
          <el-col :sm="5">
            <el-form-item label="保险机构">
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
          <el-col :sm='10' style="padding-left:15px;line-height:40px">
             <el-input placeholder="请输入关键字" size="small"></el-input>
          </el-col>

        </el-col>
        <el-col :sm="9" class='serchbutton'>
            <el-button type="primary" size="small">查询</el-button>
            <div  style='float:right'>
               <el-button type="primary" size="small" @click="seasecatalogueflag = true">新增</el-button>
               <el-button type="primary" size="small">下载</el-button>
            </div>
        </el-col>
      </el-row>
    </el-form>
  </div>

  <div class='charge-contain-main'>
    <el-table height="100%" style="width: 100%"  index='1'>
      <el-table-column  label="编码"  width="100"></el-table-column>
      <el-table-column  label="ICD编码"  width="100"></el-table-column>
      <el-table-column  label="名称"  width="100"></el-table-column>
      <el-table-column  label="拼音码"  width="100"></el-table-column>
      <el-table-column  label="五笔码"  width="100"></el-table-column>
      <el-table-column  label="说明"  width="100"></el-table-column>
      <el-table-column  label="类型"  width="100"></el-table-column>
      <el-table-column  label="最高赔付"  width="100"></el-table-column>
      <el-table-column  label="使用"  width="100"></el-table-column>
      <el-table-column  label="性别"  width="100"></el-table-column>
      <el-table-column  label="更新日期"  width="100"></el-table-column>
      <el-table-column  label="有效日期"  width="100"></el-table-column>
    </el-table>
  </div>

  <div class="charge-contain-bottom">
    <el-pagination style="margin-top: 10px" layout="prev, pager, next,jumper,total" >
    </el-pagination>
  </div>
  <el-dialog title="新增疾病目录"   width="50%"  :visible.sync="seasecatalogueflag">
      <el-form  label-width="80px"  >
        <el-row type="flex" >
          <el-col :span="11">
            <el-form-item label="编码" prop="name">
              <el-input size="small" ></el-input>
            </el-form-item>
          </el-col>
          <el-col class="line" :span="2"></el-col>
          <el-col :span="11">
            <el-form-item label="姓名" prop="name">
              <el-input size="small" ></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row type="flex" >
          <el-col :span="11">
            <el-form-item label="ICD编码" prop="name">
              <el-input size="small" ></el-input>
            </el-form-item>
          </el-col>
          <el-col class="line" :span="2"></el-col>
          <el-col :span="11">
            <el-form-item label="类型" prop="name">
              <el-input size="small" ></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row type="flex" >
          <el-col :span="11">
            <el-form-item label="性别" prop="name">
              <el-input size="small" ></el-input>
            </el-form-item>
          </el-col>
          <el-col class="line" :span="2"></el-col>
          <el-col :span="11">
            <el-form-item label="最高赔付" prop="name">
              <el-input size="small" ></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row type="flex" >
          <el-col :span="11">
            <el-form-item label="更新日期" prop="name">
              <el-input size="small"  ></el-input>
            </el-form-item>
          </el-col>
          <el-col class="line" :span="2"></el-col>
          <el-col :span="11">
            <el-form-item label="有效日期" prop="name">
              <el-input size="small"  ></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row type="flex" >
          <el-col :span="24">
            <el-form-item label="说明" prop="name">
              <el-input size="small" ></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row type="flex" >
          <el-col :span="24" class='itenabled'>
            <el-checkbox label="是否启用"></el-checkbox>
          </el-col>
        </el-row>
      </el-form>
    <div slot="footer" class="dialog-footer">
      <el-checkbox label="继续新增"></el-checkbox>
      <el-button @click="seasecatalogueflag = false" size="small">取 消</el-button>
      <el-button type="primary"  @click="submitForm('ruleForm')" size="small">保 存</el-button>
    </div>
  </el-dialog>
  </div>
</template>

<script>

export default {
  name: 'patientdiseasecatalogue',
  data () {
    return {
      seasecatalogueflag: false
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
