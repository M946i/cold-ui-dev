<template>
  <div ref="myChart" style="width: 100%;height:400px;"></div>
</template>

<script>
import echarts from 'echarts'
import {getHostList, getMeterList} from "@/api/admin";

function countByHostStatus(hostList) {
  return hostList.reduce((acc, host) => {
    let status = host.host_status;
    if (!acc[status]) {
      acc[status] = 0;
    }
    acc[status]++;
    return acc;
  }, {});
}

function countByMeterStatus(meterList) {
  return meterList.reduce((acc, meter) => {
    let status = meter.meter_status;
    if (!acc[status]) {
      acc[status] = 0;
    }
    acc[status]++;
    return acc;
  }, {});
}

export default {
  data() {
    return {
      hostList: [],
      meterList: [],
    };
  },
  async mounted() {
    this.hostList = (await getHostList()).data;
    this.meterList = (await getMeterList()).data;
    this.updateChart();
  },
  watch: {
    hostList: 'updateChart',
    meterList: 'updateChart',
  },
  methods: {
    async updateChart() {
      let myChart = echarts.init(this.$refs.myChart);
      let hostStatusCount = countByHostStatus(this.hostList);
      let meterStatusCount = countByMeterStatus(this.meterList);
      let zc = (hostStatusCount['正常'] || 0) + (meterStatusCount['正常'] || 0);
      let yc = (hostStatusCount['异常'] || 0) + (meterStatusCount['异常'] || 0);
      let ty = (hostStatusCount['停用'] || 0) + (meterStatusCount['停用'] || 0);
      let option = {
        title: {
          text: '设备状态饼状图',
          left: 'center'
        },
        tooltip: {
          trigger: 'item',
          formatter: '{a} <br/>{b} : {c} ({d}%)'
        },
        series: [
          {
            name: '状态',
            type: 'pie',
            radius: '55%',
            center: ['50%', '50%'],
            data: [
              {value: zc, name: '正常'},
              {value: yc, name: '异常'},
              {value: ty, name: '停用'},
            ],
            itemStyle: {
              emphasis: {
                shadowBlur: 10,
                shadowOffsetX: 0,
                shadowColor: 'rgba(0, 0, 0, 0.5)'
              }
            }
          }
        ]
      };
      myChart.setOption(option);
    },
  },
}
</script>
