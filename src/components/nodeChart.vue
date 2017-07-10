<template lang="html">
  <div class="node-chart-wrapper">
    <div class="appchart-header" style="background-color:#e6faf0;" v-if="nodeStatus === 'online'">
      <h2>{{(nodedata.nodeId).substr(0, 5)}}节点负载占用率</h2>
      <Button id="addNode" type="error" shape="circle" icon="minus" style="z-index:1;position:absolute;right:-12px;top:-12px;" @click="removeNode"></Button>
    </div>
    <div class="appchart-header flash" style="background-color:#ffebe6;" v-if="nodeStatus === 'closing'">
      <h2>{{(nodedata.nodeId).substr(0, 5)}}节点负载占用率</h2>
    </div>
    <div class="appchart-header flash" style="background-color:#ebf5ff;" v-if="nodeStatus === 'creating'">
      <h2>{{(nodedata.nodeId).substr(0, 5)}}节点负载占用率</h2>
    </div>
    <div class="" style="padding:0 10px">
      <div class="node-chart"></div>
    </div>
    <div class="nodeChart-info-wrapper">
    </div>
    <div class="" style="position:absolute;left: 50%;font-size: 16px;color: #fc4f07;top: 55px">
       {{ loadrate }}%
    </div>
  </div>
</template>

<script>
import echarts from 'echarts';
// import echartsConfig from '../views/echartsconfig';
import { wsRemoveNode } from '../models/interface';

export default {
  data() {
    return {
      flag: false,
      options: {
        title: {
          text: '',
        },
        tooltip: {
          trigger: 'axis',
          // formatter: function(params) {
          //   params = params[0];
          //   var date = new Date(params.name);
          //   return date.getDate() + '/' +
          // (date.getMonth() + 1) + '/' + date.getFullYear() + ' : ' + params.value[1];
          // },
          axisPointer: {
            animation: false,
          },
        },
        xAxis: {
          type: 'time',
          splitLine: {
            show: false,
          },
        },
        yAxis: {
          type: 'value',
          max: 150,
          // boundaryGap: ['20%', '20%'],
          splitLine: {
            show: false,
          },
        },
        legend: {
          right: '20%',
          bottom: 0,
          data: ['负载率(%)', '预估负载(%)'],
        },
        series: [
          {
            name: '负载率(%)',
            type: 'line',
            showSymbol: false,
            hoverAnimation: false,
            data: [],
          },
          {
            name: '预估负载(%)',
            type: 'line',
            showSymbol: false,
            hoverAnimation: false,
            itemStyle: {
              normal: {
                color: '#00cc99',
              },
            },
            data: [],
          },
        ],
      },
      timeXaxis: Date.parse(new Date()),
      chart: null,
      nodeStatus: '',
      loadrate: 0,
    };
  },
  props: ['nodedata', 'indexed', 'time'],
  methods: {
    removeNode() {
      this.$Modal.confirm({
        title: '正在删除节点',
        content: '<p>确定删除节点？</p>',
        onOk: () => {
          wsRemoveNode({
            appId: this.$route.params.id,
            nodeId: this.nodedata.nodeId,
          }).then((data) => {
            console.log(data);
          });
        },
        onCancel: () => {
          this.$Message.info('点击了取消');
        },
      });
    },
  },
  updated() {
    this.nodeStatus = this.nodedata.nodeStatus;
    this.loadrate = (this.nodedata.nodeCurrentLoad / this.nodedata.nodeEstimateLoad) * 100;
    const randomVal = {
      name: this.time,
      value: [this.time, this.loadrate],
    };
    console.log((this.nodedata.nodeCurrentLoad / this.nodedata.nodeEstimateLoad) * 100);
    // const chart = echarts.init(document.getElementsByClassName('node-chart')[this.indexed]);
    if (this.options.series[0].data.length < 500) {
      this.options.series[0].data.push(randomVal);
    } else {
      this.options.series[0].data.shift();
      this.options.series[0].data.push(randomVal);
    }
    // this.options.title.text = this.nodedata.nodeId;
    this.chart.setOption(this.options);
  },
  mounted() {
    this.nodeStatus = this.nodedata.nodeStatus;
    // eslint-disable-next-line
    this.loadrate = ((this.nodedata.nodeCurrentLoad / this.nodedata.nodeEstimateLoad).toFixed(2)) * 100;
    const randomVal = {
      name: this.time,
      value: [this.time, this.loadrate],
    };
    this.options.series[0].data.push(randomVal);
    this.chart = echarts.init(document.getElementsByClassName('node-chart')[this.indexed]);
    this.chart.setOption(this.options);
    // const randomVal = {
    //   name: this.timeXaxis,
    //   value: [this.timeXaxis, this.nodedata.nodeCurrentLoad],
    // };
    // const chart = echarts.init(document.getElementsByClassName('node-chart')[this.indexed]);
    // this.options.series[0].data.push(randomVal);
    // this.options.title.text = this.nodedata.nodeId;
    // chart.setOption(this.options);
    // console.log(this.time);
  },
};

</script>
