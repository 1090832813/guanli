<template>
  <div id="main"></div>
</template>
  
  <script>
import * as echarts from "echarts";
export default {
  data() {
    return {
        riseUser:'',
        riseVip:''
    };
  },
  methods: {
    init() {
      var myChart = echarts.init(document.getElementById("main"));
      // 指定图表的配置项和数据
      var option = {
        title: {
          text: "用户统计",
        },
        tooltip: {},

        xAxis: {
          data: ["今日新增用户", "今日新增VIP用户"],
        },
        yAxis: {},
        series: [
          {
            name: "销量",
            type: "bar",
            data: [Number(this.riseUser), Number(this.riseVip)],
          },
        ],
      };

      // 使用刚指定的配置项和数据显示图表。
      myChart.setOption(option);
    },
  },
  mounted() {
    const user = new Promise((resolve, reject) => {
      this.$store.dispatch("getRiseUser").then((res) => {
        this.riseUser = Number(res.data.data);
        resolve(1);
      });
    });
    const vip = new Promise((resolve, reject) => {
      this.$store.dispatch("getRiseVip").then((res) => {
        this.riseVip = Number(res.data.data);
        resolve(2);
      });
    });

    Promise.all([user, vip]).then((res) => {
      this.init();
    });
  },
};
</script>
  
  <style scope>
#main {
  width: 100%;
  height: 500px;
}
</style>