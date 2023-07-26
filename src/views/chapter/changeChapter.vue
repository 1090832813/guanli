<template>
  <span>
    <span>
      <el-button
        type="text"
        size="mini"
        @click.stop="
          id = node;
          dialogVisible = true;
        "
        v-if="node.parent.parent != null"
      >
        更改
      </el-button>&nbsp;
      <delChapter :node="node" @del="del"></delChapter>
    </span>
    <el-dialog title="更改" :visible.sync="dialogVisible" width="30%">
      <el-input v-model="newChapter"></el-input>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false">取 消</el-button>
        <el-button
          type="primary"
          @click="
            change(id);
            dialogVisible = false;
          "
          >确 定</el-button
        >
      </span>
    </el-dialog>
  </span>
</template>

<script>
import delChapter from './delChapter.vue';
export default {
  components:{
    delChapter
  },
  props: ["data", "node"],
  data() {
    return {
      id: "",
      newChapter: "",
      dialogVisible: false,
    };
  },
  methods: {
    change(id) {
      this.$store
        .dispatch("changeChapter", {
          pk: id.data.label,
          chapter_name: this.newChapter,
        })
        .then((res) => {
          console.log(res.data);
          let msg=res.data.msg;
          if (res.data.status == "success") {
            this.$store.dispatch("getChapter", id.data.label).then((res) => {
              
              let con = {
                node: this.node.parent,
              };
              this.$emit("change", con);
              this.$message({
                message: msg,
                type: "success",
              });
            });
          } else {
            this.$message({
              message: msg,
              type: "warning",
            });
          }
        });
     },
    del(data) {
      this.$emit("del", data);
    },
  },
};
</script>

<style>
</style>