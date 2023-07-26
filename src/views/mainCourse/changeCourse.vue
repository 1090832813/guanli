<template>
  <div>
    <el-button type="primary" @click="dialogVisible = true">修改</el-button>
    <el-dialog
      title="修改课程"
      :visible.sync="dialogVisible"
      width="30%"
      :before-close="handleClose"
    >
      <el-input placeholder="请输入需要新的课程名称" v-model="name"></el-input>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false">取 消</el-button>
        <el-button
          type="primary"
          @click="
            changeName();
            dialogVisible = false;
          "
          >确 定</el-button
        >
      </span>
    </el-dialog>
  </div>
</template>

<script>
export default {
  props: ["scope"],
  data() {
    return {
      name: "",
      dialogVisible: false,
    };
  },
  methods: {
    changeName() {
      this.$store
        .dispatch("changeCourse", { id: this.scope.row.id, name: this.name })
        .then((res) => {
          if (res.data.status == "success") {
            this.$store.commit("setNewName", {
              id: this.scope.row.id,
              name: this.name,
            });
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
    handleClose(done) {
      this.$confirm("确认关闭？")
        .then((_) => {
          done();
        })
        .catch((_) => {});
    },
  },
};
</script>

<style>
</style>