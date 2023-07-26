<template>
  <div>
    <el-button type="primary" @click="dialog = true" 
      >新增vip</el-button
    >
    <el-drawer
      title="新增vip"
      :visible.sync="dialog"
      direction="rtl"
      custom-class="demo-drawer"
      ref="drawer"
      size="25%"
    >
      <div class="demo-drawer__content">
        <el-form :model="form">
          <el-form-item label="名称" :label-width="formLabelWidth">
            <el-input v-model="form.name" autocomplete="off"></el-input>
          </el-form-item>
          <el-form-item label="描述" :label-width="formLabelWidth">
            <el-input v-model="form.description" autocomplete="off"></el-input>
          </el-form-item>
          <el-form-item label="初始金额" :label-width="formLabelWidth">
            <el-input v-model="form.origin_price" autocomplete="off"></el-input>
          </el-form-item>
          <el-form-item label="金额" :label-width="formLabelWidth">
            <el-input v-model="form.price" autocomplete="off"></el-input>
          </el-form-item>
          <el-form-item label="期限" :label-width="formLabelWidth">
            <el-input v-model="form.expires" autocomplete="off"></el-input>
          </el-form-item>
        </el-form>
        <div class="demo-drawer__footer">
          <el-button @click="dialog = false">取 消</el-button>
          <el-button
            type="primary"
            @click="
              add();
              dialog = false;
            "
            >确定</el-button
          >
        </div>
      </div>
    </el-drawer>
  </div>
</template>

<script>
export default {
  data() {
    return {
      form: {},
      formLabelWidth: "80px",
      dialog: false,
    };
  },
  methods: {
    add() {
      this.$store.dispatch("addVip", this.form).then((res) => {
        if (res.data.status == "success") {
          this.$emit("update");
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
.el-drawer__body {
  padding: 20px;
}
.demo-drawer__content {
  height: 100%;
  flex-direction: column;
  display: flex;
}
.demo-drawer__footer {
  display: flex;
}
.demo-drawer__content form {
  flex: 1;
}
.demo-drawer__footer button {
  flex: 1;
}
</style>