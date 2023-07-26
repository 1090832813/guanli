<template>
  <div>
    <el-button
      type="primary"
      style="margin-top: 10px"
      @click="dialogVisible = true"
      >更改密码</el-button
    >
    <el-drawer
      title="更改密码"
      :visible.sync="dialogVisible"
      direction="rtl"
      custom-class="demo-drawer"
      ref="drawer"
      size="400px"
      destroyOnClose
      :before-close="close"
    >
      <div class="bx">
        <div class="demo-drawer__content">
          <el-form
            :model="form"
            :rules="rules"
            ref="ruleForm"
            label-width="100px"
            class="demo-ruleForm"
            autocomplete="off"
          >
            <span v-if="step == 1">
              
              <el-form-item label="新密码" prop="password" label-width="80px">
                <el-input
                type="password"
                  v-model="form.password"
                  autocomplete="off"
                  placeholder="请输入新密码"
                  show-password
                ></el-input>
              </el-form-item>
              <el-form-item label="再次输入" prop="pwdagain" label-width="80px">
                <el-input
                type="password"
                  v-model="form.pwdagain"
                  autocomplete="off"
                  placeholder="请再次输入新密码"
                  show-password
                ></el-input>
              </el-form-item>
              <el-form-item
                label="验证码"
                prop="code"
                label-width="80px"
                class=""
              >
                <el-input
                  class="inpemail"
                  v-model="form.code"
                  type="email"
                  autocomplete="off"
                  placeholder="请输入验证码"
                  ><el-button type="primary" slot="append" @click="getCode"
                    >获取验证码</el-button
                  ></el-input
                >
              </el-form-item>
            </span>

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
                    close();quit();
                    dialogVisible = false;
                  "
                  >返回</el-button
                >
              </template>
            </el-result>
          </el-form>
          <div class="demo-drawer__footer" v-if="step != 2">
            <el-button @click="dialogVisible = false">取 消</el-button>
            <el-button type="primary" @click="changePwd">确定</el-button>
          </div>
        </div>
      </div>
    </el-drawer>
  </div>
</template>

<script>
import cookie from 'js-cookies'
export default {
  data() {
    return {
      dialogVisible: false,
      form: {},
      step: 1,
      result:'',
      rules: {
        code: [{ required: true, message: "请输入验证码", trigger: "blur" }],
        password: [{ required: true, message: "请输入密码", trigger: "blur" }],
        pwdagain: [
          { required: true, message: "请再次输入密码", trigger: "blur" },
        ],
      },
    };
  },
  methods: {
    getCode() {
        this.$store.dispatch('pwdCode').then(res=>{
            console.log(res.data)
            if(res.data.status=="success"){
                this.$message({
                    message:res.data.msg,
                    type:'success'
                })
            }else{
                this.$message({
                    message:res.data.data,
                    type:'warning'
                })
            }
        })
    },
    close(done) {
      if (done) {
        this.step = 1;
        this.form = {};
        done();
      } else {
        this.step = 1;
        this.form = {};
      }
    },
    changePwd() {
      this.$refs.ruleForm.validate((valid) => {
        if (valid) {
          if (this.form.password == this.form.pwdagain) {
            this.$store.dispatch('changePwd',{code:this.form.code,pwd:this.form.password}).then(res=>{
              this.result=res.data
              this.step=2
            
            })
          } else {
            this.$message({
              message: "两次输入的密码不同",
              type: "warning",
            });
          }
        } else {
          return false;
        }
      });
    },
    quit() {
      cookie.removeItem("SESSDATA", { domain: "localhost" });
      if (cookie.getItem("SESSDATA")) {
      } else {
        this.$router.push({ path: "/login" });
        this.$message({
          message: "密码已修改，请重新登录",
          type: "success",
          showClose: true,
        });
      }
    },
  },
};
</script>

<style>
</style>