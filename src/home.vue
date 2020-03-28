<template>
  <div id="app">
    <left-menu></left-menu>
    <v-search></v-search>
    <v-header-component></v-header-component>
    <main-container></main-container>
    <v-footer></v-footer>
  </div>
</template>
<script>
import leftMenu from "./components/frameWork/LeftMenu";
import search from "./components/frameWork/Search";
import headerComponent from "./components/frameWork/Header";
import footer from "./components/frameWork/Footer";
import container from "./components/frameWork/container";
import { mapState, mapMutations } from "vuex";
// import { sysSchedule, getUserCode } from "@/service/api/InstitutionInterface";
export default {
  name: "App",
  data() {
    return {
      fold: true,
      hospitalList: [],
      mapArr: []
    };
  },
  computed: {
    ...mapState(["trueName"])
  },
  methods: {
    ...mapMutations([
      "trueName",
      "systemVer",
      "parameterArray",
      "loginFilters",
      "loginName",
      "centerurl",
      "bck03",
      "loginTimes",
      "userId",
      "jsessionids",
      "doctorUrl",
      "baseHospitalid",
      "employeeId",
      "insuBaseUrl",
      "insuLocalBaseUrl",
      "insuResourceUrl"
    ]),
    parameterQuery() {
      // sysSchedule() // 获取当前登录人
      //   .then(res => {
      //     if (res.map) {
      //       debugger;
      //       let map = res.map;
      //       this.mapArr = map;
      //       this.trueName(map.trueName); //当前登录人
      //       this.systemVer(map.systemVer); //版本号
      //       this.loginFilters(map.loginFilters); //判断跳出当前系统
      //       this.loginName(map.loginName); //当前登录人编码
      //       this.centerurl(map.centerurl); //控制中心url
      //       this.bck03(map.bck03); //登录科室
      //       this.loginTimes(map.loginTimes); //登陆时间
      //       this.loginTimes(map.loginTimes); //登陆时间
      //       this.userId(map.userId); //登录人id
      //       this.jsessionids(map.jsessionids); //jessionids
      //       this.doctorUrl(map.doctorUrl); //医生站地址
      //       this.baseHospitalid(map.baseHospitalid); //医生站地址
      //       this.employeeId(map.employeeId); //登录人id
      //       this.addHospitalEvent(JSON.parse(map.parameterArray)[0].children);
      //       this.insuLocalBaseUrl(map.insuLocalBaseUrl); //
      //       // this.$router.push("/home"); //回到根路由
      //       let ip = /\d{1,3}\.\d{1,3}\.\d{1,3}\.\d{1,3}/;
      //       debugger;
      //       let adress = ip.exec(map.centerurl);
      //       if (window.location.hostname === adress[0]) {
      //         this.insuBaseUrl(map.insuBaseUrl); //
      //         this.insuResourceUrl(map.insuResourceUrl); //
      //         this.$router.push("/home"); //回到根路由
      //       } else {
      //         this.insuBaseUrl(window.location.origin + "/insuranceweb/cloud/"); //
      //         this.insuResourceUrl(window.location.origin + "/insuranceweb/"); //
      //       }
      //     }
      //   })
      //   .catch(res => {
      //     this.$confirm(res, "提示", {
      //       confirmButtonText: "确定",
      //       type: "error",
      //       showCancelButton: false
      //     });
      //   });
    },
    getHospitalList(d) {
      debugger;
      for (var i = 0, len = d.length; i < len; i++) {
        this.hospitalList.push(d[i]);
        if (
          d[i].hasOwnProperty("children") &&
          $.isArray(d[i].children) &&
          d[i].children.length > 0
        ) {
          this.getHospitalList(d[i].children);
        } else {
          continue;
        }
      }
      this.parameterArray(this.hospitalList); //医院
    },
    addHospitalEvent(list) {
      // this.getHospitalList(list);
    }
  },
  mounted() {
    this.parameterQuery();
    window.onfocus = () => {
      // getUserCode("getUserCode", {
      //   code: this.mapArr.loginName
      // })
      //   .then(data => {
      //     if (data) {
      //       if (data.result == "SUCCESS") {
      //         if (this.mapArr.loginFilter != data.loginFilter) {
      //           this.$confirm("同一浏览器不能同时登录多个帐号！", "提示", {
      //             confirmButtonText: "确定",
      //             type: "error",
      //             showCancelButton: false,
      //             showClose: false
      //           }).then(() => {
      //             window.parent.location.href = this.mapArr.centerurl; //跳转登录页面
      //           });
      //         }
      //       } else {
      //         this.$confirm(data.loginFilter, "提示", {
      //           confirmButtonText: "确定",
      //           type: "error",
      //           showCancelButton: false,
      //           showClose: false
      //         }).then(() => {
      //           window.parent.location.href = this.mapArr.centerurl; //跳转登录页面
      //         });
      //       }
      //     } else {
      //       window.parent.location.href = this.mapArr.centerurl; //跳转登录页面
      //     }
      //   })
      //   .catch(data => {
      //     // window.parent.location.href = this.mapArr.centerurl; //跳转登录页面
      //   });
    };
  },

  computed: {},
  components: {
    "left-menu": leftMenu,
    "v-header-component": headerComponent,
    "v-search": search,
    "v-footer": footer,
    "main-container": container
  }
};
</script>
<style>
@import "assets/css/main.css";
</style>

<style>
#app {
  font-family: "Avenir", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  height: -webkit-fill-available;
  margin: 0;
  padding: 0;
  min-height: 100vh;
  background-size: cover;
}
body {
  margin: 0;
  padding: 0;
  min-height: 100vh;
  background-size: cover;
  background: #f9f9f9;
}
.routerContainer {
  background: #f9f9f9;
  height: -webkit-fill-available;
  overflow: auto;
}
.slide-fade {
  position: absolute;
  left: 0;
  right: 0;
}
.slide-fade-enter-active {
  transition: all 1.2s ease;
}
.slide-fade-leave-active {
  transition: all 0.1s cubic-bezier(2, 0.5, 0.8, 1);
}
.slide-fade-enter,
.slide-fade-leave-to {
  left: 0;
  right: 0;
  transform: translateX(50px);
  opacity: 0;
}
</style>
