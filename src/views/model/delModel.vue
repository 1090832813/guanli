<template>
  <el-popconfirm title="确定删除吗？" @confirm="del(scope.row.id)">
    <el-button type="text" size="mini" slot="reference"> 删除</el-button>
  </el-popconfirm>
</template>

<script>
export default {
  props: ["id","scope"],
  data() {
    return {
      del(pk) {
        this.$store.dispatch("delModel", pk).then((res) => {
          if (res.data.status == "success") {
            this.$emit("cha", this.id);
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
    };
  },
  methods: {},
};
</script>

<style>
</style>