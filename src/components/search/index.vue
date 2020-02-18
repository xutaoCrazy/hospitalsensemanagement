<template>
  <div>
    <el-dialog title="设置分类" width="600px" :visible.sync="visible">
      <p class="p_icon">
        <span @click="innerVisible=true">
          <img src="../../assets/img/add.png" title="添加分类" />
          添加分类
        </span>
        <span>
          <img style="margin-left:10px;" title="删除" src="../../assets/img/remove.png" />
          删除
        </span>
      </p>
      <div class="p_list">
        <div class="list-title">
          <span class="list-title-item">名称</span>
          <span class="list-title-item">是否显示</span>
          <span class="list-title-item">设置为默认</span>
          <span class="list-title-item">操作</span>
        </div>
        <ul class="list-content">
          <li>
            <span class="list-content-item">33333</span>
            <span class="list-content-item">
              <el-switch v-model="switchel"></el-switch>
            </span>
            <span class="list-content-item">
              <el-radio v-model="radio"></el-radio>
            </span>
            <span class="list-content-item">
              <img style="cursor:pointer" title="编辑" src="../../assets/img/edit.png" /> 
            </span>
          </li>
        </ul>
      </div>
      <search-frame :innerVisible.sync="innerVisible"></search-frame>
      <div slot="footer" class="dialog-footer">
        <el-button type="primary" size="small">保 存</el-button>
        <el-button @click="visible = false" size="small">取 消</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import searchframe from "@/components/search/frame";
export default {
  props: {
    searchModel: {
      type: Boolean
    }
  },
  data() {
    return {
      switchel: false,
      radio: false,
      innerVisible: false,
      itemArr: [1, 2],
      textarea: ""
    };
  },
  computed: {
    visible: {
      get() {
        return this.searchModel;
      },
      set(bool) {
        this.$emit("update:searchModel", bool);
      }
    }
  },
  components: {
    "search-frame": searchframe
  },
  methods: {
    add() {
      this.itemArr.push(1);
    },
    removeItem(index) {
      this.itemArr.splice(index, 1);
    }
  },
  mounted() {}
};
</script>

<style scoped>
.p_icon {
  height: 20px;
  text-align: left;
}
.p_icon span {
  cursor: pointer;
}
.p_list {
  margin: 0;
  padding: 0;
}
.p_list .list-title {
  display: flex;
  background-color: #e4e8ec;
  height: 40px;
  line-height: 40px;
  padding: 0 10px;
}
.list-title-item {
  width: 25%;
  font-weight: 700;
}
ol,
ul {
  list-style: none;
  margin: 0px;
  padding: 0px;
}
.p_list .list-content li {
  display: -webkit-box;
  display: -ms-flexbox;
  display: flex;
  height: 40px;
  line-height: 40px;
  padding: 0 10px;
}
.p_list .list-content li .list-content-item {
  width: 25%;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  padding-right: 20px;
}
.item-name {
  display: -webkit-box;
  display: -ms-flexbox;
  display: flex;
  height: 32px;
  line-height: 32px;
  margin-bottom: 10px;
}
.item-name .labels {
  width: 100px;
}
.inner-content .item-list,
.inner-content .item-list li {
  margin-bottom: 10px;
}
</style>