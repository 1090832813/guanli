<template>
  <div>
    <addsuper @update="update"></addsuper>
    <div class="vip">
      <el-card class="box-card" v-for="item in superUser" :key="item.id">
        <div slot="header" class="clearfix user">
          <span style="display: flex; align-items: center"
            ><el-tag type="success">管理员</el-tag>&nbsp;
            <el-avatar :src="item.avator" size="small"></el-avatar>
            &nbsp;{{ item.username }}</span
          >

          <delsuper :id="item.id" @update="update"></delsuper>
        </div>
        <div>性别：{{ item.gender == 0 ? "女" : "男" }}</div>
        <div>邮箱：{{ item.email }}</div>
        <div>电话：{{ item.phone }}</div>
        <div>创建时间：{{ item.create_time }}</div>
        <div>更新时间：{{ item.update_time }}</div>
      </el-card>
    </div>
  </div>
</template>

<script>
import addsuper from "./addsuper.vue";
import delsuper from "./delsuper.vue";
export default {
  components: {
    addsuper,
    delsuper,
  },
  data() {
    return {
      superUser: [],
      form2: {},
      formLabelWidth: "80px",
      dialog2: false,
    };
  },
  methods: {
    show(data) {
      this.form2.id = data;
      this.dialog2 = true;
    },
    update() {
      this.$store.dispatch("superUser").then((res) => {
        this.superUser = [];
        this.superUser = res.data.data;
        if(this.superUser!=[]){
        this.superUser.forEach((item) => {
          console.log(item.avator);
          item.avator = "https://www.chengzier.cn:8000/" + item.avator;
          console.log(item.avator);
        });}
      });
    },
  },
  created() {
    this.update()
  },
};
</script>

<style>
.vip {
  margin-top: 20px;
  display: flex;
  flex-wrap: wrap;
}
.box-card {
  width: 32%;
  margin-right: 5px;
  margin-bottom: 5px;
}
.el-dropdown-link {
  cursor: pointer;
  color: #409eff;
}
.el-icon-arrow-down {
  font-size: 12px;
}
.user {
  display: flex;
  align-items: center;
  justify-content: space-between;
}
</style>