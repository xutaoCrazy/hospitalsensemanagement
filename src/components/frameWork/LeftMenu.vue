<template>
  <div class="left-menu-nav">
    <div class="campany-logo">
      <i></i>
      <!-- <img src="../../assets/img/profile_small.jpg" /> -->
      <span>医保系统</span>
    </div>
    <div class="lef-menu">
      <ul class="first-level-menu">
        <li
          onselectstart="return false"
          @click="selectTreeNode(1,value)"
          :class="{'activeMenuIndex':tabsIndex.id==value.id}"
          v-for="value in leftMenuData"
          :key="value.id"
        >
          <i
            class="glyphicon menu-item-logo"
            :class="{'glyphicon-home':value.index===1,' glyphicon-edit':value.id==3401,' glyphicon-stats':value.id==3416,' glyphicon-cog':value.id==3415,' glyphicon-envelope':value.id==3417}"
          ></i>
          <span class="menu-item-word" v-text="value.item"></span>
          <i
            class="glyphicon"
            :class="{'el-icon-arrow-left':!value.noChild&&value.fold,'el-icon-arrow-down':!value.noChild && !value.fold}"
          ></i>
          <el-collapse-transition>
            <ul class="second-level-menu" v-show="!value.fold" transiton="fade">
              <li
                v-for="list in value.children"
                :class="{'activeMenuIndex':tabsIndex.id==list.id}"
                :key="list.id"
                @click.stop="selectTreeNode(2,list)"
              >
                <span v-text="list.item"></span>
                <i
                  class="glyphicon"
                  :class="{'el-icon-arrow-left':list.children.length>0&&list.fold,'el-icon-arrow-down':list.children.length>0&&!list.fold}"
                ></i>
                <el-collapse-transition>
                  <ul class="third-level-menu" v-show="!list.fold">
                    <li
                      v-for="thirdList in list.children"
                      :class="{'activeMenuIndex':tabsIndex.id==thirdList.id}"
                      :key="thirdList.id"
                      v-text="thirdList.item"
                      @click.stop="selectTreeNode(3,thirdList)"
                    ></li>
                  </ul>
                </el-collapse-transition>
              </li>
            </ul>
          </el-collapse-transition>
        </li>
      </ul>
      <ul class="simple-menu">
        <li class="simple-menu-item" v-for="(value,key) in leftMenuData" :key="key">
          <i
            class="glyphicon menu-item-logo"
            :class="{'glyphicon-home':value.index===1,'glyphicon-edit':value.index===2,'glyphicon-stats':value.index===3,'glyphicon-cog':value.index===4,'glyphicon-envelope':value.index===5}"
          ></i>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
import { mapState, mapMutations } from "vuex";
import { commonAjaxRequest } from "@/service/api/InstitutionInterface";
export default {
  name: "LeftMenu",
  props: { menuStatu: Object },
  data() {
    return {
      fold: true,
      toggleMenu: true,
      activeMenuIndex: "1",
      InsuranceArr: "",
      homePage: {
        index: 1,
        id: 1,
        item: "首页",
        fold: false,
        noChild: true,
        path: "/home",
        logo: "menu-item-logo"
      },
      leftMenuData: []
    };
  },
  computed: {
    ...mapState(["tabsParms", "tabsIndex", "userId", "loginName"])
  },
  watch: {
    userId() {
      this.menuLoad();
    }
  },
  methods: {
    ...mapMutations(["tabsArr", "tabsIndexs"]),
    selectTreeNode(index, list) {
      debugger;
      this.$router.push({ path: list.path });

      if (index === 1) {
        this.activeMenuIndex = list.id;
        list.fold = !list.fold;
        if (
          list.fold === false &&
          list.children
          // list.children[2].fold === true
        ) {
          // list.children[2].fold = false;
        } else {
          if (list.children) {
            return;
          }
          this.tabsIndexs(list);
        }

        return;
      }
      // 二级菜单节点
      if (index === 2) {
        this.activeMenuIndex = list.id;
        list.fold = !list.fold;
      }
      // 三级菜单节点
      if (index === 3) {
        this.activeMenuIndex = list.id;
      }
      if (list.children.length > 0) {
        return;
      }
      this.tabsParms.filter((x, index, self) => {
        debugger;
        if (x.id == list.id) {
          this.tabsIndexs(list);
        }
      });
      if (this.tabsParms.filter(item => item.id == list.id).length == 0) {
        this.tabsArr(list);
        this.tabsIndexs(list);
      }
    },
    menuLoad() {
      let url = "SysSchedule/getUserMenu";
      commonAjaxRequest(
        {
          userId: this.userId,
          loginUserId: this.userId,
          loginCode: this.loginName,
          modId: "2363"
        },
        url
      ).then(res => {
        debugger;
        this.leftMenuData = res.list;
        this.leftMenuData.unshift(this.homePage);
        console.log(res);
      });
    }
  },
  mounted() {}
};
</script>
<style scoped>
.tac .el-menu-vertical-demo.el-menu {
  background: #0369aa;
  width: 220px;
}
.center-content {
  height: 100px;
  padding-left: 220px;
}
.tac {
  height: 100%;
}
a {
  text-decoration: none !important;
}
.left-menu-nav {
  position: absolute;
  z-index: 999;
}
.menu-item-logo {
  color: #fff !important;
}
.campany-logo {
  width: 205px;
  padding: 18px 0px;
  text-align: center;
  background: #0369aa;
}

