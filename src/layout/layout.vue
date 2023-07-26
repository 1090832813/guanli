<template>
  <el-container>
    <el-aside width="auto+1px" >
      <com_aside :state="state"></com_aside>
    </el-aside>
    <el-container class="right">
      <el-header height="40px">
        <com_head @change="change"></com_head>
      </el-header>
      <el-main>
        <com_main ></com_main>
      </el-main>
    </el-container>
  </el-container>
</template>

<script>
import aside from "../components/aside/aside.vue";
import head from "../components/head/head.vue";
import main from "../components/main/main.vue";
import cookie from "js-cookies";
import'normalize.css/normalize.css'
export default {
  components: {
    com_aside:aside,
    com_head:head,
    com_main:main
  },
  data(){
    return {
      state: false,
      anniu:'el-icon-s-fold',
    }
  },
  methods: {
    quit() {
      cookie.removeItem("SESSDATA");
      this.$router.push({ path: "/login" });
      this.$message({
        message: "账号已退出",
        type: "success",
        showClose: true,
      });
    },
   
    change() {
      this.state=!this.state;
      
    }
  },
  
};
</script>

<style>

.el-header,
.el-footer {
  background-color: rgb(50, 50, 50);
  color: white;
  text-align: center;
  line-height: 40px;
}
html,body,#app,.el-container,.el-menu--collapse{
  height: 100%;
  
  
}
.el-aside{
  background-color:#545c64;
}


body > .el-container {
  margin-bottom: 40px;
}

.el-container:nth-child(5) .el-aside,
.el-container:nth-child(6) .el-aside {
  line-height: 260px;
}

.el-container:nth-child(7) .el-aside {
  line-height: 320px;
}

</style>