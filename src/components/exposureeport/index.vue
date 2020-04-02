<template>
  <div class="repotcard exposureeport">
    <el-container>
      <el-main>
        <div class="reportcard-contain">
          <div class="title">
            <p>四川泌尿外科医院</p>
            <p>医务人员职业暴露报告卡</p>
          </div>
          <el-row>
            <el-col :span="24">
              <el-col :span="6" class="el-margin">
                <div class="r-col">
                  <div class="r-col-label r-col-row">
                    <label>1.病人姓名:</label>
                  </div>
                  <div class="r-col_input r-col-row">
                    <el-input></el-input>
                  </div>
                </div>
              </el-col>
              <el-col :span="4" class="el-margin">
                <div class="r-col">
                  <div class="r-col-label r-col-row r-col-tow">
                    <label>2.性别:</label>
                  </div>
                  <div class="r-col_input r-col-row r-col-tow-input">
                    <el-input></el-input>
                  </div>
                </div>
              </el-col>
              <el-col :span="6" class="el-margin">
                <div class="r-col">
                  <el-col :span="22">
                    <div class="r-col-label r-col-row">
                      <label>3.在院工龄:</label>
                    </div>
                    <div class="r-col_input r-col-row">
                      <el-input></el-input>
                    </div>
                  </el-col>
                  <el-col :span="2">
                    <span>年</span>
                  </el-col>
                </div>
              </el-col>
              <el-col :span="4" class="el-margin">
                <div class="r-col">
                  <div class="r-col-label r-col-row r-col-tow">
                    <label>4.科室:</label>
                  </div>
                  <div class="r-col_input r-col-row r-col-tow-input">
                    <el-input></el-input>
                  </div>
                </div>
              </el-col>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="24">
              <el-col :span="8" class="el-margin">
                <div class="r-col-lable">
                  <div class style="width:50%">
                    <label>5.本人联系电话:</label>
                  </div>
                  <div class="r-col_input">
                    <el-input></el-input>
                  </div>
                </div>
              </el-col>
              <el-col :span="6" class="el-margin">
                <div class="r-col-lable">
                  <div class style="width:50%">
                    <label>6.发生日期:</label>
                  </div>
                  <div class="r-col_input">
                    <el-input></el-input>
                  </div>
                </div>
              </el-col>
              <el-col :span="8" class="el-margin">
                <div class="r-col-lable">
                  <div class style="width:30%">
                    <label>时间:</label>
                  </div>
                  <div class="r-col_input">
                    <el-col :span="14">
                      <el-input></el-input>
                    </el-col>
                    <el-col :span="10">(24小时制)</el-col>
                  </div>
                </div>
              </el-col>
            </el-col>
          </el-row>
          <el-row class="el-row-margin" style="margin-left:7px">
            <el-col :span="24">
              <el-col :span="24" class="el-margin">
                <div class="r-col-lable">
                  <div class>
                    <label>7.暴露方式:</label>
                  </div>
                  <div>
                    <span class="el-checkbox-margin">①接触暴露</span>
                    <el-checkbox-group v-model="checkList" style="display:contents">
                      <el-checkbox label="皮肤"></el-checkbox>
                      <el-checkbox label="有破损"></el-checkbox>
                      <el-checkbox label="无破损"></el-checkbox>
                      <el-checkbox label="黏膜"></el-checkbox>
                      <el-checkbox label="②针刺或锐器割伤"></el-checkbox>
                    </el-checkbox-group>
                  </div>
                </div>
              </el-col>
            </el-col>
          </el-row>
          <el-row class="el-row-margin" style="margin-left:18px">
            <el-col :span="24">
              <el-col :span="24" class="el-margin">
                <div class="r-col-lable">
                  <div class="el-checkbox-margin">
                    <label>暴露前是否接种过乙肝疫苗:</label>
                  </div>
                  <div>
                    <el-checkbox-group v-model="checkList" style="display:contents">
                      <el-checkbox label="1 是"></el-checkbox>
                      <el-checkbox label="2 不是"></el-checkbox>
                    </el-checkbox-group>
                  </div>
                </div>
              </el-col>
            </el-col>
          </el-row>
          <el-row class="el-row-margin" style="margin-left:10px">
            <el-col :span="24">
              <el-col :span="24" class="el-margin">
                <div class="r-col-lable" style="margin-left:10px">
                  <div class="el-checkbox-margin">
                    <label>如果接种过乙肝疫苗请回答注射时间:</label>
                  </div>
                  <div>
                    <el-checkbox-group v-model="checkList" style="display:contents">
                      <el-checkbox label="≤5年"></el-checkbox>
                      <el-checkbox label=">5年"></el-checkbox>
                      <el-checkbox label=">10年"></el-checkbox>
                    </el-checkbox-group>
                  </div>
                </div>
              </el-col>
            </el-col>
          </el-row>
          <el-row class="el-row-margin" style="margin-left:10px">
            <el-col :span="24">
              <el-col :span="24" class="el-margin">
                <div class="r-col-lable">
                  <div class="el-checkbox-margin">
                    <label>8.工作类别:</label>
                  </div>
                </div>
              </el-col>
            </el-col>
          </el-row>

          <el-row class="el-row-margin" style="margin-left:23px">
            <el-col :span="24">
              <el-col :span="24" class="el-margin">
                <div class="r-col-lable" style="height:130px">
                  <div class="el-checkbox-margin">
                    <!-- <el-col :span="12"> -->
                    <el-radio-group>
                      <el-col :span="12" style="width: 257px; text-align: left;margin-right:55px">
                        <el-radio v-for="(item ,index ) in jobcategory" :key="item.id" v-if='(index+1)<=5'>{{item.lable}}</el-radio>
                      </el-col>
                      <el-col :span="12" style="width: 190px; text-align: left;">
                         <el-radio v-for="(item ,index ) in jobcategory" :key="item.id" v-if='(index+1)>5'>{{item.lable}}</el-radio>
                      </el-col>
                    </el-radio-group>
                  </div>
                </div>
              </el-col>
            </el-col>
          </el-row>
          <el-row class="el-row-margin" style="margin-left:10px">
            <el-col :span="24">
              <el-col :span="24" class="el-margin">
                <div class="r-col-lable">
                  <div class="el-checkbox-margin">
                    <label>9.暴露发生地点:(请选择)</label>
                  </div>
                </div>
              </el-col>
            </el-col>
          </el-row>
          <el-row class="el-row-margin" style="margin-left:23px">
            <el-col :span="24">
              <el-col :span="24" class="el-margin">
                <div class="r-col-lable" style="height:200px">
                  <div class="el-checkbox-margin">
                    <el-checkbox-group v-model="checkList" style="display:contents">
                      <el-col :span="12" style="width:148px;margin-right: 134px;">
                        <el-checkbox v-for='(item,index) in  placeexposureArr' :key='item.id' :label='item.id'   v-if='(index+1)<=6'>{{item.lable}}</el-checkbox>
                      </el-col>
                      <el-col :span="12" style="width: 193px;">
                         <el-checkbox v-for='(item,index) in  placeexposureArr' :key='item.id'  :label='item.id'   v-if='(index+1)>6'>{{item.lable}}</el-checkbox>
                      </el-col>
                    </el-checkbox-group>
                  </div>
                </div>
              </el-col>
            </el-col>
          </el-row>
          <el-row class="el-row-margin" style="margin-left:10px">
            <el-col :span="24">
              <el-col :span="24" class="el-margin">
                <div class="r-col-lable">
                  <div class="el-checkbox-margin">
                    <label>10.受伤前是否知道病人有无经血传播的疾病</label>
                  </div>
                </div>
              </el-col>
            </el-col>
          </el-row>
          <el-row class="el-row-margin" style="margin-left:23px">
            <el-col :span="24">
              <el-col :span="24" class="el-margin">
                <div class="r-col-lable">
                  <div class="el-checkbox-margin">
                    <el-radio-group v-model="radio">
                      <el-radio :label="3">知道</el-radio>
                      <el-radio :label="6">不知道</el-radio>
                    </el-radio-group>
                  </div>
                </div>
              </el-col>
            </el-col>
          </el-row>
          <el-row class="el-row-margin" style="margin-left:10px">
            <el-col :span="24">
              <el-col :span="24" class="el-margin">
                <div class="r-col-lable">
                  <div class="el-checkbox-margin">
                    <label>11.受伤者是否是器械的最初使用者</label>
                  </div>
                </div>
              </el-col>
            </el-col>
          </el-row>
          <el-row class="el-row-margin" style="margin-left:23px">
            <el-col :span="24">
              <el-col :span="24" class="el-margin">
                <div class="r-col-lable">
                  <div class="el-checkbox-margin">
                    <el-radio-group v-model="radio">
                      <el-radio :label="3">1 是</el-radio>
                      <el-radio :label="6">2 不是</el-radio>
                    </el-radio-group>
                  </div>
                </div>
              </el-col>
            </el-col>
          </el-row>
          <el-row class="el-row-margin" style="margin-left:10px">
            <el-col :span="24">
              <el-col :span="24" class="el-margin">
                <div class="r-col-lable">
                  <div class="el-checkbox-margin">
                    <label>12.造成损伤的器械类型</label>
                  </div>
                </div>
              </el-col>
            </el-col>
          </el-row>
          <el-row class="el-row-margin" style="margin-left:23px">
            <el-col :span="24">
              <el-col :span="24" class="el-margin">
                <div class="r-col-lable" style="height:50px;text-align:left">
                  <div class="el-checkbox-margin">
                    <el-radio-group v-model="radio">
                      <el-radio v-for='item in instrumentArr' :key='item.id' :label='item.id' >{{item.lable}}</el-radio>
                      <!-- <el-radio :label="3">注射针头</el-radio>
                      <el-radio :label="6">头皮针</el-radio>
                      <el-radio :label="6">缝合针</el-radio>
                      <el-radio :label="6">手术刀</el-radio>
                      <el-radio :label="6">剪刀</el-radio>
                      <el-radio :label="6">血糖针</el-radio>
                      <el-radio :label="6">玻璃</el-radio>
                      <el-radio :label="6">特殊穿针刺</el-radio>
                      <el-radio :label="6">其他</el-radio> -->
                    </el-radio-group>
                  </div>
                </div>
              </el-col>
            </el-col>
          </el-row>
          <el-row class="el-row-margin" style="margin-left:10px">
            <el-col :span="24">
              <el-col :span="24" class="el-margin">
                <div class="r-col-lable">
                  <div class="el-checkbox-margin">
                    <label>13.器械是否受污染</label>
                  </div>
                </div>
              </el-col>
            </el-col>
          </el-row>
          <el-row class="el-row-margin" style="margin-left:23px">
            <el-col :span="24">
              <el-col :span="24" class="el-margin">
                <div class="r-col-lable" style="text-align:left">
                  <div class="el-checkbox-margin">
                    <el-radio-group v-model="radio" style="margin-right:30px">
                      <el-radio :label="3">1.污染(已知接触过病人或被污染)</el-radio>
                    </el-radio-group>====》是否可见到血液？
                    <el-radio-group v-model="radio">
                      <el-radio :label="3">是</el-radio>
                      <el-radio :label="3">否</el-radio>
                    </el-radio-group>
                  </div>
                </div>
              </el-col>
            </el-col>
          </el-row>
          <el-row class="el-row-margin" style="margin-left:23px">
            <el-col :span="24">
              <el-col :span="24" class="el-margin">
                <div class="r-col-lable" style="text-align:left">
                  <div class="el-checkbox-margin">
                    <el-radio-group v-model="radio" style="margin-right:163px">
                      <el-radio :label="3">2.未受污染(未曾接触过病人或被感染)</el-radio>
                    </el-radio-group>

                    <el-radio-group v-model="radio">
                      <el-radio :label="3">是</el-radio>
                      <el-radio :label="3">否</el-radio>
                    </el-radio-group>
                  </div>
                </div>
              </el-col>
            </el-col>
          </el-row>
          <el-row class="el-row-margin" style="margin-left:10px">
            <el-col :span="24">
              <el-col :span="24" class="el-margin">
                <div class="r-col-lable">
                  <div class="el-checkbox-margin">
                    <label>14.锐器最初是用作什么目的</label>
                  </div>
                </div>
              </el-col>
            </el-col>
          </el-row>
          <el-row class="el-row-margin" style="margin-left:23px">
            <el-col :span="24">
              <el-col :span="24" class="el-margin">
                <div class="r-col-lable" style="height:214px">
                  <div class="el-checkbox-margin">
                    <el-radio-group>
                      <el-col :span="12" style="width: 257px; text-align: left;margin-right:100px">
                        <el-radio>1 不知道</el-radio>
                        <el-radio>2 肌肉/皮下注射或其他侵入性注射（注射器）</el-radio>
                        <el-radio>3静脉注射液</el-radio>
                        <el-radio>4经肝素帽封管</el-radio>
                        <el-radio>5连接静脉输液管路</el-radio>
                        <el-radio>6经输液器加药</el-radio>
                        <el-radio>7抽取静脉血标本</el-radio>
                        <el-radio>8 抽取体液或组织标本</el-radio>
                      </el-col>
                      <el-col :span="12" style="width: 190px; text-align: left;">
                        <el-radio>9 抽取指尖/脚跟采血（测血糖等）</el-radio>
                        <el-radio>10缝合/剪断</el-radio>
                        <el-radio>11切开</el-radio>
                        <el-radio>12 冲洗伤口</el-radio>
                        <el-radio>13放置动脉/静脉导管</el-radio>
                        <el-radio>14操作练习</el-radio>
                        <el-radio>15抽取动脉血标本</el-radio>
                        <el-radio>16其他</el-radio>
                      </el-col>
                    </el-radio-group>
                  </div>
                </div>
              </el-col>
            </el-col>
          </el-row>
          <el-row class="el-row-margin" style="margin-left:10px">
            <el-col :span="24">
              <el-col :span="24" class="el-margin">
                <div class="r-col-lable">
                  <div class="el-checkbox-margin">
                    <label>15.是否经过有关职业暴露操作预防的培训</label>
                  </div>
                </div>
              </el-col>
            </el-col>
          </el-row>
          <el-row class="el-row-margin" style="margin-left:23px">
            <el-col :span="24">
              <el-col :span="24" class="el-margin">
                <div class="r-col-lable">
                  <div class="el-checkbox-margin">
                    <el-radio-group v-model="radio">
                      <el-radio :label="3">1 是</el-radio>
                      <el-radio :label="6">2 不是</el-radio>
                    </el-radio-group>
                  </div>
                </div>
              </el-col>
            </el-col>
          </el-row>
          <el-row class="el-row-margin" style="margin-left:10px">
            <el-col :span="24">
              <el-col :span="24" class="el-margin">
                <div class="r-col-lable">
                  <div class="el-checkbox-margin">
                    <label>16.伤害的发生有无正确操作</label>
                  </div>
                </div>
              </el-col>
            </el-col>
          </el-row>
          <el-row class="el-row-margin" style="margin-left:23px">
            <el-col :span="24">
              <el-col :span="24" class="el-margin">
                <div class="r-col-lable">
                  <div class="el-checkbox-margin">
                    <el-radio-group v-model="radio">
                      <el-radio :label="3">1 是</el-radio>
                      <el-radio :label="6">2 不是</el-radio>
                    </el-radio-group>
                  </div>
                </div>
              </el-col>
            </el-col>
          </el-row>
          <el-row class="el-row-margin" style="margin-left:10px">
            <el-col :span="24">
              <el-col :span="24" class="el-margin">
                <div class="r-col-lable">
                  <div class="el-checkbox-margin">
                    <label>17.如果受伤与病人有关，请选择病人的带病情况</label>
                  </div>
                </div>
              </el-col>
            </el-col>
          </el-row>
          <el-row class="el-row-margin" style="margin-left:23px">
            <el-col :span="24">
              <el-col :span="24" class="el-margin">
                <div class="r-col-lable">
                  <div class="el-checkbox-margin">
                    <el-radio-group v-model="radio">
                      <el-radio :label="3">无</el-radio>
                      <el-radio :label="6">乙肝</el-radio>
                      <el-radio :label="6">丙肝</el-radio>
                      <el-radio :label="6">艾滋病</el-radio>
                      <el-radio :label="6">梅毒</el-radio>
                      <el-radio :label="6">不知道</el-radio>
                      <el-radio :label="6">其他</el-radio>
                    </el-radio-group>
                  </div>
                </div>
              </el-col>
            </el-col>
          </el-row>
          <el-row class="el-row-margin" style="margin-left:10px">
            <el-col :span="24">
              <el-col :span="24" class="el-margin">
                <div class="r-col-lable">
                  <div class="el-checkbox-margin">
                    <label>18.伤害发生的操作环节</label>
                  </div>
                </div>
              </el-col>
            </el-col>
          </el-row>
          <el-row class="el-row-margin" style="margin-left:23px">
            <el-col :span="24">
              <p style="text-align:left">操作前准备</p>
              <el-col :span="24" class="el-margin">
                <div class="r-col-lable" style="height:164px">
                  <div class="el-checkbox-margin">
                    <el-col :span="12" style="width:148px;margin-right: 169px;">
                      <el-checkbox-group v-model="checkList" style="display:contents">
                        <el-checkbox label="拔去针帽时"></el-checkbox>
                        <el-checkbox label="安装针头时"></el-checkbox>
                        <el-checkbox label="抽取药液时"></el-checkbox>
                        <el-checkbox label="抽取药液时"></el-checkbox>
                        <el-checkbox label="套上针帽或安瓿"></el-checkbox>
                      </el-checkbox-group>
                    </el-col>
                    <el-col :span="12" style="width: 174px;">
                      <el-checkbox-group v-model="checkList" style="display:contents">
                        <el-checkbox label="治疗时"></el-checkbox>
                        <el-checkbox label="手术中(缝合或切开时)"></el-checkbox>
                        <el-checkbox label="将血标本注入试管时"></el-checkbox>
                        <el-checkbox label="病人躁动时"></el-checkbox>
                        <el-checkbox label="配合医生或其他工作人员操作时"></el-checkbox>
                      </el-checkbox-group>
                    </el-col>
                  </div>
                </div>
              </el-col>
            </el-col>
          </el-row>
          <el-row class="el-row-margin" style="margin-left:23px">
            <el-col :span="24">
              <p style="text-align:left">操作中(治疗、检查、手术)</p>
              <el-col :span="24" class="el-margin">
                <div class="r-col-lable" style="height:164px">
                  <div class="el-checkbox-margin">
                    <el-col :span="12" style="width:184px;margin-right: 134px;">
                      <el-checkbox-group v-model="checkList" style="display:contents">
                        <el-checkbox label>经皮注射时</el-checkbox>
                        <el-checkbox label>经皮拔针时</el-checkbox>
                        <el-checkbox label>静脉穿刺时</el-checkbox>
                        <el-checkbox label>静脉加药时</el-checkbox>
                        <el-checkbox label>换输液瓶时</el-checkbox>
                      </el-checkbox-group>
                    </el-col>
                    <el-col :span="12" style="width: 182px;">
                      <el-checkbox-group v-model="checkList" style="display:contents">
                        <el-checkbox label>静脉封管时</el-checkbox>
                        <el-checkbox label>输液结束拔针时</el-checkbox>
                        <el-checkbox label>传递锐器时</el-checkbox>
                        <el-checkbox label>取活检时</el-checkbox>
                        <el-checkbox label>检查时</el-checkbox>
                      </el-checkbox-group>
                    </el-col>
                  </div>
                </div>
              </el-col>
            </el-col>
          </el-row>
          <el-row class="el-row-margin" style="margin-left:23px">
            <el-col :span="24">
              <p style="text-align:left">操作后整理用物</p>
              <el-col :span="24" class="el-margin">
                <div class="r-col-lable" style="height:165px">
                  <div class="el-checkbox-margin">
                    <el-col :span="12" style="width:148px;margin-right: 134px;">
                      <el-checkbox-group v-model="checkList" style="display:contents">
                        <el-checkbox label>给针头回套针帽</el-checkbox>
                        <el-checkbox label>使用后分离针头与注射器</el-checkbox>
                        <el-checkbox label>整理用毕的锐器物时</el-checkbox>
                        <el-checkbox label>准备可重复使用的锐器物品</el-checkbox>
                        <el-checkbox label>被不适当放置的锐器物刺伤</el-checkbox>
                      </el-checkbox-group>
                    </el-col>
                  </div>
                </div>
              </el-col>
            </el-col>
          </el-row>
          <el-row class="el-row-margin" style="margin-left:23px">
            <el-col :span="24">
              <p style="text-align:left">处理废弃物</p>
              <el-col :span="24" class="el-margin">
                <div class="r-col-lable" style="height:90px">
                  <div class="el-checkbox-margin">
                    <el-col :span="12" style="width:148px;margin-right: 134px;">
                      <el-checkbox-group v-model="checkList" style="display:contents">
                        <el-checkbox label>丢弃前针头等锐器物处理时</el-checkbox>
                        <el-checkbox label>运送锐器废物时</el-checkbox>
                      </el-checkbox-group>
                    </el-col>
                    <el-col :span="12" style="width: 193px;">
                      <el-checkbox-group v-model="checkList" style="display:contents">
                        <el-checkbox label>被突出于锐器盒开口的锐器刺伤</el-checkbox>
                        <el-checkbox label>被刺穿于废物收集箱/盒的尖锐物刺伤</el-checkbox>
                      </el-checkbox-group>
                    </el-col>
                  </div>
                </div>
              </el-col>
            </el-col>
          </el-row>
          <el-row class="el-row-margin" style="margin-left:10px">
            <el-col :span="24">
              <el-col :span="24" class="el-margin">
                <div class="r-col-lable">
                  <div class="el-checkbox-margin">
                    <label>20.受伤后伤口处理情况</label>
                  </div>
                </div>
              </el-col>
            </el-col>
          </el-row>
          <el-row class="el-row-margin" style="margin-left:23px">
            <el-col :span="24">
              <el-col :span="24" class="el-margin">
                <div class="r-col-lable" style="height:75px">
                  <div class="el-checkbox-margin">
                    <el-col :span="12" style="width:148px;margin-right: 134px;">
                      <el-checkbox-group v-model="checkList" style="display:contents">
                        <el-checkbox label>未处理</el-checkbox>
                        <el-checkbox label>挤出伤口的血并消毒</el-checkbox>
                        <el-checkbox label>清创缝合</el-checkbox>
                      </el-checkbox-group>
                    </el-col>
                    <el-col :span="12" style="width: 193px;">
                      <el-checkbox-group v-model="checkList" style="display:contents">
                        <el-checkbox label>挤出血，肥皂液流动水清洗并消毒</el-checkbox>
                        <el-checkbox label>冲洗黏膜</el-checkbox>
                        <el-checkbox label>挤出伤口的血</el-checkbox>
                      </el-checkbox-group>
                    </el-col>
                  </div>
                </div>
              </el-col>
            </el-col>
          </el-row>
          <el-row class="el-row-margin" style="margin-left:10px">
            <el-col :span="24">
              <el-col :span="24" class="el-margin">
                <div class="r-col-lable">
                  <div class="el-checkbox-margin">
                    <label>21.如果受伤部位是手，锐器穿透了</label>
                  </div>
                </div>
              </el-col>
            </el-col>
          </el-row>
          <el-row class="el-row-margin" style="margin-left:23px">
            <el-col :span="24">
              <el-col :span="24" class="el-margin">
                <div class="r-col-lable">
                  <div class="el-checkbox-margin">
                    <el-radio-group v-model="radio">
                      <el-radio>一层手套</el-radio>
                      <el-radio>双层手套</el-radio>
                      <el-radio>没戴手套</el-radio>
                    </el-radio-group>
                  </div>
                </div>
              </el-col>
            </el-col>
          </el-row>
          <el-row class="el-row-margin" style="margin-left:10px">
            <el-col :span="24">
              <el-col :span="24" class="el-margin">
                <div class="r-col-lable">
                  <div class="el-checkbox-margin">
                    <label>22.受伤程度:</label>
                  </div>
                </div>
              </el-col>
            </el-col>
          </el-row>
          <el-row class="el-row-margin" style="margin-left:23px">
            <el-col :span="24">
              <el-col :span="24" class="el-margin">
                <div class="r-col-lable">
                  <div class="el-checkbox-margin">
                    <el-radio-group v-model="radio">
                      <el-radio>轻度(表皮刺伤，未出血或滴出血)</el-radio>
                      <el-radio>中度(皮肤刺伤，有流血)</el-radio>
                      <el-radio>重度(深层刺伤、大量流血)</el-radio>
                    </el-radio-group>
                  </div>
                </div>
              </el-col>
            </el-col>
          </el-row>
          <el-row class="el-row-margin" style="margin-left:10px">
            <el-col :span="24">
              <el-col :span="24" class="el-margin">
                <div class="r-col-lable">
                  <div class="el-checkbox-margin">
                    <label>23.锐器使用者是:</label>
                  </div>
                </div>
              </el-col>
            </el-col>
          </el-row>
          <el-row class="el-row-margin" style="margin-left:23px">
            <el-col :span="24">
              <el-col :span="24" class="el-margin">
                <div class="r-col-lable">
                  <div class="el-checkbox-margin">
                    <el-radio-group v-model="radio">
                      <el-radio>习惯左手操作</el-radio>
                      <el-radio>习惯右手操作</el-radio>
                    </el-radio-group>
                  </div>
                </div>
              </el-col>
            </el-col>
          </el-row>
          <el-row class="el-row-margin" style="margin-left:10px">
            <el-col :span="24">
              <el-col :span="24" class="el-margin">
                <div class="r-col-lable">
                  <div class="el-checkbox-margin">
                    <label>23.受伤后伤口处理情况</label>
                  </div>
                </div>
              </el-col>
            </el-col>
          </el-row>
          <el-row class="el-row-margin" style="margin-left:23px">
            <el-col :span="24">
              <el-col :span="24" class="el-margin">
                <div class="r-col-lable" style="height:84px">
                  <div class="el-checkbox-margin">
                    <el-col :span="12" style="width:148px;margin-right: 134px;">
                      <el-checkbox-group v-model="checkList" style="display:contents">
                        <el-checkbox label>未处理</el-checkbox>
                        <el-checkbox label>挤出伤口的血并消毒</el-checkbox>
                        <el-checkbox label>清创缝合</el-checkbox>
                      </el-checkbox-group>
                    </el-col>
                    <el-col :span="12" style="width: 193px;">
                      <el-checkbox-group v-model="checkList" style="display:contents">
                        <el-checkbox label>挤出血，肥皂液流动水清洗并消毒</el-checkbox>
                        <el-checkbox label>冲洗黏膜</el-checkbox>
                        <el-checkbox label>挤出伤口的血</el-checkbox>
                      </el-checkbox-group>
                    </el-col>
                  </div>
                </div>
              </el-col>
            </el-col>
          </el-row>
          <el-row class="el-row-margin" style="margin-left:10px">
            <el-col :span="24">
              <el-col :span="24" class="el-margin">
                <div class="r-col-lable">
                  <div class="el-checkbox-margin">
                    <label>24.请注明:</label>
                  </div>
                </div>
              </el-col>
            </el-col>
          </el-row>
          <el-row class="el-row-margin" style="margin-left:23px">
            <el-col :span="24">
              <el-col :span="24" class="el-margin">
                <div class="r-col-lable" style="height:258px">
                  <div class="el-checkbox-margin">
                    <el-col :span="12" style="width:245px;">
                      <div class="r-col-lable">
                        <div class style="width:55%">
                          <label>伤害发生的位置号码:</label>
                        </div>
                        <div class="r-col_input" style="width:100px">
                          <el-input></el-input>
                        </div>
                      </div>
                    </el-col>
                    <el-col :span="12" style="width: 400px;">
                      <el-image :src="require('@/assets/img/head.jpg')" :fit="fit"></el-image>
                    </el-col>
                  </div>
                </div>
              </el-col>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="24">
              <el-col :span="8" class="el-margin">
                <div class="r-col-lable">
                  <div class style="width:50%">
                    <label>25.填报时间:</label>
                  </div>
                  <div class="r-col_input">
                    <el-input></el-input>
                  </div>
                </div>
              </el-col>
              <el-col :span="6" class="el-margin">
                <div class="r-col-lable">
                  <div class style="width:50%">
                    <label>填报人</label>
                  </div>
                  <div class="r-col_input">
                    <el-input></el-input>
                  </div>
                </div>
              </el-col>
            </el-col>
          </el-row>
          <el-row class="el-row-margin" style="margin-left:10px">
            <el-col :span="24">
              <el-col :span="24" class="el-margin">
                <div class="r-col-lable">
                  <div class="el-checkbox-margin">
                    <label>26.科室核实意见:</label>
                  </div>
                </div>
              </el-col>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="24">
              <el-col :span="8" class="el-margin">
                <div class="r-col-lable">
                  <div class style="width:50%">
                    <label>主任:</label>
                  </div>
                  <div class="r-col_input">
                    <el-input></el-input>
                  </div>
                </div>
              </el-col>
              <el-col :span="6" class="el-margin">
                <div class="r-col-lable">
                  <div class style="width:50%">
                    <label>护士长：</label>
                  </div>
                  <div class="r-col_input">
                    <el-input></el-input>
                  </div>
                </div>
              </el-col>
            </el-col>
          </el-row>
        </div>
      </el-main>
    </el-container>
  </div>
