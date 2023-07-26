<template>
  <div>
    <el-upload
      action="#"
      list-type="picture-card"
      :auto-upload="false"
      :on-change="change"
      ref="upload"
      :before-upload="handleExceed"
      :limit="1"
    >
      <i slot="default" class="el-icon-plus">
        <div slot="file" slot-scope="{ file }">
          <img class="el-upload-list__item-thumbnail" :src="file.url" alt="" />
          <span class="el-upload-list__item-actions">
            <span
              class="el-upload-list__item-preview"
              @click="handlePictureCardPreview(file)"
            >
              <i class="el-icon-zoom-in"></i>
            </span>
            <span
              class="el-upload-list__item-delete"
              @click="handleRemove(file)"
            >
              <i class="el-icon-delete"></i>
            </span>
          </span>
        </div>
      </i>
    </el-upload>
    <div class="photobut">
      <el-button @click="close();dialogImageUrl=false">取 消</el-button>
      <el-button type="primary" @click="sub();dialogImageUrl=false">确定</el-button>
    </div>
    <el-dialog :visible.sync="dialogVisible">
      <img width="100%" :src="dialogImageUrl" alt="" />
    </el-dialog>
  </div>
</template>

<script>
export default {
  data() {
    return {
      imageUrl: "",
      dialogImageUrl: "",
      dialogVisible: false,
      disabled: false,
      ifshow: "",
    };
  },
  methods: {
    sub(){
      let that = this
      this.$store.dispatch('changePhoto',this.imageUrl).then(res=>{
        if (res.data.status == "success") {
          this.$emit('close')
          this.$message({
            message: res.data.msg,
            type: "success",
          });
          this.$refs.upload.clearFiles()
          this.$emit("del");
          
        } else {
          this.$message({
            message: res.data.msg,
            type: "warning",
          });
        }
      })
    },
    close(){
      this.$refs.upload.clearFiles()
    },
    handleAvatarSuccess(file) {
      this.imageUrl = file.url;
      console.log(this.imageUrl);
    },
    handleExceed(file) {
      this.$refs.upload.clearFiles();
    },
    handleRemove(file) {
      console.log(file);
      this.$refs.upload.clearFiles();
    },
    handlePictureCardPreview(file) {
      this.dialogImageUrl = file.url;
      this.dialogVisible = true;
    },
    change(file) {
      this.imageUrl = file.raw;
    },
    visibility() {
      console.log(this.dialogImageUrl);
      if (this.dialogImageUrl) return { visibility: hidden };
      else return "";
    },
  },
};
</script>

<style>
.hidden {
  visibility: visible;
}
.avatar-uploader .el-upload {
  border: 1px dashed #d9d9d9;
  border-radius: 6px;
  cursor: pointer;
  position: relative;
  overflow: hidden;
}
.avatar-uploader .el-upload:hover {
  border-color: #409eff;
}
.avatar-uploader-icon {
  font-size: 28px;
  color: #8c939d;
  width: 178px;
  height: 178px;
  line-height: 178px;
  text-align: center;
}
.avatar {
  width: 178px;
  height: 178px;
  display: block;
}
.photobut{
  margin-top: 10px;
  display: flex;
  justify-content: space-around;
}
</style>