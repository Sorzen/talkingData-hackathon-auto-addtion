<template>
  <div class="cardShow"
        :class='nodedata.appName'>
    <router-link :to="{path:`/appdetail/${nodedata.appId}`}">
      <Card :bordered="false"
            style="width:400px;margin: 10px;height: 600px"
            id='card'>
        <p slot="title" class='cardTitle'>应用{{indexed + 1}}</p>
        <div class='card-left'>
          <div>
            <img src="../assets/logo2.png" alt=""
                 style="width:50px;height: 50px">
          </div>
          <div class='card-left-status'>
          <span class="card-btn-status"
                :class="nodedata.appStatus==='online'?'run':'stop'"></span>
            <span>状态:</span>
            <span>{{nodedata.appStatus}}</span>
          </div>
        </div>
        <div class='card-right'>
          <div class='card'>
            <span>名称:</span>
            <span>{{nodedata.appName}}</span>
          </div>
          <div class='card'>
            <span>创建时间:</span>
            <span>{{timeStampLite(nodedata.appCreateTime)}}</span>
          </div>
          <div class='card'>
            <span>节点数:</span>
            <span>{{nodedata.nodeList.length}}</span>
          </div>
          <div class='card'>
            <span>简介:</span>
            <span>{{nodedata.appDescribe}}</span>
          </div>
        </div>
      </Card>
    </router-link>
  </div>
</template>

<script type="text/ecmascript-6">
  //  import { wsGetLoader } from '../models/interface';
//  import Dashboard from './dashboard';

  export default {
    data() {
      return {
        renderData: [],
        cardStatus: 'run',
      };
    },
    methods: {
      timeStampLite(time) {
        const date = new Date(parseInt(time, 0));
        const year = date.getFullYear();
        let month = date.getMonth() + 1;
        let day = date.getDate();
        if (month < 10) {
          const zero = '0';
          month = zero + month;
        }
        if (day < 10) {
          const zero = '0';
          day = zero + day;
        }
        const line = '-';
        return year + line + month + line + day;
      },
    },
    props: ['nodedata', 'indexed'],
    mounted() {
//      wsGetLoader({}).then((data) => {
//        this.renderData = data.data;
//      });
    },
//    components: {
//      Dashboard,
//    },
  };
</script>

<style>
  .cardShow {
    display: inline-block;
    /*justify-content: space-between;*/
    margin: 20px;
    position: absolute;
  }

  .A {
    left: 0px;
  }

  .B {
    left: 410px;
  }

  .C {
    right: 0px;
  }

  .cardShow a {
    color: #000;
  }

  #card
  .cardTitle {
    font-size: 16px;
  }

  .card-left {
    display: inline-block;
    width: 80px;
    float: left;
    padding-top: 26px;
  }

  .card-left .card-left-status {
    padding-top: 22px;
    width: 72px;
  }

  .card-right {
    display: inline-block;
    width: 250px;
    float: right;
  }

  .card-right .card {
    display: flex;
    justify-content: space-between;
    width: 200px;
    padding: 20px 0 0 0;
  }

  .card-btn-status {
    position: relative;
    width: 12px;
    height: 12px;
    display: inline-block;
    line-height: 40px;
    border-radius: 100%;
    font-size: 20px;
    box-shadow: 0 1px 2px rgba(0, 0, 0, .3);
    /*background-image: -webkit-gradient(linear, left top, left bottom, from(#FFC0CB), to(#FF69B4));*/
    /*background-image: -moz-linear-gradient(#FFC0CB, #FF69B4);*/
    animation: ease-in-out breath 2500ms infinite alternate;
    -webkit-animation: ease-in-out breath 2500ms infinite alternate;
    cursor: pointer;
  }

  .run {
    border: 1px solid #78C850;
    background-color: #37B157;
  }

  .stop {
    background-color: #EA0000;
  }

  @keyframes breath {
    0% {
      opacity: .2;
      box-shadow: 0 1px 2px rgba(255, 255, 255, 0.1);
    }
    100% {
      opacity: 1;
      border: 1px solid #fff;
      box-shadow: 0 1px 30px #fff;
    }
  }

  @-webkit-keyframes breath {
    0% {
      opacity: .2;
      box-shadow: 0 1px 2px rgba(255, 255, 255, 0.1);
    }
    100% {
      opacity: 1;
      border: 1px solid rgba(255, 192, 203, 1);
      box-shadow: 0 1px 30px rgba(255, 192, 203, 1);
    }
  }
</style>
