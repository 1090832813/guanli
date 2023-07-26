<template>
  <div class="head">
    <div :class="anniu" class="swich" @click="change">
      {{ this.$route.name }}
    </div>
    <div class="msg">
      <el-avatar :src="`https://www.chengzier.cn:8000/${this.$store.state.msg.avator}`" size="small"></el-avatar>&nbsp;
      <el-link type="warning" :underline="false" @click="info">
        {{ $store.state.msg.username }} </el-link
      >&nbsp;
      <el-link type="danger" class="quit" :underline="false" @click="quit"
        >退出</el-link
      >
    </div>
  </div>
</template>

<script>
import cookie from "js-cookies";

export default {

  data() {
    return {
      state: false,
      anniu: "el-icon-s-fold",
      username: "",
      img: "",
    };
  },
  methods: {
    quit() {
      cookie.removeItem("SESSDATA",'/', 'localhost');
      cookie.removeItem("SESSDATA",'/home', 'localhost');
      if (cookie.getItem("SESSDATA")) {
      } else {
        this.$router.push({ path: "/login" });
        this.$message({
          message: "账号已退出",
          type: "success",
          showClose: true,
        });
      }
    },
    change() {
      this.state = !this.state;
      this.$emit("change", this.state);
    },
    info() {
      this.$router.push({ path: "info" });
    },
    init() {
      this.username = this.$store.state.msg.username;
      this.$store.dispatch('getMsg').then(res=>{
        console.log(this.$store.state.msg.avator)
        this.img = `https://www.chengzier.cn:8000/${this.$store.state.msg.avator}`;
      })
    },
  },
  mounted() {
    this.init();
  },
  watch: {
    state: function () {
      if (this.state == true) {
        this.anniu = "el-icon-s-unfold";
      } else {
        this.anniu = "el-icon-s-fold";
      }
    },
  },
};
</script>

<style>
.head {
  display: flex;
  align-items: center;
  justify-content: space-between;
}
.right {
  width: 100%;
}
.swich {
  cursor: pointer;
}
.msg {
  display: flex;
  align-items: center;
}
</style>