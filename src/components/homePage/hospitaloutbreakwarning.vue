<template>
  <div class="contain-warning">
    <el-row>
      <el-col :span="6" style="padding-right:5px">
        <div class="search-time">
          <el-form ref="form" label-width="80px">
            <el-form-item label="上报日期">
              <el-col :span="11">
                <el-date-picker type="date" placeholder="选择日期" style="width: 100%;"></el-date-picker>
              </el-col>
              <el-col class="line" :span="2">-</el-col>
              <el-col :span="11">
                <el-date-picker type="date" placeholder="选择日期" style="width: 100%;"></el-date-picker>
              </el-col>
            </el-form-item>
            <el-form-item label="上报科室">
              <el-col :span="11">
                <el-select placeholder="请选择科室"></el-select>
              </el-col>
              <el-col class="line" :span="2"></el-col>
              <el-col :span="11">
                <el-button type="primary" size="small">查询</el-button>
              </el-col>
            </el-form-item>
          </el-form>
        </div>
        <div class="search-time-bottom">
          <el-tabs v-model="activeName" @tab-click="tabsClick">
            <el-tab-pane label="待处理" name="first">
              <div class="contain-table-waring">
                <el-table height="100%" style="width: 100%" index="1">
                  <el-table-column label="科室"></el-table-column>
                  <el-table-column label="事件数"></el-table-column>
                  <el-table-column label="概要"></el-table-column>
                </el-table>
              </div>
            </el-tab-pane>
            <el-tab-pane label="已处理" name="second">
              <el-table height="100%" style="width: 100%" index="1">
                <el-table-column label="科室"></el-table-column>
                <el-table-column label="事件数"></el-table-column>
                <el-table-column label="概要"></el-table-column>
              </el-table>
            </el-tab-pane>
          </el-tabs>
          <a class="threshold" @click="dialogstitutions=true">阈值</a>
        </div>
      </el-col>
      <el-col :span="18" style="padding-left:5px">
        <el-container>
          <el-header>
            <p class="p-hearder">
              <span class="p-checkbox">爆发详情</span>
              <span class="p-checkbox" v-show="exclude">
                <el-checkbox-group v-model="type">
                  <el-checkbox label="确认" name="type"></el-checkbox>
                  <el-checkbox label="排除" name="type"></el-checkbox>
                  <el-checkbox label="干预" name="type"></el-checkbox>
                </el-checkbox-group>
              </span>
            </p>
          </el-header>
          <el-main>
            <div class="contain-table-waring">
              <el-table height="100%" style="width: 100%" index="1">
                <el-table-column label="开始日期" v-show="exclude"></el-table-column>
                <el-table-column label="结束日期"></el-table-column>
                <el-table-column label="科室"></el-table-column>
                <el-table-column label="周期"></el-table-column>
                <el-table-column label="数量"></el-table-column>
                <el-table-column label="发生原因"></el-table-column>
                <el-table-column label="检测日期"></el-table-column>
                <el-table-column label="状态"></el-table-column>
                <el-table-column label="操作人"></el-table-column>
                <el-table-column label="操作时间"></el-table-column>
              </el-table>
            </div>
          </el-main>
        </el-container>
      </el-col>
    </el-row>
    <el-dialog
      title="阈值配置"
      width="400px"
      :visible.sync="dialogstitutions"
      :close-on-click-modal="false"
    >
      <el-form label-width="85px" ref="parms" class="demo-ruleForm">
        <el-row>
          <el-col :span="24">
            <p class="p-width">
              <span>发热</span>
            </p>
            <div class="threshold-conatin">
              <el-col :span="4">
                <div>
                  <el-switch v-model="value"></el-switch>
                </div>
              </el-col>
              <el-col :span="20">
                <div>
                  <span>观察</span>
                  <el-input type="number" class="i-width"></el-input>
                  <span>天出现了</span>
                  <el-input type="number" class="i-width"></el-input>
                  <span>例以上</span>
                </div>
              </el-col>
            </div>
          </el-col>
          <el-col :span="24">
            <p class="p-width">
              <span>腹泻</span>
            </p>
            <div class="threshold-conatin">
              <el-col :span="4">
                <div>
                  <el-switch v-model="value"></el-switch>
                </div>
              </el-col>
              <el-col :span="20">
                <div>
                  <span>观察</span>
                  <el-input type="number" class="i-width"></el-input>
                  <span>天出现了</span>
                  <el-input type="number" class="i-width"></el-input>
                  <span>例以上</span>
                </div>
              </el-col>
            </div>
          </el-col>
          <el-col :span="24">
            <p class="p-width">
              <span>大便常规</span>
            </p>
            <div class="threshold-conatin">
              <el-col :span="4">
                <div>
                  <el-switch v-model="value"></el-switch>
                </div>
              </el-col>
              <el-col :span="20">
                <div>
                  <span>观察</span>
                  <el-input type="number" class="i-width"></el-input>
                  <span>天出现了</span>
                  <el-input type="number" class="i-width"></el-input>
                  <span>例以上</span>
                </div>
              </el-col>
            </div>
          </el-col>
          <el-col :span="24">
            <p class="p-width">
              <span>血培养</span>
            </p>
            <div class="threshold-conatin">
              <el-col :span="4">
                <div>
                  <el-switch v-model="value"></el-switch>
                </div>
              </el-col>
              <el-col :span="20">
                <div>
                  <span>观察</span>
                  <el-input type="number" class="i-width"></el-input>
                  <span>天出现了</span>
                  <el-input type="number" class="i-width"></el-input>
                  <span>例以上</span>
                </div>
              </el-col>
            </div>
          </el-col>
          <el-col :span="24">
            <p class="p-width">
              <span>感染部位</span>
            </p>
            <div class="threshold-conatin">
              <el-col :span="4">
                <div>
                  <el-switch v-model="value"></el-switch>
                </div>
              </el-col>
              <el-col :span="20">
                <div>
                  <span>观察</span>
                  <el-input type="number" class="i-width"></el-input>
                  <span>天出现了</span>
                  <el-input type="number" class="i-width"></el-input>
                  <span>例以上</span>
                </div>
              </el-col>
            </div>
          </el-col>
          <el-col :span="24">
            <p class="p-width">
              <span>相同耐药普</span>
            </p>
            <div class="threshold-conatin">
              <el-col :span="4">
                <div>
                  <el-switch v-model="value"></el-switch>
                </div>
              </el-col>
              <el-col :span="20">
                <div>
                  <span>观察</span>
                  <el-input type="number" class="i-width"></el-input>
                  <span>天出现了</span>
                  <el-input type="number" class="i-width"></el-input>
                  <span>例以上</span>
                </div>
              </el-col>
            </div>
          </el-col>
          <el-col :span="24">
            <p class="p-width">
              <span>病原体</span>
            </p>
            <div class="threshold-conatin">
              <el-col :span="4">
                <div>
                  <el-switch v-model="value"></el-switch>
                </div>
              </el-col>
              <el-col :span="20">
                <div>
                  <span>观察</span>
                  <el-input type="number" class="i-width"></el-input>
                  <span>天出现了</span>
                  <el-input type="number" class="i-width"></el-input>
                  <span>例以上</span>
                </div>
              </el-col>
            </div>
          </el-col>
          <el-col :span="24">
            <p class="p-width">
              <span>痰培养</span>
            </p>
            <div class="threshold-conatin">
              <el-col :span="4">
                <div>
                  <el-switch v-model="value"></el-switch>
                </div>
              </el-col>
              <el-col :span="20">
                <div>
                  <span>观察</span>
                  <el-input type="number" class="i-width"></el-input>
                  <span>天出现了</span>
                  <el-input type="number" class="i-width"></el-input>
                  <span>例以上</span>
                </div>
              </el-col>
            </div>
          </el-col>
        </el-row>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button type="primary" size="small">保 存</el-button>
        <el-button size="small" @click="dialogstitutions=false">取 消</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
