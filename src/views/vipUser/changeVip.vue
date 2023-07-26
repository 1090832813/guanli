<template>
  <div>
    <el-button type="text" @click="show">更改</el-button>
    
  </div>
</template>

<script>
export default {
  props: ["id"],
  data() {
    return {
      
    };
  },
  methods: {
    show(){
        this.$emit('show',this.id)

    }
  },
};
</script>

<style>
.el-drawer__body {
  padding: 20px;
}
.demo-drawer__content {
  height: 100%;
  flex-direction: column;
  display: flex;
}
.demo-drawer__footer {
  display: flex;
}
.demo-drawer__content form {
  flex: 1;
}
.demo-drawer__footer button {
  flex: 1;
}
</style>