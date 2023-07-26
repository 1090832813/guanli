<template>
  <div>
    <el-button type="primary" @click="dialogVisible = true">新增课程</el-button>
    <el-dialog
      title="新增课程"
      :visible.sync="dialogVisible"
      width="30%"
      :before-close="handleClose"
    >
      <el-input
        placeholder="请输入需要新增的课程名称"
        v-model="name"
      ></el-input>
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
import mainCourse from './mainCourse.vue';

export default {
  data() {
    return {
      name: "",
      dialogVisible: false,
    };
  },
  methods: {
    handleClose(done) {
      this.$confirm("确认关闭？")
        .then((_) => {
          done();
        })
        .catch((_) => {});
    },
    add() {
      this.$store.dispatch('addCourse',this.name).then((res) => {
        console.log(res);
        if (res.data.status == "success") {
          this.$store.dispatch('getNewCourse');
          this.$emit('add')
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