export default {
  name: "",
  data() {
    return {
      activeName: "first",
      dialogstitutions: false,
      value: true,
      type: [],
      exclude: false
    };
  },
  methods: {
    tabsClick(tab, event) {
      tab.index == "0" ? (this.exclude = false) : (this.exclude = true);
    }
  }
};
</script>

<style scoped>
.contain-warning {
  width: 100%;
  height: 100%;
  padding: 5px 10px;
}
.el-row {
  height: 100%;
}
.el-col {
  height: 100%;
}
.search-time {
  height: 85px;
}
.search-time-bottom {
  height: calc(100% - 85px);
  position: relative;
}
.el-tabs {
  height: 100%;
}
.contain-table-waring {
  width: 100%;
  height: 100%;
  border: solid 1px #e4e4e4;
}
.el-col-8 {
  padding-right: 10px;
  border-right: solid 1px #e4e4e4;
}
.el-col-16 {
  padding-left: 10px;
}
.threshold {
  position: absolute;
  top: 15px;
  right: 0px;
  cursor: pointer;
}
.threshold-conatin {
}
.i-width {
  width: 60px;
}
.p-width {
  text-align: left;
  padding-left: 15px;
  margin-bottom: 5px;
}
.el-header {
  height: 40px !important;
}
.el-main {
  height: calc(100% - 40px) !important;
}
.is-vertical {
  height: 100% !important;
}
.p-hearder {
  text-align: left;
  border-bottom: solid 1px #e4e4e4;
  height: 33px;
  line-height: 33px;
}
.p-checkbox {
  margin-left: 10px;
}
.p-checkbox {
  display: block;
  float: left;
}
.el-checkbox {
  margin-right: 20px !important;
}
</style>