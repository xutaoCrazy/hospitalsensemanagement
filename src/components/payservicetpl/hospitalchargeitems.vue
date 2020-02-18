<template>
  <div class="">
     <div class='item_contain_main'>
                <el-table height="100%"  index='1'>
                  <el-table-column label="收费项目编码" width="130"> </el-table-column>
                  <el-table-column label="名称" width="100"> </el-table-column>
                  <el-table-column label="规格" width="100"> </el-table-column>
                  <el-table-column label="单位" width="100"> </el-table-column>
                  <el-table-column label="单价" width="100"> </el-table-column>
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
  name: 'hospotalchargeitems',
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
