<template>
  <span>
    <span>{{ node.label }}</span>
    <span>
      <el-button
        type="text"
        size="mini"
        @click.stop="
          id = node;
          dialogVisible = true;
        "
        v-if="node.parent.parent == null"
      >
        新增
      </el-button>
      <changeChapter :node="node" @del="del" @change="del"></changeChapter>
    </span>
    <el-dialog title="新增" :visible.sync="dialogVisible" width="30%">
      <el-input v-model="newChapter"></el-input>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false">取 消</el-button>
        <el-button
          type="primary"
          @click="
            add(id);
            dialogVisible = false;
          "
          >确 定</el-button
        >
      </span>
    </el-dialog>
  </span>
</template>

<script>
import changeChapter from "./changeChapter.vue";
export default {
  components: {
    changeChapter,
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
    add(id) {
      this.$store
        .dispatch("addChapter", {
          pk: id.data.label,
          chapter_name: this.newChapter,
        })
        .then((res) => {
          console.log(res.data);
          let msg=res.data.msg;
          if (res.data.status == "success") {
            this.$store.dispatch("getChapter", id.data.label).then((res) => {
              
              let con = {
                node: this.node,
              };
              this.$emit("add", con);
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
      this.$emit("add", data);
    },

  },
};
</script>

<style>
</style>