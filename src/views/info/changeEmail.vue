<template>
  <span class="changeEmail">
    <el-button type="text" @click="dialogVisible = true" class="buteml"
      >更换邮箱</el-button
    >
    <el-drawer
      title="更换邮箱"
      :visible.sync="dialogVisible"
      direction="rtl"
      custom-class="demo-drawer"
      ref="drawer"
      size="400px"
      destroyOnClose
      :before-close="close"
    >
      <el-steps :active="step - 1" finish-status="success" align-center>
        <el-step title="步骤 1" description="输入旧邮箱"></el-step>
        <el-step title="步骤 2" description="输入新邮箱"></el-step>
        <el-step title="步骤 3" description="更换邮箱成功"></el-step>
      </el-steps>
      <div class="bx">
        <div class="demo-drawer__content">
          <el-form
            :model="form"
            :rules="rules"
            ref="ruleForm"
            label-width="100px"
            class="demo-ruleForm"
          >
            <span v-if="step == 1">
              <el-form-item
                label="旧邮箱"
                prop="oldEmail"
                label-width="70px"
                class="inp"
              >
                <el-input
                  v-model="form.oldEmail"
                  type="email"
                  autocomplete="off"
                  placeholder="请输入旧邮箱"
                ></el-input>
              </el-form-item>
              <el-form-item
                label="验证码"
                prop="oldcode"
                label-width="70px"
                class="vcode"
              >
                <el-input
                  class="inpemail"
                  v-model="form.oldcode"
                  autocomplete="off"
                  placeholder="请输入验证码"
                  ><el-button
                    :plain="typeof this.verify == 'number'"
                    :disabled="typeof this.verify == 'number'"
                    slot="append"
                    @click="getCode"
                    >{{ verify }}</el-button
                  ></el-input
                >
              </el-form-item>
            </span>
            <span v-else-if="step == 2">
              <el-form-item label="新邮箱" prop="newEmail" label-width="70px">
                <el-input
                  class="inpemail"
                  v-model="form.newEmail"
                  type="email"
                  autocomplete="off"
                  placeholder="请输入新邮箱"
                ></el-input>
              </el-form-item>
              <el-form-item
                label="验证码"
                prop="newcode"
                label-width="70px"
                class="vcode"
              >
                <el-input
                  v-model="form.newcode"
                  autocomplete="off"
                  placeholder="请输入验证码"
                  ><el-button
                    slot="append"
                    :plain="typeof this.verify == 'number'"
                    :disabled="typeof this.verify == 'number'"
                    @click="getCode"
                    >{{ verify }}</el-button
                  ></el-input
                >
              </el-form-item>
            </span>
            <el-result
              v-else-if="step == 3"
              :icon="result.status"
              :title="result.msg"
              subTitle="点击返回"
            >
              <template slot="extra">
                <el-button
                  type="primary"
                  size="medium"
                  @click="
                    close();
                    dialogVisible = false;
                  "
                  >返回</el-button
                >
              </template>
            </el-result>
          </el-form>
          <div class="demo-drawer__footer" v-if="step != 5">
            <el-button
              @click="
                close();
                dialogVisible = false;
              "
              >取 消</el-button
            >
            <el-button type="primary" @click="changeEmail">确定</el-button>
          </div>
        </div>
      </div>
    </el-drawer>
  </span>
</template>

<script>
export default {
  data() {
    return {
      dialogVisible: false,
      form: {},
      deadline2: Date.now() + 1000 * 60 * 60 * 8,
      step: 1,
      result: "",
      verify: "获取验证码",
      timer:'',
      rules: {
        oldEmail: [{ required: true, message: "请输入邮箱", trigger: "blur" }],
        oldcode: [{ required: true, message: "请输入验证码", trigger: "blur" }],
        newEmail: [{ required: true, message: "请输入邮箱", trigger: "blur" }],
        newcode: [{ required: true, message: "请输入验证码", trigger: "blur" }],
      },
    };
  },
  methods: {
    changeEmail() {
      this.$refs.ruleForm.validate((valid) => {
        if (valid) {
          if (this.step == 1) {
            this.$store.dispatch("oldEmail", this.form.oldcode).then((res) => {
              console.log(res.data)
              this.$message({
                message: res.data.msg,
                type: res.data.state,
              });
              if (res.data.state == "success") {
                this.step = 2;
                clearInterval(this.timer);
                this.verify = "获取验证码";
              }
            });
          } else if (this.step == 2) {
            this.$store
              .dispatch("changeEmail", this.form.newcode)
              .then((res) => {
                this.result = res.data;
                clearInterval(this.timer);
                this.verify = "获取验证码";
                this.step = 3;
              });
          }
        } else {
          return false;
        }
      });
    },
    close(done) {
      if (done) {
        this.step = 1;
        this.form = {};
        
        done();
      } else {
        this.step = 1;
        this.form = {};
        this.$store.dispatch('getMsg')
      }
    },
    interval() {
      this.verify = 120;
      this.timer = setInterval(() => {
        this.verify--;
        if (this.verify == 0) {
          clearInterval(this.timer);
          this.verify = "获取验证码";
        }
      }, 1000);
    },
    getCode() {
      if (this.step == 1) {
        this.interval();
        this.$store.dispatch("oldCode").then((res) => {
          this.$message({
            message: res.data.msg,
            type: res.data.status,
          });
        });
      } else {
        this.interval();
        this.$store.dispatch("newCode", this.form.newEmail).then((res) => {
          this.$message({
            message: res.data.msg,
            type: res.data.status,
          });
        });
      }
    },
  },
};
</script>

<style>
.changeEmail {
  float: right;
}
.bx {
  display: flex;
  justify-content: center;
  width: 100%;
  height: 80%;
}
.el-drawer__body {
  padding: 20px;
}
.demo-drawer__content {
  height: 100%;
  width: 100%;
  flex-direction: column;
  display: flex;
  justify-content: space-between;
  align-items: center;
}
.demo-ruleForm {
  width: 80%;
}
.demo-drawer__footer {
  display: flex;
  /* align-items: end; */
  justify-content: end;
  width: 50%;
}
.demo-drawer__content input {
  flex: 1;
  /* width: 280px; */
}
.demo-drawer__footer button {
  flex: 1;
}
.buteml {
  padding: 0;
}
/* .inp{
  display: flex;
  flex-wrap: nowrap;
} */
.inpemail {
  flex: 1;
}
</style>