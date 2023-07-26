<template>
  <span>
    <el-button type="text" size="mini" @click="dialogVisible = true"
      >修改</el-button
    >
    <el-dialog title="提示" :visible.sync="dialogVisible" width="30%">
      <el-input v-model="name"></el-input>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false">取 消</el-button>
        <el-button
          type="primary"
          @click="
            change();
            dialogVisible = false;
          "
          >确 定</el-button
        >
      </span>
    </el-dialog>
  </span>
</template>

<script>
export default {
  props: ["id", "scope"],
  data() {
    return {
      dialogVisible: false,
      name: "",
    };
  },
  methods: {
    change() {
      console.log(this.name, this.scope.row.id);
      this.$store
        .dispatch("changeModel", {
          name: this.name,
          classify: this.scope.row.id,
        })
        .then((res) => {
          if (res.data.status == "success") {
            this.$emit('cha',this.id)
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
};
</script>

<style>
</style>