<template>
  <div>
    <el-button type="primary" @click="dialog = true" class="newModel">新增模块</el-button>
    <el-drawer
      title="新增模块"
      :visible.sync="dialog"
      direction="rtl"
      custom-class="demo-drawer"
      ref="drawer"
      size="25%"
    >
      <div class="demo-drawer__content">
        <el-form >
          <el-form-item label="选择章节" :label-width="formLabelWidth">
            <el-select v-model="value" placeholder="请选择">
              <el-option
                v-for="item in id"
                :key="item.id"
                :label="item.name"
                :value="item.id"
              >
              </el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="模块名称" :label-width="formLabelWidth">
            <el-input v-model="name" autocomplete="off"></el-input>
          </el-form-item>
        </el-form>
        <div class="demo-drawer__footer">
          <el-button @click="dialog=false">取 消</el-button>
          <el-button type="primary" @click="add();dialog=false">确定</el-button>
        </div>
      </div>
    </el-drawer>
  </div>
</template>

<script>
export default {
  props: ["id"],
  data() {
    return {
      value: "",
      dialog: false,
      name: "",
      formLabelWidth: "80px",
    };
  },
  methods:{
    add(){
        this.$store.dispatch('addModel',{name:this.name,classify:this.value}).then(res=>{
            if (res.data.status == "success") {
            this.$emit('cha',this.value)
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
        })
    }
  },
  created() {

  },
};
</script>

<style>
.newModel{
    margin-bottom: 20px;
}
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