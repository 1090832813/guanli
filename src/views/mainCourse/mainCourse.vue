<template>
  <div>
    <addCourse @add="init"></addCourse>
    <el-table
      :data="
        tableData.slice((currentPage - 1) * pageSize, currentPage * pageSize)
      "
      stripe
      style="width: 100%"
    >
      <el-table-column prop="id" label="编号" width="180"> </el-table-column>
      <el-table-column prop="name" label="姓名" width="180"> </el-table-column>
      <el-table-column prop="create_time" label="创建时间"> </el-table-column>
      <el-table-column prop="update_time" label="修改时间"> </el-table-column>
      <el-table-column label="功能">
        <div slot-scope="scope" class="courseBut">
          <edit :scope="scope" @change="init" class="edit"></edit>
          <deleteCourse :scope="scope" @del="init"></deleteCourse>
        </div>
      </el-table-column>
    </el-table>
    <pages
      :currentPage="currentPage"
      :pageSize="pageSize"
      :pageTotal="pageTotal"
      :pageSizes="pageSizes"
      @Page="changePage"
      @Size="changeSize"
    ></pages>
  </div>
</template>


<script>
import addCourse from "./addCourse.vue";
import edit from "./changeCourse.vue";
import deleteCourse from "./deleteCourse.vue";
import page from "../../components/page/page.vue";

export default {
  components: {
    pages: page,
    addCourse,
    edit,
    deleteCourse
  },
  data() {
    return {
      tableData: [],
      currentPage: 1,
      pageSize: 5,
      pageSizes: [5, 7, 10],
      pageTotal: 0,
    };
  },
  methods: {
    init() {
      
      this.tableData = this.$store.state.course
      this.pageTotal = this.$store.state.course.length;
      this.tableData.forEach(item =>{
        const time = new Date(item.create_time)
        item.create_time=`${time.getFullYear()}-${time.getMonth()}-${time.getDate()} ${time.getHours()}:${time.getMinutes()}:${time.getSeconds()}`
        const times = new Date(item.update_time)
        item.update_time=`${times.getFullYear()}-${times.getMonth()}-${times.getDate()} ${times.getHours()}:${times.getMinutes()}:${times.getSeconds()}`
      })
    },
    changePage(data) {
      this.currentPage = data;
    },
    changeSize(data) {
      this.pageSize = data;
    },
  },
  created() {
    this.init();
  },
};
</script>

<style>
.courseBut{
    display: flex;

}
.edit{
    margin-right: 10px;
}
</style>