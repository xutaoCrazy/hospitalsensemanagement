<template>
  <div>
    <el-dialog width="30%" title="添加分类" :visible.sync="visibles" append-to-body>
      <div class="inner-content">
        <p class="p_icon">
          <span @click="add">
            <img src="../../assets/img/add.png" title="添加分类" />
            添加操作
          </span>
        </p>
        <div class="item-name">
          <span class="labels">分类名称:</span>
          <el-input placeholder class="ant-input"></el-input>
        </div>
        <ul class="item-list">
          <li v-for="(item,index) in itemArr" :key="index">
            <span style="margin-right:5px">{{index+1}}</span>
            <el-select placeholder="请选择" size="small" clearable style="width:120px"></el-select>
            <el-select placeholder="请选择" size="small" clearable style="width:120px"></el-select>
            <span style="float:right;line-height:30px;cursor: pointer" @click="removeItem(index)">
              <img src="../../assets/img/remove.png" title="删除分类" />
            </span>
          </li>
        </ul>
        <div>
          <span>筛选器逻辑编辑，不设置默认为AND例子 (1 AND 2) OR 3</span>
          <el-input type="textarea" :rows="3" placeholder="请输入内容" v-model="textarea"></el-input>
        </div>
      </div>
      <div slot="footer" class="dialog-footer">
        <el-button type="primary" size="small">保 存</el-button>
        <el-button @click="visibles = false" size="small">取 消</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
export default {
  props: {
    innerVisible: {
      type: Boolean
    }
  },
  data() {
    return {
      itemArr: [1, 2],
      textarea: ""
    };
  },

  computed: {
    visibles: {
      get() {
        return this.innerVisible;
      },
      set(bool) {
        this.$emit("update:innerVisible", bool);
      }
    }
  },
  watch: {
    innerVisible(newname, oldname) {}
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