<template>
 <div class="">
   <div class="appchart-wrapper">
     <div class="appchart-header">
       <h2>{{ appName }} 负载占用率</h2>
       <Button id="addNode" type="success" shape="circle" icon="plus" style="position:absolute;right:20px;top:54px;" @click="addNode"></Button>
     </div>
     <div class="appchart-content">
       <div id="appChart"></div>
     </div>



       <div class="apprule">
          <ul>
            <li>
              <span class="dot"></span> 负载率 <span>{{value2}}%</span>
            </li>
              <li>
                <span class="dot"></span> 负载超过 <span>70%</span>, 会 <span>增加</span>一个节点
              </li>
              <li>
                <span class="dot"></span> 负载低于 <span>30%</span>, 会 <span>减少</span>一个节点
              </li>
          </ul>
      </div>



   </div>

   <div class="nodechart-container">
       <Nodechart
         :nodedata="node"
        :indexed="index"
        :time="timeXaxis"
        v-for="(node, index) in nodeChartDomList">
      </Nodechart>
   </div>


  </div>
</template>

<script>
import echarts from 'echarts';
import {
  // wsGetLoader,
  wsAppDetail,
  wsAddNode,
} from '../models/interface';
import echartsConfig from './echartsconfig';
import Nodechart from '../components/nodeChart';

export default {
  data() {
    return {
      intervalVar: null,
      value2: 0,
      randomVal: {},
      appName: '',
      timeXaxis: Date.parse(new Date()),
      value: Math.random() * 1000,
      chartData: [],
      nodeChartDomList: [],
      chart: null,
      options: {},
      // options: {
      //   title: {
      //     text: '动态数据 + 时间坐标轴',
      //   },
      //   tooltip: {
      //     trigger: 'axis',
      //     axisPointer: {
      //       animation: false,
      //     },
      //   },
      //   xAxis: {
      //     type: 'time',
      //     splitLine: {
      //       show: false,
      //     },
      //   },
      //   yAxis: {
      //     type: 'value',
      //     boundaryGap: [0, '100%'],
      //     splitLine: {
      //       show: false,
      //     },
      //   },
      //   series: [{
      //     name: '模拟数据',
      //     type: 'line',
      //     showSymbol: false,
      //     hoverAnimation: false,
      //     data: [],
      //   }],
      // },
    };
  },
  components: {
    Nodechart,
  },
  methods: {
    getData() {
      wsAppDetail({
        appId: this.$route.params.id,
      }).then((data) => {
        this.appName = data.data.appName;
        this.nodeChartDomList = data.data.nodeList;
        let appLoad = 0;
        let appEstLoad = 0;
        for (let i = 0, length = data.data.nodeList.length; i < length; i += 1) {
          appLoad += data.data.nodeList[i].nodeCurrentLoad;
          appEstLoad += data.data.nodeList[i].nodeEstimateLoad;
        }
        this.value2 = ((appLoad / appEstLoad) * 100).toFixed(2);
        this.timeXaxis += 1000;
        this.randomVal = {
          name: this.timeXaxis,
          value: [this.timeXaxis, this.value2]
        };
        console.log(this.randomVal);
        this.options.series[0].data.push(this.randomVal);
        this.options.series[1].data.push({
          name: this.timeXaxis,
          value: [this.timeXaxis, 70]
        });
        this.chart.setOption(this.options);
      });
    },
    addNode() {
      this.$Modal.confirm({
        title: '正在添加节点',
        content: '<p>确定添加节点？</p>',
        onOk: () => {
          wsAddNode({
            appId: this.$route.params.id,
          }).then((data) => {
            console.log(data);
          });
        },
        onCancel: () => {
          this.$Message.info('点击了取消');
        }
        });
      // wsAppDetail({
      //   appId: this.$route.params.id,
      // }).then((data) => {
      //   console.log();
      // });
    },
    // renderNodeCharts() {
    //   wsGetLoader().then((data) => {
    //     console.log(data);
    //     this.value2 = data.data[0].nodeList[0].nodeCurrentLoad;
    //     this.timeXaxis += 1000;
    //     this.randomVal = {
    //       name: this.timeXaxis,
    //       value: [this.timeXaxis, this.value2]
    //     };
    //     this.options.series[0].data.push(this.randomVal);
    //     this.chart.setOption(this.options);
    //   });
    // },
    renderCharts() {
      this.getData();
      this.intervalVar = setInterval(() => {
        if (this.options.series[0].data.length < 500) {
          this.getData();
        } else {
          this.getData();
          this.options.series[0].data.shift();
        }
      }, 1000);

    },
  },
  beforeDestroy() {
    echartsConfig.series[0].data = [];
    console.log(this.intervalVar);
    clearInterval(this.intervalVar);
  },

  mounted() {
console.log('---------');
console.log(echartsConfig);
console.log(this.intervalVar);

    this.options = echartsConfig;
    this.chart = echarts.init(document.getElementById('appChart'));
    // const nodeChartsLength = document.getElementsByClassName('node-chart').length;
    // for (let i = 0; i < nodeChartsLength; i += 1) {
    //   this.nodeChartDomList.push(echarts.init(getElementsByClassName('node-chart')));
    // }

    // this.chartData.push(this.randomData());
    this.options.series[0].data = this.chartData;
    this.renderCharts();
    // setInterval(() => {
    //   this.interVal();
    // }, 1000);
    // this.interVal();
    // this.getData();
  },
};
</script>
