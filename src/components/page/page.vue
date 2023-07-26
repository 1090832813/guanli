<template>
  <div class="block">
    <el-pagination
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
      :current-page="currentPage"
      :page-sizes="pageSizes"
      :page-size="pageSize"
      layout="total, sizes, prev, pager, next, jumper"
      :total="pageTotal"
    >
    </el-pagination>
  </div>
</template>

<script>
export default {
  props:['currentPage', 'pageSizes', 'pageSize', 'pageTotal'],
  data() {
    return{
        
    }
  },
  methods: {
    handleSizeChange(val) {
        console.log(`每页 ${val} 条`);
        this.$emit('Size', val);
      },
      handleCurrentChange(val) {
        console.log(`当前页: ${val}`);
        // this.currentPage = val;
        this.$emit('Page', val);
      }
  }
};
</script>

<style>
</style>