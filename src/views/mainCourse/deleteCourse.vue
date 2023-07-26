<template>
  <div>
    <el-popconfirm title="确定删除吗？" @confirm="del(scope.row.id)">
      <el-button slot="reference">删除</el-button>
    </el-popconfirm>
  </div>
</template>
    
<script>

export default {
  props: ["scope"],
  methods: {
    del(id) {
      this.$store.dispatch('deleteCourse',id).then((res) => {
        if (res.data.status == "success") {
          this.$store.commit('delCourse', id)
          this.$message({
            message: res.data.msg,
            type: "success",
          });
          this.$emit("del");
        } else {
          this.$message({
            message: res.data.msg,
            type: "warning",
          });
        }
      });
    },
  },
};
</script>

<style>
</style>