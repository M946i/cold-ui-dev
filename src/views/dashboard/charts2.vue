<template>
  <div ref="myChart" style="width: 100%;height:400px;"></div>
</template>

<script>
import echarts from 'echarts'
import axios from 'axios' // 这里我使用的是axios库来发送HTTP请求

export default {
  async mounted() {
    let myChart = echarts.init(this.$refs.myChart);

    let option = {
      title: {
        text: '停用趋势折线图'
      },
      tooltip: {
        trigger: 'axis'
      },
      legend: {
        data: ['停用数量']
      },
      xAxis: {
        type: 'category',
        boundaryGap: false,
        // 这里我假设你的x轴数据是固定的，如果不是，你可能需要从你的API数据中获取
        data: ['00:00-1:55', '02:00-03:55', '04:00-05:55', '06:00-07:55', '08:00-09:55', '10:00-11:55', '12:00-13:55', '14:00-15:55', '16:00-17:55', '18:00-19:55', '20:00-21:55', '22:00-23:55']
      },
      yAxis: {
        type: 'value',
        min: 0,
        interval: 1
      },
      series: [] // 初始时，series为空
    };

    myChart.setOption(option);

    // 获取数据
    let hostResponse = await axios.get('http://127.0.0.1:8090/system/getHostHistoryLastDay',{
      headers:{
        "Content-Type": "application/json;",
        'token':localStorage.getItem('token')
      },
    });
    let meterResponse = await axios.get('http://127.0.0.1:8090/system/getMeterHistoryLastDay',{
      headers:{
        "Content-Type": "application/json;",
        'token':localStorage.getItem('token')
      },
    });

    // 这里我假设你的status字段为1表示设备停用
    let hostData = hostResponse.data.filter(item => item.host_status === '停用');
    let meterData = meterResponse.data.filter(item => item.meter_status === '停用');

    // 计算每个时间段的停用设备数量
    let hostCounts = this.countByTime(hostData, 'host_status', 'host_id');
    let meterCounts = this.countByTime(meterData, 'meter_status', 'meter_id');

// 更新图
    // 更新图表数据
    myChart.setOption({
      series: [
        {
          name: '主机停用数量',
          type: 'line',
          data: hostCounts
        },
        {
          name: '仪表停用数量',
          type: 'line',
          data: meterCounts
        }
      ]
    });
  },
  methods: {
    // 计算每个时间段的停用设备数量
    countByTime(data, statusField, idField) {
      let counts = [];
      let timeSlots = ['00:00-1:55', '02:00-03:55', '04:00-05:55', '06:00-07:55', '08:00-09:55', '10:00-11:55', '12:00-13:55', '14:00-15:55', '16:00-17:55', '18:00-19:55', '20:00-21:55', '22:00-23:55'];
      for (let time of timeSlots) {
        let [start, end] = time.split('-').map(t => parseInt(t.split(':')[0]));
        let count = [...new Set(data.filter(item => {
          let status = item[statusField];
          let createTime = new Date(item.create_time);
          let hours = createTime.getUTCHours();
          return status === '停用' && hours >= start && hours < end;
        }).map(item => item[idField]))].length;  // 使用Set去掉重复的id，然后计算长度
        counts.push(count || 0);
      }
      return counts;
    }
  }
}
</script>
