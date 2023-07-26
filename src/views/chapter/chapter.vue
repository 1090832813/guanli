<template>
  <div>
    <el-input placeholder="输入关键字进行过滤" v-model="filterText"> </el-input>
    <el-tree
      :props="props"
      :load="loadNode"
      lazy
      accordion
      ref="tree"
      :filter-node-method="filterNode"
      :expand-on-click-node="false"
    >
      <span class="custom-tree-node" slot-scope="{ node, data }">
        <addChapter
          :node="node"
          :data="data"
          @add="handleUpdateNode"
        ></addChapter>
      </span>
    </el-tree>
  </div>
</template>

<script>
import addChapter from "./addChapter.vue";
import changeChapter from "./changeChapter.vue";
export default {
  components: {
    addChapter: addChapter,
    changeChapter,
  },
  data() {
    return {
      filterText: "",
      props: {
        label: "name",
        children: "zones",
        isLeaf: "leaf",
      },
      count: 1,
      msg: [],
      arr: [],
      data: [],
    };
  },
  watch: {
    filterText(val) {
      this.$refs.tree.filter(val);
    },
  },
  methods: {
    init() {
      this.$store.state.course.forEach((item) => {
        this.arr.push({ name: item.name, label: item.id });
      });
    },
    filterNode(value, data) {
      if (!value) return true;
      return data.name.indexOf(value) !== -1;
    },
    loadNode(node, resolve) {
      this.init();
      if (node.level === 0) {
        return resolve(this.arr);
      }

      this.$store.dispatch("getChapter", node.data.label).then((res) => {
        this.msg = res.data.data;

        this.data = [];
        this.msg.forEach((item, i) => {
          const time = new Date(item.create_time);
          item.create_time = `${time.getFullYear()}-${time.getMonth()}-${time.getDate()} ${time.getHours()}:${time.getMinutes()}:${time.getSeconds()}`;
          const times = new Date(item.update_time);
          item.update_time = `${times.getFullYear()}-${times.getMonth()}-${times.getDate()} ${times.getHours()}:${times.getMinutes()}:${times.getSeconds()}`;
          this.data.push({
            name: `名称：${item.name}  创建时间：${item.create_time}  更新时间：${item.update_time}`,
            leaf: true,
            label: item.id,
          });
        });
        resolve(this.data);
      });
    },
    handleUpdateNode(obj) {
      console.log(obj.node);
      obj.node.loaded = false; //将该节点的loaded置为false 即告诉它，你未加载
      obj.node.loadData(); //手动加载该节点
    },
  },
  created() {},
};
</script>

<style>
.newChapter {
  margin-bottom: 20px;
}
.custom-tree-node > span,
.custom-tree-node {
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: space-between;
  font-size: 14px;
  padding-right: 8px;
}
</style>