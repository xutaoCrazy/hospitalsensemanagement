<template>
  <div class="detailsexpenses-content">
    <div class="main-header">
      <el-form label-width="80px">
        <el-row style="height:100%">
          <el-col :span="24">
            <el-col :span="4">
              <el-form-item label="开始时间">
                <el-date-picker type="date" placeholder="选择日期" style="width:100%"></el-date-picker>
              </el-form-item>
            </el-col>
            <el-col :span="4">
              <el-form-item label="结束时间">
                <el-date-picker type="date" placeholder="选择日期" style="width:100%"></el-date-picker>
              </el-form-item>
            </el-col>
            <el-col :span="16" style="    text-align: left;padding-left: 10px;">
              <el-popover placement="bottom-end" width="330" trigger="click" :visible-arrow="false">
                <el-form label-width="100px" style="margin-bottom:5px!important">
                  <el-form-item label="自费特性">
                    <el-select></el-select>
                  </el-form-item>
                  <el-form-item label="对应关系">
                    <el-select></el-select>
                  </el-form-item>
                  <el-form-item label="项目名称">
                    <el-select></el-select>
                  </el-form-item>
                  <el-form-item label="费用等级">
                    <el-select></el-select>
                  </el-form-item>
                  <el-form-item label="费用类别">
                    <el-select></el-select>
                  </el-form-item>
                  <el-form-item label="上传状态">
                    <el-select></el-select>
                  </el-form-item>
                  <div class="serchbuttom">
                    <el-button type="primary" size="small">查询</el-button>
                  </div>
                </el-form>
                <i
                  class="el-icon-d-arrow-right el-icon-patient-bottom el-icon-patient"
                  slot="reference"
                ></i>
              </el-popover>
              <el-button type="primary" size="small">查询</el-button>
              <el-dropdown>
                <el-button type="primary" size="small">
                  费用上传控制
                  <i class="el-icon-arrow-down el-icon--right"></i>
                </el-button>
                <el-dropdown-menu slot="dropdown">
                  <el-dropdown-item>设置自费项目</el-dropdown-item>
                  <el-dropdown-item>取消设置自费</el-dropdown-item>
                </el-dropdown-menu>
              </el-dropdown>
              <el-button type="primary" size="small">费用明细上传</el-button>
              <el-dropdown>
                <el-button type="primary" size="small">
                  撤销明细上传
                  <i class="el-icon-arrow-down el-icon--right"></i>
                </el-button>
                <el-dropdown-menu slot="dropdown">
                  <el-dropdown-item>全部明细撤销</el-dropdown-item>
                  <el-dropdown-item>已选明细撤销</el-dropdown-item>
                </el-dropdown-menu>
              </el-dropdown>
              <el-button type="primary" size="small">自费协议打印</el-button>
            </el-col>
          </el-col>
        </el-row>
      </el-form>
    </div>
    <div class="main-bottom-header"></div>
    <div class="main-bottom-foter">
      <table>
        <tbody>
          <tr>
            <td>明细总条数</td>
            <td>
              <!-- <el-input size="small"></el-input> -->
            </td>
            <td>未对应条数</td>
            <td>
              <!-- <el-input size="small"></el-input> -->
            </td>
            <td>已对应条数</td>
            <td>
              <!-- <el-input size="small"></el-input> -->
            </td>
            <td>已上传条数</td>
            <td>
              <!-- <el-input size="small"></el-input> -->
            </td>
            <td>未上传条数</td>
            <td>
              <!-- <el-input size="small"></el-input> -->
            </td>
          </tr>
          <tr>
            <td>总金额</td>
            <td>
              <!-- <el-input size="small"></el-input> -->
            </td>
            <td>未对应金额</td>
            <td>
              <!-- <el-input size="small"></el-input> -->
            </td>
            <td>已对应金额</td>
            <td>
              <!-- <el-input size="small"></el-input> -->
            </td>
            <td>已上传金额</td>
            <td>
              <!-- <el-input size="small"></el-input> -->
            </td>
            <td>未上传金额</td>
            <td>
              <!-- <el-input size="small"></el-input> -->
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script>
export default {
  name: "",
  data() {
    return {};
  }
};
</script>

<style  scoped>
.main-header {
  height: 40px;
}
.el-icon-patient-bottom {
  font-size: 18px;
  transform: rotate(90deg);
  cursor: pointer;
  margin-right: 10px;
  float: left;
  margin-top: 8px;
}
.serchbuttom {
  text-align: right;
}
.main-bottom-header {
  height: calc(100% - 101px);
}
.detailsexpenses-content {
  width: 100%;
  height: 100%;
}
.main-bottom-foter {
  height: 60px;
}
.main-bottom-foter table tbody td {
  border: solid 1px #e4e4e4;
}
.main-bottom-foter table tbody > tr > td:nth-child(odd) {
  width: 100px;
  height: 30px;
  background: #f5f8fa;
}
.main-bottom-foter table tbody > tr > td:nth-child(even) {
  width: 100px;
}
.main-bottom-foter table {
  width: 100%;
  height: 30px;
}
</style>