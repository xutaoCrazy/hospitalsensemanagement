<template>
  <div class="main-contain">
    <!-- <el-main> -->
    <keep-alive>
      <transition name="slide-fade">
        <router-view />
      </transition>
    </keep-alive>
    <!-- </el-main> -->
  </div>
</template>

<script>
export default {
  name: "search",
  data() {
    return {};
  },
  methods: {},
  mounted() {}
};
</script>
<style scoped>
.main-contain {
  position: absolute;
  left: 205px;
  right: 0px;
  bottom: 40px;
  top: 80px;
  margin: 5px;
}
</style>
