<template>
  <div>
    <el-button type="primary" @click="dialogVisible = true"
      >新增管理员</el-button
    >

    <el-dialog title="新增管理员" :visible.sync="dialogVisible" width="30%">
      <el-input v-model="name" placeholder="请输入用户名"></el-input>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false">取 消</el-button>
        <el-button
          type="primary"
          @click="
            add();
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
  data() {
    return {
      dialogVisible: false,
      name: "",
    };
  },
  methods: {
    add() {
      this.$store.dispatch("addSuperUser", this.name).then((res) => {
        console.log(res.data)
        if (res.data.status == "success") {
          this.$emit("update");
          this.$message({
            message: res.data.msg,
            type: "success",
          });

          this.$notify({
            title: "创建成功",
            message: ` 密码为：${res.data.password},请尽快修改密码`,
            duration: 0,
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
};
</script>

<style>
</style>