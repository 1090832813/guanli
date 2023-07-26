<template>
  <div>
    <addVip @update="update"></addVip>
    <div class="vip">
      <el-card class="box-card" v-for="item in user" :key="item.id">
        <div slot="header" class="clearfix">
          <span><el-tag>用户名:</el-tag> {{ item.name }}</span>
          <el-dropdown style="float: right">
            <span class="el-dropdown-link">
              操作<i class="el-icon-arrow-down el-icon--right"></i>
            </span>
            <el-dropdown-menu slot="dropdown">
              <el-dropdown-item>
                <changeVip :id="item.id" @show="show"></changeVip>
              </el-dropdown-item>
              <el-dropdown-item>
                <delVip :id="item.id" @update="update"></delVip>
              </el-dropdown-item>
            </el-dropdown-menu>
          </el-dropdown>
        </div>
        <div>期限：{{ item.expires }}天</div>
        <div>初始金额：{{ item.origin_price }}元</div>
        <div>金额：{{ item.price }}元</div>
        <div>描述：{{ item.description }}</div>
        <div>创建时间：{{ item.create_time }}</div>
        <div>更新时间：{{ item.update_time }}</div>
      </el-card>
    </div>
    <el-drawer
      title="修改信息"
      :visible.sync="dialog2"
      direction="rtl"
      custom-class="demo-drawer"
      ref="drawer"
      size="25%"
    >
      <div class="demo-drawer__content">
        <el-form :model="form2">
          <el-form-item label="名称" :label-width="formLabelWidth">
            <el-input v-model="form2.name" autocomplete="off"></el-input>
          </el-form-item>
          <el-form-item label="描述" :label-width="formLabelWidth">
            <el-input v-model="form2.description" autocomplete="off"></el-input>
          </el-form-item>
          <el-form-item label="初始金额" :label-width="formLabelWidth">
            <el-input
              v-model="form2.origin_price"
              autocomplete="off"
            ></el-input>
          </el-form-item>
          <el-form-item label="金额" :label-width="formLabelWidth">
            <el-input v-model="form2.price" autocomplete="off"></el-input>
          </el-form-item>
          <el-form-item label="期限" :label-width="formLabelWidth">
            <el-input v-model="form2.expires" autocomplete="off"></el-input>
          </el-form-item>
        </el-form>
        <div class="demo-drawer__footer">
          <el-button @click="dialog2 = false">取 消</el-button>
          <el-button
            type="primary"
            @click="
              change();
              dialog2 = false;
            "
            >确定</el-button
          >
        </div>
      </div>
    </el-drawer>
  </div>
</template>

<script>
import addVip from "./addVip.vue";
import changeVip from "./changeVip.vue";
import delVip from "./delVip.vue"
export default {
  components: {
    addVip,
    changeVip,
    delVip,
  },
  data() {
    return {
      user: [],
      form2: {
        
      },
      formLabelWidth: "80px",
      dialog2: false,
    };
  },
  methods: {
    show(data){
        this.form2.id=data;
        this.dialog2=true
    },
    update() {
      this.$store.dispatch("getVip").then((res) => {
        this.user = res.data.data;
      });
    },
    change() {

      this.$store.dispatch("changeVip", this.form2).then((res) => {
        if (res.data.status == "success") {
          this.update();
          this.form2={};
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
      });
    },
  },
  created() {
    this.$store.dispatch("getVip").then((res) => {
      this.user = res.data.data;
      this.user.forEach(item =>{
        const time = new Date(item.create_time)
        item.create_time=`${time.getFullYear()}-${time.getMonth()}-${time.getDate()} ${time.getHours()}:${time.getMinutes()}:${time.getSeconds()}`
        const times = new Date(item.update_time)
        item.update_time=`${times.getFullYear()}-${times.getMonth()}-${times.getDate()} ${times.getHours()}:${times.getMinutes()}:${times.getSeconds()}`
      })
    });
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
</style>