</template>
<script>
export default {
  name: "",
  data() {
    return {
      checkList: [],
      jobcategory: [   //工作类别
        { id: "1", lable: '1 主治医师(含以上) 主管护师(含以上)' },
        { id: "2", lable: '2 住院医师、护师' },
        { id: "3", lable:'3 护士' },
        { id: "4", lable: '4 实习医生、实习护士' },
        { id: "5", lable: '5 进修医生、进修护士' },
        { id: "6", lable: '6 医护人员'},
        { id: "7", lable: '7 护工'},
        { id: "8", lable: '8 后勤医院'},
        { id: "9", lable: '9 其他'},
        { id: "10", lable: '10 检验人员'},
      ],
      placeexposureArr:[  //工作暴露地点
        {id:'1',lable:'1 病房'},
        {id:'2',lable:'2 治疗室/处置室'},
        {id:'3',lable:'3 清创室'},
        {id:'4',lable:'4 手术室/恢复室'},
        {id:'5',lable:'5 门诊'},
        {id:'6',lable:'6 血库'},
        {id:'7',lable:'7 抽血中心'},
        {id:'8',lable:'8 检查室(X光室/心、脑电图室)'},
        {id:'9',lable:'9 解剖/病理室'},
        {id:'10',lable:'10 消毒室'},
        {id:'11',lable:'11 人流室'},
        {id:'12',lable:'12 其他'},
      ],
      instrumentArr:[  //造成损伤的器械类型
        {id:'1',lable:'注射针头'},
        {id:'2',lable:'头皮针'},
        {id:'3',lable:'缝合针'},
        {id:'4',lable:'手术刀'},
        {id:'5',lable:'剪刀'},
        {id:'6',lable:'血糖针'},
        {id:'7',lable:'玻璃'},
        {id:'8',lable:'特殊穿针刺'},
        {id:'9',lable:'其他'},
      ]

    };
  }
};