ul {
  list-style-type: none;
  margin: 0px;
  padding: 0px;
  background: #0369aa;
}
ul.first-level-menu,
ul.simple-menu {
  min-height: 900px;

  transition: height 2s;
  -moz-transition: height 2s; /* Firefox 4 */
  -webkit-transition: height 2s; /* Safari 和 Chrome */
  -o-transition: height 2s; /* Opera */
}
.menu-item-word,
.glyphicon-chevron-down,
.glyphicon-chevron-left {
  color: #fff !important;
}
ul.second-level-menu {
  margin-left: -32px;
  background: #0563a0;
  /*transition: height 2s;*/
  /*-moz-transition: height 2s;!* Firefox 4 *!*/
  /*-webkit-transition: height 2s;!* Safari 和 Chrome *!*/
  /*-o-transition: height 2s;!* Opera *!*/
}
ul.first-level-menu > li {
  min-height: 30px;
  /*background: red;*/
  line-height: 30px;
  text-align: left;
  padding-left: 36px;
  font-size: 13px;
  font-weight: 600;
  color: #fff;
  cursor: pointer;
  position: relative;
  border-top: 1px solid rgb(23, 114, 171);
  /*transition: height 2s;*/
  /*-moz-transition: height 2s;!* Firefox 4 *!*/
  /*-webkit-transition: height 2s;!* Safari 和 Chrome *!*/
  /*-o-transition: height 2s;!* Opera *!*/
}
ul.first-level-menu > li:last-child {
  border-bottom: 1px solid rgb(23, 114, 171);
}
.campany-logo {
  width: 205px;
  padding: 40px 14px;
  text-align: center;
  background: #0369aa;
  line-height: 10px;
}
ul {
  list-style-type: none;
  margin: 0px;
  padding: 0px;
  background: #0563a0;
}
ul.first-level-menu {
  min-height: 900px;
}
ul.second-level-menu {
  margin-left: -32px;
}
ul.first-level-menu li {
  min-height: 30px;
  line-height: 30px;
  text-align: left;
  padding-left: 32px;
  font-size: 14px;
  font-weight: 400;
  color: #fff;
  cursor: pointer;
  position: relative;
}
.menu-item-word {
  display: inline-block;
  margin: 0px 0px 0px 10px;
}
.second-level-menu li {
  min-height: 30px;
  text-indent: 18px;
  position: relative;
}
.second-level-menu li i {
  position: absolute;
  right: 15px;
  top: 8px;
}
.menu-item-word + i {
  position: absolute;
  top: 10px;
  font-size: 10px;
  right: 15px;
}
.lef-menu li:hover {
  /*background: rgb(6,156,251);*/
}
.activeMenuIndex {
  background: rgb(6, 156, 251);
}
.menu-item-word {
  display: inline-block;
  margin: 0px 0px 0px 10px;
}
a {
  text-decoration: none !important;
}
.left-menu-nav {
  position: absolute;
  /*transition: all 1s;*/
  /*-moz-transition: all 1s;*/
  /*-webkit-transition:all 1s;*/
  /*-o-transition: all 1s;*/
}
.menu-item-logo {
  color: #fff !important;
}
.menu-item-word + i {
  position: absolute;
  top: 10px;
  font-size: 10px;
  right: 15px;
}
.tac {
  background: #0563a0;
  width: 220px;
}
ul.simple-menu {
  width: 70px;
  height: 100%;
}
ul.simple-menu li:hover {
  cursor: pointer;
}
li.simple-menu-item {
  width: 70px;
  height: 50px;
  float: left;
}
li.simple-menu-item i {
  margin-top: 15px;
}
ul.third-level-menu {
  margin-left: -36px;
}
ul.third-level-menu li {
  text-indent: 48px;
}
.mybox-leave-active,
.mybox-enter-active {
  transition: all 1s ease;
}
.mybox-leave-active,
.mybox-enter {
  height: 0px !important;
}
.mybox-leave,
.mybox-enter-active {
  height: 500px;
}
.transition-box {
  margin-bottom: 10px;
  width: 200px;
  height: 100px;
  border-radius: 4px;
  background-color: #409eff;
  text-align: center;
  color: #fff;
  padding: 40px 20px;
  box-sizing: border-box;
  margin-right: 20px;
}
.campany-logo i {
  display: block;
  float: left;
  width: 32px;
  height: 33px;
  margin: -12px 0 0 25px;
  background: url("../../assets/img/logo.png");
}
.campany-logo span {
  font-size: 20px;
  display: block;
  float: left;
  margin-left: 5px;
  color: #fff;
}
</style>
