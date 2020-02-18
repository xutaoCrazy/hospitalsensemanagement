<template>
  <div class="">
     <div class='item_contain_main'>
                <el-table height="100%"  index='1'>
                  <el-table-column label="药品编码" width="100"> </el-table-column>
                  <el-table-column label="规格编码" width="100"> </el-table-column>
                  <el-table-column label="通用名" width="100"> </el-table-column>
                  <el-table-column label="商品名" width="100"> </el-table-column>
                  <el-table-column label="规格" width="100"> </el-table-column>
                  <el-table-column label="单位" width="100"> </el-table-column>
                  <el-table-column label="剂量单位" width="100"> </el-table-column>
                  <el-table-column label="剂型" width="100"> </el-table-column>
                  <el-table-column label="含量" width="100"> </el-table-column>
                  <el-table-column label="门诊单位" width="100"> </el-table-column>
                  <el-table-column label="门诊包装" width="100"> </el-table-column>
                  <el-table-column label="住院单位" width="100"> </el-table-column>
                  <el-table-column label="住院包装" width="100"> </el-table-column>
                  <el-table-column label="药库单位" width="100"> </el-table-column>
                  <el-table-column label="药库包装" width="100"> </el-table-column>
                  <el-table-column label="加个单位" width="100"> </el-table-column>
                  <el-table-column label="价格包装" width="100"> </el-table-column>
                  <el-table-column label="价格" width="100"> </el-table-column>
                  <el-table-column label="批发价" width="100"> </el-table-column>
                  <el-table-column label="成本价" width="100"> </el-table-column>
                  <el-table-column label="指导价" width="100"> </el-table-column>
                  <el-table-column label="产地类型" width="100"> </el-table-column>
                  <el-table-column label="自制药品" width="100"> </el-table-column>
                  <el-table-column label="批准文号" width="100"> </el-table-column>
                  <el-table-column label="产地" width="100"> </el-table-column>
                  <el-table-column label="收据费别" width="100"> </el-table-column>
                  <el-table-column label="标准编码" width="100"> </el-table-column>
                  <el-table-column label="备用编码" width="100"> </el-table-column>

                </el-table>
              </div>
              <div class="charge-contain-bottom">
              </div>
  </div>
</template>
<script>
export default {
  name: 'druglist',
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
.item_contain_main{
  position: absolute;
  left: 0px;
  right: 0px;
  top:55px;
  bottom: 40px;
  border: solid 1px #d8d8d8
}
.charge-contain-bottom{
  position: absolute;
  left: 0px;
  right: 0px;
  bottom: 0px;
  height: 40px;
}
</style>
