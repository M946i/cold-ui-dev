<template>
  <div class="chart-container">
    <canvas ref="chart"></canvas>
  </div>
</template>

<script>
import Chart from 'chart.js';

export default {
  props: {
    chartData: {
      type: Array,
      required: true,
    },
  },

  data() {
    return {
      chart: null,
    };
  },

  watch: {
    chartData() {
      this.drawChart();
    },
  },

  mounted() {
    this.drawChart();
  },

  methods: {
    drawChart() {
      if (this.chart) {
        this.chart.destroy(); // Destroy the old chart
      }
      this.chart = new Chart(this.$refs.chart.getContext('2d'), {
        type: 'line',
        data: {
          labels: this.chartData.map(item => item.time),
          datasets: [
            {
              label: 'Min',
              data: this.chartData.map(item => item.min),
              borderColor: '#f87979',
              fill: false,
            },
            {
              label: 'Max',
              data: this.chartData.map(item => item.max),
              borderColor: '#f87979',
              fill: false,
            },
            {
              label: 'Current',
              data: this.chartData.map(item => item.current),
              borderColor: '#f87979',
              fill: false,
            },
          ],
        },
        options: {
          responsive: true,
          maintainAspectRatio: false,
        },
      });
    },
  },
};
</script>

<style scoped>
.chart-container {
  width: 1000px;
  height: 500px;
}
</style>
