<template>
  <div class='dashboard'>{{ nodedata }}</div>
</template>

<script>
  import echarts from 'echarts';

  export default {
    data() {
      return {
        options: {
          tooltip: {
            formatter: '{a} <br/>{b} : {c}%',
          },
          toolbox: {
            feature: {
              restore: {
                show: false,
              },
              saveAsImage: {
                show: false,
              },
            },
          },
          series: [
            {
              name: '负载率',
              type: 'gauge',
              detail: { formatter: '{value}%' },
              data: [{ value: 50, name: '负载率' }],
            },
          ],
        },
        myChart: null,
//        rateData: this.nodedata,
      };
    },
    props: ['nodedata', 'indexed'],
    methods: {},
    mounted() {
      this.options.series[0].data[0].value = this.nodedata;
//      console.log(this.options.series[0].data[0].value);
      this.myChart = echarts.init(document.getElementsByClassName('dashboard')[this.indexed]);
      this.myChart.setOption(this.options, true);
    },
    updated() {
//      console.log(this.nodedata);
      this.options.series[0].data[0].value = this.nodedata;
//      console.log(this.options.series[0].data[0].value);
//      this.myChart = echarts.init(document.getElementsByClassName('dashboard')[this.indexed]);
      this.myChart.setOption(this.options, true);
    },
    computed: {
      getDataNow() {
        return this.nodedata;
      },
    },
  };
</script>

<style>
  .dashboard {
    width: 34%;
    height: 400px;
    display: inline-block;
    float: left;
    margin: 250px 0 0 -9px;
  }
</style>