</script>

<style  scoped>
.repotcard {
  width: 100%;
  /* max-height: 600px !important; */
  /* height: 600px !important; */
  height: 100vh !important;
  overflow: auto;
}
.el-container {
  height: 100%;
}
.el-main {
  padding: 20px 0px;
}
.reportcard-contain {
  max-width: 800px;
  height: calc(100% - 62px);
  border: solid 1px #d8d8d8;
  margin: 0 auto;
  padding-left: 5px;
  overflow: auto;
  height: 100%;
}
.r-col-row {
  float: left;
}
.r-col-label {
  width: 80px;
  text-align: left;
  padding-left: 5px;
}
.r-col_input {
  width: calc(100% - 80px);
}
.r-col {
  height: 30px;
  line-height: 30px;
  display: inline;
}
.el-col-border {
  border-bottom: solid 1px #d8d8d8;
}
.el-col-border-right {
  border-right: solid 1px #d8d8d8;
}
.el-col-padding {
  padding-bottom: 19px;
}
.letterspacing {
  letter-spacing: 8px;
}
.r-col-checkbox {
  margin-right: 10px;
}
.r-col-inherit {
  float: inherit;
  display: contents;
}
.el-col-height {
  height: 58.7px;
  padding-top: 18px;
  padding-left: 18px;
}
.el-col-border {
  text-align: left;
}
p {
  color: #000;
}
.title {
  font-size: 20px;
  margin-bottom: 10px;
  margin-top: 10px;
}
.title p {
  margin: 0px !important;
}
.el-margin {
  margin-right: 10px;
}
.r-col-tow {
  width: 55px !important;
}
.r-col-tow label {
  width: 55px !important;
}
.r-col-tow-input {
  width: calc(100% - 55px) !important;
}
.el-row {
  margin-bottom: 10px;
}
.r-col-lable {
  display: flex;
  height: 30px;
  line-height: 30px;
}
.el-checkbox-margin {
  display: block;
  float: left;
  margin-right: 10px;
}
.el-row-margin {
  margin-right: 5px;
}
.el-checkbox-margin {
  margin-right: 10px;
}
.el-col-12 .el-radio {
  margin-bottom: 12px !important;
}
.el-col-24 .el-radio {
  margin-bottom: 12px !important;
}
</style>