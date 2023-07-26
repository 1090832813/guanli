<template>
  <div>
    <el-breadcrumb separator="/" class="bread">
      <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item
        ><a href="/">{{ this.$route.name }}</a></el-breadcrumb-item
      >
    </el-breadcrumb>
    <router-view></router-view>
    <answer class="board"></answer>
  </div>
</template>

<script>
import answer from '@/views/answer/answer.vue'
export default{
  components:{
    answer,
  }
}
</script>

<style>
.bread {
  margin-bottom: 20px;
}
.board{
  position: fixed;
  right:30px;
  bottom: 30px;
 
  z-index:100000;
}
</style>