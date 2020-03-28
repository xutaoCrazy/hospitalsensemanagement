<template>
  <div class="nav-search container search-contatin">
    <div class="search col-md-7">
      <span class="controller-left-menu">
        <i class="glyphicon glyphicon-th-large" style="vertical-align: bottom;"></i>
      </span>
      <el-input
        placeholder="请输入内容"
        style="height:30px!important;border-radius:30px!important"
        v-model="search"
        class="input-with-select"
        suffix-icon="el-icon-search"
      ></el-input>
    </div>
    <div class="col-md-5 logInfor">
      <span>欢迎您:</span>
      <span>{{trueName}}</span>
      <i class="glyphicon glyphicon-home logInforIcon"></i>
      <el-select placeholder size="small" v-model="hospitalSelect">
        <el-option
          v-for="item in parameterArray"
          :key="item.id"
          :label="item.text"
          :value="item.id"
        ></el-option>
      </el-select>
      <span class="logOut" @click="logOut">
        <i class="glyphicon glyphicon-off logInforIcon"></i> 退出
      </span>
    </div>
  </div>
</template>
<script>
import { mapState, mapMutations } from "vuex";
// import { getUserCode } from "@/service/api/InstitutionInterface";
export default {
  name: "search",
  props: { menuStatu: Object },
  data() {
    return {
      fold: true,
      hospitalName: "",
      searchContent: "",
      search: "",
      hospitalSelect: ""
    };
  },
  watch: {
    baseHospitalid(val, oldVal) {
      this.hospitalSelect = val;
    }
  },
  computed: {
    ...mapState([
      "trueName",
      "parameterArray",
      "baseHospitalid",
      "loginName",
      "jsessionids",
      "centerurl"
    ])
  },
  methods: {
    // logOut() {
    //   this.$confirm("您确定要离开云健康吗？", "提示", {
    //     confirmButtonText: "确定",
    //     type: "warning",
    //     showCancelButton: false,
    //     showClose: false
    //   }).then(() => {
    //     getUserCode("cloudLogout", {
    //       loginName: this.loginName,
    //       jsessionids: this.jsessionids
    //     }).then(msg => {
    //       if (msg[0].result == "SUCCESS") {
    //         window.location.href = this.centerurl;
    //       }
    //     });
    //   });
    // }
  },
  mounted() {
    debugger;
  }
};
</script>
<style  scoped>
.controller-left-menu {
  color: #fff;
  /*border-radius: 5px;*/
  background: rgb(3, 105, 171);
  width: 35px;
  height: 30px;
  display: inline-block;
  vertical-align: center;
  text-align: center;
  cursor: pointer;
  float: left;
  margin: 0px 10px 0px 0px;
}
.controller-left-menu > i {
  vertical-align: middle;
}
.input-with-select {
  background-color: #fff;
}
.search {
  padding-top: 5px;
}
.nav-search {
  /*width: 600px;*/
  height: 40px;
  background: #f9f9f9;
  width: 100%;
  /*transition: all 1s;*/
  /*-moz-transition: all 1s;*/
  /*-webkit-transition:all 1s;*/
  /*-o-transition: all 1s;*/
  padding-left: 205px;
}
.pdl220 {
  padding-left: 205px;
}
.pdl70 {
  padding-left: 70px;
}
.logOut {
  cursor: pointer;
}
.logInfor {
  text-align: right;
  padding-top: 5px;
}
.logInforIcon {
  color: #999;
}
.logInfor span {
  /* margin: 10px; */
}
.input-with-select {
  width: 400px;
  float: left;
}
.search .el-input__inner {
  height: 30px !important;
  border-radius: 30px !important;
}
.search .el-input__icon {
  line-height: 30px;
}
</style>
