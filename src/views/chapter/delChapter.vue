<template>
  <el-popconfirm
    @confirm="del"
    type="text"
    title="这是一段内容确定删除吗？"
    v-if="node.parent.parent != null"
  >
    <el-button size="mini" type="text" slot="reference">删除</el-button>
  </el-popconfirm>
</template>

<script>
export default {
  props: ["node"],
  methods: {
    del() {
      console.log(this.node.data.label);
      this.$store
        .dispatch("deleteChapter", this.node.data.label)
        .then((res) => {
          console.log(res.data);
          if ((res.data.status = "success")) {
            let con = {
              node: this.node.parent,
            };
            this.$emit("del",con);
            this.$message({
            message: res.data.msg,
            type: "success",
          });
        } else {
          this.$message({
            message: res.data.msg,
            type: "warning",
          });
          }
        });
    },
  },
  created() {},
};
</script>

<style>
</style>