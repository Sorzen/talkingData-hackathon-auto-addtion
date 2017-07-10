const options = {
  title: {
    text: '',
    left: '50%',
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
    // boundaryGap: [0, '100%'],
    max: 150,
    splitLine: {
      show: false,
    },
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
  legend: {
    right: '40%',
    bottom: 0,
    data: ['负载率(%)', '预估负载(%)'],
  },
};

export default options;
