<template>
  <div class="itemcontaion">
    <div>
      <el-row>
      <el-col :sm='14' style="padding-right:5px">
        <el-form label-width="100px">
          <el-form-item label="医院项目信息" prop="name" style="margin-bottom:5px">
            <hr>
          </el-form-item>
          <div>
            <table class="vtable">
              <tbody>
                <tr>
                  <td style="width:25%">项目编码</td>
                  <td style="width:25%"></td>
                  <td style="width:25%">规格</td>
                  <td style="width:25%"></td>
                </tr>
                <tr>
                  <td style="width:25%">规格编码</td>
                  <td style="width:25%"></td>
                  <td style="width:25%">基本单位</td>
                  <td style="width:25%"></td>
                </tr>
                <tr>
                  <td style="width:25%">通用名</td>
                  <td style="width:25%"></td>
                  <td style="width:25%">含量</td>
                  <td style="width:25%"></td>
                </tr>
                <tr>
                  <td style="width:25%">商品名</td>
                  <td style="width:25%"></td>
                  <td style="width:25%">单价</td>
                  <td style="width:25%"></td>
                </tr>
                <tr>
                  <td style="width:25%">标准编码</td>
                  <td style="width:25%"></td>
                  <td style="width:25%">批准文号</td>
                  <td style="width:25%"></td>
                </tr>
                <tr>
                  <td style="width:25%">备用编码</td>
                  <td style="width:25%"></td>
                  <td style="width:25%">产地</td>
                  <td style="width:25%"></td>
                </tr>
                <tr>
                  <td style="width:25%">剂型</td>
                  <td style="width:25%"></td>
                  <td style="width:25%">赔付类型</td>
                  <td style="width:25%"></td>
                </tr>
                <tr>
                  <td style="width:25%">计量单位</td>
                  <td style="width:25%"></td>
                  <td style="width:25%"></td>
                  <td style="width:25%"></td>
                </tr>
              </tbody>
            </table>
          </div>
        </el-form>
      </el-col>
      <el-col :sm='10'  style="padding-left:5px">
        <el-form >
          <el-form-item label="对码" prop="name" style="margin-bottom:5px">
           <hr>
          </el-form-item>
          <div>
             <table class="vtable">
              <tbody>
                <tr>
                  <td style="width:25%">医院项目名称</td>
                  <td style="width:25%"></td>
                </tr>
                <tr>
                  <td style="width:25%">医院项目编码</td>
                  <td style="width:25%"></td>
                </tr>
                <tr>
                  <td style="width:25%">保险机构</td>
                  <td style="width:25%"></td>
                </tr>
                <tr>
                  <td style="width:25%">中心项目名称</td>
                  <td style="width:25%"></td>
                </tr>
                <tr>
                  <td style="width:25%">中心项目编码</td>
                  <td style="width:25%"></td>
                </tr>
                <tr>
                  <td style="width:25%">中心定价</td>
                  <td style="width:25%"></td>
                </tr>
                <tr>
                  <td style="width:25%">对码说明</td>
                  <td style="width:25%"></td>
                </tr>
                <tr>
                  <td style="width:25%">中心单位换算</td>
                  <td style="width:25%"></td>
                </tr>
              </tbody>
             </table>
          </div>
        </el-form>
      </el-col>
     </el-row>
    </div>
    <div>
      <el-tabs v-model="activeName"  style='width:100%'>
            <el-tab-pane label="中心项目基本信息" name="first" >
              <div>
                <table class="vtable">
                  <tbody>
                    <tr>
                      <td style="width:25%">通用名</td>
                      <td style="width:25%"></td>
                      <td style="width:25%">参考价</td>
                      <td style="width:25%"></td>
                    </tr>
                    <tr>
                      <td style="width:25%">商品名</td>
                      <td style="width:25%"></td>
                      <td style="width:25%">限价</td>
                      <td style="width:25%"></td>
                    </tr>
                    <tr>
                      <td style="width:25%">项目编码</td>
                      <td style="width:25%"></td>
                      <td style="width:25%">保险费别</td>
                      <td style="width:25%"></td>
                    </tr>
                    <tr>
                      <td style="width:25%">标准编码</td>
                      <td style="width:25%"></td>
                      <td style="width:25%">赔付类型</td>
                      <td style="width:25%"></td>
                    </tr>
                    <tr>
                      <td style="width:25%">剂型</td>
                      <td style="width:25%"></td>
                      <td style="width:25%">自负比例</td>
                      <td style="width:25%"></td>
                    </tr>
                    <tr>
                      <td style="width:25%">包装规格</td>
                      <td style="width:25%"></td>
                      <td style="width:25%">更新日期</td>
                      <td style="width:25%"></td>
                    </tr>
                    <tr>
                      <td style="width:25%">规格</td>
                      <td style="width:25%"></td>
                      <td style="width:25%">有效截止日期</td>
                      <td style="width:25%"></td>
                    </tr>
                    <tr>
                      <td style="width:25%">单位</td>
                      <td style="width:25%"></td>
                      <td style="width:25%">所属大类</td>
                      <td style="width:25%"></td>
                    </tr>
                    <tr>
                      <td style="width:25%">产地</td>
                      <td style="width:25%"></td>
                      <td style="width:25%">国药准字号</td>
                      <td style="width:25%"></td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </el-tab-pane>
            <el-tab-pane label="偿付费别(报销比例)设置" name="second" >
               <pay-mentdifference></pay-mentdifference>
            </el-tab-pane>
            <el-tab-pane label="项目内涵" name="third" >
            </el-tab-pane>
            <el-tab-pane label="除外内容" name="four" >
            </el-tab-pane>
            <el-tab-pane label="备注" name="five" >
            </el-tab-pane>
            <el-tab-pane label="说明" name="six" >
            </el-tab-pane>
      </el-tabs>
    </div>
  </div>
</template>
<script>
import paymentdifference from '@/components/payservice/paymentdifference'
export default {
  name: 'search',
  data () {
    return {
      activeName: 'first'
    }
  },
  components: {
    'pay-mentdifference': paymentdifference
  }
}
</script>
<style scoped>

</style>
