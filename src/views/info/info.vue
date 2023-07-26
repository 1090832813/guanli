<template>
  <div>
    <h3>管理员信息</h3>
    <div
      @click="show"
      style="margin-top: 10px; margin-bottom: 10px; width: 150px"
    >
      <el-avatar shape="square" :size="150" :src="`https://www.chengzier.cn:8000/${this.$store.state.msg.avator}`"></el-avatar>
    </div>
    <el-descriptions direction="vertical" :column="3" border>
      <el-descriptions-item label="用户名">{{
        $store.state.msg.username
      }}</el-descriptions-item>
      <el-descriptions-item label="手机号">{{
        $store.state.msg.phone
      }}</el-descriptions-item>
      <el-descriptions-item label="性别">{{
        $store.state.msg.gender == 1 ? "男" : "女"
      }}</el-descriptions-item>
      <el-descriptions-item label="备注">
        <el-tag size="small">管理员</el-tag>
      </el-descriptions-item>
      <el-descriptions-item label="电子邮箱" 
        >{{ $store.state.msg.email }}
        <span class="emails">
          <changeEmail v-if="info.email" @update="init" ></changeEmail>
          <addEmail v-else @update="init"></addEmail
        ></span>
      </el-descriptions-item>
    </el-descriptions>
    <changePsw></changePsw>
    <el-dialog
      title="查看头像"
      :visible.sync="dialogVisible"
      width="40%"
      class="photo"
    >
      <el-dialog
        width="30%"
        title="新头像"
        :visible.sync="innerVisible"
        append-to-body
      >
        <newPhoto @close="close"></newPhoto>
      </el-dialog>
      <div class="img">
        <img :src="`https://www.chengzier.cn:8000/${this.$store.state.msg.avator}`" />
      </div>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="innerVisible = true"
          >修改头像</el-button
        >
      </span>
    </el-dialog>
  </div>
</template>

<script>
import newPhoto from "./newPhoto.vue";
import user from "@/api/user";
import changeEmail from "./changeEmail.vue";
import changePsw from "./changePsw.vue";
import addEmail from "./addEmail.vue";
export default {
  components: {
    newPhoto,
    changeEmail,
    changePsw,
    addEmail,
  },
  data() {
    return {
      info: "",
      img: "",
      dialogVisible: false,
      innerVisible: false,
      imageUrl: "",
    };
  },
  methods: {
    close() {
      this.dialogVisible = false;
      this.innerVisible = false;
      this.init();
      this.$store.dispatch("getMsg");
    },
    show() {
      this.dialogVisible = true;
    },
    changePhoto() {},
    handleAvatarSuccess(res, file) {
      this.imageUrl = URL.createObjectURL(file.raw);
    },
    beforeAvatarUpload(file) {
      const isJPG = file.type === "image/jpeg";
      const isLt2M = file.size / 1024 / 1024 < 2;

      if (!isJPG) {
        this.$message.error("上传头像图片只能是 JPG 格式!");
      }
      if (!isLt2M) {
        this.$message.error("上传头像图片大小不能超过 2MB!");
      }
      return isJPG && isLt2M;
    },
    init() {
      user.verify().then((res) => {
        this.info = res.data;
        this.img = "https://www.chengzier.cn:8000/" + this.info.avator;
      });
    },
  },
  mounted() {
    this.init();
  },
  watch: {
    info: function () {},
  },
};
</script>

<style>
* {
  margin: 0;
  padding: 0;
}
.el-avatar {
  cursor: pointer;
}
.photo .img {
  text-align: center;
}
.img > img {
  max-width: 380px;
}
.emails:first-child{
  height:46px;
}
</style>