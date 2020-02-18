<template>
  <div id='paymentdifference'>
    <el-row>
        <el-form  label-width="120px">
          <el-col :span="24">
              <el-form-item label="保险偿付类别" prop="name" style="margin-bottom:0px">
                <el-select size="small"  style="width:100%"></el-select>
              </el-form-item>
          </el-col>
        </el-form>
     </el-row>
    <el-row>
      <el-col :span="10">
        <el-form  label-width="120px">
          <el-col :span="24">
              <el-form-item label="偿付费别表" prop="name" style="margin-bottom:5px">
                <hr>
              </el-form-item>
              <div class="item_contain_main">
                <el-table height="265px"   index='1'>
                  <el-table-column label="编码" ></el-table-column>
                  <el-table-column label="名称" ></el-table-column>
                </el-table>
              </div>
          </el-col>
        </el-form>
      </el-col>
      <el-col :span="14">
        <el-form  label-width="300px">
          <el-col :span="24" style="padding-left:10px">
              <el-form-item label="偿付费别与人员类型报销比例对应关系" prop="name" style="margin-bottom:5px">
                <hr>
              </el-form-item>
              <div class="item_contain_main">
                <el-table height="265px"   index='1'>
                  <el-table-column label="业务分类" ></el-table-column>
                  <el-table-column label="人员类别" ></el-table-column>
                  <el-table-column label="报销比例" ></el-table-column>
                  <el-table-column label="自付比例" ></el-table-column>
                </el-table>
              </div>
          </el-col>
        </el-form>
      </el-col>
    </el-row>
  </div>
</template>
<script>
export default {
  name: 'essentialinformation',
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
.el-tabs__content{
  height: 500px;
  overflow: auto;
}
.el-dialog__body{
  padding: 10px 20px;
}
.item_contain_main{
  border: solid 1px #e4e4e4
}

</style>
