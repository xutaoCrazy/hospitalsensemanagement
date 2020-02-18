<template>
  <div class="center-content">
    <div class="content-header"></div>
    <div class="col-sm-12 content-tabs-nav">
      <div class="content-tabs">
        <button class="roll-nav roll-left J_tabLeft">
          <i class="glyphicon glyphicon-backward"></i>
        </button>
        <nav class="page-tabs J_menuTabs">
          <div class="page-tabs-content">
            <router-link v-for="(item , i ) in heardTabsArr" :to="item.path" :key="item.id">
              <a
                href="javascript:;"
                @click="selectedTab(item)"
                class="J_menuTab"
                :class="{'active':tabsIndex.id==item.id}"
              >
                {{item.item}}
                <i
                  v-if="tabsIndex.id==item.id && item.id !=1"
                  class="el-icon-close"
                  style="margin-left:2px"
                  @click.stop="clearTabs(item,i)"
                ></i>
              </a>
            </router-link>
          </div>
        </nav>
        <button class="roll-nav roll-right J_tabRight">
          <i class="glyphicon glyphicon-forward"></i>
        </button>
        <div class="btn-group roll-nav roll-right">
          <button class="dropdown J_tabClose" data-toggle="dropdown">
            关闭操作
            <span class="caret"></span>
          </button>
          <ul role="menu" class="dropdown-menu dropdown-menu-right">
            <li class="J_tabShowActive" @click="closeTabs(1)">
              <a>定位当前选项卡</a>
            </li>
            <li class="divider"></li>
            <li class="J_tabCloseAll" @click="closeTabs(2)">
              <a>关闭全部选项卡</a>
            </li>
            <li class="J_tabCloseOther" @click="closeTabs(3)">
              <a>关闭其他选项卡</a>
            </li>
          </ul>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState, mapMutations } from "vuex";
export default {
  name: "headerComponent",
  props: {
    menuStatu: Object
  },
  data() {
    return {
      leftSpacing: 0,
      tabs: [],
      heardTabsArr: []
    };
  },
  computed: {
    ...mapState(["tabsParms", "tabsIndex"])
  },
  watch: {
    tabsParms(val) {
      debugger;
      this.heardTabsArr = val;
    },
    tabsIndex(val) {
      debugger;
    }
  },
  methods: {
    ...mapMutations(["tabsArr", "tabsIndexs"]),
    selectedTab(val) {
      //选择当前
      this.tabsIndexs(val);
    },
    closeTabs(num) {
      switch (num) {
        case 1:
          break;
        case 2:
          this.tabsArr(1);
          this.$router.push("/home"); //回到根路由
          break;
      }
    },
    clearTabs(item, i) {
      item.clear = true;
      this.tabsIndexs(this.heardTabsArr[i - 1]);
      this.tabsArr(item);
      this.$router.push({ path: this.heardTabsArr[i - 1].path });
    }
  },
  mounted() {
    this.heardTabsArr = this.tabsParms;
    this.tabIndex = this.heardTabsArr[this.heardTabsArr.length - 1];
  }
};
</script>
<style scoped>
.center-content {
  height: 43px;
  padding-left: 205px;
}
.content-header {
  border-bottom: 1px solid #e7eaec;
}
.nav-header-list-wrap {
  margin-left: 60px;
  position: relative;
  overflow: hidden;
}
.nav-header-list {
  position: relative;
  width: 3000px;
  /*width:calc(100% - 110px);*/
}
.nav-header-list span {
  float: left;
}
.pdl70 {
  padding-left: 70px;
}
.content-tabs-nav {
  border-bottom: solid 2px #0369aa;
  height: 42px;
  background: #f9f9f9;
  line-height: 40px;
}
.content-tabs .roll-left {
  left: 0;
  border-right: solid 1px #e4e4e4;
}
.content-tabs .roll-nav {
  position: absolute;
  width: 40px;
  height: 40px;
  text-align: center;
  color: #999;
  z-index: 2;
  top: 0;
}
.content-tabs button {
  background: #f9f9f9;
  border: 0;
  height: 40px;
  width: 40px;
  outline: 0;
}
nav.page-tabs {
  margin-left: 24px;
  height: 40px;
  overflow: hidden;
}
nav.page-tabs .page-tabs-content {
  float: left;
  width: 100%;
  text-align: left;
}
.page-tabs a {
  color: #000;
}
.page-tabs a {
  display: block;
  float: left;
  border-right: solid 1px #eee;
}
.glyphicon-remove-sign {
  font-size: 10px;
}
.J_menuTab {
  -webkit-transition: all 0.3s ease-out 0s;
  transition: all 0.3s ease-out 0s;
  padding: 0 15px;
}
.J_menuTab span {
  margin-right: 5px;
}
a.J_menuTab {
  text-decoration: none;
}
.roll-nav:hover,
.J_menuTab:hover,
.J_tabClose:hover,
.roll-right.J_tabExit:hover {
  background: rgb(242, 242, 244);
}
.page-tabs a.active i:hover,
.page-tabs a.active:hover {
  background: #0369ab;
  color: #fff;
}
.page-tabs a.active {
  background: rgb(3, 105, 171);
  color: #fff;
}
.roll-right.J_tabRight {
  right: 85px;
}
.content-tabs .roll-right {
  border-left: solid 1px #e4e4e4;
}
.roll-right.btn-group {
  right: 5px;
  width: 80px;
  padding: 0;
}
.roll-right.btn-group button {
  width: 82px;
}
.roll-right.J_tabExit {
  background: #fff;
  right: 0px;
  height: 40px;
  width: 60px;
  outline: 0;
}
.dropdown-menu-right li {
  cursor: pointer;
}
.el-tag {
  border-radius: 0px;
  height: 40px;
  line-height: 40px;
}
.J_menuTab {
  color: #000;
}
</style>
