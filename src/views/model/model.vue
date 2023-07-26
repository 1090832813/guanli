<template>
  <div>
    <addModel :id="arr" @cha="handleChange"></addModel>
    <span :class="loading"></span>
    <el-collapse v-model="id" accordion @change="handleChange">
      <el-collapse-item
        :title="item.name"
        :name="item.id"
        v-for="item in arr"
        :key="item.id"
        ref="mod"
      >
        <div>
          <el-table :data="msg" style="width: 100%" border>
            <el-table-column prop="name" label="名称" width="180">
            </el-table-column>
            <el-table-column prop="create_time" label="创建时间" width="280">
            </el-table-column>
            <el-table-column prop="update_time" label="修改时间" width="280">
            </el-table-column>
            <el-table-column label="功能">
              <div slot-scope="scope">
                <changeModel
                  :id="id"
                  :scope="scope"
                  @cha="handleChange"
                ></changeModel>
                <delModel
                  :id="id"
                  :scope="scope"
                  @cha="handleChange"
                ></delModel>
              </div>
            </el-table-column>
          </el-table>
        </div>
      </el-collapse-item>
    </el-collapse>
  </div>
</template>

<script>
import changeModel from "./changeModel.vue";
import addModel from "./addModel.vue";
import delModel from "./delModel.vue";
export default {
  components: {
    changeModel,
    addModel,
    delModel,
  },
  data() {
    return {
      id: "",
      msg: [],
      arr: [],
      loading: "",
      isClose: true,
    };
  },
  methods: {
    handleChange(val) {
      if (val != "") this.isClose = true;
      if (this.isClose) {
        this.loading = "el-icon-loading";
        this.$store.dispatch("getModel", val).then((res) => {
          this.msg = res.data.data;
          this.msg.forEach((item) => {
            const time = new Date(item.create_time);
            item.create_time = `${time.getFullYear()}-${time.getMonth()}-${time.getDate()} ${time.getHours()}:${time.getMinutes()}:${time.getSeconds()}`;
            const times = new Date(item.update_time);
            item.update_time = `${times.getFullYear()}-${times.getMonth()}-${times.getDate()} ${times.getHours()}:${times.getMinutes()}:${times.getSeconds()}`;
          });
          this.loading = "";
        });
        this.isClose = !this.isClose;
      }
    },
  },
  created() {
    this.arr = this.$store.state.course;
  },
};
</script>

<style>
.text {
  font-size: 14px;
}

.item {
  margin-bottom: 18px;
}

.clearfix:before,
.clearfix:after {
  display: table;
  content: "";
}
.clearfix:after {
  clear: both;
}
</style>