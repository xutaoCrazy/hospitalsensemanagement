<template>
  <div class="">
     <div class='item_contain_main'>
                <el-table height="100%"  index='1'>
                  <el-table-column label="材料编码" width="130"> </el-table-column>
                  <el-table-column label="规格编码" width="130"> </el-table-column>
                  <el-table-column label="通用名" width="130"> </el-table-column>
                  <el-table-column label="商品名" width="130"> </el-table-column>
                  <el-table-column label="规格" width="130"> </el-table-column>
                  <el-table-column label="单位" width="130"> </el-table-column>
                  <el-table-column label="剂量单位" width="130"> </el-table-column>
                  <el-table-column label="剂量规格" width="130"> </el-table-column>
                  <el-table-column label="包装单位" width="130"> </el-table-column>
                  <el-table-column label="换算系数" width="130"> </el-table-column>
                  <el-table-column label="价格" width="130"> </el-table-column>
                  <el-table-column label="批发价" width="130"> </el-table-column>
                  <el-table-column label="成本价" width="130"> </el-table-column>
                  <el-table-column label="自制材料" width="130"> </el-table-column>
                  <el-table-column label="一次性材料" width="130"> </el-table-column>
                  <el-table-column label="批准文号" width="130"> </el-table-column>
                  <el-table-column label="生产商" width="130"> </el-table-column>
                  <el-table-column label="收据费别" width="130"> </el-table-column>
                  <el-table-column label="标准编码" width="130"> </el-table-column>
                  <el-table-column label="备用编码" width="130"> </el-table-column>

                </el-table>
              </div>
              <div class="charge-contain-bottom">
              </div>
  </div>
</template>
<script>
export default {
  name: 'hospitalmaterialcatalogue',
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
