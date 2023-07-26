<template>
  <div class="cont" @keyup.enter="submitForm('ruleForm')">
    <div class="box">
      <h1 class="logTitle">登 录</h1>
      <el-form
        :model="ruleForm"
        :rules="rules"
        ref="ruleForm"
        label-width="100px"
        class="demo-ruleForm"
      >
        <el-form-item label="用户名" prop="username">
          <el-input v-model="ruleForm.username"></el-input>
        </el-form-item>
        <el-form-item label="密  码" prop="password">
          <el-input v-model="ruleForm.password" type="password" show-password></el-input>
        </el-form-item>
        <el-form-item label="验证码" prop="code" class="code">
          <el-col :span="16" class="codeBox">
            <el-input v-model="ruleForm.code" maxlength="4"></el-input>
          </el-col>
          <el-col :span="8" class="codeBox">
            <img :src="verifyImg" class="verifyImg" @click="resetcode" />
          </el-col>
        </el-form-item>
        
      </el-form>
      <div class="sub" >
          <el-button type="primary" @click="submitForm('ruleForm')" 
            >登录</el-button
          >
          <el-button @click="resetForm('ruleForm')">重置</el-button>
        </div>
    </div>
  </div>
</template>

<script>
import { v4 } from "uuid";
import  login  from "../../api/login";
import cookie from "js-cookies"



export default {
  data() {
    var valiusername = (rule, value, callback) => {
      if (!value) {
        return callback(new Error("用户名不能为空"));
      } else {
        callback();
      }
    };
    var valipassword = (rule, value, callback) => {
      if (!value) {
        return callback(new Error("密码不能为空"));
      } else {
        callback();
      }
    };
    var valicode = (rule, value, callback) => {
      if (!value) {
        return callback(new Error("验证码不能为空"));
      } else {
        callback();
      }
    };
    return {
      verifyImg: "",
      ruleForm: {
        username: "",
        password: "",
        code: "",
        uuid: "",
      },
      timer: "",
      rules: {
        username: [{ validator: valiusername, trigger: "blur" }],
        password: [{ validator: valipassword, trigger: "blur" }],
        code: [{ validator: valicode, trigger: "blur" }],
      },
    };
  },
  methods: {
    verifycode() {
      this.ruleForm.uuid = v4();
      this.verifyImg =
        "https://www.chengzier.cn:8000/api/generateimagecode?uuid=" +
        this.ruleForm.uuid;
    },
    resetcode() {
      clearInterval(this.timer);
      this.verifycode();
      this.timer = setInterval(() => {
        this.verifycode();
      }, 1000 * 60);
    },
    submitForm(formName) {
      let that = this;
      this.$refs[formName].validate((valid) => {
        if (valid) {
          login.login(this.$data[formName]).then((res) => {
            if (res.data.status == "success") {
              this.$data[formName].token = res.data.token;
              cookie.setItem('SESSDATA',res.data.token)
              this.$router.push({ path: "/home/chart"})
              this.$message({
                message: res.data.msg,
                type: "success",
                showClose: true,
              });
            } else {
              this.$message({
                message: res.data.msg,
                type: "warning",
              });
              this.resetcode();
            }
           
          });
        } else {
          return false;
        }
      });
    },
    resetForm(formName) {
        this.$refs[formName].resetFields();
    },
  },
  created() {
    this.resetcode();
  },
};
</script>

<style>
* {
  margin: 0;
  padding: 0;
}
.cont {
  width: 100%;
  height: 100%;

  position: absolute;
  background-image: url(../../assets/img/login.jpg);
  background-size: cover;
}
.box {
  width: 500px;
  border-radius: 4px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.32), 0 0 6px rgba(0, 0, 0, 0.04);
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  background: #eee;
}
.el-form {
  margin-right: 40px;
}
.logTitle {
  text-align: center;
  margin: 30px;
}
.codeBox {
  height: 45px;
}
.verifyImg {
  max-width: 120px;
}
.sub{
  margin: 30px;
  display: flex;
  justify-content: space-around;
}
</style>