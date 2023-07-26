<template>
 <el-popconfirm
  title="确定删除吗？"
  @confirm="del"
>
  <el-button type="text" slot="reference">删除</el-button>
</el-popconfirm>
</template>

<script>
export default {
props:['id'],
methods:{
    del(){
        this.$store.dispatch('delVip',this.id).then(res=>{
            if (res.data.status == "success") {
          this.$emit('update')
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
}
}
</script>

<style>

</style>