<template>
  <div>
    <!--<Card></Card>-->
    <div class='cardShowStatus clearfix'>
      <div v-for="(node, index) in ratedata">
        <Card :nodedata="node"
              :indexed="index">
          {{node}}
        </Card>
        <Dashboard :nodedata="node.rates"
                   :indexed="index"></Dashboard>
        <!--<Card v-for="(node, index) in appData"-->
        <!--:nodedata="node"-->
        <!--:indexed="index">-->
        <!--{{node}}-->
        <!--</Card>-->
        <!--<Dashboard  v-for="(node, index) in ratedata"-->
        <!--:nodedata="node"-->
        <!--:indexed="index"></Dashboard>-->
      </div>
    </div>
  </div>

</template>

<script>
  import Card from '../components/card';
  import Dashboard from '../components/dashboard';

  import { wsGetLoader } from '../models/interface';

  export default {
    data() {
      return {
        itemdata: [],
        ratedata: [],
        appData: [],
        interval: null,
      };
    },
    components: {
      Card,
      Dashboard,
    },
    methods: {
      getData() {
        wsGetLoader().then((data) => {
          let allCurrentLoad = 0; // 当前总负载
          let allEstimateLoad = 0; // 预估负载
          let rate = 0; // 负载率
          this.ratedata = []; // 初始化
          for (let i = 0; i < data.data.length; i += 1) {
            for (let j = 0; j < data.data[i].nodeList.length; j += 1) {
              if (data.data[i].nodeList[j].nodeCurrentLoad >= 0) {
                allCurrentLoad += data.data[i].nodeList[j].nodeCurrentLoad;
              }
              allEstimateLoad += data.data[i].nodeList[j].nodeEstimateLoad;
            }
            // eslint-disable-next-line
            const rateNow = (allCurrentLoad / allEstimateLoad) * 100;
            rate = rateNow.toFixed(2) - 0;
            this.ratedata[i] = {};
            this.ratedata[i].rates = rate;
            this.ratedata[i].appCreateTime = data.data[i].appCreateTime;
            this.ratedata[i].appDescribe = data.data[i].appDescribe;
            this.ratedata[i].appIcon = data.data[i].appIcon;
            this.ratedata[i].appId = data.data[i].appId;
            this.ratedata[i].appImageId = data.data[i].appImageId;
            this.ratedata[i].appName = data.data[i].appName;
            this.ratedata[i].appOwner = data.data[i].appOwner;
            this.ratedata[i].appStatus = data.data[i].appStatus;
            this.ratedata[i].nodeList = data.data[i].nodeList;
          }
//          console.log(this.ratedata);
        });
      },
      getRate() {
        this.interval = setInterval(() => {
          this.getData();
        }, 1000);
      },
    },
    mounted() {
      wsGetLoader().then((data) => {
        this.appData = data.data;
      });
      this.getData();
      this.getRate();
    },
    beforeDestroy() {
      clearInterval(this.interval);
    },
  };
</script>
<style>
  .cardShowStatus {
    width: 1280px;
    height: 700px;
    margin: 0 auto;
    position: relative;
  }
</style>
