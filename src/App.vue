<template>
  <div id="app">
    <router-view></router-view>
  </div>
</template>
<script>
export default {
  name: "App",
  data() {
    return {
      fold: true
    };
  }
};
</script>
<style>
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
}
</style>
