<template>
  <el-menu
    :default-active="$router.currentRoute.fullPath"
    class="el-menu-vertical-demo"
    background-color="#545c64"
    text-color="#fff"
    active-text-color="#ffd04b"
    :collapse="state"
    style="border: none;border-right-width: 0;"
    router
  >
  <el-menu-item index="/home/chart">
      <i class="el-icon-s-home"></i>
      <span slot="title">首页</span>
    </el-menu-item>
    <el-menu-item index="/home/mainCourse">
      <i class="el-icon-menu"></i>
      <span slot="title">主课程管理</span>
    </el-menu-item>
    <el-menu-item index="/home/chapter">
      <i class="el-icon-notebook-2"></i>
      <span slot="title">章节管理</span>
    </el-menu-item>
    <el-menu-item index="/home/videos" >
      <i class="el-icon-monitor"></i>
      <span slot="title">视频管理</span>
    </el-menu-item>
    <el-menu-item index="/home/model">
      <i class="el-icon-setting"></i>
      <span slot="title">模块管理</span>
    </el-menu-item>
    <el-menu-item index="/home/vip">
      <i class="el-icon-user"></i>
      <span slot="title">vip用户</span>
    </el-menu-item>
    <el-menu-item index="/home/log">
      <i class="el-icon-user"></i>
      <span slot="title">登录日志</span>
    </el-menu-item>
    <el-menu-item index="/home/superUser">
      <i class="el-icon-user"></i>
      <span slot="title">管理员</span>
    </el-menu-item>
  </el-menu>
</template>

<script>
import "normalize.css";
export default {
  props: ["state"],
};
</script>

<style>
.el-menu-vertical-demo:not(.el-menu--collapse) {
  width: 200px;
  height: 100%;
  
}
</style>