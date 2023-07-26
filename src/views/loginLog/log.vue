<template>
  <div>
    <el-table :data="tableData" stripe style="width: 100%">
      <el-table-column prop="username" label="用户名" width="180">
      </el-table-column>
      <el-table-column prop="ip" label="IP地址" width="180"> </el-table-column>
      <el-table-column prop="create_time" label="登陆时间"> </el-table-column>
    </el-table>
    <el-pagination
      layout="prev, pager, next"
      :total="total"
      :current-page="currentPage"
    >
    </el-pagination>
  </div>
</template>

<script>
export default {
  data() {
    return {
      tableData: [],
      id: "",
      ip: "",
      total: 1,
      currentPage: 1,
      s:true
    };
  },
  methods: {
    getIP() {
      return new Promise((resolve, reject) => {
        const xhr = new XMLHttpRequest();
        xhr.open("GET", "https://api.ipify.org?format=json");
        xhr.onload = () => {
          if (xhr.status === 200) {
            const response = JSON.parse(xhr.responseText);
            resolve(response.ip);
          } else {
            reject("Failed to get IP address");
          }
        };
        xhr.send();
      });
    },
    getMsg() {
      let that = this;
      this.$store
        .dispatch("getLog",3)
        .then((res) => {
          this.total++;
          let Data = res.data.data;
          Data.forEach((item) => {
            if (item.ip != that.ip) {
              item.ip = item.ip + " (非本机)";
            }
            const time = new Date(item.create_time);
            item.create_time = `${time.getFullYear()}-${
              time.getMonth() + 1
            }-${time.getDate()} ${time.getHours()}:${time.getMinutes()}:${time.getSeconds()}`;
            this.tableData.push(item);
          });
        })
        .catch((err) => {this.s=false;console.log(this.total)});
    },
  },
  created() {
    this.getIP()
      .then((ip) => {
        this.ip = ip;
        this.getMsg();
        
      })
      .catch((error) => console.error(error));
  },
};
</script>

<style>
</style>