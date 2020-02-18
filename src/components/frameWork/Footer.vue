<template>
  <div class="footer">深圳坐标软件集团有限公司{{systemVer}}</div>
</template>

<script>
import { mapState, mapMutations } from "vuex";
export default {
  name: "search",
  props: { menuStatu: Object },
  data() {
    return {};
  },
  computed: {
    ...mapState(["systemVer"])
  },
  methods: {},
  mounted() {}
};
</script>
<style scoped>
.pdl220 {
  margin-left: 220px;
  width: calc(100% - 220px);
}
.pdl70 {
  margin-left: 70px;
  width: calc(100% - 70px);
}
.footer {
  /* background: red; */
  z-index: 1000;
  /* top: 1px; */
  /* box-shadow: 10px 10px 5px #ccc; */
  /* margin-left: 220px; */
  padding: 10px;
  border-top: 1px solid #e7eaec;
  bottom: 0px;
  position: absolute;
  left: 205px;
  right: 0px;
  height: 40px;
}
</style>
