<template>
  <div id="money"></div>
</template>

<script>
import * as echarts from "echarts";
export default {
  data() {
    return {
        riseMoney:'',
        allMoney:''
    };
  },
  methods: {
    init() {
      var myChart = echarts.init(document.getElementById("money"));
      // 指定图表的配置项和数据
      var option = {
        title: {
          text: "营收统计",
        },
        tooltip: {},

       
        series: [
          {
            type: "pie",
            data: [
              {
                value: Number(this.riseMoney),
                name: "今日营收额",
              },
              {
                value: Number(this.allMoney),
                name: "总营收额",
              },
            ],
          },
        ],
      };

      // 使用刚指定的配置项和数据显示图表。
      myChart.setOption(option);
    },
  },
  mounted() {
    const rmoney = new Promise((resolve, reject) => {
      this.$store.dispatch("getRiseMoney").then((res) => {
        this.riseMoney = Number(res.data.total_price);
        resolve(3);
      });
    });
    const amoney = new Promise((resolve, reject) => {
      this.$store.dispatch("getAllMoney").then((res) => {
        this.allMoney = Number(res.data.total_price);
        resolve(4);
      });
    });
    Promise.all([rmoney, amoney]).then((res) => {
      this.init();
    });
  },
};
</script>

<style scope>
#money {
  width: 100%;
  height: 500px;
}
</style>