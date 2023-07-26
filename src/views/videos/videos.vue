<template>
  <el-cascader-panel
    class="video"
    :options="options"
    :props="props"
  ></el-cascader-panel>
</template>

<script>
import videos from "../../api/videos";
export default {
  data() {
    return {
      msg: [],
      props: {
        lazy: true,
        lazyLoad:this.lazyLoad
      },
      options: [],
    };
  },
  methods: {
    init() {
      this.$store.state.course.forEach((item) => {
        this.options.push({ value: item.id, label: item.name });
      });
    },
    lazyLoad(node, resolve) {
          const { level } = node;
          console.log(node.data.value);
          if(level==2){
            this.$store.dispatch('getVideo',{pk1:node.parent.data.value,pk2:node.data.value}).then(res=>{
                // console.log(res.data)
            })
          }
          this.$store.dispatch("getChapter", node.data.value).then((res) => {
            this.msg = res.data.data;
            const nodes=[];
            this.msg.forEach((item)=>{
                nodes.push({value:item.id,label:item.name,leaf:level>=2})
            })
            resolve(nodes);
          });
        },
  },
  created() {
    this.init();
  },
};
</script>

<style>
.video:nth-child(1):nth-child(1),
.video {
  height: 500px;
}
.el-cascader-menu__wrap {
  height: 520px;
}
</style>