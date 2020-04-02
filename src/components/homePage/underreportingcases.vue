<template>
  <div class="contain-table-waring">
    <reportquery-index>
      <reportquery-index></reportquery-index>
    </reportquery-index>
  </div>
</template>

<script>
import reportqueryindex from "@/components/reportquery/index"; //
export default {
  name: "",
  data() {
    return {};
  },
  components: {
    "reportquery-index": reportqueryindex
  }
};
</script>

<style  scoped>
.contain-table-waring {
  width: 100%;
  height: 100%;
  padding: 5px 10px;
}
</style>