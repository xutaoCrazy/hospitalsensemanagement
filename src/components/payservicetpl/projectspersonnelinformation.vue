<template>
  <div>
    <div class='item_contain_main'>
                <el-table height="100%"  index='1'>
                  <el-table-column label="偿付类别" width="100"> </el-table-column>
                  <el-table-column label="人员类别" width="100"> </el-table-column>
                  <el-table-column label="业务类型" width="100"> </el-table-column>
                  <el-table-column label="自负比例" width="100"> </el-table-column>
                  <el-table-column label="报销比例" width="100"> </el-table-column>
                </el-table>
              </div>
  </div>
</template>
<script>
export default {

}
</script>
<style scoped>
.item_contain_main{
  position: absolute;
  left: 0px;
  right: 0px;
  top:55px;
  bottom:0px;
  border: solid 1px #d8d8d8
}
</style>
