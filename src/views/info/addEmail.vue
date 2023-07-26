<template>
  <div>
    <el-button type="text" @click="drawer = true" class="buteml">绑定邮箱</el-button>
    <el-drawer
      title="绑定邮箱"
      :visible.sync="drawer"
      direction="rtl"
      :before-close="close"
      size="400px"
      destroyOnClose
    >
      <div class="budemail" v-if="step==1">
        <el-form
          label-position="right"
          label-width="80px"
          ref="budemail"
          :model="formLabelAlign"
        >
          <el-form-item label="邮箱">
            <el-input v-model="formLabelAlign.email"></el-input>
          </el-form-item>
          <el-form-item label="名称">
            <el-input v-model="formLabelAlign.code">
              <el-button slot="append" @click="getCode"
                >获取验证码</el-button
              ></el-input
            >
          </el-form-item>
        </el-form>
        <div class="footer">
          <el-button
            @click="
              close();
              drawer = false;
            "
            >取 消</el-button
          >
          <el-button type="primary" @click="add">确定</el-button>
        </div>
      </div>
      <el-result
              v-else-if="step == 2"
              :icon="result.status"
              :title="result.msg"
              subTitle="点击返回"
            >
              <template slot="extra">
                <el-button
                  type="primary"
                  size="medium"
                  @click="
                    close();this.$emit('update');
                    drawer = false;
                  "
                  >返回</el-button
                >
              </template>
            </el-result>
    </el-drawer>
  </div>
</template>

<script>
export default {
  data() {
    return {
      drawer: false,
      formLabelAlign: {},
      step:1,
      result:'',
      rules:{
        email: [{ required: true, message: "请输入邮箱", trigger: "blur" }],
        code: [{ required: true, message: "请输入验证码", trigger: "blur" }]
      }
    };
  },
  methods: {
    getCode() {
        this.$refs.budemail.validate((valid) => {
          if (valid) {
            this.$store.dispatch('budCode',this.formLabelAlign.email).then(res=>{
                this.$message({
                  message:res.data.msg,
                  type:res.data.status
                })
                
            })
          } else {
            return false;
          }
        });
    },
    close(done) {
      if (done) {
        this.step = 1;
        this.formLabelAlign = {};
        done();
      } else {
        this.step = 1;
        this.formLabelAlign = {};
      }
    },
    add() {
        this.$refs.budemail.validate((valid) => {
          if (valid) {
            this.$store.dispatch('budEmail',this.formLabelAlign.code).then(res=>{
                this.result=res.data
                this.step=2
                
            })
          } else {
            return false;
          }
        });
    },
  },
};
</script>

<style>
.budemail {
  display: flex;
  flex-wrap: wrap;
  height: 100%;
}
.footer {
  align-self: end;
  margin: 0 auto;
  display: flex;
  width: 80%;
}
.footer button {
  flex: 1;
}
.buteml{
  padding:0;
}
</style>